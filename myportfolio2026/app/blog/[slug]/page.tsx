import { getAllCaseStudies, getCaseStudyBySlug } from "@/content/case-studies";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, GitPullRequest, Code, Cpu, Layers } from "lucide-react";
import { notFound } from "next/navigation";
import { PixelHeader } from "@/components/ui/pixel-header";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import { StyledIframe } from "@/components/ui/styled-iframe";
import { shaderCredits, libraryCredits } from "@/content/portfolio-documentation";

export const dynamic = 'force-static';
export const revalidate = 3600;

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  try {
    const studies = getAllCaseStudies();
    return studies.map((study) => ({ slug: study.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  try {
    const { slug } = await params;
    const study = getCaseStudyBySlug(slug);
    if (!study) {
      return {
        title: "Case Study Not Found",
        description: "The requested case study could not be found.",
      };
    }
    return {
      title: `${study.title} — Case Study`,
      description: study.summary,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Case Study",
      description: "View our case studies",
    };
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  let slug: string;
  try {
    const resolvedParams = await params;
    slug = resolvedParams.slug;
  } catch (error) {
    console.error("Error resolving params:", error);
    notFound();
    return null;
  }

  const study = getCaseStudyBySlug(slug);
  if (!study) {
    notFound();
    return null;
  }

  let nextStudy;
  try {
    const allStudies = getAllCaseStudies();
    const currentIndex = allStudies.findIndex((s) => s.slug === study.slug);
    nextStudy = allStudies[(currentIndex + 1) % allStudies.length];
  } catch (error) {
    console.error("Error getting next study:", error);
    // Fallback to first study if there's an error
    const allStudies = getAllCaseStudies();
    nextStudy = allStudies[0] || study;
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <MacOSMenuBar appName={study.title} />

      <PixelHeader
        title={study.title}
        subtitle={study.subtitle || study.summary}
        colors={["#ec4899", "#8b5cf6", "#3b82f6", "#10b981"]}
        categoryIcon={<GitPullRequest className="size-4" />}
        categoryText={study.category}
        backLink={
          <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors">
            <GitPullRequest className="size-4" />
            <span>← Back to Case Studies</span>
          </Link>
        }
        maxWidth="max-w-5xl"
      />

      <article className="relative pb-12 sm:pb-16 md:pb-24 px-4 sm:px-6 lg:px-10 mt-8 sm:mt-12">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
          <header className="space-y-6 sm:space-y-8 md:space-y-10">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-2">
              <div className="rounded-3xl border border-zinc-300 dark:border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.03] p-4 sm:p-6 space-y-3 sm:space-y-4">
                <h2 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">Roles & Stack</h2>
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground">
                  {study.roles.map((role) => (
                    <span key={role} className="px-2 sm:px-3 py-1 rounded-full bg-white/10">
                      {role}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/80">
                  {study.tools.map((tool) => (
                    <span key={tool} className="px-2 sm:px-3 py-1 rounded-full bg-white/5">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-zinc-300 dark:border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.03] p-4 sm:p-6 space-y-3 sm:space-y-4">
                <h2 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">Impact</h2>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  {study.metrics.map((metric) => (
                    <li key={metric} className="flex items-start gap-2 sm:gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                      <span className="break-words">{metric}</span>
                    </li>
                  ))}
                </ul>
                {study.links?.length ? (
                  <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                    {study.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm text-blue-500 dark:text-blue-300 font-semibold break-all"
                      >
                        {link.label} <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <ResponsiveImage
              src={study.heroImage}
              alt={`${study.title} - Hero image showcasing ${study.category.toLowerCase()} project design and visual identity`}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
              cover={true}
            />
          </header>

          <section className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-zinc-300 dark:border-white/10 p-4 sm:p-6 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03]">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">Year</p>
              <p className="text-2xl sm:text-3xl font-semibold mt-2">{study.year}</p>
            </div>
            <div className="rounded-3xl border border-zinc-300 dark:border-white/10 p-4 sm:p-6 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03]">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">Category</p>
              <p className="text-2xl sm:text-3xl font-semibold mt-2 break-words">{study.category}</p>
            </div>
            <div className="rounded-3xl border border-zinc-300 dark:border-white/10 p-4 sm:p-6 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03] sm:col-span-2 lg:col-span-1">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">Deliverables</p>
              <ul className="mt-2 space-y-1 text-muted-foreground text-sm sm:text-base">
                {study.deliverables.map((item) => (
                  <li key={item} className="leading-tight">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {study.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[24px] sm:rounded-[32px] border border-zinc-300 dark:border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.02] p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4"
            >
              <h2 className="text-xl sm:text-2xl font-semibold">{section.title}</h2>
              <div className="space-y-3 sm:space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {section.iframe ? (
                <div className="mt-6">
                  <StyledIframe
                    src={section.iframe.src}
                    title={section.iframe.title || section.title}
                    className="w-full"
                  />
                </div>
              ) : null}
              {section.highlights?.length ? (
                <div className="flex flex-wrap gap-3 pt-4">
                  {section.highlights.map((highlight) => (
                    <span key={highlight} className="px-4 py-2 rounded-full bg-white/10 text-sm text-muted-foreground">
                      {highlight}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          {/* Special Technical Documentation for Portfolio Case Study */}
          {slug === "portfolio-2026-making-of" && (
            <div className="space-y-8 sm:space-y-12">
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Code className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold">Shader Specifications</h2>
                </div>
                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                  {shaderCredits.map((shader) => (
                    <div key={shader.name} className="p-6 rounded-3xl border border-zinc-400 dark:border-white/20 bg-slate-950/80 dark:bg-black/80 backdrop-blur-3xl space-y-3 shadow-2xl">
                      <h3 className="text-xl font-bold text-white">{shader.name}</h3>
                      <p className="text-xs text-blue-400 font-bold uppercase tracking-wider">{shader.author} • {shader.source}</p>
                      <p className="text-base text-gray-100 dark:text-gray-200 leading-relaxed font-normal">{shader.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <Layers className="w-5 h-5 text-purple-500" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold">Core Technology Stack</h2>
                </div>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {libraryCredits.map((lib) => (
                    <div key={lib.name} className="p-5 rounded-2xl border border-zinc-300 dark:border-white/10 bg-slate-900/60 flex flex-col justify-between gap-3 group hover:border-zinc-500 dark:hover:border-white/30 transition-all shadow-lg">
                      <div>
                        <h4 className="font-bold text-base text-white">{lib.name}</h4>
                        <p className="text-[10px] text-blue-300 uppercase tracking-widest font-bold">{lib.version} • {lib.license}</p>
                        <p className="text-sm text-gray-200 mt-2 line-clamp-2 leading-relaxed">{lib.purpose}</p>
                      </div>
                      {lib.url && (
                        <Link href={lib.url} target="_blank" className="text-[10px] text-blue-400 font-bold flex items-center gap-1 hover:text-blue-300 transition-colors">
                          VIEW SOURCE <ExternalLink className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-10 rounded-[40px] bg-gradient-to-br from-slate-900 to-blue-900 border border-zinc-400 dark:border-white/20 backdrop-blur-3xl text-center shadow-2xl">
                <Cpu className="w-16 h-12 text-blue-400 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl font-bold text-white mb-4">Architecture of Gian Aibo 2026</h3>
                <p className="text-gray-100 text-lg font-normal max-w-2xl mx-auto leading-relaxed">
                  This website is not just a showcase—it is the evidence. By merging code-driven engineering with 
                  designer-grade artistry, I&apos;ve created a platform that lives and breathes in the GPU, ensuring 
                  every interaction is as visceral as it is functional.
                </p>
              </section>
            </div>
          )}

          {study.gallery.length > 0 ? (
            <section className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Gallery</p>
                <h2 className="text-3xl font-semibold">Process visuals</h2>
              </div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {study.gallery.map((image, index) => (
                  <ResponsiveImage
                    key={image}
                    src={image}
                    alt={`${study.title} - Process visual ${index + 1} showing design process, mockups, or final deliverables`}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="rounded-[24px] sm:rounded-[32px] border border-zinc-300 dark:border-white/10 backdrop-blur-2xl bg-white/5 dark:bg-white/[0.02] p-4 sm:p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">Explore next</p>
              <h3 className="text-xl sm:text-2xl font-semibold mt-2 break-words">{nextStudy.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 max-w-xl break-words">{nextStudy.summary}</p>
            </div>
            <Link
              href={`/blog/${nextStudy.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-400 dark:border-white/20 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-blue-500 dark:text-blue-300 hover:bg-white/10 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Read the next case study <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}
