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

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Seção Testemunhos",
  type: "document",
  fields: [
    defineField({
      name: "background",
      title: "Imagem de fundo",
      type: "image",
      options: { hotspot: true },
      description: "Background da seção de testemunhos.",
    }),
    defineField({
      name: "womanImage",
      title: "Imagem da colaboradora",
      type: "image",
      options: { hotspot: true },
      description: "Imagem da mulher/colaboradora exibida no canto inferior direito.",
    }),
    defineField({
      name: "eyebrow",
      title: "Label / Badge",
      type: "string",
      description: "Texto pequeno acima do título. Ex: TESTEMUNHOS",
      initialValue: "TESTEMUNHOS",
    }),
    defineField({
      name: "title",
      title: "Título da seção",
      type: "array",
      of: [richTextWithColor],
      description: "Título principal. Ex: O que estão falando sobre nós",
    }),
    defineField({
      name: "testimonials",
      title: "Depoimentos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "text",
              type: "text",
              title: "Texto do depoimento",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "author",
              type: "string",
              title: "Nome do autor",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "role",
              type: "string",
              title: "Função / Parentesco",
              description: "Ex: Mãe de aluno, Pai de aluna",
            },
            {
              name: "avatar",
              type: "string",
              title: "Iniciais (avatar)",
              description: "Ex: DF para Delzyane Ferreira. Usado no círculo ao lado do nome.",
              validation: (Rule) => Rule.required().max(4),
            },
          ],
          preview: {
            select: { author: "author", text: "text" },
            prepare({ author, text }: { author?: string; text?: string }) {
              return {
                title: author || "Depoimento",
                subtitle: text ? (text.length > 40 ? `${text.slice(0, 40)}...` : text) : undefined,
              };
            },
          },
        },
      ],
      description: "Lista de depoimentos. Adicione quantos precisar.",
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: { eyebrow: "eyebrow" },
    prepare({ eyebrow }: { eyebrow?: string }) {
      return {
        title: "Seção Testemunhos",
        subtitle: eyebrow ? `Badge: ${eyebrow}` : undefined,
      };
    },
  },
});
