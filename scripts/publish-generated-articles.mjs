import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { publishAllGeneratedArticles } from "./lib/article-utils.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

publishAllGeneratedArticles(root);
console.log("Published generated articles to src/lib/blog/posts/");
