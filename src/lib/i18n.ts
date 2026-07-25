/**
 * Arm Studio — bilingual content (English / 繁體中文 · 香港用語).
 * Cookie-based locale with a header toggle. UI strings live here as a typed
 * dictionary; long-form DB content (projects, testimonials, press) has parallel
 * translations keyed by slug/name so no schema change is needed.
 */

export type Locale = "en" | "zh";
export const LOCALES: Locale[] = ["en", "zh"];
export const LOCALE_LABELS: Record<Locale, string> = { en: "EN", zh: "繁" };
export const LOCALE_NAMES: Record<Locale, string> = { en: "English", zh: "繁體中文" };
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "zh";
}

/** Pick the localized value from an {en, zh} pair, falling back to English. */
export function pick<T>(pair: { en: T; zh: T }, locale: Locale): T {
  return pair[locale] ?? pair.en;
}

/**
 * Localize an internal path for the current locale. English is served at the
 * root (no prefix); Chinese is prefixed with /zh. Used on every internal link
 * so navigation keeps the user's chosen language without cookies.
 */
export function lp(locale: Locale, path: string): string {
  if (locale !== "zh") return path;
  if (path === "/") return "/zh";
  return `/zh${path}`;
}

/* ------------------------------------------------------------------ */
/* Shared UI dictionary                                                */
/* ------------------------------------------------------------------ */

