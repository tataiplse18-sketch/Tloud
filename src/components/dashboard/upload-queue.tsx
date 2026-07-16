"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { X, Pause, Play, RotateCcw, CloudUpload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function UploadQueue() {
  const { uploads, updateUpload, removeUpload } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(true);

  const activeUploads = uploads.filter((u) => u.status === "uploading");
  const totalProgress =
    activeUploads.length > 0
      ? Math.round(
          activeUploads.reduce((acc, u) => acc + u.progress, 0) /
            activeUploads.length
        )
      : 0;

  // Simulate upload progress
  useEffect(() => {
    const interval = setInterval(() => {
      uploads.forEach((upload) => {
        if (upload.status === "uploading" && upload.progress < 100) {
          const increment = Math.random() * 3;
          const newProgress = Math.min(100, upload.progress + increment);
          updateUpload(upload.id, { progress: Math.round(newProgress) });
          if (newProgress >= 100) {
            updateUpload(upload.id, { status: "completed", progress: 100 });
          }
        }
      });
    }, 500);
    return () => clearInterval(interval);
  }, [uploads, updateUpload]);

  if (uploads.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 z-50">
      {/* Minimized state */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center gap-3 bg-[#0B1220] border border-white/10 rounded-xl px-4 py-3 shadow-2xl"
        >
          <CloudUpload className="w-5 h-5 text-[#4F7CFF]" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white">
              Uploading {activeUploads.length} files...
            </p>
            <Progress value={totalProgress} className="h-1 mt-1" />
          </div>
          <span className="text-xs text-gray-400">{totalProgress}%</span>
        </button>
      )}

      {/* Expanded state */}
      {isExpanded && (
        <div className="bg-[#0B1220] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div>
              <p className="text-sm font-medium text-white">
                Uploading {activeUploads.length} files...
              </p>
              <p className="text-[11px] text-gray-500">
                2.4 GB of 5.6 GB · 24.5 MB/s
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(false)}
                className="w-6 h-6 rounded-md hover:bg-white/5 flex items-center justify-center text-gray-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto p-2 space-y-1">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/5"
              >
                <CloudUpload
                  className={`w-4 h-4 shrink-0 ${
                    upload.status === "completed"
                      ? "text-green-400"
                      : "text-[#4F7CFF]"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-200 truncate">
                    {upload.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Progress
                      value={upload.progress}
                      className="h-1 flex-1"
                    />
                    <span className="text-[10px] text-gray-500">
                      {upload.progress}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  {upload.status === "uploading" && (
                    <button
                      onClick={() =>
                        updateUpload(upload.id, { status: "paused" })
                      }
                      className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-gray-500"
                    >
                      <Pause className="w-3 h-3" />
                    </button>
                  )}
                  {upload.status === "paused" && (
                    <button
                      onClick={() =>
                        updateUpload(upload.id, { status: "uploading" })
                      }
                      className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-gray-500"
                    >
                      <Play className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => removeUpload(upload.id)}
                    className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-gray-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
