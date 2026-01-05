"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import ButtonWithIcon from "./ButtonWithIcon";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem");
      }

      setSubmitStatus("success");
      // Limpar o formulário
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao enviar mensagem. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/BACKGROUND-contato.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left side - Form */}
          <div className="flex-1 w-full py-10 md:py-16">
            <div className="mb-6 text-center md:text-left">
              <span className="text-sm font-bold text-[#1C437F] uppercase">
                ENTRE EM CONTATO
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#253858] mt-2">
                Deixe-nos uma mensagem
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-[#1C437F] rounded-[20px] md:rounded-[30px] py-6 md:py-8 px-6 md:px-12 text-white"
              style={{
                boxShadow: "10px 10px 15px 0px #00000033",
              }}
            >
              {submitStatus === "success" && (
                <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-[10px] text-white text-sm">
                  Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-[10px] text-white text-sm">
                  {errorMessage || "Erro ao enviar mensagem. Tente novamente."}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Nome <span className="text-[#FDC938]">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Nome"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-[10px] bg-white text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#fbbf24] placeholder-[#A9A9A9] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Sobrenome <span className="text-[#FDC938]">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Sobrenome"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-[10px] bg-white text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#fbbf24] placeholder-[#A9A9A9] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Telefone <span className="text-[#FDC938]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-[10px] bg-white text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#fbbf24] placeholder-[#A9A9A9] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    E-mail <span className="text-[#FDC938]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 md:px-6 py-3 md:py-4 rounded-[10px] bg-white text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#fbbf24] placeholder-[#A9A9A9] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-white">
                  Deixe-nos uma mensagem{" "}
                  <span className="text-[#FDC938]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sua mensagem aqui..."
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-[10px] bg-white text-[#1e3a5f] focus:outline-none focus:ring-2 focus:ring-[#fbbf24] placeholder-[#A9A9A9] text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                ></textarea>
              </div>
              <div className="flex justify-center">
                <ButtonWithIcon type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                </ButtonWithIcon>
              </div>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 hidden md:block relative z-20 self-end">
            <div className="relative w-full h-[500px] lg:h-[700px]">
              <Image
                src="/homem-contato.png"
                alt="Colaborador"
                fill
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
