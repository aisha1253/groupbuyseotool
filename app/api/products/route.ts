import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// Ensure Node.js runtime (not edge) for Prisma
export const runtime = 'nodejs';

// GET - Get all products for seller's store
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
            products: {
              include: {
                category: true,
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
      return NextResponse.json({ products: [] }, { status: 200 });
    }

    return NextResponse.json({ products: user.store.products }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create product
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, image, price, originalPrice, categoryId } = body;

    if (!name || !description || !image || !price || !categoryId) {
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

    // Store storeId in a constant to satisfy TypeScript
    const storeId = user.store.id;

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
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
      await prisma.product.findFirst({
        where: {
          storeId: storeId,
          slug: slug,
        },
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        storeId: storeId,
        categoryId,
        name,
        slug,
        description,
        image,
        price: parseFloat(price),
        originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Product with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}



