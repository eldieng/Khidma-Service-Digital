import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { AboutPreview } from "@/components/sections/about-preview";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutPreview />
      <ProjectsPreview />
      <Testimonials />
      <CTA />
    </>
  );
}
