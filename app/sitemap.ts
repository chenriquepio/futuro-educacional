import type { MetadataRoute } from "next";
import { getBlogSlugs } from "@/sanity/lib/fetch";
import { getJobVacancies } from "@/sanity/lib/fetch";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ensino`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/esportes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/documentos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/nosso-grupo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/trabalhe-conosco`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  let blogUrls: MetadataRoute.Sitemap = [];
  let jobUrls: MetadataRoute.Sitemap = [];

  try {
    const [slugs, vacancies] = await Promise.all([
      getBlogSlugs(),
      getJobVacancies(),
    ]);
    blogUrls = slugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
    jobUrls = vacancies.map((job) => ({
      url: `${baseUrl}/trabalhe-conosco/${job._id}`,
      lastModified: job.publishedAt ? new Date(job.publishedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // Sanity não configurado ou erro: só rotas estáticas
  }

  return [...staticRoutes, ...blogUrls, ...jobUrls];
}
