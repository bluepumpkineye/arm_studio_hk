import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Container, Eyebrow, Arrow } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { getLocale } from "@/lib/i18n-server";
import { getDict, lp, pick, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const locale: Locale = await getLocale();
  const d = getDict(locale);
  const zh = locale === "zh";

  const SERVICES = zh
    ? [
        { n: "01", t: "住宅室內設計", d: "為香港分層住宅、村屋及頂層打造的全屋或單房室內設計——因應你的生活而設。" },
        { n: "02", t: "翻新及工程管理", d: "設計主導的施工：技術圖則、招標、承辦商協調及工地監督，全程跟進。" },
        { n: "03", t: "商業、零售及餐飲", d: "在商業表現出色同時別具匠心的辦公室、店舖及餐飲空間。" },
        { n: "04", t: "軟裝及採購", d: "傢具、燈飾、藝術品及軟裝——採購、選配並安裝，完成最後呈現。" },
        { n: "05", t: "空間規劃及 3D 效果圖", d: "間隔研究、情緒板及相片級效果圖，讓你在一牆未動前先看到成果。" },
        { n: "06", t: "項目成本規劃", d: "切實的預算、價值工程及成本追蹤，令項目由第一天起就在軌道上。" },
      ]
    : [
        { n: "01", t: "Residential Interior Design", d: "Full-home and single-room interiors for Hong Kong apartments, village houses and penthouses — designed around how you live." },
        { n: "02", t: "Renovation & Fit-out Management", d: "Design-led construction: technical drawings, tendering, contractor coordination and on-site quality control, end to end." },
        { n: "03", t: "Commercial, Retail & F&B", d: "Workplaces, shops and hospitality designed to perform commercially while feeling unmistakably considered." },
        { n: "04", t: "Styling & Procurement", d: "Furniture, lighting, art and soft furnishings — sourced, specified and installed for the final reveal." },
        { n: "05", t: "Spatial Planning & 3D Visuals", d: "Layout studies, mood boards and photoreal renders so you see the result before a single wall moves." },
        { n: "06", t: "Project Cost Planning", d: "Realistic budgets, value engineering and cost tracking that keep your project on track from day one." },
      ];

  const PROCESS = zh
    ? [
        { n: "01", t: "發現", d: "量度、簡介、生活方式、預算及時間表。我們先聆聽。" },
        { n: "02", t: "概念", d: "間隔、氛圍及用料方向，以視覺呈現供確認。" },
        { n: "03", t: "設計深化", d: "圖則、3D 效果圖、用料、裝置及燈光完整選配。" },
        { n: "04", t: "施工及項目管理", d: "招標、工種協調及工地監督。" },
        { n: "05", t: "軟裝及交收", d: "傢具、藝術品及最後呈現——然後交匙。" },
      ]
    : [
        { n: "01", t: "Discovery", d: "Site measure, brief, lifestyle, budget and timeline. We listen first." },
        { n: "02", t: "Concept", d: "Layout, mood and material direction, presented visually for sign-off." },
        { n: "03", t: "Design Development", d: "Drawings, 3D renders, finishes, fixtures and lighting fully specified." },
        { n: "04", t: "Build & Project Management", d: "Tendering, trade coordination and on-site quality control." },
        { n: "05", t: "Styling & Handover", d: "Furniture, art and the final reveal — then the keys." },
      ];

  const tiers = zh
    ? [
        { t: "標準", r: "HK$900–1,400", s: "/ 平方呎" },
        { t: "高級", r: "HK$1,500–2,300", s: "/ 平方呎" },
        { t: "奢華", r: "HK$2,600–4,200", s: "/ 平方呎" },
      ]
    : [
        { t: "Standard", r: "HK$900–1,400", s: "/ sq ft" },
        { t: "Premium", r: "HK$1,500–2,300", s: "/ sq ft" },
        { t: "Luxury", r: "HK$2,600–4,200", s: "/ sq ft" },
      ];

  return (
    <>
      <PageHeader
        eyebrow={pick({ en: "Services", zh: "服務" }, locale)}
        title={pick({ en: <>From first sketch to <span className="display-italic">final styling.</span></>, zh: <>由首張草圖到<span className="display-italic">最後軟裝。</span></> }, locale)}
        intro={pick({
          en: "A single, accountable team for the whole journey. Pick one service or engage the full studio — every project gets the same attention to detail.",
          zh: "全程由同一個負責任的團隊跟進。可單選一項服務，或委託全工作室——每個項目都同樣一絲不苟。",
        }, locale)}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={(i % 3) * 90}>
                <div className="group h-full bg-bone p-8 transition-colors duration-300 hover:bg-paper/60">
                  <span className="eyebrow text-brass/70">{s.n}</span>
                  <h3 className="mt-5 font-display text-2xl">{s.t}</h3>
                  <p className="mt-3 text-pretty text-taupe">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper/50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <Eyebrow>{pick({ en: "How we work", zh: "我們的工作方式" }, locale)}</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">{pick({ en: "A clear, five-step process.", zh: "清晰的五步流程。" }, locale)}</h2>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 90}>
                <div>
                  <span className="font-display text-5xl text-brass/40">{p.n}</span>
                  <h3 className="mt-4 font-display text-xl">{p.t}</h3>
                  <p className="mt-2 text-sm text-taupe">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-line bg-espresso text-bone">
            <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <Reveal>
                <span className="eyebrow text-sand">{pick({ en: "Investment", zh: "投資" }, locale)}</span>
                <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] leading-[1.04]">{pick({ en: "Not sure what your project will cost?", zh: "不確定項目預算多少？" }, locale)}</h2>
                <p className="mt-5 max-w-md text-pretty text-bone/65">
                  {pick({
                    en: "Use our budget estimator to model a realistic Hong Kong range in 60 seconds — then book a free consultation for a precise, tailored quote.",
                    zh: "用我們的預算估算，60 秒推算切合香港的範圍——再預約免費諮詢，獲取精確度身報價。",
                  }, locale)}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={lp(locale, "/estimate")} className="inline-flex items-center gap-2.5 rounded-full bg-sand px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-bone btn-press">{d.common.estimateBudget} <Arrow /></Link>
                  <Link href={lp(locale, "/contact")} className="inline-flex items-center gap-2.5 rounded-full border border-bone/30 px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-bone/10 btn-press">{d.common.requestQuote}</Link>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line-light bg-line-light">
                  {tiers.map((b) => (
                    <div key={b.t} className="bg-espresso p-5 text-center">
                      <p className="eyebrow text-mist">{b.t}</p>
                      <p className="mt-3 font-display text-lg text-bone">{b.r}</p>
                      <p className="text-[0.7rem] text-bone/50">{b.s}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-center text-[0.72rem] text-bone/45">{pick({ en: "Indicative fit-out + furnishing rates. Excludes structural & government fees.", zh: "翻新及傢俬參考收費。不包括結構及政府費用。" }, locale)}</p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
