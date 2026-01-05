"use client";

import React, { useState, FormEvent } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "blog",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao inscrever-se");
      }

      setSubmitStatus("success");
      setEmail("");
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erro ao inscrever-se. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1C437F] to-[#2A5A9E] rounded-lg p-6 text-white">
      <h3 className="text-xl font-bold mb-2">Receba nossas novidades</h3>
      <p className="text-white/80 text-sm mb-4">
        Cadastre-se e receba dicas de estudo diretamente no seu e-mail.
      </p>

      {submitStatus === "success" && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-white text-sm">
          Inscrição realizada com sucesso! Verifique seu e-mail.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-sm">
          {errorMessage || "Erro ao inscrever-se. Tente novamente."}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FDC938] disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FDC938] text-[#17012C] font-bold py-3 rounded-lg hover:bg-[#FDC938]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Inscrever-se"}
        </button>
      </form>
    </div>
  );
}


