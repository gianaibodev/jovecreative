import { getCaseStudyCategories } from "@/content/case-studies";
import { getOverviewProjects } from "@/content/overview-projects";

export const runtime = "nodejs";

export async function GET() {
  try {
    const overviewProjects = getOverviewProjects();
    const baseCategories = getCaseStudyCategories();

    // Merge overview projects into categories
    const categoriesWithOverview = baseCategories.map((c) => {
      const categoryOverviewProjects = overviewProjects.filter(
        (op) => op.category === c.name
      );

      // Map overview projects to a compatible shape
      const mappedOverviewProjects = categoryOverviewProjects.map((op) => ({
        slug: `overview-${op.projectId}`, // Fake slug for keying
        projectId: op.projectId,
        title: op.title,
        subtitle: op.subtitle,
        summary: op.summary,
        category: op.category,
        year: new Date().getFullYear(), // Default to current year
        heroImage: op.heroImage,
        roles: op.roles,
        tags: op.tags,
        metrics: op.metrics,
        // Extra fields for overview
        isOverviewOnly: true,
        externalHref: op.href,
        ctaLabel: op.ctaLabel,
      }));

      return {
        ...c,
        studies: [...c.studies, ...mappedOverviewProjects],
      };
    });

    const categories = categoriesWithOverview
      .filter((c) => c.studies.length > 0)
      .map((c) => ({
        name: String(c.name),
        slug: String(c.slug),
        studies: c.studies.map((s) => ({
          slug: String(s.slug),
          projectId: String(s.projectId),
          title: String(s.title),
          subtitle: String(s.subtitle),
          summary: String(s.summary),
          category: String(s.category),
          year: Number(s.year),
          heroImage: String(s.heroImage),
          roles: Array.isArray(s.roles) ? s.roles.map(String) : [],
          tags: Array.isArray(s.tags) ? s.tags.map(String) : [],
          metrics: Array.isArray(s.metrics) ? s.metrics.map(String) : [],
          // Pass through new fields if present
          isOverviewOnly: "isOverviewOnly" in s ? Boolean(s.isOverviewOnly) : false,
          externalHref: "externalHref" in s ? String(s.externalHref) : undefined,
          ctaLabel: "ctaLabel" in s ? String(s.ctaLabel) : undefined,
        })),
      }));

    // Double-check: ensure all values are JSON-serializable
    const serializable = JSON.parse(JSON.stringify({ categories }));

    return Response.json(serializable, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error in categories API route:", error);
    return Response.json(
      { categories: [], error: "Failed to load categories" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
