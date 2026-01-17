"use client";

import { useEffect } from "react";
import Hero from "./components/Hero";
import EducationalStages from "./components/EducationalStages";
import ContactForm from "./components/ContactForm";
import OurDifferential from "./components/OurDifferential";
import Sports from "./components/Sports";
import StoriesSection from "./components/StoriesSection";
import Testimonials from "./components/Testimonials";

export default function Home() {
  useEffect(() => {
    // Scroll para a seção quando há hash na URL
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.substring(1); // Remove o #
      const section = document.getElementById(sectionId);
      if (section) {
        // Pequeno delay para garantir que a página está renderizada
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  return (
    <>
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
        <OurDifferential />
      </section>
      <section id="esportes">
        <Sports />
      </section>
      <section id="alunos">
        <StoriesSection
          eyebrow="EM ALTA"
          title="Para Sempre Futuro"
          description="Relembre conquistas e trajetórias de quem levou nossa escola no coração"
          stories={[
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
          ]}
          creatorLabel="Criador:"
        />
      </section>
      <section id="depoimentos">
        <Testimonials />
      </section>
    </>
  );
}
