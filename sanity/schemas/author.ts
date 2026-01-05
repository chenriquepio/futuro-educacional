import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Autores",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Biografia",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});





