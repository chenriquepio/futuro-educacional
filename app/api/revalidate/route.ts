import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Rota chamada pelo webhook do Sanity sempre que o conteúdo é publicado/alterado.
// Ela revalida as páginas estáticas do site para que as mudanças apareçam
// automaticamente, sem precisar de um novo deploy.
//
// Segurança: o webhook precisa enviar o segredo (SANITY_REVALIDATE_SECRET),
// via header "x-webhook-secret" ou via query "?secret=".
export async function POST(request: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  const provided =
    request.headers.get("x-webhook-secret") ??
    request.nextUrl.searchParams.get("secret");

  if (!expected || provided !== expected) {
    return NextResponse.json(
      { revalidated: false, message: "Segredo inválido ou ausente." },
      { status: 401 },
    );
  }

  // Revalida todas as páginas (sob o layout raiz) e o sitemap.
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
