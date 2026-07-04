import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

// Cliente para leitura (usado no frontend)
// useCdn: false — as páginas são estáticas e só são regeneradas via revalidação
// (webhook do Sanity). Ler direto da API garante que a regeneração pegue o
// conteúdo mais recente na hora, sem o atraso de cache do CDN.
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Cliente para escrita (usado apenas no servidor com token)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});

export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}

