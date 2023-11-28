import { getToken } from "next-auth/jwt"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextFetchEvent, NextResponse } from "next/server"

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const token = await getToken({ req })
  console.log(token)
  const isAuthenticated = !!token
  if (req.nextUrl.pathname === "/" && isAuthenticated) {
    if (token?.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    } else {
      return NextResponse.redirect(new URL("/home", req.url))
    }
  }
  if (req.nextUrl.pathname.startsWith("/dashboard") && isAuthenticated) {
    if (token?.role === "user") {
      return NextResponse.redirect(new URL("/home", req.url))
    }
  }
  if (req.nextUrl.pathname.startsWith("/home") && isAuthenticated) {
    if (token?.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }
  const authMiddleware = withAuth({
    pages: {
      signIn: `/`,
    },
  })

  return authMiddleware(req, event)
}
