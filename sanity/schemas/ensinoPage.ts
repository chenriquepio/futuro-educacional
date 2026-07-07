import { defineField, defineType } from "sanity";

const stageContentFields = [
  defineField({
    name: "title",
    type: "string",
    title: "Título",
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: "description",
    type: "text",
    title: "Descrição",
    rows: 4,
  }),
  defineField({
    name: "image",
    type: "image",
    title: "Imagem principal",
    options: { hotspot: true },
  }),
  defineField({
    name: "background",
    type: "image",
    title: "Background da seção",
    options: { hotspot: true },
  }),

  defineField({
    name: "highlights",
    type: "array",
    title: "Destaques (lista com marcadores)",
    of: [{ type: "string" }],
    options: { layout: "tags" },
  }),
  defineField({
    name: "section1",
    type: "object",
    title: "Bloco 1 (título + texto + imagem)",
    fields: [
      defineField({
        name: "title",
        type: "string",
        title: "Título",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        type: "text",
        title: "Descrição",
        rows: 4,
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "image",
        type: "image",
        title: "Imagem",
        options: { hotspot: true },
        validation: (Rule) => Rule.required(),
      }),
    ],
  }),
  defineField({
    name: "section2",
    type: "object",
    title: "Bloco 2 (título + texto + imagem)",
    fields: [
      defineField({
        name: "title",
        type: "string",
        title: "Título",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        type: "text",
        title: "Descrição",
        rows: 4,
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "image",
        type: "image",
        title: "Imagem",
        options: { hotspot: true },
        validation: (Rule) => Rule.required(),
      }),
    ],
  }),
];

export const ensinoPage = defineType({
  name: "ensinoPage",
  title: "Página Ensino",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero (topo da página)",
      type: "object",
      fields: [
        {
          name: "backgroundImage",
          type: "image",
          title: "Imagem de fundo",
          options: { hotspot: true },
        },
        {
          name: "eyebrow",
          type: "string",
          title: "Label",
          initialValue: "Nosso Ensino",
        },
        {
          name: "title",
          type: "string",
          title: "Título",
          initialValue: "Do infantil até a fase adulta",
        },
      ],
    }),
    defineField({
      name: "stages",
      title: "Etapas de ensino",
      type: "array",
      description:
        "Fonte única dos segmentos (aparecem na Home, no índice /ensino e cada um vira uma página própria /ensino/<slug>). Ordem sugerida: Educação Infantil, Ensino Fundamental I, Ensino Fundamental II, Ensino Médio, Contraturno Integral, Cursinho PV. Cada item: nome + slug + imagem do círculo + todo o conteúdo da página.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              title: "Nome (seletor)",
              description: "Ex: Educação Infantil, Ensino Fundamental I",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "slug",
              type: "slug",
              title: "Slug (endereço da página)",
              description:
                "Identificador usado na URL, ex: /ensino/educacao-infantil. Clique em 'Gerar' para criar a partir do nome.",
              options: { source: "name", maxLength: 96 },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "selectorImage",
              type: "image",
              title: "Imagem do círculo (seletor)",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            ...stageContentFields,
          ],
          preview: {
            select: { name: "name", title: "title" },
            prepare({ name, title }: { name?: string; title?: string }) {
              return { title: name || title || "Etapa" };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Página Ensino",
        subtitle: "Hero e segmentos (fonte única: Home + páginas de cada segmento)",
      };
    },
  },
});
