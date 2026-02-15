import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { codeComponentOverrides } from "./sanity/i18n/overrides";
import { presentationCodeOverrides } from "./sanity/i18n/presentationOverrides";
import { schemaTypes } from "./sanity/schemas";

const pageSectionTypes = [
  "nossoGrupoPage",
  "ensinoPage",
  "heroSlide",
  "educationalStagesSection",
  "contactSection",
  "sportsSection",
  "testimonialsSection",
];

export default defineConfig({
  name: "futuro-educacional",
  title: "Futuro Educacional CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem()
              .title("Páginas do site")
              .child(
                S.list()
                  .title("Páginas do site")
                  .items([
                    S.documentTypeListItem("nossoGrupoPage").title("Nosso Grupo"),
                    S.documentTypeListItem("ensinoPage").title("Página Ensino"),
                    S.documentTypeListItem("heroSlide").title("Home – Hero (carrossel)"),
                    S.documentTypeListItem("educationalStagesSection").title("Home – Etapas de Ensino"),
                    S.documentTypeListItem("contactSection").title("Home – Contato"),
                    S.documentTypeListItem("sportsSection").title("Home – Esportes"),
                    S.documentTypeListItem("testimonialsSection").title("Home – Testemunhos"),
                  ])
              ),
            S.divider(),
            S.listItem()
              .title("Blog")
              .child(
                S.list()
                  .title("Blog")
                  .items([
                    S.documentTypeListItem("blogPost").title("Posts"),
                    S.documentTypeListItem("category").title("Categorias"),
                    S.documentTypeListItem("author").title("Autores"),
                  ])
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !pageSectionTypes.includes(item.getId() ?? "") && !["blogPost", "category", "author"].includes(item.getId() ?? "")
            ),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  i18n: {
    bundles: [codeComponentOverrides, presentationCodeOverrides],
  },
});

