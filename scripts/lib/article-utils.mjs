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
  const post = {
    slug: article.slug,
    title: article.title,
    h1: article.h1,
    metaTitle: article.metaTitle,
    metaDescription: article.metaDescription,
    excerpt: article.excerpt,
    targetKeyword: article.targetKeyword,
    secondaryKeywords: article.secondaryKeywords,
    publishedAt: article.publishedAt,
    category: article.category,
    tags: article.tags,
    disclaimer: article.disclaimer || DEFAULT_DISCLAIMER,
    sections: article.sections,
    faq: article.faq,
    internalLinks: article.internalLinks,
    relatedSlugs: article.relatedSlugs,
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

  const article = readJson(jsonPath);
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
