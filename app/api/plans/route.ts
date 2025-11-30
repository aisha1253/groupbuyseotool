import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// Ensure Node.js runtime (not edge) for Prisma
export const runtime = 'nodejs';

// GET - Get all plans for seller's store
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and store
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        store: {
          include: {
            plans: {
              include: {
                items: {
                  include: {
                    product: true,
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });

    if (!user || !user.store) {
      return NextResponse.json({ plans: [] }, { status: 200 });
    }

    return NextResponse.json({ plans: user.store.plans }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    );
  }
}

// POST - Create plan
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, image, price, originalPrice, productIds } = body;

    if (!name || !description || !price || !productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get user and store
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { store: true },
    });

    if (!user || !user.store) {
      return NextResponse.json(
        { error: 'Store not found. Please create a store first.' },
        { status: 404 }
      );
    }

    // Verify products exist and belong to the store
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        storeId: user.store.id,
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'Some products not found or don\'t belong to your store' },
        { status: 400 }
      );
    }

    // Create slug from name
    const baseSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (
      await prisma.plan.findFirst({
        where: {
          storeId: user.store.id,
          slug: slug,
        },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create plan with items in a transaction
    const plan = await prisma.$transaction(async (tx) => {
      const newPlan = await tx.plan.create({
        data: {
          storeId: user.store.id,
          name,
          slug,
          description,
          image: image || null,
          price: parseFloat(price),
          originalPrice: originalPrice ? parseFloat(originalPrice) : null,
        },
      });

      // Create plan items
      await tx.planItem.createMany({
        data: productIds.map((productId: string) => ({
          planId: newPlan.id,
          productId,
        })),
      });

      return tx.plan.findUnique({
        where: { id: newPlan.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    });

    return NextResponse.json({ plan }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating plan:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Plan with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create plan' },
      { status: 500 }
    );
  }
}



