import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Container, Eyebrow, Arrow, btnPrimary } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { getPress } from "@/lib/queries";
import { getLocale } from "@/lib/i18n-server";
import { getDict, lp, pick, pressTitle, pressBlurb } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function PressPage() {
  const locale = await getLocale();
  const d = getDict(locale);
  const press = await getPress();
  const awards = press.filter((p) => p.category === "award");
  const features = press.filter((p) => p.category === "press");

  return (
    <>
      <PageHeader
        eyebrow={pick({ en: "Press & Awards", zh: "媒體與獎項" }, locale)}
        title={pick({ en: <>Recognised for <span className="display-italic">considered</span> design.</>, zh: <>因<span className="display-italic">講究</span>設計而獲肯定。</> }, locale)}
        intro={pick({
          en: "Arm Studio's work has been awarded and featured across Hong Kong's design press — proof, we hope, that restraint and craft still get noticed.",
          zh: "Arm Studio 的作品屢獲獎項及香港設計媒體報導——我們希望這證明克制與匠心仍會被看見。",
        }, locale)}
      />

      {awards.length > 0 ? (
        <section className="py-20 sm:py-28">
          <Container>
            <div className="grid gap-6 md:grid-cols-2">
              {awards.map((a, i) => (
                <Reveal key={a.id} delay={i * 100}>
                  <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-espresso p-9 text-bone">
                    <div>
                      <span className="text-4xl text-sand">★</span>
                      <p className="mt-6 eyebrow text-sand">{pick({ en: `Award · ${a.year}`, zh: `獎項 · ${a.year}` }, locale)}</p>
                      <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{pressTitle(a.sortOrder ?? 0, a.title, locale)}</h2>
                      <p className="mt-4 max-w-md text-pretty text-bone/70">{pressBlurb(a.sortOrder ?? 0, a.blurb, locale)}</p>
                    </div>
                    <p className="mt-8 text-sm text-bone/50">{a.publication}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {features.length > 0 ? (
        <section className="bg-paper/50 py-20 sm:py-28">
          <Container>
            <Reveal>
              <Eyebrow>{pick({ en: "Media features", zh: "媒體報導" }, locale)}</Eyebrow>
              <h2 className="mt-6 text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.04]">{pick({ en: "In the press.", zh: "媒體報導。" }, locale)}</h2>
            </Reveal>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {features.map((f, i) => (
                <Reveal key={f.id} delay={(i % 3) * 80}>
                  <div className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-baseline gap-5">
                      <span className="eyebrow w-12 shrink-0 text-brass/70">{f.year}</span>
                      <div>
                        <h3 className="font-display text-xl transition-colors group-hover:text-clay">{pressTitle(f.sortOrder ?? 0, f.title, locale)}</h3>
                        <p className="mt-1 text-sm text-taupe">{pressBlurb(f.sortOrder ?? 0, f.blurb, locale)}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-[0.78rem] uppercase tracking-[0.16em] text-taupe">{f.publication}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-bone p-9 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl">{pick({ en: "Want to feature our work?", zh: "想報導我們的作品？" }, locale)}</h2>
                <p className="mt-2 text-taupe">{pick({ en: "Press kit and high-res imagery available on request.", zh: "可按需要提供媒體資料及高解析度相片。" }, locale)}</p>
              </div>
              <Link href={lp(locale, "/contact")} className={`shrink-0 inline-flex ${btnPrimary}`}>{d.common.startConversation} <Arrow /></Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
