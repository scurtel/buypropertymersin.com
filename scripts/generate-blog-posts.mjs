import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  try {
    const envPath = join(root, ".env");
    const raw = readFileSync(envPath, "utf-8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    /* ignore */
  }
}

loadEnv();

const apiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("No Gemini API key found in .env");
  process.exit(1);
}

const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: modelName });

const articles = [
  {
    slug: "best-areas-to-buy-property-in-mersin",
    title: "Best Areas to Buy Property in Mersin for Foreigners",
    targetKeyword: "best areas to buy property in Mersin",
    secondaryKeywords: [
      "buy property in Mersin",
      "Mersin real estate",
      "property investment in Mersin",
      "Mezitli property",
      "Yenişehir property",
      "Erdemli property",
    ],
  },
  {
    slug: "mersin-vs-antalya-property-investment",
    title: "Mersin vs Antalya Property Investment: Which City Is Better in 2026?",
    targetKeyword: "Mersin vs Antalya property investment",
    secondaryKeywords: [
      "property investment in Turkey",
      "buy property in Turkey",
      "Mersin real estate market",
      "Antalya real estate market",
    ],
  },
  {
    slug: "can-foreigners-buy-property-in-turkey",
    title: "Can Foreigners Buy Property in Turkey? Complete 2026 Guide",
    targetKeyword: "can foreigners buy property in Turkey",
    secondaryKeywords: [
      "buy property in Turkey as a foreigner",
      "Turkish title deed",
      "property purchase process in Turkey",
      "real estate lawyer Turkey",
    ],
  },
];

function buildPrompt(spec) {
  return `You are an expert real estate content writer for Buy Property Mersin, helping foreign buyers in Mersin, Türkiye.

Write a complete SEO blog article as valid JSON only (no markdown fences).

Article title: ${spec.title}
Slug: ${spec.slug}
Target keyword: ${spec.targetKeyword}
Secondary keywords: ${spec.secondaryKeywords.join(", ")}

Requirements:
- Total body word count across all "p" sections: 1800-2500 words
- Natural, human English. Not robotic. Low sales pressure. Trustworthy tone.
- No guaranteed residence, citizenship, or investment returns
- Use conditional language for legal and investment topics
- metaTitle: max 60 characters (count carefully)
- metaDescription: max 155 characters
- 5 FAQ items with concise, safe answers
- sections: array of objects with type "h2", "h3", or "p" and text field
- Use clear H2/H3 hierarchy (multiple H2 sections, H3 subsections where helpful)
- internalLinks: 4-6 suggested internal links with label and href (paths like /properties/, /property-in-mezitli/, /buying-property-in-turkey/, /contact/)
- relatedSlugs: pick 2 from [best-areas-to-buy-property-in-mersin, mersin-vs-antalya-property-investment, can-foreigners-buy-property-in-turkey] excluding "${spec.slug}"
- excerpt: 2-sentence summary under 220 characters

Return JSON with keys: h1, metaTitle, metaDescription, excerpt, sections, faq, internalLinks, relatedSlugs`;
}

function escapeTs(str) {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

function toTsFile(spec, data) {
  const post = {
    slug: spec.slug,
    title: spec.title,
    h1: data.h1,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    excerpt: data.excerpt,
    targetKeyword: spec.targetKeyword,
    secondaryKeywords: spec.secondaryKeywords,
    publishedAt: "2026-06-16",
    sections: data.sections,
    faq: data.faq,
    internalLinks: data.internalLinks,
    relatedSlugs: data.relatedSlugs,
  };
  return `import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = ${JSON.stringify(post, null, 2)};
`;
}

async function main() {
  const outDir = join(root, "src", "lib", "blog", "posts");
  mkdirSync(outDir, { recursive: true });

  for (const spec of articles) {
    console.log(`Generating: ${spec.slug}...`);
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: buildPrompt(spec) }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });
    const data = JSON.parse(result.response.text());
    const filePath = join(outDir, `${spec.slug}.ts`);
    writeFileSync(filePath, toTsFile(spec, data), "utf-8");
    const words = data.sections
      .filter((s) => s.type === "p")
      .map((s) => s.text.split(/\s+/).length)
      .reduce((a, b) => a + b, 0);
    console.log(`  Saved ${spec.slug}.ts (~${words} words)`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
