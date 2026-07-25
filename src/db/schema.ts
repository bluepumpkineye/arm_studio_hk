import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  timestamp,
  json,
  varchar,
  index,
} from "drizzle-orm/pg-core";

/**
 * Arm Studio Limited — interior design studio (Hong Kong).
 * Schema powers: filterable portfolio, testimonials, press & awards, and lead capture
 * (budget estimator unlock + on-domain quote requests + per-project WhatsApp inquiries).
 */

export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 140 }).notNull().unique(),
    title: varchar("title", { length: 180 }).notNull(),
    client: varchar("client", { length: 140 }),
    location: varchar("location", { length: 180 }),
    district: varchar("district", { length: 120 }),
    /** comma separated e.g. "Living Room, Kitchen" */
    roomType: varchar("room_type", { length: 120 }).notNull(),
    /** e.g. "HK$600k+" */
    budgetTier: varchar("budget_tier", { length: 60 }).notNull(),
    /** e.g. "Japandi" */
    style: varchar("style", { length: 60 }).notNull(),
    year: integer("year"),
    areaSqft: integer("area_sqft"),
    durationWeeks: integer("duration_weeks"),
    summary: text("summary").notNull(),
    description: text("description"),
    coverImage: text("cover_image").notNull(),
    gallery: json("gallery").$type<string[]>(),
    beforeImage: text("before_image"),
    afterImage: text("after_image"),
    /** YouTube video id for embedded case video */
    videoId: varchar("video_id", { length: 40 }),
    featured: boolean("featured").default(false),
    published: boolean("published").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("projects_style_idx").on(t.style)],
);

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 140 }).notNull(),
  role: varchar("role", { length: 180 }),
  project: varchar("project", { length: 180 }),
  location: varchar("location", { length: 140 }),
  rating: integer("rating").notNull().default(5),
  quote: text("quote").notNull(),
  featured: boolean("featured").default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const pressItems = pgTable("press_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 220 }).notNull(),
  publication: varchar("publication", { length: 140 }).notNull(),
  category: varchar("category", { length: 40 }).notNull(), // "award" | "press"
  year: integer("year"),
  url: text("url"),
  blurb: text("blurb"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  /** "estimate" | "quote" | "project" | "whatsapp" */
  source: varchar("source", { length: 40 }).notNull(),
  name: varchar("name", { length: 180 }),
  email: varchar("email", { length: 220 }),
  phone: varchar("phone", { length: 60 }),
  projectSlug: varchar("project_slug", { length: 140 }),
  message: text("message"),
  estimateMin: integer("estimate_min"),
  estimateMax: integer("estimate_max"),
  estimateInputs: json("estimate_inputs").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type PressItem = typeof pressItems.$inferSelect;
export type Lead = typeof leads.$inferSelect;
