import { GoogleGenerativeAI } from "@google/generative-ai";

export interface GeminiResult<T = string> {
  success: boolean;
  data?: T;
  error?: string;
}

function getApiKey(): string | undefined {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY
  );
}

function getModel() {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  return genAI.getGenerativeModel({ model: modelName });
}

async function generateText(prompt: string): Promise<GeminiResult> {
  const model = getModel();
  if (!model) {
    return {
      success: false,
      error:
        "Gemini API key is not configured. Set GEMINI_API_KEY in your environment.",
    };
  }

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return { success: true, data: text };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error generating content";
    return { success: false, error: message };
  }
}

export async function generateSeoText(params: {
  pageTitle: string;
  keywords: string[];
  context?: string;
}): Promise<GeminiResult> {
  const prompt = `You are an SEO copywriter for a real estate website targeting foreign buyers in Mersin, Türkiye.
Write professional, trustworthy English SEO text (200-300 words) for a page titled "${params.pageTitle}".
Naturally include these keywords: ${params.keywords.join(", ")}.
${params.context ? `Context: ${params.context}` : ""}
Do not use exaggerated sales language. Do not guarantee residence permits or citizenship.
Do not promise investment returns. Use conditional, professional language.
Return only the body text, no headings or markdown.`;

  return generateText(prompt);
}

export async function generatePropertyDescription(params: {
  title: string;
  area: string;
  propertyType: string;
  bedrooms?: number;
  sizeSqm?: number;
  features?: string[];
}): Promise<GeminiResult> {
  const prompt = `Write a professional property description (120-180 words) in English for foreign buyers.
Property: ${params.title}
Area: ${params.area}, Mersin, Türkiye
Type: ${params.propertyType}
${params.bedrooms ? `Bedrooms: ${params.bedrooms}` : ""}
${params.sizeSqm ? `Size: ${params.sizeSqm} sqm` : ""}
${params.features?.length ? `Features: ${params.features.join(", ")}` : ""}
Tone: trustworthy, informative, not overly promotional.
Do not invent specific prices or legal guarantees.
Return only the description text.`;

  return generateText(prompt);
}

export async function generateAreaGuide(params: {
  areaName: string;
  highlights?: string[];
}): Promise<GeminiResult> {
  const prompt = `Write an area guide (250-350 words) in English for foreign property buyers interested in ${params.areaName}, Mersin, Türkiye.
${params.highlights?.length ? `Key points to cover: ${params.highlights.join(", ")}` : ""}
Cover: location, lifestyle, property types available, appeal to foreign buyers, coastal/access notes.
Tone: professional, balanced, informative. No exaggerated investment claims.
Return only the guide text, no headings or markdown.`;

  return generateText(prompt);
}

export interface BlogArticleSpec {
  slug: string;
  title: string;
  targetKeyword: string;
  secondaryKeywords: string[];
}

export interface GeneratedBlogArticle {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  sections: { type: "h2" | "h3" | "p"; text: string }[];
  faq: { question: string; answer: string }[];
  internalLinks: { label: string; href: string }[];
  relatedSlugs: string[];
}

export async function generateBlogArticle(
  spec: BlogArticleSpec
): Promise<GeminiResult<GeneratedBlogArticle>> {
  const prompt = `You are an expert real estate content writer for Buy Property Mersin, helping foreign buyers in Mersin, Türkiye.

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
- relatedSlugs: pick 2 from [best-areas-to-buy-property-in-mersin, mersin-vs-antalya-property-investment, can-foreigners-buy-property-in-turkey] excluding current slug
- excerpt: 2-sentence summary under 220 characters

Return JSON with keys: h1, metaTitle, metaDescription, excerpt, sections, faq, internalLinks, relatedSlugs`;

  const model = getModel();
  if (!model) {
    return {
      success: false,
      error: "Gemini API key is not configured.",
    };
  }

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });
    const text = result.response.text();
    const parsed = JSON.parse(text) as GeneratedBlogArticle;
    return { success: true, data: parsed };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to generate blog article";
    return { success: false, error: message };
  }
}

export function isGeminiConfigured(): boolean {
  return Boolean(getApiKey());
}
