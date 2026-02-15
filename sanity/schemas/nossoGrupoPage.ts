import { defineArrayMember, defineField, defineType } from "sanity";

const historyContentBlock = defineArrayMember({
  type: "block",
  styles: [{ title: "Parágrafo", value: "normal" }],
  marks: {
    decorators: [
      { title: "Negrito", value: "strong" },
      { title: "Itálico", value: "em" },
    ],
  },
});

const timelineBlock = defineArrayMember({
  type: "block",
  styles: [{ title: "Parágrafo", value: "normal" }],
  lists: [
    { title: "Lista com marcadores", value: "bullet" },
    { title: "Lista numerada", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Negrito", value: "strong" },
      { title: "Itálico", value: "em" },
    ],
  },
});

export const nossoGrupoPage = defineType({
  name: "nossoGrupoPage",
  title: "Página Nosso Grupo",
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
          description: "Ex: Nosso Grupo",
          initialValue: "Nosso Grupo",
        },
        {
          name: "title",
          type: "string",
          title: "Título",
          description: "Ex: Nossa História",
          initialValue: "Nossa História",
        },
      ],
    }),
    defineField({
      name: "historySection",
      title: "Seção Nossa História",
      type: "object",
      fields: [
        {
          name: "eyebrow",
          type: "string",
          title: "Label",
          initialValue: "Nosso grupo",
        },
        {
          name: "title",
          type: "string",
          title: "Título",
          initialValue: "Conheça a nossa história",
        },
        defineField({
          name: "content",
          type: "array",
          title: "Conteúdo",
          description: "Texto da nossa história com negrito e itálico",
          of: [historyContentBlock],
        }),
        defineField({
          name: "timeline",
          type: "array",
          title: "Linha do tempo",
          description:
            "Use listas com marcadores ou numeradas para os itens da linha do tempo. Negrito e itálico disponíveis.",
          of: [timelineBlock],
        }),
        {
          name: "sideImage",
          type: "image",
          title: "Imagem lateral (logo)",
          options: { hotspot: true },
          description: "Imagem exibida à direita no desktop.",
        },
      ],
    }),
    defineField({
      name: "valuesSection",
      title: "Seção Nossos Valores (faixa inferior)",
      type: "object",
      fields: [
        {
          name: "backgroundImage",
          type: "image",
          title: "Imagem de fundo",
          options: { hotspot: true },
        },
        {
          name: "contentImage",
          type: "image",
          title: "Imagem de conteúdo",
          options: { hotspot: true },
          description: "Imagem central da faixa (ex.: Nossos Valores).",
        },
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Página Nosso Grupo",
        subtitle: "Hero, história e valores",
      };
    },
  },
});
