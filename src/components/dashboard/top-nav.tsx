"use client";

import { useTheme } from "next-themes";
import { useAppStore, type PageType } from "@/store/app-store";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Bell,
  Sun,
  Moon,
} from "lucide-react";

const pageTitles: Record<PageType, string> = {
  "my-drive": "My Drive",
  recent: "Recent",
  starred: "Starred",
  shared: "Shared with me",
  trash: "Trash",
  settings: "Settings",
  profile: "Profile",
};

export default function TopNav() {
  const { currentPage, userName, setSearchOpen } = useAppStore();
  const { theme, setTheme } = useTheme();

  const firstName = userName.split(" ")[0] || "User";

  return (
    <header className="h-16 border-b border-white/10 bg-[#0B1220]/80 backdrop-blur-xl flex items-center gap-4 px-5 shrink-0">
      {/* Page Title */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <h1 className="text-base font-semibold text-white truncate">
            {pageTitles[currentPage]}
          </h1>
          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
        </div>
        <p className="text-xs text-gray-500 truncate">
          Welcome back, {firstName}! 👋
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-auto">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-gray-500 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="flex-1 text-left">Search files and folders...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/10 text-[10px] font-medium text-gray-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5">
        <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors">
          <HelpCircle className="w-4 h-4" />
        </button>

        <button className="relative w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-gray-200 transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2.5 ml-1 pl-3 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-[#4F7CFF] flex items-center justify-center text-xs font-bold text-white">
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-white leading-tight">
              {userName}
            </p>
            <p className="text-[11px] text-gray-500">Premium Plan</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
