import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "900", "700", "500", "800"],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Futuro Educacional - O futuro dos seus sonhos é agora!",
    template: "%s | Futuro Educacional",
  },
  description:
    "Matrículas 2026 abertas: do Infantil ao Ensino Médio, prepare seu filho para um futuro de conquistas.",
  keywords: [
    "educação",
    "colégio",
    "ensino infantil",
    "ensino fundamental",
    "ensino médio",
    "Marabá",
    "Futuro Educacional",
    "escola",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Futuro Educacional",
    title: "Futuro Educacional - O futuro dos seus sonhos é agora!",
    description:
      "Matrículas 2026 abertas: do Infantil ao Ensino Médio, prepare seu filho para um futuro de conquistas.",
    url: siteUrl,
    images: [{ url: "/logo-futuro.png", width: 186, height: 80, alt: "Futuro Educacional" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Futuro Educacional - O futuro dos seus sonhos é agora!",
    description:
      "Matrículas 2026 abertas: do Infantil ao Ensino Médio, prepare seu filho para um futuro de conquistas.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
