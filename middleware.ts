import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Schützt sowohl /admin als auch /api/admin/*
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const authHeader = req.headers.get("authorization");
    const secret = process.env.ADMIN_SECRET;

    if (!secret) {
      // Wenn kein Secret gesetzt ist, Admin komplett sperren
      return new NextResponse("Admin secret not configured", { status: 500 });
    }

    if (authHeader !== `Bearer ${secret}`) {
      // Bei direktem Browser-Aufruf: Basic Auth Dialog auslösen
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
