import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type {
  EducationalStagesSection,
  EnsinoStageCard,
} from "@/sanity/lib/fetch";
import { stageSlug } from "../ensino/stageSlug";

const richTitleComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <span className="inline">{children}</span>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <span className="font-extrabold text-[#1e3a5f]">{children}</span>
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

type Props = {
  section?: EducationalStagesSection | null;
  stages?: EnsinoStageCard[];
};

export default function EducationalStages({ section, stages = [] }: Props) {
  const eyebrow = section?.eyebrow ?? "Matrículas 2026";
  const title = section?.title;
  const backgroundUrl = section?.backgroundUrl;

  return (
    <section
      className="py-10 md:py-16 rounded-s-full relative overflow-hidden"
      style={{
        background: backgroundUrl
          ? `url(${backgroundUrl}) center center / cover no-repeat`
          : undefined,
        backgroundColor: backgroundUrl ? undefined : "white",
      }}
    >
      {backgroundUrl && (
        <div className="absolute inset-0 bg-white/80" aria-hidden />
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <span
            className="bg-[#1C437F] mb-4 md:mb-8 text-white rounded-full px-3 md:px-4 py-2 font-semibold inline-block text-sm md:text-base"
            style={{
              fontFamily: "var(--font-poppins)",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            {eyebrow}
          </span>
          <h2
            className="text-2xl md:text-3xl lg:text-4xl mt-2 mb-4 max-w-[950px] mx-auto px-2 text-[#1e3a5f]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {Array.isArray(title) && title.length > 0 ? (
              <PortableText value={title} components={richTitleComponents} />
            ) : (
              <>
                Conheça o{" "}
                <span className="font-extrabold text-[#1e3a5f]">
                  Grupo Futuro Educacional{" "}
                </span>
                e transforme o futuro do seu filho com a gente!
              </>
            )}
          </h2>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 md:gap-6">
          {stages.map((stage, index) => (
            <Link
              key={index}
              href={`/ensino/${stageSlug(stage)}`}
              className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105"
            >
              <div className="relative w-28 h-40 md:w-36 md:h-56 rounded-full overflow-hidden border-2 border-[#1C437F] bg-[#1C437F]">
                {stage.selectorImageUrl && (
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
                      src={stage.selectorImageUrl}
                      alt={stage.name}
                      fill
                      className="object-cover object-top scale-[0.8]"
                    />
                  </div>
                )}
                <span className="absolute whitespace-nowrap bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 text-xs md:text-sm text-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#FDC938] text-[#1C437F] font-semibold transition-all duration-300">
                  {stage.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
