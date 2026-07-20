"use client";

import { useAppStore, type FileItem } from "@/store/app-store";
import {
  X,
  Share2,
  Download,
  Pencil,
  FolderInput,
  Star,
  Trash2,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Lock,
  Tag,
} from "lucide-react";
import { type FileType } from "@/store/app-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const typeIcons: Record<FileType, React.ElementType> = {
  document: FileText,
  image: Image,
  video: Video,
  music: Music,
  archive: Archive,
  folder: FolderInput,
  other: FileText,
};

const typeLabels: Record<FileType, string> = {
  document: "Document",
  image: "Image",
  video: "Video",
  music: "Audio",
  archive: "Archive",
  folder: "Folder",
  other: "File",
};

export default function RightPanel() {
  const { rightPanelOpen, setRightPanelOpen, selectedFile, setSelectedFile } =
    useAppStore();

  if (!rightPanelOpen || !selectedFile) return null;

  const Icon = typeIcons[selectedFile.type];

  const closePanel = () => {
    setSelectedFile(null);
    setRightPanelOpen(false);
  };

  return (
    <aside className="w-80 h-full border-l border-white/10 bg-[#0B1220] flex flex-col overflow-hidden shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <h3 className="text-sm font-medium text-white">Details</h3>
        <button
          onClick={closePanel}
          className="w-7 h-7 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Preview */}
      <div className="px-4 py-4">
        <div className="w-full aspect-[4/3] rounded-xl bg-white/5 flex items-center justify-center mb-4">
          <Icon className="w-16 h-16 text-gray-500" />
        </div>
      </div>

      {/* File Info */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-semibold text-white truncate">
            {selectedFile.name}
          </h4>
          <button>
            <Star
              className={`w-4 h-4 shrink-0 ${
                selectedFile.starred
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-500"
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-gray-500">
          {selectedFile.size} · {typeLabels[selectedFile.type]}
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="flex-1 overflow-hidden flex flex-col">
        <TabsList className="w-full justify-start px-4 bg-transparent border-b border-white/5 rounded-none h-9 p-0">
          <TabsTrigger
            value="details"
            className="text-xs data-[state=active]:text-[#4F7CFF] data-[state=active]:border-b-2 data-[state=active]:border-[#4F7CFF] rounded-none pb-2"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="text-xs data-[state=active]:text-[#4F7CFF] data-[state=active]:border-b-2 data-[state=active]:border-[#4F7CFF] rounded-none pb-2"
          >
            Activity
          </TabsTrigger>
          <TabsTrigger
            value="sharing"
            className="text-xs data-[state=active]:text-[#4F7CFF] data-[state=active]:border-b-2 data-[state=active]:border-[#4F7CFF] rounded-none pb-2"
          >
            Sharing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="flex-1 overflow-y-auto px-4 py-3 mt-0">
          <div className="space-y-3">
            <DetailRow label="Type" value={typeLabels[selectedFile.type]} />
            <DetailRow label="Size" value={`${selectedFile.size} (${selectedFile.sizeBytes.toLocaleString()} bytes)`} />
            <DetailRow label="Location" value={selectedFile.folder || "My Drive"} />
            <DetailRow label="Uploaded" value="May 15, 2024, 10:30 AM" />
            <DetailRow label="Modified" value="May 15, 2024, 10:30 AM" />

            <Separator className="bg-white/5" />

            {/* Security */}
            <div className="flex items-center gap-2 py-1">
              <Lock className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-green-400 font-medium">
                End-to-End Encrypted
              </span>
            </div>

            <Separator className="bg-white/5" />

            {/* Tags */}
            <div>
              <p className="text-[11px] text-gray-500 mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedFile.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-gray-300"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
                <button className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-gray-500 hover:text-gray-300">
                  <Tag className="w-2.5 h-2.5" />+
                </button>
              </div>
            </div>

            {/* Description */}
            {selectedFile.description && (
              <>
                <Separator className="bg-white/5" />
                <div>
                  <p className="text-[11px] text-gray-500 mb-1">Description</p>
                  <p className="text-xs text-gray-300">
                    {selectedFile.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="flex-1 overflow-y-auto px-4 py-3 mt-0">
          <div className="space-y-3">
            <ActivityItem text="File uploaded" time="May 15, 2024, 10:30 AM" />
            <ActivityItem text="Shared with team" time="May 14, 2024, 3:45 PM" />
            <ActivityItem text="File modified" time="May 14, 2024, 2:20 PM" />
            <ActivityItem text="Added to favorites" time="May 13, 2024, 11:00 AM" />
          </div>
        </TabsContent>

        <TabsContent value="sharing" className="flex-1 overflow-y-auto px-4 py-3 mt-0">
          <div className="space-y-3">
            <p className="text-xs text-gray-400">
              This file is {selectedFile.shared ? "shared" : "not shared"}.
            </p>
            {selectedFile.shared && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-400">
                  TL
                </div>
                <div>
                  <p className="text-xs text-gray-200">Team Link</p>
                  <p className="text-[10px] text-gray-500">Can view</p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Actions */}
      <div className="border-t border-white/5 p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Button
            size="sm"
            className="flex-1 bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white text-xs h-8"
          >
            <Share2 className="w-3.5 h-3.5 mr-1" />
            Share
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/5"
          >
            <Download className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/5"
          >
            <Pencil className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/5"
          >
            <FolderInput className="w-3.5 h-3.5" />
          </Button>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-8 text-xs text-gray-400 hover:text-white hover:bg-white/5"
          >
            <Star className="w-3.5 h-3.5 mr-1" />
            Add to Starred
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 h-8 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </aside>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[11px] text-gray-500 shrink-0">{label}</span>
      <span className="text-xs text-gray-300 text-right">{value}</span>
    </div>
  );
}

function ActivityItem({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs text-gray-300">{text}</span>
      <span className="text-[10px] text-gray-500 shrink-0">{time}</span>
    </div>
  );
}
