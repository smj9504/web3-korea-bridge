import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Let Next.js handle all routing naturally
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)' 
  ]
}