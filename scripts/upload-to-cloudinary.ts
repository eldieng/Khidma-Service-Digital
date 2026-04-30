import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { uploadToCloudinary } from "../src/lib/cloudinary";
import fs from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required.");
}
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("☁️ Uploading images to Cloudinary...");

  // Upload project images
  const projects = await prisma.project.findMany();
  for (const project of projects) {
    if (project.image && project.image.startsWith("/images/")) {
      const localPath = path.join(process.cwd(), "public", project.image);
      if (fs.existsSync(localPath)) {
        try {
          const cloudUrl = await uploadToCloudinary(
            localPath,
            "projects",
            `project_${project.slug}`
          );
          await prisma.project.update({
            where: { id: project.id },
            data: { image: cloudUrl },
          });
          console.log(`✅ Project "${project.title}" -> ${cloudUrl}`);
        } catch (err) {
          console.error(`❌ Failed to upload ${project.image}:`, err);
        }
      } else {
        console.warn(`⚠️ File not found: ${localPath}`);
      }
    }
  }

  // Upload service images
  const services = await prisma.service.findMany();
  for (const service of services) {
    if (service.image && service.image.startsWith("/images/")) {
      const localPath = path.join(process.cwd(), "public", service.image);
      if (fs.existsSync(localPath)) {
        try {
          const cloudUrl = await uploadToCloudinary(
            localPath,
            "services",
            `service_${service.slug}`
          );
          await prisma.service.update({
            where: { id: service.id },
            data: { image: cloudUrl },
          });
          console.log(`✅ Service "${service.title}" -> ${cloudUrl}`);
        } catch (err) {
          console.error(`❌ Failed to upload ${service.image}:`, err);
        }
      } else {
        console.warn(`⚠️ File not found: ${localPath}`);
      }
    }
  }

  // Upload article images
  const articles = await prisma.article.findMany();
  for (const article of articles) {
    if (article.image && article.image.startsWith("/images/")) {
      const localPath = path.join(process.cwd(), "public", article.image);
      if (fs.existsSync(localPath)) {
        try {
          const cloudUrl = await uploadToCloudinary(
            localPath,
            "articles",
            `article_${article.slug}`
          );
          await prisma.article.update({
            where: { id: article.id },
            data: { image: cloudUrl },
          });
          console.log(`✅ Article "${article.title}" -> ${cloudUrl}`);
        } catch (err) {
          console.error(`❌ Failed to upload ${article.image}:`, err);
        }
      } else {
        console.warn(`⚠️ File not found: ${localPath}`);
      }
    }
  }

  console.log("🎉 Upload complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
