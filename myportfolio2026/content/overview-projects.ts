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
      "A premium digital environment built for creative tools, featuring a high-contrast dark interface, custom hardware-accelerated shaders, and precise typography. Implementation focuses on tactile feedback and high-performance animation.",
    heroImage: "/legacy/assets/demopic/9.jpg",
    category: "Web Development",
    href: "https://desaign.gianaibo.tech",
    ctaLabel: "Launch Project",
    tags: ["Product Design", "WebGL", "UX Engineering", "Dark UI"],
    roles: ["Creative Direction", "Full Stack Development"],
  },
]);

export function getOverviewProjects(): OverviewProject[] {
  return rawOverviewProjects;
}
