import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET single service by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        benefits: { orderBy: { order: "asc" } },
        subServices: { orderBy: { order: "asc" } },
        processSteps: { orderBy: { step: "asc" } },
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

// PUT update service
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const { slug } = await params;
    const body = await request.json();
    const { benefits, subServices, processSteps, ...serviceData } = body;

    // Find existing service
    const existingService = await prisma.service.findUnique({
      where: { slug },
    });

    if (!existingService) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // Delete existing related data
    await prisma.serviceBenefit.deleteMany({ where: { serviceId: existingService.id } });
    await prisma.subService.deleteMany({ where: { serviceId: existingService.id } });
    await prisma.processStep.deleteMany({ where: { serviceId: existingService.id } });

    // Update service with new data
    const service = await prisma.service.update({
      where: { slug },
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

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

// DELETE service
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const { slug } = await params;

    await prisma.service.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
