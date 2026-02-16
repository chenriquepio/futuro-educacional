import { getEnsinoPage, getContactSection } from "@/sanity/lib/fetch";
import EnsinoPageClient from "./EnsinoPageClient";
import type {
  EnsinoHeroProps,
  EnsinoStageSelectorItem,
  EnsinoStageContentItem,
} from "./EnsinoPageClient";

function mapCmsToClient(
  cms: NonNullable<Awaited<ReturnType<typeof getEnsinoPage>>>,
): {
  hero: EnsinoHeroProps | null;
  educationalStages: EnsinoStageSelectorItem[];
  stageContent: EnsinoStageContentItem[];
} {
  const stages = cms.stages ?? [];
  const hasStages = stages.length > 0;

  const hero: EnsinoHeroProps | null = cms.hero?.backgroundImageUrl
    ? {
        backgroundImage: cms.hero.backgroundImageUrl,
        eyebrow: cms.hero.eyebrow ?? "",
        title: cms.hero.title ?? "",
      }
    : null;

  const educationalStages: EnsinoStageSelectorItem[] = hasStages
    ? stages.map((s) => ({
        name: s.name,
        image: s.selectorImageUrl ?? "",
      }))
    : [];

  const stageContent: EnsinoStageContentItem[] = hasStages
    ? stages.map((s) => ({
        title: s.title ?? "",
        subtitle: s.subtitle,
        image: s.imageUrl ?? "",
        background: s.backgroundUrl ?? "",
        description: s.description ?? "",
        highlights: s.highlights ?? [],
        section1: {
          title: s.section1?.title ?? "",
          description: s.section1?.description ?? "",
          image: s.section1?.imageUrl ?? "",
        },
        section2: {
          title: s.section2?.title ?? "",
          description: s.section2?.description ?? "",
          image: s.section2?.imageUrl ?? "",
        },
      }))
    : [];

  return { hero, educationalStages, stageContent };
}

export default async function EnsinoPage() {
  const [cms, contactSection] = await Promise.all([
    getEnsinoPage(),
    getContactSection(),
  ]);

  const { hero, educationalStages, stageContent } = cms
    ? mapCmsToClient(cms)
    : {
        hero: null,
        educationalStages: [] as EnsinoStageSelectorItem[],
        stageContent: [] as EnsinoStageContentItem[],
      };

  return (
    <EnsinoPageClient
      hero={hero}
      educationalStages={educationalStages}
      stageContent={stageContent}
      contactBackgroundUrl={contactSection?.backgroundUrl}
      contactManImageUrl={contactSection?.manImageUrl}
    />
  );
}
