"use client";

import { Folder, MoreVertical } from "lucide-react";
import type { FolderItem } from "@/store/app-store";

const folderColors: Record<string, string> = {
  Projects: "#F59E0B",
  "Photos & Images": "#22C55E",
  Videos: "#8B5CF6",
  Documents: "#4F7CFF",
  Music: "#EC4899",
  Software: "#F97316",
  Work: "#8B5CF6",
  Personal: "#F59E0B",
};

interface FolderCardProps {
  folder: FolderItem;
}

export function FolderCard({ folder }: FolderCardProps) {
  const color = folderColors[folder.name] || "#F59E0B";

  return (
    <button className="group flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-3.5 text-left transition-all hover:bg-white/[0.06] hover:border-white/10">
      <div className="flex items-center justify-between mb-3">
        <Folder className="w-8 h-8" style={{ color }} />
        <MoreVertical className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-sm font-medium text-gray-200 truncate">{folder.name}</p>
      <p className="text-[11px] text-gray-500 mt-0.5">
        {folder.itemCount.toLocaleString()} items
      </p>
    </button>
  );
}
