// Helper to parse markdown-style code blocks from text (can be used server-side)
export function parseCodeBlocks(text: string): Array<{ type: 'text' | 'code'; content: string; language?: string }> {
    const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
        // Add text before code block
        if (match.index > lastIndex) {
            const textContent = text.slice(lastIndex, match.index).trim();
            if (textContent) {
                parts.push({ type: 'text', content: textContent });
            }
        }

        // Add code block
        parts.push({
            type: 'code',
            content: match[2].trim(),
            language: match[1] || 'python',
        });

        lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
        const textContent = text.slice(lastIndex).trim();
        if (textContent) {
            parts.push({ type: 'text', content: textContent });
        }
    }

    // If no matches, return original text
    if (parts.length === 0) {
        parts.push({ type: 'text', content: text });
    }

    return parts;
}
