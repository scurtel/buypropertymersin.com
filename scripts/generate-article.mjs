import { execSync } from "child_process";
import { existsSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  collectExistingTopics,
  countWords,
  getGeminiApiKey,
  loadEnv,
  loadManifest,
  publishArticle,
  slugify,
} from "./lib/article-utils.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");

const TOPIC_POOL = [
  {
    title: "Why Mezitli Is Popular With Foreign Property Buyers in Mersin",
    targetKeyword: "Mezitli property for foreigners",
    category: "Area Guides",
    tags: ["Mezitli", "Mersin real estate", "foreign buyers"],
  },
  {
    title: "Yenişehir Mersin Property Guide for International Investors",
    targetKeyword: "Yenişehir property Mersin",
    category: "Area Guides",
    tags: ["Yenişehir", "Mersin", "investment"],
  },
  {
    title: "Erdemli Real Estate: Coastal Living and Investment Potential",
    targetKeyword: "Erdemli property investment",
    category: "Area Guides",
    tags: ["Erdemli", "coastal property", "Mersin"],
  },
  {
    title: "Tece and Tömük: Quiet Coastal Districts Near Mersin",
    targetKeyword: "Tece Tömük property Mersin",
    category: "Area Guides",
    tags: ["Tece", "Tömük", "sea view"],
  },
  {
    title: "Ayaş Beach Area Property: What Buyers Should Know",
    targetKeyword: "Ayaş property Mersin",
    category: "Area Guides",
    tags: ["Ayaş", "beach property", "Mersin"],
  },
  {
    title: "Çeşmeli and Davultepe: Emerging Areas for Mersin Property Buyers",
    targetKeyword: "Çeşmeli Davultepe property",
    category: "Area Guides",
    tags: ["Çeşmeli", "Davultepe", "Mersin districts"],
  },
  {
    title: "Arpaçbahşiş and Kargıpınarı: Eastern Mersin Property Overview",
    targetKeyword: "Arpaçbahşiş Kargıpınarı real estate",
    category: "Area Guides",
    tags: ["Arpaçbahşiş", "Kargıpınarı", "Mersin east"],
  },
  {
    title: "Susanoğlu Property Guide for Holiday and Second-Home Buyers",
    targetKeyword: "Susanoğlu property Mersin",
    category: "Area Guides",
    tags: ["Susanoğlu", "holiday home", "Mersin coast"],
  },
  {
    title: "Sea View Apartments in Mersin: A Practical Buyer’s Guide",
    targetKeyword: "sea view apartments in Mersin",
    category: "Property Types",
    tags: ["sea view", "apartments", "Mersin"],
  },
  {
    title: "Villas for Sale in Mersin: Locations, Prices and Buyer Tips",
    targetKeyword: "villas for sale in Mersin",
    category: "Property Types",
    tags: ["villas", "Mersin homes", "foreign buyers"],
  },
  {
    title: "Apartments for Sale in Mersin: What Foreign Buyers Should Compare",
    targetKeyword: "apartments for sale in Mersin",
    category: "Property Types",
    tags: ["apartments", "Mersin", "buying guide"],
  },
  {
    title: "Off-Plan vs Resale Property in Mersin: Pros and Cons",
    targetKeyword: "off-plan property Mersin",
    category: "Investment",
    tags: ["off-plan", "resale", "Mersin investment"],
  },
  {
    title: "Rental Yield Potential for Mersin Investment Properties",
    targetKeyword: "Mersin rental yield property",
    category: "Investment",
    tags: ["rental yield", "investment", "Mersin"],
  },
  {
    title: "Property Taxes and Running Costs When Buying in Mersin",
    targetKeyword: "property taxes Mersin Turkey",
    category: "Buying Guide",
    tags: ["taxes", "costs", "Turkey property"],
  },
  {
    title: "How to Choose a Real Estate Lawyer in Turkey as a Foreign Buyer",
    targetKeyword: "real estate lawyer Turkey foreign buyer",
    category: "Buying Guide",
    tags: ["lawyer", "Tapu", "legal advice"],
  },
  {
    title: "Turkish Title Deed (Tapu) Explained for Foreign Property Buyers",
    targetKeyword: "Turkish title deed Tapu guide",
    category: "Buying Guide",
    tags: ["Tapu", "title deed", "Turkey"],
  },
  {
    title: "Turkish Citizenship by Property Investment: What Buyers Should Verify",
    targetKeyword: "Turkish citizenship by property investment",
    category: "Buying Guide",
    tags: ["citizenship", "investment", "regulations"],
  },
  {
    title: "Mersin Property Market Trends Foreign Buyers Should Watch",
    targetKeyword: "Mersin property market trends",
    category: "Market Insights",
    tags: ["market trends", "Mersin", "2026"],
  },
  {
    title: "New Mersin Airport and Infrastructure: Impact on Real Estate",
    targetKeyword: "Mersin airport property impact",
    category: "Market Insights",
    tags: ["infrastructure", "airport", "Mersin growth"],
  },
  {
    title: "Winter vs Summer Living in Mersin for Property Owners",
    targetKeyword: "living in Mersin year round",
    category: "Lifestyle",
    tags: ["lifestyle", "Mersin climate", "relocation"],
  },
  {
    title: "Financing Options for Foreigners Buying Property in Mersin",
    targetKeyword: "mortgage foreigners Turkey Mersin",
    category: "Buying Guide",
    tags: ["financing", "mortgage", "foreign buyers"],
  },
  {
    title: "Due Diligence Checklist Before Buying Property in Mersin",
    targetKeyword: "due diligence buying property Mersin",
    category: "Buying Guide",
    tags: ["due diligence", "checklist", "Mersin"],
  },
  {
    title: "Commercial Property in Mersin: Opportunities for Investors",
    targetKeyword: "commercial property Mersin",
    category: "Investment",
    tags: ["commercial", "investment", "Mersin"],
  },
  {
    title: "Land for Sale in Mersin: Risks and Opportunities for Buyers",
    targetKeyword: "land for sale Mersin",
    category: "Property Types",
    tags: ["land", "plot", "Mersin"],
  },
  {
    title: "Kızkalesi Area Property: History, Tourism and Real Estate",
    targetKeyword: "Kızkalesi property Mersin",
    category: "Area Guides",
    tags: ["Kızkalesi", "tourism", "Mersin coast"],
  },
  {
    title: "Managing a Rental Property in Mersin From Abroad",
    targetKeyword: "rental property management Mersin",
    category: "Investment",
    tags: ["rental management", "absentee owner", "Mersin"],
  },
  {
    title: "Currency Considerations When Buying Property in Mersin",
    targetKeyword: "buy property Mersin currency exchange",
    category: "Investment",
    tags: ["currency", "TRY", "foreign buyers"],
  },
  {
    title: "Family-Friendly Neighborhoods in Mersin for Property Buyers",
    targetKeyword: "family friendly areas Mersin property",
    category: "Lifestyle",
    tags: ["families", "schools", "Mersin neighborhoods"],
  },
  {
    title: "Retiring in Mersin: Property Options for Overseas Buyers",
    targetKeyword: "retire in Mersin buy property",
    category: "Lifestyle",
    tags: ["retirement", "Mersin living", "property"],
  },
  {
    title: "How Mersin Compares to Alanya for Coastal Property Investment",
    targetKeyword: "Mersin vs Alanya property investment",
    category: "Market Insights",
    tags: ["Alanya", "comparison", "coastal Turkey"],
  },
];

