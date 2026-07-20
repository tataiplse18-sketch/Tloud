"use client";

import { useState } from "react";
import { useAppStore, type PageType } from "@/store/app-store";
import {
  Send,
  CloudUpload,
  ChevronDown,
  Folder,
  Clock,
  Star,
  Users,
  Trash2,
  Plus,
  Rocket,
  CheckCircle,
  X,
  Settings,
  Code2,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFolders } from "@/data/mock-data";
import { Progress } from "@/components/ui/progress";

const navItems: { id: PageType; label: string; icon: React.ElementType }[] = [
  { id: "my-drive", label: "My Drive", icon: Folder },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "starred", label: "Starred", icon: Star },
  { id: "shared", label: "Shared with me", icon: Users },
  { id: "trash", label: "Trash", icon: Trash2 },
];

const bottomNavItems: { id: PageType; label: string; icon: React.ElementType }[] = [
  { id: "api", label: "API", icon: Code2 },
  { id: "admin", label: "Admin Panel", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

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

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarOpen } = useAppStore();
  const [showMoreFolders, setShowMoreFolders] = useState(false);
  const [showUploadNotif, setShowUploadNotif] = useState(true);

  const visibleFolders = showMoreFolders
    ? mockFolders
    : mockFolders.slice(0, 5);

  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 h-screen bg-[#0B1220] border-r border-white/10 flex flex-col overflow-hidden shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="w-8 h-8 rounded-lg bg-[#4F7CFF] flex items-center justify-center">
          <Send className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-white text-[15px]">
          Telegram Drive
        </span>
      </div>

      {/* Upload Button */}
      <div className="px-3 mb-2">
        <button className="w-full flex items-center justify-center gap-2 bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white rounded-xl py-2.5 px-4 text-sm font-medium transition-all active:scale-[0.98]">
          <CloudUpload className="w-4 h-4" />
          Upload
          <ChevronDown className="w-3.5 h-3.5 ml-auto opacity-70" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-0.5 mb-4">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg py-2 px-3 text-sm font-medium transition-all relative",
                isActive
                  ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#4F7CFF] rounded-r-full" />
              )}
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-3 border-t border-white/5 mb-4" />

      {/* Storage */}
      <div className="px-5 mb-4">
        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-3">
          Storage
        </p>
        <div className="flex items-center gap-3 mb-2">
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#4F7CFF"
                strokeWidth="3"
                strokeDasharray={`${68 * 0.88} 88`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
              68%
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-300">34.2 GB of Unlimited</p>
            <button className="text-[11px] text-[#4F7CFF] hover:underline">
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Folders */}
      <div className="px-3 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-2 mb-2">
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            Folders
          </p>
          <button className="w-5 h-5 rounded-md hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-gray-300">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-0.5">
          {visibleFolders.map((folder) => (
            <button
              key={folder.id}
              className="w-full flex items-center gap-2.5 rounded-lg py-1.5 px-3 text-sm text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors"
            >
              <Folder
                className="w-4 h-4"
                style={{ color: folderColors[folder.name] || "#F59E0B" }}
              />
              <span className="truncate">{folder.name}</span>
            </button>
          ))}
          <button
            onClick={() => setShowMoreFolders(!showMoreFolders)}
            className="w-full flex items-center gap-2.5 rounded-lg py-1.5 px-3 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 transition-transform",
                showMoreFolders && "rotate-180"
              )}
            />
            {showMoreFolders ? "Show less" : "Show more"}
          </button>
        </div>
      </div>

      {/* Upgrade */}
      <div className="px-3 py-3">
        <div className="rounded-xl bg-[#4F7CFF]/5 border border-[#4F7CFF]/20 p-3.5">
          <Rocket className="w-5 h-5 text-[#4F7CFF] mb-2" />
          <p className="text-sm font-medium text-[#4F7CFF] mb-1">
            Upgrade to Premium
          </p>
          <p className="text-[11px] text-gray-500 mb-3">
            Unlock all premium features and support the project
          </p>
          <button className="w-full bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white rounded-lg py-1.5 text-xs font-medium transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="px-3 space-y-0.5 mt-auto border-t border-white/5 pt-3">
        {bottomNavItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg py-2 px-3 text-sm font-medium transition-all relative",
                isActive
                  ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#4F7CFF] rounded-r-full" />
              )}
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Upload Notification */}
      {showUploadNotif && (
        <div className="mx-3 mb-3 flex items-center gap-2.5 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2.5">
          <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
          <p className="text-[11px] text-green-300 leading-tight">
            Upload completed! 3 files uploaded successfully
          </p>
          <button
            onClick={() => setShowUploadNotif(false)}
            className="ml-auto shrink-0"
          >
            <X className="w-3.5 h-3.5 text-green-400/60 hover:text-green-400" />
          </button>
        </div>
      )}
    </aside>
  );
}
