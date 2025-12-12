import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Create response that will redirect to landing page
    const response = NextResponse.redirect(new URL("/landing", request.url))

    // Clear all auth-related cookies
    response.cookies.delete("rapidCompliance_user")
    response.cookies.delete("auth_token")
    response.cookies.delete("user_session")

    // Set additional cookie clearing headers for any potential auth cookies
    response.cookies.set("rapidCompliance_user", "", {
      expires: new Date(0),
      path: "/",
      httpOnly: false,
    })

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.redirect(new URL("/landing", request.url))
  }
}

export async function GET(request: NextRequest) {
  // Handle GET requests the same way
  return POST(request)
}