const INTERNAL_LINK_PATHS = [
  { label: "Browse properties in Mersin", href: "/properties/" },
  { label: "Apartments for sale in Mersin", href: "/apartments-for-sale-in-mersin/" },
  { label: "Villas for sale in Mersin", href: "/villas-for-sale-in-mersin/" },
  { label: "Sea view properties in Mersin", href: "/sea-view-properties-in-mersin/" },
  { label: "Investment properties in Mersin", href: "/investment-properties-in-mersin/" },
  { label: "Buying property in Turkey guide", href: "/buying-property-in-turkey/" },
  { label: "Property in Mezitli", href: "/property-in-mezitli/" },
  { label: "Property in Yenişehir", href: "/property-in-yenisehir-mersin/" },
  { label: "Property in Erdemli", href: "/property-in-erdemli/" },
  { label: "Property in Tece", href: "/property-in-tece/" },
  { label: "Property in Tömük", href: "/property-in-tomuk/" },
  { label: "Property in Ayaş", href: "/property-in-ayas/" },
  { label: "Property in Çeşmeli", href: "/property-in-cesmeli/" },
  { label: "Contact Buy Property Mersin", href: "/contact/" },
];

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

function pickTopic(existing) {
  const available = TOPIC_POOL.filter((topic) => {
    const slug = slugify(topic.title);
    const titleKey = topic.title.toLowerCase();
    const keywordKey = topic.targetKeyword.toLowerCase();
    return (
      !existing.slugs.has(slug) &&
      !existing.titles.has(titleKey) &&
      !existing.keywords.has(keywordKey)
    );
  });

  if (available.length === 0) {
    throw new Error(
      "No unused topics remain in the topic pool. Add new topics to TOPIC_POOL in scripts/generate-article.mjs."
    );
  }

  return available[Math.floor(Math.random() * available.length)];
}

