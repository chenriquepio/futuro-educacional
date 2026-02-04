import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import HeroShowcase from "../../components/HeroShowcase";
import ContactForm from "../../components/ContactForm";
import { getJobVacancyById, type JobVacancy } from "../../../../sanity/lib/fetch";
import { PortableText } from "@portabletext/react";
import ApplicationForm from "./ApplicationForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Dados estáticos de fallback
const fallbackVacancies: JobVacancy[] = [
  {
    _id: "1",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [
      "Graduação em Pedagogia, História, Geografia, Filosofia, Sociologia ou áreas afins",
      "Pós-graduação em Coordenação/Orientação Pedagógica ou Gestão Escolar",
      "Experiência mínima de 2 anos em orientação ou coordenação pedagógica",
      "Conhecimento em metodologias ativas de ensino",
      "Habilidade em gestão de equipes e relacionamento interpessoal",
      "Domínio de ferramentas digitais para educação",
    ],
    publishedAt: "2024-12-01",
  },
  {
    _id: "2",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [
      "Licenciatura em Pedagogia ou área de Ciências Humanas",
      "Especialização em Gestão Educacional ou Psicopedagogia",
      "Experiência comprovada no Ensino Fundamental",
      "Capacidade de elaborar projetos interdisciplinares",
      "Excelente comunicação oral e escrita",
      "Conhecimento da BNCC e suas competências",
    ],
    publishedAt: "2024-12-01",
  },
  {
    _id: "3",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [
      "Graduação em área de Ciências Humanas",
      "Pós-graduação em Coordenação Pedagógica ou área correlata",
      "Experiência mínima de 3 anos no Ensino Médio",
      "Conhecimento sobre ENEM e principais vestibulares",
      "Habilidade em análise de dados e indicadores educacionais",
      "Visão estratégica para melhoria contínua",
    ],
    publishedAt: "2024-12-01",
  },
  {
    _id: "4",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [
      "Formação superior em Ciências Humanas ou Pedagogia",
      "Especialização em Gestão Educacional (desejável)",
      "Experiência em cursinhos pré-vestibulares",
      "Domínio das matrizes de referência do ENEM",
      "Capacidade de trabalhar sob pressão",
      "Perfil analítico e orientado a resultados",
    ],
    publishedAt: "2024-12-01",
  },
  {
    _id: "5",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [
      "Graduação em área de Ciências Humanas ou Pedagogia",
      "Experiência em desenvolvimento de projetos educacionais",
      "Conhecimento em metodologias ativas e projetos interdisciplinares",
      "Criatividade e capacidade de inovação",
      "Experiência com eventos acadêmicos e culturais",
      "Habilidade em trabalho colaborativo",
    ],
    publishedAt: "2024-12-01",
  },
  {
    _id: "6",
    title: "Orientador(a) pedagógico(a) - Ciências Humanas",
    location: "Marabá - PA",
    type: "Presencial",
    description: [],
    requirements: [
      "Mestrado ou Doutorado em Educação ou área de Ciências Humanas (desejável)",
      "Experiência comprovada em formação de professores",
      "Conhecimento em metodologias de ensino contemporâneas",
      "Capacidade de elaborar materiais de formação",
      "Habilidade em feedback construtivo e mentoria",
      "Perfil agregador e inspirador",
    ],
    publishedAt: "2024-12-01",
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  let vacancy: JobVacancy | null = null;
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      vacancy = await getJobVacancyById(id);
    } catch {
      // ignore
    }
  }
  if (!vacancy) {
    vacancy = fallbackVacancies.find((v) => v._id === id) || null;
  }
  if (!vacancy) {
    return { title: "Vaga não encontrada" };
  }
  const title = `${vacancy.title} | Trabalhe Conosco`;
  const description = `Vaga ${vacancy.type} em ${vacancy.location}. ${vacancy.title} - Futuro Educacional.`;
  const canonical = `${siteUrl}/trabalhe-conosco/${vacancy._id}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function VagaDetalhePage({ params }: PageProps) {
  const { id } = await params;
  
  let vacancy: JobVacancy | null = null;

  // Tenta buscar do CMS se configurado
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      vacancy = await getJobVacancyById(id);
    } catch (error) {
      console.error("Erro ao buscar vaga do CMS:", error);
    }
  }

  // Se não encontrou no CMS, busca nos dados de fallback
  if (!vacancy) {
    vacancy = fallbackVacancies.find((v) => v._id === id) || null;
  }

  if (!vacancy) {
    notFound();
  }

  const formattedDate = vacancy.publishedAt
    ? new Date(vacancy.publishedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="bg-[#F5F7FF] min-h-screen">
      <HeroShowcase
        backgroundImage="/escola.jpg"
        eyebrow="VAGA"
        title={vacancy.title}
      />

      {/* Breadcrumb e Voltar */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <Link
            href="/trabalhe-conosco"
            className="inline-flex items-center gap-2 text-[#1C437F] hover:text-[#1C437F]/80 transition-colors font-medium"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Voltar para vagas
          </Link>
        </div>
      </section>

      {/* Detalhes da Vaga */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Card Principal */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
              {/* Header da Vaga */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 bg-[#FFF2CE] text-[#2C2C2C] border border-[#FDC938] text-sm px-4 py-2 rounded-full font-medium">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                        stroke="#2C2C2C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
                        stroke="#2C2C2C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {vacancy.type}
                  </span>
                  <span className="inline-flex items-center gap-2 bg-[#E8F4FF] text-[#1C437F] text-sm px-4 py-2 rounded-full font-medium">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 14 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.75 0C4.96052 0.00237379 3.24501 0.714295 1.97965 1.97965C0.714295 3.24501 0.00237379 4.96052 0 6.75C0 11.5959 6.28875 17.6653 6.55594 17.9212C6.60791 17.9718 6.67753 18 6.75 18C6.82247 18 6.89209 17.9718 6.94406 17.9212C7.21125 17.6653 13.5 11.5959 13.5 6.75C13.4976 4.96052 12.7857 3.24501 11.5203 1.97965C10.255 0.714295 8.53948 0.00237379 6.75 0ZM6.75 9.84375C6.13811 9.84375 5.53997 9.6623 5.0312 9.32236C4.52244 8.98241 4.12591 8.49924 3.89175 7.93393C3.65759 7.36862 3.59632 6.74657 3.7157 6.14644C3.83507 5.54631 4.12972 4.99506 4.56239 4.56239C4.99506 4.12972 5.54631 3.83507 6.14644 3.7157C6.74657 3.59632 7.36862 3.65759 7.93393 3.89175C8.49924 4.12591 8.98241 4.52244 9.32236 5.0312C9.6623 5.53997 9.84375 6.13811 9.84375 6.75C9.84326 7.57036 9.51715 8.35698 8.93707 8.93707C8.35699 9.51715 7.57036 9.84326 6.75 9.84375Z"
                        fill="#1C437F"
                      />
                    </svg>
                    {vacancy.location}
                  </span>
                </div>

                {formattedDate && (
                  <p className="text-gray-500 text-sm">
                    Publicada em {formattedDate}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 my-6"></div>

              {/* Descrição */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#17012C] mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 bg-[#FDC938] rounded-full"></span>
                  Descrição da Vaga
                </h2>
                {vacancy.description && vacancy.description.length > 0 ? (
                  <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <PortableText value={vacancy.description} />
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    Buscamos um(a) profissional apaixonado(a) por educação para integrar nossa equipe. 
                    O profissional será responsável por acompanhar e orientar o trabalho docente, 
                    garantindo a qualidade do ensino e o alinhamento com a proposta pedagógica da instituição. 
                    Atuará no planejamento, execução e avaliação das atividades pedagógicas, 
                    promovendo práticas inovadoras e o desenvolvimento integral dos estudantes.
                  </p>
                )}
              </div>

              {/* Requisitos */}
              {vacancy.requirements && vacancy.requirements.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-bold text-[#17012C] mb-4 flex items-center gap-3">
                    <span className="w-1 h-6 bg-[#FDC938] rounded-full"></span>
                    Requisitos
                  </h2>
                  <ul className="space-y-3">
                    {vacancy.requirements.map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <svg
                          className="w-5 h-5 text-[#1C437F] shrink-0 mt-0.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-gray-100 my-8"></div>

              {/* Seção de Candidatura */}
              <div id="candidatar">
                <h2 className="text-xl md:text-2xl font-bold text-[#17012C] mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 bg-[#FDC938] rounded-full"></span>
                  Candidate-se a esta vaga
                </h2>

                {/* Tabs de opção */}
                <div className="bg-gray-50 rounded-xl p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 bg-white rounded-lg p-4 border-2 border-[#1C437F]">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-[#1C437F] rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-[#17012C]">Preencher formulário</h3>
                          <p className="text-sm text-gray-500">Envie seus dados diretamente</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-gray-400 font-medium">
                      ou
                    </div>
                    <a
                      href={`mailto:rh@futuroeducacional.com.br?subject=Candidatura - ${encodeURIComponent(vacancy.title)}&body=Olá,%0A%0AGostaria de me candidatar à vaga de ${encodeURIComponent(vacancy.title)}.%0A%0ANome:%0ATelefone:%0A%0ASegue meu currículo em anexo.%0A%0AAtenciosamente.`}
                      className="flex-1 bg-white rounded-lg p-4 border-2 border-gray-200 hover:border-[#FDC938] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-[#FDC938] rounded-full flex items-center justify-center transition-colors">
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-[#17012C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-[#17012C]">Enviar por e-mail</h3>
                          <p className="text-sm text-gray-500">rh@futuroeducacional.com.br</p>
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Formulário */}
                  <ApplicationForm vacancyId={vacancy._id} vacancyTitle={vacancy.title} />
                </div>
              </div>
            </div>

            {/* Outras Vagas */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Não é o que você está procurando?
              </p>
              <Link
                href="/trabalhe-conosco"
                className="text-[#1C437F] font-semibold hover:underline"
              >
                Ver todas as vagas disponíveis →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}

