"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Monitor, Wifi, Volume2, Battery, Folder, Terminal, LogOut } from "lucide-react";
import { profile } from "@/data/profile";

interface LinuxTopBarProps {
  onOpenFiles?: () => void;
  onOpenTerminal?: () => void;
}

export default function LinuxTopBar({ onOpenFiles, onOpenTerminal }: LinuxTopBarProps) {
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [batteryPercent, setBatteryPercent] = useState(100);
  const activitiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBatteryPercent(Math.floor(Math.random() * 101));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (activitiesOpen && activitiesRef.current && !activitiesRef.current.contains(target)) {
        setActivitiesOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [activitiesOpen]);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const topBarBg = "bg-[#300a24]/95";
  const topBarBorder = "border-[#4a183d]";
  const hoverBg = "hover:bg-white/5";
  const textPrimary = "text-gray-100";
  const textSecondary = "text-gray-400";
  const divider = "bg-white/15";

  const handleOpenApp = (type: "files" | "terminal") => {
    setActivitiesOpen(false);
    if (type === "files") onOpenFiles?.();
    else onOpenTerminal?.();
  };

  return (
    <header className={`h-11 backdrop-blur-md ${topBarBg} flex items-center justify-between px-4 shadow-sm border-b ${topBarBorder}`}>
      <div className="flex items-center">
        <div className="relative" ref={activitiesRef}>
          <button
            onClick={() => setActivitiesOpen(!activitiesOpen)}
            className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg ${activitiesOpen ? "bg-white/10" : ""} ${hoverBg} transition-colors ${textPrimary} text-sm font-medium`}
            aria-label="Activities"
          >
            <Monitor size={20} strokeWidth={1.5} />
            <span>Activities</span>
          </button>
          {activitiesOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-full mt-1 py-2 rounded-xl shadow-2xl z-[70] min-w-[200px] bg-[#3a1230] border border-[#5b254d]"
            >
              <div className="px-3 py-2 border-b border-[#4d4d4d]/30">
                <span className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}>Applications</span>
              </div>
              <button
                onClick={() => handleOpenApp("files")}
                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 ${hoverBg} transition-colors ${textPrimary} text-sm`}
              >
                <Folder size={20} className="text-amber-400" />
                <span>Files</span>
              </button>
              <button
                onClick={() => handleOpenApp("terminal")}
                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 ${hoverBg} transition-colors ${textPrimary} text-sm`}
              >
                <Terminal size={20} className="text-green-400" />
                <span>Terminal</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <span suppressHydrationWarning className="text-gray-100 text-sm font-medium tabular-nums">{timeStr}</span>
        <span suppressHydrationWarning className={`${textSecondary} text-[11px]`}>{dateStr}</span>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-3 px-2 py-1 rounded-lg">
          <Wifi size={18} className={textSecondary} />
          <Volume2 size={18} className={textSecondary} />
          <div className="flex items-center gap-1.5">
            <Battery size={18} className={textSecondary} />
            <span className={`text-xs font-medium tabular-nums ${textSecondary}`}>{batteryPercent}%</span>
          </div>
        </div>
        <div className={`h-6 w-px ${divider} mx-1`} />
        <Link
          href="/"
          className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg ${hoverBg} transition-colors ${textPrimary} text-sm`}
        >
          <LogOut size={16} />
          <span>Exit to Classic</span>
        </Link>
        <div className={`flex items-center gap-2 pl-3 ml-1 border-l ${divider}`}>
          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/20">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </div>
          <span className={`${textPrimary} text-sm font-medium hidden sm:inline`}>
            {profile.name.split(" ")[0]}
          </span>
        </div>
      </div>
    </header>
  );
}
