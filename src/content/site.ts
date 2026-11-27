/**
 * All landing-page copy lives here.
 *
 * Lines marked `// TODO confirm` are placeholders written for layout — check
 * them against what Ma Matcha actually offers before going live.
 */

export const site = {
  name: "Ma Matcha",
  city: "Lagos, Nigeria",
  year: 2026,
  orderHref: "https://www.instagram.com/mamatcha.cafe/", // TODO confirm: real ordering link
  social: [
    { name: "Instagram", href: "https://www.instagram.com/mamatcha.cafe/", icon: "instagram" },
    { name: "TikTok", href: "#", icon: "tiktok" }, // TODO confirm handle
    { name: "WhatsApp", href: "#", icon: "whatsapp" }, // TODO confirm number
  ],
  nav: [
    { label: "Menu", href: "#menu" },
    { label: "Why us", href: "#why" },
    { label: "Find us", href: "#find-us" },
  ],
} as const;

export type DrinkKey = "breakfast" | "berry" | "tropics";

export const drinks: Record<
  DrinkKey,
  {
    name: string;
    cutout: { src: string; width: number; height: number };
    slide: string;
    accent: string;
    tagline: string;
    aside: string;
    toppings: string;
  }
> = {
  berry: {
    name: "Berry Blast",
    cutout: { src: "/drinks/berry.webp", width: 524, height: 701 },
    slide: "/slides/berry.webp",
    accent: "#8a5a9e",
    tagline: "You're fun, slightly chaotic, looking for something sweet.",
    aside: "Might ghost after a week though.",
    toppings: "Strawberries, blueberries & cream",
  },
  breakfast: {
    name: "Breakfast in a Cup",
    cutout: { src: "/drinks/breakfast.webp", width: 558, height: 771 },
    slide: "/slides/breakfast.webp",
    accent: "#5b4a8a",
    tagline: "You're organised, attentive and consistent. You remember birthdays.",
    aside: "And every single thing said during an argument.",
    toppings: "Banana, blueberries & oats",
  },
  tropics: {
    name: "From the Tropics",
    cutout: { src: "/drinks/tropics.webp", width: 513, height: 699 },
    slide: "/slides/tropics.webp",
    accent: "#c9643f",
    tagline: "Easy-going, spontaneous and always down for a good time.",
    aside: "A 'bad texter' but somehow always online.",
    toppings: "Pineapple, papaya & coconut",
  },
};

export const hero = {
  stats: [
    // TODO confirm all three
    { value: "3", unit: "", label: "Signature blends" },
    { value: "100", unit: "%", label: "Real fruit" },
    { value: "0", unit: "", label: "Boring cups" },
  ],
  note: ["Real fruit,", "real personality"],
  headline: ["Smoothies", "with", "personality"],
  body: "Three signature smoothies, each with a personality of its own. Blended thick, topped generously and made in Lagos.",
  marquee: "Your usual order says a lot",
};

export const insider = {
  title: ["You know what you like.", "You like Ma Matcha:"],
  titleAccent: "Smoothies with personality.",
  lead: "We make smoothies that taste like a good day — real fruit, generous toppings and cups you'll want to post before the first sip.",
  body: "Every blend started as a favourite order. Now each one has a personality, and somehow your usual says a lot about you. Come find out which one you are.",
  note: ["Why people", "love it"],
  follow: "Follow @mamatcha.cafe",
};

export const features = [
  // TODO confirm copy for all four
  {
    title: ["Real", "fruit"],
    body: "Blended from real fruit — every cup tastes like the thing it's named after.",
  },
  {
    title: ["Fully", "loaded"],
    body: "Strawberries, banana, pineapple, coconut, oats. Every smoothie comes topped, never plain.",
  },
  {
    title: ["Made to", "order"],
    body: "Blended when you order, so it's cold, thick and fresh when it reaches your hand.",
  },
  {
    title: ["Made in", "Lagos"],
    body: "A small café with a big personality. Come through, or have it brought to you.",
  },
];

export const lineup = {
  title: ["Smoothies, just the", "way you like them."],
  accent: "Which one are you?",
};

export const compare = {
  title: "Ma Matcha for you.",
  subtitle: "See the difference.",
  columns: ["Ma Matcha", "Regular smoothie"],
  // TODO confirm rows
  rows: [
    "Real fruit, blended fresh",
    "Toppings on every cup",
    "Thick, spoonable texture",
    "Made to order",
    "A cup worth posting",
    "Comes with a personality",
  ],
};

export const profiles = {
  eyebrow: "The smoothies, but as dating profiles",
  title: ["Sweet.", "Bold.", "Fresh."],
  subtitle: "Find your match",
  intro: {
    name: "The Smoothies",
    tagline: "Three smoothies. Three personalities.",
    aside: "Suddenly your usual order makes a lot of sense.",
  },
};

export const picker = {
  title: "Pick your match",
  subtitle: "Three cups, three personalities",
  body: "Swipe through the line-up and see which one sounds like you. No wrong answers — only strong opinions.",
  note: ["If you", "order…"],
};

export const getIt = {
  title: "Don't just scroll.",
  accent: "Sip it.",
  // TODO confirm the ways people can actually order
  channels: ["Walk in", "Pick up", "Delivery", "DM to order", "Events", "Parties", "Gift a cup"],
  notes: { left: ["Lagos,", "Nigeria"], right: ["Come say hi —", "we'll blend"] },
};

export const footer = {
  cardTitle: ["Smoothies", "with", "personality"],
  tiles: [
    { label: ["See the", "menu"], href: "#menu", icon: "menu" },
    { label: ["Find", "us"], href: "#find-us", icon: "pin" },
  ],
  brandTop: "Ma Matcha",
  brandBottom: "Smoothie café, Lagos",
  links: [
    { label: "Order on Instagram", href: "https://www.instagram.com/mamatcha.cafe/" },
    { label: "Events & catering", href: "#" }, // TODO confirm
  ],
};
