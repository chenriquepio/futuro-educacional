import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "../../../sanity/lib/client";

export async function POST(request: NextRequest) {
  try {
    // Verificar se o token está configurado
    if (!process.env.SANITY_API_TOKEN) {
      console.error("SANITY_API_TOKEN não está configurado");
      return NextResponse.json(
        { error: "Configuração do servidor incompleta. Entre em contato com o suporte." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const { email, source = "blog" } = body;

    // Validação básica
    if (!email) {
      return NextResponse.json(
        { error: "E-mail é obrigatório" },
        { status: 400 }
      );
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      );
    }

    // Verificar se o e-mail já existe
    const existing = await writeClient.fetch(
      `*[_type == "newsletterSubscription" && email == $email][0]`,
      { email }
    );

    if (existing) {
      // Se já existe e está cancelado, reativar
      if (existing.status === "cancelled") {
        await writeClient
          .patch(existing._id)
          .set({ status: "active", subscribedAt: new Date().toISOString() })
          .commit();

        return NextResponse.json({
          success: true,
          message: "Inscrição reativada com sucesso!",
          id: existing._id,
        });
      }

      // Se já está ativo, retornar sucesso mas não criar duplicata
      return NextResponse.json({
        success: true,
        message: "Você já está inscrito na nossa newsletter!",
        id: existing._id,
      });
    }

    // Preparar o documento da inscrição
    const subscriptionDoc = {
      _type: "newsletterSubscription",
      email,
      status: "active",
      source,
      subscribedAt: new Date().toISOString(),
    };

    // Criar o documento no Sanity
    const result = await writeClient.create(subscriptionDoc);

    return NextResponse.json({
      success: true,
      message: "Inscrição realizada com sucesso!",
      id: result._id,
    });
  } catch (error: unknown) {
    console.error("Erro ao processar inscrição na newsletter:", error);

    // Verificar se é um erro de permissões
    if (error && typeof error === "object" && "message" in error) {
      const errorMessage = String(error.message);
      if (
        errorMessage.includes("Insufficient permissions") ||
        errorMessage.includes("permission")
      ) {
        console.error("Erro de permissões do Sanity. Verifique se:");
        console.error("1. O token SANITY_API_TOKEN está configurado no .env.local");
        console.error("2. O token tem permissões de 'Editor' no Sanity");
        console.error("3. O schema 'newsletterSubscription' foi reconhecido no Sanity Studio");
        console.error("4. O servidor Next.js foi reiniciado após configurar o token");
        return NextResponse.json(
          { error: "Erro de configuração. Verifique as permissões do token do Sanity." },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { error: "Erro ao processar inscrição. Tente novamente." },
      { status: 500 }
    );
  }
}


