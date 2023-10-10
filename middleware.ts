import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (!request.cookies.has('__token') 
    && !(request.nextUrl.pathname.startsWith('/sign-in')
      || request.nextUrl.pathname.startsWith('/sign-up')
    )) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|sing-in|sing-up).*)'],
}