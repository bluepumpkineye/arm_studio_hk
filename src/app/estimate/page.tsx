import { PageHeader } from "@/components/page-header";
import { BudgetEstimator } from "@/components/budget-estimator";
import { Container, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { getLocale } from "@/lib/i18n-server";
import { pick } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function EstimatePage() {
  const locale = await getLocale();
  const steps =
    locale === "zh"
      ? [
          { n: "01", t: "回答四條問題", d: "物業類型、面積、範圍及用料等級——不到一分鐘。" },
          { n: "02", t: "推算預算範圍", d: "根據香港一般每平方呎翻新收費，給出低至高的預算。" },
          { n: "03", t: "解鎖分析", d: "輸入電郵即可揭開範圍，並預約免費度身諮詢。" },
        ]
      : [
          { n: "01", t: "Answer four questions", d: "Property type, size, scope and finish tier — takes under a minute." },
          { n: "02", t: "We model your range", d: "A low-to-high estimate based on typical Hong Kong fit-out rates per square foot." },
          { n: "03", t: "Unlock the breakdown", d: "Pop in your email to reveal the range and book a free, tailored consultation." },
        ];

  return (
    <>
      <PageHeader
        eyebrow={pick({ en: "Budget Estimator", zh: "預算估算" }, locale)}
        title={pick({ en: <>Know your numbers <span className="display-italic">first.</span></>, zh: <>先掌握你的<span className="display-italic">預算。</span></> }, locale)}
        intro={pick({
          en: "The fastest way to see if we're the right fit. Answer four questions and we'll model a realistic Hong Kong renovation budget — before you spend a minute on a call.",
          zh: "判斷我們是否適合你的最快方法。回答四條問題，我們將推算切合香港的翻新預算——在你通話之前。",
        }, locale)}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Reveal><BudgetEstimator locale={locale} /></Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-paper/50 py-20 sm:py-28">
        <Container>
          <Reveal><Eyebrow>{pick({ en: "How it works", zh: "運作方式" }, locale)}</Eyebrow></Reveal>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div>
                  <span className="font-display text-5xl text-brass/40">{s.n}</span>
                  <h3 className="mt-4 font-display text-xl">{s.t}</h3>
                  <p className="mt-2 text-sm text-taupe">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-taupe">
              {pick({
                en: "Estimates are a planning guide based on typical Hong Kong fit-out and furnishing rates, and exclude structural alterations and government fees. For a precise, project-specific quote, book a free consultation and we'll measure and scope your space in detail.",
                zh: "估算僅為根據香港一般翻新及傢俬收費的規劃參考，不包括結構改動及政府費用。如需針對項目的精確報價，請預約免費諮詢，我們將詳細量度及評估你的空間。",
              }, locale)}
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
