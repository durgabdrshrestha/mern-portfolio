import { writeFile } from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite";
import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.VITE_SITE_URL?.replace(/\/+$/, "");
  const publicRoutes = [
    "/",
    "/about",
    "/skills",
    "/services",
    "/experience",
    "/education",
    "/projects",
    "/testimonials",
    "/contact",
    "/privacy",
  ];

  const sitemapPlugin = {
    name: "portfolio-sitemap",
    apply: "build",
    async closeBundle() {
      if (!siteUrl) {
        console.warn("VITE_SITE_URL is unset; sitemap.xml was not generated.");
        return;
      }

      const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
      const lastModified = new Date().toISOString();
      const entries = publicRoutes.map((route) => `  <url><loc>${escapeXml(`${siteUrl}${route}`)}</loc><lastmod>${lastModified}</lastmod></url>`).join("\n");
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
      const outputDir = path.resolve(process.cwd(), "dist");

      await writeFile(path.join(outputDir, "sitemap.xml"), sitemap);
      await writeFile(
        path.join(outputDir, "robots.txt"),
        `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`
      );
    },
  };

  return {
    plugins: [react(), tailwindcss(), sitemapPlugin],
  };
});