const en = {
  nav: {
    studio: "Studio",
    portfolio: "Portfolio",
    services: "Services",
    press: "Press",
    estimate: "Budget Estimator",
    contact: "Contact",
  },
  header: { getEstimate: "Get Estimate" },
  common: {
    explorePortfolio: "Explore the portfolio",
    estimateBudget: "Estimate your budget",
    requestQuote: "Request a quote",
    fullQuote: "Full quote",
    viewProject: "View project",
    viewAllProjects: "View all projects",
    allWork: "All work",
    bookConsultation: "Book consultation",
    chatWhatsApp: "Chat on WhatsApp",
    discussProject: "Discuss your project",
    discussOnWhatsApp: "Discuss on WhatsApp",
    startConversation: "Start a conversation",
    requestSimilar: "Request a similar design",
    back: "Back",
    continue: "Continue",
  },
  award: { short: "2025 Home Journal Award · Merit" },
  beforeAfter: {
    before: "Before",
    after: "After",
    dragAria: "Drag to compare before and after",
  },
  youtube: { watch: "▶ Watch" },
  footer: {
    startProject: "Start a project",
    shapeTitle1: "Let's shape",
    shapeTitle2: "your space.",
    shapeBody:
      "Tell us about your home or office in Hong Kong. We'll reply within one business day with next steps — no obligation.",
    explore: "Explore",
    studio: "Studio",
    rights: "All rights reserved.",
    ethos: "Artistry · Reliability · Mindfulness",
    crafted: "Crafted in Hong Kong",
  },
  filters: {
    room: "Room",
    budget: "Budget",
    style: "Style",
    all: "All",
    showing: "Showing",
    of: "of",
    projects: "projects",
    clear: "Clear filters",
    noMatchTitle: "No projects match those filters yet.",
    noMatchHint: "Try widening your selection — or tell us what you have in mind.",
    reset: "Reset filters",
  },
  spec: {
    details: "Project details",
    location: "Location",
    district: "District",
    rooms: "Rooms",
    style: "Style",
    budget: "Budget",
    area: "Area",
    build: "Build",
    year: "Year",
  },
  card: { awardTag: "★ Award" },
  notFound: {
    eyebrow: "Error 404",
    title: "This room doesn't exist.",
    body: "The page you're looking for may have been moved or never built. Let's get you back.",
    back: "Back to home",
  },
  estimator: {
    badge: "Budget Estimator",
    h_property: "Property type",
    q_property: "What are you renovating?",
    h_size: "Usable floor area",
    q_size: "How big is the space?",
    h_scope: "Rooms involved",
    q_scope: "What's the scope?",
    h_tier: "Materials & detailing",
    q_tier: "Finish tier?",
    p_apartment: "Apartment",
    p_apartment_sub: "Private flat / estate unit",
    p_village: "Village House",
    p_village_sub: "2–3 storey NT home",
    p_penthouse: "Penthouse / House",
    p_penthouse_sub: "Large or duplex residence",
    p_office: "Office / F&B",
    p_office_sub: "Commercial space",
    s_under: "Under 400",
    s_400: "400 – 700",
    s_700: "700 – 1,000",
    s_1000: "1,000 – 1,500",
    s_1500: "1,500+",
    sqft: "sq ft",
    sc_single: "Single Room",
    sc_single_sub: "One room or bathroom",
    sc_living: "Living + Kitchen",
    sc_living_sub: "Open common area",
    sc_full: "Full Home",
    sc_full_sub: "Whole-property fit-out",
    t_standard: "Standard",
    t_standard_sub: "Solid, dependable finishes",
    t_premium: "Premium",
    t_premium_sub: "Custom joinery & stone",
    t_luxury: "Luxury",
    t_luxury_sub: "Bespoke, rare materials",
    resultLabel: "Estimated range",
    resultFoot: "design + fit-out + furnishing (excl. structural & gov. fees)",
    gate: "Enter your email to unlock the full breakdown and next steps.",
    phEmail: "you@email.com",
    phName: "Name (optional)",
    phPhone: "WhatsApp no. (optional)",
    unlock: "Unlock estimate",
    unlocking: "Unlocking…",
    noSpam: "No spam. One follow-up to help scope your project.",
    revealedNote:
      "This is a planning range based on typical Hong Kong fit-out rates. Book a free consultation for a precise quote tailored to your space.",
    discussWa: "Discuss on WhatsApp",
    bookConsult: "Book consultation",
    thanks: "✓ Thanks — we'll be in touch shortly.",
    savedLocal: "Saved locally — please reach out via WhatsApp.",
    emptyHint:
      "Answer four quick questions and we'll model a realistic Hong Kong budget range for your project.",
    selectTier: "Select a tier",
    seeEstimate: "See your estimate",
  },
  quote: {
    name: "Full name",
    phName: "Your name",
    phone: "WhatsApp / phone",
    phPhone: "+852 …",
    email: "Email",
    phEmail: "you@email.com",
    contactPref: "Preferred contact",
    property: "Property type",
    scope: "Scope",
    budget: "Budget range",
    timeline: "Timeline",
    message: "Tell us about your space",
    phMessage: "Rooms, style, must-haves, anything we should know…",
    select: "Select…",
    submit: "Request my quote",
    sending: "Sending…",
    privacy: "We'll never share your details. Expect a reply within one business day.",
    interestedIn: "Enquiring about",
    successTitle: "Thank you, {name}.",
    successBody:
      "Your request is in. We reply within one business day. For an instant chat, reach us on WhatsApp.",
    continueWa: "Continue on WhatsApp",
    error: "Something went wrong sending — please try WhatsApp instead.",
    msgProject: 'I\'m interested in a design similar to "{ref}".',
    propertyOptions: ["Apartment", "Village House", "Penthouse / House", "Office / F&B"],
    scopeOptions: ["Single Room", "Living + Kitchen", "Full Home"],
    budgetOptions: ["Under HK$300k", "HK$300k–600k", "HK$600k–1M", "HK$1M+"],
    timelineOptions: ["ASAP", "1–3 months", "3–6 months", "Just exploring"],
  },
};

