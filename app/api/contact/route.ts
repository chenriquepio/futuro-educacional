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

    const { firstName, lastName, email, phone, message } = body;

    // Validação básica
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
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

    // Preparar o documento da mensagem de contato
    const contactDoc = {
      _type: "contactMessage",
      firstName,
      lastName,
      email,
      phone,
      message,
      status: "new",
      sentAt: new Date().toISOString(),
    };

    // Criar o documento no Sanity
    const result = await writeClient.create(contactDoc);

    return NextResponse.json({
      success: true,
      message: "Mensagem enviada com sucesso!",
      id: result._id,
    });
  } catch (error: unknown) {
    console.error("Erro ao processar mensagem de contato:", error);
    
    // Verificar se é um erro de permissões
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = String(error.message);
      if (errorMessage.includes("Insufficient permissions") || errorMessage.includes("permission")) {
        console.error("Erro de permissões do Sanity. Verifique se:");
        console.error("1. O token SANITY_API_TOKEN está configurado no .env.local");
        console.error("2. O token tem permissões de 'Editor' no Sanity");
        console.error("3. O schema 'contactMessage' foi reconhecido no Sanity Studio");
        console.error("4. O servidor Next.js foi reiniciado após configurar o token");
        return NextResponse.json(
          { error: "Erro de configuração. Verifique as permissões do token do Sanity." },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(
      { error: "Erro ao processar mensagem. Tente novamente." },
      { status: 500 }
    );
  }
}

