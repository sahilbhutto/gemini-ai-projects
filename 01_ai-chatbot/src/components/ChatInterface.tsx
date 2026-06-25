"use client";
import { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip, FiMic, FiSearch, FiMoreHorizontal } from "react-icons/fi";
import { useChat } from "../hooks/useChat";
import { AiAvatar, UserAvatar, TypingIndicator } from "./ui/ChatElements";
import ChatEmptyState from "./ui/ChatEmptyState";
import MarkdownRenderer from "./ui/MarkdownRenderer";

export default function ChatInterface() {
  const [message, setMessage] = useState("");
  const { messages, loading, send } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;
    const text = message.trim();
    setMessage("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await send(text);
  };

  const handleSuggestion = async (text: string) => {
    await send(text);
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex flex-col h-screen w-full bg-[#0A0A0A] text-neutral-200">
      {/* ── Header ── */}
      <div className="hidden sm:flex items-center justify-between px-5 py-3.5 border-b border-white/6 bg-[#0F0F0F] flex-shrink-0">
        <div className="flex items-center gap-3">
          <AiAvatar />
          <div>
            <p className="text-sm font-medium text-neutral-100 leading-none mb-0.5">Gemini</p>
            <p className="text-xs text-neutral-500 flex items-center gap-1.5 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" className="p-2 text-neutral-500 hover:text-neutral-300 hover:bg-white/5 rounded-lg transition-colors">
            <FiSearch size={16} />
          </button>
          <button type="button" className="p-2 text-neutral-500 hover:text-neutral-300 hover:bg-white/5 rounded-lg transition-colors">
            <FiMoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth">
        {messages.length === 0 ? (
          <ChatEmptyState onSuggestion={handleSuggestion} />
        ) : (
          <>
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div key={msg.id} className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                  {isUser ? <UserAvatar /> : <AiAvatar />}

                  <div className={`flex flex-col gap-1 max-w-[80%] sm:max-w-[72%] ${isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? "bg-indigo-600 text-white rounded-2xl rounded-tr-sm"
                          : "bg-[#1A1A1A] border border-white/6 text-neutral-200 rounded-2xl rounded-tl-sm"
                      }`}
                    >
                      {isUser ? <p>{msg.content}</p> : <MarkdownRenderer content={msg.content} />}
                    </div>
                    <p className="text-[11px] text-neutral-600 px-1">
                      {isUser ? "You" : "Gemini"} · {formatTime(msg?.createdAt ?? new Date())}
                    </p>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-start gap-3">
                <AiAvatar />
                <div className="flex flex-col gap-1">
                  <TypingIndicator />
                  <p className="text-[11px] text-neutral-600 px-1">Gemini is thinking…</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* ── Input area ── */}
      <div className="flex-shrink-0 px-4 pb-5 pt-3 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            {/* Focus glow ring */}
            <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-indigo-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />

            <div className="relative border border-white/8 rounded-2xl bg-[#111111] focus-within:border-indigo-500/40 transition-colors duration-200 overflow-hidden">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  autoResize();
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    await handleSend();
                  }
                }}
                placeholder="Message Gemini... (Shift+Enter for newline)"
                rows={1}
                className="w-full bg-transparent text-neutral-100 placeholder:text-neutral-600 px-4 pt-3.5 pb-0 text-sm focus:outline-none resize-none leading-relaxed"
                style={{ minHeight: "42px", maxHeight: "180px" }}
              />

              <div className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    aria-label="Attach file"
                    className="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-300 hover:bg-white/6 transition-colors"
                  >
                    <FiPaperclip size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Voice input"
                    className="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-300 hover:bg-white/6 transition-colors"
                  >
                    <FiMic size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-700 hidden sm:block">
                    {message.length > 0 ? `${message.length} chars` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!message.trim() || loading}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      message.trim() && !loading
                        ? "bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95"
                        : "bg-white/5 text-neutral-700 cursor-not-allowed"
                    }`}
                  >
                    <FiSend size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-neutral-700 mt-3">
            Gemini can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}