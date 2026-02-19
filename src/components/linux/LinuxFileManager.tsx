"use client";

import { useState, useEffect } from "react";
import { Folder, FileText, Home } from "lucide-react";
import { listDir, VirtualFile } from "@/data/linuxFiles";
import { useTheme } from "@/components/ThemeProvider";

export default function LinuxFileManager({ hideTitleBar = false, initialFile }: { hideTitleBar?: boolean; initialFile?: string }) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [currentPath, setCurrentPath] = useState("");
  const [selectedFile, setSelectedFile] = useState<VirtualFile | null>(null);

  useEffect(() => {
    if (!initialFile) return;
    const parts = initialFile.split("/");
    if (parts.length > 1) {
      const dir = parts.slice(0, -1).join("/");
      const fileName = parts[parts.length - 1];
      const dirFiles = listDir(dir);
      const targetFile = dirFiles?.find((f) => f.name === fileName);
      if (targetFile) {
        setCurrentPath(dir);
        setSelectedFile(targetFile);
        return;
      }
    }
    const files = listDir(".");
    const file = files?.find((f) => f.name === initialFile);
    if (file) setSelectedFile(file);
  }, [initialFile]);

  const currentFiles = listDir(currentPath || ".") || [];
  const fileContent = selectedFile?.type === "file" && selectedFile.content;

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    setSelectedFile(null);
  };

  const handleFileClick = (file: VirtualFile) => {
    if (file.type === "directory") {
      const newPath = currentPath ? `${currentPath}/${file.name}` : file.name;
      setCurrentPath(newPath);
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      if (file.href) window.open(file.href, "_blank");
    }
  };

  const breadcrumbParts = currentPath ? currentPath.split("/") : [];

  return (
    <div
      className={`h-full flex flex-col rounded-b overflow-hidden ${
        isLight ? "bg-[#e5e7eb]" : "bg-[#2d2d2d]"
      }`}
    >
      {!hideTitleBar && (
        <div
          className={`flex items-center gap-2 px-3 py-2 border-b ${
            isLight ? "bg-[#d1d5db] border-[#9ca3af]" : "bg-[#3d3d3d] border-[#4d4d4d]"
          }`}
        >
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className={`text-sm ml-2 ${isLight ? "text-gray-700" : "text-gray-300"}`}>Files — Home</span>
        </div>
      )}

      {/* Toolbar */}
      <div
        className={`flex items-center gap-2 px-3 py-2 border-b ${
          isLight ? "bg-[#e5e7eb] border-[#d1d5db]" : "bg-[#2d2d2d] border-[#3d3d3d]"
        }`}
      >
        <button
          onClick={() => navigateTo("")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm ${
            isLight ? "hover:bg-[#d1d5db] text-gray-600 hover:text-gray-800" : "hover:bg-[#3d3d3d] text-gray-400 hover:text-gray-200"
          }`}
        >
          <Home size={16} />
          Home
        </button>
        <div
          className={`flex-1 flex items-center gap-1 px-3 py-1.5 rounded text-sm font-mono overflow-x-auto ${
            isLight ? "bg-white text-gray-600 border border-gray-300" : "bg-[#1e1e1e] text-gray-400"
          }`}
        >
          <span className="text-cyan-400">~</span>
          {breadcrumbParts.map((part, i) => (
            <span key={i}>
              <span className="text-gray-500">/</span>
              <button
                onClick={() =>
                  navigateTo(breadcrumbParts.slice(0, i + 1).join("/"))
                }
                className={isLight ? "hover:text-gray-900" : "hover:text-gray-200"}
              >
                {part}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex min-h-0">
        {/* File list */}
        <div
          className={`w-1/2 border-r flex flex-col overflow-hidden ${
            isLight ? "border-gray-300" : "border-[#3d3d3d]"
          }`}
        >
          <div className="flex-1 overflow-auto p-2">
            {currentPath && (
              <button
                onClick={() => {
                  const parent = currentPath.split("/").slice(0, -1).join("/");
                  navigateTo(parent);
                }}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded text-sm ${
                  isLight ? "hover:bg-gray-200 text-gray-600 hover:text-gray-800" : "hover:bg-[#3d3d3d] text-gray-400 hover:text-gray-200"
                }`}
              >
                <Folder size={18} />
                ..
              </button>
            )}
            {currentFiles.map((file) => (
              <button
                key={file.name}
                onClick={() => handleFileClick(file)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded text-left text-sm ${
                  selectedFile?.name === file.name
                    ? "bg-indigo-600/30 text-indigo-300"
                    : isLight
                      ? "text-gray-700 hover:bg-gray-200"
                      : "text-gray-300 hover:bg-[#3d3d3d]"
                }`}
              >
                {file.type === "directory" ? (
                  <Folder size={18} className="text-amber-500" />
                ) : (
                  <FileText size={18} className="text-blue-400" />
                )}
                {file.name}
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div
          className={`w-1/2 flex flex-col ${isLight ? "bg-white" : "bg-[#1e1e1e]"}`}
        >
          {fileContent ? (
            <pre
              className={`flex-1 p-4 overflow-auto text-xs font-mono whitespace-pre-wrap ${
                isLight ? "text-gray-800" : "text-gray-300"
              }`}
            >
              {fileContent}
            </pre>
          ) : (
            <div className={`flex-1 flex items-center justify-center text-sm ${isLight ? "text-gray-500" : "text-gray-500"}`}>
              {selectedFile ? "Binary or external file" : "Select a file to preview"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
