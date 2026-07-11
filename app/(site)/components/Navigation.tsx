"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  type?: "section" | "route";
}

const navItems: NavItem[] = [
  {
    id: "nosso-grupo",
    label: "Nosso Grupo",
    href: "/nosso-grupo",
    type: "route",
  },
  { id: "ensino", label: "Ensino", href: "/ensino", type: "route" },
  { id: "documentos", label: "Documentos", href: "/documentos", type: "route" },
  {
    id: "trabalhe-conosco",
    label: "Trabalhe Conosco",
    href: "/trabalhe-conosco",
    type: "route",
  },
  { id: "blog", label: "Blog", href: "/blog", type: "route" },
  { id: "contato", label: "Contato", href: "/#contato" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [clickedSection, setClickedSection] = useState<string | null>(null);

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });

    if (sectionId !== "contato") {
      setClickedSection(sectionId);
      setTimeout(() => setClickedSection(null), 500);
    }
  };

  return (
    <div className="hidden xl:flex items-center gap-2">
      {navItems.map((item) => {
        const isClicked = clickedSection === item.id;
        const isContato = item.id === "contato";
        const isRoute = item.type === "route";
        const isActive = isRoute && pathname === item.href;

        const content = isContato ? (
          <span className="bg-[#FDC938] rounded-full px-4 py-2 flex items-center gap-2">
            {item.label}
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
          </span>
        ) : isActive || isClicked ? (
          <span className="rounded-full border-[3px] border-[#001545] flex items-center justify-center px-4 py-2 -mx-4 -my-2">
            {item.label}
          </span>
        ) : (
          item.label
        );

        const baseClasses = `
          rounded-full font-medium text-sm flex items-center gap-2 px-4 py-2
          ${
            isContato
              ? "bg-transparent text-[#001F63] border border-[#FDC938]"
              : isActive || isClicked
                ? "bg-[#FDC938] text-[#001F63] border-[3px] border-[#FDC938] shadow-[0_0_20px_rgba(253,201,56,0.6)]"
                : "bg-transparent text-white border-[3px] border-[#FDC938] hover:shadow-[0_0_15px_rgba(255,165,0,0.4)]"
          }
        `;

        if (isRoute) {
          return (
            <Link
              key={item.id}
              href={item.href}
              className={baseClasses}
              onClick={() => setClickedSection(null)}
            >
              {content}
            </Link>
          );
        }

        // Para o item "contato", sempre usar Link para navegar para home
        if (isContato) {
          const handleContatoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (pathname === "/") {
              // Se já está na home, fazer scroll smooth
              e.preventDefault();
              const section = document.getElementById("contato");
              if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }
            // Se não está na home, o Link do Next.js vai navegar para /#contato
            // O scroll será feito automaticamente quando a página carregar
          };

          return (
            <Link
              key={item.id}
              href="/#contato"
              onClick={handleContatoClick}
              scroll={pathname !== "/"}
              className={baseClasses}
              style={{ padding: "2px" }}
            >
              {content}
            </Link>
          );
        }

        const anchorContent = isClicked ? (
          <span className="rounded-full border-[3px] border-[#001545] flex items-center justify-center px-4 py-2 -mx-4 -my-2">
            {item.label}
          </span>
        ) : (
          item.label
        );

        return (
          <a
            key={item.id}
            href={item.href}
            onClick={(e) => handleSectionClick(e, item.id)}
            className={`
              rounded-full font-medium text-sm flex items-center gap-2 px-4 py-2
              ${
                isClicked
                  ? "bg-[#FDC938] text-[#001F63] border-[3px] border-[#FDC938] shadow-[0_0_20px_rgba(253,201,56,0.6)]"
                  : "bg-transparent text-white border-[3px] border-[#FDC938] hover:shadow-[0_0_15px_rgba(255,165,0,0.4)]"
              }
            `}
          >
            {anchorContent}
          </a>
        );
      })}
      <a
        href="https://meu-futuro-homolog.web.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex shrink-0 items-center rounded-full border-[3px] border-[#FDC938] bg-[#FDC938] px-4 py-2 text-sm font-semibold text-[#001F63] transition-colors hover:bg-[#ffd85f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label="Acessar aplicativo Meu Futuro (abre em nova aba)"
      >
        Acessar Meu Futuro
      </a>
    </div>
  );
}
