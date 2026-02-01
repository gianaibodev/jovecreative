import { CaseStudy } from "../types";

export const aiTravelGuide: CaseStudy = {
    slug: "ai-travel-guide-paris",
    projectId: "ai-travel-guide",
    title: "AI Travel Guide for Paris",
    subtitle:
        "Your Virtual Parisian Expert Powered by OpenAI",
    summary:
        "An AI-powered travel assistant that leverages OpenAI's GPT models to provide personalized, expert-level travel recommendations for Paris.\n\nUsing advanced prompt engineering techniques, the system maintains conversational context and delivers authentic Parisian insights—from hidden gems to local cuisine recommendations.",
    date: "2025-01-20",
    year: 2025,
    category: "AI & Machine Learning",
    tags: ["Conversational AI", "Travel Tech", "OpenAI API", "Python", "NLP"],
    roles: ["AI Engineer", "Product Developer"],
    tools: ["Python", "OpenAI API", "Jupyter Notebook"],
    metrics: [
        "Context-aware travel recommendations",
        "Multi-turn conversation support",
        "Personalized itinerary suggestions",
        "Local insights and cultural tips",
    ],
    heroImage: "/projects/ai/ai-travel-guide-paris/images/hero.png",
    gallery: [
        "/projects/ai/ai-travel-guide-paris/images/hero.png",
    ],
    deliverables: [
        "Conversational AI System",
        "OpenAI API Integration",
        "Travel Knowledge Prompt Engineering",
        "Interactive Jupyter Demo",
    ],
    sections: [
        {
            title: "The Situation: Static Travel Resources",
            body: [
                "Travelers planning a trip to Paris face information overload: thousands of blog posts, outdated guidebooks, and generic recommendations that don't account for personal preferences. Finding authentic local experiences requires hours of research.",
                "The opportunity was to create an interactive AI assistant that could answer travel questions naturally, provide personalized recommendations, and adapt to each user's interests—whether they're foodies, art lovers, or adventure seekers.",
            ],
            highlights: [
                "Information Overload Problem",
                "Personalization Gap in Travel",
                "Natural Language Interaction",
            ],
        },
        {
            title: "The Problem: Generic AI Doesn't Feel Local",
            body: [
                "A basic ChatGPT query about Paris returns generic tourist information. The challenge was engineering a system that feels like talking to a knowledgeable local friend—someone who knows the best croissants in Le Marais, the optimal museum visiting times, and the neighborhoods tourists should avoid.",
                "The key problems to solve: establishing a consistent persona, injecting domain-specific knowledge, and maintaining context across a multi-turn conversation.",
            ],
            highlights: [
                "Generic AI Responses",
                "Persona Consistency Challenge",
                "Context Retention Across Turns",
            ],
        },
        {
            title: "The Solution: Persona-Based Prompt Engineering",
            body: [
                "I designed a system prompt that establishes the AI as a Parisian local with specific personality traits and deep knowledge of the city. The prompt includes instructions for conversational style, areas of expertise, and how to handle different types of queries.",
                "The persona approach creates a more engaging experience than generic Q&A, making travelers feel like they have a personal guide rather than a search engine.",
            ],
            highlights: [
                "System Prompt Architecture",
                "Persona Engineering",
                "Expertise Domain Definition",
            ],
        },
        {
            title: "System Prompt: Creating Marie",
            body: [
                "The system prompt establishes 'Marie', a lifelong Parisian art curator, as the AI persona. The prompt defines her expertise areas, communication style, and behavioral guidelines:",
                "```python\nimport openai\nfrom typing import List, Dict\n\nSYSTEM_PROMPT = \"\"\"\nYou are Marie, a lifelong Parisian who works as an art curator \nat the Musée d'Orsay. You are 34 years old and have lived in \nParis your entire life.\n\nYour areas of expertise:\n- Hidden cafés and restaurants that locals love\n- Art history and optimal museum visiting strategies  \n- Neighborhood personalities, safety tips, and Metro navigation\n- Seasonal events, local customs, and French etiquette\n- Shopping areas: both luxury and vintage finds\n\nCommunication style:\n- Speak warmly but directly, like a friend giving advice\n- Use occasional French phrases naturally (with translations)\n- Always ask a follow-up question to understand preferences better\n- Avoid tourist traps unless specifically asked about them\n- Share personal anecdotes when relevant\n\"\"\"\n```",
            ],
            highlights: [
                "Detailed Persona Definition",
                "Expertise Area Mapping",
                "Communication Guidelines",
            ],
        },
        {
            title: "Conversation Engine: Context Management",
            body: [
                "The core function maintains conversation history to enable multi-turn dialogues. Each exchange is stored and passed back to the API, allowing Marie to reference earlier parts of the conversation:",
                "```python\ndef get_travel_advice(\n    conversation_history: List[Dict[str, str]], \n    user_message: str\n) -> str:\n    \"\"\"Get personalized Paris travel advice from Marie.\"\"\"\n    \n    # Build messages with system prompt + history + new message\n    messages = [{\"role\": \"system\", \"content\": SYSTEM_PROMPT}]\n    messages.extend(conversation_history)\n    messages.append({\"role\": \"user\", \"content\": user_message})\n    \n    response = openai.chat.completions.create(\n        model=\"gpt-4o-mini\",\n        messages=messages,\n        temperature=0.8,  # Higher creativity for engaging conversation\n        max_tokens=500\n    )\n    \n    assistant_reply = response.choices[0].message.content\n    \n    # Update history for next turn\n    conversation_history.append({\"role\": \"user\", \"content\": user_message})\n    conversation_history.append({\"role\": \"assistant\", \"content\": assistant_reply})\n    \n    return assistant_reply\n```",
            ],
            highlights: [
                "Conversation History Management",
                "Multi-Turn Context Retention",
                "Temperature Tuning for Creativity",
            ],
        },
        {
            title: "Interactive Demo: Chat Session",
            body: [
                "The interactive demo allows users to have natural conversations with Marie. Here's an example session showing the contextual understanding:",
                "```python\n# Initialize conversation\nhistory = []\n\n# First question\nprint(\"You: What's the best area to stay for a first visit?\")\nresponse = get_travel_advice(history, \"What's the best area to stay for a first visit?\")\nprint(f\"Marie: {response}\")\n\n# Follow-up (Marie remembers context)\nprint(\"\\nYou: I'm mostly interested in art and good food.\")\nresponse = get_travel_advice(history, \"I'm mostly interested in art and good food.\")\nprint(f\"Marie: {response}\")\n\n# Another follow-up\nprint(\"\\nYou: What about your favorite café nearby?\")\nresponse = get_travel_advice(history, \"What about your favorite café nearby?\")\nprint(f\"Marie: {response}\")\n\nprint(f\"\\n[Conversation length: {len(history)} messages]\")\n```",
            ],
            highlights: [
                "Natural Conversation Flow",
                "Contextual Follow-ups",
                "Personalized Recommendations",
            ],
        },
        {
            title: "Impact & Future Roadmap",
            body: [
                "The travel guide demonstrates that effective AI assistants require careful prompt engineering, not just raw model capability. The persona approach creates a more engaging experience than generic Q&A.",
                "Future iterations could include: integration with booking APIs for real-time availability, map visualizations for recommended routes, and expansion to other cities using the same modular architecture. The Marie persona could also be fine-tuned with user feedback to improve recommendation quality over time.",
            ],
            highlights: [
                "Engaging Conversational Experience",
                "Modular Architecture for Expansion",
                "API Integration Potential",
                "Feedback-Driven Improvement",
            ],
        },
    ],
};
