import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  const participants = await kv.lrange("participants", 0, -1);
  return NextResponse.json({ participants });
}
