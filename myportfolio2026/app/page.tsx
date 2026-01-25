import { getAllCaseStudies } from "@/content/case-studies";
import HomeClient from "./home-client";

export default function HomePage() {
  // Extract only what we need - plain strings, fully serializable
  const galleryImages = getAllCaseStudies()
    .slice(0, 10)
    .map((study) => ({
      src: String(study.heroImage ?? ""),
      alt: String(study.title ?? ""),
    }))
    .filter((img) => img.src && img.alt); // Remove any invalid entries

  return <HomeClient galleryImages={galleryImages} />;
}

