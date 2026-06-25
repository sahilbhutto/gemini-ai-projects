import { FiMessageSquare, FiPlus } from "react-icons/fi";

interface EmptyHistoryProps {
  onNewChat?: () => void;
}

export default function EmptyHistory({ onNewChat }: EmptyHistoryProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 px-4 text-center">
      <div className="w-10 h-10 rounded-xl bg-white/4 border border-white/6 flex items-center justify-center">
        <FiMessageSquare size={18} className="text-neutral-600" />
      </div>
      <div>
        <p className="text-xs font-medium text-neutral-400 mb-1">No conversations yet</p>
        <p className="text-[11px] text-neutral-600 leading-relaxed">
          Start a new chat to begin exploring.
        </p>
      </div>
      <button
        type="button"
        onClick={onNewChat}
        className="mt-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1.5"
      >
        <FiPlus size={12} />
        New chat
      </button>
    </div>
  );
}