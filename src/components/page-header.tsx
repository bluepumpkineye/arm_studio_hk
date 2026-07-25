import type { ReactNode } from "react";
import { Container, Eyebrow } from "./primitives";

/** Standard interior-page hero with correct top offset for the fixed header. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={`relative border-b border-line bg-bone pt-[calc(var(--header-h)+3.5rem)] sm:pt-[calc(var(--header-h)+5rem)] ${className}`}
    >
      <Container className="pb-14 sm:pb-20">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,7vw,4.8rem)] leading-[0.98]">{title}</h1>
        {intro ? (
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-taupe">{intro}</p>
        ) : null}
        {children}
      </Container>
    </header>
  );
}
