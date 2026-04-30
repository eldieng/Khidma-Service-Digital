import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";
import crypto from "crypto";
import path from "path";
import os from "os";
import fs from "fs";
import { writeFile } from "fs/promises";

export async function POST(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Save to temp file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = path.join(os.tmpdir(), `${crypto.randomUUID()}-${file.name}`);
    await writeFile(tempPath, buffer);

    // Upload to Cloudinary
    const cloudUrl = await uploadToCloudinary(tempPath, folder);

    // Clean up temp file
    fs.unlinkSync(tempPath);

    return NextResponse.json({ url: cloudUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
