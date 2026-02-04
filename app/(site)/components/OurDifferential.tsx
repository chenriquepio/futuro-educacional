"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import ButtonWithIcon from "./ButtonWithIcon";
import { useRouter } from "next/navigation";

type DifferentialCard = {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  imageLabel?: string;
  slug?: string;
};

type OurDifferentialProps = {
  differentials?: DifferentialCard[];
  eyebrow?: string;
  title?: string | React.ReactNode;
};

export default function OurDifferential({
  differentials: customDifferentials,
  eyebrow,
  title,
}: OurDifferentialProps = {}) {
  const defaultDifferentials: DifferentialCard[] = [
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

  const differentials = customDifferentials || defaultDifferentials;

  // Responsive card sizes
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const router = useRouter();
  const CARD_WIDTH = isMobile ? 220 : 268;
  const CARD_HEIGHT = isMobile ? 320 : 401;
  const CARD_GAP = isMobile ? 16 : 24;
  const ITEM_SIZE = CARD_WIDTH + CARD_GAP;

  const duplicatedDifferentials: DifferentialCard[] = [
    ...differentials,
    ...differentials,
    ...differentials,
  ];

  console.log(duplicatedDifferentials);
  const originalLength = differentials.length;
  const middleIndex = originalLength;

  const [currentIndex, setCurrentIndex] = useState(middleIndex);

  const handleNavigation = (direction: "next" | "prev") => {
    setCurrentIndex((prev) => {
      let next = direction === "next" ? prev + 1 : prev - 1;
      const startBoundary = originalLength;
      const endBoundary = duplicatedDifferentials.length - originalLength - 1;

      if (next > endBoundary) {
        next -= originalLength;
      } else if (next < startBoundary) {
        next += originalLength;
      }

      return next;
    });
  };

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span
            className="bg-[#1C437F] mb-6 md:mb-8 text-white rounded-full px-4 py-2 font-semibold inline-block uppercase tracking-wide text-sm"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {eyebrow || "Nosso diferencial"}
          </span>
          <h2 className="text-2xl md:text-4xl mt-2 mb-4 max-w-[1064px] mx-auto px-2">
            {title || (
              <>
                Com uma{" "}
                <span className="font-extrabold text-[#1e3a5f]">
                  educação transformadora
                </span>
                , nossos estudantes desenvolvem habilidades e valores para a
                vida.
              </>
            )}
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex flex-nowrap pb-4 transition-transform duration-500 ease-out"
            style={{
              gap: `${CARD_GAP}px`,
              transform: `translateX(calc(50% - ${CARD_WIDTH / 2}px - ${
                currentIndex * ITEM_SIZE
              }px))`,
            }}
          >
            {duplicatedDifferentials.map((item, index) => {
              const isGhost =
                index < originalLength || index >= originalLength * 2;

              return (
                <div
                  key={`${item.title}-${index}`}
                  className="shrink-0 rounded-[24px] overflow-hidden relative text-white flex-none transition-all duration-500"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                  }}
                  aria-hidden={isGhost}
                >
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes={`(max-width: 768px) ${CARD_WIDTH}px, 268px`}
                      className="object-cover"
                      priority={index === currentIndex}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#1C437F]/70 flex items-center justify-center text-center px-6 uppercase tracking-wide">
                      {item.imageLabel ?? item.title}
                    </div>
                  )}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0, 57, 199, 0) 46.63%, rgba(0, 83, 211, 0.85) 85%)",
                    }}
                  />
                  <div className="relative z-10 h-full flex flex-col justify-end text-center px-3 md:px-4 py-6 md:py-8">
                    <div>
                      <h3 className="text-[14px] md:text-[18px] font-bold leading-snug pb-2 md:pb-3">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex justify-center">
                      <ButtonWithIcon
                      className="cursor-pointer"
                        onClick={() => router.push(`/blog/${item.slug}`)}
                      >
                        Veja mais
                      </ButtonWithIcon>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side gradients - smaller on mobile */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-72"
            style={{
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-72"
            style={{
              background:
                "linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 100%)",
            }}
          />

          {/* Navigation arrows - Mobile (below carousel) */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <button
              onClick={() => handleNavigation("prev")}
              className="w-10 h-10 flex items-center justify-center bg-[#1C437F] rounded-full shadow-md"
              aria-label="Ver diferencial anterior"
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
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={() => handleNavigation("next")}
              className="w-10 h-10 flex items-center justify-center bg-[#1C437F] rounded-full shadow-md"
              aria-label="Ver próximo diferencial"
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
                  stroke="white"
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 hidden md:block"
            aria-label="Ver diferencial anterior"
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
            className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden md:block"
            aria-label="Ver próximo diferencial"
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
    </section>
  );
}
