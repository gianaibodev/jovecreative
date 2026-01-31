import { CaseStudy } from "../types";

export const aiEngineerExam: CaseStudy = {
    slug: "ai-engineer-exam",
    projectId: "ai-engineer-exam",
    title: "AI Engineer for Developers Associate Practical Exam",
    subtitle: "Building a Validated RAG Chatbot Ecosystem with OpenAI",
    summary:
        "A comprehensive AI engineering project that implements a full Retrieval-Augmented Generation (RAG) pipeline. The system processes raw knowledge bases into vector embeddings, performs semantic search for query retrieval, and generates validated chatbot responses with confidence scoring.",
    date: "2025-02-01",
    year: 2025,
    category: "AI & Machine Learning",
    tags: ["RAG", "Vector Embeddings", "Semantic Search", "OpenAI API", "Python"],
    roles: ["AI Engineer", "System Architect"],
    tools: ["Python", "OpenAI API", "JSON Schema", "Vector Search", "Pandas"],
    metrics: [
        "100% Validation accuracy on knowledge embeddings",
        "Sub-second semantic search retrieval",
        "Automated confidence scoring for response quality",
        "Robust JSON schema enforcement for data integrity",
    ],
    heroImage: "/projects/ai/ai-engineer-exam/images/hero.png",
    gallery: [
        "/projects/ai/ai-engineer-exam/images/hero.png",
    ],
    deliverables: [
        "Knowledge Embedding Pipeline",
        "Semantic Query Retrieval System",
        "Validated Chatbot API",
        "Comprehensive Test Suite",
    ],
    sections: [
        {
            title: "Project Scope",
            body: [
                "The goal of this project was to demonstrate proficiency in building robust AI-powered applications. It moves beyond simple prompt engineering into full-scale AI engineering, focusing on data structures, validation, and retrieval accuracy.",
                "The project is divided into three core tasks: creating a high-quality vector store from a knowledge base, implementing a semantic search engine that retrieves the most relevant context, and building a chatbot that generates responses based on that retrieved context.",
            ],
            highlights: [
                "Full RAG Pipeline Implementation",
                "Scalable Knowledge Management",
                "Enterprise-Grade Data Validation",
            ],
        },
        {
            title: "The Retrieval Engine",
            body: [
                "At the heart of the system is a sophisticated retrieval engine. Raw text from a knowledge base is converted into high-dimensional vector embeddings using OpenAI models. These embeddings are indexed to enable near-instant semantic similarity searches.",
                "When a user asks a question, the system doesn't just look for keywords; it understands the 'meaning' of the query and pulls the most relevant fragments of knowledge, which are then used to ground the AI's response.",
            ],
            highlights: [
                "OpenAI Text Embeddings",
                "Cosine Similarity Search",
                "Context-Aware Retrieval",
            ],
        },
        {
            title: "Validation & Confidence",
            body: [
                "A key differentiator of this project is its focus on reliability. Every step of the pipeline—from embedding creation to final output—is validated against strict JSON schemas. This ensures that the system is 'production-ready' and avoids common AI pitfalls like hallucination.",
                "The chatbot also calculates a confidence score for its responses, allowing the system to flag low-confidence answers and maintain high quality standards for end-users.",
            ],
            highlights: [
                "Strict Schema Validation",
                "Automated Confidence Scoring",
                "Hallucination Mitigation",
            ],
        },
    ],
};
