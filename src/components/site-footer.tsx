import Link from "next/link";
import { Container, Arrow, btnOnDark, WhatsAppIcon, SocialIcon } from "./primitives";
import { Logo } from "./logo";
import { site, whatsappLink, NAV } from "@/lib/site";
import { getDict, lp, type Locale } from "@/lib/i18n";

function navLabel(href: string, d: ReturnType<typeof getDict>): string {
  switch (href) {
    case "/studio": return d.nav.studio;
    case "/portfolio": return d.nav.portfolio;
    case "/services": return d.nav.services;
    case "/press": return d.nav.press;
    case "/estimate": return d.nav.estimate;
    case "/contact": return d.nav.contact;
    default: return href;
  }
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const year = new Date().getFullYear();
  return (
    <footer className="bg-espresso text-bone">
      {/* Closing CTA */}
      <Container className="border-b border-line-light py-20 sm:py-28">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow text-sand">{d.footer.startProject}</span>
            <h2 className="mt-6 text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.98]">
              {d.footer.shapeTitle1}
              <br />
              <span className="display-italic text-sand">{d.footer.shapeTitle2}</span>
            </h2>
            <p className="mt-6 max-w-md text-pretty text-bone/65">{d.footer.shapeBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={lp(locale, "/contact")} className={btnOnDark}>
              {d.common.requestQuote} <Arrow />
            </Link>
            <a
              href={whatsappLink("Hi Arm Studio, I'd like to discuss a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-bone/30 px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:border-bone hover:bg-bone/10 btn-press"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </Container>

      {/* Main grid */}
      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-12">
        <div className="col-span-2 md:col-span-5">
          <Logo light />
          <p className="mt-6 max-w-sm text-pretty text-bone/60">
            {locale === "zh"
              ? "香港室內設計工作室，於藝術、可靠與用心的交匯處，打造家居與辦公空間。"
              : "A Hong Kong interior design studio crafting homes and workplaces at the intersection of artistry, reliability and mindfulness."}
          </p>
          <div className="mt-7 flex items-center gap-3">
            <a aria-label="Instagram" href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/80 transition-colors hover:border-sand hover:text-sand">
              <SocialIcon type="instagram" className="h-[18px] w-[18px]" />
            </a>
            <a aria-label="Facebook" href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/80 transition-colors hover:border-sand hover:text-sand">
              <SocialIcon type="facebook" className="h-[18px] w-[18px]" />
            </a>
            <a aria-label="YouTube" href={site.socials.youtube} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/20 text-bone/80 transition-colors hover:border-sand hover:text-sand">
              <SocialIcon type="youtube" className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 md:col-start-7">
          <h3 className="eyebrow text-mist">{d.footer.explore}</h3>
          <ul className="mt-5 space-y-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={lp(locale, item.href)} className="ulink text-bone/70 hover:text-bone">
                  {navLabel(item.href, d)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3">
          <h3 className="eyebrow text-mist">{d.footer.studio}</h3>
          <ul className="mt-5 space-y-3 text-bone/70">
            <li>
              <a href={`mailto:${site.email}`} className="ulink hover:text-bone">{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`} className="ulink hover:text-bone">{site.phoneDisplay}</a>
            </li>
            <li>{site.city}</li>
            <li className="pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-sand/40 px-3 py-1.5 text-[0.7rem] tracking-wide text-sand">
                ★ {d.award.short}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-3 border-t border-line-light py-7 text-[0.78rem] text-bone/45 sm:flex-row">
        <p>© {year} {site.legalName}. {d.footer.rights}</p>
        <p className="tracking-[0.2em] uppercase text-bone/40">{d.footer.ethos}</p>
        <p>{d.footer.crafted}</p>
      </Container>
    </footer>
  );
}
