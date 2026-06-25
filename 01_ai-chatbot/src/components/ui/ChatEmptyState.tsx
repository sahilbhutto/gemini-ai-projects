"use client";
import { FiCode, FiPenTool, FiDatabase, FiZap } from "react-icons/fi";

const SUGGESTIONS = [
  { icon: <FiCode size={15} />, label: "Code", text: "Build a Next.js layout" },
  { icon: <FiPenTool size={15} />, label: "Refactor", text: "Refactor my React component" },
  { icon: <FiDatabase size={15} />, label: "Schema", text: "Design a Postgres schema" },
];

export default function ChatEmptyState({ onSuggestion }: { onSuggestion: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full gap-3 pb-10 animate-fade-in">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/30 mb-1">
        <FiZap size={22} className="text-white" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-400">
        Hello, Welcome Back.
      </h1>
      <p className="text-sm text-neutral-500 text-center max-w-xs leading-relaxed">
        How can I help accelerate your workflow today?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-lg mt-4">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSuggestion(s.text)}
            className="flex flex-col items-start gap-3 p-4 rounded-xl border border-white/6 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all duration-200 text-left group"
          >
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-indigo-500/15 transition-colors text-neutral-400 group-hover:text-indigo-300">
              {s.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-300">{s.label}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{s.text}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}