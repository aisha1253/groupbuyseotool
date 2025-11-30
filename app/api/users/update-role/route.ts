import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

// Ensure Node.js runtime (not edge) for Prisma
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { role } = await request.json()

    if (!role || !['BUYER', 'SELLER'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Update role in database
    const user = await prisma.user.update({
      where: { clerkId: userId },
      data: {
        role: role as 'BUYER' | 'SELLER',
      },
    })

    // Also update Clerk metadata
    try {
      await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: role,
        },
      })
    } catch (error) {
      console.error('Error updating Clerk metadata:', error)
      // Continue even if Clerk update fails
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

