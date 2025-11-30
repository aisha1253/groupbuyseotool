import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

// Ensure Node.js runtime (not edge) for Prisma
export const runtime = 'nodejs'

export async function POST(req: Request) {
  // Get the Svix headers for verification
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url, public_metadata } = evt.data

    // Get role from metadata or default to BUYER
    // Check if user signed up from seller page by checking metadata or default to BUYER
    const role = public_metadata?.role === 'SELLER' ? 'SELLER' : 'BUYER'
    const email = email_addresses[0]?.email_address

    if (!email) {
      return new Response('Error: No email address found', {
        status: 400
      })
    }

    try {
      // Create user in database
      const user = await prisma.user.create({
        data: {
          clerkId: id,
          email: email,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
          role: role === 'SELLER' ? 'SELLER' : 'BUYER',
        },
      })

      return new Response(JSON.stringify({ user }), {
        status: 200
      })
    } catch (error: any) {
      console.error('Error creating user:', error)
      
      // Handle unique constraint errors
      if (error.code === 'P2002') {
        return new Response('User already exists', {
          status: 409
        })
      }

      return new Response('Error creating user', {
        status: 500
      })
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url, public_metadata } = evt.data
    const email = email_addresses[0]?.email_address
    const role = public_metadata?.role || 'BUYER'

    if (!email) {
      return new Response('Error: No email address found', {
        status: 400
      })
    }

    try {
      const user = await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: email,
          firstName: first_name || null,
          lastName: last_name || null,
          imageUrl: image_url || null,
          role: role === 'SELLER' ? 'SELLER' : 'BUYER',
        },
      })

      return new Response(JSON.stringify({ user }), {
        status: 200
      })
    } catch (error) {
      console.error('Error updating user:', error)
      return new Response('Error updating user', {
        status: 500
      })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    try {
      await prisma.user.delete({
        where: { clerkId: id },
      })

      return new Response('User deleted', {
        status: 200
      })
    } catch (error) {
      console.error('Error deleting user:', error)
      return new Response('Error deleting user', {
        status: 500
      })
    }
  }

  return new Response('', { status: 200 })
}

