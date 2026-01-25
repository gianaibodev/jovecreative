import { getAllCaseStudies, getCaseStudyCategories } from "@/content/case-studies";
import BlogClient from "./blog-client";

export const dynamic = 'force-static';
export const revalidate = 3600;

export default function BlogPage() {
  let studies = getAllCaseStudies();
  let categories = getCaseStudyCategories().filter((category) => category.studies.length > 0);
  
  try {
    // Data is already loaded, but wrap in try-catch for safety
    if (!studies || !categories) {
      studies = [];
      categories = [];
    }
  } catch (error) {
    console.error("Error loading case studies:", error);
    studies = [];
    categories = [];
  }

  return <BlogClient categories={categories} />;
}
