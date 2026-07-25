"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Hand-crafted scroll reveal — IntersectionObserver based, fires once,
 * respects reduced motion (handled via CSS). No fade-up-in-every-direction slop:
 * a single, calm 26px lift + opacity.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}) {
  const once = options?.once ?? true;
  const threshold = options?.threshold ?? 0.18;
  const rootMargin = options?.rootMargin ?? "0px 0px -7% 0px";
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold, rootMargin]);

  return { ref, shown };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>({ once });
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
