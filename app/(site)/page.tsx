import Hero from "./components/Hero";
import EducationalStages from "./components/EducationalStages";
import ContactForm from "./components/ContactForm";
import OurDifferential from "./components/OurDifferential";
import Sports from "./components/Sports";
import StoriesSection from "./components/StoriesSection";
import Testimonials from "./components/Testimonials";
import ScrollToHashOnLoad from "./components/ScrollToHashOnLoad";
import { getBlogPostsByCategorySlug } from "@/sanity/lib/fetch";
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

const defaultStories = [
  {
    title:
      "Do Futuro para o Mundo: Como Ana transformou sua paixão em carreira",
    image: "/IMG.png",
    creator: "Ana",
    cargo: "Ex Alunos",
    data: "16 de outubro de 2025",
  },
  {
    title: "Ex-aluno conquista destaque no esporte internacional",
    image: "/IMG-1.png",
    creator: "João",
    cargo: "Ex Alunos",
    data: "16 de outubro de 2025",
  },
  {
    title:
      "Do Futuro para a Justiça: ex-aluna realiza o sonho de se tornar juíza",
    image: "/IMG-2.png",
    creator: "Maria",
    cargo: "Ex Alunos",
    data: "16 de outubro de 2025",
  },
];

const defaultDifferentials = [
  {
    title: "Desenvolvimento de autonomia do estudante",
    imageSrc: "/57e4b9f1a012cdf21feaf9178a9afbc447796871.jpg",
    imageAlt: "Estudante aprovada em medicina celebrando com a família",
  },
  {
    title: "Resultados de aprovação",
    imageSrc: "/9b1c6dfcba9e9481a54c53248e1d40a5b80884d2.jpg",
    imageAlt: "Professor acompanhando aluno em sala de aula",
  },
  {
    title: "Estímulo ao hábito de estudo",
    imageLabel: "Estudo",
    imageSrc: "/9b1c6dfcba9e9481a54c53248e1d40a5b80884d2.jpg",
  },
  {
    title: "Inovação tecnológica aplicada à sala de aula",
    imageLabel: "Inovação",
    imageSrc: "/9b1c6dfcba9e9481a54c53248e1d40a5b80884d2.jpg",
  },
  {
    title: "Acompanhamento socioemocional constante",
    imageLabel: "Apoio",
    imageSrc: "/9b1c6dfcba9e9481a54c53248e1d40a5b80884d2.jpg",
  },
];

export default async function Home() {
  const [diferenciaisPosts, exAlunosPosts] = await Promise.all([
    getBlogPostsByCategorySlug("diferenciais"),
    getBlogPostsByCategorySlug("ex-alunos"),
  ]);

  const differentials =
    diferenciaisPosts.length > 0
      ? diferenciaisPosts.map(mapPostToDifferential)
      : defaultDifferentials;
  const stories =
    exAlunosPosts.length > 0
      ? exAlunosPosts.map(mapPostToStory)
      : defaultStories;

  return (
    <>
      <ScrollToHashOnLoad />
      <section className="max-h-screen" id="hero">
        <Hero />
      </section>
      <section id="ensino">
        <EducationalStages />
      </section>
      <section id="contato">
        <ContactForm />
      </section>
      <section id="diferenciais">
        <OurDifferential differentials={differentials} />
      </section>
      <section id="esportes">
        <Sports />
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
        <Testimonials />
      </section>
    </>
  );
}
