import { create } from "zustand";

export type ViewMode = "grid" | "list";
export type PageType = "my-drive" | "recent" | "starred" | "shared" | "trash" | "settings" | "profile" | "api" | "admin";
export type FileType = "image" | "video" | "document" | "music" | "archive" | "folder" | "other";
export type FilterTab = "all" | "images" | "videos" | "documents" | "music" | "archives" | "others";

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: string;
  sizeBytes: number;
  modified: string;
  folder?: string;
  starred: boolean;
  shared: boolean;
  thumbnail?: string;
  tags?: string[];
  description?: string;
}

export interface FolderItem {
  id: string;
  name: string;
  itemCount: number;
  color: string;
  type: FileType;
}

export interface UploadItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  speed: string;
  status: "uploading" | "paused" | "completed" | "error";
}

interface AppState {
  // Navigation
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;

  // View
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // Filter
  activeFilter: FilterTab;
  setActiveFilter: (filter: FilterTab) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Right panel
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
  selectedFile: FileItem | null;
  setSelectedFile: (file: FileItem | null) => void;

  // Search
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Upload
  uploads: UploadItem[];
  addUpload: (upload: UploadItem) => void;
  updateUpload: (id: string, updates: Partial<UploadItem>) => void;
  removeUpload: (id: string) => void;

  // Auth
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  showLogin: boolean;
  setShowLogin: (show: boolean) => void;
  userName: string;
  setUserName: (name: string) => void;

  // Storage
  storageUsed: number;
  storageTotal: number;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: "my-drive",
  setCurrentPage: (page) => set({ currentPage: page }),

  viewMode: "grid",
  setViewMode: (mode) => set({ viewMode: mode }),

  activeFilter: "all",
  setActiveFilter: (filter) => set({ activeFilter: filter }),

  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  rightPanelOpen: false,
  setRightPanelOpen: (open) => set({ rightPanelOpen: open }),
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file, rightPanelOpen: !!file }),

  searchOpen: false,
  setSearchOpen: (open) => set({ searchOpen: open }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  uploads: [],
  addUpload: (upload) => set((state) => ({ uploads: [...state.uploads, upload] })),
  updateUpload: (id, updates) =>
    set((state) => ({
      uploads: state.uploads.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    })),
  removeUpload: (id) =>
    set((state) => ({ uploads: state.uploads.filter((u) => u.id !== id) })),

  isLoggedIn: false,
  setIsLoggedIn: (logged) => set({ isLoggedIn: logged }),
  showLogin: false,
  setShowLogin: (show) => set({ showLogin: show }),
  userName: "David Johnson",
  setUserName: (name) => set({ userName: name }),

  storageUsed: 68,
  storageTotal: 100,
}));
