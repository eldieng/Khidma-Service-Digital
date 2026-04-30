import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createAuthToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Vérifier si le compte est actif
    if (!user.isActive) {
      return NextResponse.json(
        { error: "Votre compte a été désactivé" },
        { status: 403 }
      );
    }

    // Retourner les infos utilisateur (sans le mot de passe)
    const { password: _, ...userWithoutPassword } = user;

    const token = createAuthToken({
      userId: user.id,
      role: user.role,
      email: user.email,
    });

    const response = NextResponse.json({
      user: userWithoutPassword,
      message: "Connexion réussie",
    });
    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Erreur lors de la connexion" },
      { status: 500 }
    );
  }
}
