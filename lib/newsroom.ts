/** Newsroom content. Swap this module for a CMS or API call later; the pages only use the helpers below. */

export const categories = ["Press release", "Company news", "Product", "Community"] as const;
export type Category = (typeof categories)[number];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "gallery"; images: { src: string; alt: string }[]; caption?: string };

export type Attachment = {
  label: string;
  /** Short description of what is inside, shown under the label. */
  note?: string;
  href: string;
  kind: "PDF" | "ZIP" | "DOCX" | "XLSX" | "JPG";
};

export type Article = {
  slug: string;
  title: string;
  /** One or two sentences shown on cards and under the headline. */
  summary: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  category: Category;
  readMinutes: number;
  cover: { src: string; alt: string; /** "pack" images are cut-outs and sit on a blue well */ fit: "pack" | "photo" };
  body: Block[];
  attachments?: Attachment[];
};

const pdf = (name: string) => `https://www.inyangeindustries.com/img/2024/${encodeURIComponent(name)}.pdf`;

export const articles: Article[] = [
  {
    slug: "rssb-takes-full-ownership-of-inyange",
    title: "RSSB takes full ownership of Inyange Industries",
    summary:
      "The Rwanda Social Security Board has bought Inyange Industries from Crystal Ventures Ltd. Our brands, plants and farmer partnerships carry on as they are.",
    date: "2026-08-20",
    category: "Company news",
    readMinutes: 3,
    cover: { src: "/images/milk-range.webp", alt: "The Inyange milk range", fit: "pack" },
    body: [
      {
        type: "p",
        text: "In August 2026 the Rwanda Social Security Board (RSSB) took full ownership of Inyange Industries, buying the company from Crystal Ventures Ltd.",
      },
      {
        type: "p",
        text: "For the people who buy Inyange, nothing changes at the shelf. The same milk, yoghurt, mineral water and juice are made in the same plants, and the same distributors and Milk Zones keep serving homes and businesses across Rwanda.",
      },
      { type: "h2", text: "What stays the same" },
      {
        type: "list",
        items: [
          "The Inyange brand and every product in the range.",
          "Our Masaka factory and the Milk Powder Plant in Nyagatare.",
          "Daily milk collection from 42 dairy farmer cooperatives.",
          "Our distributors, Milk Zones and customer contacts.",
        ],
      },
      {
        type: "image",
        src: "/images/water-range.webp",
        alt: "Inyange mineral water bottles",
        caption: "Milk, yoghurt, mineral water and juice continue under the Inyange brand.",
      },
      {
        type: "p",
        text: "Inyange began in 1997 and has grown from 3,000 litres of milk a day in 2009 to more than 200,000 today. We will share more about the next chapter here as it unfolds.",
      },
    ],
  },
  {
    slug: "instant-whole-milk-powder-launches-in-rwanda",
    title: "Inyange instant whole milk powder arrives in Rwandan homes",
    summary:
      "Made at our Nyagatare plant from Rwandan milk, instant whole milk powder is now on shelves and through Inyange distributors.",
    date: "2025-03-12",
    category: "Product",
    readMinutes: 2,
    cover: { src: "/images/milk-powder-1kg.webp", alt: "A 1 kg pack of Inyange instant whole milk powder", fit: "pack" },
    body: [
      {
        type: "p",
        text: "Inyange instant whole milk powder is made from milk collected from Rwandan farmers, dried at the Milk Powder Plant in Nyagatare District, and packed for everyday use.",
      },
      { type: "h2", text: "Why it matters" },
      {
        type: "p",
        text: "Milk powder keeps without refrigeration, so families and businesses can stock it for weeks and mix only what they need. It also gives dairy farmers a steady buyer for every litre they produce.",
      },
      {
        type: "gallery",
        images: [
          { src: "/images/milk-powder-1kg.webp", alt: "Inyange instant whole milk powder, 1 kg" },
          { src: "/images/milk-range.webp", alt: "The Inyange milk range" },
        ],
        caption: "Powder joins fresh and long-life milk in the Inyange range.",
      },
      {
        type: "p",
        text: "Find a stockist near you with the distributor finder, or ask your local Milk Zone.",
      },
    ],
  },
  {
    slug: "prime-minister-inaugurates-milk-powder-plant",
    title: "Prime Minister inaugurates the Inyange Milk Powder Plant in Nyagatare",
    summary:
      "On 24 July 2024 Dr Édouard Ngirente opened the US$54 million plant, built to process 650,000 litres of milk a day.",
    date: "2024-07-24",
    category: "Press release",
    readMinutes: 4,
    cover: { src: "/images/milk-range.webp", alt: "Inyange milk", fit: "pack" },
    body: [
      {
        type: "p",
        text: "Prime Minister Dr Édouard Ngirente inaugurated the Inyange Milk Powder Plant in Nyagatare District on 24 July 2024. Work on the US$54 million plant began in 2021.",
      },
      {
        type: "p",
        text: "The plant is built to process 650,000 litres of milk a day into skimmed and whole milk powder, butter and ghee.",
      },
      { type: "h2", text: "What the plant means for Rwanda" },
      {
        type: "list",
        items: [
          "270 permanent jobs at the plant, and hundreds more along the dairy value chain.",
          "Rwf 1.3 billion paid to farmers between April and June 2024.",
          "Approximately Rwf 10 billion injected into Rwanda’s economy each year.",
        ],
      },
      {
        type: "quote",
        text: "More milk bought from Rwandan farmers means more income in rural homes.",
        cite: "Inyange Industries",
      },
      {
        type: "p",
        text: "The press release, factsheet and FAQs from the launch are attached below for journalists and partners.",
      },
    ],
    attachments: [
      { label: "Launch press release", note: "Full release for publication", href: pdf("Inyange MPP Launch Press Release"), kind: "PDF" },
      { label: "Plant factsheet", note: "Capacity, products and impact at a glance", href: pdf("Inyange MPP Launch Factsheet"), kind: "PDF" },
      { label: "Frequently asked questions", note: "Answers to common questions about the plant", href: pdf("Inyange MPP Launch FAQs"), kind: "PDF" },
    ],
  },
  {
    slug: "42-farmer-cooperatives-supply-inyange-milk",
    title: "42 cooperatives, one cold chain: how Inyange milk gets from farm to glass",
    summary:
      "Every day dairy farmers across Rwanda deliver milk to collection centres, and it reaches our plants chilled and tested.",
    date: "2024-09-05",
    category: "Community",
    readMinutes: 3,
    cover: { src: "/images/whole-milk-1l.webp", alt: "Inyange whole milk, 1 litre", fit: "pack" },
    body: [
      {
        type: "p",
        text: "Inyange buys milk from 42 dairy farmer cooperatives. Since 2016 and 2018 we have also run the Mukamira and Giheke dairy plants in partnership with cooperatives.",
      },
      { type: "h2", text: "Cold from the first hour" },
      {
        type: "p",
        text: "Milk is chilled at collection, tested on arrival at the plant, then pasteurised and packed. Daily collection has grown from 3,000 litres in 2009 to more than 200,000.",
      },
      {
        type: "image",
        src: "/images/whole-milk-1l.webp",
        alt: "Inyange whole milk, 1 litre",
        caption: "Whole milk, packed at Masaka.",
      },
      { type: "p", text: "Dairy farmers interested in supplying Inyange can reach us through the contact page." },
    ],
  },
];

export const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, limit = 3) {
  const current = getArticle(slug);
  return sortedArticles
    .filter((a) => a.slug !== slug)
    .sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category))
    .slice(0, limit);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function isCategory(value: string | undefined): value is Category {
  return !!value && (categories as readonly string[]).includes(value);
}
