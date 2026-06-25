"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "../ui/ChatElements";

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-neutral-100">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-neutral-300">{children}</em>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-2 ml-4 space-y-1 list-disc marker:text-neutral-500">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-2 ml-4 space-y-1 list-decimal marker:text-neutral-500">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="leading-relaxed text-neutral-200">{children}</li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-indigo-500/50 pl-3 my-2 text-neutral-400 italic">
      {children}
    </blockquote>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-lg font-semibold text-neutral-100 mb-2 mt-3 first:mt-0">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-base font-semibold text-neutral-100 mb-2 mt-3 first:mt-0">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-sm font-semibold text-neutral-200 mb-1 mt-2 first:mt-0">{children}</h3>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
    >
      {children}
    </a>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-2">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="text-left px-3 py-2 bg-white/5 border border-white/8 text-neutral-200 font-medium text-xs uppercase tracking-wide">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-3 py-2 border border-white/6 text-neutral-300">{children}</td>
  ),
  inlineCode: ({ children }: { children?: React.ReactNode }) => (
    <code className="font-mono text-xs bg-white/8 text-indigo-300 px-1.5 py-0.5 rounded border border-white/8">
      {children}
    </code>
  ),
  code: ({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
    [key: string]: unknown;
  }) => {
    const lang = /language-(\w+)/.exec(className || "")?.[1] ?? "text";
    const raw = String(children).replace(/\n$/, "");
    
    if (inline) {
      return (
        <code className="font-mono text-xs bg-white/8 text-indigo-300 px-1.5 py-0.5 rounded border border-white/8">
          {raw}
        </code>
      );
    }
    
    return (
      <div className="my-3 rounded-xl overflow-hidden border border-white/8 bg-[#0D0D0D]">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/6 bg-white/3">
          <span className="text-xs text-neutral-500 font-mono">{lang}</span>
          <CopyButton text={raw} />
        </div>
        <SyntaxHighlighter
          language={lang}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: "14px 16px",
            background: "transparent",
            fontSize: "12.5px",
            lineHeight: "1.65",
          }}
          {...props}
        >
          {raw}
        </SyntaxHighlighter>
      </div>
    );
  },
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents as import("react-markdown").Components}
    >
      {content}
    </ReactMarkdown>
  );
}