const zh: typeof en = {
  nav: {
    studio: "工作室",
    portfolio: "作品集",
    services: "服務",
    press: "媒體與獎項",
    estimate: "預算估算",
    contact: "聯絡我們",
  },
  header: { getEstimate: "即時估價" },
  common: {
    explorePortfolio: "瀏覽作品集",
    estimateBudget: "預算估算",
    requestQuote: "索取報價",
    fullQuote: "完整報價",
    viewProject: "查看項目",
    viewAllProjects: "查看全部作品",
    allWork: "全部作品",
    bookConsultation: "預約諮詢",
    chatWhatsApp: "WhatsApp 聯絡",
    discussProject: "洽談你的項目",
    discussOnWhatsApp: "WhatsApp 洽談",
    startConversation: "開始對話",
    requestSimilar: "要求類似設計",
    back: "返回",
    continue: "繼續",
  },
  award: { short: "2025 Home Journal 設計大獎 · 優異獎" },
  beforeAfter: {
    before: "翻新前",
    after: "翻新後",
    dragAria: "拖曳以比較翻新前後",
  },
  youtube: { watch: "▶ 觀看" },
  footer: {
    startProject: "開展項目",
    shapeTitle1: "讓我們",
    shapeTitle2: "塑造你的空間。",
    shapeBody: "告訴我們你在香港的家居或辦公室，我們將於一個工作天內回覆後續步驟——無任何約束。",
    explore: "探索",
    studio: "工作室",
    rights: "版權所有。",
    ethos: "藝術 · 可靠 · 用心",
    crafted: "香港製作",
  },
  filters: {
    room: "房間",
    budget: "預算",
    style: "風格",
    all: "全部",
    showing: "顯示",
    of: "共",
    projects: "個項目",
    clear: "清除篩選",
    noMatchTitle: "暫時沒有符合篩選條件的項目。",
    noMatchHint: "嘗試放寬條件——或告訴我們你的想法。",
    reset: "重設篩選",
  },
  spec: {
    details: "項目資料",
    location: "地點",
    district: "地區",
    rooms: "房間",
    style: "風格",
    budget: "預算",
    area: "面積",
    build: "施工期",
    year: "年份",
  },
  card: { awardTag: "★ 得獎" },
  notFound: {
    eyebrow: "錯誤 404",
    title: "這個空間並不存在。",
    body: "你想尋找的頁面可能已移除或從未建立，讓我們帶你回去。",
    back: "返回主頁",
  },
  estimator: {
    badge: "預算估算",
    h_property: "物業類型",
    q_property: "你要翻新甚麼？",
    h_size: "實用面積",
    q_size: "空間有多大？",
    h_scope: "翻新範圍",
    q_scope: "翻新範圍？",
    h_tier: "用料與細節",
    q_tier: "用料等級？",
    p_apartment: "分層住宅",
    p_apartment_sub: "私人單位／屋苑",
    p_village: "村屋",
    p_village_sub: "新界兩至三層村屋",
    p_penthouse: "頂層／獨立屋",
    p_penthouse_sub: "大型或複式住宅",
    p_office: "辦公室／餐飲",
    p_office_sub: "商業空間",
    s_under: "400 呎以下",
    s_400: "400 – 700",
    s_700: "700 – 1,000",
    s_1000: "1,000 – 1,500",
    s_1500: "1,500+",
    sqft: "平方呎",
    sc_single: "單一房間",
    sc_single_sub: "一個房間或浴室",
    sc_living: "客廳＋廚房",
    sc_living_sub: "開放式公共空間",
    sc_full: "全屋",
    sc_full_sub: "全屋翻新",
    t_standard: "標準",
    t_standard_sub: "實用可靠用料",
    t_premium: "高級",
    t_premium_sub: "訂造木作與石材",
    t_luxury: "奢華",
    t_luxury_sub: "訂製珍罕材質",
    resultLabel: "預算範圍",
    resultFoot: "設計＋翻新＋傢俬（不含結構及政府費用）",
    gate: "輸入電郵即可解鎖完整預算分析與後續步驟。",
    phEmail: "你@email.com",
    phName: "姓名（可選）",
    phPhone: "WhatsApp 號碼（可選）",
    unlock: "解鎖估價",
    unlocking: "解鎖中…",
    noSpam: "絕無濫發。我們會跟進一次以了解你的項目。",
    revealedNote: "此為根據香港一般翻新收費的預算參考。預約免費諮詢以獲取針對你空間的精確報價。",
    discussWa: "WhatsApp 洽談",
    bookConsult: "預約諮詢",
    thanks: "✓ 謝謝——我們將盡快聯絡你。",
    savedLocal: "已本地保存——請經 WhatsApp 聯絡。",
    emptyHint: "回答四條簡單問題，我們將為你的項目推算一個切合香港的預算範圍。",
    selectTier: "請選擇等級",
    seeEstimate: "查看你的預算",
  },
  quote: {
    name: "全名",
    phName: "你的姓名",
    phone: "WhatsApp／電話",
    phPhone: "+852 …",
    email: "電郵",
    phEmail: "你@email.com",
    contactPref: "聯絡方式",
    property: "物業類型",
    scope: "範圍",
    budget: "預算",
    timeline: "時間",
    message: "告訴我們你的空間",
    phMessage: "房間、風格、必須要求……",
    select: "請選擇…",
    submit: "提交報價請求",
    sending: "發送中…",
    privacy: "我們絕不外洩你的資料。將於一個工作天內回覆。",
    interestedIn: "查詢項目",
    successTitle: "謝謝你，{name}。",
    successBody: "已收到你的請求。我們將於一個工作天內回覆。想即時傾？請用 WhatsApp 聯絡我們。",
    continueWa: "於 WhatsApp 繼續",
    error: "發送失敗——請改用 WhatsApp 聯絡。",
    msgProject: '我對「{ref}」類似的設計有興趣。',
    propertyOptions: ["分層住宅", "村屋", "頂層／獨立屋", "辦公室／餐飲"],
    scopeOptions: ["單一房間", "客廳＋廚房", "全屋"],
    budgetOptions: ["HK$30萬以下", "HK$30–60萬", "HK$60–100萬", "HK$100萬+"],
    timelineOptions: ["盡快", "1–3 個月", "3–6 個月", "純粹了解"],
  },
};

