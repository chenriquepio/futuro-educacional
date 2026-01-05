import { defineField, defineType } from "sanity";

export const contactMessage = defineType({
  name: "contactMessage",
  title: "Mensagens de Contato",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastName",
      title: "Sobrenome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Telefone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "message",
      title: "Mensagem",
      type: "text",
      validation: (Rule) => Rule.required(),
      rows: 4,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Nova", value: "new" },
          { title: "Em andamento", value: "in_progress" },
          { title: "Respondida", value: "answered" },
          { title: "Arquivada", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Notas internas",
      type: "text",
      description: "Anotações da equipe (não visível para o cliente)",
    }),
    defineField({
      name: "sentAt",
      title: "Data do Envio",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      status: "status",
      sentAt: "sentAt",
    },
    prepare({ firstName, lastName, email, status, sentAt }) {
      const statusEmoji: Record<string, string> = {
        new: "🆕",
        in_progress: "⏳",
        answered: "✅",
        archived: "📁",
      };
      const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "Sem nome";
      const date = sentAt
        ? new Date(sentAt).toLocaleDateString("pt-BR")
        : "Sem data";
      return {
        title: `${statusEmoji[status] || "🆕"} ${fullName}`,
        subtitle: `${email || "Sem e-mail"} • ${date}`,
      };
    },
  },
  orderings: [
    {
      title: "Data de envio (mais recente)",
      name: "sentAtDesc",
      by: [{ field: "sentAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
