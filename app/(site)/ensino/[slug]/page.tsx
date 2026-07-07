import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEnsinoPage, getContactSection } from "@/sanity/lib/fetch";
import HeroShowcase from "../../components/HeroShowcase";
import ContactForm from "../../components/ContactForm";
import StageSelectorNav from "../StageSelectorNav";
import StageDetail from "../StageDetail";
import { stageSlug } from "../stageSlug";

export async function generateStaticParams() {
  const cms = await getEnsinoPage();
  return (cms?.stages ?? []).map((stage) => ({ slug: stageSlug(stage) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getEnsinoPage();
  const stage = (cms?.stages ?? []).find((s) => stageSlug(s) === slug);

  if (!stage) return { title: "Ensino" };

  return {
    title: stage.name,
    description:
      stage.description ??
      `Conheça o segmento ${stage.name} do Futuro Educacional em Marabá.`,
  };
}

export default async function EnsinoStagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cms, contactSection] = await Promise.all([
    getEnsinoPage(),
    getContactSection(),
  ]);

  const stages = cms?.stages ?? [];
  const stage = stages.find((s) => stageSlug(s) === slug);

  if (!stage) notFound();

  return (
    <main className="bg-white">
      {cms?.hero?.backgroundImageUrl && (
        <HeroShowcase
          backgroundImage={cms.hero.backgroundImageUrl}
          eyebrow={cms.hero.eyebrow ?? ""}
          title={cms.hero.title ?? ""}
        />
      )}

      <StageSelectorNav stages={stages} activeSlug={slug} />

      <StageDetail stage={stage} />

      <ContactForm
        backgroundUrl={contactSection?.backgroundUrl}
        manImageUrl={contactSection?.manImageUrl}
      />
    </main>
  );
}
