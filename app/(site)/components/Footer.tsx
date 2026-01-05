"use client";
import Image from "next/image";

import ButtonWithIcon from "./ButtonWithIcon";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-[#1C437F] text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="relative w-[150px] md:w-[186px] h-16 md:h-20">
                <Image
                  src="/logo-futuro.png"
                  alt="Grupo Futuro"
                  fill
                  sizes="(max-width: 768px) 150px, 186px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-[335px] mx-auto md:mx-0 text-sm md:text-base">
              Promover educação transformadora, formando cidadãos éticos,
              conscientes e participativos.
            </p>
            <div className="flex justify-center md:justify-start">
              <ButtonWithIcon
                onClick={() => router.push("/#contato")}
                icon={
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M5.38332 10.6923C5.7868 10.6923 6.11388 10.3824 6.11388 10C6.11388 9.61765 5.7868 9.30769 5.38332 9.30769C4.97985 9.30769 4.65277 9.61765 4.65277 10C4.65277 10.3824 4.97985 10.6923 5.38332 10.6923Z"
                      stroke="#001F63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.1319 10.6923C10.5354 10.6923 10.8625 10.3824 10.8625 10C10.8625 9.61765 10.5354 9.30769 10.1319 9.30769C9.72845 9.30769 9.40137 9.61765 9.40137 10C9.40137 10.3824 9.72845 10.6923 10.1319 10.6923Z"
                      stroke="#001F63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.8805 10.6923C15.284 10.6923 15.6111 10.3824 15.6111 10C15.6111 9.61765 15.284 9.30769 14.8805 9.30769C14.477 9.30769 14.15 9.61765 14.15 10C14.15 10.3824 14.477 10.6923 14.8805 10.6923Z"
                      stroke="#001F63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.4972 1C8.77929 1.00051 7.09369 1.44258 5.61994 2.27913C4.14618 3.11568 2.93947 4.31537 2.12832 5.75044C1.31717 7.18551 0.931958 8.80221 1.01372 10.4283C1.09548 12.0545 1.64115 13.6291 2.59261 14.9846L1 19L6.33304 18.0862C7.61722 18.6808 9.02648 18.9932 10.4558 18.9999C11.8851 19.0066 13.2975 18.7075 14.5878 18.1249C15.8782 17.5423 17.0131 16.6912 17.908 15.6351C18.8029 14.579 19.4348 13.345 19.7564 12.0253C20.078 10.7056 20.0812 9.33403 19.7656 8.01298C19.4501 6.69192 18.8239 5.4554 17.9339 4.39558C17.0438 3.33577 15.9128 2.48 14.6252 1.89207C13.3376 1.30413 11.9265 0.999202 10.4972 1Z"
                      stroke="#001F63"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                Contato
              </ButtonWithIcon>
            </div>
            <div className="flex items-center justify-center md:justify-start pt-4">
              <div className="inline-block w-5 h-px bg-[#FDC938] mr-2" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Siga-nos:
              </span>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center hover:opacity-80"
              >
                <Image
                  src="/fb.svg"
                  alt="Facebook"
                  width={16}
                  height={16}
                  className="object-scale-down"
                />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center hover:opacity-80"
              >
                <Image
                  src="/in.svg"
                  alt="LinkedIn"
                  width={16}
                  height={16}
                  className="object-scale-down"
                />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center hover:opacity-80"
              >
                <Image
                  src="/x.svg"
                  alt="Twitter/X"
                  width={16}
                  height={16}
                  className="object-scale-down"
                />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center hover:opacity-80"
              >
                <Image
                  src="/yt.svg"
                  alt="YouTube"
                  width={16}
                  height={16}
                  className="object-scale-down"
                />
              </a>
            </div>
          </div>

          {/* Middle Column - Links rápidos */}
          <div className="text-center md:text-left">
            <h3 className="font-bold">Links rápidos</h3>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 mb-5">
              <div className="h-px w-5 bg-[#FDC938]" />
              <div className="h-px w-[63px] bg-white" />
            </div>
            <ul className="space-y-2">
              {[
                { name: "Início", link: "/" },
                { name: "Nosso Grupo", link: "/nosso-grupo" },
                { name: "Ensino", link: "/ensino" },
                { name: "Documentos", link: "/documentos" },
                { name: "Trabalhe conosco", link: "/trabalhe-conosco" },
                { name: "Blog", link: "/blog" },
                { name: "Contato", link: "#contato" },
              ].map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-center md:justify-start gap-4"
                >
                  <Image
                    src="/links-arrow.svg"
                    alt=""
                    width={11}
                    height={11}
                    className="shrink-0"
                  />
                  <a
                    href={item.link}
                    className="text-gray-300 hover:text-white text-sm md:text-base"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Contato */}
          <div className="text-center md:text-left">
            <h3 className="font-bold">Contato</h3>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 mb-5">
              <div className="h-px w-5 bg-[#B5FE1C]" />
              <div className="h-px w-[63px] bg-white" />
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start justify-center md:justify-start gap-2">
                <Image
                  src="/mapa.svg"
                  alt="Localização"
                  width={20}
                  height={20}
                  className="w-5 h-5 mt-1 shrink-0"
                />
                <span className="text-sm md:text-base text-left">
                  R. Dez, N° 1 - Lote A 7 - 1040, Marabá, Marabá - PA, 68501-040
                </span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Image
                  src="/phone.png"
                  alt="Telefone"
                  width={20}
                  height={20}
                  className="w-5 h-5 shrink-0 object-scale-down"
                />
                <span className="text-sm md:text-base">(94) 98100-0798</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Image
                  src="/mail.png"
                  alt="Email"
                  width={20}
                  height={20}
                  className="w-5 h-5 shrink-0 object-scale-down"
                />
                <span className="text-sm md:text-base break-all">
                  contato@grupofuturoeducacional.com.br
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-300 text-center">
            <p>
              © Todos os direitos autorais 2023 por Grupo Futuro Educacional
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                Termos e Condições
              </a>
              <a href="#" className="hover:text-white">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