export type Dict = typeof en;
export const messages: Record<Locale, Dict> = { en, zh };
export function getDict(locale: Locale): Dict {
  return messages[locale];
}

/* ------------------------------------------------------------------ */
/* Enum-style label maps (raw DB value -> display)                     */
/* ------------------------------------------------------------------ */

const ROOM_LABELS: Record<Locale, Record<string, string>> = {
  en: {},
  zh: {
    "Living Room": "客廳",
    Kitchen: "廚房",
    Bathroom: "浴室",
    Bedroom: "睡房",
    Dining: "飯廳",
    "Full Home": "全屋",
  },
};
export function roomLabel(value: string, locale: Locale): string {
  const trimmed = value.trim();
  return ROOM_LABELS[locale][trimmed] ?? trimmed;
}

const STYLE_LABELS: Record<Locale, Record<string, string>> = {
  en: {},
  zh: {
    Japandi: "和風簡約",
    Minimalist: "極簡",
    "Modern Luxe": "現代奢華",
    "Wabi-Sabi": "侘寂",
    Industrial: "工業風",
    Classic: "古典",
  },
};
export function styleLabel(value: string, locale: Locale): string {
  const trimmed = value.trim();
  return STYLE_LABELS[locale][trimmed] ?? trimmed;
}

const TIER_LABELS: Record<Locale, Record<string, string>> = {
  en: {},
  zh: {
    "HK$300k+": "HK$30萬+",
    "HK$600k+": "HK$60萬+",
    "HK$1M+": "HK$100萬+",
  },
};
export function tierLabel(value: string, locale: Locale): string {
  const trimmed = value.trim();
  return TIER_LABELS[locale][trimmed] ?? trimmed;
}

