import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "fs";
import { basename, join } from "path";

const DEFAULT_DISCLAIMER =
  "This article is for general information only and does not constitute legal, tax or investment advice. Property rules, prices and procedures can change. Speak with a qualified lawyer and licensed advisor before making any purchase decision in Türkiye.";

export const DEFAULT_INTERNAL_LINKS = [
  { label: "Browse properties in Mersin", href: "/properties/" },
  { label: "Buying property in Turkey guide", href: "/buying-property-in-turkey/" },
  { label: "Contact Buy Property Mersin", href: "/contact/" },
];

function normalizeHref(href) {
  if (!href) return "";
  let path = String(href).trim();
  if (/^https?:\/\//i.test(path)) {
    try {
      const url = new URL(path);
      path = url.pathname || "/";
    } catch {
      return "";
    }
  }
  if (!path.startsWith("/")) path = `/${path}`;
  if (!path.endsWith("/")) path = `${path}/`;
  return path;
}

export function normalizeInternalLinks(links, fallback = DEFAULT_INTERNAL_LINKS) {
  if (!Array.isArray(links) || links.length === 0) return [...fallback];

  const normalized = links
    .map((link) => {
      const label =
        link?.label?.trim() ||
        link?.text?.trim() ||
        link?.title?.trim() ||
        link?.name?.trim() ||
        "";
      const href = normalizeHref(
        link?.href?.trim() ||
          link?.path?.trim() ||
          link?.url?.trim() ||
          link?.link?.trim() ||
          ""
      );
      return label && href ? { label, href } : null;
    })
    .filter(Boolean);

  return normalized.length > 0 ? normalized : [...fallback];
}

export function normalizeFaqItems(faq) {
  if (!Array.isArray(faq)) return [];

  return faq
    .map((item) => {
      const question =
        item?.question?.trim() ||
        item?.q?.trim() ||
        item?.title?.trim() ||
        "";
      const answer =
        item?.answer?.trim() ||
        item?.a?.trim() ||
        item?.text?.trim() ||
        item?.content?.trim() ||
        "";
      return question && answer ? { question, answer } : null;
    })
    .filter(Boolean);
}

export function normalizeSections(sections, targetKeyword = "property in Mersin") {
  const allowedTypes = new Set(["h2", "h3", "p"]);

  if (!Array.isArray(sections) || sections.length === 0) {
    return [
      {
        type: "p",
        text: `This article explores ${targetKeyword} for foreign buyers considering property in Mersin, Türkiye.`,
      },
    ];
  }

  const normalized = sections
    .map((section) => {
      let type = String(section?.type || section?.heading || "p")
        .toLowerCase()
        .trim();
      if (type === "paragraph") type = "p";
      if (type === "heading" || type === "subtitle") type = "h2";
      if (!allowedTypes.has(type)) type = "p";

      const text =
        section?.text?.trim() ||
        section?.content?.trim() ||
        section?.body?.trim() ||
        section?.value?.trim() ||
        "";

      return text ? { type, text } : null;
    })
    .filter(Boolean);

  if (normalized.length === 0) {
    return [
      {
        type: "p",
        text: `This article explores ${targetKeyword} for foreign buyers considering property in Mersin, Türkiye.`,
      },
    ];
  }

  return normalized;
}

export function normalizeGeneratedArticle(article) {
  return {
    ...article,
    sections: normalizeSections(article.sections, article.targetKeyword),
    faq: normalizeFaqItems(article.faq),
    internalLinks: normalizeInternalLinks(article.internalLinks),
    relatedSlugs: Array.isArray(article.relatedSlugs)
      ? article.relatedSlugs.map(String).filter(Boolean).slice(0, 2)
      : [],
    disclaimer: article.disclaimer?.trim() || DEFAULT_DISCLAIMER,
  };
}

export function loadEnv(root) {
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
    /* local .env optional */
  }
}

export function getGeminiApiKey() {
  return process.env.GEMINI_API_KEY?.trim() || null;
}

export function countWords(sections) {
  return sections
    .filter((section) => section.type === "p")
    .map((section) => section.text.split(/\s+/).filter(Boolean).length)
    .reduce((sum, count) => sum + count, 0);
}

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf-8"));
}

function writeJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

function toImportName(slug) {
  return `post_${slug.replace(/[^a-z0-9]/gi, "_")}`;
}

function toTsFile(article) {
  const normalized = normalizeGeneratedArticle(article);
  const post = {
    slug: normalized.slug,
    title: normalized.title,
    h1: normalized.h1,
    metaTitle: normalized.metaTitle,
    metaDescription: normalized.metaDescription,
    excerpt: normalized.excerpt,
    targetKeyword: normalized.targetKeyword,
    secondaryKeywords: normalized.secondaryKeywords,
    publishedAt: normalized.publishedAt,
    category: normalized.category,
    tags: normalized.tags,
    disclaimer: normalized.disclaimer,
    sections: normalized.sections,
    faq: normalized.faq,
    internalLinks: normalized.internalLinks,
    relatedSlugs: normalized.relatedSlugs,
  };

  return `import type { BlogPost } from "@/lib/blog/types";

export const post: BlogPost = ${JSON.stringify(post, null, 2)};
`;
}

