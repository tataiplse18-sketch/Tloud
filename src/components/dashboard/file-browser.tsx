"use client";

import { useState, useCallback } from "react";
import { useAppStore, type FileItem, type FilterTab } from "@/store/app-store";
import { FileCard } from "@/components/dashboard/file-card";
import { FolderCard } from "@/components/dashboard/folder-card";
import { mockFiles, mockFolders, mockQuickAccess } from "@/data/mock-data";
import {
  LayoutGrid,
  List,
  ArrowRight,
  Image,
  Video,
  FileText,
  Music,
  Archive,
  Folder,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const filterTabs: { id: FilterTab; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All", icon: Folder },
  { id: "images", label: "Images", icon: Image },
  { id: "videos", label: "Videos", icon: Video },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "music", label: "Music", icon: Music },
  { id: "archives", label: "Archives", icon: Archive },
];

const typeFilterMap: Record<FilterTab, string[]> = {
  all: [],
  images: ["image"],
  videos: ["video"],
  documents: ["document"],
  music: ["music"],
  archives: ["archive"],
  others: ["other"],
};

export default function FileBrowser() {
  const {
    currentPage,
    viewMode,
    setViewMode,
    activeFilter,
    setActiveFilter,
    selectedFile,
    setSelectedFile,
  } = useAppStore();

  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("name");

  const handleFileSelect = useCallback(
    (file: FileItem) => {
      if (selectedFile?.id === file.id) {
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    },
    [selectedFile, setSelectedFile]
  );

  // Filter files based on current page and filter
  const getFilteredFiles = () => {
    let files = [...mockFiles];

    // Page-specific filtering
    if (currentPage === "starred") {
      files = files.filter((f) => f.starred);
    } else if (currentPage === "shared") {
      files = files.filter((f) => f.shared);
    } else if (currentPage === "recent") {
      files = files.sort((a, b) => a.modified.localeCompare(b.modified));
    } else if (currentPage === "trash") {
      files = [];
    }

    // Type filter
    if (activeFilter !== "all") {
      const types = typeFilterMap[activeFilter];
      if (types.length > 0) {
        files = files.filter((f) => types.includes(f.type));
      }
    }

    // Sort
    if (sortBy === "name") {
      files.sort((a, b) => a.name.localeCompare(b.name));
    }

    return files;
  };

  const filteredFiles = getFilteredFiles();

  const getPageContent = () => {
    if (currentPage === "trash") {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <Folder className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            Trash is empty
          </h3>
          <p className="text-sm text-gray-500 max-w-sm">
            Files you delete will appear here. They will be permanently removed
            after 30 days.
          </p>
        </div>
      );
    }

    if (currentPage === "settings") {
      return <SettingsPage />;
    }

    if (currentPage === "profile") {
      return <ProfilePage />;
    }

    return (
      <>
        {/* My Drive specific sections */}
        {currentPage === "my-drive" && (
          <>
            {/* Filter Tabs */}
            <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                    activeFilter === tab.id
                      ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                      : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  )}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}

              <div className="ml-auto flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-colors">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Sort by: Name
                </button>
                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-1.5 transition-colors",
                      viewMode === "grid"
                        ? "bg-white/10 text-white"
                        : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-1.5 transition-colors",
                      viewMode === "list"
                        ? "bg-white/10 text-white"
                        : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Access */}
            {activeFilter === "all" && (
              <section className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium text-gray-300">
                    Quick Access
                  </h2>
                  <button className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1">
                    View all <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {mockQuickAccess.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      selected={selectedFile?.id === file.id}
                      onSelect={handleFileSelect}
                      variant="grid"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Folders */}
            {activeFilter === "all" && (
              <section className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium text-gray-300">Folders</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {mockFolders.map((folder) => (
                    <FolderCard key={folder.id} folder={folder} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Files */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-300">Files</h2>
            <span className="text-xs text-gray-500">
              {filteredFiles.length} files
            </span>
          </div>

          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-3">
                <Folder className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-sm text-gray-400">No files found</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredFiles.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  selected={selectedFile?.id === file.id}
                  onSelect={handleFileSelect}
                  variant="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-0.5">
              {/* List header */}
              <div className="flex items-center gap-3 px-4 py-2 text-xs text-gray-500 border-b border-white/5">
                <span className="flex-1">Name</span>
                <span className="w-20 text-right">Size</span>
                <span className="w-24 text-right">Modified</span>
                <span className="w-12" />
              </div>
              {filteredFiles.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  selected={selectedFile?.id === file.id}
                  onSelect={handleFileSelect}
                  variant="list"
                />
              ))}
            </div>
          )}
        </section>
      </>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-5">
      {getPageContent()}
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-white mb-6">Settings</h2>
      <div className="space-y-6">
        <SettingsSection
          title="General"
          items={[
            { label: "Theme", value: "Dark", type: "toggle" },
            { label: "Language", value: "English", type: "select" },
            { label: "Notifications", value: "Enabled", type: "toggle" },
          ]}
        />
        <SettingsSection
          title="Storage"
          items={[
            { label: "Storage Used", value: "34.2 GB / Unlimited", type: "text" },
            { label: "Auto-delete trash", value: "After 30 days", type: "select" },
          ]}
        />
        <SettingsSection
          title="Security"
          items={[
            { label: "Two-factor Auth", value: "Enabled", type: "toggle" },
            { label: "Session Timeout", value: "30 minutes", type: "select" },
            { label: "Encryption", value: "End-to-end", type: "text" },
          ]}
        />
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  items,
}: {
  title: string;
  items: { label: string; value: string; type: string }[];
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
      <div className="px-4 py-3 border-b border-white/5">
        <h3 className="text-sm font-medium text-gray-200">{title}</h3>
      </div>
      <div className="divide-y divide-white/5">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="text-sm text-gray-400">{item.label}</span>
            {item.type === "toggle" ? (
              <div className="w-8 h-4 rounded-full bg-[#4F7CFF] relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" />
              </div>
            ) : (
              <span className="text-sm text-gray-300">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfilePage() {
  const { userName } = useAppStore();
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-white mb-6">Profile</h2>
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#4F7CFF] flex items-center justify-center text-xl font-bold text-white">
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{userName}</h3>
            <p className="text-sm text-gray-400">Premium Plan</p>
          </div>
        </div>
        <div className="space-y-4">
          <ProfileField label="Full Name" value={userName} />
          <ProfileField label="Email" value="david@example.com" />
          <ProfileField label="Telegram ID" value="@davidjohnson" />
          <ProfileField label="Member Since" value="January 2024" />
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm text-gray-200">{value}</span>
    </div>
  );
}
