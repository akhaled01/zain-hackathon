import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isJudgeRoute = createRouteMatcher(["/judge(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  
  // If user is authenticated and has judge role, redirect to /judge
  if (userId && sessionClaims?.metadata?.role === "judge") {
    // If they're not already on a judge route, redirect them
    if (!isJudgeRoute(req)) {
      return NextResponse.redirect(new URL("/judge", req.url));
    }
  }
  
  // If user is on judge route but doesn't have judge role, redirect to home
  if (isJudgeRoute(req) && sessionClaims?.metadata?.role !== "judge") {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
