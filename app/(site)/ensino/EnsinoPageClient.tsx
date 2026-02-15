"use client";

import Image from "next/image";
import ContactForm from "../components/ContactForm";
import HeroShowcase from "../components/HeroShowcase";
import DynamicHeroContent from "../components/DynamicHeroContent";
import { useState } from "react";
import {
  defaultEducationalStages,
  defaultStageContent,
} from "./defaultEnsinoData";

export interface EnsinoHeroProps {
  backgroundImage: string;
  eyebrow: string;
  title: string;
}

export interface EnsinoStageSelectorItem {
  name: string;
  image: string;
}

export interface EnsinoStageContentItem {
  title: string;
  subtitle?: string;
  image: string;
  background: string;
  description: string;
  highlights: string[];
  section1: { title: string; description: string; image: string };
  section2: { title: string; description: string; image: string };
}

interface EnsinoPageClientProps {
  hero?: EnsinoHeroProps | null;
  educationalStages?: EnsinoStageSelectorItem[];
  stageContent?: EnsinoStageContentItem[];
  contactBackgroundUrl?: string | null;
  contactManImageUrl?: string | null;
}

export default function EnsinoPageClient({
  hero,
  educationalStages = defaultEducationalStages,
  stageContent = defaultStageContent,
  contactBackgroundUrl,
  contactManImageUrl,
}: EnsinoPageClientProps) {
  const [selectedStage, setSelectedStage] = useState(0);
  const currentContent = stageContent[selectedStage];

  const heroConfig = hero ?? {
    backgroundImage: "/escola.jpg",
    eyebrow: "Nosso Ensino",
    title: "Do infantil até a fase adulta",
  };

  return (
    <main className="bg-white">
      <HeroShowcase
        backgroundImage={heroConfig.backgroundImage}
        eyebrow={heroConfig.eyebrow}
        title={heroConfig.title}
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

      <ContactForm
        backgroundUrl={contactBackgroundUrl}
        manImageUrl={contactManImageUrl}
      />
    </main>
  );
}
