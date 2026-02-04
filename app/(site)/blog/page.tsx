import type { Metadata } from "next";
import HeroShowcase from "../components/HeroShowcase";
import {
  getBlogPosts,
  getLatestBlogPosts,
  getCategories,
  type BlogPost,
  type Category,
} from "../../../sanity/lib/fetch";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog do Futuro Educacional: dicas de estudo, redação, ENEM, notícias e conteúdos para estudantes e famílias.",
};

// Dados estáticos de fallback
const fallbackBlogPosts: BlogPost[] = [
  {
    _id: "1",
    title: "5 Dicas para fazer uma boa redação",
    slug: { current: "5-dicas-redacao" },
    author: "Prof. Antônio",
    authorImage: null,
    mainImage: null,
    categories: ["Redação"],
    tags: ["ENEM", "Redação"],
    publishedAt: "2024-09-20",
    excerpt:
      "Neque porro est qui dolorem ipsum quia quaed inventor. Neque porro est qui dolorem ipsum quia quaed inventor.",
  },
  {
    _id: "2",
    title: "5 Dicas para fazer uma boa redação",
    slug: { current: "5-dicas-redacao-2" },
    author: "Prof. Antônio",
    authorImage: null,
    mainImage: null,
    categories: ["Redação"],
    tags: ["ENEM", "Redação"],
    publishedAt: "2024-09-20",
    excerpt:
      "Neque porro est qui dolorem ipsum quia quaed inventor. Neque porro est qui dolorem ipsum quia quaed inventor.",
  },
  {
    _id: "3",
    title: "5 Dicas para fazer uma boa redação",
    slug: { current: "5-dicas-redacao-3" },
    author: "Prof. Antônio",
    authorImage: null,
    mainImage: null,
    categories: ["Redação"],
    tags: ["ENEM", "Redação"],
    publishedAt: "2024-09-20",
    excerpt:
      "Neque porro est qui dolorem ipsum quia quaed inventor. Neque porro est qui dolorem ipsum quia quaed inventor.",
  },
  {
    _id: "4",
    title: "5 Dicas para fazer uma boa redação",
    slug: { current: "5-dicas-redacao-4" },
    author: "Prof. Antônio",
    authorImage: null,
    mainImage: null,
    categories: ["Redação"],
    tags: ["ENEM", "Redação"],
    publishedAt: "2024-09-20",
    excerpt:
      "Neque porro est qui dolorem ipsum quia quaed inventor. Neque porro est qui dolorem ipsum quia quaed inventor.",
  },
  {
    _id: "5",
    title: "5 Dicas para fazer uma boa redação",
    slug: { current: "5-dicas-redacao-5" },
    author: "Prof. Antônio",
    authorImage: null,
    mainImage: null,
    categories: ["Redação"],
    tags: ["ENEM", "Redação"],
    publishedAt: "2024-09-20",
    excerpt:
      "Neque porro est qui dolorem ipsum quia quaed inventor. Neque porro est qui dolorem ipsum quia quaed inventor.",
  },
];

const fallbackCategories: Category[] = [
  { _id: "1", title: "Redação", slug: { current: "redacao" }, count: 6 },
  { _id: "2", title: "Matemática", slug: { current: "matematica" }, count: 6 },
  { _id: "3", title: "Português", slug: { current: "portugues" }, count: 6 },
  { _id: "4", title: "ENEM", slug: { current: "enem" }, count: 6 },
  { _id: "5", title: "Química", slug: { current: "quimica" }, count: 6 },
];

const fallbackLatestPosts = fallbackBlogPosts.slice(0, 3);

export default async function BlogPage() {
  let blogPosts = fallbackBlogPosts;
  let latestPosts = fallbackLatestPosts;
  let categories = fallbackCategories;

  // Tenta buscar do CMS se configurado
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const [cmsPosts, cmsLatest, cmsCategories] = await Promise.all([
        getBlogPosts(),
        getLatestBlogPosts(),
        getCategories(),
      ]);

      if (cmsPosts && cmsPosts.length > 0) blogPosts = cmsPosts;
      if (cmsLatest && cmsLatest.length > 0) latestPosts = cmsLatest;
      if (cmsCategories && cmsCategories.length > 0) categories = cmsCategories;
    } catch (error) {
      console.error("Erro ao buscar dados do blog do CMS:", error);
    }
  }

  return (
    <main className="bg-[#ffffff] min-h-screen">
      <HeroShowcase
        backgroundImage="/escola.jpg"
        eyebrow=""
        title="Nosso Blog"
      />

      <BlogPageClient
        blogPosts={blogPosts}
        latestPosts={latestPosts}
        categories={categories}
      />
    </main>
  );
}
