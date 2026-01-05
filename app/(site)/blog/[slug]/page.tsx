import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import HeroShowcase from "../../components/HeroShowcase";
import {
  getBlogPostBySlug,
  getLatestBlogPosts,
  getCategories,
  type BlogPost,
  type Category,
} from "../../../../sanity/lib/fetch";
import { urlFor } from "../../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import NewsletterForm from "../components/NewsletterForm";

// Dados de fallback
const fallbackPost: BlogPost = {
  _id: "1",
  title: "5 Dicas para fazer uma boa redação",
  slug: { current: "5-dicas-redacao" },
  author: "Prof. Antônio",
  authorImage: null,
  mainImage: null,
  categories: ["Redação"],
  tags: ["ENEM", "Redação", "Vestibular"],
  publishedAt: "2024-09-20",
  excerpt:
    "Dominar a arte da escrita é essencial para o sucesso acadêmico e profissional. Confira cinco dicas práticas que vão transformar suas redações.",
  body: [],
};

const fallbackCategories: Category[] = [
  { _id: "1", title: "Redação", slug: { current: "redacao" }, count: 6 },
  { _id: "2", title: "Matemática", slug: { current: "matematica" }, count: 6 },
  { _id: "3", title: "Português", slug: { current: "portugues" }, count: 6 },
  { _id: "4", title: "ENEM", slug: { current: "enem" }, count: 6 },
];

const fallbackLatestPosts: BlogPost[] = [
  {
    _id: "2",
    title: "Como se preparar para o ENEM",
    slug: { current: "como-se-preparar-enem" },
    author: "Prof. Maria",
    authorImage: null,
    mainImage: null,
    categories: ["ENEM"],
    tags: ["ENEM"],
    publishedAt: "2024-09-18",
    excerpt: "Dicas essenciais para sua preparação.",
  },
  {
    _id: "3",
    title: "Matemática básica: fundamentos",
    slug: { current: "matematica-basica" },
    author: "Prof. Carlos",
    authorImage: null,
    mainImage: null,
    categories: ["Matemática"],
    tags: ["Matemática"],
    publishedAt: "2024-09-15",
    excerpt: "Aprenda os fundamentos da matemática.",
  },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Componentes customizados para o PortableText
const portableTextComponents = {
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-[#17012C] mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-[#17012C] mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl md:text-2xl font-bold text-[#17012C] mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="text-lg md:text-xl font-bold text-[#17012C] mt-6 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#FDC938] pl-4 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-2 my-4 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 my-4 text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-[#17012C]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        className="text-[#1C437F] underline hover:text-[#1C437F]/80"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post: BlogPost | null = null;
  let latestPosts = fallbackLatestPosts;
  let categories = fallbackCategories;

  // Tenta buscar do CMS
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const [cmsPost, cmsLatest, cmsCategories] = await Promise.all([
        getBlogPostBySlug(slug),
        getLatestBlogPosts(),
        getCategories(),
      ]);

      post = cmsPost;
      if (cmsLatest && cmsLatest.length > 0) latestPosts = cmsLatest;
      if (cmsCategories && cmsCategories.length > 0) categories = cmsCategories;
    } catch (error) {
      console.error("Erro ao buscar post do CMS:", error);
    }
  }

  // Se não encontrou no CMS, usa fallback
  if (!post) {
    if (slug === "5-dicas-redacao") {
      post = fallbackPost;
    } else {
      notFound();
    }
  }

  // Helper para obter URL da imagem
  const getImageUrl = (image: unknown, fallback: string) => {
    if (!image) return fallback;
    try {
      return urlFor(image).url();
    } catch {
      return fallback;
    }
  };

  // Formatar data
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="bg-white min-h-screen">
      <HeroShowcase
        backgroundImage={getImageUrl(post.mainImage, "/escola.jpg")}
        eyebrow="BLOG"
        title={post.title}
      />

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#1C437F]">
              Início
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#1C437F]">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#1C437F] font-medium truncate max-w-[200px]">
              {post.title}
            </span>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Conteúdo Principal */}
            <article className="lg:col-span-2">
              {/* Imagem Principal */}
              <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden mb-8">
                <Image
                  src={getImageUrl(post.mainImage, "/escola.jpg")}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Meta informações */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                {/* Autor */}
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1C437F]">
                    {post.authorImage ? (
                      <Image
                        src={getImageUrl(post.authorImage, "")}
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold">
                        {post.author?.charAt(0) || "A"}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {post.author}
                  </span>
                </div>

                {/* Data */}
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                {/* Categorias */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <div className="flex gap-2">
                      {post.categories.map((cat, index) => (
                        <span
                          key={index}
                          className="text-[#1C437F] font-medium"
                        >
                          {cat}
                          {index < post.categories.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Conteúdo do Post */}
              <div className="prose prose-lg max-w-none">
                {post.body && post.body.length > 0 ? (
                  <PortableText
                    value={post.body}
                    components={portableTextComponents}
                  />
                ) : (
                  <div className="text-gray-700 leading-relaxed">
                    <p className="text-lg mb-6">{post.excerpt}</p>
                    <p className="text-gray-500 italic">
                      Conteúdo completo em breve...
                    </p>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">
                    Tags:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#1C437F1A] text-[#1C437F] rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Compartilhar */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">
                  Compartilhar:
                </h4>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                    </svg>
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + " - " + (typeof window !== "undefined" ? window.location.href : ""))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#0A66C2] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Navegação entre posts */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[#1C437F] font-semibold hover:underline"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Voltar para o Blog
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Últimos Posts */}
              <div className="bg-[#1C437F1A] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#17012C] mb-4">
                  Últimos Posts
                </h3>
                <div className="space-y-4">
                  {latestPosts
                    .filter((p) => p._id !== post._id)
                    .slice(0, 3)
                    .map((latestPost) => (
                      <Link
                        key={latestPost._id}
                        href={`/blog/${latestPost.slug.current}`}
                        className="flex gap-3 group"
                      >
                        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={getImageUrl(
                              latestPost.mainImage,
                              "/crianças/crianca1.jpg"
                            )}
                            alt={latestPost.title}
                            fill
                            sizes="80px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-500 mb-1">
                            {formatDate(latestPost.publishedAt)}
                          </p>
                          <h4 className="text-sm font-semibold text-[#17012C] line-clamp-2 group-hover:text-[#1C437F] transition-colors">
                            {latestPost.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Categorias */}
              <div className="bg-[#1C437F1A] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#17012C] mb-4">
                  Categorias
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link
                        href={`/blog?categoria=${category.slug.current}`}
                        className="flex items-center justify-between text-[#17012C] hover:text-[#1C437F] transition-colors"
                      >
                        <span>{category.title}</span>
                        <span className="text-gray-500">({category.count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Newsletter */}
              <NewsletterForm />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

