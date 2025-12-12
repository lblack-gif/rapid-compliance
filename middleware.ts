import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Root path - redirect to landing by default
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/landing", request.url))
  }

  // Allow all other routes to pass through
  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
