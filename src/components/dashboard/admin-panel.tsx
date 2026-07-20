"use client";

import { useState } from "react";
import {
  Users,
  HardDrive,
  FileText,
  Clock,
  Shield,
  Search,
  BarChart3,
  Activity,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const mockAdminStats = [
  { label: "Total Users", value: "2,847", icon: Users, color: "#4F7CFF", change: "+12%" },
  { label: "Storage Used", value: "4.2 TB", icon: HardDrive, color: "#8B5CF6", change: "+8%" },
  { label: "Total Files", value: "128,456", icon: FileText, color: "#22C55E", change: "+23%" },
  { label: "Active Today", value: "891", icon: Activity, color: "#00C2FF", change: "+5%" },
];

const mockUsers = [
  { name: "David Johnson", files: 234, storage: "12.4 GB", lastActive: "2 min ago", plan: "Premium" },
  { name: "Alex Sharma", files: 156, storage: "8.7 GB", lastActive: "15 min ago", plan: "Free" },
  { name: "Priya Patel", files: 89, storage: "3.2 GB", lastActive: "1 hour ago", plan: "Premium" },
  { name: "Rahul Kumar", files: 432, storage: "24.1 GB", lastActive: "3 hours ago", plan: "Premium" },
  { name: "Sneha Gupta", files: 67, storage: "1.8 GB", lastActive: "5 hours ago", plan: "Free" },
  { name: "Mike Chen", files: 321, storage: "18.9 GB", lastActive: "1 day ago", plan: "Premium" },
];

const mockRecentFiles = [
  { name: "quarterly_report.pdf", user: "David Johnson", size: "4.2 MB", time: "2 min ago" },
  { name: "vacation_photo.jpg", user: "Alex Sharma", size: "3.8 MB", time: "5 min ago" },
  { name: "project_assets.zip", user: "Rahul Kumar", size: "245 MB", time: "12 min ago" },
  { name: "presentation.pptx", user: "Priya Patel", size: "28.5 MB", time: "30 min ago" },
  { name: "song_remix.mp3", user: "Sneha Gupta", size: "8.4 MB", time: "1 hour ago" },
];

export default function AdminPanel() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#4F7CFF]" />
            Admin Panel
          </h2>
          <p className="text-sm text-gray-400">
            Monitoring dashboard — metadata only, never session data
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Activity className="w-3.5 h-3.5 text-green-400" />
          System healthy
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockAdminStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <span className="text-[10px] text-green-400 font-medium flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold text-white">{stat.value}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-[#4F7CFF]" />
            <h3 className="text-sm font-medium text-white">Upload Activity</h3>
          </div>
          <div className="flex items-end gap-2 h-32">
            {[40, 65, 30, 80, 55, 90, 45, 70, 60, 85, 50, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm transition-all hover:opacity-80"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(to top, #4F7CFF, #00C2FF)`,
                  opacity: 0.6 + (h / 100) * 0.4,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-gray-600">Jan</span>
            <span className="text-[10px] text-gray-600">Jun</span>
            <span className="text-[10px] text-gray-600">Dec</span>
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-4">
            <HardDrive className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-medium text-white">Storage Distribution</h3>
          </div>
          <div className="space-y-3">
            {[
              { label: "Images", pct: 35, color: "#22C55E" },
              { label: "Videos", pct: 28, color: "#8B5CF6" },
              { label: "Documents", pct: 22, color: "#4F7CFF" },
              { label: "Audio", pct: 10, color: "#EC4899" },
              { label: "Other", pct: 5, color: "#F97316" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">{item.label}</span>
                  <span className="text-xs text-gray-500">{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${item.pct}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <h3 className="text-sm font-medium text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-[#4F7CFF]" />
            Users
          </h3>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 h-8 text-xs pl-8 w-48"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-[11px] text-gray-500 font-medium px-5 py-2.5">User</th>
                <th className="text-left text-[11px] text-gray-500 font-medium px-5 py-2.5">Files</th>
                <th className="text-left text-[11px] text-gray-500 font-medium px-5 py-2.5">Storage</th>
                <th className="text-left text-[11px] text-gray-500 font-medium px-5 py-2.5">Last Active</th>
                <th className="text-left text-[11px] text-gray-500 font-medium px-5 py-2.5">Plan</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.name}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#4F7CFF] flex items-center justify-center text-[10px] font-bold text-white">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm text-gray-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-400">{user.files}</td>
                  <td className="px-5 py-3 text-sm text-gray-400">{user.storage}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{user.lastActive}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${
                        user.plan === "Premium"
                          ? "bg-[#4F7CFF]/10 text-[#4F7CFF]"
                          : "bg-white/5 text-gray-500"
                      }`}
                    >
                      {user.plan}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Files */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5">
          <h3 className="text-sm font-medium text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Recent Uploads
          </h3>
        </div>
        <div className="divide-y divide-white/5">
          {mockRecentFiles.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02] transition-colors"
            >
              <FileText className="w-4 h-4 text-gray-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 truncate">{file.name}</p>
                <p className="text-[11px] text-gray-500">
                  by {file.user} · {file.size}
                </p>
              </div>
              <span className="text-[11px] text-gray-500 shrink-0">{file.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Note */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
        <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-yellow-300/80">
          This admin panel shows metadata only. It never decrypts or displays
          user Telegram session strings, as those are equivalent to live logins
          to their real accounts.
        </p>
      </div>
    </div>
  );
}