export function loadManifest(root) {
  const manifestPath = join(root, "generated-articles", "manifest.json");
  if (!existsSync(manifestPath)) {
    return { version: 1, articles: [], lastPublished: null };
  }
  return readJson(manifestPath);
}

export function saveManifest(root, manifest) {
  const dir = join(root, "generated-articles");
  mkdirSync(dir, { recursive: true });
  writeJson(join(dir, "manifest.json"), manifest);
}

export function collectExistingTopics(root) {
  const slugs = new Set();
  const titles = new Set();
  const keywords = new Set();

  const manifest = loadManifest(root);
  for (const entry of manifest.articles) {
    slugs.add(entry.slug);
    titles.add(entry.title.toLowerCase());
    keywords.add(entry.targetKeyword.toLowerCase());
  }

  const postsDir = join(root, "src", "lib", "blog", "posts");
  if (existsSync(postsDir)) {
    for (const file of readdirSync(postsDir)) {
      if (!file.endsWith(".ts")) continue;
      slugs.add(file.replace(/\.ts$/, ""));
      try {
        const content = readFileSync(join(postsDir, file), "utf-8");
        const titleMatch = content.match(/"title":\s*"([^"]+)"/);
        const keywordMatch = content.match(/"targetKeyword":\s*"([^"]+)"/);
        if (titleMatch) titles.add(titleMatch[1].toLowerCase());
        if (keywordMatch) keywords.add(keywordMatch[1].toLowerCase());
      } catch {
        /* ignore parse issues */
      }
    }
  }

  const generatedDir = join(root, "generated-articles");
  if (existsSync(generatedDir)) {
    for (const file of readdirSync(generatedDir)) {
      if (!file.endsWith(".json") || file === "manifest.json") continue;
      const data = readJson(join(generatedDir, file));
      slugs.add(data.slug);
      if (data.title) titles.add(data.title.toLowerCase());
      if (data.targetKeyword) keywords.add(data.targetKeyword.toLowerCase());
    }
  }

  return { slugs, titles, keywords };
}

export function listGeneratedJsonFiles(root) {
  const generatedDir = join(root, "generated-articles");
  if (!existsSync(generatedDir)) return [];

  return readdirSync(generatedDir)
    .filter((file) => file.endsWith(".json") && file !== "manifest.json")
    .map((file) => join(generatedDir, file));
}

export function regenerateAutoPosts(root, slugs) {
  const autoPostsPath = join(root, "src", "lib", "blog", "auto-posts.ts");
  const imports = slugs
    .map((slug) => {
      const importName = toImportName(slug);
      return `import { post as ${importName} } from "./posts/${slug}";`;
    })
    .join("\n");

  const entries = slugs
    .map((slug) => `  ${toImportName(slug)},`)
    .join("\n");

  const content = `// AUTO-GENERATED by scripts/publish-generated-articles.mjs — do not edit manually.
import type { BlogPost } from "./types";
${imports ? `${imports}\n` : ""}
export const autoPosts: BlogPost[] = [
${entries}
];
`;

  writeFileSync(autoPostsPath, content, "utf-8");
}

export function publishArticle(root, slug) {
  const jsonPath = join(root, "generated-articles", `${slug}.json`);
  if (!existsSync(jsonPath)) {
    throw new Error(`Generated article JSON not found: ${basename(jsonPath)}`);
  }

  const rawArticle = readJson(jsonPath);
  const article = normalizeGeneratedArticle(rawArticle);
  writeJson(jsonPath, article);

  const postsDir = join(root, "src", "lib", "blog", "posts");
  mkdirSync(postsDir, { recursive: true });
  writeFileSync(join(postsDir, `${slug}.ts`), toTsFile(article), "utf-8");

  const manifest = loadManifest(root);
  const existingIndex = manifest.articles.findIndex(
    (entry) => entry.slug === slug
  );
  const summary = {
    slug: article.slug,
    title: article.title,
    targetKeyword: article.targetKeyword,
    category: article.category,
    publishedAt: article.publishedAt,
  };

  if (existingIndex >= 0) {
    manifest.articles[existingIndex] = summary;
  } else {
    manifest.articles.push(summary);
  }

  manifest.lastPublished = slug;
  saveManifest(root, manifest);

  const autoSlugs = manifest.articles.map((entry) => entry.slug).sort();
  regenerateAutoPosts(root, autoSlugs);

  return article;
}

export function publishAllGeneratedArticles(root) {
  const manifest = loadManifest(root);
  const slugs = new Set(manifest.articles.map((entry) => entry.slug));

  for (const jsonPath of listGeneratedJsonFiles(root)) {
    const article = readJson(jsonPath);
    slugs.add(article.slug);
    publishArticle(root, article.slug);
  }

  regenerateAutoPosts(root, [...slugs].sort());
}
