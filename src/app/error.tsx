"use client";

import { Container, btnPrimary, Arrow } from "@/components/primitives";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-[calc(var(--header-h)+3rem)] text-center">
      <span className="eyebrow text-brass">Error · 錯誤</span>
      <h1 className="mt-5 font-display text-[clamp(2rem,6vw,3.4rem)] leading-none">
        This page couldn&apos;t load.
      </h1>
      <p className="mt-5 max-w-md text-pretty text-taupe">
        Something went wrong while rendering this page. Please try again —
        <span className="block text-taupe/80">載入此頁面時發生錯誤，請再試一次。</span>
      </p>
      <button type="button" onClick={() => reset()} className={`mt-8 inline-flex ${btnPrimary}`}>
        Try again <Arrow />
      </button>
    </Container>
  );
}
