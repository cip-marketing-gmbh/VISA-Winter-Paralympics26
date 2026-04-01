import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, category } = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  // Wir speichern den Namen in einer Liste namens "participants"
  // LPUSH fügt den Namen am Anfang der Liste hinzu
  await kv.lpush("participants", JSON.stringify({ 
    name, 
    category, 
    date: new Date().toISOString() 
  }));

  return NextResponse.json({ success: true });
}
