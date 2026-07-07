import Image from "next/image";
import Link from "next/link";
import { stageSlug } from "./stageSlug";

export interface StageNavItem {
  name: string;
  slug?: string | null;
  selectorImageUrl?: string | null;
}

interface StageSelectorNavProps {
  stages: StageNavItem[];
  activeSlug: string;
}

// Tira de seletor de segmentos (os "ovais"). Cada item é um link para a página
// do segmento; o segmento atual fica destacado. Reaproveita o visual que já era
// usado na aba Ensino, agora como navegação entre páginas.
export default function StageSelectorNav({
  stages,
  activeSlug,
}: StageSelectorNavProps) {
  if (stages.length === 0) return null;

  return (
    <section className="pt-8 md:pt-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Mobile: scroll horizontal */}
        <div className="flex md:hidden overflow-x-auto md:pb-4 pb-0 gap-4 -mx-4 px-4 md:pt-0 pt-4">
          {stages.map((stage, index) => {
            const slug = stageSlug(stage);
            const isActive = slug === activeSlug;
            return (
              <div
                key={index}
                className="flex flex-col items-center shrink-0"
              >
                <Link
                  href={`/ensino/${slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex relative flex-col items-center cursor-pointer transition-all duration-300 ${
                    isActive ? "scale-105" : "hover:opacity-100"
                  }`}
                >
                  <div
                    className={`relative w-24 h-32 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-[#1C437F] border-[#1C437F]"
                        : "border-[#1C437F]"
                    }`}
                  >
                    {stage.selectorImageUrl && (
                      <Image
                        src={stage.selectorImageUrl}
                        alt={stage.name}
                        fill
                        className="object-scale-down scale-[0.8]"
                      />
                    )}
                  </div>
                  <span
                    className={`min-w-[100px] text-xs text-center absolute whitespace-nowrap bottom-6 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#FDC938] text-[#1C437F] font-semibold"
                        : "bg-[#1C437F] text-white font-normal"
                    }`}
                  >
                    {stage.name}
                  </span>
                </Link>
                <div
                  className={`transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    width: "5px",
                    height: "40px",
                    backgroundColor: "#1C437F",
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        {/* Desktop */}
        <div className="hidden md:flex justify-center gap-6">
          {stages.map((stage, index) => {
            const slug = stageSlug(stage);
            const isActive = slug === activeSlug;
            return (
              <div key={index} className="flex flex-col items-center">
                <Link
                  href={`/ensino/${slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex relative flex-col items-center cursor-pointer transition-all duration-300 ${
                    isActive ? "scale-105" : "hover:opacity-100"
                  }`}
                >
                  <div
                    className={`relative w-40 h-60 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                      isActive
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
                      {stage.selectorImageUrl && (
                        <Image
                          src={stage.selectorImageUrl}
                          alt={stage.name}
                          fill
                          className="object-cover object-top scale-[0.8]"
                        />
                      )}
                    </div>
                  </div>
                  <span
                    className={`min-w-[135px] text-sm text-center absolute whitespace-nowrap bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#FDC938] text-[#1C437F] font-semibold"
                        : "bg-[#1C437F] text-white font-normal"
                    }`}
                  >
                    {stage.name}
                  </span>
                </Link>
                <div
                  className={`transition-all duration-300 relative ${
                    isActive ? "opacity-100" : "opacity-0"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
