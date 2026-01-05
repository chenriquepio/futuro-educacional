"use client";

import Image from "next/image";
import Link from "next/link";
import Pagination from "../components/Pagination";
import { useState, useMemo } from "react";
import type { BlogPost, Category } from "../../../sanity/lib/fetch";
import { urlFor } from "../../../sanity/lib/client";

interface BlogPageClientProps {
  blogPosts: BlogPost[];
  latestPosts: BlogPost[];
  categories: Category[];
}

// Fallback tags caso não tenha posts
const fallbackTags = [
  "Ciências",
  "ENEM",
  "Matemática",
  "Química",
  "Português",
  "Redação",
];

const comments = [
  "Neque Porro Est Qui Dolorem Ipsum Quia Quaed Inventor",
  "Neque Porro Est Qui Dolorem Ipsum Quia Quaed Inventor",
  "Neque Porro Est Qui Dolorem Ipsum Quia Quaed Inventor",
];

const ITEMS_PER_PAGE = 3;
const TAGS_INITIAL_LIMIT = 9; // Aproximadamente 3 linhas de tags

export default function BlogPageClient({
  blogPosts,
  latestPosts,
  categories,
}: BlogPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extrair tags únicas de todos os posts
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    blogPosts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => tagsSet.add(tag));
      }
    });
    const uniqueTags = Array.from(tagsSet);
    return uniqueTags.length > 0 ? uniqueTags : fallbackTags;
  }, [blogPosts]);

  // Tags visíveis (limitadas ou todas)
  const visibleTags = showAllTags
    ? allTags
    : allTags.slice(0, TAGS_INITIAL_LIMIT);
  const hasMoreTags = allTags.length > TAGS_INITIAL_LIMIT;

  const totalPages = Math.ceil(blogPosts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper para formatar data
  const formatDate = (dateString: string) => {
    if (!dateString) return { day: "01", month: "JAN" };
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const months = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];
    const month = months[date.getMonth()];
    return { day, month };
  };

  // Helper para obter URL da imagem
  const getImageUrl = (image: unknown, fallback: string) => {
    if (!image) return fallback;
    try {
      return urlFor(image).url();
    } catch {
      return fallback;
    }
  };

  return (
    <section className="py-8 md:py-12 bg-[#ffffff]">
      <div className="container mx-auto px-4">
        {/* Mobile: Search and Filter Toggle */}
        <div className="lg:hidden mb-6">
          <div className="rounded-lg bg-[#1C437F1A] p-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquise aqui"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C437F] text-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C437F] hover:text-[#1C437F]/80">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.04937 16.0903C9.837 16.0904 11.5735 15.4939 12.9838 14.3955L18.3044 19.7161C18.7019 20.1 19.3353 20.089 19.7191 19.6915C20.0936 19.3038 20.0936 18.6891 19.7191 18.3014L14.3985 12.9808C17.1242 9.47199 16.4895 4.41791 12.9807 1.69215C9.47194 -1.03361 4.41791 -0.398871 1.69215 3.10991C-1.03361 6.6187 -0.398871 11.6728 3.10991 14.3985C4.52252 15.4959 6.26057 16.0912 8.04937 16.0903ZM3.77429 3.77121C6.13538 1.41008 9.96346 1.41004 12.3246 3.77113C14.6857 6.13221 14.6858 9.96029 12.3247 12.3214C9.96359 14.6826 6.13551 14.6826 3.77437 12.3215C3.77433 12.3215 3.77433 12.3215 3.77429 12.3214C1.4132 9.97754 1.39929 6.16341 3.74317 3.80233C3.75353 3.79193 3.76389 3.78157 3.77429 3.77121Z"
                    fill="#1C437F"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full py-3 px-4 bg-[#1C437F] text-white rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H21M6 12H18M9 18H15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Sidebar - Filters */}
          <aside
            className={`lg:col-span-1 space-y-4 md:space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            {/* Search - Hidden on mobile */}
            <div className="hidden lg:block rounded-lg bg-[#1C437F1A] p-6">
              <h3 className="text-[22px] font-semibold text-[#17012C] mb-3">
                Pesquise aqui
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquise aqui"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C437F]"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1C437F] hover:text-[#1C437F]/80">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.04937 16.0903C9.837 16.0904 11.5735 15.4939 12.9838 14.3955L18.3044 19.7161C18.7019 20.1 19.3353 20.089 19.7191 19.6915C20.0936 19.3038 20.0936 18.6891 19.7191 18.3014L14.3985 12.9808C17.1242 9.47199 16.4895 4.41791 12.9807 1.69215C9.47194 -1.03361 4.41791 -0.398871 1.69215 3.10991C-1.03361 6.6187 -0.398871 11.6728 3.10991 14.3985C4.52252 15.4959 6.26057 16.0912 8.04937 16.0903ZM3.77429 3.77121C6.13538 1.41008 9.96346 1.41004 12.3246 3.77113C14.6857 6.13221 14.6858 9.96029 12.3247 12.3214C9.96359 14.6826 6.13551 14.6826 3.77437 12.3215C3.77433 12.3215 3.77433 12.3215 3.77429 12.3214C1.4132 9.97754 1.39929 6.16341 3.74317 3.80233C3.75353 3.79193 3.76389 3.78157 3.77429 3.77121Z"
                      fill="#1C437F"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Latest Posts */}
            <div className="bg-[#1C437F1A] rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-[22px] font-semibold text-[#17012C] mb-3 md:mb-4">
                Últimos Posts
              </h3>
              <div className="space-y-3 md:space-y-4">
                {latestPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug?.current || post._id}`}
                    className="flex gap-3 group"
                  >
                    <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={getImageUrl(
                          post.mainImage,
                          "/crianças/crianca1.jpg"
                        )}
                        alt={post.title}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <svg
                          width="11"
                          height="12"
                          viewBox="0 0 11 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.37148 6.2313C7.08578 6.2313 8.48714 4.82995 8.48714 3.11565C8.48714 1.40135 7.08578 0 5.37148 0C3.65719 0 2.25586 1.40135 2.25586 3.11565C2.25586 4.82995 3.65721 6.2313 5.37148 6.2313Z"
                            fill="#1C437F"
                          />
                          <path
                            d="M10.7185 8.72108C10.6369 8.51699 10.528 8.32652 10.4056 8.14964C9.77972 7.22446 8.81376 6.61222 7.72532 6.46256C7.58928 6.44897 7.43962 6.47615 7.33076 6.55779C6.75933 6.97957 6.07907 7.19725 5.37157 7.19725C4.66407 7.19725 3.98381 6.97957 3.41238 6.55779C3.30352 6.47615 3.15386 6.43535 3.01782 6.46256C1.92938 6.61222 0.949799 7.22446 0.337559 8.14964C0.215111 8.32652 0.106257 8.53061 0.0246426 8.72108C-0.0161647 8.80272 -0.00257098 8.89795 0.0382363 8.97959C0.14709 9.17006 0.283132 9.36056 0.40558 9.52381C0.596049 9.78233 0.800137 10.0136 1.03144 10.2313C1.22191 10.4218 1.43959 10.5986 1.6573 10.7755C2.73212 11.5782 4.02464 12 5.35798 12C6.69131 12 7.98384 11.5782 9.05865 10.7755C9.27634 10.6122 9.49402 10.4218 9.68451 10.2313C9.90219 10.0136 10.1199 9.7823 10.3104 9.52381C10.4464 9.34694 10.5689 9.17006 10.6777 8.97959C10.7457 8.89795 10.7593 8.80269 10.7185 8.72108Z"
                            fill="#1C437F"
                          />
                        </svg>
                        <p className="text-xs text-gray-600">
                          Por: {post.author}
                        </p>
                      </div>
                      <h4 className="text-sm md:text-base font-semibold text-[#17012C] line-clamp-2 group-hover:text-[#1C437F] transition-colors">
                        {post.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-[#1C437F1A] rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-[22px] font-semibold text-[#17012C] mb-3 md:mb-4">
                Categorias
              </h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category._id}>
                    <a
                      href="#"
                      className="flex items-center justify-between text-sm md:text-base text-[#17012C] hover:text-[#1C437F] transition-colors"
                    >
                      <span>{category.title}</span>
                      <span>({category.count})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="bg-[#1C437F1A] rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-[22px] font-semibold text-[#17012C] mb-3 md:mb-4">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }
                    className={`px-3 py-1 rounded-[5px] text-sm font-normal transition-colors ${
                      selectedTag === tag
                        ? "bg-[#1C437F] text-white"
                        : "bg-white text-[#17012C] hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {hasMoreTags && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="mt-3 text-[#1C437F] text-sm font-medium hover:underline flex items-center gap-1"
                >
                  {showAllTags ? (
                    <>
                      Ver menos
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Ver mais ({allTags.length - TAGS_INITIAL_LIMIT})
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </aside>

          {/* Right Column - Blog Posts */}
          <div className="lg:col-span-2 space-y-2">
            {currentPosts.map((post) => {
              const { day, month } = formatDate(post.publishedAt);
              return (
                <article
                  key={post._id}
                  className="bg-white rounded-lg overflow-hidden"
                >
                  <div className="relative h-48 md:h-64 w-full">
                    <Image
                      src={getImageUrl(
                        post.mainImage,
                        "/crianças/crianca1.jpg"
                      )}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 text-white bg-[#F2EEEA] rounded-lg font-bold flex flex-col items-center">
                      <span className="bg-[#1C437F] px-[18px] md:px-[22px] rounded-[5px] py-[6px] md:py-[8px] text-[12px] md:text-[14px] leading-none">
                        {day}
                      </span>
                      <span className="px-3 md:px-4 py-1 rounded-[5px] text-[12px] md:text-[14px] bg-[#F2EEEA] text-[#17012C]">
                        {month}
                      </span>
                    </div>
                  </div>
                  <div className="pt-6 md:pt-8">
                    <div className="flex items-center gap-3 md:gap-4 text-sm text-gray-600 mb-2 md:mb-3">
                      <div className="flex items-center gap-2">
                        <svg
                          width="11"
                          height="12"
                          viewBox="0 0 11 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.37148 6.2313C7.08578 6.2313 8.48714 4.82995 8.48714 3.11565C8.48714 1.40135 7.08578 0 5.37148 0C3.65719 0 2.25586 1.40135 2.25586 3.11565C2.25586 4.82995 3.65721 6.2313 5.37148 6.2313Z"
                            fill="#1C437F"
                          />
                          <path
                            d="M10.7185 8.72108C10.6369 8.51699 10.528 8.32652 10.4056 8.14964C9.77972 7.22446 8.81376 6.61222 7.72532 6.46256C7.58928 6.44897 7.43962 6.47615 7.33076 6.55779C6.75933 6.97957 6.07907 7.19725 5.37157 7.19725C4.66407 7.19725 3.98381 6.97957 3.41238 6.55779C3.30352 6.47615 3.15386 6.43535 3.01782 6.46256C1.92938 6.61222 0.949799 7.22446 0.337559 8.14964C0.215111 8.32652 0.106257 8.53061 0.0246426 8.72108C-0.0161647 8.80272 -0.00257098 8.89795 0.0382363 8.97959C0.14709 9.17006 0.283132 9.36056 0.40558 9.52381C0.596049 9.78233 0.800137 10.0136 1.03144 10.2313C1.22191 10.4218 1.43959 10.5986 1.6573 10.7755C2.73212 11.5782 4.02464 12 5.35798 12C6.69131 12 7.98384 11.5782 9.05865 10.7755C9.27634 10.6122 9.49402 10.4218 9.68451 10.2313C9.90219 10.0136 10.1199 9.7823 10.3104 9.52381C10.4464 9.34694 10.5689 9.17006 10.6777 8.97959C10.7457 8.89795 10.7593 8.80269 10.7185 8.72108Z"
                            fill="#1C437F"
                          />
                        </svg>
                        <span className="text-xs text-[#504E4E]">
                          Por: {post.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          width="15"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.34028 0C3.29286 0 1.97273e-05 2.96351 1.97273e-05 6.60623C1.97273e-05 7.87952 0.402755 9.11293 1.16663 10.1795C1.02203 11.7789 0.634463 12.9663 0.0717096 13.5288C-0.0026717 13.6032 -0.021267 13.717 0.0257106 13.8109C0.0673054 13.8949 0.152942 13.9465 0.244695 13.9465C0.25595 13.9465 0.267205 13.9458 0.278705 13.944C0.377798 13.9301 2.6797 13.5988 4.34472 12.6377C5.29014 13.0192 6.29723 13.2125 7.34028 13.2125C11.3877 13.2125 14.6805 10.249 14.6805 6.60623C14.6805 2.96351 11.3877 0 7.34028 0ZM3.91482 7.58493C3.37507 7.58493 2.93612 7.14599 2.93612 6.60623C2.93612 6.06648 3.37507 5.62753 3.91482 5.62753C4.45458 5.62753 4.89353 6.06648 4.89353 6.60623C4.89353 7.14599 4.45458 7.58493 3.91482 7.58493ZM7.34028 7.58493C6.80052 7.58493 6.36158 7.14599 6.36158 6.60623C6.36158 6.06648 6.80052 5.62753 7.34028 5.62753C7.88003 5.62753 8.31898 6.06648 8.31898 6.60623C8.31898 7.14599 7.88003 7.58493 7.34028 7.58493ZM10.7657 7.58493C10.226 7.58493 9.78703 7.14599 9.78703 6.60623C9.78703 6.06648 10.226 5.62753 10.7657 5.62753C11.3055 5.62753 11.7444 6.06648 11.7444 6.60623C11.7444 7.14599 11.3055 7.58493 10.7657 7.58493Z"
                            fill="#1C437F"
                          />
                        </svg>
                        <span className="text-xs text-[#504E4E]">
                          0 Comentários
                        </span>
                      </div>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#17012C] py-3 md:py-4">
                      {post.title}
                    </h2>
                    <p className="text-sm md:text-base text-[#504E4E] font-normal mb-4 md:mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="inline-block bg-[#1C437F] text-white font-semibold px-5 md:px-6 py-2 rounded-lg hover:bg-[#1C437F]/90 transition-colors text-sm md:text-base"
                    >
                      Leia Mais
                    </Link>
                    <div className="h-px mt-6 md:mt-8 bg-[#E4E4E4] w-full"></div>
                  </div>
                </article>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