function pickRelatedSlugs(slug, existingSlugs) {
  const candidates = [...existingSlugs].filter((item) => item !== slug);
  const shuffled = candidates.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(2, shuffled.length));
}

function buildPrompt(topic, slug, relatedSlugs) {
  const linkSuggestions = INTERNAL_LINK_PATHS.map(
    (link) => `${link.label} -> ${link.href}`
  ).join("\n");

  return `You are an expert real estate writer for Buy Property Mersin, helping foreign buyers in Mersin, Türkiye.

Write one SEO blog article as valid JSON only (no markdown fences).

Article title: ${topic.title}
Slug: ${slug}
Target keyword: ${topic.targetKeyword}
Category: ${topic.category}
Suggested tags: ${topic.tags.join(", ")}
Related article slugs (pick up to 2): ${relatedSlugs.join(", ") || "none yet"}

All requirements below are recommendations only. Prioritise completing valid JSON with usable content.

Guidelines (recommended, not strict):
- Aim for roughly 900-1300 words across all "p" sections
- Natural, trustworthy English for international property investors
- Low sales pressure, not spammy, not obviously AI-written
- No guaranteed citizenship, residence, rental income or capital growth
- Use conditional language for legal, tax and investment topics
- metaTitle: around 60 characters when possible
- metaDescription: around 155 characters when possible
- 4-5 FAQ items with concise, safe answers
- sections: array of { "type": "h2"|"h3"|"p", "text": "..." } with clear hierarchy
- internalLinks: 4-6 items using only these site paths:
${linkSuggestions}
- relatedSlugs: up to 2 slugs from the related list that fit this article
- excerpt: short summary when possible
- secondaryKeywords: 4-6 relevant phrases when possible
- disclaimer: brief general-information notice when possible
- h1: clear article headline (can match title)

Return JSON with keys:
h1, metaTitle, metaDescription, excerpt, secondaryKeywords, sections, faq, internalLinks, relatedSlugs, disclaimer`;
}

