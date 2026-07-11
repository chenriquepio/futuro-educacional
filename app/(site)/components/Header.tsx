"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const meuFuturoUrl = "https://meu-futuro-homolog.web.app/";

  const mobileNavItems = [
    { label: "Nosso Grupo", href: "/nosso-grupo" },
    { label: "Ensino", href: "/ensino" },
    { label: "Documentos", href: "/documentos" },
    { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "#contato" },
    {
      label: "Acessar Meu Futuro",
      href: meuFuturoUrl,
      external: true,
    },
  ];

  return (
    <>
      {/* Top Contact Bar - Hidden on mobile */}
      <div className="relative z-30 hidden md:block">
        <div className="container mx-auto fixed top-0 left-0 right-0">
          <div className="bg-[#001545] text-white text-sm py-2">
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center gap-6">
              <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Image
                    src="/phone.png"
                    alt="Telefone"
                    width={16}
                    height={16}
                    className="object-scale-down"
                  />
                  <span className="text-xs md:text-sm">(94) 99250-0729</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/mail.png"
                    alt="Email"
                    width={16}
                    height={16}
                    className="object-scale-down"
                  />
                  <span className="text-xs md:text-sm hidden sm:inline">
                    contato@futuroeducacional.com
                  </span>
                </div>
              </div>
              {/* Social Media Icons */}
              <div className="hidden lg:flex items-center gap-5">
                <a
                  href="#"
                  className="w-4 h-4 flex items-center justify-center hover:opacity-80"
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
                  className="w-4 h-4 flex items-center justify-center hover:opacity-80"
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
                  className="w-4 h-4 flex items-center justify-center hover:opacity-80"
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
                  className="w-4 h-4 flex items-center justify-center hover:opacity-80"
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
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="relative z-20 text-white">
        <div className="container fixed top-0 md:top-[35px] left-0 right-0 md:rounded-b-[30px] mx-auto px-4 md:px-8 flex items-center justify-between bg-linear-to-r from-[#001F63] to-[#002576]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-futuro.png"
              alt="Grupo Futuro Educacional"
              width={230}
              height={60}
              className="h-[70px] md:h-[100px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <Navigation />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-white"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 xl:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-[70px] md:top-[135px] left-0 right-0 max-h-[calc(100vh-70px)] overflow-y-auto bg-gradient-to-b from-[#001F63] to-[#002576] z-50 xl:hidden transition-all duration-300 md:max-h-[calc(100vh-135px)] ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
              {mobileNavItems.map((item) => {
                const className = item.external
                  ? "mt-2 rounded-full bg-[#FDC938] px-4 py-3 text-center text-lg font-semibold text-[#001F63] transition-colors hover:bg-[#ffd85f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  : "rounded-lg border-b border-white/10 px-4 py-3 text-lg font-medium text-white transition-colors hover:bg-white/10";

                if (item.external) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={className}
                      aria-label="Acessar aplicativo Meu Futuro (abre em nova aba)"
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={className}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            {/* Mobile Social Icons */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/20">
              <a href="#" className="w-8 h-8 flex items-center justify-center">
                <Image src="/fb.svg" alt="Facebook" width={20} height={20} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center">
                <Image src="/in.svg" alt="LinkedIn" width={20} height={20} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center">
                <Image src="/x.svg" alt="Twitter/X" width={20} height={20} />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center">
                <Image src="/yt.svg" alt="YouTube" width={20} height={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
