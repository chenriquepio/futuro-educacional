import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "../../../sanity/lib/client";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const vacancyId = formData.get("vacancyId") as string;
    const vacancyTitle = formData.get("vacancyTitle") as string;
    const resume = formData.get("resume") as File | null;

    // Validação básica
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Nome, e-mail e telefone são obrigatórios" },
        { status: 400 }
      );
    }

    // Validação de e-mail simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      );
    }

    // Preparar o documento da candidatura
    const applicationDoc: Record<string, any> = {
      _type: "jobApplication",
      name,
      email,
      phone,
      message: message || undefined,
      linkedinUrl: linkedinUrl || undefined,
      vacancyTitle,
      status: "new",
      appliedAt: new Date().toISOString(),
    };

    // Adicionar referência à vaga se existir
    if (vacancyId && vacancyId !== "fallback") {
      applicationDoc.vacancy = {
        _type: "reference",
        _ref: vacancyId,
      };
    }

    // Upload do currículo se existir
    if (resume && resume.size > 0) {
      // Verificar tamanho (máximo 5MB)
      if (resume.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "O arquivo deve ter no máximo 5MB" },
          { status: 400 }
        );
      }

      // Verificar tipo de arquivo
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(resume.type)) {
        return NextResponse.json(
          { error: "Apenas arquivos PDF, DOC ou DOCX são permitidos" },
          { status: 400 }
        );
      }

      // Converter File para Buffer
      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload do arquivo para o Sanity
      const asset = await writeClient.assets.upload("file", buffer, {
        filename: `curriculo-${name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.${resume.name.split(".").pop()}`,
        contentType: resume.type,
      });

      applicationDoc.resume = {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    }

    // Criar o documento no Sanity
    const result = await writeClient.create(applicationDoc as any);

    return NextResponse.json({
      success: true,
      message: "Candidatura enviada com sucesso!",
      id: result._id,
    });
  } catch (error) {
    console.error("Erro ao processar candidatura:", error);
    return NextResponse.json(
      { error: "Erro ao processar candidatura. Tente novamente." },
      { status: 500 }
    );
  }
}

