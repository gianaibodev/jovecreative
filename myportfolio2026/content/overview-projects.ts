import "server-only";
import { z } from "zod";
import { caseStudyCategories } from "./case-studies";

const overviewProjectSchema = z.object({
  projectId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  heroImage: z.string(),
  category: z.enum(caseStudyCategories),
  tags: z.array(z.string()).default([]),
  href: z.string(),
  ctaLabel: z.string().optional().default("Visit site"),
  roles: z.array(z.string()).optional().default([]),
  metrics: z.array(z.string()).optional().default([]),
});

export type OverviewProject = z.infer<typeof overviewProjectSchema>;

const rawOverviewProjects: OverviewProject[] = overviewProjectSchema.array().parse([
  {
    projectId: "your-desaign",
    title: "your des(ai)gn",
    subtitle: "AI and creative tools — dark luxury interface",
    summary:
      "A dark-mode landing for high-end AI and creative tools: gold-on-black palette, glassmorphism, and neural-style connections. Built to showcase a premium, editorial feel with Playfair Display, Inter, and subtle motion.",
    heroImage: "/legacy/assets/demopic/9.jpg", // Placeholder
    category: "Web Development",
    href: "https://desaign.gianaibo.tech",
    ctaLabel: "Open your des(ai)gn",
    tags: ["UI Design", "AI", "Luxury", "Dark Mode"],
    roles: ["Lead Designer", "Frontend Engineer"],
  },
]);

export function getOverviewProjects(): OverviewProject[] {
  return rawOverviewProjects;
}
