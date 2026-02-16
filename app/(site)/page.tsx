import Hero from "./components/Hero";
import EducationalStages from "./components/EducationalStages";
import ContactForm from "./components/ContactForm";
import OurDifferential from "./components/OurDifferential";
import Sports from "./components/Sports";
import StoriesSection from "./components/StoriesSection";
import Testimonials from "./components/Testimonials";
import ScrollToHashOnLoad from "./components/ScrollToHashOnLoad";
import {
  getBlogPostsByCategorySlug,
  getEducationalStagesSection,
  getContactSection,
  getSportsSection,
  getTestimonialsSection,
  getHeroSlides,
} from "@/sanity/lib/fetch";
import type { BlogPostWithImageUrl } from "@/sanity/lib/fetch";

function formatPublishedAt(dateStr: string): string {
  const d = new Date(dateStr);
  const month = d.toLocaleDateString("pt-BR", { month: "long" });
  const capitalized = month.charAt(0).toUpperCase() + month.slice(1);
  return `${d.getDate()} de ${capitalized}, ${d.getFullYear()}`;
}

function mapPostToStory(post: BlogPostWithImageUrl) {
  return {
    title: post.title,
    image: post.imageUrl ?? "/IMG.png",
    creator: post.author ?? "Autor",
    cargo: post.categories?.[0] ?? "Ex Alunos",
    data: post.publishedAt ? formatPublishedAt(post.publishedAt) : "",
    slug: post.slug?.current,
  };
}

function mapPostToDifferential(post: BlogPostWithImageUrl) {
  return {
    title: post.title,
    imageSrc: post.imageUrl ?? "/9b1c6dfcba9e9481a54c53248e1d40a5b80884d2.jpg",
    imageAlt: post.excerpt ?? post.title,
    imageLabel: post.categories?.[0] ?? post.title,
    slug: post.slug?.current,
  };
}

export default async function Home() {
  const [
    diferenciaisPosts,
    exAlunosPosts,
    educationalStagesData,
    contactSectionData,
    sportsSectionData,
    testimonialsSectionData,
    heroSlides,
  ] = await Promise.all([
    getBlogPostsByCategorySlug("diferenciais"),
    getBlogPostsByCategorySlug("ex-alunos"),
    getEducationalStagesSection(),
    getContactSection(),
    getSportsSection(),
    getTestimonialsSection(),
    getHeroSlides(),
  ]);

  const differentials =
    diferenciaisPosts.length > 0
      ? diferenciaisPosts.map(mapPostToDifferential)
      : [];
  const stories =
    exAlunosPosts.length > 0 ? exAlunosPosts.map(mapPostToStory) : [];

  return (
    <>
      <ScrollToHashOnLoad />
      <section className="max-h-screen" id="hero">
        <Hero initialSlides={heroSlides} />
      </section>
      <section id="ensino">
        <EducationalStages section={educationalStagesData} />
      </section>
      <section id="contato">
        <ContactForm
          backgroundUrl={contactSectionData?.backgroundUrl}
          manImageUrl={contactSectionData?.manImageUrl}
        />
      </section>
      <section id="diferenciais">
        <OurDifferential differentials={differentials} />
      </section>
      <section id="esportes">
        <Sports section={sportsSectionData} />
      </section>
      <section id="alunos">
        <StoriesSection
          eyebrow="EM ALTA"
          title="Para Sempre Futuro"
          description="Relembre conquistas e trajetórias de quem levou nossa escola no coração"
          stories={stories}
          creatorLabel="Criador:"
        />
      </section>
      <section id="depoimentos">
        <Testimonials section={testimonialsSectionData} />
      </section>
    </>
  );
}
