import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

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
          create: technologies?.map((t: string, i: number) => ({ name: t, order: i })) || [],
        },
        gallery: {
          create: gallery?.map((g: { url: string; alt?: string }, i: number) => ({ ...g, order: i })) || [],
        },
        challenges: {
          create: challenges?.map((c: string, i: number) => ({ text: c, order: i })) || [],
        },
        solutions: {
          create: solutions?.map((s: string, i: number) => ({ text: s, order: i })) || [],
        },
        results: {
          create: results?.map((r: string, i: number) => ({ text: r, order: i })) || [],
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
