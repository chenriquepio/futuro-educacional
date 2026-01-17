import React from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonWithIcon from "./ButtonWithIcon";

export default function Sports() {
  return (
    <section
      className="py-12 md:py-16 relative overflow-hidden"
      style={{
        backgroundImage: "url('/BACKGROUND-sport.png')",
        backgroundSize: "100% 200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Athletes image - absolutely positioned on all screen sizes */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex-1 max-w-md mx-auto md:mx-0">
            <div className="relative w-full h-56 md:h-96">
              <Image
                src="/freepik__background__78261 1.png"
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
          {/* Left side - Spacer for image on desktop */}
          <div className="flex-1 hidden md:block"></div>

          {/* Right side - Content */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-sm font-bold text-[#1C437F] uppercase">
              ESPORTES
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
              Conheça os destaques esportivos dos nossos estudantes
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              O esporte formando campeões e cidadãos.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link href="/esportes" className="inline-block">
                <ButtonWithIcon>Conheça todas modalidades</ButtonWithIcon>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
