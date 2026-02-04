import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import HeroShowcase from "../components/HeroShowcase";
import ButtonWithIcon from "../components/ButtonWithIcon";
import { getDocuments, type Document } from "../../../sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Documentos",
  description:
    "Documentos do Futuro Educacional: manual do estudante, proposta pedagógica, regimento interno e outros materiais para a comunidade escolar.",
};

// Dados estáticos de fallback (usados quando o CMS não está configurado)
const fallbackDocuments = [
  {
    _id: "1",
    title: "Manual do Estudante",
    description: "Guia completo com orientações sobre a vida acadêmica.",
    fileUrl: "",
  },
  {
    _id: "2",
    title: "Proposta Pedagógica",
    description: "Conheça nossa metodologia e princípios educacionais.",
    fileUrl: "",
  },
  {
    _id: "3",
    title: "Revista Futuro",
    description:
      "Conteúdos exclusivos, novidades e artigos para nossa comunidade escolar.",
    fileUrl: "",
  },
  {
    _id: "4",
    title: "Cláusulas Gerais",
    description:
      "Informações básicas que regem o funcionamento da instituição.",
    fileUrl: "",
  },
  {
    _id: "5",
    title: "Contratos",
    description: "Documentos formais de vínculo acadêmico.",
    fileUrl: "",
  },
  {
    _id: "6",
    title: "Termos e Condições",
    description: "Regras de uso e responsabilidades.",
    fileUrl: "",
  },
  {
    _id: "7",
    title: "Regimento Interno",
    description: "Normas e diretrizes que organizam o dia a dia escolar.",
    fileUrl: "",
  },
];

export default async function DocumentosPage() {
  let documents: Document[] = fallbackDocuments;

  // Tenta buscar do CMS se configurado
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const cmsDocuments = await getDocuments();
      if (cmsDocuments && cmsDocuments.length > 0) {
        documents = cmsDocuments;
      }
    } catch (error) {
      console.error("Erro ao buscar documentos do CMS:", error);
    }
  }

  return (
    <main className="bg-white">
      <HeroShowcase
        backgroundImage="/escola.jpg"
        eyebrow=""
        title="Documentos Importantes"
      />

      {/* Introductory Text Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-[850px] mx-auto text-center">
            <p className="text-base md:text-lg text-[#17012C] font-medium leading-relaxed mb-6 md:mb-8">
              Nesta área, você encontra todos os arquivos essenciais para a sua
              jornada acadêmica. Organizamos os documentos em categorias para
              facilitar o acesso e garantir que você tenha à disposição tudo o
              que precisa, de forma rápida e prática.
            </p>
            <div className="flex justify-center">
              <Image
                src="/SETA.svg"
                alt="Scroll indicator"
                width={50}
                height={50}
                className="object-contain w-10 h-10 md:w-[50px] md:h-[50px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="relative py-12 md:py-24 text-white overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url(/BACK-docs.png)",
            backgroundSize: "100% 200%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {documents.map((doc) => (
              <div
                key={doc._id}
                className="rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6"
              >
                <div className="shrink-0 flex justify-center md:justify-start">
                  <Image
                    src="/icon-pdf.svg"
                    alt="PDF icon"
                    width={84}
                    height={104}
                    className="object-contain w-16 h-20 md:w-[84px] md:h-[104px]"
                  />
                </div>
                <div className="text-center md:text-left">
                  <div className="flex items-start gap-4 mb-3 md:mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-3xl font-extrabold text-white mb-2">
                        {doc.title}
                      </h3>
                      <p className="text-base md:text-lg text-white/80 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <div className="border-t-[3px] border-[#FDC938] my-3 md:my-4"></div>
                  <div className="mt-auto flex justify-center md:justify-start">
                    {doc.fileUrl ? (
                      <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                        <ButtonWithIcon>Baixar PDF</ButtonWithIcon>
                      </a>
                    ) : (
                      <ButtonWithIcon>Baixar PDF</ButtonWithIcon>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
