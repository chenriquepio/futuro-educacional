import { client } from "./client";
import {
  documentsQuery,
  jobVacanciesQuery,
  jobVacancyByIdQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  latestBlogPostsQuery,
  blogPostsByCategorySlugQuery,
  blogPostSlugsQuery,
  categoriesQuery,
  heroSlidesQuery,
  educationalStagesSectionQuery,
  contactSectionQuery,
  sportsSectionQuery,
  testimonialsSectionQuery,
  nossoGrupoPageQuery,
  ensinoPageQuery,
  ensinoStageCardsQuery,
  esportesPageQuery,
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
  /** Objeto de imagem de fundo (para urlFor com format jpg e remover transparência). */
  background?: { asset?: { _ref: string }; hotspot?: unknown } | null;
  /** Imagem de fundo do hero (opcional). Se não definida, usa a imagem principal ou fallback. */
  backgroundUrl?: string | null;
  alt?: string;
  /** Título em rich text (cor padrão branco; use marca "Cor do texto" para amarelo/destaque). */
  title?: PortableTextBlock[];
  subtitle?: PortableTextBlock[];
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export interface EducationalStagesSection {
  _id: string;
  eyebrow?: string;
  title?: PortableTextBlock[];
  backgroundUrl?: string | null;
}

// Card de segmento usado na home e no índice de /ensino.
// Fonte única: documento "Página Ensino" (ensinoPage.stages).
export interface EnsinoStageCard {
  name: string;
  slug?: string | null;
  selectorImageUrl?: string | null;
  title?: string;
  description?: string;
}

export interface ContactSection {
  _id: string;
  backgroundUrl?: string | null;
  manImageUrl?: string | null;
}

export interface SportsSection {
  _id: string;
  backgroundUrl?: string | null;
  athletesImageUrl?: string | null;
  eyebrow?: string;
  title?: PortableTextBlock[];
  description?: PortableTextBlock[];
  buttonText?: string;
  buttonLink?: string;
}

export interface TestimonialsSection {
  _id: string;
  backgroundUrl?: string | null;
  womanImageUrl?: string | null;
  eyebrow?: string;
  title?: PortableTextBlock[];
  testimonials?: {
    text: string;
    author: string;
    role?: string;
    avatar: string;
  }[];
}

export interface NossoGrupoPage {
  _id: string;
  hero?: {
    backgroundImageUrl?: string | null;
    eyebrow?: string;
    title?: string;
  };
  historySection?: {
    eyebrow?: string;
    title?: string;
    content?: PortableTextBlock[];
    timeline?: PortableTextBlock[];
    sideImageUrl?: string | null;
  };
  valuesSection?: {
    backgroundImageUrl?: string | null;
    contentImageUrl?: string | null;
  };
}

export interface EnsinoPageStage {
  name: string;
  slug?: string | null;
  selectorImageUrl?: string | null;
  title?: string;
  subtitle?: string;
  imageUrl?: string | null;
  backgroundUrl?: string | null;
  description?: string;
  highlights?: string[];
  section1?: {
    title: string;
    description: string;
    imageUrl?: string | null;
  };
  section2?: {
    title: string;
    description: string;
    imageUrl?: string | null;
  };
}

export interface EnsinoPage {
  _id: string;
  hero?: {
    backgroundImageUrl?: string | null;
    eyebrow?: string;
    title?: string;
  };
  stages?: EnsinoPageStage[];
}

export interface EsportesPage {
  _id: string;
  hero?: {
    backgroundImageUrl?: string | null;
    eyebrow?: string;
    title?: string;
    imageClassName?: string;
    bottomBlur?: boolean;
    imageMask?: boolean;
  };
  dynamicHeroContent?: {
    title?: string;
    description?: string;
    imageUrl?: string | null;
    backgroundUrl?: string | null;
    highlights?: string[];
  };
  storiesSection?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };
  contentSection?: {
    section1?: {
      title?: string;
      description?: string;
      imageUrl?: string | null;
    };
    section2?: {
      title?: string;
      description?: string;
      imageUrl?: string | null;
    };
  };
  ourDifferential?: {
    eyebrow?: string;
    title?: PortableTextBlock[];
  };
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

export async function getBlogSlugs(): Promise<string[]> {
  const result = await client.fetch<{ slug: string }[]>(blogPostSlugsQuery);
  return result?.map((r) => r.slug).filter(Boolean) ?? [];
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

export async function getEducationalStagesSection(): Promise<EducationalStagesSection | null> {
  return client.fetch(educationalStagesSectionQuery);
}

export async function getContactSection(): Promise<ContactSection | null> {
  return client.fetch(contactSectionQuery);
}

export async function getSportsSection(): Promise<SportsSection | null> {
  return client.fetch(sportsSectionQuery);
}

export async function getTestimonialsSection(): Promise<TestimonialsSection | null> {
  return client.fetch(testimonialsSectionQuery);
}

export async function getNossoGrupoPage(): Promise<NossoGrupoPage | null> {
  return client.fetch(nossoGrupoPageQuery);
}

export async function getEnsinoPage(): Promise<EnsinoPage | null> {
  return client.fetch(ensinoPageQuery);
}

export async function getEnsinoStageCards(): Promise<EnsinoStageCard[]> {
  const result = await client.fetch<EnsinoStageCard[] | null>(
    ensinoStageCardsQuery,
  );
  return result ?? [];
}

export async function getEsportesPage(): Promise<EsportesPage | null> {
  return client.fetch(esportesPageQuery);
}
