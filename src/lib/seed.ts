import { db } from "@/db";
import { projects, testimonials, pressItems, leads } from "@/db/schema";

const px = (id: number, ext: "jpeg" | "png" = "jpeg", w = 1500, h = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const HERO = "/images/hero.jpg";
const BEFORE_LIVING = "/images/before-living.jpg";
const AFTER_LIVING = "/images/after-living.jpg";
const BEFORE_KITCHEN = "/images/before-kitchen.jpg";
const AFTER_KITCHEN = "/images/after-kitchen.jpg";

export const PROJECTS = [
  {
    slug: "gm815-kam-tin-house",
    title: "GM815 — Kam Tin Village House",
    client: "Private client",
    location: "Kam Tin, Yuen Long",
    district: "New Territories",
    roomType: "Full Home, Living Room, Kitchen, Bathroom",
    budgetTier: "HK$1M+",
    style: "Japandi",
    year: 2025,
    areaSqft: 2100,
    durationWeeks: 22,
    summary:
      "A 2,100 sq ft three-storey village house reimagined as a warm, light-filled sanctuary — recognised with a 2025 Home Journal Award Merit.",
    description:
      "Set against the green of Kam Tin, GM815 reworks a standard three-storey village house into a calm, layered retreat. We opened up the ground floor into one continuous living, dining and kitchen volume, wrapped in warm microcement and oak. A double-height stairwell draws daylight deep into the plan, while a consistent palette of travertine, walnut and linen keeps the three floors feeling like a single, considered home. The project was awarded a 2025 Home Journal Award Merit for residential interior design.",
    coverImage: HERO,
    gallery: [HERO, AFTER_LIVING, px(7031732), px(8135491), px(6580414)],
    beforeImage: BEFORE_LIVING,
    afterImage: AFTER_LIVING,
    featured: true,
    published: true,
  },
  {
    slug: "robinson-mid-levels",
    title: "The Robinson Residence",
    client: "The Robinson family",
    location: "Robinson Road, Mid-Levels",
    district: "Hong Kong Island",
    roomType: "Full Home, Living Room, Kitchen",
    budgetTier: "HK$600k+",
    style: "Minimalist",
    year: 2024,
    areaSqft: 980,
    durationWeeks: 16,
    summary:
      "A compact Mid-Levels flat opened up into a calm, storage-rich family home with a fully reworked kitchen.",
    description:
      "Working within a tight 980 sq ft, we removed non-structural partitions to let a single L-shaped volume carry living, dining and cooking. Full-height oak joinery conceals storage and the entrance, while a repositioned kitchen now anchors the home with a stone island that doubles as the family hub.",
    coverImage: px(7031732),
    gallery: [px(7031732), px(6580381), px(8135491), AFTER_KITCHEN],
    beforeImage: BEFORE_KITCHEN,
    afterImage: AFTER_KITCHEN,
    featured: true,
    published: true,
  },
  {
    slug: "taikoo-shores-apartment",
    title: "Taikoo Shores Apartment",
    client: "Private client",
    location: "Taikoo Shing",
    district: "Hong Kong Island",
    roomType: "Living Room, Kitchen",
    budgetTier: "HK$300k+",
    style: "Modern Luxe",
    year: 2024,
    areaSqft: 720,
    durationWeeks: 11,
    summary:
      "An open-plan refresh pairing warm stone with brushed brass for a polished, contemporary feel.",
    description:
      "A focused refresh of the common areas in a Taikoo Shing apartment. We introduced a continuous stone floor, a fluted-media feature wall and a streamlined kitchen with integrated appliances, giving the space a quiet, upscale presence without altering its footprint.",
    coverImage: px(6580381),
    gallery: [px(6580381), px(6580414), px(8089079)],
    featured: false,
    published: true,
  },
  {
    slug: "sai-kung-seafront-villa",
    title: "Sai Kung Seafront Villa",
    client: "Private client",
    location: "Sai Kung",
    district: "New Territories",
    roomType: "Full Home, Kitchen, Bathroom",
    budgetTier: "HK$1M+",
    style: "Japandi",
    year: 2023,
    areaSqft: 2600,
    durationWeeks: 26,
    summary:
      "A sea-facing villa styled around natural materials, soft light and generous, unfussy spaces.",
    description:
      "With the harbour as a backdrop, this villa is built around restraint: lime-washed walls, pale oak and a restrained stone palette. The kitchen and primary bathroom were reimagined as spa-like anchors, each framed to catch the view.",
    coverImage: px(34538290),
    gallery: [px(34538290), px(8146153), px(6580414)],
    featured: true,
    published: true,
  },
  {
    slug: "discovery-bay-family-home",
    title: "Discovery Bay Family Home",
    client: "The Cheng family",
    location: "Discovery Bay",
    district: "Lantau Island",
    roomType: "Living Room, Bedroom",
    budgetTier: "HK$600k+",
    style: "Wabi-Sabi",
    year: 2023,
    areaSqft: 1300,
    durationWeeks: 14,
    summary:
      "Textured plaster, raw timber and soft linen create a grounded, tactile family home.",
    description:
      "A wabi-sabi leaning home for a young family, embracing imperfection through hand-troweled plaster, raw edge timber and a muted, earthy palette. Built-in cabinetry keeps everyday life tidy while letting the materials do the talking.",
    coverImage: px(7166929),
    gallery: [px(7166929), px(7587806), px(6580388)],
    featured: false,
    published: true,
  },
  {
    slug: "marble-spa-bathroom",
    title: "Marble Spa Bathroom",
    client: "Private client",
    location: "Repulse Bay",
    district: "Hong Kong Island",
    roomType: "Bathroom",
    budgetTier: "HK$300k+",
    style: "Modern Luxe",
    year: 2024,
    areaSqft: 140,
    durationWeeks: 7,
    summary:
      "A primary bathroom transformed into a private stone spa with a freestanding soaking tub.",
    description:
      "A single-room commission that turns a dated en-suite into a serene stone-clad retreat. Book-matched marble, a walk-in rain shower and a sculptural freestanding tub create a hotel-grade sanctuary at home.",
    coverImage: px(8146153),
    gallery: [px(8146153), px(8089171), px(7195883)],
    featured: false,
    published: true,
  },
  {
    slug: "stone-and-oak-kitchen",
    title: "Stone & Oak Kitchen",
    client: "Private client",
    location: "Causeway Bay",
    district: "Hong Kong Island",
    roomType: "Kitchen",
    budgetTier: "HK$300k+",
    style: "Minimalist",
    year: 2023,
    areaSqft: 180,
    durationWeeks: 8,
    summary:
      "A handleless oak-and-stone kitchen designed for a keen home cook.",
    description:
      "Function-first but quietly beautiful, this kitchen pairs handleless oak cabinetry with a dark stone worktop and an integrated island. Concealed storage, a dedicated prep zone and warm under-cabinet lighting make it a joy to cook in.",
    coverImage: px(35021550),
    gallery: [px(35021550), px(6032398), px(6580414)],
    featured: false,
    published: true,
  },
  {
    slug: "kennedy-town-primary-suite",
    title: "Kennedy Town Primary Suite",
    client: "Private client",
    location: "Kennedy Town",
    district: "Hong Kong Island",
    roomType: "Bedroom, Bathroom",
    budgetTier: "HK$300k+",
    style: "Japandi",
    year: 2024,
    areaSqft: 320,
    durationWeeks: 9,
    summary:
      "A bedroom and en-suite united into one restful, wood-wrapped suite.",
    description:
      "We merged a small bedroom and its bathroom into a unified suite wrapped in warm oak and soft plaster. A pocket of privacy in dense Kennedy Town, designed around rest.",
    coverImage: px(7587806),
    gallery: [px(7587806), px(6580388), px(8134806)],
    featured: false,
    published: true,
  },
  {
    slug: "repulse-bay-penthouse",
    title: "Repulse Bay Penthouse",
    client: "Private client",
    location: "Repulse Bay",
    district: "Hong Kong Island",
    roomType: "Full Home, Living Room, Bathroom",
    budgetTier: "HK$1M+",
    style: "Classic",
    year: 2022,
    areaSqft: 3100,
    durationWeeks: 30,
    summary:
      "A grand seafront penthouse balanced between classic elegance and modern comfort.",
    description:
      "Our largest residential commission to date. Classic proportions, panelled walls and a layered lighting plan give this penthouse timeless elegance, while contemporary furniture and a restrained palette keep it livable for a young family.",
    coverImage: px(13490215),
    gallery: [px(13490215), px(8134754), px(7214328)],
    featured: false,
    published: true,
  },
];

export const TESTIMONIALS = [
  { name: "Stephanie L.", role: "Homeowner", project: "GM815 — Kam Tin Village House", location: "Kam Tin", rating: 5, quote: "Arm Studio turned our raw village house into the calmest space we have ever lived in. Every detail was considered and the process felt effortless from start to finish.", featured: true },
  { name: "James & Anna Robinson", role: "Homeowners", project: "The Robinson Residence", location: "Mid-Levels", rating: 5, quote: "They maximised every inch of our flat. The storage solutions alone changed how our family lives day to day — and it looks stunning.", featured: true },
  { name: "Mr. Cheng", role: "Homeowner", project: "Discovery Bay Family Home", location: "Discovery Bay", rating: 5, quote: "Honest, reliable and genuinely thoughtful. The Home Journal award is well deserved — our home feels like a retreat.", featured: true },
  { name: "Vanessa T.", role: "Homeowner", project: "Marble Spa Bathroom", location: "Repulse Bay", rating: 5, quote: "I wanted a hotel bathroom at home and that is exactly what I got. The craftsmanship on the stone was impeccable.", featured: false },
  { name: "Daniel K.", role: "Restaurant owner", project: "Office / F&B concept", location: "Central", rating: 5, quote: "They understood our brand immediately and delivered a space that performs commercially while feeling beautiful.", featured: false },
  { name: "Priya & Sam", role: "Homeowners", project: "Kennedy Town Primary Suite", location: "Kennedy Town", rating: 5, quote: "On time, on budget, and the result exceeded the renders. We have already recommended Arm Studio to three friends.", featured: false },
];

export const PRESS = [
  { title: "Home Journal Award 2025 — Merit", publication: "Home Journal", category: "award", year: 2025, blurb: "Awarded for the GM815 Kam Tin village house project — residential interior design.", sortOrder: 0 },
  { title: "Studio Feature: Artistry, Reliability, Mindfulness", publication: "Home Journal", category: "press", year: 2025, blurb: "A profile on Arm Studio's design philosophy and recent work.", sortOrder: 1 },
  { title: "Village House Reimagined", publication: "Design Anthology", category: "press", year: 2024, blurb: "Inside the Kam Tin renovation that earned national recognition.", sortOrder: 2 },
  { title: "Quiet Luxury in Hong Kong Homes", publication: "Tatler Asia", category: "press", year: 2024, blurb: "Arm Studio among the studios defining restrained, liveable luxury.", sortOrder: 3 },
  { title: "Interior Studios to Watch", publication: "Livingetc Hong Kong", category: "press", year: 2023, blurb: "A round-up of emerging Hong Kong design talent.", sortOrder: 4 },
];

export async function runSeed() {
  await db.delete(leads);
  await db.delete(pressItems);
  await db.delete(testimonials);
  await db.delete(projects);

  await db.insert(projects).values(PROJECTS);
  await db.insert(testimonials).values(TESTIMONIALS);
  await db.insert(pressItems).values(PRESS);

  return {
    projects: PROJECTS.length,
    testimonials: TESTIMONIALS.length,
    press: PRESS.length,
  };
}
