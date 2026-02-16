import type { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import type React from "react";
import ContactForm from "../components/ContactForm";
import HeroShowcase from "../components/HeroShowcase";
import { getNossoGrupoPage, getContactSection } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Nosso Grupo",
  description:
    "Conheça a história do Futuro Educacional: trajetória, conquistas e compromisso com educação de qualidade em Marabá.",
};

const historyContentComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base md:text-lg text-[#504E4E] font-medium mb-4 last:mb-0">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

const timelineComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-sm md:text-base text-gray-700 font-medium mb-2 last:mb-0">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-none space-y-2 my-4 text-left text-sm md:text-base text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-2 my-4 text-left text-sm md:text-base text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-2">
        <span className="w-2 h-2 rounded-full bg-black mt-2 shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li>{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

export default async function NossoGrupoPage() {
  const [data, contactSection] = await Promise.all([
    getNossoGrupoPage(),
    getContactSection(),
  ]);

  const hasHero = data?.hero?.backgroundImageUrl;
  const heroEyebrow = data?.hero?.eyebrow ?? "";
  const heroTitle = data?.hero?.title ?? "";

  const historyEyebrow = data?.historySection?.eyebrow ?? "";
  const historyTitle = data?.historySection?.title ?? "";
  const historyContent = data?.historySection?.content;
  const timelineContent = data?.historySection?.timeline;
  const sideImageUrl = data?.historySection?.sideImageUrl;

  const valuesBg = data?.valuesSection?.backgroundImageUrl ?? "";
  const valuesContentUrl = data?.valuesSection?.contentImageUrl;
  const hasValuesSection = valuesBg || valuesContentUrl;

  return (
    <>
      {hasHero && (
        <HeroShowcase
          backgroundImage={data!.hero!.backgroundImageUrl!}
          eyebrow={heroEyebrow}
          title={heroTitle}
        />
      )}

      <section className="bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:gap-12 items-start py-12 md:py-20 ml-0 lg:ml-24 max-w-full lg:max-w-[520px]">
            <div className="text-center lg:text-left">
              <span className="text-sm font-bold text-[#1C437F] uppercase">
                {historyEyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#17012C] mt-2 mb-4 md:mb-6">
                {historyTitle}
              </h2>

              <div className="prose prose-lg text-left max-w-none">
                <PortableText
                  value={historyContent ?? []}
                  components={historyContentComponents}
                />
              </div>

              {timelineContent && timelineContent.length > 0 && (
                <>
                  <div className="h-px w-full bg-[#E2E8F0] my-4" />
                  <div className="text-left">
                    <PortableText
                      value={timelineContent}
                      components={timelineComponents}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {sideImageUrl && (
          <div className="absolute top-0 right-0 w-[50%] h-full pointer-events-none hidden lg:block">
            <div className="relative w-full h-full">
              <Image
                src={sideImageUrl}
                alt="Grupo Futuro Educacional"
                fill
                className="object-contain object-top"
                priority
              />
            </div>
          </div>
        )}
      </section>

      {hasValuesSection && (
        <section
          style={{
            backgroundImage: valuesBg ? `url(${valuesBg})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="relative flex items-center justify-center text-white w-full overflow-hidden min-h-[480px] h-full md:max-h-[580px]"
        >
          {valuesContentUrl && (
          <div className="relative z-10 w-full max-w-5xl px-4 py-12 md:py-20">
            <Image
              src={valuesContentUrl}
              alt="Nossos Valores"
              width={1200}
              height={400}
              className="object-contain mx-auto w-full"
              priority
            />
          </div>
          )}
        </section>
      )}

      <ContactForm
        backgroundUrl={contactSection?.backgroundUrl}
        manImageUrl={contactSection?.manImageUrl}
      />
    </>
  );
}
