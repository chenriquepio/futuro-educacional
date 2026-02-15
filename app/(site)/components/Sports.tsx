import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import ButtonWithIcon from "./ButtonWithIcon";
import type { SportsSection } from "@/sanity/lib/fetch";

const DEFAULT_BACKGROUND = "/BACKGROUND-sport.png";
const DEFAULT_ATHLETES_IMAGE = "/freepik__background__78261 1.png";

const richTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <span className="inline">{children}</span>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-extrabold">{children}</strong>
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
  section?: SportsSection | null;
};

export default function Sports({ section }: Props) {
  const backgroundUrl = section?.backgroundUrl ?? DEFAULT_BACKGROUND;
  const athletesImageUrl = section?.athletesImageUrl ?? DEFAULT_ATHLETES_IMAGE;
  const eyebrow = section?.eyebrow ?? "ESPORTES";
  const title = section?.title;
  const description = section?.description;
  const buttonText = section?.buttonText ?? "Conheça todas modalidades";
  const buttonLink = section?.buttonLink?.trim() || "/esportes";

  return (
    <section
      className="py-12 md:py-16 relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "100% 200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Athletes image */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex-1 max-w-md mx-auto md:mx-0">
            <div className="relative w-full h-56 md:h-96">
              <Image
                src={athletesImageUrl}
                alt="Atletas com Troféu"
                fill
                className="object-contain"
                style={{ objectPosition: "bottom" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pb-64 md:pb-0">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          <div className="flex-1 hidden md:block" />

          <div className="flex-1 text-center md:text-left">
            <span className="text-sm font-bold text-[#1C437F] uppercase">
              {eyebrow}
            </span>
            <h2
              className="text-2xl md:text-[40px] md:text-4xl mt-2 mb-4 text-[#17012C]"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 800,
                lineHeight: "130%",
                letterSpacing: "1.5px",
              }}
            >
              {Array.isArray(title) && title.length > 0 ? (
                <PortableText value={title} components={richTextComponents} />
              ) : (
                "Conheça os destaques esportivos dos nossos estudantes"
              )}
            </h2>
            <div className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              {Array.isArray(description) && description.length > 0 ? (
                <PortableText
                  value={description}
                  components={richTextComponents}
                />
              ) : (
                "O esporte formando campeões e cidadãos."
              )}
            </div>
            <div className="flex justify-center md:justify-start">
              <Link href={buttonLink} className="inline-block">
                <ButtonWithIcon>{buttonText}</ButtonWithIcon>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
