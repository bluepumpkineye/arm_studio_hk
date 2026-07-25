import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { runSeed } from "@/lib/seed";

export const dynamic = "force-dynamic";

/**
 * Token-protected, idempotent seeder. Seed data is also captured here so the
 * demo always has content. Requires ?token= matching SEED_TOKEN.
 */
export async function POST(req: NextRequest) {
  const expected = process.env.SEED_TOKEN;
  const token = new URL(req.url).searchParams.get("token");
  if (!expected || token !== expected) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  try {
    const counts = await runSeed();
    return NextResponse.json({ ok: true, ...counts });
  } catch (err) {
    console.error("seed failed", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
