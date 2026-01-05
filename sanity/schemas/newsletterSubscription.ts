import { defineField, defineType } from "sanity";

export const newsletterSubscription = defineType({
  name: "newsletterSubscription",
  title: "Assinantes da Newsletter",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Ativo", value: "active" },
          { title: "Cancelado", value: "cancelled" },
          { title: "Inativo", value: "inactive" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "subscribedAt",
      title: "Data de Cadastro",
      type: "datetime",
    }),
    defineField({
      name: "source",
      title: "Origem",
      type: "string",
      description: "De onde veio a inscrição (ex: blog post, página inicial)",
      options: {
        list: [
          { title: "Blog", value: "blog" },
          { title: "Página Inicial", value: "home" },
          { title: "Outro", value: "other" },
        ],
      },
      initialValue: "blog",
    }),
  ],
  preview: {
    select: {
      email: "email",
      status: "status",
      subscribedAt: "subscribedAt",
    },
    prepare({ email, status, subscribedAt }) {
      const statusEmoji: Record<string, string> = {
        active: "✅",
        cancelled: "❌",
        inactive: "⏸️",
      };
      const date = subscribedAt
        ? new Date(subscribedAt).toLocaleDateString("pt-BR")
        : "Sem data";
      return {
        title: `${statusEmoji[status] || "✅"} ${email || "Sem e-mail"}`,
        subtitle: `Cadastrado em ${date}`,
      };
    },
  },
  orderings: [
    {
      title: "Data de cadastro (mais recente)",
      name: "subscribedAtDesc",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});


