import { defineField, defineType } from "sanity";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Slide do Hero",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Texto alternativo",
      type: "string",
      description: "Descrição da imagem para acessibilidade",
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      description: "Ordem de exibição no carrossel (menor primeiro)",
      initialValue: 0,
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      description: "Ex: O FUTURO DOS SEUS SONHOS",
    }),
    defineField({
      name: "titleHighlight",
      title: "Destaque do título",
      type: "string",
      description: "Parte em amarelo. Ex: É AGORA",
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo / Parágrafo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Parágrafo", value: "normal" }],
          options: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Sublinhado", value: "underline" },
            ],
          },
        },
      ],
      description:
        "Texto abaixo do título. Use a barra de ferramentas para negrito e sublinhado.",
    }),
    defineField({
      name: "primaryButtonText",
      title: "Texto do botão principal",
      type: "string",
      description: "Ex: Conheça o seu futuro",
    }),
    defineField({
      name: "primaryButtonLink",
      title: "Link do botão principal",
      type: "string",
      description: "Ex: /contato",
    }),
    defineField({
      name: "secondaryButtonText",
      title: "Texto do botão secundário",
      type: "string",
      description: "Ex: Veja nosso ensino",
    }),
    defineField({
      name: "secondaryButtonLink",
      title: "Link do botão secundário",
      type: "string",
      description: "Ex: /ensino",
    }),
  ],
  orderings: [
    {
      title: "Ordem de exibição",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      media: "image",
      title: "title",
      alt: "alt",
    },
    prepare({ media, title, alt }) {
      return {
        title: title || alt || "Slide sem título",
        media,
      };
    },
  },
});
