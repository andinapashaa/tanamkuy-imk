import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  const isAuthPage = path === '/login' || path === '/register'
  const isProtectedPage = path === '/dashboard'

  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register', '/dashboard'],
}
