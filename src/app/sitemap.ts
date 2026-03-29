import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://schizocare.org";
  const locales = ["en", "de"];

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: locale === "en" ? 1.0 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`])),
    },
  }));
}
