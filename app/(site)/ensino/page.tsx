"use client";

import Image from "next/image";
import ContactForm from "../components/ContactForm";
import HeroShowcase from "../components/HeroShowcase";
import DynamicHeroContent from "../components/DynamicHeroContent";
import { useState } from "react";

const educationalStages = [
  { name: "Infantil", image: "/crianças/1.png" },
  { name: "Fundamental I", image: "/crianças/2.png" },
  { name: "Fundamental II", image: "/crianças/3.png" },
  { name: "Ensino Médio", image: "/crianças/4.png" },
  { name: "Cursinho", image: "/crianças/5.png" },
];

const stageContent = [
  {
    title: "Ensino Infantil",
    subtitle: "Exemplar no Ensino Infantil",
    image: "/ensino/IMG-ENSINO INFANTIL.png",
    background: "/ensino/BACKGROUND-ENSINO-INFANTIL.png",
    description:
      "No Ensino Infantil, cuidamos de cada etapa do desenvolvimento da criança em um ambiente acolhedor e seguro, com atividades lúdicas que despertam a curiosidade e incentivam o aprendizado contínuo.",
    highlights: [
      "Estímulo ao desenvolvimento cognitivo, motor e social.",
      "Aprendizagem através de brincadeiras e descobertas.",
      "Ambiente seguro, criativo e acolhedor.",
    ],
    section1: {
      title: "Desenvolvimento Integral",
      description:
        "Além do cuidado diário, buscamos preparar cada criança para os próximos desafios da vida escolar. Valorizamos o desenvolvimento da autonomia, do senso de responsabilidade e da convivência em grupo, sempre respeitando o ritmo individual de cada aluno.",
      image: "/crianca2/crianca3.jpg",
    },
    section2: {
      title: "Aprender Brincando",
      description:
        "Acreditamos que brincar é a forma mais natural de aprender. Por isso, nossas propostas pedagógicas unem diversão e conhecimento, criando experiências que estimulam a imaginação e a criatividade. Assim, cada criança constrói sua própria forma de compreender o mundo.",
      image: "/crianca2/crianca.jpg",
    },
  },
  {
    title: "Ensino Fundamental I",
    subtitle: "Excelência no Fundamental I",
    image: "/ensino/IMG-ENSINO FUNDAMENTAL I.png",
    background: "/ensino/BACKGROUND-ENSINO-FUNDAMENTAL I.png",
    description:
      "No Ensino Fundamental I, acompanhamos os primeiros passos acadêmicos das crianças, estimulando a leitura, a escrita, a lógica matemática e a formação de valores. Nosso objetivo é oferecer uma base sólida para o futuro, unindo conhecimento, criatividade e convivência.",
    highlights: [
      "Desenvolvimento da leitura, escrita e raciocínio lógico.",
      "Formação de valores como respeito, empatia e responsabilidade.",
      "Metodologias ativas que despertam o interesse e a autonomia.",
    ],
    section1: {
      title: "Primeiros Passos Acadêmicos",
      description:
        "No Fundamental I, ampliamos as descobertas feitas na infância e introduzimos novos desafios acadêmicos. Esse é o momento em que a criança começa a desenvolver autonomia nos estudos, consolidando habilidades de leitura, escrita e raciocínio lógico em um ambiente que também valoriza os aspectos emocionais e sociais.",
      image: "/crianca2/s2.1.png",
    },
    section2: {
      title: "Construindo Conhecimento",
      description:
        "No Fundamental I, incentivamos a curiosidade e a busca pelo saber. Nossas práticas pedagógicas estimulam a participação ativa dos alunos, promovendo a cooperação, a criatividade e o pensamento crítico. Assim, cada criança constrói bases sólidas para os próximos anos da vida escolar.",
      image: "/crianca2/s2.2.png",
    },
  },
  {
    title: "Ensino Fundamental II",
    subtitle: "Crescimento no Fundamental II",
    image: "/ensino/IMG-FUNDAMENTAL II.png",
    background: "/ensino/BACKGROUND-FUNDAMENTAL II.png",
    description:
      "No Fundamental II, os alunos aprofundam conhecimentos, desenvolvem autonomia e consolidam pensamento crítico, responsabilidade e trabalho em grupo, preparando-se para os desafios futuros.",
    highlights: [
      "Aprofundamento e pensamento crítico.",
      "Autonomia e responsabilidade.",
      "Preparação para novos desafios.",
    ],
    section1: {
      title: "Novos desafios e autonomia",
      description:
        "No Fundamental II, os alunos aprofundam os conteúdos já estudados e começam a desenvolver maior independência acadêmica. É um período de fortalecimento do pensamento crítico, da responsabilidade e da capacidade de trabalhar em grupo, preparando-os para os próximos passos da vida escolar e pessoal.",
      image: "/crianca2/s3.1.png",
    },
    section2: {
      title: "Preparação para o Futuro",
      description:
        "sNo Fundamental II, incentivamos os alunos a explorar novas áreas do conhecimento e a aplicar o que aprendem no dia a dia. Nosso objetivo é formar jovens autônomos, criativos e preparados para enfrentar desafios acadêmicos e sociais com confiança e responsabilidade.",
      image: "/crianca2/s3.2.png",
    },
  },
  {
    title: "Ensino Médio",
    subtitle: "Preparação no Ensino Médio",
    image: "/ensino/IMG-MÉDIO.png",
    background: "/ensino/BACKGROUND-ENSINO MÉDIO.png",
    description:
      "No Ensino Médio, os alunos aprofundam conhecimentos, constroem projetos de vida e se preparam para vestibulares, ENEM e futuras escolhas, desenvolvendo também valores humanos e competências para o século XXI.",
    highlights: [
      "Preparação para vestibulares e ENEM.",
      "Projetos de vida e escolhas conscientes.",
      "Formação integral e cidadania.",
    ],
    section1: {
      title: "Rumo às Grandes Conquistas",
      description:
        "No Ensino Médio, os alunos aprofundam conteúdos, preparam-se para vestibulares e ENEM e desenvolvem competências pessoais e sociais, consolidando autonomia e projetos de vida com ética e responsabilidade.",
      image: "/crianca2/s4.1.png",
    },
    section2: {
      title: "Formação para a Vida",
      description:
        "No Ensino Médio, formamos jovens críticos e responsáveis, preparados para enfrentar desafios acadêmicos, profissionais e sociais com confiança e cidadania.",
      image: "/crianca2/s4.2.png",
    },
  },
  {
    title: "Cursinho Preparatório",
    subtitle: "Aprovação no Cursinho",
    image: "/ensino/IMG-CURSINHO.png",
    background: "/ensino/BAKCGROUND-CURSINHO.png",
    description:
      "Nosso cursinho preparatório revisa e aprofunda conteúdos, com foco em vestibulares e ENEM, desenvolvendo também técnicas de estudo, disciplina e confiança para alcançar os objetivos acadêmicos.",
    highlights: [
      "Revisão e aprofundamento dos principais conteúdos.",
      "Preparação direcionada para vestibulares e ENEM.",
      "Técnicas de estudo e desenvolvimento da autoconfiança.",
    ],
    section1: {
      title: "Caminho para a Aprovação",
      description:
        "No Cursinho Preparatório, unimos revisão, simulados e acompanhamento pedagógico para fortalecer a confiança dos alunos e prepará-los para a aprovação em vestibulares e ENEM.",
      image: "/crianca2/s5.1.png",
    },
    section2: {
      title: "Construindo Resultados",
      description:
        "No Cursinho Preparatório, estimulamos hábitos de estudo, disciplina e oferecemos suporte para transformar dedicação em resultados e alcançar a aprovação.",
      image: "/crianca2/s5.2.png",
    },
  },
];

