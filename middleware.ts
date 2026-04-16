import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/admin")) {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.ADMIN_SECRET;

    if (!secret) {
      return new NextResponse("Admin secret not configured", { status: 500 });
    }

    if (authHeader !== `Bearer ${secret}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
