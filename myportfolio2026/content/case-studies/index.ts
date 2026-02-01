import "server-only";
import { CaseStudy, caseStudyCategories, caseStudySchema } from "./types";

// Import all case studies
import { devconBacolod } from "./data/devcon-bacolod";
import { armadaBrands } from "./data/armada-brands";
import { laVida } from "./data/la-vida";
import { theCapitol } from "./data/the-capitol";
import { custopia } from "./data/custopia";
import { createx } from "./data/createx";
import { googleEvents } from "./data/google-events";
import { valtara } from "./data/valtara";
import { pizzaporia } from "./data/pizzaporia";
import { smileit } from "./data/smileit";
import { saucykps } from "./data/saucykps";
import { gdgBacolod } from "./data/gdg-bacolod";
import { slickStore } from "./data/slick-store";
import { capturePixels } from "./data/capture-pixels";
import { signalin } from "./data/signalin";
import { devfest2023 } from "./data/devfest-2023";
import { appRedesigns } from "./data/app-redesigns";
import { gdsc2022 } from "./data/gdsc-2022";

import { portfolio2026 } from "./data/portfolio-2026";
import { medicalTranscriptions } from "./data/medical-transcriptions";
import { aiTravelGuide } from "./data/ai-travel-guide";
import { ecommerceReviewAnalysis } from "./data/ecommerce-review-analysis";
import { aiEngineerExam } from "./data/ai-engineer-exam";

// Re-export types
export * from "./types";

// Aggregate raw data
const rawData: CaseStudy[] = [
    devconBacolod,
    armadaBrands,
    laVida,
    theCapitol,
    custopia,
    createx,
    googleEvents,
    valtara,
    pizzaporia,
    smileit,
    saucykps,
    gdgBacolod,
    slickStore,
    capturePixels,
    signalin,
    devfest2023,
    appRedesigns,
    gdsc2022,

    portfolio2026,
    medicalTranscriptions,
    aiTravelGuide,
    ecommerceReviewAnalysis,
    aiEngineerExam,
];

// Validate data against schema (Ensures defaults like [] are applied if missing, matching original behavior)
const rawCaseStudies: CaseStudy[] = caseStudySchema.array().parse(rawData);

export function getAllCaseStudies(): CaseStudy[] {
    return rawCaseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
    return rawCaseStudies.find((study) => study.slug === slug);
}

export function getCaseStudyCategories() {
    const categories = caseStudyCategories.map((category) => ({
        name: category,
        slug: category.toLowerCase().replace(/ & /g, "-").replace(/\//g, "-").replace(/ /g, "-"),
        studies: rawCaseStudies.filter((study) => study.category === category),
    }));
    return categories;
}