/* ------------------------------------------------------------------ */
/* Translated DB content                                               */
/* ------------------------------------------------------------------ */

type Pair = { en: string; zh: string };

export const PROJECT_COPY: Record<string, { summary: Pair; description: Pair }> = {
  "gm815-kam-tin-house": {
    summary: {
      en: "A 2,100 sq ft three-storey village house reimagined as a warm, light-filled sanctuary — recognised with a 2025 Home Journal Award Merit.",
      zh: "2,100 平方呎的三層村屋，化身為溫暖、採光充足的安棲之所——榮獲 2025 Home Journal 設計大獎優異獎。",
    },
    description: {
      en: "Set against the green of Kam Tin, GM815 reworks a standard three-storey village house into a calm, layered retreat. We opened up the ground floor into one continuous living, dining and kitchen volume, wrapped in warm microcement and oak. A double-height stairwell draws daylight deep into the plan, while a consistent palette of travertine, walnut and linen keeps the three floors feeling like a single, considered home. The project was awarded a 2025 Home Journal Award Merit for residential interior design.",
      zh: "坐落於錦田的翠綠之中，GM815 將一座標準三層村屋重新塑造成沉穩、層次分明的避世居所。我們把地下打通成一個連貫的客飯廳與廚房空間，以微水泥與橡木包裹。雙層高中庭把日光引進平面深處，而石灰華、胡桃木與亞麻的一致用色，令三層樓感覺像同一個經深思熟慮的家。此項目榮獲 2025 Home Journal 住宅室內設計優異獎。",
    },
  },
  "robinson-mid-levels": {
    summary: {
      en: "A compact Mid-Levels flat opened up into a calm, storage-rich family home with a fully reworked kitchen.",
      zh: "半山羅便臣道一個面積有限的小單位，打通成為寧靜、收納充裕的家庭居所，廚房全面翻新。",
    },
    description: {
      en: "Working within a tight 980 sq ft, we removed non-structural partitions to let a single L-shaped volume carry living, dining and cooking. Full-height oak joinery conceals storage and the entrance, while a repositioned kitchen now anchors the home with a stone island that doubles as the family hub.",
      zh: "在 980 平方呎的有限空間內，我們拆除非結構牆，讓一個 L 形空間同時承載客廳、飯廳與廚房。通頂橡木儲物櫃隱藏收納與玄關，而重新規劃的廚房以石中島為核心，成為一家人的生活樞紐。",
    },
  },
  "taikoo-shores-apartment": {
    summary: {
      en: "An open-plan refresh pairing warm stone with brushed brass for a polished, contemporary feel.",
      zh: "開放式翻新，以暖石配拉絲黃銅，營造精緻的當代質感。",
    },
    description: {
      en: "A focused refresh of the common areas in a Taikoo Shing apartment. We introduced a continuous stone floor, a fluted-media feature wall and a streamlined kitchen with integrated appliances, giving the space a quiet, upscale presence without altering its footprint.",
      zh: "太古城一個單位的公共區域重點翻新。我們引入連貫的石地板、凹槽特色牆，以及配備嵌入式電器的簡約廚房，在不改動間隔下為空間注入低調高級的質感。",
    },
  },
  "sai-kung-seafront-villa": {
    summary: {
      en: "A sea-facing villa styled around natural materials, soft light and generous, unfussy spaces.",
      zh: "海景別墅以天然材質、柔和光線與寬敞俐落的空間為主軸。",
    },
    description: {
      en: "With the harbour as a backdrop, this villa is built around restraint: lime-washed walls, pale oak and a restrained stone palette. The kitchen and primary bathroom were reimagined as spa-like anchors, each framed to catch the view.",
      zh: "以海港為背景，這座別墅以克制為本：石灰牆、淺色橡木與克制的石材用色。廚房與主浴被重新構思為水療般的空間，各自框住海景。",
    },
  },
  "discovery-bay-family-home": {
    summary: {
      en: "Textured plaster, raw timber and soft linen create a grounded, tactile family home.",
      zh: "質感批盪、原木與柔軟亞麻，營造踏實、有溫度的家庭居所。",
    },
    description: {
      en: "A wabi-sabi leaning home for a young family, embracing imperfection through hand-troweled plaster, raw edge timber and a muted, earthy palette. Built-in cabinetry keeps everyday life tidy while letting the materials do the talking.",
      zh: "一個偏向侘寂風格的年輕家庭居所，以手抹批盪、原木邊與柔和大地色系擁抱不完美。嵌入式儲物令日常生活井然有序，同時讓材質自己說話。",
    },
  },
  "marble-spa-bathroom": {
    summary: {
      en: "A primary bathroom transformed into a private stone spa with a freestanding soaking tub.",
      zh: "主浴化身私人石浴空間，配獨立浸浴缸。",
    },
    description: {
      en: "A single-room commission that turns a dated en-suite into a serene stone-clad retreat. Book-matched marble, a walk-in rain shower and a sculptural freestanding tub create a hotel-grade sanctuary at home.",
      zh: "一個單房委託，把過時的套廁變成寧靜的石飾避世所。對花雲石、步入式花灑與雕塑感獨立浴缸，於家中營造酒店級的療癒空間。",
    },
  },
  "stone-and-oak-kitchen": {
    summary: {
      en: "A handleless oak-and-stone kitchen designed for a keen home cook.",
      zh: "為熱愛下廚的人設計的無把手橡木及石材廚房。",
    },
    description: {
      en: "Function-first but quietly beautiful, this kitchen pairs handleless oak cabinetry with a dark stone worktop and an integrated island. Concealed storage, a dedicated prep zone and warm under-cabinet lighting make it a joy to cook in.",
      zh: "以功能為先同時低調美觀，這個廚房以無把手橡木櫃配深色石檯面及嵌入式中島。隱藏式收納、專用備餐區與溫暖的櫃底燈，讓下廚成為樂事。",
    },
  },
  "kennedy-town-primary-suite": {
    summary: {
      en: "A bedroom and en-suite united into one restful, wood-wrapped suite.",
      zh: "睡房與套廁融合為一個寧靜、以木包裹的套房。",
    },
    description: {
      en: "We merged a small bedroom and its bathroom into a unified suite wrapped in warm oak and soft plaster. A pocket of privacy in dense Kennedy Town, designed around rest.",
      zh: "我們把一個小睡房與其浴室合併，以暖橡木與柔和批盪包裹，成為一個統一的套房。在密集的堅尼地城中，一處為休息而設的私密角落。",
    },
  },
  "repulse-bay-penthouse": {
    summary: {
      en: "A grand seafront penthouse balanced between classic elegance and modern comfort.",
      zh: "臨海頂層豪宅，平衡經典優雅與現代舒適。",
    },
    description: {
      en: "Our largest residential commission to date. Classic proportions, panelled walls and a layered lighting plan give this penthouse timeless elegance, while contemporary furniture and a restrained palette keep it livable for a young family.",
      zh: "我們至今最大的住宅委託。經典比例、護牆板與分層燈光設計，為這個頂層賦予永恆優雅；而現代傢具與克制的用色，則令它適合一個年輕家庭居住。",
    },
  },
};

