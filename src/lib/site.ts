/**
 * Central site configuration for Arm Studio Limited.
 * NOTE: WhatsApp / phone are placeholders — replace with the studio's real number
 * (NEXT_PUBLIC_WHATSAPP env var overrides at runtime).
 */

export const site = {
  name: "Arm Studio",
  legalName: "Arm Studio Limited",
  shortName: "Arm Studio",
  tagline: "Interior Design Studio",
  city: "Hong Kong",
  region: "Hong Kong",
  email: "hello@armstudio.hk",
  phoneDisplay: "+852 5678 9012",
  /** digits only, international format for wa.me */
  whatsapp: "85256789012",
  established: 2018,
  socials: {
    instagram: "https://www.instagram.com/arm_studio_limited/",
    facebook: "https://www.facebook.com/p/Arm-Studio-61565666100457/",
    youtube: "https://www.youtube.com/channel/UC1uTf9TcRY2tanH0RldPkHQ",
  },
} as const;

export function whatsappLink(message?: string): string {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP || site.whatsapp;
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const NAV = [
  { label: "Studio", href: "/studio" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Press", href: "/press" },
  { label: "Budget Estimator", href: "/estimate" },
  { label: "Contact", href: "/contact" },
] as const;

export const ROOM_TYPES = [
  "Living Room",
  "Kitchen",
  "Bathroom",
  "Bedroom",
  "Dining",
  "Full Home",
] as const;

export const BUDGET_TIERS = ["HK$300k+", "HK$600k+", "HK$1M+"] as const;

export const STYLES = [
  "Japandi",
  "Minimalist",
  "Modern Luxe",
  "Wabi-Sabi",
  "Industrial",
  "Classic",
] as const;
