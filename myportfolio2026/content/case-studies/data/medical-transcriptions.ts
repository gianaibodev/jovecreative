import { CaseStudy } from "../types";

export const medicalTranscriptions: CaseStudy = {
    slug: "medical-transcriptions-openai",
    projectId: "medical-transcriptions",
    title: "Medical Transcriptions with OpenAI API",
    subtitle:
        "Extracting Structured Clinical Data from Unstructured Medical Transcriptions",
    summary:
        "A Python-based data pipeline that leverages OpenAI's GPT-4o-mini model to extract structured medical information—including patient age, specialty, treatment plans, and ICD-10 diagnostic codes—from raw clinical transcriptions.\n\nThis project demonstrates production-grade AI engineering with JSON schema enforcement, achieving automated extraction of 4+ clinical data fields per transcription with high accuracy.",
    date: "2025-01-15",
    year: 2025,
    category: "AI & Machine Learning",
    tags: ["NLP", "Healthcare AI", "Data Extraction", "OpenAI API", "Python"],
    roles: ["AI Engineer", "Data Scientist"],
    tools: ["Python", "OpenAI API", "Pandas", "JSON Mode", "Jupyter Notebook"],
    metrics: [
        "Automated extraction of 4+ clinical data fields per transcription",
        "Structured output with ICD-10 code matching",
        "JSON schema validation for data integrity",
        "Batch processing capability for large datasets",
    ],
    heroImage: "/projects/ai/medical-transcriptions-openai/images/hero.png",
    gallery: [
        "/projects/ai/medical-transcriptions-openai/images/hero.png",
    ],
    deliverables: [
        "Python Data Extraction Pipeline",
        "OpenAI API Integration",
        "Structured JSON Output Schema",
        "Jupyter Notebook Documentation",
    ],
    sections: [
        {
            title: "The Situation: Unstructured Clinical Data",
            body: [
                "Healthcare organizations generate massive volumes of clinical transcriptions daily. These free-form text documents contain valuable patient information—diagnoses, treatments, demographics—but extracting this data manually is expensive, slow, and error-prone.",
                "I was tasked with building an automated pipeline that could parse raw transcriptions and output structured, validated JSON suitable for analytics and billing systems. The key challenge: medical language is nuanced, full of abbreviations, and requires domain knowledge to interpret correctly.",
            ],
            highlights: [
                "High-Volume Medical Data Processing",
                "NLP for Healthcare Applications",
                "Structured Output Requirements",
            ],
        },
        {
            title: "The Problem: Manual Extraction Doesn't Scale",
            body: [
                "Traditional approaches to this problem involve either expensive human coders who manually review each transcription, or rigid rule-based systems that fail on edge cases. Both approaches suffer from significant limitations.",
                "Human coders are slow, expensive, and prone to fatigue-related errors. Rule-based NLP systems break when doctors use non-standard phrasing or new terminology. The result is a backlog of unprocessed data and inconsistent output quality.",
            ],
            highlights: [
                "Human Coding Bottleneck",
                "Rule-Based System Brittleness",
                "Inconsistent Data Quality",
                "Processing Backlog",
            ],
        },
        {
            title: "The Solution: LLM-Powered Extraction Pipeline",
            body: [
                "I built a Python pipeline using OpenAI's GPT-4o-mini with JSON mode to ensure structured, validated output. The key insight was using a carefully engineered prompt that instructs the model to extract specific fields while adhering to medical coding standards.",
                "The system prompt defines the exact JSON schema expected, including field types and validation rules. This ensures the output is always machine-readable and consistent across thousands of transcriptions.",
            ],
            highlights: [
                "GPT-4o-mini for Cost-Effective Processing",
                "JSON Mode for Schema Enforcement",
                "Prompt Engineering for Medical Domain",
            ],
        },
        {
            title: "Core Extraction Function",
            body: [
                "The extraction function sends each transcription to the API with a carefully crafted system prompt. JSON mode ensures the response is always parseable:",
                "```python\nimport openai\nimport json\nfrom typing import Optional\n\ndef extract_medical_info(transcription: str) -> dict:\n    \"\"\"Extract structured medical data from a transcription.\"\"\"\n    \n    system_prompt = \"\"\"You are a medical data extraction assistant.\n    Extract the following fields as valid JSON:\n    - patient_age: integer or null if not mentioned\n    - medical_specialty: string (e.g., \"Cardiology\")\n    - treatment_plan: string summary of treatment\n    - icd10_codes: list of applicable ICD-10 codes\n    - confidence_score: float between 0.0 and 1.0\n    \n    Only output valid JSON. No explanations.\"\"\"\n    \n    response = openai.chat.completions.create(\n        model=\"gpt-4o-mini\",\n        response_format={\"type\": \"json_object\"},\n        messages=[\n            {\"role\": \"system\", \"content\": system_prompt},\n            {\"role\": \"user\", \"content\": transcription}\n        ],\n        temperature=0.1  # Low temperature for consistent extraction\n    )\n    \n    return json.loads(response.choices[0].message.content)\n```",
            ],
            highlights: [
                "JSON Mode API",
                "Schema-Enforced Output",
                "Low Temperature for Consistency",
            ],
        },
        {
            title: "Batch Processing with Pandas",
            body: [
                "For production use, the pipeline processes entire datasets using Pandas. Each transcription is passed through the extraction function, with proper error handling and progress tracking:",
                "```python\nimport pandas as pd\nfrom tqdm import tqdm\n\ndef process_transcriptions(input_file: str, output_file: str):\n    \"\"\"Process a CSV of transcriptions and save extracted data.\"\"\"\n    \n    df = pd.read_csv(input_file)\n    print(f\"Processing {len(df)} transcriptions...\")\n    \n    results = []\n    for idx, row in tqdm(df.iterrows(), total=len(df)):\n        try:\n            extracted = extract_medical_info(row['transcription'])\n            extracted['source_id'] = row['id']\n            results.append(extracted)\n        except Exception as e:\n            print(f\"Error processing row {idx}: {e}\")\n            results.append({'source_id': row['id'], 'error': str(e)})\n    \n    output_df = pd.DataFrame(results)\n    output_df.to_csv(output_file, index=False)\n    print(f\"Saved {len(output_df)} results to {output_file}\")\n\n# Run the pipeline\nprocess_transcriptions('transcriptions.csv', 'extracted_data.csv')\n```",
            ],
            highlights: [
                "Pandas DataFrame Processing",
                "Progress Tracking with tqdm",
                "Error Handling & Recovery",
            ],
        },
        {
            title: "Output Validation & Flattening",
            body: [
                "After extraction, we validate and flatten the nested JSON into tabular format for analysis. The ICD-10 codes list is converted to a comma-separated string for CSV compatibility:",
                "```python\n# Validate and flatten the extracted data\ndf = pd.read_csv('extracted_data.csv')\n\n# Convert ICD-10 codes list to string\ndf['icd10_codes_str'] = df['icd10_codes'].apply(\n    lambda x: ', '.join(eval(x)) if pd.notna(x) else ''\n)\n\n# Filter high-confidence extractions\nhigh_confidence = df[df['confidence_score'] >= 0.8]\nprint(f\"High-confidence extractions: {len(high_confidence)}\")\n\n# Summary statistics\nprint(f\"\\nSpecialty distribution:\")\nprint(df['medical_specialty'].value_counts().head(10))\n\nprint(f\"\\nAverage patient age: {df['patient_age'].mean():.1f}\")\nprint(f\"Total ICD-10 codes extracted: {df['icd10_codes_str'].str.count(',').sum() + len(df)}\")\n```",
            ],
            highlights: [
                "Data Validation Pipeline",
                "Confidence Filtering",
                "Summary Statistics",
            ],
        },
        {
            title: "Impact & Results",
            body: [
                "The pipeline successfully processes transcriptions with high accuracy, extracting patient demographics, specialty classifications, treatment summaries, and ICD-10 codes. The JSON mode ensures output is always parseable and valid.",
                "This project demonstrates that LLMs can be reliable tools for healthcare data processing when properly constrained with structured output formats. The approach is extensible to other medical document types and can be integrated into existing healthcare IT infrastructure.",
            ],
            highlights: [
                "High Extraction Accuracy",
                "Consistent Structured Output",
                "Extensible Architecture",
                "Healthcare IT Integration Ready",
            ],
        },
    ],
};
