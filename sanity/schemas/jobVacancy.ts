import { defineField, defineType } from "sanity";

export const jobVacancy = defineType({
  name: "jobVacancy",
  title: "Vagas de Emprego",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título da Vaga",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Localização",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Tipo de Trabalho",
      type: "string",
      options: {
        list: [
          { title: "Presencial", value: "Presencial" },
          { title: "Remoto", value: "Remoto" },
          { title: "Híbrido", value: "Híbrido" },
        ],
      },
      initialValue: "Presencial",
    }),
    defineField({
      name: "description",
      title: "Descrição da Vaga",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "requirements",
      title: "Requisitos",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isActive",
      title: "Vaga Ativa",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      isActive: "isActive",
    },
    prepare({ title, subtitle, isActive }) {
      return {
        title: `${isActive ? "✅" : "❌"} ${title}`,
        subtitle,
      };
    },
  },
});





