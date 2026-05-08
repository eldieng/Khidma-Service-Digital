import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { AboutPreview } from "@/components/sections/about-preview";
import { AboutCtaBand } from "@/components/sections/about-cta-band";
import { ProcessPreview } from "@/components/sections/process-preview";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata({
  title: "Agence digitale à Dakar - Sites web et acquisition",
  description:
    "KSD accompagne les entreprises à Dakar et Louga avec des services web, design et marketing orientés conversion.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutPreview />
      <AboutCtaBand />
      <ProcessPreview />
      <ProjectsPreview />
      <BlogPreview />
      <Testimonials />
      <CTA />
    </>
  );
}
