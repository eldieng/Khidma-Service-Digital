import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET all settings
export async function GET(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const settings = await prisma.siteSettings.findMany();
    
    // Convertir en objet clé-valeur
    const settingsObject: Record<string, string> = {};
    settings.forEach((s) => {
      settingsObject[s.key] = s.value;
    });

    return NextResponse.json(settingsObject);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// POST/PUT update settings
export async function POST(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const body = await request.json();

    // Mettre à jour chaque paramètre
    for (const [key, value] of Object.entries(body)) {
      await prisma.siteSettings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
