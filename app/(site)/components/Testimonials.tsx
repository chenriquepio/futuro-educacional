"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      text: "Melhor escola de Marabá! Topíssima!",
      author: "Delzyane Ferreira",
      role: "Mãe de aluno",
      avatar: "DF",
    },
    {
      text: "Orgulho de ter meus filhos com vocês!!! Parceria 2026 efetuada com sucesso!",
      author: "Regiane Chamon",
      role: "Mãe de aluna",
      avatar: "RC",
    },
    {
      text: "Excelente instituição de ensino!",
      author: "Nome Exemplo",
      role: "Pai de aluno",
      avatar: "NE",
    },
  ];

  // Responsive card sizes
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const CARD_WIDTH = isMobile ? 280 : 320;
  const CARD_GAP = isMobile ? 12 : 16;
  const ITEM_SIZE = CARD_WIDTH + CARD_GAP;
  const VISIBLE_COUNT = isMobile ? 1.2 : 2.5;
  const SLIDER_MAX_WIDTH = CARD_WIDTH * VISIBLE_COUNT + CARD_GAP * 2;

  const originalLength = testimonials.length;
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];
  const startIndex = originalLength;

  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handleNavigation = (direction: "next" | "prev") => {
    setCurrentIndex((prev) => {
      const lastIndex = duplicatedTestimonials.length - originalLength - 1;

      if (direction === "next") {
        const next =
          prev + 1 > lastIndex ? prev + 1 - originalLength : prev + 1;
        return next;
      }

      const next =
        prev - 1 < originalLength ? prev - 1 + originalLength : prev - 1;
      return next;
    });
  };

  return (
    <section
      className="py-12 md:py-20 relative overflow-hidden min-h-[480px] md:min-h-[580px] h-full"
      style={{
        backgroundImage: "url('/BACKGROUND-testemunho.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left side - Testimonials */}
          <div className="flex-1 w-full max-w-3xl">
            <div className="mb-6 text-center md:text-left">
              <span className="text-sm font-bold text-[#1C437F] uppercase">
                TESTEMUNHOS
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#17012C] mt-2">
                O que estão falando sobre nós
              </h2>
            </div>

            <div className="relative max-w-full pl-0 md:pl-[40px]">
              <div
                className="overflow-hidden mx-auto"
                style={{ 
                  maxWidth: `${SLIDER_MAX_WIDTH}px`,
                  WebkitMaskImage: isMobile 
                    ? 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 75%, rgba(0, 0, 0, 0.6) 85%, rgba(0, 0, 0, 0.3) 92%, rgba(0, 0, 0, 0) 100%)'
                    : 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 60%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.4) 85%, rgba(0, 0, 0, 0.15) 92%, rgba(0, 0, 0, 0) 100%)',
                  maskImage: isMobile 
                    ? 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 75%, rgba(0, 0, 0, 0.6) 85%, rgba(0, 0, 0, 0.3) 92%, rgba(0, 0, 0, 0) 100%)'
                    : 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 60%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.4) 85%, rgba(0, 0, 0, 0.15) 92%, rgba(0, 0, 0, 0) 100%)',
                }}
              >
                <div
                  className="flex flex-nowrap transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${currentIndex * ITEM_SIZE}px)`,
                    gap: `${CARD_GAP}px`,
                  }}
                >
                  {duplicatedTestimonials.map((testimonial, index) => (
                    <div
                      key={`${testimonial.author}-${index}`}
                      className="shrink-0"
                      style={{
                        minWidth: `${CARD_WIDTH}px`,
                        maxWidth: `${CARD_WIDTH}px`,
                      }}
                      aria-hidden={
                        index < originalLength || index >= originalLength * 2
                      }
                    >
                      <div className="w-full bg-white rounded-2xl p-4 md:p-6 h-full flex flex-col justify-between">
                        <div className="mb-4 md:mb-6">
                          <div className="flex items-center justify-between">
                            {/* Stars */}
                            <div className="flex gap-1 mb-3 md:mb-4">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className="w-4 h-4 md:w-5 md:h-5 text-[#fbbf24]"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>

                            {/* Quote icon */}
                            <div className="mb-3 md:mb-4">
                              <Image
                                src="/aspas.svg"
                                alt="Ícone de aspas"
                                width={44}
                                height={38}
                                className="w-8 md:w-11 h-auto"
                              />
                            </div>
                          </div>

                          {/* Testimonial text */}
                          <p className="text-gray-700 mb-4 md:mb-6 italic text-sm md:text-base">
                            {testimonial.text}
                          </p>
                        </div>
                        {/* Author */}
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold text-sm md:text-base">
                            {testimonial.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1e3a5f] text-sm md:text-base">
                              {testimonial.author}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation arrows - Mobile */}
              <div className="flex justify-center gap-4 mt-6 md:hidden">
                <button
                  onClick={() => handleNavigation("prev")}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
                  aria-label="Depoimento anterior"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="#001F63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleNavigation("next")}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-md"
                  aria-label="Próximo depoimento"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="#001F63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation arrows - Desktop */}
              <button
                onClick={() => handleNavigation("prev")}
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden md:block"
                aria-label="Depoimento anterior"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg
                    width="75"
                    height="75"
                    viewBox="0 0 75 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <circle
                      cx="37.381"
                      cy="37.381"
                      r="35.381"
                      stroke="#001F63"
                      strokeWidth="4"
                    />
                    <path
                      d="M42.6875 26.7666L32.3285 37.6463C32.2479 37.7257 32.1837 37.8216 32.1398 37.9281C32.0959 38.0346 32.0732 38.1494 32.0732 38.2655C32.0732 38.3815 32.0959 38.4963 32.1398 38.6028C32.1837 38.7093 32.2479 38.8052 32.3285 38.8846L42.6875 49.7643"
                      stroke="#001F63"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
              <button
                onClick={() => handleNavigation("next")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:block z-20"
                aria-label="Próximo depoimento"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg
                    width="75"
                    height="75"
                    viewBox="0 0 75 75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <circle
                      cx="35.381"
                      cy="35.381"
                      r="35.381"
                      transform="matrix(-1 0 0 1 72.762 2)"
                      stroke="#001F63"
                      strokeWidth="4"
                    />
                    <path
                      d="M32.0744 26.7666L42.4335 37.6463C42.5141 37.7257 42.5783 37.8216 42.6222 37.9281C42.6661 38.0346 42.6887 38.1494 42.6887 38.2655C42.6887 38.3815 42.6661 38.4963 42.6222 38.6028C42.5783 38.7093 42.5141 38.8052 42.4335 38.8846L32.0744 49.7643"
                      stroke="#001F63"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Collaborator image */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none hidden md:block lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <Image
              src="/colaboradora.png"
              alt="Equipe Futuro Educacional"
              width={420}
              height={520}
              className="object-contain max-w-[360px] lg:max-w-[548px] w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
