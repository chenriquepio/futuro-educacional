import React from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type { EducationalStagesSection } from "@/sanity/lib/fetch";

const defaultStages = [
  { name: "Infantil", imageUrl: "/ENSINO INFANTIL.svg" },
  { name: "Fundamental I", imageUrl: "/ENSINO FUNDAMENTAL I.svg" },
  { name: "Fundamental II", imageUrl: "/ENSINO FUNDAMENTAL II.svg" },
  { name: "Ensino Médio", imageUrl: "/ENSINO MÉDIO.svg" },
  { name: "Cursinho", imageUrl: "/CURSINHO.svg" },
];

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
};

export default function EducationalStages({ section }: Props) {
  const eyebrow = section?.eyebrow ?? "Matrículas 2026";
  const title = section?.title;
  const backgroundUrl = section?.backgroundUrl;
  const stages = section?.stages?.length ? section.stages : defaultStages;

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

        <div className="flex flex-nowrap justify-center gap-4 md:gap-6">
          {stages.map((stage, index) => (
            <div key={index} className="relative">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <Image
                  src={stage.imageUrl ?? "/ENSINO INFANTIL.svg"}
                  alt={stage.name}
                  width={180}
                  height={60}
                  className="object-contain w-[120px] md:w-[150px] lg:w-[180px] h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
