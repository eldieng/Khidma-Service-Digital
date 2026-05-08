import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type MaybeTextItem = string | { name?: string; text?: string } | null | undefined;
type MaybeGalleryItem = { url?: string; alt?: string } | string | null | undefined;

function toText(value: MaybeTextItem): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return value.name ?? value.text ?? "";
  return "";
}

function toGalleryItem(value: MaybeGalleryItem) {
  if (!value) return null;
  if (typeof value === "string") {
    return value.trim() ? { url: value, alt: undefined } : null;
  }
  if (typeof value === "object" && typeof value.url === "string" && value.url.trim()) {
    return { url: value.url, alt: value.alt };
  }
  return null;
}

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { isActive: true },
      include: {
        technologies: { orderBy: { order: "asc" } },
        gallery: { orderBy: { order: "asc" } },
        challenges: { orderBy: { order: "asc" } },
        solutions: { orderBy: { order: "asc" } },
        results: { orderBy: { order: "asc" } },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST create project
export async function POST(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const body = await request.json();
    const { technologies, gallery, challenges, solutions, results, ...projectData } = body;
    const normalizedTechnologies = Array.isArray(technologies) ? technologies.map(toText).filter(Boolean) : [];
    const normalizedChallenges = Array.isArray(challenges) ? challenges.map(toText).filter(Boolean) : [];
    const normalizedSolutions = Array.isArray(solutions) ? solutions.map(toText).filter(Boolean) : [];
    const normalizedResults = Array.isArray(results) ? results.map(toText).filter(Boolean) : [];
    const normalizedGallery = Array.isArray(gallery)
      ? gallery.map(toGalleryItem).filter((item): item is { url: string; alt?: string } => Boolean(item))
      : [];

    const project = await prisma.project.create({
      data: {
        ...projectData,
        technologies: {
          create: normalizedTechnologies.map((t, i: number) => ({ name: t, order: i })),
        },
        gallery: {
          create: normalizedGallery.map((g, i: number) => ({ ...g, order: i })),
        },
        challenges: {
          create: normalizedChallenges.map((c, i: number) => ({ text: c, order: i })),
        },
        solutions: {
          create: normalizedSolutions.map((s, i: number) => ({ text: s, order: i })),
        },
        results: {
          create: normalizedResults.map((r, i: number) => ({ text: r, order: i })),
        },
      },
      include: {
        technologies: true,
        gallery: true,
        challenges: true,
        solutions: true,
        results: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
