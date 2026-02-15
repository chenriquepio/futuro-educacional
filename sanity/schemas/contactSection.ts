import { defineField, defineType } from "sanity";

export const contactSection = defineType({
  name: "contactSection",
  title: "Seção de Contato",
  type: "document",
  fields: [
    defineField({
      name: "background",
      title: "Imagem de fundo",
      type: "image",
      options: { hotspot: true },
      description: "Background da seção do formulário de contato.",
    }),
    defineField({
      name: "manImage",
      title: "Imagem do colaborador",
      type: "image",
      options: { hotspot: true },
      description: "Imagem do homem/colaborador exibida ao lado do formulário (lado direito).",
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: "Seção de Contato",
        subtitle: "Background e imagem do colaborador",
      };
    },
  },
});
