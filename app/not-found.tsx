import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1C437F] flex flex-col">
      <div className="container mx-auto px-4 pt-8 md:pt-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          aria-label="Ir para a página inicial"
        >
          <div className="relative w-[140px] md:w-[186px] h-12 md:h-16">
            <Image
              src="/logo-futuro.png"
              alt="Futuro Educacional"
              fill
              sizes="(max-width: 768px) 140px, 186px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <p
          className="text-[#FDC938] font-semibold uppercase tracking-[4px] text-sm md:text-base mb-2"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Página não encontrada
        </p>
        <h1 className="text-[120px] md:text-[180px] font-extrabold text-white leading-none tracking-tighter">
          404
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-md mt-4 mb-10">
          O endereço que você acessou não existe ou foi movido. Volte ao início
          e continue navegando.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-transparent text-[#001F63] border border-[#FDC938] rounded-full font-semibold transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FDC938] focus:ring-offset-2 focus:ring-offset-[#1C437F]"
          style={{ padding: "3px" }}
        >
          <span className="bg-[#FDC938] rounded-full px-6 py-3 flex items-center gap-2">
            Voltar ao início
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden
            >
              <path
                d="M1 1.00002L13 1M13 1L13 13M13 1L1.00002 13"
                stroke="#001F63"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </main>

      <footer className="py-6 text-center">
        <p className="text-white/60 text-sm">
          Futuro Educacional — O futuro dos seus sonhos é agora.
        </p>
      </footer>
    </div>
  );
}
