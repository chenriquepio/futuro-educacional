"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import ButtonWithIcon from "./ButtonWithIcon";
import { useRouter } from "next/navigation";
import { client, urlFor } from "@/sanity/lib/client";
import { heroSlidesQuery } from "@/sanity/lib/queries";
import type { HeroSlide } from "@/sanity/lib/fetch";

const heroSubtitleComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <span className="inline">{children}</span>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <span className="font-black">{children}</span>
    ),
    underline: ({ children }: { children?: React.ReactNode }) => (
      <span className="underline">{children}</span>
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

const dropShadowStyle = {
  filter: ``,
};

/** Retorna URL do background sem transparência (format jpg) quando vem do Sanity. */
function getBackgroundUrl(slide: HeroSlide | null): string {
  if (!slide) return "/BACKGROUND.png";
  if (slide.background?.asset?._ref) {
    return urlFor(slide.background).format("jpg").url();
  }
  return slide.backgroundUrl ?? "";
}

interface HeroProps {
  initialSlides?: HeroSlide[];
}

export default function Hero({ initialSlides = [] }: HeroProps) {
  const router = useRouter();
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (initialSlides.length > 0) return;
    client.fetch<HeroSlide[]>(heroSlidesQuery).then(setSlides);
  }, [initialSlides.length]);

  const hasSlides = slides.length > 0;
  const currentSlide = hasSlides ? slides[currentIndex] : null;
  const canNavigate = hasSlides && slides.length > 1;

  const goPrev = () => {
    if (!canNavigate) return;
    setCurrentIndex((i) => (i <= 0 ? slides.length - 1 : i - 1));
  };
  const goNext = () => {
    if (!canNavigate) return;
    setCurrentIndex((i) => (i >= slides.length - 1 ? 0 : i + 1));
  };

  return (
    <section className="relative text-white overflow-hidden min-h-[600px] lg:h-screen lg:max-h-[786px]">
      {/* Background image - do Sanity (por slide) ou fallback. Format jpg remove transparência do PNG. */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getBackgroundUrl(currentSlide)})`,
        }}
      />

      <div className="container mx-auto px-4 pt-24 md:pt-16 relative z-10 h-full flex items-center">
        <div className="flex flex-col lg:flex-row items-center w-full px-4 md:pl-24 md:pr-16 gap-8 lg:gap-0">
          {/* Left side - Carrossel de imagens */}
          <div className="flex-1 w-full lg:w-auto order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-lg w-full h-[300px] md:h-[400px] lg:h-[500px] relative overflow-visible">
                <Image
                  src={currentSlide?.imageUrl ?? ""}
                  alt={currentSlide?.alt ?? "Estudante"}
                  fill
                  className="object-contain"
                  priority={currentIndex === 0}
                  style={dropShadowStyle}
                />
              </div>
            </div>
          </div>

          {/* Right side - Content (tudo do CMS por slide) */}
          <div className="flex-1 w-full lg:w-auto lg:ml-[-40px] order-1 lg:order-2 text-center lg:text-left">
            <h1
              className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-[74px] uppercase mb-4 tracking-normal leading-[120%] text-white"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {Array.isArray(currentSlide?.title) &&
              currentSlide.title.length > 0 ? (
                <PortableText
                  value={currentSlide.title}
                  components={heroSubtitleComponents}
                />
              ) : (
                <>
                  O FUTURO DOS SEUS SONHOS{" "}
                  <span className="text-[#FDC938]">É AGORA</span>!
                </>
              )}
            </h1>
            <p
              style={{ fontFamily: "var(--font-poppins)" }}
              className="mb-8 text-gray-200 text-sm md:text-base"
            >
              {Array.isArray(currentSlide?.subtitle) &&
              currentSlide.subtitle.length > 0 ? (
                <PortableText
                  value={currentSlide.subtitle}
                  components={heroSubtitleComponents}
                />
              ) : (
                <>
                  <span className="font-black underline">
                    Matrículas 2026 abertas
                  </span>
                  : do Infantil ao Ensino Médio,{" "}
                  <br className="hidden md:block" /> prepare seu filho para um
                  futuro de conquistas.
                </>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center  lg:justify-start">
              <ButtonWithIcon
                className="w-fit"
                onClick={() =>
                  router.push(
                    currentSlide?.primaryButtonLink?.trim() || "/contato",
                  )
                }
              >
                {currentSlide?.primaryButtonText?.trim() ||
                  "Conheça o seu futuro"}
              </ButtonWithIcon>
              <button
                type="button"
                onClick={() =>
                  router.push(
                    currentSlide?.secondaryButtonLink?.trim() || "/ensino",
                  )
                }
                className="px-4 md:px-6 py-3 cursor-pointer bg-[#89b0c882] text-[#000000] rounded-full border-[3px] border-white font-medium hover:opacity-90 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                {currentSlide?.secondaryButtonText?.trim() ||
                  "Veja nosso ensino"}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation arrows - Hidden on mobile */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Slide anterior"
            className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center hover:opacity-80"
          >
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
                stroke="#FDC938"
                strokeWidth="4"
              />
              <path
                d="M42.6875 26.7666L32.3285 37.6463C32.2479 37.7257 32.1837 37.8216 32.1398 37.9281C32.0959 38.0346 32.0732 38.1494 32.0732 38.2655C32.0732 38.3815 32.0959 38.4963 32.1398 38.6028C32.1837 38.7093 32.2479 38.8052 32.3285 38.8846L42.6875 49.7643"
                stroke="#FDC938"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <button
            type="button"
            onClick={goNext}
            aria-label="Próximo slide"
            className="w-12 h-12 rounded-full bg-transparent flex items-center justify-center hover:opacity-80"
          >
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
                stroke="#FDC938"
                strokeWidth="4"
              />
              <path
                d="M32.0744 26.7666L42.4335 37.6463C42.5141 37.7257 42.5783 37.8216 42.6222 37.9281C42.6661 38.0346 42.6887 38.1494 42.6887 38.2655C42.6887 38.3815 42.6661 38.4963 42.6222 38.6028C42.5783 38.7093 42.5141 38.8052 42.4335 38.8846L32.0744 49.7643"
                stroke="#FDC938"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
