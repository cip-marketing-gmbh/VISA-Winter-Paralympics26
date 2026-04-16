import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

const VALID_CATEGORIES = ["kids", "adults"] as const;
const MAX_NAME_LENGTH = 100;
const RATE_LIMIT_WINDOW_SECONDS = 60 * 60; // 1 Stunde
const MAX_SUBMISSIONS_PER_IP = 3;

export async function POST(request: Request) {
  // IP für Rate Limiting auslesen
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  // --- Rate Limiting ---
  const rateLimitKey = `ratelimit:submit:${ip}`;
  const submissions = await kv.incr(rateLimitKey);
  if (submissions === 1) {
    await kv.expire(rateLimitKey, RATE_LIMIT_WINDOW_SECONDS);
  }
  if (submissions > MAX_SUBMISSIONS_PER_IP) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  // --- Input parsen & validieren ---
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, category } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (name.trim().length > MAX_NAME_LENGTH) {
    return NextResponse.json(
      { error: `Name must be ${MAX_NAME_LENGTH} characters or fewer` },
      { status: 400 }
    );
  }

  if (!VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    return NextResponse.json(
      { error: "Invalid category. Must be 'kids' or 'adults'." },
      { status: 400 }
    );
  }

  const cleanName = name.trim();

  // --- Doppelten Eintrag verhindern ---
  const existingKey = `participant:${cleanName.toLowerCase()}`;
  const alreadyExists = await kv.exists(existingKey);
  if (alreadyExists) {
    return NextResponse.json({ success: true });
  }
  await kv.set(existingKey, 1, { ex: 60 * 60 * 24 });

  // --- Eintrag speichern ---
  await kv.lpush(
    "participants",
    JSON.stringify({
      name: cleanName,
      category,
      date: new Date().toISOString(),
    })
  );

  return NextResponse.json({ success: true });
}
