import { getEnsinoPage, getContactSection } from "@/sanity/lib/fetch";
import EnsinoPageClient from "./EnsinoPageClient";
import type {
  EnsinoHeroProps,
  EnsinoStageSelectorItem,
  EnsinoStageContentItem,
} from "./EnsinoPageClient";
import {
  defaultEducationalStages,
  defaultStageContent,
} from "./defaultEnsinoData";

function mapCmsToClient(cms: NonNullable<Awaited<ReturnType<typeof getEnsinoPage>>>): {
  hero: EnsinoHeroProps | null;
  educationalStages: EnsinoStageSelectorItem[];
  stageContent: EnsinoStageContentItem[];
} {
  const stages = cms.stages ?? [];
  const hasStages = stages.length > 0;

  const hero: EnsinoHeroProps | null =
    cms.hero?.backgroundImageUrl || cms.hero?.title
      ? {
          backgroundImage: cms.hero.backgroundImageUrl ?? "/escola.jpg",
          eyebrow: cms.hero.eyebrow ?? "Nosso Ensino",
          title: cms.hero.title ?? "Do infantil até a fase adulta",
        }
      : null;

  const educationalStages: EnsinoStageSelectorItem[] = hasStages
    ? stages.map((s) => ({
        name: s.name,
        image: s.selectorImageUrl ?? defaultEducationalStages[0]!.image,
      }))
    : defaultEducationalStages;

  const stageContent: EnsinoStageContentItem[] = hasStages
    ? stages.map((s, i) => ({
        title: s.title ?? defaultStageContent[i]?.title ?? "",
        subtitle: s.subtitle,
        image: s.imageUrl ?? defaultStageContent[i]?.image ?? "",
        background: s.backgroundUrl ?? defaultStageContent[i]?.background ?? "",
        description: s.description ?? defaultStageContent[i]?.description ?? "",
        highlights: s.highlights ?? defaultStageContent[i]?.highlights ?? [],
        section1: {
          title: s.section1?.title ?? defaultStageContent[i]?.section1.title ?? "",
          description: s.section1?.description ?? defaultStageContent[i]?.section1.description ?? "",
          image: s.section1?.imageUrl ?? defaultStageContent[i]?.section1.image ?? "",
        },
        section2: {
          title: s.section2?.title ?? defaultStageContent[i]?.section2.title ?? "",
          description: s.section2?.description ?? defaultStageContent[i]?.section2.description ?? "",
          image: s.section2?.imageUrl ?? defaultStageContent[i]?.section2.image ?? "",
        },
      }))
    : defaultStageContent;

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
        educationalStages: defaultEducationalStages,
        stageContent: defaultStageContent,
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
