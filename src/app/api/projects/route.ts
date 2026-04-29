import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

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

    const project = await prisma.project.create({
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

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
