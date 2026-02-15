import { defineLocaleResourceBundle } from "sanity";

export const codeComponentOverrides = defineLocaleResourceBundle({
  locale: "en-US",
  namespace: "structure",
  resources: {
    "panes.document-pane.document-unknown-type.title": "Unknown document type: {{documentType}}",
    "panes.document-pane.document-unknown-type.text":
      "This document has the schema type {{documentType}}, which is not defined as a type in the local content studio schema.",
    "panes.document-list-pane.error.text.dev": "Error: {{error}}",
    "pane-item.missing-schema-type.title": "No schema found for type {{documentType}}",
    "pane-item.missing-schema-type.subtitle": "Document: {{documentId}}",
    "panes.document-pane.document-not-found.text":
      "The document type is not defined, and a document with the {{id}} identifier could not be found.",
    "panes.unknown-pane-type.missing-type.text": "Structure item is missing required type property.",
    "panes.unknown-pane-type.unknown-type.text": "Structure item of type {{type}} is not a known entity.",
  },
});