export const TESTIMONIAL_COPY: Record<string, Pair> = {
  "Stephanie L.": {
    en: "Arm Studio turned our raw village house into the calmest space we've ever lived in. Every detail was considered and the process felt effortless from start to finish.",
    zh: "Arm Studio 把我們原本粗糙的村屋，變成我們住過最寧靜的空間。每個細節都經過考量，整個過程由始至終都毫不費力。",
  },
  "James & Anna Robinson": {
    en: "They maximised every inch of our flat. The storage solutions alone changed how our family lives day to day — and it looks stunning.",
    zh: "他們善用了單位的每一吋。單是收納方案就改變了我們一家日常的生活方式——而且效果美極了。",
  },
  "Mr. Cheng": {
    en: "Honest, reliable and genuinely thoughtful. The Home Journal award is well deserved — our home feels like a retreat.",
    zh: "誠實、可靠、真正用心。Home Journal 大獎實至名歸——我們的家感覺像個避世之所。",
  },
  "Vanessa T.": {
    en: "I wanted a hotel bathroom at home and that is exactly what I got. The craftsmanship on the stone was impeccable.",
    zh: "我想要一個酒店級的浴室，而我得到的正是如此。石材的工藝無可挑剔。",
  },
  "Daniel K.": {
    en: "They understood our brand immediately and delivered a space that performs commercially while feeling beautiful.",
    zh: "他們立刻明白我們的品牌，交付了一個在商業上表現出色、同時美觀的空間。",
  },
  "Priya & Sam": {
    en: "On time, on budget, and the result exceeded the renders. We have already recommended Arm Studio to three friends.",
    zh: "準時、預算之內，效果更超越了效果圖。我們已經向三位朋友推薦 Arm Studio。",
  },
};

