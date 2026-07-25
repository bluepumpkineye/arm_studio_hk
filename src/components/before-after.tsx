"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";

/**
 * Draggable before/after comparison slider.
 * Uses clip-path on the overlay so both images stay full-bleed (no squish),
 * and supports pointer drag + keyboard arrow keys on the handle.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
  locale,
  className = "",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  locale: Locale;
  className?: string;
}) {
  const d = getDict(locale);
  const bLabel = beforeLabel ?? d.beforeAfter.before;
  const aLabel = afterLabel ?? d.beforeAfter.after;

  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(0, Math.min(100, p));
    setPos(p);
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[16/11] w-full select-none overflow-hidden rounded-2xl bg-shell ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
    >
      <img
        src={after}
        alt={aLabel}
        draggable={false}
        loading="lazy"
        className="drag-none absolute inset-0 h-full w-full object-cover"
      />
      <img
        src={before}
        alt={bLabel}
        draggable={false}
        loading="lazy"
        aria-hidden
        className="drag-none absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-bone backdrop-blur">
        {aLabel}
      </span>
      <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-bone/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink backdrop-blur">
        {bLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-bone shadow-[0_0_18px_rgba(0,0,0,0.35)]" />
        <button
          type="button"
          aria-label={d.beforeAfter.dragAria}
          role="slider"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={`${Math.round(pos)}%`}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              setPos((p) => Math.max(0, p - 4));
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              setPos((p) => Math.min(100, p + 4));
            }
          }}
          onPointerDown={(e) => {
            e.stopPropagation();
            dragging.current = true;
          }}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-bone text-ink shadow-lg ring-1 ring-ink/10 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-brass"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7 5l-4 5 4 5M13 5l4 5-4 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
