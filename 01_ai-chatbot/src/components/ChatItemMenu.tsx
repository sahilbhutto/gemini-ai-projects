"use client";
import { useState } from "react";
import { FiMoreHorizontal, FiEdit2, FiTrash2 } from "react-icons/fi";

interface ChatItemMenuProps {
  onRename: () => void;
  onDelete: () => void;
}

export default function ChatItemMenu({ onRename, onDelete }: ChatItemMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        className="p-1 rounded-md text-neutral-600 hover:text-neutral-300 hover:bg-white/8 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Chat options"
      >
        <FiMoreHorizontal size={14} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />
          <div className="absolute right-0 top-7 z-20 w-36 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onRename();
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-neutral-300 hover:bg-white/6 transition-colors"
            >
              <FiEdit2 size={12} />
              Rename
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                onDelete();
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <FiTrash2 size={12} />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}