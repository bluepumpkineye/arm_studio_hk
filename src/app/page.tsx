import Link from "next/link";
import { Container, Eyebrow, Arrow, btnOnDark, WhatsAppIcon } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { BeforeAfter } from "@/components/before-after";
import { YouTubePlaylist } from "@/components/youtube";
import { Marquee } from "@/components/marquee";
import { BudgetEstimator } from "@/components/budget-estimator";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects, getTestimonials, getPress } from "@/lib/queries";
import { whatsappLink } from "@/lib/site";
import { getLocale } from "@/lib/i18n-server";
import { getDict, lp, pick, pressTitle, pressBlurb, testimonialQuote, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

function Stars({ n = 5 }: { n?: number }) {
  return <span className="text-sand" aria-label={`${n} out of 5 stars`}>{"★".repeat(n)}</span>;
}

export default async function HomePage() {
  const locale = await getLocale();
  const d = getDict(locale);
  const [featured, testimonials, press] = await Promise.all([
    getFeaturedProjects(3),
    getTestimonials(),
    getPress(),
  ]);
  const publications = Array.from(new Set(press.map((p) => p.publication)));
  const award = press.find((p) => p.category === "award");
  const reelPoster = featured[0]?.coverImage ?? "/images/hero.jpg";

  const services = locale === "zh"
    ? [
        { n: "01", t: "住宅設計", s: "因應你在港的生活，打造全屋或單房室內設計。" },
        { n: "02", t: "翻新及工程管理", s: "設計主導的施工——圖則、招標及工地監督。" },
        { n: "03", t: "商業及餐飲", s: "在商業表現與美感之間取得平衡的工作空間。" },
        { n: "04", t: "軟裝及採購", s: "傢具、藝術品與令屋成家的細節。" },
      ]
    : [
        { n: "01", t: "Residential Design", s: "Full-home and single-room interiors tailored to how you live in Hong Kong." },
        { n: "02", t: "Renovation & Fit-out", s: "Design-led construction management — drawings, tendering and on-site delivery." },
        { n: "03", t: "Commercial & F&B", s: "Workplaces, retail and hospitality designed to perform commercially." },
        { n: "04", t: "Styling & Procurement", s: "Furniture, lighting, art and the finishing touches that make a house a home." },
      ];

  const stats = locale === "zh"
    ? [
        { n: "60+", l: "已交付項目" },
        { n: "8 年", l: "在港設計" },
        { n: "2025", l: "Home Journal 大獎" },
        { n: "100%", l: "全程站內報價" },
      ]
    : [
        { n: "60+", l: "Projects delivered" },
        { n: "8 yrs", l: "Designing in Hong Kong" },
        { n: "2025", l: "Home Journal Award" },
        { n: "100%", l: "On-domain quoting" },
      ];

  const ethos = locale === "zh"
    ? [
        { k: "藝術", v: "每個空間都有自己的觀點。" },
        { k: "可靠", v: "準時、預算之內、絕不意外。" },
        { k: "用心", v: "用料與光線，皆經思量。" },
      ]
    : [
        { k: "Artistry", v: "A point of view in every room." },
        { k: "Reliability", v: "On time, on budget, no surprises." },
        { k: "Mindfulness", v: "Materials and light, considered." },
      ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <img src="/images/hero.jpg" alt={pick({ en: "A warm, light-filled Japandi living room designed by Arm Studio in Hong Kong", zh: "Arm Studio 於香港設計的溫暖、採光充足的和風簡約客廳" }, locale)} loading="eager" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/30 to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 to-transparent" />

        <Container className="relative flex min-h-[100svh] flex-col justify-end pb-14 pt-[calc(var(--header-h)+6rem)] text-bone">
          <div className="max-w-4xl">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-3 text-sand">
                <span className="h-px w-8 bg-sand/60" /> {pick({ en: "Hong Kong · Interior Design Studio", zh: "香港 · 室內設計工作室" }, locale)}
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 text-[clamp(2.6rem,8vw,6rem)] leading-[0.95]">
                {pick({ en: "Interiors shaped with", zh: "以藝術、可靠" }, locale)}
                <br />
                <span className="display-italic text-sand">{pick({ en: "artistry, reliability", zh: "與用心" }, locale)}</span>
                <br />
                {pick({ en: "& mindfulness.", zh: "塑造空間。" }, locale)}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-bone/75 sm:text-lg">
                {pick({
                  en: "Arm Studio is a Hong Kong design studio creating homes and workplaces that are calm, considered and built to last — recognised with a 2025 Home Journal Award Merit.",
                  zh: "Arm Studio 是香港設計工作室，打造沉穩、講究、歷久彌新的家居與辦公空間——榮獲 2025 Home Journal 設計大獎優異獎。",
                }, locale)}
              </p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={lp(locale, "/portfolio")} className={btnOnDark}>{d.common.explorePortfolio} <Arrow /></Link>
                <Link href={lp(locale, "/estimate")} className="group inline-flex items-center gap-2.5 rounded-full border border-bone/40 px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:bg-bone/10 btn-press">{d.common.estimateBudget}</Link>
              </div>
            </Reveal>
          </div>

          {award ? (
            <Reveal delay={480}>
              <div className="mt-12 flex items-center gap-4 border-t border-bone/15 pt-6">
                <span className="text-2xl text-sand">★</span>
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sand">{pressTitle(award.sortOrder ?? 0, award.title, locale)}</p>
                  <p className="text-sm text-bone/60">{pressBlurb(award.sortOrder ?? 0, award.blurb, locale)}</p>
                </div>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* PRESS MARQUEE */}
      <section className="border-b border-line bg-paper/60 py-7">
        <Container>
          <p className="mb-5 text-center text-[0.7rem] uppercase tracking-[0.3em] text-taupe">{pick({ en: "Featured & recognised in", zh: "獲獎及媒體報導" }, locale)}</p>
        </Container>
        <Marquee items={publications} />
      </section>

      {/* ETHOS */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{pick({ en: "Our approach", zh: "我們的理念" }, locale)}</Eyebrow>
                <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.02]">
                  {pick({ en: "We believe exceptional design lives in the detail.", zh: "我們深信出色的設計，藏於細節之中。" }, locale)}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={120}>
                <p className="text-pretty text-lg leading-relaxed text-taupe">
                  {pick({
                    en: "From a single bathroom to a full village house, every Arm Studio project is guided by three ideas — artistry, reliability and mindfulness. We design spaces that feel inevitable: calm, generous and unmistakably yours.",
                    zh: "由一個浴室到整座村屋，每個 Arm Studio 項目都由三個理念引導——藝術、可靠與用心。我們設計的空間順理成章：沉穩、寬敞，且只屬於你。",
                  }, locale)}
                </p>
                <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                  {ethos.map((t) => (
                    <div key={t.k} className="bg-bone p-6">
                      <p className="font-display text-xl">{t.k}</p>
                      <p className="mt-2 text-sm text-taupe">{t.v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal delay={200}>
            <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l} className="bg-bone p-7 text-center">
                  <p className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-ink">{s.n}</p>
                  <p className="mt-3 text-[0.78rem] uppercase tracking-[0.16em] text-taupe">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-paper/50 py-24 sm:py-32">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <Reveal>
              <div>
                <Eyebrow>{pick({ en: "Selected work", zh: "精選作品" }, locale)}</Eyebrow>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.02]">{pick({ en: "Recent projects", zh: "近期項目" }, locale)}</h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Link href={lp(locale, "/portfolio")} className="group inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-ink">{d.common.viewAllProjects} <Arrow /></Link>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100}><ProjectCard project={p} locale={locale} /></Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>{pick({ en: "See the transformation", zh: "看看轉變" }, locale)}</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.02]">
                {pick({ en: "From raw shell to ", zh: "由毛坯到" }, locale)}<span className="display-italic">{pick({ en: "finished home.", zh: "完成的家。" }, locale)}</span>
              </h2>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-taupe">
                {pick({
                  en: "Drag the slider to reveal how we transformed the Kam Tin village house — the project that earned a 2025 Home Journal Award Merit.",
                  zh: "拖曳滑桿，看看我們如何將錦田村屋蛻變——此項目榮獲 2025 Home Journal 設計大獎優異獎。",
                }, locale)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={lp(locale, "/portfolio/gm815-kam-tin-house")} className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-espresso btn-press">
                  {pick({ en: "View the case study", zh: "查看案例" }, locale)} <Arrow />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <BeforeAfter before="/images/before-living.jpg" after="/images/after-living.jpg" locale={locale} />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* BUDGET ESTIMATOR */}
      <section className="bg-espresso py-24 text-bone sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-3 text-sand">
                <span className="h-px w-8 bg-sand/50" /> {pick({ en: "The 60-second budget estimator", zh: "60 秒預算估算" }, locale)}
              </span>
              <h2 className="mt-6 text-[clamp(2rem,5vw,3.6rem)] leading-[1.0]">{pick({ en: "What will your project cost?", zh: "你的項目預算多少？" }, locale)}</h2>
              <p className="mt-6 text-pretty text-bone/65">
                {pick({
                  en: "Answer four quick questions and get a realistic Hong Kong budget range — no call required. It's the fastest way to know if we're the right fit.",
                  zh: "回答四條簡單問題，即可獲得切合香港的預算範圍——無需通話。這是判斷我們是否適合你的最快方法。",
                }, locale)}
              </p>
            </Reveal>
          </div>
          <Reveal delay={150} className="mt-12"><BudgetEstimator locale={locale} /></Reveal>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal>
            <Eyebrow>{pick({ en: "What we do", zh: "我們的服務" }, locale)}</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.02]">
              {pick({ en: "A full studio, from first sketch to final styling.", zh: "一站式工作室，由首張草圖到最後軟裝。" }, locale)}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="group h-full bg-bone p-8 transition-colors duration-300 hover:bg-paper/60 sm:p-10">
                  <span className="eyebrow text-brass/70">{s.n}</span>
                  <h3 className="mt-6 font-display text-2xl">{s.t}</h3>
                  <p className="mt-3 max-w-sm text-taupe">{s.s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* VIDEO REEL */}
      <section className="bg-paper/50 py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={120}>
              <YouTubePlaylist title={pick({ en: "Arm Studio — project films", zh: "Arm Studio — 項目影片" }, locale)} poster={reelPoster} caption={pick({ en: "Project walkthroughs & case films", zh: "項目走訪與案例影片" }, locale)} locale={locale} />
            </Reveal>
            <Reveal>
              <Eyebrow>{pick({ en: "Watch our work", zh: "觀看我們的作品" }, locale)}</Eyebrow>
              <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.02]">{pick({ en: "Project films, straight from the studio.", zh: "來自工作室的項目影片。" }, locale)}</h2>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-taupe">
                {pick({
                  en: "We document every build so you can walk through finished spaces before you ever pick up the phone. Press play to see our latest films.",
                  zh: "我們為每個項目記錄，讓你在我們通話前即可走訪完工空間。按播放觀看最新影片。",
                }, locale)}
              </p>
              <Link href={whatsappLink(locale === "zh" ? "你好 Arm Studio，看過你們的影片後，我想進一步了解項目。" : "Hi Arm Studio, I'd love to discuss a project after watching your films.")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-ink/25 px-6 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-bone btn-press">
                <WhatsAppIcon className="h-4 w-4" /> {d.common.discussProject}
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 ? (
        <section className="py-24 sm:py-32">
          <Container>
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <Eyebrow>{pick({ en: "Client words", zh: "客戶心聲" }, locale)}</Eyebrow>
                  <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.02]">{pick({ en: "Trusted by Hong Kong homeowners.", zh: "深受香港屋主信賴。" }, locale)}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Stars />
                  <span className="text-sm text-taupe">{pick({ en: "5.0 · across our projects", zh: "5.0 · 橫跨我們的項目" }, locale)}</span>
                </div>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.slice(0, 3).map((t, i) => (
                <Reveal key={t.id} delay={i * 100}>
                  <figure className="flex h-full flex-col rounded-2xl border border-line bg-paper/40 p-7">
                    <Stars n={t.rating} />
                    <blockquote className="mt-5 flex-1 text-pretty text-lg leading-relaxed text-ink/90">“{testimonialQuote(t.name, t.quote, locale)}”</blockquote>
                    <figcaption className="mt-6 border-t border-line pt-5">
                      <p className="font-display text-lg">{t.name}</p>
                      <p className="text-sm text-taupe">{t.project}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
