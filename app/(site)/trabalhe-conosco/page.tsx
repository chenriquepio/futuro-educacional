import type { Metadata } from "next";
import HeroShowcase from "../components/HeroShowcase";
import { getJobVacancies, type JobVacancy } from "../../../sanity/lib/fetch";
import JobVacanciesClient from "./JobVacanciesClient";

export const metadata: Metadata = {
  title: "Trabalhe Conosco",
  description:
    "Vagas de emprego no Futuro Educacional. Venha fazer parte do nosso time em Marabá. Confira as oportunidades e candidate-se.",
};

// Dados estáticos de fallback
const fallbackVacancies = [
  {
    _id: "1",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [],
    publishedAt: "",
  },
  {
    _id: "2",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [],
    publishedAt: "",
  },
  {
    _id: "3",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [],
    publishedAt: "",
  },
  {
    _id: "4",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [],
    publishedAt: "",
  },
  {
    _id: "5",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [],
    publishedAt: "",
  },
  {
    _id: "6",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [],
    publishedAt: "",
  },
];

export default async function TrabalheConoscoPage() {
  let vacancies: JobVacancy[] = fallbackVacancies;

  // Tenta buscar do CMS se configurado
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const cmsVacancies = await getJobVacancies();
      if (cmsVacancies && cmsVacancies.length > 0) {
        vacancies = cmsVacancies;
      }
    } catch (error) {
      console.error("Erro ao buscar vagas do CMS:", error);
    }
  }

  return (
    <main className="bg-[#F5F7FF] min-h-screen">
      <HeroShowcase
        backgroundImage="/escola.jpg"
        eyebrow=""
        title="Trabalhe conosco"
      />

      <JobVacanciesClient vacancies={vacancies} />
    </main>
  );
}
