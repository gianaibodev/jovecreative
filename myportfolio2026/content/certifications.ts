/**
 * Licenses & certifications — from LinkedIn. Verify at linkedin.com/in/aiboboyero
 * Names aligned with LinkedIn profile as of 2026.
 * URLs from LinkedIn "Licenses & certifications" (linkedin.com/in/aiboboyero/details/certifications/).
 * DataCamp credential URL uses DataCamp's /certificate/{id} when Credential ID is known from LinkedIn.
 */
const LINKEDIN_CERTS =
  "https://www.linkedin.com/in/aiboboyero/details/certifications/";

/** Optional URL for each certification; only for names that appear on LinkedIn certs. */
export const certificationUrls: Record<string, string> = {
  "AI Engineer for Developers Associate":
    "https://www.datacamp.com/certificate/AIEDA0017137154622",
  "Working with the OpenAI API": LINKEDIN_CERTS,
  "AI in the classroom": LINKEDIN_CERTS,
  "Canva Essentials": LINKEDIN_CERTS,
  "Graphic Design Essentials": LINKEDIN_CERTS,
  "Attract and Engage Customers with Digital Marketing": LINKEDIN_CERTS,
  "Gemini in Google Docs": LINKEDIN_CERTS,
  "Gemini in Google Slides": LINKEDIN_CERTS,
  "Introduction to Generative AI": LINKEDIN_CERTS,
  "Make the Sale: Build, Launch, and Manage E-commerce Stores": LINKEDIN_CERTS,
  "Solving Problems with Creative and Critical Thinking": LINKEDIN_CERTS,
  "AI Fundamentals": LINKEDIN_CERTS,
  "Introduction to ChatGPT": LINKEDIN_CERTS,
  "GitHub Foundations": LINKEDIN_CERTS,
  "Generative AI Fundamentals": LINKEDIN_CERTS,
  "Trophy - Bring AI to your business with AI Builder": LINKEDIN_CERTS,
  "Trophy - Create Machine Learning Models": LINKEDIN_CERTS,
  "Trophy - Create bots with Power Virtual Agents": LINKEDIN_CERTS,
  "Trophy - Foundations of Data Science for Machine Learning": LINKEDIN_CERTS,
  "Trophy - Improve Business Performance with AI Builder": LINKEDIN_CERTS,
};

export const certificationCounts: Record<string, number> = {
  Google: 11,
  Microsoft: 7,
  IBM: 5,
  DataCamp: 4,
  Canva: 3,
  GitHub: 1,
  YouTube: 1,
};

export const certificationsByProvider: Record<string, string[]> = {
  Google: [
    "Attract and Engage Customers with Digital Marketing",
    "Gemini in Google Docs",
    "Gemini in Google Slides",
    "Introduction to Generative AI",
    "Make the Sale: Build, Launch, and Manage E-commerce Stores",
    "Generative AI Fundamentals",
    "Foundations of Digital Marketing and E-commerce",
    "Foundations of Project Management",
    "Foundations of User Experience (UX) Design",
    "Foundations: Data, Data, Everywhere",
    "Technical Support Fundamentals",
  ],
  Microsoft: [
    "Trophy - Bring AI to your business with AI Builder",
    "Trophy - Create Machine Learning Models",
    "Trophy - Create bots with Power Virtual Agents",
    "Trophy - Foundations of Data Science for Machine Learning",
    "Trophy - Improve Business Performance with AI Builder",
    "Trophy - Microsoft Azure AI Fundamentals: Explore visual tools for machine learning",
    "Trophy - Understand Data Science for Machine Learning",
  ],
  IBM: [
    "Solving Problems with Creative and Critical Thinking",
    "Data Science 101",
    "Introduction to Cloud",
    "Introduction to Quantum Computing",
    "Statistics 101",
  ],
  DataCamp: [
    "AI Engineer for Developers Associate",
    "Working with the OpenAI API",
    "AI Fundamentals",
    "Introduction to ChatGPT",
  ],
  Canva: [
    "AI in the classroom",
    "Canva Essentials",
    "Graphic Design Essentials",
  ],
  GitHub: ["GitHub Foundations"],
  YouTube: ["YouTube Music Certification"],
};
