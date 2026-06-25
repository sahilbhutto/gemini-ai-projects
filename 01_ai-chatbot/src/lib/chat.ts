import { ChatSession } from "../types/chat";

export function groupByDate(sessions: ChatSession[] = []): Record<string, ChatSession[]> {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday.getTime() - 86400000);
  const startOfWeek = new Date(startOfToday.getTime() - 6 * 86400000);
  const startOfMonth = new Date(startOfToday.getTime() - 29 * 86400000);

  const groups: Record<string, ChatSession[]> = {
    Today: [],
    Yesterday: [],
    "Last 7 days": [],
    "Last 30 days": [],
    Older: [],
  };

  for (const s of sessions) {
    const d = new Date(s.createdAt);
    if (d >= startOfToday) groups["Today"].push(s);
    else if (d >= startOfYesterday) groups["Yesterday"].push(s);
    else if (d >= startOfWeek) groups["Last 7 days"].push(s);
    else if (d >= startOfMonth) groups["Last 30 days"].push(s);
    else groups["Older"].push(s);
  }

  // Remove empty groups
  return Object.fromEntries(Object.entries(groups).filter(([, v]) => v.length > 0));
}