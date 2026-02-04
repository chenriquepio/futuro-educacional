import { client } from "./client";
import {
  documentsQuery,
  jobVacanciesQuery,
  jobVacancyByIdQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  latestBlogPostsQuery,
  blogPostsByCategorySlugQuery,
  categoriesQuery,
  heroSlidesQuery,
} from "./queries";
import type { PortableTextBlock } from "@portabletext/types";

// Types
export interface Document {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
}

export interface JobVacancy {
  _id: string;
  title: string;
  location: string;
  type: string;
  description: PortableTextBlock[];
  requirements: string[];
  publishedAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  authorImage: unknown;
  mainImage: unknown;
  categories: string[];
  tags?: string[];
  publishedAt: string;
  excerpt: string;
  body?: PortableTextBlock[];
}

export type BlogPostWithImageUrl = BlogPost & { imageUrl?: string | null };

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  count: number;
}

export interface HeroSlide {
  _id: string;
  image: { asset?: { _ref: string }; hotspot?: unknown };
  /** URL direta do asset (sem crop) para exibir a imagem inteira. */
  imageUrl?: string | null;
  alt?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: PortableTextBlock[];
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

// Fetch functions
export async function getDocuments(): Promise<Document[]> {
  return client.fetch(documentsQuery);
}

export async function getJobVacancies(): Promise<JobVacancy[]> {
  return client.fetch(jobVacanciesQuery);
}

export async function getJobVacancyById(id: string): Promise<JobVacancy | null> {
  return client.fetch(jobVacancyByIdQuery, { id });
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(blogPostsQuery);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch(blogPostBySlugQuery, { slug });
}

export async function getLatestBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(latestBlogPostsQuery);
}

export async function getBlogPostsByCategorySlug(categorySlug: string): Promise<BlogPostWithImageUrl[]> {
  return client.fetch(blogPostsByCategorySlugQuery, { categorySlug });
}

export async function getCategories(): Promise<Category[]> {
  return client.fetch(categoriesQuery);
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return client.fetch(heroSlidesQuery);
}


