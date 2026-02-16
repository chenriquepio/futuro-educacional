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

export const esportesPage = defineType({
  name: "esportesPage",
  title: "Página Esportes",
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
        { name: "eyebrow", type: "string", title: "Label" },
        { name: "title", type: "string", title: "Título", initialValue: "Esportes" },
        {
          name: "imageClassName",
          type: "string",
          title: "Classe da imagem (CSS)",
          description: "Ex: object-cover object-top",
          initialValue: "object-cover object-top",
        },
        {
          name: "bottomBlur",
          type: "boolean",
          title: "Blur no rodapé",
          initialValue: true,
        },
        {
          name: "imageMask",
          type: "boolean",
          title: "Máscara na imagem",
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: "dynamicHeroContent",
      title: "Bloco central (título + descrição + imagem)",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Título", initialValue: "Esportes no Futuro" },
        {
          name: "description",
          type: "text",
          title: "Descrição",
          rows: 4,
          initialValue:
            "No nosso colégio, o esporte vai além da competição. Trabalhamos valores como disciplina, trabalho em equipe, respeito e superação, formando cidadãos completos através da prática esportiva.",
        },
        {
          name: "image",
          type: "image",
          title: "Imagem principal",
          options: { hotspot: true },
        },
        {
          name: "background",
          type: "image",
          title: "Background da seção",
          options: { hotspot: true },
        },
        {
          name: "highlights",
          type: "array",
          title: "Destaques (lista com marcadores)",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        },
      ],
    }),
    defineField({
      name: "storiesSection",
      title: "Seção Blog (StoriesSection)",
      description: "Textos do cabeçalho. Os cards vêm do blog (categoria esportes).",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Label", initialValue: "NOSSO BLOG" },
        {
          name: "title",
          type: "string",
          title: "Título",
          initialValue: "O que acontece na Educação Física e no Esporte",
        },
        defineField({
          name: "description",
          type: "text",
          title: "Descrição",
          rows: 2,
          initialValue: "Relembre conquistas e trajetórias de quem levou nossa escola no coração",
        }),
      ],
    }),
    defineField({
      name: "contentSection",
      title: "Blocos de conteúdo (section1 e section2)",
      type: "object",
      fields: [
        defineField({
          name: "section1",
          type: "object",
          title: "Bloco 1",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Título",
              initialValue: "Formação Integral através do Esporte",
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
          title: "Bloco 2",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Título",
              initialValue: "Modalidades e Competições",
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
      ],
    }),
    defineField({
      name: "ourDifferential",
      title: "Seção Modalidades (OurDifferential)",
      description: "Textos do cabeçalho. Os cards vêm do blog (categoria modalidades).",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Label", initialValue: "Modalidades" },
        {
          name: "title",
          type: "array",
          title: "Título",
          of: [richTextWithColor],
          description:
            "Ex: Conheça as modalidades esportivas que oferecemos... Selecione um trecho e use Cor do texto para destacar em azul (#1e3a5f).",
        },
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Página Esportes",
        subtitle: "Hero, conteúdo dinâmico, blog, modalidades e contato",
      };
    },
  },
});
