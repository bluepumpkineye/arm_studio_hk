import { PageHeader } from "@/components/page-header";
import { QuoteForm } from "@/components/quote-form";
import { Container, Eyebrow, WhatsAppIcon, SocialIcon } from "@/components/primitives";
import { Reveal } from "@/components/reveal";
import { site, whatsappLink } from "@/lib/site";
import { getLocale } from "@/lib/i18n-server";
import { getDict, pick } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const locale = await getLocale();
  const d = getDict(locale);
  return (
    <>
      <PageHeader
        eyebrow={d.nav.contact}
        title={pick({ en: <>Let&apos;s build something <span className="display-italic">together.</span></>, zh: <>一起創造美好<span className="display-italic">空間。</span></> }, locale)}
        intro={pick({
          en: "Tell us about your space and we'll reply within one business day with next steps and a tailored quote. Your enquiry stays right here on our site — no redirects.",
          zh: "告訴我們你的空間，我們將於一個工作天內回覆後續步驟及度身報價。你的查詢全程留在我們網站內——絕無跳轉。",
        }, locale)}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl">{pick({ en: "Request a quote", zh: "索取報價" }, locale)}</h2>
                <p className="mt-2 text-taupe">{pick({ en: "Fill this in and we'll take it from there.", zh: "填妥以下表格，餘下交給我們。" }, locale)}</p>
                <div className="mt-8"><QuoteForm locale={locale} /></div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <aside className="space-y-6">
                <div className="rounded-3xl border border-line bg-espresso p-8 text-bone">
                  <Eyebrow tone="bone">{pick({ en: "Prefer to chat?", zh: "想傾一傾？" }, locale)}</Eyebrow>
                  <p className="mt-5 text-pretty text-bone/70">
                    {pick({
                      en: "Message us on WhatsApp for the quickest response — tell us what you have in mind and we'll send ideas back the same day.",
                      zh: "經 WhatsApp 聯絡我們，回覆最快——告訴我們你的想法，我們會即日送上構思。",
                    }, locale)}
                  </p>
                  <a href={whatsappLink(locale === "zh" ? "你好 Arm Studio，我想了解室內設計項目。" : "Hi Arm Studio, I'd like to discuss an interior design project.")} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-sand px-6 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-bone btn-press">
                    <WhatsAppIcon className="h-4 w-4" /> {d.common.chatWhatsApp}
                  </a>
                </div>

                <div className="rounded-3xl border border-line bg-paper/50 p-8">
                  <Eyebrow>{d.footer.studio}</Eyebrow>
                  <dl className="mt-5 space-y-4 text-ink/80">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.16em] text-taupe">{pick({ en: "Email", zh: "電郵" }, locale)}</dt>
                      <dd className="mt-1"><a href={`mailto:${site.email}`} className="ulink">{site.email}</a></dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.16em] text-taupe">{pick({ en: "Phone", zh: "電話" }, locale)}</dt>
                      <dd className="mt-1"><a href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`} className="ulink">{site.phoneDisplay}</a></dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.16em] text-taupe">{pick({ en: "Based in", zh: "所在地" }, locale)}</dt>
                      <dd className="mt-1">{site.city}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.16em] text-taupe">{pick({ en: "Response time", zh: "回覆時間" }, locale)}</dt>
                      <dd className="mt-1">{pick({ en: "Within one business day", zh: "一個工作天內" }, locale)}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex items-center gap-3 border-t border-line pt-6">
                    <a aria-label="Instagram" href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink hover:text-ink">
                      <SocialIcon type="instagram" className="h-[18px] w-[18px]" />
                    </a>
                    <a aria-label="Facebook" href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink hover:text-ink">
                      <SocialIcon type="facebook" className="h-[18px] w-[18px]" />
                    </a>
                    <a aria-label="YouTube" href={site.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink hover:text-ink">
                      <SocialIcon type="youtube" className="h-[18px] w-[18px]" />
                    </a>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
