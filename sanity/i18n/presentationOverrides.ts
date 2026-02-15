import { defineLocaleResourceBundle } from "sanity";

export const presentationCodeOverrides = defineLocaleResourceBundle({
  locale: "en-US",
  namespace: "presentation",
  resources: {
    "main-document.missing.text": "Missing a main document for {{path}}",
    "preview-frame.configuration.error.description":
      "The preview iframe is configured to load {{targetOrigin}}, but the reported origin is {{reportedOrigin}}. Presentation Tool is unable to connect to unknown origins for security purposes. Update your presentationTool.allowOrigins configuration to allow connecting to Visual Editing and Loaders.",
    "preview-search-param.configuration.error.description":
      "The router wants to navigate to {{previewSearchParam}}, but the origin {{blockedOrigin}} is not allowed. Update your presentationTool.allowOrigins configuration to allow it.",
  },
});
