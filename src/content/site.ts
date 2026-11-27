/**
 * All landing-page copy lives here.
 *
 * Most copy is taken from @mamatcha.cafe's own Instagram posts. Lines marked
 * `// TODO confirm` were written for layout — check them before going live.
 */

import { img } from "@/content/images";

export const site = {
  name: "Ma Matcha",
  city: "Lekki Phase 1, Lagos",
  address: "30 Fola Osibo Road, Lekki Phase 1, Lagos",
  mapHref: "https://www.google.com/maps/search/?api=1&query=30+Fola+Osibo+Road+Lekki+Phase+1+Lagos",
  year: 2026,
  orderHref: "https://www.instagram.com/mamatcha.cafe/", // TODO confirm: real ordering link
  social: [
    { name: "Instagram", href: "https://www.instagram.com/mamatcha.cafe/", icon: "instagram" },
    { name: "TikTok", href: "#", icon: "tiktok" }, // TODO confirm handle
    { name: "WhatsApp", href: "#", icon: "whatsapp" }, // TODO confirm number
  ],
  nav: [
    { label: "Matcha", href: "#matcha" },
    { label: "Food", href: "#food" },
    { label: "Find us", href: "#find-us" },
  ],
} as const;

/* ------------------------------------------------------------------------ */
/* Matcha specials                                                           */
/* ------------------------------------------------------------------------ */

export const specials = [
  { key: "strawberry", name: "Strawberry Matcha", cutout: img["strawberry-matcha"], photo: img.whisk, note: "Iced matcha over a strawberry base." },
  { key: "ube", name: "Ube Cream Top", cutout: img["ube-cream-top"], photo: img.pour, note: "A little ube situation on top." },
  { key: "cookie", name: "Cookie Butter Matcha", cutout: img["cookie-butter"], photo: img.whisk, note: "Cookie butter foam, crumble on top." },
  { key: "coconut", name: "Coconut Matcha Cloud", cutout: img["coconut-cloud"], photo: img.pour, note: "Matcha under a coconut cloud." },
  { key: "maple", name: "Salted Maple Matcha", cutout: img["salted-maple"], photo: img.whisk, note: "Salted maple, layered with matcha." },
] as const; // TODO confirm the one-line descriptions

/* ------------------------------------------------------------------------ */
/* Sections                                                                  */
/* ------------------------------------------------------------------------ */

export const hero = {
  cup: img.ube,
  stats: [
    { value: "5", unit: "", label: "Matcha specials" },
    { value: "4", unit: "", label: "Fresh-pressed juices" },
    { value: "100", unit: "g", label: "Take-home matcha" },
  ],
  note: ["Dip. Sip.", "Repeat."],
  headline: ["Matcha", "with", "personality"],
  body: "Ceremonial matcha, cream tops and smoothies — plus food worth the trip. Made in Lekki Phase 1, Lagos.",
  marquee: "Dip. Sip. Repeat",
};

export const insider = {
  title: ["You know what you like.", "You like Ma Matcha:"],
  titleAccent: "Matcha with personality.",
  photos: [img.croissant, img.sliders, img["pizza-box"]],
  photoAlt: ["Croissant on a Ma Matcha cup", "Mini sliders with fries", "Pizza in a Ma Matcha box"],
  lead: "A matcha bar that also makes your favourite food — iced lattes, cream tops, sliders, pizza and a tuna melt our members keep coming back for.",
  body: "Every cup is whisked to order with stone-ground Japanese matcha. Every plate is made to share (or not). Come find out what your usual order says about you.",
  note: ["Why people", "love it"],
  follow: "Follow @mamatcha.cafe",
};

