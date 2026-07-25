"use client";

import { useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";

const ARM_UPLOADS_PLAYLIST = "UU1uTf9TcRY2tanH0RldPkHQ";

/**
 * Lightweight YouTube facade — shows a poster until clicked, then loads the
 * embed (keeps initial paint fast). Embeds Arm Studio's real uploads playlist.
 */
export function YouTubePlaylist({
  title,
  poster,
  caption,
  locale,
  className = "",
}: {
  title: string;
  poster: string;
  caption?: string;
  locale: Locale;
  className?: string;
}) {
  const d = getDict(locale);
  const [play, setPlay] = useState(false);

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-2xl bg-espresso ${className}`}>
      {play ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/videoseries?list=${ARM_UPLOADS_PLAYLIST}&autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label={`${d.youtube.watch}: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <img
            src={poster}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-espresso/20" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone/95 text-ink shadow-xl ring-1 ring-ink/10 transition-transform duration-300 group-hover:scale-110">
            <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor" aria-hidden="true">
              <path d="M1 1.5v19l17-9.5L1 1.5z" />
            </svg>
          </span>
          <span className="absolute bottom-5 left-5 right-5 flex items-center gap-3 text-left">
            <span className="rounded-full bg-bone/15 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-bone backdrop-blur">
              {d.youtube.watch}
            </span>
            <span className="text-bone/90 text-sm">{caption}</span>
          </span>
        </button>
      )}
    </div>
  );
}
