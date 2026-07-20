"use client";

import { useAppStore } from "@/store/app-store";
import Sidebar from "@/components/dashboard/sidebar";
import TopNav from "@/components/dashboard/top-nav";
import FileBrowser from "@/components/dashboard/file-browser";
import RightPanel from "@/components/dashboard/right-panel";
import UploadQueue from "@/components/dashboard/upload-queue";
import SearchPalette from "@/components/dashboard/search-palette";
import { mockUploads } from "@/data/mock-data";
import { useEffect } from "react";

export default function Dashboard() {
  const { uploads, addUpload } = useAppStore();

  // Add mock uploads on first render
  useEffect(() => {
    if (uploads.length === 0) {
      mockUploads.forEach((u) => addUpload(u));
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#0B1220] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <FileBrowser />
          <RightPanel />
        </div>
      </div>

      {/* Floating Upload Queue */}
      <UploadQueue />

      {/* Search Command Palette */}
      <SearchPalette />
    </div>
  );
}
