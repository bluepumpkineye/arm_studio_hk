"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";
import { getDict, type Locale } from "@/lib/i18n";
import { Arrow, WhatsAppIcon } from "./primitives";

export function QuoteForm({ locale, projectRef }: { locale: Locale; projectRef?: string }) {
  const d = getDict(locale);
  const q = d.quote;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    contact: "whatsapp",
    property: "",
    scope: "",
    budget: "",
    timeline: "",
    message: projectRef ? q.msgProject.replace("{ref}", projectRef) : "",
    company: "", // honeypot
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (form.company) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: projectRef ? "project" : "quote",
          name: form.name || undefined,
          email: form.email || undefined,
          phone: form.phone || undefined,
          projectSlug: projectRef || undefined,
          message: [
            `Property: ${form.property || "—"}`,
            `Scope: ${form.scope || "—"}`,
            `Budget: ${form.budget || "—"}`,
            `Timeline: ${form.timeline || "—"}`,
            `Preferred contact: ${form.contact}`,
            form.message ? `Notes: ${form.message}` : "",
          ].filter(Boolean).join("\n"),
        }),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full rounded-xl border border-ink/15 bg-bone px-4 py-3 text-ink placeholder:text-mist transition-colors focus:border-ink focus:outline-none";
  const labelClass = "eyebrow text-taupe";
  const contactLabels: Record<string, string> = locale === "zh"
    ? { whatsapp: "WhatsApp", email: "電郵", phone: "電話" }
    : { whatsapp: "WhatsApp", email: "Email", phone: "Phone" };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-line bg-paper/60 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-bone">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-3xl">{q.successTitle.replace("{name}", form.name || (locale === "zh" ? "" : "there")).trim()}</h3>
        <p className="mx-auto mt-3 max-w-md text-taupe">{q.successBody}</p>
        <a
          href={whatsappLink(locale === "zh" ? `你好 Arm Studio！我剛提交了項目查詢${projectRef ? `（關於「${projectRef}」）` : ""}。` : `Hi Arm Studio! I just submitted a project enquiry${projectRef ? ` about "${projectRef}"` : ""}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-espresso btn-press"
        >
          <WhatsAppIcon className="h-4 w-4" /> {q.continueWa}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {projectRef ? (
        <div className="rounded-xl border border-brass/30 bg-brass/5 px-4 py-3 text-sm text-ink/80">
          {q.interestedIn} <span className="font-semibold">{projectRef}</span>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="q-name" className={labelClass}>{q.name}</label>
          <input id="q-name" className={`${inputClass} mt-2`} value={form.name} onChange={(ev) => update("name", ev.target.value)} placeholder={q.phName} />
        </div>
        <div>
          <label htmlFor="q-phone" className={labelClass}>{q.phone}</label>
          <input id="q-phone" className={`${inputClass} mt-2`} value={form.phone} onChange={(ev) => update("phone", ev.target.value)} placeholder={q.phPhone} />
        </div>
      </div>

      <div>
        <label htmlFor="q-email" className={labelClass}>{q.email}</label>
        <input id="q-email" type="email" className={`${inputClass} mt-2`} value={form.email} onChange={(ev) => update("email", ev.target.value)} placeholder={q.phEmail} />
      </div>

      <fieldset>
        <legend className={labelClass}>{q.contactPref}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {["whatsapp", "email", "phone"].map((c) => (
            <button key={c} type="button" onClick={() => update("contact", c)} className={`rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-all ${form.contact === c ? "border-ink bg-ink text-bone" : "border-ink/15 bg-bone text-ink/70 hover:border-ink/40"}`}>
              {contactLabels[c]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select label={q.property} value={form.property} options={q.propertyOptions} placeholder={q.select} onChange={(v) => update("property", v)} inputClass={inputClass} labelClass={labelClass} />
        <Select label={q.scope} value={form.scope} options={q.scopeOptions} placeholder={q.select} onChange={(v) => update("scope", v)} inputClass={inputClass} labelClass={labelClass} />
        <Select label={q.budget} value={form.budget} options={q.budgetOptions} placeholder={q.select} onChange={(v) => update("budget", v)} inputClass={inputClass} labelClass={labelClass} />
        <Select label={q.timeline} value={form.timeline} options={q.timelineOptions} placeholder={q.select} onChange={(v) => update("timeline", v)} inputClass={inputClass} labelClass={labelClass} />
      </div>

      <div>
        <label htmlFor="q-msg" className={labelClass}>{q.message}</label>
        <textarea id="q-msg" rows={4} className={`${inputClass} mt-2 resize-none`} value={form.message} onChange={(ev) => update("message", ev.target.value)} placeholder={q.phMessage} />
      </div>

      <input type="text" name="company" tabIndex={-1} autoComplete="off" value={form.company} onChange={(ev) => update("company", ev.target.value)} className="hidden" aria-hidden />

      {status === "error" ? <p className="text-sm text-clay">{q.error}</p> : null}

      <button type="submit" disabled={status === "submitting" || (!form.email && !form.phone)} className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-bone transition-colors hover:bg-espresso disabled:cursor-not-allowed disabled:opacity-40 btn-press sm:w-auto">
        {status === "submitting" ? q.sending : q.submit}
        {status !== "submitting" ? <Arrow /> : null}
      </button>
      <p className="text-[0.72rem] text-taupe">{q.privacy}</p>
    </form>
  );
}

function Select({
  label, value, options, placeholder, onChange, inputClass, labelClass,
}: {
  label: string; value: string; options: readonly string[]; placeholder: string; onChange: (v: string) => void; inputClass: string; labelClass: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative mt-2">
        <select value={value} onChange={(ev) => onChange(ev.target.value)} className={`${inputClass} appearance-none pr-10 ${value ? "text-ink" : "text-mist"}`}>
          <option value="">{placeholder}</option>
          {options.map((o) => (<option key={o} value={o}>{o}</option>))}
        </select>
        <svg className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
