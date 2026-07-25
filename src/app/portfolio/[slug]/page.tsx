import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container, Eyebrow, Arrow, btnPrimary, WhatsAppIcon } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { BeforeAfter } from "@/components/before-after";
import { YouTubePlaylist } from "@/components/youtube";
import { QuoteForm } from "@/components/quote-form";
import { ProjectCard } from "@/components/project-card";
import { getProjectBySlug, getMoreProjects } from "@/lib/queries";
import { whatsappLink } from "@/lib/site";
import { getLocale } from "@/lib/i18n-server";
import { getDict, lp, pick, projectSummary, projectDescription, roomLabel, styleLabel, tierLabel, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: projectSummary(slug, project.summary, locale),
    openGraph: {
      title: `${project.title} · Arm Studio`,
      description: projectSummary(slug, project.summary, locale),
      images: [{ url: project.coverImage, width: 1500, height: 1000, alt: project.title }],
    },
  };
}

function Spec({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line-light py-3">
      <span className="eyebrow text-mist">{label}</span>
      <span className="text-right text-bone/90">{value}</span>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const d = getDict(locale);
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const more = await getMoreProjects(slug, 3);
  const gallery = (project.gallery ?? []).filter(Boolean);
  const hasBeforeAfter = Boolean(project.beforeImage && project.afterImage);
  const rooms = project.roomType.split(",").map((s) => s.trim());

  const waMessage = locale === "zh"
    ? `你好 Arm Studio！我很喜歡「${project.title}」項目（${styleLabel(project.style, locale)}，${tierLabel(project.budgetTier, locale)}），想探索類似的設計。`
    : `Hi Arm Studio! I love the "${project.title}" project (${project.style}, ${project.budgetTier}) and I'd like to explore something similar for my space.`;

  return (
    <article>
      {/* HERO */}
      <section className="relative min-h-[78svh] w-full overflow-hidden">
        <img src={project.coverImage} alt={`${project.title} — ${project.location ?? "Hong Kong"}`} loading="eager" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/40" />
        <Container className="relative flex min-h-[78svh] flex-col justify-end pb-12 pt-[calc(var(--header-h)+4rem)] text-bone">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-brass px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-bone">{styleLabel(project.style, locale)}</span>
              <span className="rounded-full border border-bone/30 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-bone/80">{tierLabel(project.budgetTier, locale)}</span>
              {project.featured ? <span className="rounded-full border border-sand/50 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sand">★ {pick({ en: "Award winner", zh: "得獎項目" }, locale)}</span> : null}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.2rem,7vw,5rem)] leading-[0.98]">{project.title}</h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-5 max-w-2xl text-lg text-bone/75">{projectSummary(slug, project.summary, locale)}</p>
          </Reveal>
        </Container>
      </section>

      {/* OVERVIEW + SPECS */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>{pick({ en: "The brief", zh: "項目簡介" }, locale)}</Eyebrow>
              <div className="mt-6 space-y-5 text-pretty text-lg leading-relaxed text-taupe">
                <p>{projectDescription(slug, project.description ?? project.summary, locale)}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  <WhatsAppIcon className="h-4 w-4" /> {d.common.requestSimilar}
                </a>
                <Link href={lp(locale, "/contact")} className="group inline-flex items-center gap-2.5 rounded-full border border-ink/25 px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-bone btn-press">
                  {d.common.fullQuote} <Arrow />
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="rounded-2xl border border-line bg-paper/50 p-7">
                <Eyebrow>{d.spec.details}</Eyebrow>
                <div className="mt-5">
                  <Spec label={d.spec.location} value={project.location} />
                  <Spec label={d.spec.district} value={project.district} />
                  <Spec label={d.spec.rooms} value={rooms.map((r) => roomLabel(r, locale)).join(", ")} />
                  <Spec label={d.spec.style} value={styleLabel(project.style, locale)} />
                  <Spec label={d.spec.budget} value={tierLabel(project.budgetTier, locale)} />
                  <Spec label={d.spec.area} value={project.areaSqft ? `${project.areaSqft.toLocaleString("en-HK")} ${pick({ en: "sq ft", zh: "平方呎" }, locale)}` : null} />
                  <Spec label={d.spec.build} value={project.durationWeeks ? `${project.durationWeeks} ${pick({ en: "weeks", zh: "週" }, locale)}` : null} />
                  <Spec label={d.spec.year} value={project.year} />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* GALLERY */}
      {gallery.length > 0 ? (
        <section className="pb-8">
          <Container>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {gallery.map((src, i) => (
                <Reveal key={src + i} delay={(i % 3) * 80} className={i === 0 ? "col-span-2" : ""}>
                  <div className={`overflow-hidden rounded-xl bg-shell ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                    <img src={src} alt={`${project.title} — ${pick({ en: `detail ${i + 1}`, zh: `細節 ${i + 1}` }, locale)}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.3s] ease-out hover:scale-[1.04]" />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* BEFORE / AFTER */}
      {hasBeforeAfter ? (
        <section className="py-20 sm:py-28">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <Eyebrow>{pick({ en: "Before & after", zh: "翻新前後" }, locale)}</Eyebrow>
                <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] leading-[1.04]">{pick({ en: "Drag to reveal the transformation.", zh: "拖曳以揭開轉變。" }, locale)}</h2>
              </div>
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <BeforeAfter before={project.beforeImage!} after={project.afterImage!} locale={locale} />
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* VIDEO */}
      <section className="bg-espresso py-20 text-bone sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-3 text-sand">
                <span className="h-px w-8 bg-sand/50" /> {pick({ en: "Project films", zh: "項目影片" }, locale)}
              </span>
              <h2 className="mt-6 text-[clamp(1.8rem,4vw,3rem)] leading-[1.04]">{pick({ en: "Watch more from the studio.", zh: "觀看更多工作室作品。" }, locale)}</h2>
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <YouTubePlaylist title={pick({ en: "Arm Studio — project films", zh: "Arm Studio — 項目影片" }, locale)} poster={project.coverImage} caption={pick({ en: "More films from Arm Studio", zh: "Arm Studio 更多影片" }, locale)} locale={locale} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* INQUIRY */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>{pick({ en: "Make it yours", zh: "化為你的" }, locale)}</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.03]">
                {pick({ en: "Want something like ", zh: "想要類似" }, locale)}<span className="display-italic">{pick({ en: "this?", zh: "的設計？" }, locale)}</span>
              </h2>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-taupe">
                {pick({
                  en: "Tell us about your space and we'll send tailored ideas and a quote — without ever leaving this page. Prefer chat? Tap WhatsApp and we'll reference this exact project for you.",
                  zh: "告訴我們你的空間，我們會送上度身訂造的構思與報價——全程無需離開此頁。想傾？按 WhatsApp，我們會直接引用此項目。",
                }, locale)}
              </p>
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-espresso btn-press">
                <WhatsAppIcon className="h-4 w-4" /> {pick({ en: "Chat about this project", zh: "WhatsApp 洽談此項目" }, locale)}
              </a>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-3xl border border-line bg-paper/50 p-6 sm:p-8">
                <QuoteForm locale={locale} projectRef={project.title} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* MORE PROJECTS */}
      {more.length > 0 ? (
        <section className="border-t border-line bg-paper/40 py-20 sm:py-28">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-[clamp(1.6rem,3.5vw,2.6rem)]">{pick({ en: "More projects", zh: "更多項目" }, locale)}</h2>
              <Link href={lp(locale, "/portfolio")} className="group inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-ink">{d.common.allWork} <Arrow /></Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (<ProjectCard key={p.slug} project={p} locale={locale} />))}
            </div>
          </Container>
        </section>
      ) : null}
    </article>
  );
}
