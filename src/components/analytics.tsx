"use client";

import Script from "next/script";

/**
 * Analytics — Microsoft Clarity (heatmaps, session recordings, funnels) +
 * Google Analytics 4 (baseline traffic). Both are no-ops until the matching
 * NEXT_PUBLIC_* env var is set, so the site is fully functional without them.
 *
 *   NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
 *   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
 */
export function Analytics() {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <>
      {ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga4Id}', { anonymize_ip: true, send_page_view: true });`}
          </Script>
        </>
      ) : null}

      {clarityId ? (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      ) : null}
    </>
  );
}
