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
      name: "background",
      title: "Background",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Imagem de fundo do slide (opcional). Se não for definida, usa a imagem principal.",
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
      type: "array",
      of: [
        {
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
                        { title: "Branco", value: "#FFFFFF" },
                        { title: "Azul", value: "#1C437F" },
                        { title: "Azul escuro", value: "#1e3a5f" },
                        { title: "Preto", value: "#000000" },
                      ],
                    },
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
            ],
          },
        },
      ],
      description:
        "Título do slide. O texto fica branco por padrão. Selecione uma palavra ou trecho e aplique a cor Amarelo para destacar.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo / Parágrafo",
      type: "array",
      of: [
        {
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
                        { title: "Amarelo", value: "#FDC938" },
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
        },
      ],
      description:
        "Texto abaixo do título. Selecione um trecho e use a opção de cor para destacar.",
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
      const blocks = title as { children?: { text?: string }[] }[] | undefined;
      const firstBlock = Array.isArray(blocks) ? blocks[0] : undefined;
      const text =
        firstBlock?.children
          ?.map((c) => c?.text ?? "")
          .join("")
          .trim() || "";
      return {
        title: text || (alt as string) || "Slide sem título",
        media,
      };
    },
  },
});
