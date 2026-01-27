import "server-only";
import { z } from "zod";

export const caseStudyCategories = [
  "Branding",
  "UI/UX",
  "Web Development",
  "Photography",
  "Community & Events",
  "Startups & Innovation",
  "Games & Experiments",
  "Internships",
] as const;

export type CaseStudyCategory = (typeof caseStudyCategories)[number];

const caseStudySectionSchema = z.object({
  title: z.string(),
  body: z.array(z.string()),
  highlights: z.array(z.string()).optional(),
  iframe: z
    .object({
      src: z.string(),
      title: z.string().optional(),
    })
    .optional(),
});

const caseStudySchema = z.object({
  slug: z.string(),
  projectId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  date: z.string(),
  year: z.number(),
  category: z.enum(caseStudyCategories),
  tags: z.array(z.string()),
  roles: z.array(z.string()),
  tools: z.array(z.string()),
  metrics: z.array(z.string()),
  heroImage: z.string(),
  gallery: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).default([]),
  links: z
    .array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    )
    .optional(),
  sections: z.array(caseStudySectionSchema),
});

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudySection = z.infer<typeof caseStudySectionSchema>;

const rawCaseStudies: CaseStudy[] = caseStudySchema.array().parse([
  {
    slug: "devcon-bacolod-branding",
    projectId: "devcon-bacolod",
    title: "DEVCON Bacolod",
    subtitle: "Leading the Local Tech Community",
    summary:
      "DEVCON Philippines is the Philippines' largest volunteer tech community and non-profit organization for developers, IT enthusiasts, and future tech professionals. Their mission is to promote the collaborative growth and global competence of Filipino developers in both academia and the IT industry. DEVCON Bacolod is the local chapter I led to provide platforms for learning, networking, and support.",
    date: "2024-05-01",
    year: 2024,
    category: "Community & Events",
    tags: ["Tech Community", "Branding", "Leadership"],
    roles: ["Chapter Lead", "Creative Director"],
    tools: ["Figma", "Adobe Photoshop", "Community Building"],
    metrics: [
      "Largest volunteer tech community in the Philippines",
      "Promoted collaborative growth for Filipino developers",
      "Provided platforms for learning and networking",
    ],
    heroImage: "/framer/l0mt37sDsp0qpScslPzX7Q0U.avif",
    gallery: [
      "/framer/l0mt37sDsp0qpScslPzX7Q0U.avif",
      "/framer/7Cj2GmajQOCPjc9p2tNBXFW4J8.avif",
      "/framer/9neiq36m9UOrgeUNGoVlB61oXc.avif",
      "/framer/aBUlQN4FQCadBmUxw5fetfJIwyc.webp",
      "/framer/GhoIcW9WDSSYWNXawPj4HR0eM.avif",
      "/framer/szWrgqCRtUDLfDSGnW8vbkHW8FM.webp",
    ],
    deliverables: ["Community Leadership", "Event Branding", "Chapter Growth"],
    sections: [
      {
        title: "Community Growth & Impact",
        body: [
          "As Chapter Lead for DEVCON Bacolod, I spearheaded initiatives to connect local developers with the broader Philippine tech ecosystem.",
          "Our focus was on creating inclusive spaces for learning, where students and professionals could bridge the gap between academia and industry requirements.",
        ],
      },
    ],
  },
  {
    slug: "armada-brands-internship",
    projectId: "armada-brands",
    title: "Armada Brands — Internship",
    subtitle: "From Startup K-Drama Dream to Reality: Scaling D2C Brands",
    summary:
      "Armada Brands is a Singapore-headquartered e-commerce company founded in 2021. Its core business model is to acquire and partner with promising digital-first D2C (Direct-to-Consumer) brands, primarily in Southeast Asia, and then provide them with the resources and expertise to scale. My role involved scaling partner brands like Nuprene and Goodies Nutrition through strategic resource allocation and creative operational support.",
    date: "2024-06-01",
    year: 2024,
    category: "Internships",
    tags: ["E-Commerce", "Clients: Nuprene, Goodies Nutrition", "Shopify Dev"],
    roles: ["Creatives Intern", "Shopify Developer", "Campaign Strategist"],
    tools: ["Adobe Creative Suite", "Shopify Liquid", "TikTok Shop", "Shopee Seller Center", "Lazada"],
    metrics: [
      "Spearheaded visuals for extensive 7.7 & 8.8 Mega-Campaigns",
      "Generated thousands of organic views via TikTok/Reels content",
      "Optimized conversion funnels for 2 major D2C brands",
      "Transitioned from Design Intern to Shopify Developer",
      "Streamlined onboarding process for future creative hires"
    ],
    heroImage: "/projects/armada/hero.avif",
    gallery: [
      "/projects/armada/1.avif",
      "/projects/armada/2.avif",
      "/projects/armada/3.avif",
      "/projects/armada/4.avif"
    ],
    deliverables: [
      "Campaign Identity Systems (7.7 & 8.8)",
      "High-Fidelity Shopify Page Layouts",
      "Short-Form Video Marketing (Reels/TikTok)",
      "E-commerce Conversion Assets",
      "Onboarding Documentation"
    ],
    sections: [
      {
        title: "The 'Startup K-Drama' Reality",
        body: [
          "Stepping into Armada Brands felt like entering the fast-paced world of a startup K-Drama—intense, dynamic, and full of potential. My role wasn't limited to making things 'look good'; it was about solving business problems through design.",
          "I was immediately thrust into the deep end, handling diverse brand portfolios like Nuprene (luggage) and Goodies Nutrition. The challenge was to maintain distinct brand voices while executing rapid-fire promotional campaigns on tight deadlines."
        ],
        highlights: [
          "Managed Diverse Brand Portfolios",
          "High-Velocity Creative Output",
          "Real-world Business Impact"
        ]
      },
      {
        title: "Campaign Domination: 7.7 & 8.8",
        body: [
          "The highlight of my residency was taking creative ownership during the critical 7.7 and 8.8 e-commerce mega-sales. These aren't just dates; they are the Super Bowls of Southeast Asian retail.",
          "I produced a comprehensive suite of assets—from thumb-stopping Instagram Reels to high-conversion static banners for Shopee and Lazada. The result was a cohesive visual identity that cut through the noise, driving significant traffic and engagement during peak trading hours."
        ],
        highlights: [
          "Led Creative Strategy for Mega-Sales",
          "Cross-Platform Visual Consistency",
          "Thousands of Organic Video Views"
        ]
      },
      {
        title: "Bridging Design & Tech",
        body: [
          "This wasn't just a design internship. I leveraged my Computer Science background to bridge the gap between aesthetics and functionality. I formally upskilled becoming a Shopify Developer, tweaking themes and layouts to ensure our creative assets actually converted visitors into buyers.",
          "Beyond individual contribution, I helped build the culture. I took initiative to assist in onboarding new team members, creating a knowledge transfer system that would outlast my internship. Merging tech and creativity here wasn't just a tagline; it was my daily operation."
        ],
        highlights: [
          "Official Shopify Developer Status",
          "Technical & Creative Synthesis",
          "Team Onboarding & Mentorship"
        ]
      }
    ]
  },
  {
    slug: "la-vida-2025-brand-system",
    projectId: "la-vida",
    title: "LA VIDA 2025 BRANDING",
    subtitle: "Event Promotion & Brand Identity for High-Energy Social Events",
    summary:
      "La Vida is an event organizing team specializing in high-energy social events, including rave parties, club nights, and themed gatherings.\n\nWe manage all facets of event production—from venue selection and talent curation to logistics, technical production, and strategic promotion.",
    date: "2025-03-01",
    year: 2025,
    category: "Branding",
    tags: ["Event Promotion", "Brand Identity", "Social Events"],
    roles: ["Brand Designer", "Event Promoter", "Creative Director"],
    tools: ["Figma", "Adobe Photoshop", "Framer"],
    metrics: [
      "Comprehensive event production management",
      "Strategic promotion and talent curation",
      "Delivered impactful experiences like Elgon's Secret Garden Pool Party",
    ],
    heroImage: "/framer/lavida-hero.jpg",
    gallery: ["/framer/framer-02.jpg", "/framer/framer-03.jpg", "/framer/framer-04.png"],
    deliverables: ["Brand Identity", "Event Promotion Materials", "Social Media Assets", "Venue Branding"],
    sections: [
      {
        title: "Event Production Excellence",
        body: [
          "La Vida specializes in creating memorable high-energy social events, from rave parties to themed gatherings. Our focus is on delivering impactful experiences that resonate with audiences.",
          "The Elgon's Secret Garden Pool Party exemplifies our approach to comprehensive event production, managing everything from venue selection to talent curation.",
        ],
      },
      {
        title: "Strategic Promotion & Branding",
        body: [
          "We handle all facets of event production, including logistics, technical production, and strategic promotion to ensure maximum impact and attendance.",
          "Our brand identity reflects the vibrant, energetic nature of the events we produce, creating a cohesive visual language that extends across all promotional materials.",
        ],
      },
    ],
  },
  {
    slug: "the-capitol-party-branding",
    projectId: "the-capitol",
    title: "THE CAPITOL — Event Identity",
    subtitle: "A vibrant, youth-focused brand identity for a major city event.",
    summary:
      "Developed a comprehensive brand identity for 'The Capitol Party,' including logo, typography, color palette, and promotional materials.",
    date: "2024-11-15",
    year: 2024,
    category: "Branding",
    tags: ["Event Branding", "Community", "Graphic Design"],
    roles: ["Brand Designer", "Graphic Designer"],
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Figma"],
    metrics: [
      "1,000+ event registrations within the first week",
      "500k+ social media impressions",
      "Secured 10+ local business sponsorships",
    ],
    heroImage: "/framer/capitol-hero.jpg",
    gallery: ["/framer/framer-06.jpg", "/framer/framer-07.jpg", "/framer/framer-08.jpg"],
    deliverables: ["Logo suite", "Brand guidelines", "Social media kit", "Print collateral"],
    sections: [
      {
        title: "Concept & Strategy",
        body: [
          "Researched target audience demographics (18-25 year olds) to inform a modern, energetic, and inclusive brand aesthetic.",
          "Developed a brand narrative centered around community, celebration, and urban culture.",
        ],
      },
    ],
  },
  {
    slug: "custopia-vr-simulator",
    projectId: "custopia",
    title: "Custopia: VR Customer Service Simulator",
    subtitle: "The VR Game That Turns Training into a Thrilling Adventure",
    summary:
      "A cutting-edge virtual reality platform meticulously crafted to elevate customer service skills for young adults and professionals through immersive, real-life scenarios.",
    date: "2023-12-18",
    year: 2023,
    category: "Games & Experiments",
    tags: ["VR", "Game Design", "Simulation", "Training"],
    roles: ["Game Designer", "Project Manager"],
    tools: ["Unity", "VR Technology", "C#", "Google Slides"],
    metrics: [
      "Finalist for Game Programming 2 Course Pitch",
      "Integrated emotional intelligence tracking system",
      "Simulated complex AI customer interactions",
    ],
    heroImage: "/legacy/assets/demopic/1.jpg",
    gallery: ["/legacy/assets/demopic/11.png", "/legacy/assets/demopic/11-a.png"],
    deliverables: ["Game Concept Pitch", "Prototype Mechanics", "Skill-tracking System"],
    sections: [
      {
        title: "The Vision",
        body: [
          "Forget boring training modules and stale textbooks. Custopia drops you into the heart of the action, where you'll navigate a vibrant, interactive world brimming with real-life customer service scenarios.",
          "Whether you're charming a grumpy gamer in a virtual electronics store or calming a frustrated traveler at a bustling airport check-in, Custopia lets you hone your skills in a way that's both exhilarating and effective.",
        ],
      },
      {
        title: "The Revolution",
        body: [
          "Custopia throws open the doors to a customer service training revolution. Master complex conversations with dynamic AI customers, solve curveball problems from malfunctioning gadgets to misplaced luggage, and hone your emotional intelligence with a unique skill-tracking system.",
          "As you climb the virtual career ladder, unlocking new roles and skills, Custopia builds not just confidence, but a tangible resume of service prowess.",
        ],
      },
      {
        title: "Impact & Change",
        body: [
          "We crafted Custopia not just for a thrilling gaming experience, but to ignite a revolution in customer service training. It's more than just pixels and polygons; it's a platform brimming with the potential to tackle crucial Sustainable Development Goals (SDGs).",
          "By fostering a generation of empathetic, skilled service professionals, we can cultivate a kinder, more understanding world. Picture restaurants free from frustrated diners and businesses thriving on genuine connections.",
        ],
      },
    ],
  },
  {
    slug: "createx-usls-posters",
    projectId: "createx",
    title: "CreateX by Artist Hub USLS",
    subtitle: "Beyond the Canvas: Shaping Artist Hub's Visual Narrative",
    summary:
      "Lead Designer for a series of art workshops for children held by the USLS Artists' Hub, weaving a visual tapestry that binds playful PLAYSHOP posters and sleek conference brochures.",
    date: "2023-10-05",
    year: 2023,
    category: "Branding",
    tags: ["Graphic Design", "Storytelling", "Event Promotion"],
    roles: ["Lead Designer", "Storyteller"],
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
    metrics: [
      "Designed for diverse audiences (filmmakers to kids)",
      "Collaborated with educators and artists",
      "Created a kinetic energy through visual narrative",
    ],
    heroImage: "/legacy/assets/demopic/2.png",
    gallery: ["/legacy/assets/demopic/14.jpg", "/legacy/assets/demopic/14-a.png", "/legacy/assets/demopic/CreateX Logo.png"],
    deliverables: ["Film camp posters", "Conference brochures", "Social media assets"],
    sections: [
      {
        title: "The Design Wand",
        body: [
          "In the whirlwind of color and chaos that is Artist Hub's CreateX, I am the invisible hand wielding the design wand. From playful PLAYSHOP posters to sleek conference brochures, my pixels and brushstrokes weave a visual tapestry that binds it all together.",
          "I'm not just a designer; I'm a storyteller. Each project – be it a film camp poster bursting with kinetic energy or a minimalist Artists Innovation Laboratory brochure – is a chapter in CreateX's ever-evolving saga.",
        ],
      },
      {
        title: "Collaboration & Advocacy",
        body: [
          "Collaboration became my mantra, a beautiful dance with educators, artists, and organizers where each perspective enriched the visual narrative. Hand-in-hand, we translate their visions into visual realities.",
          "CreateX wasn't just an event; it was a masterclass in adaptability, resourcefulness, and leading with an infectious passion that inspired the entire team.",
        ],
      },
    ],
  },
  {
    slug: "google-events-branding",
    projectId: "google-events",
    title: "Google Developer Events Branding",
    subtitle: "Connecting Communities through International, National, and Local Visuals",
    summary:
      "As a GDSC Lead and Co-Lead Creatives, I designed the visual identity for major Google events, bridging continents and cultures through impactful design and storytelling.",
    date: "2023-12-18",
    year: 2023,
    category: "Community & Events",
    tags: ["Community", "Google", "Event Design", "Leadership"],
    roles: ["Lead Designer", "GDSC Lead", "Co-Lead Creatives"],
    tools: ["Adobe Photoshop", "Figma", "Branding Systems"],
    metrics: [
      "800+ participants for DevFest 2023",
      "30+ GDSC partners globally for Perennial",
      "Nationwide reach for LAWIG Info Session",
    ],
    heroImage: "/legacy/assets/demopic/3.jpg",
    gallery: [
      "/legacy/assets/demopic/12.jpg",
      "/legacy/assets/demopic/12-a.png",
      "/legacy/assets/demopic/13-a.jpg",
      "/legacy/assets/demopic/13-b.jpg",
      "/legacy/assets/demopic/13-c.jpg",
    ],
    deliverables: ["Event Posters", "Branding Systems", "Social Media Kits"],
    sections: [
      {
        title: "Perennial International",
        body: [
          "Four GDSC chapters, four countries, countless connections! Led by yours truly, this two-day online extravaganza united tech enthusiasts from the Philippines, Korea, Japan, and Indonesia in a whirlwind of software exploration.",
          "Perennial wasn't just an event; it was a bridge between continents, skill levels, dreams and realities. Attendees forged bonds with GDSC chapters from around the world, sharing cultures and learning styles in a truly enriching exchange.",
        ],
      },
      {
        title: "LAWIG National",
        body: [
          "As a GDSC Lead, I dreamt of a nationwide event—a bridge across islands weaving a tapestry of Filipino tech talent. LAWIG was born in that collision of shared passion given form.",
          "The final design, a fusion of circuits and landscapes, reflects the heart of LAWIG: where tech meets the Philippines, and a thousand futures bloom.",
        ],
      },
      {
        title: "DevFest 2023 Bacolod",
        body: [
          "Google DevFest 2023 was a whirlwind of tech and cultural celebration. As Co-Lead of the GDG Bacolod community, I poured my heart and soul into making this event special.",
          "The official poster embodied the seamless blending of Negrense tradition and contemporary tech innovation symbolized by Masskara masks alongside code.",
        ],
      },
    ],
  },
  {
    slug: "valtara-elementals-quest",
    projectId: "valtara",
    title: "Valtara: The Elemental's Quest",
    subtitle: "A 2D Platformer Game Where Platforming Meets Eco-Activism",
    summary:
      "Valtara is an action-adventure platformer set in a world on the brink of ecological collapse, designed to raise awareness about global environmental issues through immersive gameplay.",
    date: "2024-03-15",
    year: 2024,
    category: "Games & Experiments",
    tags: ["Game Dev", "Eco-Activism", "Pixel Art", "Unity"],
    roles: ["Game Developer", "Level Designer"],
    tools: ["Unity", "C#", "Aseprite", "Canva"],
    metrics: [
      "Applied CSP209 Game Programming 1 skills",
      "Designed unique elemental ability swap system",
      "Integrated environmental storytelling",
    ],
    heroImage: "/legacy/assets/demopic/4.jpg",
    gallery: ["/legacy/assets/demopic/15.jpg", "/legacy/assets/demopic/15-a.gif", "/legacy/assets/demopic/watch1.gif", "/legacy/assets/demopic/billboard.gif"],
    deliverables: ["Game Mechanics Design", "Narrative Crafting", "Visual Environments", "Game Merchandise Concepts"],
    sections: [
      {
        title: "Eco-Adventure",
        body: [
          "Valtara is set in a world where greedy corporations have plundered resources, throwing the elemental spirits—Earth, Water, Air, and Fire—into disarray. Players embark on a quest to collect the spirits and restore balance.",
          "Through Valtara, I applied skills in core platforming mechanics, unique elemental systems, and environmental narrative crafting.",
        ],
      },
      {
        title: "Beyond the Screen",
        body: [
          "I envisioned expanding the reach with unique game merchandise like hoodies with elemental symbols and keychains featuring mascot creatures.",
          "Valtara is more than just a game; it's a call to action, a reminder of the delicate balance we must maintain with our own planet.",
        ],
      },
    ],
  },
  {
    slug: "pizzaporia-ui-ux-overhaul",
    projectId: "pizzaporia",
    title: "Pizzaporia: UI & UX Design Concept & Analysis",
    subtitle: "Elevating Mobile App UI/UX for an Emerging Platform",
    summary:
      "A comprehensive UI/UX overhaul of Pizzaporia, transforming a disjointed interface into an aesthetically-pleasing and seamless mobile experience focused on consistency and user goals.",
    date: "2024-07-20",
    year: 2024,
    category: "UI/UX",
    tags: ["UI Redesign", "UX Analysis", "Mobile App"],
    roles: ["UI/UX Designer", "Product Analyst"],
    tools: ["Figma", "User Research", "Prototyping", "Canva"],
    metrics: [
      "Boosted engagement by simplifying order tracking",
      "Achieved high accessibility with better color contrast",
      "Reduced visual noise for a polished interface",
    ],
    heroImage: "/legacy/assets/demopic/7-a.jpg",
    gallery: ["/legacy/assets/demopic/Pizzaporia.gif", "/legacy/assets/demopic/5-a.jpeg", "/legacy/assets/demopic/5-b.jpg", "/legacy/assets/demopic/5-c.jpg"],
    deliverables: ["UX Audit", "UI Redesign", "Interactive Prototype", "Visual Harmony System"],
    sections: [
      {
        title: "The Challenge",
        body: [
          "Upon analyzing the existing design, several pain points stood out immediately that impacted key engagement metrics. There was a lack of visual cohesion stemming from mismatched icons, fonts, and duplicate menu options.",
          "Accessibility also suffered due to low color contrast ratios in places. It felt disjointed, which I knew would lead to pronounced struggle for average customers.",
        ],
      },
      {
        title: "The Solution",
        body: [
          "I set forth to transform Pizzaporia into a seamless mobile experience. My redesign centered on consistency, reduction of visual noise, and amplification of the most crucial functions like ordering and tracking.",
          "I honed the information architecture to spotlight primary workflows and remove redundant selections. The result is a polished interface that foregrounds utility through considered presentation.",
        ],
      },
    ],
  },
  {
    slug: "smileit-web-app-mvp",
    projectId: "smileit",
    title: "SmileIT Inc. — Web App Solution",
    subtitle: "Revamping SmileIT Computer Institute's Online Presence",
    summary:
      "As CEO and Lead UI/UX Designer, I spearheaded the digital transformation of SmileIT, crafting a professional MVP to democratize access to quality IT education in Bacolod City.",
    date: "2024-01-11",
    year: 2024,
    category: "Startups & Innovation",
    tags: ["Web Dev", "CEO Role", "Digital Transformation"],
    roles: ["CEO", "Lead UI/UX Designer", "Web Developer"],
    tools: ["React", "Next.js", "Tailwind CSS", "Vercel", "Canva"],
    metrics: [
      "Successfully deployed professional MVP on Vercel",
      "Collaborative effort with developer & research teams",
      "Optimized for desktop, tablet, and mobile responsiveness",
    ],
    heroImage: "/legacy/assets/demopic/9.jpg",
    gallery: ["/legacy/assets/demopic/9-a.png", "/legacy/assets/demopic/9-b.png", "/legacy/assets/demopic/9-c.png"],
    deliverables: ["Product/Service Hub", "Responsive Web App", "Branding Identity", "Backend Integration"],
    sections: [
      {
        title: "Strategic Design",
        body: [
          "I approached the task with a user-centric mindset, ensuring that the content was informative and visually engaging. The MVP boasts a refined layout and intuitive navigation.",
          "Technical Training, Certification Preparation, and Career Development Workshops are now highlighted with visually appealing graphics and concise descriptions.",
        ],
      },
      {
        title: "Collaboration & Deployment",
        body: [
          "I paid careful attention to details, optimizing the visual hierarchy and employing a harmonious color palette. The backend integration resulted in a marriage of design and functionality.",
          "The website's deployment through Vercel ensured a visually polished and technically robust experience, representing a major step toward becoming a beacon of IT education.",
        ],
      },
    ],
  },
  {
    slug: "saucykps-bot-v1",
    projectId: "saucykps",
    title: "SaucyKPS Bot v1",
    subtitle: "Architectural Transformation of a Traditional Restaurant into a Telegram-Native Cloud Kitchen",
    summary:
      "A full-stack automation ecosystem that transforms a traditional restaurant into a 'Cloud Kitchen' model.\n\nBy utilizing Telegram as the primary infrastructure, the project eliminates 20-30% commission fees typical of third-party delivery platforms while providing a professional, automated POS experience.",
    date: "2025-11-01",
    year: 2025,
    category: "Web Development",
    tags: ["Automation", "Backend Engineering", "Telegram Bot", "Cloud Kitchen", "Full-Stack"],
    roles: ["Backend Developer", "System Architect", "Full-Stack Engineer"],
    tools: ["Node.js", "Telegram Bot API", "Supabase (PostgreSQL)", "Webhooks", "HTML5/CSS3", "JavaScript"],
    metrics: [
      "Eliminated 5-15 minute 'dead zone' in order processing",
      "Reduced order-to-rider dispatch time to <1 second",
      "Zero commission fees by bypassing third-party delivery platforms",
      "Automated identity mapping eliminates manual customer data entry",
      "Real-time receipt generation enhances customer trust",
    ],
    heroImage: "/lib/755_1x_shots_so.png",
    gallery: [
      "/lib/755_1x_shots_so.png",
      "/lib/348_1x_shots_so.png",
      "/lib/389_1x_shots_so.png",
      "/lib/719_1x_shots_so.png",
      "/lib/943_1x_shots_so.png",
    ],
    deliverables: [
      "Node.js Webhook-Driven Core Architecture",
      "Supabase/PostgreSQL Database Schema",
      "Tri-Group Dispatch Logic System",
      "Automated Receipt Generation Engine",
      "HTML5/CSS3 Admin Dashboard",
      "Customer Identity Mapping System",
    ],
    sections: [
      {
        title: "Project Genesis & Strategic Vision",
        body: [
          "The transition to an 'online-only' model for a family-owned business presented a massive operational hurdle: Communication Fragmentation. Relying on manual chat monitoring meant the business was limited by the physical speed of the person reading messages.",
          "SaucyKPS Bot v1 was developed to serve as the 'Digital Nervous System,' automating the flow of information between three distinct stakeholders: the Customer, the Kitchen, and the Delivery Fleet.",
        ],
        highlights: [
          "Eliminated Communication Bottlenecks",
          "Three-Stakeholder Automation",
          "Digital-First Restaurant Model",
        ],
      },
      {
        title: "The Problem: The 'Manual Messaging' Bottleneck",
        body: [
          "Before the implementation of SaucyKPS, the operational workflow was plagued by several critical failure points. The Relay Lag created a 5–15 minute 'dead zone' where a staff member had to manually copy order details from the customer chat and paste them into the rider group, causing food to sit getting cold.",
          "Identity Fragmentation meant there was no persistent way to track a customer's lifetime value—if a user changed their display name, their order history was effectively lost. The Verification Void left customers feeling insecure about where their money went until the food actually arrived, and Logistics Chaos saw riders 'double-pick' orders because there was no status-tracking mechanism.",
        ],
        highlights: [
          "5-15 Minute Order Processing Delay",
          "Lost Customer Identity & History",
          "No Automated Receipt System",
          "Order Status Tracking Gaps",
        ],
      },
      {
        title: "The Solution: A Modular Automation Ecosystem",
        body: [
          "Instead of using inefficient 'polling,' I built a Node.js Webhook listener that ensures the moment a customer interacts with the bot, the server receives a push notification. This architecture allows for sub-second response times, making the 'digital restaurant' feel as responsive as a physical waiter.",
          "I designed a custom SQL schema to move beyond simple chat interactions. Every user is indexed by their unique Telegram chat_id, allowing the restaurant to map @usernames to order histories, preferences, and delivery addresses—turning a chat app into a powerful Customer Relationship Management (CRM) tool.",
          "I engineered a complex message-routing logic that manages three separate environments simultaneously: Customer DMs for private receipt delivery and order status updates, Kitchen/Admin Dashboard as a lightweight HTML5/CSS3 interface where the owner accepts or rejects orders, and Rider Logistics Group as an automated dispatch feed that instantly notifies all available riders when an order is ready.",
        ],
        highlights: [
          "Webhook-Driven Core (Sub-Second Response)",
          "PostgreSQL Identity Persistence",
          "Tri-Group Dispatch Logic",
          "CRM Integration via Telegram",
        ],
      },
      {
        title: "Technical Implementation: The Automation Flow",
        body: [
          "The automation flow begins when a customer triggers the bot via a /start or /menu command. The bot checks the Supabase database—if new, it captures the chat_id and @username. The web dashboard updates in real-time to show the incoming request.",
          "Upon admin approval, the bot executes a sendMessage request to the Rider Group Chat ID, tagging the order as [UNCLAIMED]. Simultaneously, a professionally formatted Digital Receipt is sent to the customer's private messages, including a timestamped Order ID.",
          "The tech stack leverages Node.js as the runtime, PostgreSQL (via Supabase) for database persistence, HTML5/CSS3 for the Admin Dashboard frontend, and Telegram Bot API with Webhooks for real-time integration. The entire system is deployed via a Git-based workflow with npm dependency management.",
        ],
        highlights: [
          "Step-by-Step Automation Workflow",
          "Real-Time Dashboard Updates",
          "Automated Dispatch Ticket Generation",
          "Timestamped Order Receipts",
        ],
      },
      {
        title: "Impact & Conclusion",
        body: [
          "The SaucyKPS Bot v1 transformed a chaotic group chat into a structured, data-driven enterprise. It successfully eliminated the 'Manual Dispatcher' role, allowing the restaurant to redirect labor costs into food quality and faster delivery times.",
          "This project demonstrates that custom-built automation can empower small family businesses to compete effectively in the digital marketplace, providing them with professional-grade tools typically reserved for larger operations.",
        ],
        highlights: [
          "Eliminated Manual Dispatcher Role",
          "Structured Data-Driven Operations",
          "Cost Redirection to Food Quality",
          "Professional Tools for Small Business",
        ],
      },
    ],
  },
  {
    slug: "gdg-bacolod-community-platform",
    projectId: "gdg-bacolod",
    title: "GDG Bacolod Community Platform",
    subtitle: "Community-Driven Software for Developer Chapter Management",
    summary:
      "A web application built to serve as the digital home for the Google Developer Group (GDG) Bacolod chapter.\n\nAs someone who organized events and managed creatives, I noticed how much time was spent on manual tasks like creating certificates and tracking event history. This platform automates those everyday community management tasks.",
    date: "2025-01-15",
    year: 2025,
    category: "Web Development",
    tags: ["Full-Stack", "React", "Firebase", "Community Platform", "CMS"],
    roles: ["Full-Stack Developer", "UI/UX Designer", "Community Organizer"],
    tools: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Firebase Firestore", "html-to-image", "jsPDF", "Vercel"],
    metrics: [
      "Automated certificate generation saves time for organizers",
      "Centralized archive preserves event history and moments",
      "Offline-ready fallback for venues with poor connectivity",
      "Multi-format certificate export (PNG & PDF)",
      "Public validation portal for certificate verification",
    ],
    heroImage: "/lib/982_1x_shots_so.png",
    gallery: [
      "/lib/982_1x_shots_so.png",
      "/lib/43_1x_shots_so.png",
      "/lib/201_1x_shots_so.png",
    ],
    deliverables: [
      "Public Marketing Site with Events & Moments Gallery",
      "Automated Certificate Generation System",
      "Admin CMS Dashboard",
      "Certificate Validation Portal",
      "Firebase & LocalStorage Hybrid Storage",
      "Responsive Design with Dark/Light Mode",
    ],
    sections: [
      {
        title: "Why I Built This",
        body: [
          "As someone who helped organize events for GDG on Campus (USLS) and worked on creatives for GDG Bacolod from 2022 to 2025, I noticed how much time we spent on things that could be automated. Creating certificates by hand, copying event details between different places, and trying to keep track of who attended what—it all added up.",
          "I thought it would be nice to have one place where everything lives. A website that shows upcoming events, a gallery of past moments so people can remember the fun times, and a way to create certificates without opening design software every time. This platform was my attempt to make those tasks a little easier.",
        ],
        highlights: [
          "Built from Real Organizer Experience",
          "Addresses Actual Community Needs",
          "Personal Project for the Chapter",
        ],
      },
      {
        title: "The Problems It Tries to Solve",
        body: [
          "When you're running a community over several years, data gets scattered. Event photos end up in different folders, certificate designs don't have consistent metadata, and it's hard to verify if someone actually attended an event months later.",
          "I also noticed that after an event ends, the excitement fades quickly. Without a place to archive those moments, the energy and memories from great workshops or meetups would just disappear. The platform tries to keep those memories alive in a 'Moments' gallery that organizers can update.",
          "The certificate system was built because manually designing certificates for each event takes time, and sometimes the designs don't include the information needed to verify them later. The platform lets organizers create templates once and then generate certificates with unique IDs that can be verified online.",
        ],
        highlights: [
          "Centralized Data Management",
          "Historical Event Preservation",
          "Automated Certificate Generation",
        ],
      },
      {
        title: "How It Works",
        body: [
          "The platform has three main parts. First, there's a public website that shows upcoming events, past moments in a gallery, information about the team, and partner logos. It uses Google's design language because it's for a Google Developer Group, and it has both light and dark modes because people have different preferences.",
          "Second, there's a certificate system. Organizers can create templates by uploading a background image and setting where names should appear. When it's time to issue certificates, they can upload a list of names and the system generates certificates in both PNG (for sharing online) and PDF (for printing). Each certificate gets a unique ID that people can use to verify it later.",
          "Third, there's a simple admin area where organizers can add or update events, team members, and partners without needing to edit code. The platform works with Firebase when it's set up, but it can also use LocalStorage as a backup, which means it can work even if there's no internet connection during an event.",
        ],
        highlights: [
          "Public Marketing Site",
          "Certificate Generation & Validation",
          "Simple Admin Dashboard",
        ],
      },
      {
        title: "Technical Approach",
        body: [
          "I built it with React 19 and TypeScript because I wanted type safety and the latest React features. Vite makes development fast, and Tailwind CSS v4 helps with styling using Google's official color tokens.",
          "For certificates, I use html-to-image to convert the certificate design into a PNG, and jsPDF to create PDF versions. The system scales images up so they look good when printed, not just on screens.",
          "The data layer uses an abstract pattern so the same code works whether you're using Firebase or LocalStorage. This means organizers can test things locally or use it at events where internet might be spotty, and it will still work.",
        ],
        highlights: [
          "React 19 with TypeScript",
          "Hybrid Storage (Firebase + LocalStorage)",
          "Print-Ready Certificate Export",
        ],
      },
      {
        title: "Special Features for Bacolod",
        body: [
          "This isn't just generic community software—I tried to make it fit how GDG Bacolod actually works. For example, there's a 'Community Partners' tier specifically for local university organizations and tech startups in Bacolod, which is different from the standard sponsor tiers.",
          "The Moments gallery is set up to preserve four years of history (2022-2025), so future organizers can see what the chapter has accomplished and learn from past events. It's a way to keep the community's story alive.",
          "There's also a ShareCard feature that creates images optimized for Instagram Stories and Twitter, so when people share their certificates, it looks nice and includes a link back to the validation portal. This helps spread awareness about the chapter naturally.",
        ],
        highlights: [
          "Localized for Bacolod Tech Ecosystem",
          "Historical Archive (2022-2025)",
          "Social Media Share Cards",
        ],
      },
      {
        title: "What I Learned",
        body: [
          "Building this taught me a lot about what organizers actually need versus what seems cool to build. Sometimes the simplest solution—like using LocalStorage as a fallback—is the most useful because it means the platform works even when things don't go perfectly.",
          "I also learned that making something for a community you're part of is different from building for clients. You understand the real problems because you've lived them. The platform isn't perfect, and there are things I'd do differently now, but it was a good learning experience.",
          "The best part is seeing how it could help future organizers spend less time on administrative tasks and more time on what matters—bringing developers together and creating great events.",
        ],
        highlights: [
          "Built from Real Experience",
          "Practical Over Perfect",
          "Designed for Community Growth",
        ],
      },
    ],
  },
  {
    slug: "slick-store-ecommerce-platform",
    projectId: "slick-store",
    title: "Slick Store — Full‑Stack Sneaker Marketplace",
    subtitle: "A React + Supabase architecture study for sneaker resell flows",
    summary:
      "Slick Store is a full-stack e‑commerce prototype focused on the sneaker reselling space. It explores how to model products, variants, and orders in PostgreSQL, and how to connect that to a React + Tailwind frontend that feels similar to modern sneaker marketplaces without relying on boilerplate templates.",
    date: "2025-11-01",
    year: 2025,
    category: "Web Development",
    tags: ["E-commerce", "React", "Supabase", "Web Development", "Tailwind CSS"],
    roles: ["Full-Stack Developer", "UI/UX Designer"],
    tools: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase (PostgreSQL, Auth, Storage)", "Vercel"],
    metrics: [
      "Relational schema for products, variants, and orders in PostgreSQL",
      "Inventory updates scoped to specific size variants",
      "Supabase-backed authentication for shopper accounts",
      "Cart and checkout flow connected to real database records",
      "Client-side filters for brand, size, and price without full page reloads",
    ],
    heroImage: "/lib/64shots_so.png",
    gallery: [
      "/lib/64shots_so.png",
      "/lib/13shots_so.png",
      "/lib/115shots_so.png",
    ],
    deliverables: [
      "Sneaker-focused product catalog UI",
      "Supabase schema for products, users, and carts",
      "Filtering and search experience",
      "Cart and checkout pages",
      "Responsive layout and theming",
    ],
    sections: [
      {
        title: "Executive Summary",
        body: [
          "Slick Store started as a way to study what a sneaker-focused marketplace needs at both the database and UI level. The goal was not to launch a live store, but to see how far I could go in modeling products, sizes, and orders while keeping the frontend simple and fast.",
          "Instead of using a generic e‑commerce template, I designed a schema and React components specifically for sneakers, where sizes, colorways, and high-resolution images matter a lot.",
        ],
        highlights: [
          "Sneaker-specific e‑commerce prototype",
          "Focus on data modeling and UX together",
          "Built as a learning and architecture project",
        ],
      },
      {
        title: "Problem: The Reseller’s Friction",
        body: [
          "In sneaker reselling, it’s common to have very limited stock for each size. If the system isn’t careful about how it updates inventory, it can accidentally allow two people to buy the same size at once.",
          "Another challenge is image handling. People want to see shoes clearly from different angles, but serving lots of large images can slow things down if they aren’t stored and loaded properly.",
          "Finally, a single shoe model can have many colorways and size runs. Trying to manage everything in a flat products table quickly becomes hard to reason about, especially when connecting orders back to specific sizes.",
        ],
        highlights: [
          "Per-size inventory constraints",
          "Need for clear, high-quality imagery",
          "Complex product and variant relationships",
        ],
      },
      {
        title: "Solution: Headless Full‑Stack Architecture",
        body: [
          "I used a React + Supabase stack so the frontend stays focused on rendering and interaction, while the backend is responsible for relational logic and data integrity.",
          "In PostgreSQL (through Supabase), I split the data into Products, Variants, and Orders. Products store shared information like SKU, brand, and model. Variants represent specific size and colorway combinations with their own stock counts. Orders then link a user to one or more variants.",
          "On the frontend, TypeScript types mirror this structure, so components know exactly what fields to expect and can show the right information without guessing.",
        ],
        highlights: [
          "Products / Variants / Orders separation",
          "Typed end‑to‑end data flow with TypeScript",
          "React frontend talking to Supabase via headless APIs",
        ],
      },
      {
        title: "Technical Implementation Details",
        body: [
          "When a user checks out, the app calls a Supabase edge function (or transaction-like sequence) that checks variant stock, updates it, and records an order entry. If any step fails, the operation is cancelled so the stock doesn’t go negative.",
          "Supabase Row Level Security (RLS) is used so that users can only see their own orders, while admin accounts can manage products and prices. This keeps read and write access clear and avoids mixing admin logic into the frontend.",
          "The UI is built with React, TypeScript, Vite, and Tailwind CSS. Product grids use consistent aspect ratios so different silhouettes still look tidy. Filtering is handled on the client using data fetched from Supabase, which keeps navigation feeling quick.",
        ],
        highlights: [
          "Atomic-style inventory updates for variants",
          "RLS policies for user vs. admin access",
          "Client-side filtering and Tailwind-based layout",
        ],
      },
      {
        title: "SWOT & Reflections",
        body: [
          "A clear schema and type-safe stack are definite strengths: they made it easier to reason about inventory and cart behavior. Using Supabase also simplified auth and storage so I could focus on the sneaker experience itself.",
          "At the same time, the platform still relies on manual data entry for products and doesn’t include real payment processing yet. Features like price history charts or Stripe integration are ideas for the future rather than things that are live today.",
          "Overall, Slick Store gave me a gentle but realistic look at what it takes to design an e‑commerce architecture that respects both data integrity and a pleasant browsing experience.",
        ],
        highlights: [
          "Strong data integrity and typing",
          "Room to grow into payments and analytics",
          "Better understanding of marketplace trade‑offs",
        ],
      },
    ],
  },
  {
    slug: "capture-pixels-photography-portfolio",
    projectId: "capture-pixels",
    title: "Capture Pixels — Photography Portfolio Platform",
    subtitle: "Engineering a Cinematic 3D Photography Ecosystem",
    summary:
      "A high-performance, full-stack photography portfolio designed to push the boundaries of modern web aesthetics. Built with Next.js 16 and React 19, the platform shifts away from static galleries toward a physics-based, interactive media experience.\n\nIt serves as a professional showcase that combines cutting-edge 3D mathematics with a robust, custom-built Content Management System (CMS).",
    date: "2025-12-15",
    year: 2025,
    category: "Web Development",
    tags: ["Next.js", "React 19", "3D Graphics", "CMS", "Supabase", "Full-Stack"],
    roles: ["Full-Stack Developer", "UI/UX Designer", "Frontend Engineer"],
    tools: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion 12", "Supabase (PostgreSQL)", "Radix UI", "shadcn/ui", "Vercel"],
    metrics: [
      "60fps 3D animations provide premium 'luxury' feel",
      "Zero-friction content management workflow for non-technical users",
      "Instant revalidation ensures global updates within milliseconds",
      "High-performance Core Web Vitals (LCP/CLS) maintained",
      "Secure admin dashboard with HTTP-only cookies and middleware protection",
    ],
    heroImage: "/lib/96shots_so.png",
    gallery: [
      "/lib/96shots_so.png",
      "/lib/638shots_so.png",
      "/lib/217shots_so.png",
      "/lib/724shots_so.png",
      "/lib/953shots_so.png",
    ],
    deliverables: [
      "Scroll-Expand Hero with physics-based transitions",
      "3D Cylindrical Carousel with momentum physics",
      "3D Sphere Image Grid using Fibonacci distribution",
      "Custom Admin Dashboard & CMS with full CRUD",
      "Spring-Physics Custom Cursor",
      "Spotlight Glow Effects with real-time cursor tracking",
    ],
    sections: [
      {
        title: "Executive Summary",
        body: [
          "The mission was to create a digital gallery that mirrors the premium quality of high-end photography through cinematic motion and 3D spatial interfaces. The innovation centers on developing a proprietary 3D Sphere Image Grid using Fibonacci distribution and a Cylindrical Carousel driven by custom momentum physics.",
          "The core impact achieved is a 'Zero-Friction' content management workflow, allowing non-technical users to update complex 3D galleries in real-time via a secure admin dashboard. This shifts the platform away from static galleries toward a physics-based, interactive media experience.",
        ],
        highlights: [
          "Cinematic motion and 3D spatial interfaces",
          "Proprietary Fibonacci sphere distribution algorithm",
          "Zero-friction content management workflow",
        ],
      },
      {
        title: "Problem Statement: The 'Static Portfolio' Crisis",
        body: [
          "Standard photography portfolios often suffer from three major issues. First, passive UX: typical grids feel repetitive and fail to capture the user's attention in a crowded digital market. This makes it difficult for photographers to stand out and engage viewers.",
          "Second, performance vs. visuals: high-resolution images often lead to poor Core Web Vitals (LCP/CLS), resulting in a sluggish experience. Many portfolios sacrifice either image quality or loading speed, but rarely achieve both.",
          "Third, CMS rigidity: most 'beautiful' sites are hardcoded. Changing a single image often requires developer intervention, making it difficult for photographers to keep their work current. This creates a barrier between the photographer and their own portfolio.",
        ],
        highlights: [
          "Passive UX fails to engage users",
          "Performance vs. visual quality trade-offs",
          "Hardcoded sites require developer intervention",
        ],
      },
      {
        title: "The Solution: Physics-Based Visual Engineering",
        body: [
          "I architected Capture Pixels as a 'living' document where every interaction feels tactile and responsive. The platform combines cutting-edge 3D mathematics with a robust, custom-built Content Management System.",
        ],
        highlights: [
          "Tactile and responsive interactions",
          "3D mathematics integration",
          "Custom-built CMS",
        ],
      },
      {
        title: "3D Spatial Interfaces: The Mathematics of UI",
        body: [
          "Instead of a random cluster, I implemented a mathematical algorithm to distribute images evenly across a virtual 3D sphere. The Fibonacci Sphere Distribution ensures no overlaps and a perfectly symmetrical rotation regardless of the number of items. This creates a visually balanced and mathematically precise layout.",
          "Both the 3D Sphere and the Cylindrical Carousel use a custom-coded physics engine. Using velocity-based decay, the interface continues to rotate naturally after a user 'flicks' the screen, mimicking real-world inertia. This creates a natural, tactile feeling that responds to user input with realistic motion.",
        ],
        highlights: [
          "Fibonacci sphere distribution algorithm",
          "Custom momentum physics engine",
          "Velocity-based decay for natural motion",
        ],
      },
      {
        title: "Cinematic Scroll Orchestration",
        body: [
          "Using Framer Motion 12, I engineered a Scroll-Expand Hero section that expands from a centered container to a full-screen cinematic view based on scroll depth. This creates a dramatic, editorial-style reveal that draws users into the content.",
          "This is paired with 'Text-Splitting' logic that animates individual characters with mix-blend-mode for a high-end fashion editorial feel. The combination creates a premium, cinematic experience that elevates the perceived quality of the photography work.",
        ],
        highlights: [
          "Scroll-triggered full-screen expansion",
          "Text-splitting with mix-blend-mode",
          "Editorial-style cinematic reveals",
        ],
      },
      {
        title: "The 'Headless' Admin Engine",
        body: [
          "I utilized Next.js Server Actions to build a secure CRUD (Create, Read, Update, Delete) system. This allows photographers to manage projects, testimonials, and gallery content without needing to edit code or understand technical systems.",
          "When an image is uploaded to the Supabase backend, the site uses revalidatePath to clear the server cache globally. This ensures the 3D galleries update for all users within milliseconds of the admin's action, creating a seamless content management experience.",
          "Security is implemented through HTTP-only cookies and middleware-based route protection. The custom middleware intercepts every request to the /admin route, verifying the session on the server-side before rendering a single pixel of the dashboard. This mitigates XSS (Cross-Site Scripting) risks and ensures administrative data remains private.",
        ],
        highlights: [
          "Next.js Server Actions for secure CRUD",
          "Instant global cache revalidation",
          "HTTP-only cookies and middleware protection",
        ],
      },
      {
        title: "SWOT Analysis",
        body: [
          "Strengths include high fidelity 60fps 3D animations that provide a premium 'luxury' feel, a modern stack using the latest React 19 features (Actions, Use, etc.), and a full CMS that provides complete independence from code for content updates.",
          "Weaknesses include GPU load from heavy 3D calculations that can drain battery on older mobile devices, and complexity where mathematical algorithms require deep maintenance knowledge.",
          "Opportunities include VR/AR port where 3D logic is pre-optimized for future WebXR integration, and AI curation for future integration of AI-based image tagging and sorting.",
          "Threats include browser compatibility where some advanced CSS 3D transforms vary by engine, and platform bloat where adding too many 3D elements could impact LCP (Largest Contentful Paint).",
        ],
        highlights: [
          "High-fidelity 60fps animations",
          "GPU load considerations for mobile",
          "Future VR/AR integration potential",
          "Browser compatibility challenges",
        ],
      },
      {
        title: "Technical Implementation: Deep Dive",
        body: [
          "The physics engine uses natural motion that isn't just CSS transitions. I used a RequestAnimationFrame loop to track pointer velocity (how fast the user moves their mouse or finger), spring damping (a friction coefficient that gradually slows the rotation), and boundary logic (collision detection that keeps the 3D elements within the viewport limits).",
          "Security and authentication are implemented through HTTP-only cookies that cannot be accessed by client-side scripts, mitigating XSS risks. A custom middleware protection layer intercepts every request to the /admin route, verifying the session on the server-side before rendering a single pixel of the dashboard.",
        ],
        highlights: [
          "RequestAnimationFrame physics loop",
          "Pointer velocity and spring damping",
          "HTTP-only cookies for security",
          "Server-side session verification",
        ],
      },
      {
        title: "Results & Conclusion",
        body: [
          "Capture Pixels stands as a benchmark for what is possible with modern web technologies. It proves that high-resolution media and complex 3D graphics can coexist with high performance.",
          "Zero-lag navigation was achieved through efficient re-renders with React.memo, ensuring smooth interactions even with complex visual effects. The photographer can now manage five different 3D sections through one unified interface, creating scalable content management.",
          "The site's technical sophistication directly translates to the professional perceived value of the photography work displayed. The platform elevates the brand by demonstrating that advanced visual effects don't have to come at the cost of performance or usability.",
        ],
        highlights: [
          "Zero-lag navigation with React.memo",
          "Scalable content management",
          "Brand elevation through technical sophistication",
        ],
      },
    ],
  },
  {
    slug: "signalin-accessibility-startup",
    projectId: "signalin",
    title: "Signalin: Accessibility App Concept",
    subtitle: "Helping Hearing & Speech Impaired Individuals Connect",
    summary:
      "As CEO and Project Manager, I developed Signalin to bridge communication gaps for the deaf and hard-of-hearing community, leading the project to become a regional startup finalist.",
    date: "2023-01-10",
    year: 2023,
    category: "Startups & Innovation",
    tags: ["Startup", "Inclusivity", "Social Impact", "Pitching"],
    roles: ["CEO", "Project Manager", "UI Designer"],
    tools: ["Figma", "Pitch Deck Design", "UX Strategy", "Canva"],
    metrics: [
      "Finalist for the Regional Startup Challenge",
      "Caters to an underserved accessibility demographic",
      "Advocated for positive change through design",
    ],
    heroImage: "/legacy/assets/demopic/10.jpg",
    gallery: ["/legacy/assets/demopic/10-a.png", "/legacy/assets/demopic/10-b.png", "/legacy/assets/demopic/10-c.jpg"],
    deliverables: ["Startup Pitch Deck", "UI Mockups", "Mission Strategy", "Accessibility Roadmap"],
    sections: [
      {
        title: "Championing a Cause",
        body: [
          "In my dual role, I'm not just shaping the visuals; I'm championing a cause. Signalin addresses a significant gap in accessibility, offering a solution to enhance connectivity for a demographic that often faces barriers.",
          "Signalin's vision transcends the creation of just another app; it's about fostering inclusivity and breaking down communication barriers through human-centered design.",
        ],
      },
      {
        title: "The Pitch & Impact",
        body: [
          "I approached the pitch with a blend of confidence and enthusiasm, creating UI design mockups that go beyond the aesthetic to reinforce the importance of our mission.",
          "The journey to the finals was about advocating for Signalin's potential to redefine accessibility and communication for a community that truly deserves it.",
        ],
      },
    ],
  },
  {
    slug: "devfest-2023-hosting",
    projectId: "devfest-2023",
    title: "DevFest 2023: Bacolod Tech Takeover",
    subtitle: "Hosting and Organizing Bacolod's Biggest Tech Event",
    summary:
      "As Acting President of DEVCON Bacolod and Co-Lead Creatives, I hosted Day 1 of DevFest 2023 and designed the main event visuals, celebrating a vibrant tech community of over 800 participants.",
    date: "2023-10-08",
    year: 2023,
    category: "Community & Events",
    tags: ["Hosting", "Public Speaking", "Community Lead"],
    roles: ["Event Host", "Creatives Lead", "Acting President DEVCON"],
    tools: ["Public Speaking", "Event Management", "Graphic Design", "Canva"],
    metrics: [
      "800+ participants and curious passersby",
      "Main event poster plastered across Ayala Malls",
      "Guided sessions on AI, animation, and more",
    ],
    heroImage: "/legacy/assets/demopic/8.jpg",
    gallery: ["/legacy/assets/demopic/16-c.jpg", "/legacy/assets/demopic/16-e.jpg", "/legacy/assets/demopic/16-b.jpg", "/legacy/assets/demopic/16-d.jpg"],
    deliverables: ["Main Event Poster", "Fireside Chat Insights", "Community Engagement Strategy"],
    sections: [
      {
        title: "Tech Takeover",
        body: [
          "DEVFEST 2023 was more than just an event; it was a movement. I whipped up the main event poster, a vibrant explosion of colors and code that captured the essence of technology and creativity.",
          "As emcee, I guided the audience through a whirlwind of talks by amazing Filipino speakers, from cutting-edge AI to breathtaking animation, each session leaving us itching to innovate.",
        ],
      },
      {
        title: "Fireside Insights",
        body: [
          "A personal highlight was sharing my journey as a GDSC Lead in a fireside chat. Watching the spark of inspiration ignite in the eyes of future leaders was truly rewarding.",
          "DevFest 2023 proved that Bacolod is no mere audience; we are the architects building a future powered by passion and pixels, one virtual interaction at a time.",
        ],
      },
    ],
  },
  {
    slug: "mobile-app-redesign-suite",
    projectId: "app-redesigns",
    title: "UI/UX Analysis and Design for Existing Applications",
    subtitle: "Optimizing ILOVEUSAM, Metrobank, and Peddlr",
    summary:
      "Tasked with restyling and optimizing three popular apps, I leveraged expertise in layout and visual hierarchy to align them with modern design best practices and improve key metrics.",
    date: "2024-01-11",
    year: 2024,
    category: "UI/UX",
    tags: ["Redesign", "Visual Hierarchy", "Usability"],
    roles: ["UI/UX Designer"],
    tools: ["Figma", "Redesign Strategy", "Canva"],
    metrics: [
      "Improved first impressions for Metrobank login",
      "Simplified service discovery for ILOVEUSAM",
      "Uniform UI styles established across all platforms",
    ],
    heroImage: "/legacy/assets/demopic/7.jpg",
    gallery: ["/legacy/assets/demopic/6.jpg", "/legacy/assets/demopic/Metrobank.gif", "/legacy/assets/demopic/IloveUsam.gif"],
    deliverables: ["App Redesigns", "Style Guides", "Usability Enhancements", "Interactive Walkthroughs"],
    sections: [
      {
        title: "The Suite",
        body: [
          "For Metrobank, I created a welcoming login to improve first impressions while typography and color changes boosted readability. For ILOVEUSAM, I reimagined the home screen to simplify discoverability of services.",
          "Across all designs, I established uniform UI styles, intuitive flows, and purposeful visuals that put critical functions front and center, imbuing the apps with a professional polish.",
        ],
      },
      {
        title: "Impact & Polish",
        body: [
          "The cleaner interfaces lower learning curves and improve key tasks from browsing services to tracking finances. It was highly rewarding to lend my UI/UX skillset towards enhancing these key mobile experiences.",
          "These reimagined versions represent major usability upgrades poised to better serve user needs, making each solution feel welcoming, purposeful and focused.",
        ],
      },
    ],
  },
  {
    slug: "gdsc-usls-journey-2022",
    projectId: "gdsc-2022",
    title: "My Google Developer Journey",
    subtitle: "From a Team of Eight to a Global Force",
    summary:
      "Led the Google Developer Student Clubs at USLS from a small group to a global force, achieving unprecedented milestones in community building and international collaboration.",
    date: "2022-12-31",
    year: 2022,
    category: "Community & Events",
    tags: ["Leadership", "Google DSC", "Growth", "Impact"],
    roles: ["Lead", "CEO", "Event Organizer"],
    tools: ["Leadership", "Community Building", "Project Management", "AR Technology"],
    metrics: [
      "Grew membership from 8 to 150+ in one month",
      "Organized 30+ events with 5,000+ participants",
      "First chapter globally to host an International GDSC Collab",
    ],
    heroImage: "/legacy/assets/demopic/5.jpg",
    gallery: ["/legacy/assets/demopic/5-a.jpeg", "/legacy/assets/demopic/5-d.jpg", "/legacy/assets/demopic/5-e.jpg", "/legacy/assets/demopic/5-f.jpg"],
    deliverables: ["Hierarchical Core Team System", "International Collaboration", "AR-tracked Events", "Digital Abode Hub"],
    sections: [
      {
        title: "A Global Force",
        body: [
          "GDSC-USLS achieved an unprecedented feat by becoming the first chapter worldwide to host an International GDSC Chapters Collaboration, titled 'Perennial.'",
          "Breaking new ground, we were the first GDSC chapter globally to utilize 3D humanoid avatars and AR tracking technology for immersive events.",
        ],
      },
      {
        title: "Accolades & Impact",
        body: [
          "Recognized as the Most Outstanding Emerging Student Organization, surpassing 40+ clubs. We posted over 1,000 photo documentations and created 30+ videos in half a year.",
          "Partnered with Zuitt for free coding bootcamps and collaborated with local artists to celebrate the GDSC-USLS spirit through music and technology.",
        ],
      },
    ],
  },
  {
    slug: "behind-the-scenes-event-posters",
    projectId: "leigh-collaboration",
    title: "Behind-the-Scenes: Event Poster Magic",
    subtitle: "A Design Duo's Journey in Crafting Creativity",
    summary:
      "A deep dive into the collaborative process between Leigh Andrew Eslawa and Gian Aibo, exploring how a blend of organized aesthetics and spontaneous creativity produces captivating brand-aligned posters.",
    date: "2024-01-12",
    year: 2024,
    category: "Branding",
    tags: ["Collaboration", "Graphic Design", "Mentorship", "Process"],
    roles: ["Creative Director", "CEO", "Mentor"],
    tools: ["Discord", "Adobe Photoshop", "GDSC Branding"],
    metrics: [
      "Mentored a Design Officer to Lead Designer transition",
      "Unified 4-color GDSC branding across all collateral",
      "Executed 10+ high-impact international event posters",
    ],
    heroImage: "/legacy/assets/demopic/17-a.jpg",
    gallery: ["/legacy/assets/demopic/17-b.jpg", "/legacy/assets/demopic/17-f.jpg", "/legacy/assets/demopic/17-e.jpg", "/legacy/assets/demopic/17-c.png", "/legacy/assets/demopic/13.jpg"],
    deliverables: ["Countdown Poster Series", "International Event Portal Visuals", "Brand Guidelines"],
    sections: [
      {
        title: "Collaborative Synergy",
        body: [
          "Our process kicks off with dynamic brainstorming on Discord. As a team, we deconstruct traditional themes and challenge stereotypes, finding a balance in strengths with Gian refining expansive ideas.",
          "Our collaboration goes beyond virtual calls, resulting in posters that not only spark creativity but maintain a seamless alignment with brand values.",
        ],
      },
      {
        title: "Order vs. Chaos",
        body: [
          "What set our collaboration apart was the perfect blend of design sensibilities. Gian's preference for organized aesthetics provided a solid framework, while Leigh's inclination towards a more chaotic approach added spontaneity.",
          "This interplay between order and chaos brought a distinctive creativity to event posters like 'Perennial,' where we envisioned a whimsical theme of humankind's creations enduring beyond existence.",
        ],
      },
    ],
  },
  {
    slug: "portfolio-2026-making-of",
    projectId: "portfolio-2026",
    title: "THE MAKING OF GIAN AIBO 2026",
    subtitle: "Designing a World-Class Digital Experience",
    summary:
      "A meta-study on the engineering and design choices behind this very website. Combining Next.js 16, custom GLSL shaders, and MacOS-inspired glassmorphism to create a high-end digital experience that pushes the boundaries of traditional portfolio design.",
    date: "2025-12-23",
    year: 2025,
    category: "UI/UX",
    tags: ["Technical Lead", "GLSL Shaders", "Next.js 16", "Apple Design"],
    roles: ["Architect", "Shader Artist", "Lead Developer"],
    tools: ["React 19", "Three.js", "Framer Motion", "GSAP", "PostCSS 4"],
    metrics: [
      "Real-time GPU-based theme switching",
      "Interactive 3D folder navigation system",
      "Zero-flash theme persistence using sessionStorage",
      "Sub-100ms interaction latency across all WebGL nodes",
    ],
    heroImage: "/portfolio-screenshots/hero-desktop.jpg",
    gallery: [
      "/portfolio-screenshots/hero-mobile.jpg",
      "/portfolio-screenshots/projects-page.jpg",
      "/portfolio-screenshots/blog-page.jpg",
      "/portfolio-screenshots/case-study-detail.jpg",
    ],
    deliverables: [
      "Custom WebGL 2.0 Loader",
      "Theme-Interpolating Fragment Shader",
      "MacOS Control Center Mobile UI",
      "Dynamic Case Study Engine",
    ],
    sections: [
      {
        title: "The Vision: Beyond the Grid",
        body: [
          "Standard portfolios are grids. This is an environment. I wanted to build a digital workspace that felt like an extension of the MacOS philosophy—clean, functional, and imbued with 'silent chaos.'",
          "The core challenge was balancing heavy WebGL processing with SEO-optimized React content. I utilized Next.js 16's server-first approach to ensure the 'editorial' content remains crawlable, while layering client-side interactive nodes for the visual flare.",
        ],
        highlights: ["Apple-inspired Glassmorphism", "GPU-accelerated Layouts", "Editorial Typography"],
      },
      {
        title: "The Visuals: GPU-Native Storytelling",
        body: [
          "The Hero section isn't just an image—it's a real-time GPU calculation. I wrote an Adaptive Wave Shader that doesn't just change color when you toggle Light/Dark mode; it interpolates the noise vectors and lighting values within the fragment shader to ensure a seamless transition.",
          "The LightSpeed loader (created by @atzedent and refined for this project) utilizes WebGL 2.0 to create a warp-speed entrance, setting the tone for a high-performance visit.",
        ],
        highlights: ["Custom Fragment Shaders", "Real-time Theme Interpolation", "LightSpeed WebGL Entry"],
      },
      {
        title: "The Interaction: Physics & Tactility",
        body: [
          "Navigation is handled by a custom MacOS-style menu bar, complete with a functional Clock and a mobile-exclusive Control Center. I replaced traditional buttons with high-end glass nodes that respond to user mouse movements via a global Canvas mouse-trail system.",
          "The 'Projects' loading state is a custom Particle Field. It's not just a spinner; it's a playground. By holding the Spacebar (or long-pressing on mobile), users can pause the progress and manipulate the particles, turning a moment of 'waiting' into a moment of 'play.'",
        ],
        highlights: ["Holding Space to Play", "Particle Physics Canvas", "MacOS Control Center UI"],
      },
      {
        title: "The Stack: 2026 Ready",
        body: [
          "Technically, the site is a powerhouse. It uses React 19 for the UI, Framer Motion for the physics, and GSAP for the timeline orchestration. Every asset is optimized via Next.js Image, and every interaction is monitored by Error Boundaries to ensure resilience against GPU failures.",
          "This website serves as a living document of my capabilities—merging code-driven engineering with designer-grade artistry.",
        ],
        highlights: ["React 19 & Next.js 16", "GSAP Timeline Orchestration", "Resilient Error Boundaries"],
      },
    ],
  },
]);

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

