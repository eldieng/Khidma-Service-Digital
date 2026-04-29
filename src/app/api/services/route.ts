import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET all services
export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      include: {
        benefits: { orderBy: { order: "asc" } },
        subServices: { orderBy: { order: "asc" } },
        processSteps: { orderBy: { step: "asc" } },
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

// POST create service
export async function POST(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const body = await request.json();
    const { benefits, subServices, processSteps, ...serviceData } = body;

    const service = await prisma.service.create({
      data: {
        ...serviceData,
        benefits: {
          create: benefits?.map((b: string, i: number) => ({ text: b, order: i })) || [],
        },
        subServices: {
          create: subServices?.map((s: { name: string; description: string }, i: number) => ({
            ...s,
            order: i,
          })) || [],
        },
        processSteps: {
          create: processSteps || [],
        },
      },
      include: {
        benefits: true,
        subServices: true,
        processSteps: true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
