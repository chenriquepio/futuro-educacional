import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ensino",
  description:
    "Do Infantil ao Cursinho: conheça as etapas de ensino do Futuro Educacional. Ensino Infantil, Fundamental I e II, Ensino Médio e Cursinho Preparatório em Marabá.",
};

export default function EnsinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