export const PRESS_COPY: Record<string, { title: Pair; blurb: Pair }> = {
  "0": {
    title: { en: "Home Journal Award 2025 — Merit", zh: "Home Journal 設計大獎 2025 — 優異獎" },
    blurb: {
      en: "Awarded for the GM815 Kam Tin village house project — residential interior design.",
      zh: "憑 GM815 錦田村屋項目獲獎——住宅室內設計。",
    },
  },
  "1": {
    title: {
      en: "Studio Feature: Artistry, Reliability, Mindfulness",
      zh: "工作室專訪：藝術、可靠、用心",
    },
    blurb: {
      en: "A profile on Arm Studio's design philosophy and recent work.",
      zh: "Arm Studio 設計理念與近期作品的介紹。",
    },
  },
  "2": {
    title: { en: "Village House Reimagined", zh: "村屋的重新想像" },
    blurb: { en: "Inside the Kam Tin renovation that earned recognition.", zh: "走進獲獎的錦田翻新項目。" },
  },
  "3": {
    title: { en: "Quiet Luxury in Hong Kong Homes", zh: "香港家居的靜奢美學" },
    blurb: {
      en: "Arm Studio among the studios defining restrained, liveable luxury.",
      zh: "Arm Studio 入選定義克制宜居奢華的設計工作室。",
    },
  },
  "4": {
    title: { en: "Interior Studios to Watch", zh: "值得留意的新晉室內設計工作室" },
    blurb: { en: "A round-up of emerging Hong Kong design talent.", zh: "新晉香港設計人才的精選。" },
  },
};

/* Convenience accessors for translated DB content with English fallback. */
export function projectSummary(slug: string, fallback: string, locale: Locale): string {
  const c = PROJECT_COPY[slug];
  return c ? pick(c.summary, locale) : fallback;
}
export function projectDescription(slug: string, fallback: string, locale: Locale): string {
  const c = PROJECT_COPY[slug];
  return c ? pick(c.description, locale) : fallback;
}
export function testimonialQuote(name: string, fallback: string, locale: Locale): string {
  const c = TESTIMONIAL_COPY[name];
  return c ? pick(c, locale) : fallback;
}
export function pressTitle(sortOrder: number, fallback: string, locale: Locale): string {
  const c = PRESS_COPY[String(sortOrder)];
  return c ? pick(c.title, locale) : fallback;
}
export function pressBlurb(sortOrder: number, fallback: string | null, locale: Locale): string {
  if (!fallback) return "";
  const c = PRESS_COPY[String(sortOrder)];
  return c ? pick(c.blurb, locale) : fallback;
}
