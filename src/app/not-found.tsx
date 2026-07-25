import Link from "next/link";
import { Container, btnPrimary, Arrow } from "@/components/primitives";
import { getLocale } from "@/lib/i18n-server";
import { getDict, lp } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const locale = await getLocale();
  const d = getDict(locale);
  return (
    <Container className="flex min-h-[78svh] flex-col items-center justify-center py-[calc(var(--header-h)+3rem)] text-center">
      <span className="eyebrow text-brass">{d.notFound.eyebrow}</span>
      <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,5rem)] leading-none">{d.notFound.title}</h1>
      <p className="mt-5 max-w-md text-pretty text-taupe">{d.notFound.body}</p>
      <Link href={lp(locale, "/")} className={`mt-8 inline-flex ${btnPrimary}`}>{d.notFound.back} <Arrow /></Link>
    </Container>
  );
}
