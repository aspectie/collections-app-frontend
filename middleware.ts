import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  const isSignIn = request.nextUrl.pathname.startsWith('/sign-in')
  const isSignUp = request.nextUrl.pathname.startsWith('/sign-up')

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_BACKEND_API_URL}/users/me`,
    {
      headers: {
        Authorization: 'Bearer ' + request.cookies.get('__token')?.value
      }
    }
  )
  const data = await res.json()
  console.log('data:')
  console.log(data)

  if (data.error && !(isSignIn || isSignUp)) {
    request.cookies.delete('__token')
  }
  
  const hasToken = request.cookies.has('__token')
  console.log('hasToken:')
  console.log(hasToken)
  console.log('isSignIn:')
  console.log(isSignIn)
  if (!hasToken && !(isSignIn || isSignUp)) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
  }
  
  if (request.nextUrl.pathname.startsWith('/admin') && !data.isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|sing-in|sing-up).*)'],
}