import type { Metadata } from "next";
import type React from "react";
import { PortableText } from "@portabletext/react";
import HeroShowcase from "../components/HeroShowcase";
import DynamicHeroContent from "../components/DynamicHeroContent";
import StoriesSection from "../components/StoriesSection";
import ContentSection from "../components/ContentSection";
import OurDifferential from "../components/OurDifferential";
import ContactForm from "../components/ContactForm";
import {
  getBlogPostsByCategorySlug,
  getContactSection,
  getEsportesPage,
} from "@/sanity/lib/fetch";
import type { BlogPostWithImageUrl } from "@/sanity/lib/fetch";

const ourDifferentialTitleComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <span className="font-extrabold">{children}</span>
    ),
    textColor: ({
      value,
      children,
    }: {
      value?: { color?: string };
      children?: React.ReactNode;
    }) => <span style={{ color: value?.color ?? "inherit" }}>{children}</span>,
  },
};

export const metadata: Metadata = {
  title: "Esportes",
  description:
    "Esporte no Futuro Educacional: formação integral, modalidades e competições. Valores como disciplina, trabalho em equipe e superação em Marabá.",
};

function formatPublishedAt(dateStr: string): string {
  const d = new Date(dateStr);
  const month = d.toLocaleDateString("pt-BR", { month: "long" });
  const capitalized = month.charAt(0).toUpperCase() + month.slice(1);
  return `${d.getDate()} de ${capitalized}, ${d.getFullYear()}`;
}

function mapPostToStory(post: BlogPostWithImageUrl) {
  return {
    title: post.title,
    image: post.imageUrl ?? "",
    creator: post.author ?? "",
    cargo: post.categories?.[0] ?? "",
    data: post.publishedAt ? formatPublishedAt(post.publishedAt) : "",
    slug: post.slug?.current,
  };
}

function mapPostToDifferential(post: BlogPostWithImageUrl) {
  return {
    title: post.title,
    imageSrc: post.imageUrl ?? "",
    imageAlt: post.excerpt ?? post.title,
    imageLabel: post.categories?.[0] ?? post.title,
    slug: post.slug?.current,
  };
}

export default async function EsportesPage() {
  const [esportesPosts, modalidadesPosts, contactSection, pageData] =
    await Promise.all([
      getBlogPostsByCategorySlug("esportes"),
      getBlogPostsByCategorySlug("modalidades"),
      getContactSection(),
      getEsportesPage(),
    ]);

  const stories = esportesPosts.map(mapPostToStory);
  const differentials = modalidadesPosts.map(mapPostToDifferential);

  const hero = pageData?.hero;
  const dynamicHero = pageData?.dynamicHeroContent;
  const storiesSection = pageData?.storiesSection;
  const contentSection = pageData?.contentSection;
  const ourDiff = pageData?.ourDifferential;

  const hasHero = hero?.backgroundImageUrl;
  const hasDynamicHero = dynamicHero?.imageUrl && dynamicHero?.backgroundUrl;
  const hasContentSection =
    contentSection?.section1?.imageUrl && contentSection?.section2?.imageUrl;

  const ourDiffTitle =
    ourDiff?.title && ourDiff.title.length > 0 ? (
      <PortableText
        value={ourDiff.title}
        components={ourDifferentialTitleComponents}
      />
    ) : null;

  return (
    <main className="bg-white">
      {hasHero && (
        <HeroShowcase
          backgroundImage={hero!.backgroundImageUrl!}
          eyebrow={hero?.eyebrow ?? ""}
          title={hero?.title ?? ""}
          imageClassName={hero?.imageClassName ?? "object-cover object-top"}
          bottomBlur={hero?.bottomBlur ?? true}
          imageMask={hero?.imageMask ?? true}
        />
      )}

      {hasDynamicHero && (
        <DynamicHeroContent
          title={dynamicHero!.title ?? ""}
          description={dynamicHero?.description ?? ""}
          image={dynamicHero!.imageUrl!}
          background={dynamicHero!.backgroundUrl!}
          highlights={dynamicHero?.highlights ?? []}
        />
      )}

      <StoriesSection
        eyebrow={storiesSection?.eyebrow ?? ""}
        title={storiesSection?.title ?? ""}
        description={storiesSection?.description ?? ""}
        stories={stories}
        creatorLabel="Criador:"
      />

      {hasContentSection && (
        <ContentSection
          section1={{
            title: contentSection!.section1!.title ?? "",
            description: contentSection!.section1!.description ?? "",
            image: contentSection!.section1!.imageUrl!,
          }}
          section2={{
            title: contentSection!.section2!.title ?? "",
            description: contentSection!.section2!.description ?? "",
            image: contentSection!.section2!.imageUrl!,
          }}
        />
      )}

      <OurDifferential
        differentials={differentials}
        eyebrow={ourDiff?.eyebrow ?? ""}
        title={ourDiffTitle}
      />

      <ContactForm
        backgroundUrl={contactSection?.backgroundUrl}
        manImageUrl={contactSection?.manImageUrl}
      />
    </main>
  );
}
