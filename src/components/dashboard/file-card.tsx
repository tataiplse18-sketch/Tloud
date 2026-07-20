"use client";

import { type FileItem, type FileType } from "@/store/app-store";
import {
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Folder,
  MoreVertical,
  Star,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const typeIcons: Record<FileType, React.ElementType> = {
  document: FileText,
  image: Image,
  video: Video,
  music: Music,
  archive: Archive,
  folder: Folder,
  other: FileText,
};

const typeColors: Record<FileType, string> = {
  document: "#4F7CFF",
  image: "#22C55E",
  video: "#8B5CF6",
  music: "#EC4899",
  archive: "#F97316",
  folder: "#F59E0B",
  other: "#6B7280",
};

const typeBgColors: Record<FileType, string> = {
  document: "bg-blue-500/10",
  image: "bg-green-500/10",
  video: "bg-purple-500/10",
  music: "bg-pink-500/10",
  archive: "bg-orange-500/10",
  folder: "bg-yellow-500/10",
  other: "bg-gray-500/10",
};

interface FileCardProps {
  file: FileItem;
  selected?: boolean;
  onSelect: (file: FileItem) => void;
  variant?: "grid" | "list";
}

export function FileCard({
  file,
  selected,
  onSelect,
  variant = "grid",
}: FileCardProps) {
  const Icon = typeIcons[file.type];
  const color = typeColors[file.type];
  const bgColor = typeBgColors[file.type];

  if (variant === "list") {
    return (
      <button
        onClick={() => onSelect(file)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all hover:bg-white/5",
          selected && "bg-[#4F7CFF]/10 ring-1 ring-[#4F7CFF]/30"
        )}
      >
        <div
          className={cn("w-8 h-8 rounded-lg flex items-center justify-center", bgColor)}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="flex-1 text-sm text-gray-200 truncate">{file.name}</span>
        <span className="text-xs text-gray-500 w-20 text-right">{file.size}</span>
        <span className="text-xs text-gray-500 w-24 text-right">{file.modified}</span>
        <div className="flex items-center gap-1">
          {file.starred && <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />}
          {file.shared && <Share2 className="w-3.5 h-3.5 text-blue-400" />}
          <MoreVertical className="w-4 h-4 text-gray-500 ml-1" />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => onSelect(file)}
      className={cn(
        "group flex flex-col rounded-xl border border-white/5 bg-white/[0.03] p-3.5 text-left transition-all hover:bg-white/[0.06] hover:border-white/10",
        selected && "bg-[#4F7CFF]/10 border-[#4F7CFF]/30"
      )}
    >
      {/* Thumbnail area */}
      <div
        className={cn(
          "w-full aspect-[4/3] rounded-lg flex items-center justify-center mb-3",
          bgColor
        )}
      >
        <Icon className="w-10 h-10" style={{ color }} />
      </div>

      {/* File info */}
      <div className="flex items-start justify-between gap-1">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-200 truncate">
            {file.name}
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            {file.size} · {file.modified}
          </p>
        </div>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {file.starred && (
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          )}
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </button>
  );
}
