import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Ensure Node.js runtime (not edge) for Prisma
export const runtime = 'nodejs'



export async function GET(
  request: Request,
  { params }: { params: Promise<{ clerkId: string }> }
) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Await params in Next.js 16
    const { clerkId } = await params

    // Only allow users to access their own data
    if (clerkId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get user from database
    let user = await prisma.user.findUnique({
      where: { clerkId },
      include: {
        store: true,
      },
    })

    // If user doesn't exist, create from current user data
    if (!user) {
      try {
        // Fetch current user data from Clerk
        const clerkUser = await currentUser()
        
        if (!clerkUser) {
          return NextResponse.json({ error: 'User not found in Clerk' }, { status: 404 })
        }

        const email = clerkUser.emailAddresses[0]?.emailAddress
        if (!email) {
          return NextResponse.json({ error: 'User email not found' }, { status: 400 })
        }

        // Get role from Clerk metadata or default to BUYER
        const role = (clerkUser.publicMetadata?.role === 'SELLER' ? 'SELLER' : 'BUYER') as 'BUYER' | 'SELLER'

        // Create user in database
        user = await prisma.user.create({
          data: {
            clerkId: clerkId,
            email: email,
            firstName: clerkUser.firstName || null,
            lastName: clerkUser.lastName || null,
            imageUrl: clerkUser.imageUrl || null,
            role: role,
          },
          include: {
            store: true,
          },
        })
      } catch (clerkError: any) {
        console.error('Error creating user from Clerk data:', clerkError)
        return NextResponse.json(
          { error: 'Failed to create user', details: clerkError.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(user)
  } catch (error: any) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

