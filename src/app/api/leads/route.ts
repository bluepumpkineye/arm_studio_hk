import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

/**
 * Unified on-domain lead capture. Replaces the off-site Monday.com redirect so
 * visitors never leave the site mid-decision. Sources:
 *  - "estimate"  : budget estimator unlock
 *  - "quote"     : /contact quote request
 *  - "project"   : per-project "request similar design"
 *  - "whatsapp"  : optional log of WhatsApp intent
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const source = typeof body.source === "string" ? body.source : "";
  if (!source) {
    return NextResponse.json({ ok: false, error: "source_required" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

  const email = str(body.email);
  const phone = str(body.phone);
  if (!email && !phone) {
    return NextResponse.json({ ok: false, error: "contact_required" }, { status: 400 });
  }

  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

  try {
    const [row] = await db
      .insert(leads)
      .values({
        source,
        name: str(body.name),
        email,
        phone,
        projectSlug: str(body.projectSlug),
        message: str(body.message),
        estimateMin: num(body.estimateMin),
        estimateMax: num(body.estimateMax),
        estimateInputs:
          body.estimateInputs && typeof body.estimateInputs === "object"
            ? (body.estimateInputs as Record<string, unknown>)
            : undefined,
      })
      .returning({ id: leads.id });

    return NextResponse.json({ ok: true, id: row?.id ?? null });
  } catch (err) {
    console.error("lead insert failed", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "leads" });
}
