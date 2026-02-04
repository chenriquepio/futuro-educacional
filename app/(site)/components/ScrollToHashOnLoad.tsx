"use client";

import { useEffect } from "react";

export default function ScrollToHashOnLoad() {
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

  return null;
}
