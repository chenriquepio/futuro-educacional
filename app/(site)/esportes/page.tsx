import HeroShowcase from "../components/HeroShowcase";
import DynamicHeroContent from "../components/DynamicHeroContent";
import StoriesSection from "../components/StoriesSection";
import ContentSection from "../components/ContentSection";
import OurDifferential from "../components/OurDifferential";
import ContactForm from "../components/ContactForm";

const sportsContent = {
  section1: {
    title: "Formação Integral através do Esporte",
    description:
      "Acreditamos que o esporte é uma ferramenta poderosa para o desenvolvimento integral dos nossos estudantes. Além de promover saúde física, trabalhamos valores como disciplina, trabalho em equipe, respeito e superação de desafios, formando cidadãos completos e preparados para a vida.",
    image: "/crianca2/crianca3.jpg",
  },
  section2: {
    title: "Modalidades e Competições",
    description:
      "Oferecemos diversas modalidades esportivas e participamos ativamente de competições regionais e nacionais. Nossos atletas são acompanhados por profissionais qualificados e recebem todo o suporte necessário para desenvolverem seu potencial máximo, sempre equilibrando esporte e estudos.",
    image: "/crianca2/crianca.jpg",
  },
};

const sportsDifferentials = [
  {
    title: "Futebol: Técnica e Estratégia",
    imageSrc: "/57e4b9f1a012cdf21feaf9178a9afbc447796871.jpg",
    imageAlt: "Equipe de futebol em treinamento",
  },
  {
    title: "Voleibol: Trabalho em Equipe",
    imageSrc: "/9b1c6dfcba9e9481a54c53248e1d40a5b80884d2.jpg",
    imageAlt: "Equipe de voleibol em competição",
  },
  {
    title: "Basquete: Agilidade e Coordenação",
    imageLabel: "Basquete",
    imageSrc: "/9b1c6dfcba9e9481a54c53248e1d40a5b80884d2.jpg",
  },
  {
    title: "Natação: Resistência e Técnica",
    imageLabel: "Natação",
    imageSrc: "/9b1c6dfcba9e9481a54c53248e1d40a5b80884d2.jpg",
  },
  {
    title: "Atletismo: Superação de Limites",
    imageLabel: "Atletismo",
    imageSrc: "/9b1c6dfcba9e9481a54c53248e1d40a5b80884d2.jpg",
  },
];

export default function EsportesPage() {
  return (
    <main className="bg-white">
      <HeroShowcase
        backgroundImage="/bg-esporte.png"
        eyebrow=""
        title="Esportes"
        imageClassName="object-cover object-top"
        bottomBlur={true}
        imageMask={true}
      />

      <DynamicHeroContent
        title="Esportes no Futuro"
        description="No nosso colégio, o esporte vai além da competição. Trabalhamos valores como disciplina, trabalho em equipe, respeito e superação, formando cidadãos completos através da prática esportiva. Nossos alunos desenvolvem não apenas habilidades físicas, mas também competências socioemocionais essenciais para a vida."
        image="/ensino/IMG-ENSINO INFANTIL.png"
        background="/ensino/BACKGROUND-ENSINO-INFANTIL.png"
        highlights={[
          "Desenvolvimento físico e mental através do esporte.",
          "Valores como disciplina, trabalho em equipe e respeito.",
          "Participação em competições regionais e nacionais.",
        ]}
      />

      <StoriesSection
        eyebrow="NOSSO BLOG"
        title="O que acontece na Educação Física e no Esporte"
        description="Relembre conquistas e trajetórias de quem levou nossa escola no coração"
        stories={[
          {
            title: "Mais que um jogo: como o esporte transforma a rotina dos nossos alunos",
            image: "/sport-carrossel-1.jpg",
            creator: "Professor José",
            cargo: "Esportes",
            data: "26 de Outubro, 2024",
          },
          {
            title: "Dentro e fora das quadras: o impacto do esporte na formação dos estudantes",
            image: "/sport-carrossel-2.jpg",
            creator: "Professor José",
            cargo: "Esportes",
            data: "26 de Outubro, 2024",
          },
          {
            title: "Atletas do Futuro: alunos que se destacam no esporte e inspiram outros colegas",
            image: "/sport-carrossel-3.jpg",
            creator: "Professor José",
            cargo: "Esportes",
            data: "26 de Outubro, 2024",
          },
        ]}
        creatorLabel="Criador:"
      />

      <ContentSection
        section1={sportsContent.section1}
        section2={sportsContent.section2}
      />

      <OurDifferential
        differentials={sportsDifferentials}
        eyebrow="Modalidades"
        title={
          <>
            Conheça as{" "}
            <span className="font-extrabold text-[#1e3a5f]">
              modalidades esportivas
            </span>{" "}
            que oferecemos e como cada uma contribui para o desenvolvimento dos
            nossos estudantes.
          </>
        }
      />

      <ContactForm />
    </main>
  );
}
