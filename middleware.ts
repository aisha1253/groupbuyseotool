import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Only use Clerk middleware if keys are available
const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export async function middleware(request: NextRequest) {
  // If Clerk is not configured, allow all requests
  if (!clerkPublishableKey) {
    return NextResponse.next()
  }

  // Dynamically import Clerk middleware only if keys are available
  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server')
  
  const isPublicRoute = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks(.*)',
  ])

  return clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect()
    }
  })(request)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

