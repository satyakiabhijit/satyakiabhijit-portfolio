"use client";

import { Folder, Terminal, FileText } from "lucide-react";

const icons = [
  {
    name: "Home",
    icon: Folder,
    action: "files",
    color: "text-amber-500",
  },
  {
    name: "Terminal",
    icon: Terminal,
    action: "terminal",
    color: "text-green-500",
  },
  {
    name: "about.txt",
    icon: FileText,
    action: "about",
    color: "text-blue-400",
  },
];

export default function LinuxDesktopIcons({
  onOpenFiles,
  onOpenTerminal,
  onOpenFile,
}: {
  onOpenFiles: () => void;
  onOpenTerminal: () => void;
  onOpenFile?: (fileName: string) => void;
}) {
  const handleDoubleClick = (action: string) => {
    if (action === "files") onOpenFiles();
    else if (action === "terminal") onOpenTerminal();
    else if (action === "about" && onOpenFile) onOpenFile("about.txt");
  };

  return (
    <div className="absolute inset-0 pt-16 sm:pt-24 pl-3 sm:pl-8 flex flex-col gap-4 sm:gap-6">
      {icons.map((item) => (
        <button
          key={item.name}
          onClick={() => handleDoubleClick(item.action)}
          className="flex flex-col items-center gap-2 w-16 sm:w-20 group cursor-pointer"
          type="button"
        >
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center ${item.color} transition-colors bg-black/20 group-hover:bg-white/10`}
          >
            <item.icon size={28} />
          </div>
          <span
            className="text-xs sm:text-sm text-center rounded px-2 py-0.5 drop-shadow-lg text-white group-hover:bg-white/20 max-w-full truncate"
          >
            {item.name}
          </span>
        </button>
      ))}
    </div>
  );
}