export const features = [
  {
    title: ["Ceremonial", "matcha"],
    body: "Stone-ground Japanese green tea, whisked to order — the same powder you can take home.",
  },
  {
    title: ["Cream", "tops"],
    body: "Ube, coconut cloud, cookie butter. A little situation on top makes everything better.",
  },
  {
    title: ["Food worth", "the trip"],
    body: "Dirty seafood rice, mini sliders, pizza and the members' secret-favourite tuna melt.",
  },
  {
    title: ["Made in", "Lekki"],
    body: "30 Fola Osibo Road, Lekki Phase 1. Dine in, pick up or have it delivered.",
  },
];

export const lineup = {
  title: ["Matcha, just the", "way you like it."],
  accent: "What's your special?",
  left: { cutout: img["strawberry-matcha"], label: ["Strawberry", "Matcha"] },
  centre: img.ube,
  right: { cutout: img["cookie-butter"], label: ["Cookie", "Butter"] },
};

export const compare = {
  image: img.pouches,
  imageAlt: "Iced matcha surrounded by Mamatcha ceremonial matcha powder pouches",
  title: "Ma Matcha for you.",
  subtitle: "See the difference.",
  columns: ["Ma Matcha", "Regular café"],
  // TODO confirm rows
  rows: [
    "Ceremonial-grade matcha",
    "Stone-ground Japanese green tea",
    "Whisked to order",
    "Cream tops & specials",
    "A food menu to match",
    "Powder to take home",
  ],
};

export const profiles = {
  eyebrow: "Grab your next Mamatcha fix",
  title: ["Whisked.", "Poured.", "Topped."],
  subtitle: "Find your match",
  cup: img["cookie-butter"],
  intro: {
    name: "The matcha specials",
    tagline: "Five specials. One for every mood.",
    aside: "Grab your next Mamatcha fix. You need it.",
  },
};

export const food = {
  title: ["Food worth", "the trip."],
  note: ["Pick up or", "delivery"],
  items: [
    { name: "Dirty seafood rice", line: "His replies are dry, our dirty seafood rice isn't.", image: img.seafood, cutout: false },
    { name: "Mini sliders & fries", line: "Are fries a side, or the whole reason you ordered the mini sliders?", image: img.sliders, cutout: false },
    { name: "Pizza", line: "Don't fight it. Order the pizza.", image: img["pizza-box"], cutout: false },
    { name: "Creamy tuna melt", line: "The members' secret favourite. Creamy, cheesy, toasted perfection.", image: img["tuna-melt"], cutout: false },
    { name: "Chicken & kale salad", line: "The founder's favourite for a reason. Ditch the boring salads.", image: img["kale-salad"], cutout: false },
  ],
};

export const picker = {
  title: "Pick your match",
  subtitle: "Five matcha specials",
  body: "Swipe through the line-up and see which one sounds like you. No wrong answers — only strong opinions.",
  note: ["If you", "order…"],
};

export const takeHome = {
  juices: {
    image: img.juices,
    title: "The Juices",
    line: "Freshly pressed. Never stressed.",
    small: "Available at Mamatcha Café",
  },
  powder: {
    image: img.powder,
    title: "We can't come home with you… but this can.",
    line: "Mamatcha ceremonial matcha powder · 100g",
    small: "Available in store",
  },
};

export const getIt = {
  title: "Don't just scroll.",
  accent: "Sip it.",
  channels: ["Dine in", "Pick up", "Delivery", "Takeout", "Members", "Matcha to go", "Powder in store"],
  notes: { left: ["Lekki Phase 1,", "Lagos"], right: ["Takeout + your", "comfort show"] },
};

export const footer = {
  cardTitle: ["Matcha", "with", "personality"],
  cups: [img["strawberry-matcha"], img.ube],
  tiles: [
    { label: ["See the", "menu"], href: "#matcha", icon: "menu" },
    { label: ["Find", "us"], href: site.mapHref, icon: "pin" },
  ],
  brandTop: "Ma Matcha",
  brandBottom: "Matcha bar & café, Lekki",
  links: [
    { label: "Order on Instagram", href: "https://www.instagram.com/mamatcha.cafe/" },
    { label: site.address, href: site.mapHref },
  ],
};
