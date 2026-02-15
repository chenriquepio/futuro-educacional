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
                    S.listItem()
                      .title("Home")
                      .child(
                        S.list()
                          .title("Home")
                          .items([
                            S.documentTypeListItem("heroSlide").title("Hero"),
                            S.listItem()
                              .title("Etapas de Ensino")
                              .id("educationalStagesSection")
                              .child(
                                S.document()
                                  .schemaType("educationalStagesSection")
                                  .documentId("educationalStagesSection"),
                              ),
                            S.listItem()
                              .title("Esportes")
                              .id("sportsSection")
                              .child(
                                S.document()
                                  .schemaType("sportsSection")
                                  .documentId("sportsSection"),
                              ),
                            S.documentTypeListItem("testimonialsSection").title(
                              "Testemunhos",
                            ),
                          ]),
                      ),
                    S.listItem()
                      .title("Nosso Grupo")
                      .id("nossoGrupoPage")
                      .child(
                        S.document()
                          .schemaType("nossoGrupoPage")
                          .documentId("nossoGrupoPage"),
                      ),
                    S.listItem()
                      .title("Página Ensino")
                      .id("ensinoPage")
                      .child(
                        S.document()
                          .schemaType("ensinoPage")
                          .documentId("ensinoPage"),
                      ),
                    S.listItem()
                      .title("Seção de Contato")
                      .id("contactSection")
                      .child(
                        S.document()
                          .schemaType("contactSection")
                          .documentId("contactSection"),
                      ),
                  ]),
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
                  ]),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) =>
                !pageSectionTypes.includes(item.getId() ?? "") &&
                !["blogPost", "category", "author"].includes(
                  item.getId() ?? "",
                ),
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
