"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/db/schema";
import { ROOM_TYPES, BUDGET_TIERS, STYLES } from "@/lib/site";
import { getDict, roomLabel, styleLabel, tierLabel, type Locale } from "@/lib/i18n";
import { ProjectCard } from "./project-card";

function uniqPresent(values: readonly string[], projects: Project[], get: (p: Project) => string | string[]) {
  const present = new Set<string>();
  for (const p of projects) {
    const v = get(p);
    if (Array.isArray(v)) v.forEach((x) => present.add(x.trim()));
    else present.add((v as string).trim());
  }
  return values.filter((v) => present.has(v));
}

export function PortfolioFilters({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const d = getDict(locale);
  const [room, setRoom] = useState<string>("All");
  const [tier, setTier] = useState<string>("All");
  const [style, setStyle] = useState<string>("All");

  const rooms = useMemo(() => uniqPresent(ROOM_TYPES, projects, (p) => p.roomType), [projects]);
  const tiers = useMemo(() => uniqPresent(BUDGET_TIERS, projects, (p) => p.budgetTier), [projects]);
  const styles = useMemo(() => uniqPresent(STYLES, projects, (p) => p.style), [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const roomsList = p.roomType.split(",").map((s) => s.trim());
      const isFullHome = roomsList.includes("Full Home");
      // A dedicated room filter (e.g. "Bathroom") must not surface full-home
      // projects, which list every room. Full-home projects appear only under
      // the "Full Home" filter or "All".
      const r =
        room === "All" ||
        (room === "Full Home" ? isFullHome : roomsList.includes(room) && !isFullHome);
      const t = tier === "All" || p.budgetTier === tier;
      const s = style === "All" || p.style === style;
      return r && t && s;
    });
  }, [projects, room, tier, style]);

  const activeCount = [room, tier, style].filter((v) => v !== "All").length;
  const signature = `${room}|${tier}|${style}`;

  const labelOf = (kind: "room" | "tier" | "style", value: string) =>
    value === "All" ? d.filters.all : kind === "room" ? roomLabel(value, locale) : kind === "tier" ? tierLabel(value, locale) : styleLabel(value, locale);

  return (
    <div>
      <div className="space-y-5 rounded-2xl border border-line bg-paper/50 p-5 sm:p-6">
        <FilterRow label={d.filters.room} value={room} options={["All", ...rooms]} display={(v) => labelOf("room", v)} onChange={setRoom} />
        <FilterRow label={d.filters.budget} value={tier} options={["All", ...tiers]} display={(v) => labelOf("tier", v)} onChange={setTier} />
        <FilterRow label={d.filters.style} value={style} options={["All", ...styles]} display={(v) => labelOf("style", v)} onChange={setStyle} />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <p className="text-sm text-taupe">
            {locale === "zh" ? (
              <>共 {projects.length} 個項目，顯示 <span className="font-semibold text-ink">{filtered.length}</span> 個</>
            ) : (
              <>Showing <span className="font-semibold text-ink">{filtered.length}</span> of {projects.length} {d.filters.projects}</>
            )}
          </p>
          {activeCount > 0 ? (
            <button type="button" onClick={() => { setRoom("All"); setTier("All"); setStyle("All"); }} className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-brass transition-colors hover:text-clay">
              {d.filters.clear} ({activeCount})
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div key={signature} className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <div key={p.slug} className="step-in" style={{ animationDelay: `${Math.min(i, 8) * 55}ms` }}>
              <ProjectCard project={p} locale={locale} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-line bg-paper/40 py-20 text-center">
          <p className="font-display text-2xl">{d.filters.noMatchTitle}</p>
          <p className="mt-2 text-taupe">{d.filters.noMatchHint}</p>
          <button type="button" onClick={() => { setRoom("All"); setTier("All"); setStyle("All"); }} className="mt-6 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-brass">
            {d.filters.reset}
          </button>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label, value, options, display, onChange,
}: {
  label: string; value: string; options: string[]; display: (v: string) => string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
      <span className="eyebrow w-20 shrink-0 text-taupe">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button key={opt} type="button" onClick={() => onChange(opt)} className={`rounded-full border px-3.5 py-1.5 text-[0.78rem] font-medium transition-all duration-200 ${active ? "border-ink bg-ink text-bone" : "border-ink/15 bg-bone text-ink/70 hover:border-ink/40 hover:text-ink"}`}>
              {display(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
