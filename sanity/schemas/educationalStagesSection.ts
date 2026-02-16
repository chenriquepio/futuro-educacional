import { defineField, defineType } from "sanity";

const richTextWithColor = {
  type: "block",
  styles: [{ title: "Parágrafo", value: "normal" }],
  marks: {
    decorators: [
      { title: "Negrito", value: "strong" },
      { title: "Sublinhado", value: "underline" },
    ],
        annotations: [
      {
        name: "textColor",
        type: "object",
        title: "Cor do texto",
        fields: [
          defineField({
            name: "color",
            type: "string",
            title: "Cor",
            options: {
              list: [
                { title: "Amarelo (destaque)", value: "#FDC938" },
                { title: "Azul", value: "#1C437F" },
                { title: "Azul escuro", value: "#1e3a5f" },
                { title: "Branco", value: "#FFFFFF" },
                { title: "Preto", value: "#000000" },
              ],
            },
            validation: (Rule) => Rule.required(),
          }),
        ],
      },
    ],
  },
};

export const educationalStagesSection = defineType({
  name: "educationalStagesSection",
  title: "Seção Etapas de Ensino",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Label / Badge",
      type: "string",
      description: "Texto do badge acima do título. Ex: Matrículas 2026",
      initialValue: "Matrículas 2026",
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "array",
      of: [richTextWithColor],
      description:
        "Título da seção. Use a cor do texto para destacar parte do título (ex.: Grupo Futuro Educacional em azul).",
    }),
    defineField({
      name: "background",
      title: "Imagem de fundo",
      type: "image",
      options: { hotspot: true },
      description: "Background da seção (opcional). Se vazio, usa fundo branco.",
    }),
    defineField({
      name: "stages",
      title: "Etapas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Nome",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              type: "image",
              title: "Imagem / Ícone",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { name: "name" },
            prepare({ name }: { name?: string }) {
              return { title: name || "Etapa" };
            },
          },
        },
      ],
      description: "Lista de etapas (Infantil, Fundamental I, etc.) com nome e imagem.",
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow" },
    prepare({ eyebrow }: { eyebrow?: string }) {
      return {
        title: "Etapas de Ensino",
        subtitle: eyebrow ? `Badge: ${eyebrow}` : undefined,
      };
    },
  },
});
