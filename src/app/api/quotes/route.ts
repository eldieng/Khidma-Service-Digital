import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET all quote requests
export async function GET(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const quotes = await prisma.quoteRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}

// POST create quote request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const quote = await prisma.quoteRequest.create({
      data: body,
    });

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json(
      { error: "Failed to create quote request" },
      { status: 500 }
    );
  }
}
