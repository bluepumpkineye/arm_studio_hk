import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * Health check. We ALWAYS return 200 as long as the Next server is responding —
 * reporting database readiness separately. Returning 500 on a slow/cold database
 * makes the host think the whole server is down and restart it in a loop
 * (the "keeps restoring the preview" hang). A transiently-down DB should never
 * fail the liveness probe.
 */
export async function GET() {
  let dbStatus: "up" | "down" = "down";
  try {
    await db.execute(sql`select 1`);
    dbStatus = "up";
  } catch {
    dbStatus = "down";
  }
  return Response.json({ ok: true, db: dbStatus, time: new Date().toISOString() });
}
