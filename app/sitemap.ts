import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";

const routes = [
  "/",
  "/ppp-salary-calculator/",
  "/india-vs-usa-ppp-calculator/",
  "/aed-to-inr-ppp-calculator/",
  "/euro-to-inr-ppp-calculator/",
  "/ppp-calculator-by-country/",
  "/gdp-ppp-calculator/",
  "/methodology/",
  "/data-sources/",
  "/about/",
  "/contact/",
  "/privacy-policy/",
  "/terms/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: new URL(path, siteConfig.url).toString(), changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : path.includes("calculator") ? 0.9 : 0.6 }));
}