export default function EnsinoPage() {
  const [selectedStage, setSelectedStage] = useState(0);
  const currentContent = stageContent[selectedStage];

  return (
    <main className="bg-white">
      <HeroShowcase
        backgroundImage="/escola.jpg"
        eyebrow="Nosso Ensino"
        title="Do infantil até a fase adulta"
      />

      {/* Educational Stages Section */}
      <section className="pt-8 md:pt-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Mobile: Horizontal scroll */}
          <div className="flex md:hidden overflow-x-auto  md:pb-4 pb-0 gap-4 -mx-4 px-4 md:pt-0 pt-4 ">
            {educationalStages.map((stage, index) => (
              <div key={index} className="flex flex-col items-center shrink-0">
                <button
                  onClick={() => setSelectedStage(index)}
                  className={`flex relative flex-col items-center cursor-pointer transition-all duration-300 ${
                    selectedStage === index ? "scale-105" : "hover:opacity-100"
                  }`}
                >
                  <div
                    className={`relative w-24 h-32 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                      selectedStage === index
                        ? "bg-[#1C437F] border-[#1C437F]"
                        : "border-[#1C437F]"
                    }`}
                  >
                    <Image
                      src={stage.image}
                      alt={stage.name}
                      fill
                      className="object-scale-down scale-[0.8]"
                    />
                  </div>
                  <span
                    className={`min-w-[100px] text-xs text-center absolute whitespace-nowrap bottom-6 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                      selectedStage === index
                        ? "bg-[#FDC938] text-[#1C437F] font-semibold"
                        : "bg-[#1C437F] text-white font-normal"
                    }`}
                  >
                    {stage.name}
                  </span>
                </button>
                {/* Line indicator */}
                <div
                  className={`transition-all duration-300 ${
                    selectedStage === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    width: "5px",
                    height: "40px",
                    backgroundColor: "#1C437F",
                  }}
                ></div>
              </div>
            ))}
          </div>

          {/* Desktop: Original layout */}
          <div className="hidden md:flex  justify-center gap-6">
            {educationalStages.map((stage, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => setSelectedStage(index)}
                  className={`flex relative flex-col items-center cursor-pointer transition-all duration-300 ${
                    selectedStage === index ? "scale-105" : "hover:opacity-100"
                  }`}
                >
                  <div
                    className={`relative w-40 h-60 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                      selectedStage === index
                        ? "bg-[#1C437F] border-[#1C437F]"
                        : "border-[#1C437F]"
                    }`}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, black 75%, transparent 75%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, black 75%, transparent 75%)",
                      }}
                    >
                      <Image
                        src={stage.image}
                        alt={stage.name}
                        fill
                        className="object-cover object-top scale-[0.8]"
                      />
                    </div>
                  </div>
                  <span
                    className={`${
                      index === 0 || index === 4
                        ? "min-w-[135px]"
                        : "min-w-[170px]"
                    } text-sm text-center absolute whitespace-nowrap bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedStage === index
                        ? "bg-[#FDC938] text-[#1C437F] font-semibold"
                        : "bg-[#1C437F] text-white font-normal "
                    }`}
                  >
                    {stage.name}
                  </span>
                </button>
                {/* Line indicator */}
                <div
                  className={`transition-all duration-300 relative ${
                    selectedStage === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    width: "7px",
                    height: "64px",
                    backgroundColor: "#1C437F",
                  }}
                >
                  <div className="absolute top-[-5px] left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#1C437F]"></div>
                  <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#1C437F]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content Section */}
      <DynamicHeroContent
        title={currentContent.title}
        description={currentContent.description}
        image={currentContent.image}
        background={currentContent.background}
        highlights={currentContent.highlights}
      />

      {/* Section 1 - Dynamic */}
      <section className="pt-12 md:pt-20 pb-5  bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#1e3a5f] mb-3 md:mb-4">
                {currentContent.section1.title}
              </h2>
              <p className="text-base md:text-lg text-[#504E4E] leading-relaxed max-w-[480px] mx-auto lg:mx-0">
                {currentContent.section1.description}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="relative max-w-[400px] md:max-w-[560px] w-full">
                {/* 2 bordas decorativas do lado direito - hidden on mobile */}
                <div className="hidden md:block absolute top-0 h-56 right-[28px] w-full rounded-full border-2 border-[#FDC938]"></div>
                <div className="hidden md:block absolute top-0 h-56 right-[14px] w-full rounded-full border-2 border-[#1C437F]"></div>
                <div className="relative w-full h-48 md:h-56 rounded-full overflow-hidden">
                  <Image
                    src={currentContent.section1.image}
                    alt={currentContent.section1.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Dynamic */}
      <section className="pt-5 pb-12 md:pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1 mt-6 lg:mt-0">
              <div className="relative max-w-[400px] md:max-w-[560px] w-full">
                {/* 2 bordas decorativas do lado esquerdo - hidden on mobile */}
                <div className="hidden md:block absolute top-0 left-[28px] w-full h-56 rounded-full border-2 border-[#FDC938]"></div>
                <div className="hidden md:block absolute top-0 left-[14px] w-full h-56 rounded-full border-2 border-[#1C437F]"></div>
                <div className="relative w-full h-48 md:h-56 rounded-full overflow-hidden">
                  <Image
                    src={currentContent.section2.image}
                    alt={currentContent.section2.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 ml-0 lg:ml-12 text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#1e3a5f] mb-3 md:mb-4">
                {currentContent.section2.title}
              </h2>
              <p className="text-base md:text-lg text-[#504E4E] leading-relaxed">
                {currentContent.section2.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
