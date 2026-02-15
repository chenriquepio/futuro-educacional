import { defineField, defineType } from "sanity";

const stageContentFields = [
  { name: "title", type: "string", title: "Título", validation: (Rule: { required: () => unknown }) => Rule.required() },
  { name: "subtitle", type: "string", title: "Subtítulo" },
  { name: "image", type: "image", title: "Imagem principal", options: { hotspot: true } },
  { name: "background", type: "image", title: "Background da seção", options: { hotspot: true } },
  { name: "description", type: "text", title: "Descrição", rows: 4 },
  {
    name: "highlights",
    type: "array",
    title: "Destaques (lista com marcadores)",
    of: [{ type: "string" }],
    options: { layout: "tags" },
  },
  {
    name: "section1",
    type: "object",
    title: "Bloco 1 (título + texto + imagem)",
    fields: [
      { name: "title", type: "string", title: "Título", validation: (Rule: { required: () => unknown }) => Rule.required() },
      { name: "description", type: "text", title: "Descrição", rows: 4, validation: (Rule: { required: () => unknown }) => Rule.required() },
      { name: "image", type: "image", title: "Imagem", options: { hotspot: true }, validation: (Rule: { required: () => unknown }) => Rule.required() },
    ],
  },
  {
    name: "section2",
    type: "object",
    title: "Bloco 2 (título + texto + imagem)",
    fields: [
      { name: "title", type: "string", title: "Título", validation: (Rule: { required: () => unknown }) => Rule.required() },
      { name: "description", type: "text", title: "Descrição", rows: 4, validation: (Rule: { required: () => unknown }) => Rule.required() },
      { name: "image", type: "image", title: "Imagem", options: { hotspot: true }, validation: (Rule: { required: () => unknown }) => Rule.required() },
    ],
  },
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
        { name: "backgroundImage", type: "image", title: "Imagem de fundo", options: { hotspot: true } },
        { name: "eyebrow", type: "string", title: "Label", initialValue: "Nosso Ensino" },
        { name: "title", type: "string", title: "Título", initialValue: "Do infantil até a fase adulta" },
      ],
    }),
    defineField({
      name: "stages",
      title: "Etapas de ensino",
      type: "array",
      description: "Ordem: Infantil, Fundamental I, Fundamental II, Ensino Médio, Cursinho. Cada item: nome no seletor + imagem do círculo + todo o conteúdo exibido ao selecionar.",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Nome (seletor)", description: "Ex: Infantil, Fundamental I", validation: (Rule: { required: () => unknown }) => Rule.required() },
            { name: "selectorImage", type: "image", title: "Imagem do círculo (seletor)", options: { hotspot: true }, validation: (Rule: { required: () => unknown }) => Rule.required() },
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
      return { title: "Página Ensino", subtitle: "Hero e etapas (Infantil ao Cursinho)" };
    },
  },
});
