// Gera um slug estável a partir de um texto (remove acentos, espaços, etc.).
// Ex: "Ensino Fundamental I" -> "ensino-fundamental-i".
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Slug efetivo de um segmento: usa o slug do CMS quando existe; caso contrário,
// deriva do nome. Assim os links continuam funcionando mesmo antes do Carlos
// gerar o slug no Studio.
export function stageSlug(stage: {
  slug?: string | null;
  name: string;
}): string {
  return stage.slug?.trim() ? stage.slug.trim() : slugify(stage.name);
}
