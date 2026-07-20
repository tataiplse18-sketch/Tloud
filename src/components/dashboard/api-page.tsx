"use client";

import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import {
  Key,
  Copy,
  Check,
  Code2,
  ArrowRight,
  ExternalLink,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const apiEndpoints = [
  {
    method: "POST",
    path: "/api/v1/upload",
    description: "Upload a file (multipart field 'file', optional ?public=1)",
  },
  {
    method: "GET",
    path: "/api/v1/files",
    description: "List all your files",
  },
  {
    method: "GET",
    path: "/api/v1/files/:id",
    description: "Get metadata for one file",
  },
  {
    method: "GET",
    path: "/api/v1/files/:id/stream",
    description: "Download/stream a file (supports Range headers)",
  },
  {
    method: "DELETE",
    path: "/api/v1/files/:id",
    description: "Delete a file",
  },
];

const methodColors: Record<string, string> = {
  GET: "text-green-400 bg-green-400/10",
  POST: "text-blue-400 bg-blue-400/10",
  PUT: "text-yellow-400 bg-yellow-400/10",
  DELETE: "text-red-400 bg-red-400/10",
};

export default function ApiPage() {
  const [apiKey, setApiKey] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateKey = () => {
    const key = "tc_" + Array.from({ length: 32 }, () =>
      "0123456789abcdef"[Math.floor(Math.random() * 16)]
    ).join("");
    setApiKey(key);
    setGenerated(true);
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Developer API</h2>
        <p className="text-sm text-gray-400">
          Generate a free personal API key and integrate Telegram Drive into
          your own apps and scripts.
        </p>
      </div>

      {/* API Key Generation */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-[#4F7CFF]" />
          <h3 className="text-sm font-medium text-white">Your API Key</h3>
        </div>

        {!generated ? (
          <div className="space-y-3">
            <p className="text-xs text-gray-400">
              Your API key is free and shares the same rate limits and Telegram
              storage as the website. There is no separate quota.
            </p>
            <Button
              onClick={generateKey}
              className="bg-[#4F7CFF] hover:bg-[#3D6AE8] text-white text-sm"
            >
              <Key className="w-4 h-4 mr-1.5" />
              Generate API Key
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/5 rounded-lg px-3 py-2.5 font-mono text-xs text-gray-300 truncate border border-white/10">
                {apiKey}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyKey}
                className="h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-white/5"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-[11px] text-gray-500">
              Keep this key secret. It provides full access to your files via
              the API.
            </p>
          </div>
        )}
      </div>

      {/* Auth Header */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-green-400" />
          <h3 className="text-sm font-medium text-white">Authentication</h3>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Include your API key in any request using one of these headers:
        </p>
        <div className="bg-black/30 rounded-lg p-3 font-mono text-xs space-y-1">
          <p className="text-gray-400">
            <span className="text-purple-400">X-API-Key</span>: tc_xxxxxxxxxxxxxxxxxxxx
          </p>
          <p className="text-gray-400">
            <span className="text-purple-400">Authorization</span>: Bearer
            tc_xxxxxxxxxxxxxxxxxxxx
          </p>
        </div>
      </div>

      {/* Endpoints */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-medium text-white">Endpoints</h3>
        </div>
        <div className="space-y-2">
          {apiEndpoints.map((ep) => (
            <div
              key={ep.path + ep.method}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                  methodColors[ep.method]
                }`}
              >
                {ep.method}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-mono text-gray-200">{ep.path}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {ep.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example */}
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="flex items-center gap-2 mb-3">
          <ArrowRight className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-medium text-white">Quick Example</h3>
        </div>
        <div className="bg-black/30 rounded-lg p-3 font-mono text-xs overflow-x-auto">
          <p className="text-gray-500"># Upload a file</p>
          <p className="text-gray-300">
            <span className="text-green-400">curl</span> -X POST \
          </p>
          <p className="text-gray-300 ml-4">
            {"-H "}
            <span className="text-yellow-300">
              &quot;X-API-Key: {apiKey || "tc_your_key"}&quot;
            </span>
            {" \\"}
          </p>
          <p className="text-gray-300 ml-4">
            -F <span className="text-yellow-300">&quot;file=@photo.jpg&quot;</span> \
          </p>
          <p className="text-gray-300 ml-4">
            <span className="text-cyan-400">https://api.telegramdrive.com/api/v1/upload</span>
          </p>
        </div>
      </div>

      {/* Note */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
        <ExternalLink className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-300/80">
          The API is free to use. It shares the same rate limits and underlying
          Telegram storage as the website — there&apos;s no separate quota.
        </p>
      </div>
    </div>
  );
}
