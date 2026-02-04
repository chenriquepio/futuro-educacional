import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "../components/ContactForm";
import HeroShowcase from "../components/HeroShowcase";

export const metadata: Metadata = {
  title: "Nosso Grupo",
  description:
    "Conheça a história do Futuro Educacional: trajetória, conquistas e compromisso com educação de qualidade em Marabá.",
};

const historyTimeline = [
  {
    year: "2005",
    description:
      "Iniciou o Ensino Superior semipresencial em parceria com a Unopar.",
  },
  {
    year: "2009",
    description:
      "Adotou o nome atual e tornou-se parceira da Vale com a escola dos Carajás.",
  },
  {
    year: "2012",
    description:
      "Estabeleceu a meta de liderar o Enem em Marabá em até três anos.",
  },
  {
    year: "2014",
    description:
      "Passou a oferecer Ensino Técnico e conquistou o 1º lugar no Enem em Marabá, subindo no ranking estadual do 87º para o 17º lugar.",
  },
  {
    year: "2015",
    description:
      "Ficou em 6º lugar no Pará, sendo a melhor escola do interior.",
  },
  {
    year: "2017",
    description:
      "Expandiu sua estrutura para atender do Fundamental ao Ensino Médio em prédio com capacidade para mais de 500 estudantes.",
  },
];

export default function NossoGrupoPage() {
  return (
    <>
      <HeroShowcase
        backgroundImage="/escola.jpg"
        eyebrow="Nosso Grupo"
        title="Nossa História"
      />

      <section className="bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:gap-12 items-start py-12 md:py-20 ml-0 lg:ml-24 max-w-full lg:max-w-[520px]">
            <div className="text-center lg:text-left">
              <span className="text-sm font-bold text-[#1C437F] uppercase">
                Nosso grupo
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#17012C] mt-2 mb-4 md:mb-6">
                Conheça a nossa história
              </h2>
              <p className="text-base md:text-lg text-[#504E4E] font-medium mb-4">
                O Grupo Futuro Educacional, originado do antigo Centro Integrado
                de Ensino Êxito em Marabá, destaca-se pela excelência em
                aprovações universitárias e inovação na educação.
              </p>
              <div className="h-px w-full bg-[#E2E8F0] my-4" />
              <div className="space-y-6 md:space-y-8 text-left">
                {historyTimeline.map((item) => (
                  <div key={item.year} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-black mt-2 shrink-0" />
                    <div>
                      <p className="text-sm md:text-base text-gray-700 font-medium">
                        {item.year}: {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[50%] h-full pointer-events-none hidden lg:block">
          <div className="relative w-full h-full">
            <Image
              src="/imagem-logo.png"
              alt="Grupo Futuro Educacional"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundImage: "url(/BACKGROUND-nossa-historia.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative flex items-center justify-center text-white w-full overflow-hidden min-h-[300px] md:max-h-[480px]"
      >
        <div className="relative z-10 w-full max-w-5xl px-4 py-12 md:py-20">
          <Image
            src="/content-nossa historia.png"
            alt="Nossos Valores"
            width={1200}
            height={400}
            className="object-contain mx-auto w-full"
            priority
          />
        </div>
      </section>

      <ContactForm />
    </>
  );
}
