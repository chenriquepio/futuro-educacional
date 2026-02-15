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
          {
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
          },
        ],
      },
    ],
  },
};

export const sportsSection = defineType({
  name: "sportsSection",
  title: "Seção Esportes (Home)",
  type: "document",
  fields: [
    defineField({
      name: "background",
      title: "Imagem de fundo",
      type: "image",
      options: { hotspot: true },
      description: "Background da seção de esportes na home.",
    }),
    defineField({
      name: "athletesImage",
      title: "Imagem dos atletas",
      type: "image",
      options: { hotspot: true },
      description: "Imagem dos atletas com troféu (exibida na parte inferior da seção).",
    }),
    defineField({
      name: "eyebrow",
      title: "Label / Badge",
      type: "string",
      description: "Texto pequeno acima do título. Ex: ESPORTES",
      initialValue: "ESPORTES",
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "array",
      of: [richTextWithColor],
      description: "Título da seção. Use a cor do texto para destacar trechos.",
    }),
    defineField({
      name: "description",
      title: "Descrição / Parágrafo",
      type: "array",
      of: [richTextWithColor],
      description: "Texto abaixo do título.",
    }),
    defineField({
      name: "buttonText",
      title: "Texto do botão",
      type: "string",
      description: "Ex: Conheça todas modalidades",
      initialValue: "Conheça todas modalidades",
    }),
    defineField({
      name: "buttonLink",
      title: "Link do botão",
      type: "string",
      description: "URL de destino. Ex: /esportes",
      initialValue: "/esportes",
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow" },
    prepare({ eyebrow }: { eyebrow?: string }) {
      return {
        title: "Seção Esportes (Home)",
        subtitle: eyebrow ? `Badge: ${eyebrow}` : undefined,
      };
    },
  },
});
