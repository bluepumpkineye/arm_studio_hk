import { db } from "@/db";
import { projects, testimonials, pressItems } from "@/db/schema";
import { eq, and, desc, asc, not } from "drizzle-orm";
import type { Project, Testimonial, PressItem } from "@/db/schema";

/**
 * Data access. Every query degrades gracefully — if the database is briefly
 * unavailable (e.g. during a cold preview restore), we return empty/null so
 * pages render with empty states instead of throwing a 500 that could make the
 * host loop the server restart.
 */

export async function getProjects(): Promise<Project[]> {
  try {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.published, true))
      .orderBy(desc(projects.createdAt));
  } catch (e) {
    console.error("getProjects failed:", e);
    return [];
  }
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  try {
    return await db
      .select()
      .from(projects)
      .where(and(eq(projects.published, true), eq(projects.featured, true)))
      .orderBy(desc(projects.createdAt))
      .limit(limit);
  } catch (e) {
    console.error("getFeaturedProjects failed:", e);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const rows = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    return rows[0] ?? null;
  } catch (e) {
    console.error("getProjectBySlug failed:", e);
    return null;
  }
}

export async function getMoreProjects(currentSlug: string, limit = 3): Promise<Project[]> {
  try {
    return await db
      .select()
      .from(projects)
      .where(and(eq(projects.published, true), not(eq(projects.slug, currentSlug))))
      .orderBy(desc(projects.featured), desc(projects.createdAt))
      .limit(limit);
  } catch (e) {
    console.error("getMoreProjects failed:", e);
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await db.select().from(testimonials).orderBy(asc(testimonials.id));
  } catch (e) {
    console.error("getTestimonials failed:", e);
    return [];
  }
}

export async function getPress(): Promise<PressItem[]> {
  try {
    return await db.select().from(pressItems).orderBy(asc(pressItems.sortOrder), desc(pressItems.year));
  } catch (e) {
    console.error("getPress failed:", e);
    return [];
  }
}
