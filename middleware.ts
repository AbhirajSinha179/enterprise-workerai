import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/onboarding(.*)", "/over-view(.*)"])

export default clerkMiddleware(async (auth, req) => {
  const role = (await auth()).sessionClaims?.metadata?.role
  if (isProtectedRoute(req)) auth().protect()
  if (isAdminRoute(req) && role !== "admin" && role !== "user" && role !== "dashboard_admin") {
    const url = new URL("/talk-to-sales", req.url)
    return NextResponse.redirect(url)
  }
})

const isAdminRoute = createRouteMatcher(["/dashboard(.*)"])

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// }
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
