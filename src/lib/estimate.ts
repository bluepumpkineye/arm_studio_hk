/**
 * Budget estimator engine.
 * Realistic Hong Kong fit-out + furniture + design rates per usable sq ft.
 * Shared between the client quiz and the server-side lead capture.
 */

export type Tier = "standard" | "premium" | "luxury";
export type Scope = "single-room" | "living-kitchen" | "full-home";
export type SizeKey = "under-400" | "400-700" | "700-1000" | "1000-1500" | "1500-plus";
export type PropertyType = "apartment" | "village-house" | "penthouse" | "office";

/** HK$ per sq ft by finish tier */
export const TIER_PSF: Record<Tier, { min: number; max: number; psf: string }> = {
  standard: { min: 900, max: 1400, psf: "HK$900–1,400 / sq ft" },
  premium: { min: 1500, max: 2300, psf: "HK$1,500–2,300 / sq ft" },
  luxury: { min: 2600, max: 4200, psf: "HK$2,600–4,200 / sq ft" },
};

/** scope scales the total because partial fit-outs cost less than a full home */
export const SCOPE_FACTOR: Record<Scope, number> = {
  "single-room": 0.3,
  "living-kitchen": 0.6,
  "full-home": 1,
};

/** representative sq ft for each bracket */
export const SIZE_SQFT: Record<SizeKey, number> = {
  "under-400": 350,
  "400-700": 550,
  "700-1000": 850,
  "1000-1500": 1250,
  "1500-plus": 1900,
};

export const PROPERTY_FACTOR: Record<PropertyType, number> = {
  apartment: 1,
  "village-house": 1.12,
  penthouse: 1.18,
  office: 0.92,
};

export interface EstimateInput {
  tier: Tier;
  scope: Scope;
  size: SizeKey;
  property: PropertyType;
}

export interface EstimateResult {
  min: number;
  max: number;
  psf: string;
}

function roundTo(v: number, step: number): number {
  return Math.round(v / step) * step;
}

export function estimateBudget(input: EstimateInput): EstimateResult {
  const psf = TIER_PSF[input.tier];
  const sqft = SIZE_SQFT[input.size];
  const factor = SCOPE_FACTOR[input.scope] * PROPERTY_FACTOR[input.property];
  const min = roundTo(psf.min * sqft * factor, 10000);
  const max = roundTo(psf.max * sqft * factor, 10000);
  return { min, max, psf: psf.psf };
}

export function formatHKD(n: number): string {
  return "HK$" + n.toLocaleString("en-HK");
}

export function formatRange(min: number, max: number): string {
  return `${formatHKD(min)} – ${formatHKD(max)}`;
}

export const TIER_LABELS: Record<Tier, string> = {
  standard: "Standard",
  premium: "Premium",
  luxury: "Luxury",
};

export const TIER_BLURB: Record<Tier, string> = {
  standard: "Durable finishes, curated brands, smart layout.",
  premium: "Custom joinery, natural stone, designer lighting.",
  luxury: "Bespoke millwork, rare materials, full styling.",
};
