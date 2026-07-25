import Link from "next/link";
import type { Project } from "@/db/schema";
import { Arrow } from "./primitives";
import { getDict, lp, roomLabel, tierLabel, type Locale } from "@/lib/i18n";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-bone/85 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
      {children}
    </span>
  );
}

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const d = getDict(locale);
  const rooms = project.roomType.split(",").map((s) => s.trim());
  return (
    <Link href={lp(locale, `/portfolio/${project.slug}`)} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-shell">
        <img
          src={project.coverImage}
          alt={`${project.title} — ${project.style} interior in ${project.location ?? "Hong Kong"}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        <div className="absolute left-3.5 top-3.5 flex flex-wrap gap-1.5">
          <Tag>{roomLabel(rooms[0], locale)}</Tag>
        </div>

        {project.featured ? (
          <span className="absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full bg-brass px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-bone">
            {d.card.awardTag}
          </span>
        ) : null}

        <div className="absolute inset-x-3.5 bottom-3.5 flex translate-y-1.5 items-end justify-between opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-bone">
            {d.common.viewProject}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bone text-ink">
            <Arrow />
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[1.35rem] leading-tight">{project.title}</h3>
        <span className="shrink-0 text-[0.78rem] text-taupe">{project.year}</span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.74rem] text-taupe">
        <span>{roomLabel(rooms[0], locale)}</span>
        <span className="text-mist">·</span>
        <span>{tierLabel(project.budgetTier, locale)}</span>
        {project.location ? (
          <>
            <span className="text-mist">·</span>
            <span>{project.location.split(",")[0]}</span>
          </>
        ) : null}
      </div>
    </Link>
  );
}
