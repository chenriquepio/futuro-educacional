import Image from "next/image";
import Link from "next/link";
import { getEnsinoPage, getContactSection } from "@/sanity/lib/fetch";
import HeroShowcase from "../components/HeroShowcase";
import ContactForm from "../components/ContactForm";
import { stageSlug } from "./stageSlug";

export default async function EnsinoPage() {
  const [cms, contactSection] = await Promise.all([
    getEnsinoPage(),
    getContactSection(),
  ]);

  const stages = cms?.stages ?? [];

  return (
    <main className="bg-white">
      {cms?.hero?.backgroundImageUrl && (
        <HeroShowcase
          backgroundImage={cms.hero.backgroundImageUrl}
          eyebrow={cms.hero.eyebrow ?? ""}
          title={cms.hero.title ?? ""}
        />
      )}

      {stages.length > 0 && (
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {stages.map((stage, index) => {
                const slug = stageSlug(stage);
                return (
                  <Link
                    key={index}
                    href={`/ensino/${slug}`}
                    className="group flex flex-col items-center text-center rounded-3xl border border-[#E4EAF3] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#1C437F]"
                  >
                    <div className="relative w-32 h-44 rounded-full overflow-hidden border-2 border-[#1C437F] bg-[#1C437F] mb-4">
                      {stage.selectorImageUrl && (
                        <Image
                          src={stage.selectorImageUrl}
                          alt={stage.name}
                          fill
                          className="object-cover object-top scale-[0.85]"
                        />
                      )}
                    </div>
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#1C437F] text-white font-semibold text-sm mb-3 transition-colors duration-300 group-hover:bg-[#FDC938] group-hover:text-[#1C437F]">
                      {stage.name}
                    </span>
                    {stage.description && (
                      <p className="text-sm md:text-base text-[#504E4E] leading-relaxed line-clamp-4">
                        {stage.description}
                      </p>
                    )}
                    <span className="mt-4 text-sm font-semibold text-[#1C437F] group-hover:underline">
                      Saiba mais →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <ContactForm
        backgroundUrl={contactSection?.backgroundUrl}
        manImageUrl={contactSection?.manImageUrl}
      />
    </main>
  );
}
