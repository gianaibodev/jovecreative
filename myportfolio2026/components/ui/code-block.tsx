"use client";

import { useState } from "react";
import { Check, Copy, Terminal, Code2, Play, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    language?: string;
    filename?: string;
    output?: string;
    showLineNumbers?: boolean;
    className?: string;
}

// Simple syntax highlighting for Python
function highlightPython(code: string): string {
    let highlighted = code;

    // Escape HTML first
    highlighted = highlighted
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Comments (must do first to avoid conflicts)
    highlighted = highlighted.replace(
        /(#[^\n]*)/g,
        '<span class="text-emerald-400 italic">$1</span>'
    );

    // Triple-quoted strings (docstrings)
    highlighted = highlighted.replace(
        /("""[\s\S]*?"""|'''[\s\S]*?''')/g,
        '<span class="text-amber-300">$1</span>'
    );

    // Strings (double and single quotes)
    highlighted = highlighted.replace(
        /("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g,
        '<span class="text-amber-300">$1</span>'
    );

    // f-strings
    highlighted = highlighted.replace(
        /(f"[^"]*"|f'[^']*')/g,
        '<span class="text-amber-200">$1</span>'
    );

    // Keywords
    const keywords = ['import', 'from', 'def', 'class', 'return', 'if', 'else', 'elif', 'for', 'while', 'try', 'except', 'with', 'as', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'lambda', 'async', 'await', 'yield', 'raise', 'pass', 'break', 'continue'];
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'g');
        highlighted = highlighted.replace(regex, '<span class="text-pink-400 font-medium">$1</span>');
    });

    // Built-in functions
    const builtins = ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'open', 'type', 'isinstance', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'reversed', 'sum', 'min', 'max', 'abs', 'round', 'input', 'format'];
    builtins.forEach(fn => {
        const regex = new RegExp(`\\b(${fn})\\s*\\(`, 'g');
        highlighted = highlighted.replace(regex, '<span class="text-cyan-400">$1</span>(');
    });

    // Function definitions
    highlighted = highlighted.replace(
        /\bdef\s+(\w+)/g,
        '<span class="text-pink-400 font-medium">def</span> <span class="text-blue-400 font-semibold">$1</span>'
    );

    // Class definitions
    highlighted = highlighted.replace(
        /\bclass\s+(\w+)/g,
        '<span class="text-pink-400 font-medium">class</span> <span class="text-yellow-400 font-semibold">$1</span>'
    );

    // Numbers
    highlighted = highlighted.replace(
        /\b(\d+\.?\d*)\b/g,
        '<span class="text-orange-400">$1</span>'
    );

    // Method calls (after .)
    highlighted = highlighted.replace(
        /\.(\w+)\(/g,
        '.<span class="text-blue-300">$1</span>('
    );

    // Type hints / annotations
    highlighted = highlighted.replace(
        /:\s*(str|int|float|bool|list|dict|tuple|set|None|Any)\b/g,
        ': <span class="text-teal-400">$1</span>'
    );

    // Decorators
    highlighted = highlighted.replace(
        /(@\w+)/g,
        '<span class="text-yellow-500">$1</span>'
    );

    return highlighted;
}

// Generic syntax highlighting for JavaScript/TypeScript
function highlightJS(code: string): string {
    let highlighted = code;

    // Escape HTML
    highlighted = highlighted
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Comments
    highlighted = highlighted.replace(
        /(\/\/[^\n]*)/g,
        '<span class="text-emerald-400 italic">$1</span>'
    );

    // Strings
    highlighted = highlighted.replace(
        /("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|`[^`\\]*(?:\\.[^`\\]*)*`)/g,
        '<span class="text-amber-300">$1</span>'
    );

    // Keywords
    const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'try', 'catch', 'throw', 'new', 'class', 'extends', 'import', 'export', 'from', 'default', 'async', 'await', 'typeof', 'instanceof', 'true', 'false', 'null', 'undefined', 'this', 'super'];
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b(${kw})\\b`, 'g');
        highlighted = highlighted.replace(regex, '<span class="text-pink-400 font-medium">$1</span>');
    });

    // Numbers
    highlighted = highlighted.replace(
        /\b(\d+\.?\d*)\b/g,
        '<span class="text-orange-400">$1</span>'
    );

    // Arrow functions
    highlighted = highlighted.replace(
        /(=&gt;)/g,
        '<span class="text-pink-400">=&gt;</span>'
    );

    return highlighted;
}

function highlightCode(code: string, language: string): string {
    switch (language.toLowerCase()) {
        case 'python':
        case 'py':
            return highlightPython(code);
        case 'javascript':
        case 'js':
        case 'typescript':
        case 'ts':
        case 'jsx':
        case 'tsx':
            return highlightJS(code);
        default:
            return code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}

export function CodeBlock({
    code,
    language = "python",
    filename,
    output,
    showLineNumbers = true,
    className,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split('\n');
    const highlightedCode = highlightCode(code, language);

    return (
        <div className={cn("relative group rounded-2xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl", className)}>
            {/* Header Bar - IDE Style */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/10">
                <div className="flex items-center gap-3">
                    {/* Traffic Lights */}
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>

                    {/* Filename Tab */}
                    {filename && (
                        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0d1117] border border-white/10">
                            <Code2 className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-mono text-zinc-400">{filename}</span>
                        </div>
                    )}

                    {/* Language Badge */}
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">{language}</span>
                    </div>
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-medium text-zinc-400 hover:text-white"
                >
                    {copied ? (
                        <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Content */}
            <div className="overflow-x-auto">
                <pre className="p-4 text-sm font-mono leading-relaxed">
                    <code>
                        {showLineNumbers ? (
                            <table className="w-full border-collapse">
                                <tbody>
                                    {lines.map((line, i) => (
                                        <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                                            <td className="pr-4 pl-2 text-right text-zinc-600 select-none border-r border-white/5 w-[1%] whitespace-nowrap">
                                                {i + 1}
                                            </td>
                                            <td className="pl-4 text-zinc-300 whitespace-pre">
                                                <span dangerouslySetInnerHTML={{ __html: highlightCode(line, language) }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <span className="text-zinc-300" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                        )}
                    </code>
                </pre>
            </div>

            {/* Terminal Output Section */}
            {output && (
                <div className="border-t border-white/10">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#1c2128] border-b border-white/5">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Output</span>
                        <Play className="w-3 h-3 text-emerald-400 ml-auto animate-pulse" />
                    </div>
                    <div className="p-4 bg-[#0a0e14] font-mono text-sm">
                        <div className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">{output}</pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
