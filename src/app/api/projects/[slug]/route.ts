import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

type MaybeTextItem = string | { name?: string; text?: string } | null | undefined;
type MaybeGalleryItem = { url?: string; alt?: string } | string | null | undefined;
type NormalizedGalleryItem = { url: string; alt: string | undefined };

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

function isNormalizedGalleryItem(
  item: NormalizedGalleryItem | null
): item is NormalizedGalleryItem {
  return item !== null;
}

// GET single project by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        technologies: { orderBy: { order: "asc" } },
        gallery: { orderBy: { order: "asc" } },
        challenges: { orderBy: { order: "asc" } },
        solutions: { orderBy: { order: "asc" } },
        results: { orderBy: { order: "asc" } },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const { slug } = await params;
    const body = await request.json();
    const { technologies, gallery, challenges, solutions, results, ...projectData } = body;
    const normalizedTechnologies = Array.isArray(technologies) ? technologies.map(toText).filter(Boolean) : [];
    const normalizedChallenges = Array.isArray(challenges) ? challenges.map(toText).filter(Boolean) : [];
    const normalizedSolutions = Array.isArray(solutions) ? solutions.map(toText).filter(Boolean) : [];
    const normalizedResults = Array.isArray(results) ? results.map(toText).filter(Boolean) : [];
    const normalizedGallery = Array.isArray(gallery)
      ? gallery.map(toGalleryItem).filter(isNormalizedGalleryItem)
      : [];

    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Delete existing related data
    await prisma.projectTechnology.deleteMany({ where: { projectId: existingProject.id } });
    await prisma.projectGallery.deleteMany({ where: { projectId: existingProject.id } });
    await prisma.projectChallenge.deleteMany({ where: { projectId: existingProject.id } });
    await prisma.projectSolution.deleteMany({ where: { projectId: existingProject.id } });
    await prisma.projectResult.deleteMany({ where: { projectId: existingProject.id } });

    const project = await prisma.project.update({
      where: { slug },
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

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const { slug } = await params;

    await prisma.project.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
