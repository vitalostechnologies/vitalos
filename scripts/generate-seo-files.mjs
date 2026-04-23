import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");
const blogDataPath = path.join(projectRoot, "src", "data", "blog.ts");

const SITE_URL = "https://vitalos.co.uk";
const TODAY = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/solutions", priority: "0.9", changefreq: "monthly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/history", priority: "0.7", changefreq: "monthly" },
  { path: "/technology", priority: "0.8", changefreq: "monthly" },
  { path: "/careers", priority: "0.7", changefreq: "weekly" },
  { path: "/resources", priority: "0.7", changefreq: "monthly" },
  { path: "/blog", priority: "0.8", changefreq: "weekly" },
  { path: "/research", priority: "0.7", changefreq: "monthly" },
  { path: "/case-studies", priority: "0.8", changefreq: "monthly" },
  { path: "/contact", priority: "0.8", changefreq: "monthly" },
  { path: "/demo", priority: "0.8", changefreq: "monthly" },
  { path: "/investor", priority: "0.7", changefreq: "monthly" },
];

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function extractBlogEntries(source) {
  const entries = [];
  const blockPattern = /{[\s\S]*?slug:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"[\s\S]*?}/g;

  for (const match of source.matchAll(blockPattern)) {
    entries.push({
      path: `/blog/${match[1]}`,
      lastmod: match[2],
      priority: "0.6",
      changefreq: "monthly",
    });
  }

  return entries;
}

function renderSitemap(routes) {
  const body = routes
    .map(
      (route) => `  <url>
    <loc>${xmlEscape(`${SITE_URL}${route.path}`)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
  await mkdir(publicDir, { recursive: true });

  const blogData = await readFile(blogDataPath, "utf8");
  const blogRoutes = extractBlogEntries(blogData);

  const allRoutes = [
    ...staticRoutes.map((route) => ({ ...route, lastmod: TODAY })),
    ...blogRoutes,
  ];

  const sitemapXml = renderSitemap(allRoutes);
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  await writeFile(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf8");
  await writeFile(path.join(publicDir, "robots.txt"), robotsTxt, "utf8");
}

main().catch((error) => {
  console.error("Failed to generate SEO files.");
  console.error(error);
  process.exitCode = 1;
});
