"use client";

import { useEffect } from "react";
import Hero from "./components/Hero";
import EducationalStages from "./components/EducationalStages";
import ContactForm from "./components/ContactForm";
import OurDifferential from "./components/OurDifferential";
import Sports from "./components/Sports";
import AlumniStories from "./components/AlumniStories";
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
        <AlumniStories />
      </section>
      <section id="depoimentos">
        <Testimonials />
      </section>
    </>
  );
}
