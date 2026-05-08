import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom est requis."),
  email: z.email("Adresse email invalide."),
  phone: z.string().trim().optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Le sujet est requis."),
  message: z.string().trim().min(10, "Le message est trop court."),
});

const subjectLabels: Record<string, string> = {
  devis: "Demande de devis",
  info: "Demande d'information",
  partenariat: "Partenariat",
  autre: "Autre",
};

function getSmtpTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || Number.isNaN(port)) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." },
        { status: 400 }
      );
    }
    const { name, email, phone, subject, message } = parsed.data;
    const normalizedSubject = subjectLabels[subject] ?? subject;
    const destinationEmail =
      process.env.CONTACT_DESTINATION_EMAIL ?? "contact@khidmaservice.com";
    const senderEmail =
      process.env.CONTACT_SENDER_EMAIL ??
      process.env.SMTP_USER ??
      "noreply@khidmaservices.com";

    const transporter = getSmtpTransporter();
    if (!transporter) {
      return NextResponse.json(
        {
          error:
            "Le service email n'est pas configure. Contactez l'administrateur.",
        },
        { status: 503 }
      );
    }

    await transporter.sendMail({
      from: `"KSD Website" <${senderEmail}>`,
      to: destinationEmail,
      replyTo: email,
      subject: `[Contact] ${normalizedSubject}`,
      text: `Nouveau message depuis le site KSD

Nom: ${name}
Email: ${email}
Telephone: ${phone || "Non renseigne"}
Sujet: ${normalizedSubject}

Message:
${message}
`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telephone:</strong> ${phone || "Non renseigne"}</p>
        <p><strong>Sujet:</strong> ${normalizedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    await transporter.sendMail({
      from: `"KSD" <${senderEmail}>`,
      to: email,
      subject: "Nous avons bien recu votre message",
      text: `Bonjour ${name},

Merci pour votre message. Notre equipe reviendra vers vous sous 24h ouvrables.

Sujet: ${normalizedSubject}

Cordialement,
KSD`,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais." 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
