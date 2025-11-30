import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// Ensure Node.js runtime (not edge) for Prisma
export const runtime = 'nodejs';

// GET - Get store by user ID
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { store: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.store) {
      return NextResponse.json({ store: null }, { status: 200 });
    }

    return NextResponse.json({ store: user.store }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching store:', error);
    return NextResponse.json(
      { error: 'Failed to fetch store' },
      { status: 500 }
    );
  }
}

// POST - Create store
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, icon } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Store name is required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if store already exists
    const existingStore = await prisma.store.findUnique({
      where: { userId: user.id },
    });

    if (existingStore) {
      return NextResponse.json(
        { error: 'Store already exists' },
        { status: 400 }
      );
    }

    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create store
    const store = await prisma.store.create({
      data: {
        userId: user.id,
        name,
        slug,
        description: description || null,
        icon: icon || null,
      },
    });

    return NextResponse.json({ store }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating store:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Store with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create store' },
      { status: 500 }
    );
  }
}

// PUT - Update store
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, icon } = body;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { store: true },
    });

    if (!user || !user.store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    // Store storeId in a constant to satisfy TypeScript
    const storeId = user.store.id;

    // Update store
    const updateData: any = {};
    if (name) {
      updateData.name = name;
      updateData.slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;

    const store = await prisma.store.update({
      where: { id: storeId },
      data: updateData,
    });

    return NextResponse.json({ store }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating store:', error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Store with this name already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update store' },
      { status: 500 }
    );
  }
}

// DELETE - Delete store
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { store: true },
    });

    if (!user || !user.store) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    // Store storeId in a constant to satisfy TypeScript
    const storeId = user.store.id;

    // Delete store (cascade will delete products, plans, etc.)
    await prisma.store.delete({
      where: { id: storeId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting store:', error);
    return NextResponse.json(
      { error: 'Failed to delete store' },
      { status: 500 }
    );
  }
}

