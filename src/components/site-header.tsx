"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Arrow, btnPrimary, WhatsAppIcon, SocialIcon } from "./primitives";
import { Logo } from "./logo";
import { LanguageToggle } from "./language-toggle";
import { NAV, site, whatsappLink } from "@/lib/site";
import { getDict, lp, type Locale } from "@/lib/i18n";

function labelFor(href: string, d: ReturnType<typeof getDict>): string {
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

export function SiteHeader({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const d = getDict(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isHome = pathname === "/";
  const isProject = /^\/portfolio\/[^/]+\/?$/.test(pathname);
  const overHero = (isHome || isProject) && !scrolled && !open;

  const desktopNav = NAV.filter((n) => n.href !== "/estimate");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-colors duration-500 ${
          !overHero ? "border-b border-line bg-bone/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
        style={{ height: "var(--header-h)" }}
      >
        <Container className="flex h-full items-center justify-between gap-4">
          <Link
            href={lp(locale, "/")}
            aria-label="Arm Studio — home"
            className={`shrink-0 transition-colors duration-300 ${overHero ? "text-bone" : "text-ink"}`}
          >
            <Logo light={overHero} />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {desktopNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={lp(locale, item.href)}
                  data-active={active}
                  className={`ulink text-[0.82rem] font-medium tracking-wide transition-colors duration-300 ${
                    overHero ? "text-bone/90 hover:text-bone" : "text-ink/75 hover:text-ink"
                  } ${active ? "font-semibold" : ""}`}
                >
                  {labelFor(item.href, d)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <LanguageToggle locale={locale} tone={overHero ? "on-dark" : "on-light"} className="hidden sm:inline-flex" />

            <Link
              href={lp(locale, "/estimate")}
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 md:inline-flex ${
                overHero ? "bg-bone text-ink hover:bg-sand" : "bg-ink text-bone hover:bg-espresso"
              } btn-press`}
            >
              {d.header.getEstimate} <Arrow />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`relative z-[82] flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
                open || overHero ? "border-bone/40 text-bone" : "border-ink/20 text-ink"
              }`}
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? "top-[5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${open ? "bottom-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[79] flex flex-col bg-espresso text-bone transition-[opacity,visibility] duration-400 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 pt-[calc(var(--header-h)+1.25rem)]">
          <span className="eyebrow text-mist">{locale === "zh" ? "目錄" : "Menu"}</span>
          <LanguageToggle locale={locale} tone="on-dark" />
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-10 pt-6">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((item, i) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={lp(locale, item.href)}
                  className={`group flex items-baseline justify-between border-b border-line-light py-5 transition-all duration-500 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                >
                  <span className={`font-display text-3xl transition-colors ${active ? "text-sand" : "text-bone group-hover:text-sand"}`}>
                    {labelFor(item.href, d)}
                  </span>
                  <span className="eyebrow text-mist/60">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              );
            })}
          </nav>

          <div
            className={`mt-10 flex flex-col gap-3 transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"}`}
            style={{ transitionDelay: open ? "480ms" : "0ms" }}
          >
            <a
              href={whatsappLink("Hi Arm Studio, I'd like to discuss an interior design project.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnPrimary} w-full`}
            >
              <WhatsAppIcon className="h-4 w-4" /> {d.common.chatWhatsApp}
            </a>
            <div className="mt-4 flex items-center gap-5">
              <a aria-label="Instagram" href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-sand">
                <SocialIcon type="instagram" className="h-5 w-5" />
              </a>
              <a aria-label="Facebook" href={site.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-sand">
                <SocialIcon type="facebook" className="h-5 w-5" />
              </a>
              <a aria-label="YouTube" href={site.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-sand">
                <SocialIcon type="youtube" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
