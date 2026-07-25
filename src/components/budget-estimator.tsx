"use client";

import { useMemo, useState } from "react";
import {
  estimateBudget,
  formatRange,
  formatHKD,
  TIER_PSF,
  type Tier,
  type Scope,
  type SizeKey,
  type PropertyType,
  type EstimateInput,
} from "@/lib/estimate";
import { whatsappLink } from "@/lib/site";
import { getDict, lp, pick, type Locale } from "@/lib/i18n";
import { Arrow, WhatsAppIcon } from "./primitives";

type Answers = Partial<EstimateInput>;

export function BudgetEstimator({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const e = d.estimator;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  const STEPS = [
    { hint: e.h_property, q: e.q_property, key: "property" as const },
    { hint: e.h_size, q: e.q_size, key: "size" as const },
    { hint: e.h_scope, q: e.q_scope, key: "scope" as const },
    { hint: e.h_tier, q: e.q_tier, key: "tier" as const },
  ];

  const complete = Boolean(answers.property && answers.size && answers.scope && answers.tier);
  const result = useMemo(() => {
    if (!complete) return null;
    return estimateBudget(answers as EstimateInput);
  }, [answers, complete]);

  function choose<K extends keyof Answers>(key: K, value: NonNullable<Answers[K]>) {
    setAnswers((a) => ({ ...a, [key]: value }));
    if (step < STEPS.length - 1) {
      window.setTimeout(() => setStep((s) => s + 1), 160);
    }
  }

  async function submitLead(ev: React.FormEvent) {
    ev.preventDefault();
    if (!result) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "estimate",
          name: contact.name || undefined,
          email: contact.email || undefined,
          phone: contact.phone || undefined,
          estimateMin: result.min,
          estimateMax: result.max,
          estimateInputs: answers,
        }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("success");
      setRevealed(true);
    } catch {
      setStatus("error");
      setRevealed(true);
    }
  }

  const currentKey = STEPS[step].key;
  const options: { key: string; label: string; sub: string; tier?: Tier }[] =
    currentKey === "property"
      ? [
          { key: "apartment", label: e.p_apartment, sub: e.p_apartment_sub },
          { key: "village-house", label: e.p_village, sub: e.p_village_sub },
          { key: "penthouse", label: e.p_penthouse, sub: e.p_penthouse_sub },
          { key: "office", label: e.p_office, sub: e.p_office_sub },
        ]
      : currentKey === "size"
        ? [
            { key: "under-400", label: e.s_under, sub: e.sqft },
            { key: "400-700", label: e.s_400, sub: e.sqft },
            { key: "700-1000", label: e.s_700, sub: e.sqft },
            { key: "1000-1500", label: e.s_1000, sub: e.sqft },
            { key: "1500-plus", label: e.s_1500, sub: e.sqft },
          ]
        : currentKey === "scope"
          ? [
              { key: "single-room", label: e.sc_single, sub: e.sc_single_sub },
              { key: "living-kitchen", label: e.sc_living, sub: e.sc_living_sub },
              { key: "full-home", label: e.sc_full, sub: e.sc_full_sub },
            ]
          : [
              { key: "standard", label: e.t_standard, sub: e.t_standard_sub, tier: "standard" },
              { key: "premium", label: e.t_premium, sub: e.t_premium_sub, tier: "premium" },
              { key: "luxury", label: e.t_luxury, sub: e.t_luxury_sub, tier: "luxury" },
            ];
  const selectedValue = answers[currentKey];

  const waMessage = result
    ? locale === "zh"
      ? `你好 Arm Studio！我用了你們的預算估算：${STEPS.map((s) => answers[s.key]).join(", ")} → 預計 ${formatRange(result.min, result.max)}。我想進一步了解我的項目。`
      : `Hi Arm Studio! I used your budget estimator: ${STEPS.map((s) => answers[s.key]).join(", ")} → estimated ${formatRange(result.min, result.max)}. I'd love to discuss my project.`
    : "";

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-paper/60">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 sm:px-9">
        <span className="eyebrow text-brass">{e.badge}</span>
        <div className="flex flex-1 items-center gap-2 px-4 sm:px-8">
          {STEPS.map((_, i) => (
            <span key={i} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-brass" : "bg-ink/15"}`} />
          ))}
        </div>
        <span className="eyebrow text-taupe">{String(Math.min(step + 1, STEPS.length)).padStart(2, "0")} / {STEPS.length}</span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Quiz — explicit dark text so it stays readable even when the card is
            placed inside a dark (text-bone) section like the homepage. */}
        <div className="p-6 text-ink sm:p-9">
          <div key={step} className="step-in">
            <p className="eyebrow text-taupe">{STEPS[step].hint}</p>
            <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight">{STEPS[step].q}</h3>
          </div>

          <div className={`mt-7 grid gap-3 ${currentKey === "size" ? "grid-cols-2 sm:grid-cols-3" : currentKey === "tier" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
            {options.map((opt) => {
              const active = selectedValue === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => choose(currentKey, opt.key as never)}
                  className={`group relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-300 ${active ? "border-ink bg-ink text-bone" : "border-ink/15 bg-bone hover:border-ink/40 hover:-translate-y-0.5"}`}
                >
                  <span className="font-display text-lg">{opt.label}</span>
                  <span className={`mt-1 text-[0.78rem] ${active ? "text-bone/60" : "text-taupe"}`}>{opt.sub}</span>
                  {opt.tier ? (
                    <span className={`mt-3 text-[0.72rem] font-medium ${active ? "text-sand" : "text-brass"}`}>{TIER_PSF[opt.tier].psf}</span>
                  ) : null}
                  <span className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border text-[0.6rem] transition-all ${active ? "border-bone bg-bone text-ink" : "border-ink/25 opacity-0 group-hover:opacity-60"}`}>
                    {active ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-taupe transition-colors hover:text-ink disabled:opacity-30"
            >
              ← {d.common.back}
            </button>
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!selectedValue} className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-ink transition-opacity disabled:opacity-30">
                {d.common.continue} →
              </button>
            ) : (
              <span className={`text-[0.78rem] font-medium uppercase tracking-[0.14em] ${complete ? "text-brass" : "text-taupe"}`}>
                {complete ? `${e.seeEstimate} →` : e.selectTier}
              </span>
            )}
          </div>
        </div>

        {/* Result panel */}
        <div className="relative border-t border-line bg-espresso p-6 text-bone sm:p-9 lg:border-l lg:border-t-0">
          {!complete ? (
            <div className="flex h-full flex-col justify-center text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-bone/20 text-sand">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
              <p className="mx-auto mt-5 max-w-[16rem] text-bone/60">{e.emptyHint}</p>
            </div>
          ) : result ? (
            <div key={revealed ? "open" : "locked"} className="step-in">
              <span className="eyebrow text-sand">{e.resultLabel}</span>
              <div className="mt-4">
                {revealed ? (
                  <>
                    <p className="font-display text-[clamp(2rem,5vw,3.1rem)] leading-none text-bone">{formatHKD(result.min)}</p>
                    <p className="mt-1 font-display text-[clamp(2rem,5vw,3.1rem)] leading-none text-sand">
                      {pick({ en: "to", zh: "至" }, locale)} {formatHKD(result.max)}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-[clamp(2rem,5vw,3.1rem)] leading-none tracking-[0.06em] text-bone/45">HK$ •••,•••</p>
                    <p className="mt-1 font-display text-[clamp(2rem,5vw,3.1rem)] leading-none tracking-[0.06em] text-bone/30">
                      {pick({ en: "to", zh: "至" }, locale)} HK$ •••,•••
                    </p>
                  </>
                )}
              </div>
              <p className={`mt-3 text-sm ${revealed ? "text-bone/60" : "text-bone/40"}`}>
                {result.psf} · {e.resultFoot}
              </p>

              {!revealed ? (
                <form onSubmit={submitLead} className="mt-7 space-y-3">
                  <p className="text-sm text-bone/70">{e.gate}</p>
                  <div className="grid gap-2.5">
                    <input type="email" required value={contact.email} onChange={(ev) => setContact((c) => ({ ...c, email: ev.target.value }))} placeholder={e.phEmail} className="w-full rounded-xl border border-bone/20 bg-bone/5 px-4 py-3 text-bone placeholder:text-bone/40 focus:border-sand focus:outline-none" />
                    <input type="text" value={contact.name} onChange={(ev) => setContact((c) => ({ ...c, name: ev.target.value }))} placeholder={e.phName} className="w-full rounded-xl border border-bone/20 bg-bone/5 px-4 py-3 text-bone placeholder:text-bone/40 focus:border-sand focus:outline-none" />
                    <input type="tel" value={contact.phone} onChange={(ev) => setContact((c) => ({ ...c, phone: ev.target.value }))} placeholder={e.phPhone} className="w-full rounded-xl border border-bone/20 bg-bone/5 px-4 py-3 text-bone placeholder:text-bone/40 focus:border-sand focus:outline-none" />
                  </div>
                  <button type="submit" disabled={status === "submitting"} className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-sand px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-bone disabled:opacity-60 btn-press">
                    {status === "submitting" ? e.unlocking : e.unlock}
                    {status !== "submitting" ? <Arrow /> : null}
                  </button>
                  <p className="text-center text-[0.68rem] text-bone/40">{e.noSpam}</p>
                </form>
              ) : (
                <div className="mt-7 space-y-3">
                  <div className="rounded-2xl border border-bone/15 bg-bone/5 p-4">
                    <p className="text-sm text-bone/80">{e.revealedNote}</p>
                  </div>
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sand px-5 py-3.5 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-bone btn-press">
                      <WhatsAppIcon className="h-4 w-4" /> {e.discussWa}
                    </a>
                    <a href={lp(locale, "/contact")} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-bone/30 px-5 py-3.5 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-bone transition-colors hover:bg-bone/10 btn-press">
                      {e.bookConsult}
                    </a>
                  </div>
                  {status === "success" ? <p className="text-center text-[0.74rem] text-sand">{e.thanks}</p> : status === "error" ? <p className="text-center text-[0.74rem] text-bone/60">{e.savedLocal}</p> : null}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
