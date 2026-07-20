"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Folder,
  Settings,
  Star,
  Clock,
  Users,
  Trash2,
} from "lucide-react";
import { mockFiles, mockFolders } from "@/data/mock-data";

export default function SearchPalette() {
  const { searchOpen, setSearchOpen, setCurrentPage, setSelectedFile } =
    useAppStore();

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [searchOpen, setSearchOpen]);

  const navigateTo = (page: "my-drive" | "recent" | "starred" | "shared" | "trash" | "settings" | "api" | "admin") => {
    setCurrentPage(page);
    setSearchOpen(false);
  };

  return (
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <CommandInput placeholder="Search files, folders, and actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => navigateTo("my-drive")}
            className="cursor-pointer"
          >
            <Folder className="mr-2 h-4 w-4 text-[#F59E0B]" />
            <span>Go to My Drive</span>
          </CommandItem>
          <CommandItem
            onSelect={() => navigateTo("recent")}
            className="cursor-pointer"
          >
            <Clock className="mr-2 h-4 w-4 text-gray-400" />
            <span>Go to Recent</span>
          </CommandItem>
          <CommandItem
            onSelect={() => navigateTo("starred")}
            className="cursor-pointer"
          >
            <Star className="mr-2 h-4 w-4 text-yellow-400" />
            <span>Go to Starred</span>
          </CommandItem>
          <CommandItem
            onSelect={() => navigateTo("shared")}
            className="cursor-pointer"
          >
            <Users className="mr-2 h-4 w-4 text-blue-400" />
            <span>Go to Shared with me</span>
          </CommandItem>
          <CommandItem
            onSelect={() => navigateTo("trash")}
            className="cursor-pointer"
          >
            <Trash2 className="mr-2 h-4 w-4 text-red-400" />
            <span>Go to Trash</span>
          </CommandItem>
          <CommandItem
            onSelect={() => navigateTo("settings")}
            className="cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4 text-gray-400" />
            <span>Go to Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Folders">
          {mockFolders.map((folder) => (
            <CommandItem key={folder.id} className="cursor-pointer">
              <Folder
                className="mr-2 h-4 w-4"
                style={{ color: folder.color }}
              />
              <span>{folder.name}</span>
              <span className="ml-auto text-xs text-gray-500">
                {folder.itemCount} items
              </span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Files">
          {mockFiles.slice(0, 8).map((file) => (
            <CommandItem
              key={file.id}
              className="cursor-pointer"
              onSelect={() => {
                setSelectedFile(file);
                setSearchOpen(false);
              }}
            >
              {file.type === "image" ? (
                <ImageIcon className="mr-2 h-4 w-4 text-green-400" />
              ) : file.type === "video" ? (
                <Video className="mr-2 h-4 w-4 text-purple-400" />
              ) : file.type === "music" ? (
                <Music className="mr-2 h-4 w-4 text-pink-400" />
              ) : (
                <FileText className="mr-2 h-4 w-4 text-blue-400" />
              )}
              <span>{file.name}</span>
              <span className="ml-auto text-xs text-gray-500">{file.size}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
