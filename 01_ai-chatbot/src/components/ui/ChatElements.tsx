"use client";
import { useState } from "react";
import { FiCopy, FiCheck, FiZap } from "react-icons/fi";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors px-2 py-1 rounded hover:bg-white/8"
    >
      {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-[#1A1A1A] border border-white/6 rounded-2xl rounded-tl-sm w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-neutral-500 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "1s" }}
        />
      ))}
    </div>
  );
}

export function AiAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
      <FiZap size={13} className="text-white" />
    </div>
  );
}

export function UserAvatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center flex-shrink-0 text-indigo-300 text-xs font-medium">
      U
    </div>
  );
}