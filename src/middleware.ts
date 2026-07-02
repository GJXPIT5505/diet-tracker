import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  
  const protectedRoutes = ['/dashboard', '/log', '/assistant', '/onboarding']
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))
  
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // In edge middleware we can verify the token natively
    const payload = await verifyToken(token)
    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth_token')
      return response
    }
  }

  // Redirect authenticated users away from login/register
  if (token && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    const payload = await verifyToken(token)
    if (payload) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/log/:path*',
    '/assistant/:path*',
    '/onboarding/:path*',
    '/login',
    '/register'
  ],
}
