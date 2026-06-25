export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatSession {
  id: string;
  title: string;
  preview: string;
  createdAt: Date;
  isActive?: boolean;
}

export interface SidebarProps {
  sessions?: ChatSession[];
  activeChatId?: string;
  onNewChat?: () => void;
  onSelectChat?: (id: string) => void;
  onDeleteChat?: (id: string) => void;
  onRenameChat?: (id: string, title: string) => void;
}