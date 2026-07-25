import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Container, Eyebrow, Arrow, btnPrimary } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { getLocale } from "@/lib/i18n-server";
import { getDict, lp, pick, type Locale } from "@/lib/i18n";

const px = (id: number, ext: "jpeg" | "png" = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=1400&h=1000`;

export const dynamic = "force-dynamic";

export default async function StudioPage() {
  const locale: Locale = await getLocale();
  const d = getDict(locale);
  const zh = locale === "zh";

  const story = zh
    ? {
        eyebrow: "我們的故事",
        h2: "出色的設計，藏於一絲不苟的細節之中。",
        p1: "Arm Studio 建立於一個簡單信念：我們生活與工作的空間，塑造著每天的感受。由半山的小單位到三層村屋，我們視每個項目為令日常更沉穩、更實用、更美麗的機會。",
        p2: "我們是全服務工作室——設計、圖則、項目管理及軟裝——由首張草圖到最後交收，都是同一個負責任的團隊。成果是可靠建造、住得舒心的作品。",
      }
    : {
        eyebrow: "Our story",
        h2: "Exceptional design lies in meticulous attention to detail.",
        p1: "Arm Studio was founded on a simple belief: that the spaces we live and work in shape the way we feel every day. From a compact Mid-Levels flat to a three-storey village house, we treat each project as a chance to make ordinary life calmer, more functional and more beautiful.",
        p2: "We're a full-service studio — design, drawings, project management and styling — so there's a single, accountable team from first sketch to final handover. The result is work that's reliable to build and a pleasure to inhabit.",
      };

  const values = zh
    ? [
        { n: "01", t: "藝術", d: "真正的觀點——絕不流於平凡。我們帶著意圖設計，以材質、光線與比例營造有個性的空間。" },
        { n: "02", t: "可靠", d: "清晰的圖則、誠實的定價與嚴謹的項目管理。說到做到——準時、預算之內。" },
        { n: "03", t: "用心", d: "為你的真實生活而設計。講究的收納、耐用的用料與沉穩的用色，歷久彌新。" },
      ]
    : [
        { n: "01", t: "Artistry", d: "A real point of view — never generic. We design with intent, choosing materials, light and proportion to create spaces with character." },
        { n: "02", t: "Reliability", d: "Clear drawings, honest pricing and disciplined project management. We say what we'll do, then do it — on time and on budget." },
        { n: "03", t: "Mindfulness", d: "We design for how you actually live. Considered storage, durable finishes and a calm palette that ages gracefully." },
      ];

  const creds = zh
    ? [
        ["2025 Home Journal 大獎 — 優異獎", "住宅室內設計 · GM815 錦田"],
        ["一站式工作室", "設計、圖則、施工及軟裝"],
        ["持牌及投保的承辦商", "遍及全港的信賴施工夥伴"],
        ["透明固定設計費", "預算內絕無隱藏附加費"],
      ]
    : [
        ["2025 Home Journal Award — Merit", "Residential interior · GM815 Kam Tin"],
        ["Full-service studio", "Design, documentation, build & styling"],
        ["Licensed & insured contractors", "Vetted trade partners across HK"],
        ["Transparent fixed-fee design", "No hidden mark-ups on the brief"],
      ];

  return (
    <>
      <PageHeader
        eyebrow={pick({ en: "The Studio", zh: "工作室" }, locale)}
        title={pick({ en: <>A Hong Kong studio for <span className="display-italic">considered</span> interiors.</>, zh: <>為<span className="display-italic">講究</span>空間而設的香港工作室。</> }, locale)}
        intro={pick({
          en: "Arm Studio Limited designs homes and workplaces at the intersection of artistry, reliability and mindfulness — led by a creative director with an eye for the detail others miss.",
          zh: "Arm Studio Limited 於藝術、可靠與用心的交匯處，設計家居與辦公空間——由一位著重他人忽略細節的創作總監帶領。",
        }, locale)}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="overflow-hidden rounded-2xl bg-shell">
                <img src={px(8134754)} alt={pick({ en: "A calm, detailed interior by Arm Studio", zh: "Arm Studio 沉穩細緻的室內空間" }, locale)} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>{story.eyebrow}</Eyebrow>
              <h2 className="mt-6 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05]">{story.h2}</h2>
              <div className="mt-6 space-y-4 text-pretty text-lg leading-relaxed text-taupe">
                <p>{story.p1}</p>
                <p>{story.p2}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper/50 py-20 sm:py-28">
        <Container>
          <Reveal>
            <Eyebrow>{pick({ en: "What guides us", zh: "我們的信念" }, locale)}</Eyebrow>
            <h2 className="mt-6 max-w-2xl text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02]">{pick({ en: "Three ideas, in everything we make.", zh: "三個理念，貫穿每件作品。" }, locale)}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={i * 100}>
                <div className="h-full rounded-2xl border border-line bg-bone p-8">
                  <span className="eyebrow text-brass/70">{v.n}</span>
                  <h3 className="mt-5 font-display text-2xl">{v.t}</h3>
                  <p className="mt-3 text-pretty text-taupe">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{pick({ en: "Credentials", zh: "資歷" }, locale)}</Eyebrow>
                <h2 className="mt-6 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05]">{pick({ en: "Recognised work, transparent process.", zh: "獲獎作品，透明流程。" }, locale)}</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={120}>
                <ul className="divide-y divide-line border-y border-line">
                  {creds.map(([t, sub]) => (
                    <li key={t} className="flex items-start gap-4 py-5">
                      <span className="mt-1 text-brass">✦</span>
                      <div>
                        <p className="font-display text-lg">{t}</p>
                        <p className="text-sm text-taupe">{sub}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href={lp(locale, "/contact")} className={`mt-8 inline-flex ${btnPrimary}`}>{d.common.startConversation} <Arrow /></Link>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
