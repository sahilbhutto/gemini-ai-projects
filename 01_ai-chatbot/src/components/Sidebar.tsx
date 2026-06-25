"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiPlus, FiMessageSquare, FiMoreHorizontal, FiX, FiZap, FiSearch } from "react-icons/fi";

import { ChatSession, SidebarProps } from "../types/chat";
import ChatItemMenu from "./ChatItemMenu";
import EmptyHistory from "./EmptyHistory";
import { groupByDate } from "../lib/chat";

export default function Sidebar({
  sessions: externalSessions,
  activeChatId: externalActiveId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]); // FIXED: Initialize as empty array
  const [activeId, setActiveId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeChatId = externalActiveId ?? activeId;
  const allSessions = externalSessions ?? sessions ?? [];

  const filteredSessions = searchQuery.trim()
    ? allSessions.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.preview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSessions;

  const grouped = groupByDate(filteredSessions);

  const handleSelect = (id: string) => {
    setActiveId(id);
    onSelectChat?.(id);
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    onDeleteChat?.(id);
  };

  const handleRenameStart = (id: string, currentTitle: string) => {
    setRenamingId(id);
    setRenameValue(currentTitle);
  };

  const handleRenameCommit = (id: string) => {
    if (renameValue.trim()) {
      setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, title: renameValue.trim() } : s)));
      onRenameChat?.(id, renameValue.trim());
    }
    setRenamingId(null);
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "New conversation",
      preview: "Start typing to begin…",
      createdAt: new Date(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveId(newSession.id);
    onNewChat?.();
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      <div className="md:hidden fixed top-0 inset-x-0 h-14 bg-[#050505]/90 backdrop-blur-lg border-b border-white/6 z-40 flex items-center justify-between px-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-2 -ml-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-white/6 transition-all active:scale-95"
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <FiZap size={13} className="text-white" />
          </div>
          <span className="font-semibold text-[15px] tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
            Gemini
          </span>
        </div>
        <div className="w-8" />
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 bottom-0 left-0 z-50 flex flex-col bg-[#050505] border-r border-white/6 text-neutral-300 transition-all duration-300 ease-in-out shadow-2xl md:shadow-none
          ${isOpen ? "translate-x-0 w-[72vw] sm:w-72" : "-translate-x-full w-[72vw] sm:w-72"}
          md:translate-x-0 ${isOpen ? "md:w-64" : "md:w-17"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 h-16 border-b border-white/4 flex-shrink-0">
          <div
            className={`flex items-center gap-2.5 overflow-hidden transition-all duration-300 ${
              isOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0 md:max-w-0"
            }`}
          >
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <FiZap size={13} className="text-white" />
            </div>
            <span className="font-semibold text-sm text-neutral-100 whitespace-nowrap">Gemini </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-lg hover:bg-white/8 hover:text-white transition-all active:scale-95 text-neutral-400 ${
              !isOpen ? "md:mx-auto" : ""
            }`}
            aria-label="Toggle sidebar"
          >
            {isOpen ? <FiX size={18} className="md:hidden" /> : null}
            <FiMenu size={18} className={isOpen ? "hidden md:block" : "block"} />
          </button>
        </div>

        {/* New chat button */}
        <div className="px-3 pt-3 pb-2 shrink-0">
          <button
            type="button"
            onClick={handleNewChat}
            className={`flex items-center gap-2.5 w-full p-2.5 rounded-xl bg-white/3 hover:bg-white/7 border border-white/6 transition-all active:scale-[0.98] group ${
              isOpen ? "justify-start" : "md:justify-center"
            }`}
          >
            <div className="w-6 h-6 rounded-lg bg-linear-to-br from-neutral-700 to-neutral-800 group-hover:from-indigo-600 group-hover:to-violet-600 transition-all flex items-center justify-center flex-shrink-0">
              <FiPlus size={14} className="text-neutral-200" />
            </div>
            <span
              className={`text-sm font-medium text-neutral-200 whitespace-nowrap transition-all duration-300 ${
                isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden md:hidden"
              }`}
            >
              New chat
            </span>
          </button>
        </div>

        {/* Search */}
        {isOpen && (
          <div className="px-3 pb-2 shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/3 border border-white/5 focus-within:border-white/10 transition-colors">
              <FiSearch size={13} className="text-neutral-600 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chats…"
                className="w-full bg-transparent text-xs text-neutral-300 placeholder:text-neutral-600 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-neutral-600 hover:text-neutral-400"
                >
                  <FiX size={12} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-1 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          {filteredSessions.length === 0 ? (
            isOpen ? (
              searchQuery ? (
                <div className="text-center py-10 px-4">
                  <p className="text-xs text-neutral-500">No results for "{searchQuery}"</p>
                </div>
              ) : (
                <EmptyHistory onNewChat={handleNewChat} />
              )
            ) : null
          ) : (
            Object.entries(grouped).map(([group, chats]) => (
              <div key={group} className="mb-2">
                <div
                  className={`px-3 py-1.5 transition-all duration-300 ${
                    isOpen ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden md:block"
                  }`}
                >
                  <span className="text-[10px] font-semibold text-neutral-600 uppercase tracking-widest">
                    {group}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  {chats.map((chat) => {
                    const isActive = chat.id === activeChatId;
                    const isRenaming = renamingId === chat.id;

                    return (
                      <button
                        type="button"
                        key={chat.id}
                        onClick={() => handleSelect(chat.id)}
                        className={`relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all group text-left ${
                          isActive
                            ? "bg-white/8 text-neutral-100"
                            : "hover:bg-white/5 text-neutral-400 hover:text-neutral-200"
                        } ${isOpen ? "justify-start" : "md:justify-center"}`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-500 rounded-full" />
                        )}

                        <FiMessageSquare
                          size={15}
                          className={`shrink-0 transition-colors ${
                            isActive ? "text-indigo-400" : "text-neutral-600 group-hover:text-neutral-400"
                          }`}
                        />

                        {isOpen && (
                          <div className="flex-1 min-w-0 flex items-center justify-between gap-1">
                            {isRenaming ? (
                              <input
                                autoFocus
                                value={renameValue}
                                onChange={(e) => setRenameValue(e.target.value)}
                                onBlur={() => handleRenameCommit(chat.id)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleRenameCommit(chat.id);
                                  if (e.key === "Escape") setRenamingId(null);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 min-w-0 bg-white/5 border border-indigo-500/50 rounded-md px-2 py-0.5 text-xs text-neutral-100 focus:outline-none"
                              />
                            ) : (
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate leading-snug">{chat.title}</p>
                                <p className="text-[11px] text-neutral-600 truncate leading-snug mt-0.5">
                                  {chat.preview}
                                </p>
                              </div>
                            )}

                            {!isRenaming && (
                              <ChatItemMenu
                                onRename={() => handleRenameStart(chat.id, chat.title)}
                                onDelete={() => handleDelete(chat.id)}
                              />
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* User profile footer */}
        <div className="shrink-0 p-3 border-t border-white/4">
          <button
            type="button"
            className={`flex items-center w-full p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group ${
              isOpen ? "justify-between" : "md:justify-center"
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm shadow-inner">
                S
              </div>

              <div
                className={`flex flex-col items-start text-left transition-all duration-300 overflow-hidden ${
                  isOpen ? "opacity-100 max-w-full w-auto" : "opacity-0 max-w-0 w-0 md:hidden"
                }`}
              >
                <span className="text-xs font-medium text-neutral-100 truncate max-w-[120px]">
                  Sahil Ali Bhutto
                </span>
                <span className="text-[11px] text-neutral-500 truncate max-w-[120px]">Web Developer</span>
              </div>
            </div>

            <div
              className={`transition-all duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden md:hidden"
              }`}
            >
              <FiMoreHorizontal size={16} className="text-neutral-600 group-hover:text-neutral-300 transition-colors" />
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}