function truncate(text, maxLength) {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 3).trimEnd()}...`;
}

const FALLBACK_DISCLAIMER =
  "This article is for general information only and does not constitute legal, tax or investment advice. Property rules, prices and procedures can change. Speak with a qualified lawyer and licensed advisor before making any purchase decision in Türkiye.";

const DEFAULT_INTERNAL_LINKS = [
  { label: "Browse properties in Mersin", href: "/properties/" },
  { label: "Buying property in Turkey guide", href: "/buying-property-in-turkey/" },
  { label: "Contact Buy Property Mersin", href: "/contact/" },
];

function warnArticleQuality(data) {
  const wordCount = countWords(Array.isArray(data.sections) ? data.sections : []);
  if (wordCount < 900 || wordCount > 1300) {
    console.warn(
      `Word count (${wordCount}) is outside the recommended 900-1300 range; publishing anyway.`
    );
  }

  if (!data.metaTitle) {
    console.warn("metaTitle missing; using article title fallback.");
  } else if (data.metaTitle.length > 60) {
    console.warn(
      `metaTitle is ${data.metaTitle.length} chars (recommended max 60); truncating for publish.`
    );
  }

  if (!data.metaDescription) {
    console.warn("metaDescription missing; using excerpt/title fallback.");
  } else if (data.metaDescription.length > 155) {
    console.warn(
      `metaDescription is ${data.metaDescription.length} chars (recommended max 155); truncating for publish.`
    );
  }

  if (!Array.isArray(data.faq) || data.faq.length === 0) {
    console.warn("FAQ missing or empty; publishing without FAQ items.");
  } else if (data.faq.length < 4) {
    console.warn(
      `FAQ has ${data.faq.length} items (recommended 4-5); publishing anyway.`
    );
  }

  if (!Array.isArray(data.sections) || data.sections.length === 0) {
    console.warn("Sections missing or empty; using minimal placeholder content.");
  } else if (data.sections.length < 6) {
    console.warn(
      `Article has ${data.sections.length} sections (recommended more); publishing anyway.`
    );
  }

  if (!Array.isArray(data.internalLinks) || data.internalLinks.length === 0) {
    console.warn("internalLinks missing; using default internal links.");
  }
}

function normalizeArticle(data, topic, slug, relatedSlugs, publishedAt) {
  warnArticleQuality(data);

  const sections = Array.isArray(data.sections)
    ? data.sections.filter((section) => section?.text?.trim())
    : [];

  const safeSections =
    sections.length > 0
      ? sections
      : [
          {
            type: "p",
            text: `This article explores ${topic.targetKeyword} for foreign buyers considering property in Mersin, Türkiye.`,
          },
        ];

  const faq = Array.isArray(data.faq)
    ? data.faq.filter((item) => item?.question?.trim() && item?.answer?.trim())
    : [];

  const internalLinks =
    Array.isArray(data.internalLinks) && data.internalLinks.length > 0
      ? data.internalLinks.filter((link) => link?.label?.trim() && link?.href?.trim())
      : DEFAULT_INTERNAL_LINKS;

  const excerpt =
    data.excerpt?.trim() ||
    truncate(
      safeSections.find((section) => section.type === "p")?.text || topic.title,
      220
    );

  return {
    slug,
    title: topic.title,
    h1: data.h1?.trim() || topic.title,
    metaTitle: truncate(data.metaTitle?.trim() || topic.title, 60),
    metaDescription: truncate(
      data.metaDescription?.trim() || excerpt || topic.title,
      155
    ),
    excerpt,
    targetKeyword: topic.targetKeyword,
    secondaryKeywords:
      Array.isArray(data.secondaryKeywords) && data.secondaryKeywords.length > 0
        ? data.secondaryKeywords
        : topic.tags,
    publishedAt,
    category: topic.category,
    tags: topic.tags,
    disclaimer: data.disclaimer?.trim() || FALLBACK_DISCLAIMER,
    sections: safeSections,
    faq,
    internalLinks,
    relatedSlugs: (
      Array.isArray(data.relatedSlugs) && data.relatedSlugs.length > 0
        ? data.relatedSlugs
        : relatedSlugs
    ).slice(0, 2),
  };
}

function rollbackFiles(paths) {
  for (const filePath of paths) {
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }
}

async function main() {
  loadEnv(root);

  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    console.error(
      "GEMINI_API_KEY is not set. Add it to GitHub Secrets or your local .env file."
    );
    process.exit(1);
  }

  const manifest = loadManifest(root);
  const today = todayUtc();
  const alreadyToday = manifest.articles.find(
    (entry) => entry.publishedAt === today
  );

  if (alreadyToday) {
    console.log(
      `Article already generated for ${today}: ${alreadyToday.slug}. Skipping.`
    );
    process.exit(0);
  }

  const existing = collectExistingTopics(root);
  const topic = pickTopic(existing);
  const slug = slugify(topic.title);

  if (existing.slugs.has(slug)) {
    throw new Error(`Slug collision detected: ${slug}`);
  }

  const relatedSlugs = pickRelatedSlugs(slug, existing.slugs);
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  console.log(`Generating article: ${topic.title}`);
  console.log(`Slug: ${slug}`);

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: buildPrompt(topic, slug, relatedSlugs) }] }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
    },
  });

  const data = JSON.parse(result.response.text());
  const article = normalizeArticle(data, topic, slug, relatedSlugs, today);

  const jsonPath = join(root, "generated-articles", `${slug}.json`);
  const tsPath = join(root, "src", "lib", "blog", "posts", `${slug}.ts`);
  const autoPostsPath = join(root, "src", "lib", "blog", "auto-posts.ts");

  writeFileSync(jsonPath, `${JSON.stringify(article, null, 2)}\n`, "utf-8");
  publishArticle(root, slug);

  const createdFiles = [jsonPath, tsPath, autoPostsPath];

  try {
    console.log("Running production build...");
    execSync("npm run build", {
      cwd: root,
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "production",
        NEXT_PUBLIC_SITE_URL:
          process.env.NEXT_PUBLIC_SITE_URL || "https://buypropertymersin.com",
      },
    });
  } catch (error) {
    console.error("Build failed. Rolling back generated article files.");
    rollbackFiles([jsonPath, tsPath]);

    const restoredManifest = loadManifest(root);
    restoredManifest.articles = restoredManifest.articles.filter(
      (entry) => entry.slug !== slug
    );
    restoredManifest.lastPublished =
      restoredManifest.articles.at(-1)?.slug ?? null;

    writeFileSync(
      join(root, "generated-articles", "manifest.json"),
      `${JSON.stringify(restoredManifest, null, 2)}\n`,
      "utf-8"
    );

    if (restoredManifest.articles.length > 0) {
      publishArticle(root, restoredManifest.articles.at(-1).slug);
    } else {
      writeFileSync(
        autoPostsPath,
        `// AUTO-GENERATED by scripts/publish-generated-articles.mjs — do not edit manually.
import type { BlogPost } from "./types";

export const autoPosts: BlogPost[] = [];
`,
        "utf-8"
      );
    }

    throw error;
  }

  writeFileSync(
    join(root, "generated-articles", "auto-last-run.json"),
    `${JSON.stringify(
      {
        slug,
        title: topic.title,
        publishedAt: today,
        wordCount: countWords(article.sections),
        completedAt: new Date().toISOString(),
      },
      null,
      2
    )}\n`,
    "utf-8"
  );

  console.log(`Article ready: ${slug} (~${countWords(article.sections)} words)`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
