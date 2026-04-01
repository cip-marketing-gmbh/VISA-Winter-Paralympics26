import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  // Holt alle Einträge aus der "participants"-Liste (von 0 bis zum Ende)
  const participants = await kv.lrange("participants", 0, -1);
  return NextResponse.json({ participants });
}
