import { db } from "@/db";
import { projects, testimonials, pressItems } from "@/db/schema";
import { eq, and, desc, asc, not } from "drizzle-orm";
import type { Project, Testimonial, PressItem } from "@/db/schema";
import { PROJECTS, TESTIMONIALS, PRESS } from "@/lib/seed";

/**
 * Data access. Every query degrades gracefully — if the database is unpopulated or
 * briefly unavailable, we return curated fallback data so pages render completely
 * with full visual richness.
 */

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await db
      .select()
      .from(projects)
      .where(eq(projects.published, true))
      .orderBy(desc(projects.createdAt));
    if (res.length > 0) return res;
  } catch (e) {
    console.error("getProjects failed:", e);
  }
  return PROJECTS.filter((p) => p.published) as unknown as Project[];
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  try {
    const res = await db
      .select()
      .from(projects)
      .where(and(eq(projects.published, true), eq(projects.featured, true)))
      .orderBy(desc(projects.createdAt))
      .limit(limit);
    if (res.length > 0) return res;
  } catch (e) {
    console.error("getFeaturedProjects failed:", e);
  }
  const fallback = PROJECTS.filter((p) => p.published && p.featured) as unknown as Project[];
  return fallback.slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    if (rows[0]) return rows[0];
  } catch (e) {
    console.error("getProjectBySlug failed:", e);
  }
  return (PROJECTS.find((p) => p.slug === slug) as unknown as Project) ?? null;
}

export async function getMoreProjects(currentSlug: string, limit = 3): Promise<Project[]> {
  try {
    const res = await db
      .select()
      .from(projects)
      .where(and(eq(projects.published, true), not(eq(projects.slug, currentSlug))))
      .orderBy(desc(projects.featured), desc(projects.createdAt))
      .limit(limit);
    if (res.length > 0) return res;
  } catch (e) {
    console.error("getMoreProjects failed:", e);
  }
  const fallback = PROJECTS.filter((p) => p.published && p.slug !== currentSlug) as unknown as Project[];
  return fallback.slice(0, limit);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await db.select().from(testimonials).orderBy(asc(testimonials.id));
    if (res.length > 0) return res;
  } catch (e) {
    console.error("getTestimonials failed:", e);
  }
  return TESTIMONIALS as unknown as Testimonial[];
}

export async function getPress(): Promise<PressItem[]> {
  try {
    const res = await db.select().from(pressItems).orderBy(asc(pressItems.sortOrder), desc(pressItems.year));
    if (res.length > 0) return res;
  } catch (e) {
    console.error("getPress failed:", e);
  }
  return PRESS as unknown as PressItem[];
}
