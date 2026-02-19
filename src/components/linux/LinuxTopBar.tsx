"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Monitor, Wifi, Volume2, Battery, Folder, Terminal, Settings, Sun, Moon, LogOut } from "lucide-react";
import { profile } from "@/data/profile";
import { useTheme } from "@/components/ThemeProvider";

interface LinuxTopBarProps {
  onOpenFiles?: () => void;
  onOpenTerminal?: () => void;
}

export default function LinuxTopBar({ onOpenFiles, onOpenTerminal }: LinuxTopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [batteryPercent, setBatteryPercent] = useState(100);

  useEffect(() => {
    setBatteryPercent(Math.floor(Math.random() * 101));
  }, []);

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

  const isLight = theme === "light";
  const topBarBg = isLight ? "bg-[#e8e8ed]/95" : "bg-[#2b2b2b]/95";
  const topBarBorder = isLight ? "border-[#c8c8cd]" : "border-[#3a3a3a]";
  const hoverBg = isLight ? "hover:bg-black/5" : "hover:bg-white/5";
  const textPrimary = isLight ? "text-gray-800" : "text-gray-100";
  const textSecondary = isLight ? "text-gray-600" : "text-gray-400";
  const divider = isLight ? "bg-gray-400/40" : "bg-white/15";

  const handleOpenApp = (type: "files" | "terminal") => {
    setActivitiesOpen(false);
    if (type === "files") onOpenFiles?.();
    else onOpenTerminal?.();
  };

  return (
    <header
      className={`h-11 backdrop-blur-md ${topBarBg} flex items-center justify-between px-4 shadow-sm border-b ${topBarBorder} linux-theme-${theme}`}
    >
      {/* Left - Activities */}
      <div className="flex items-center">
        <div className="relative">
          <button
            onClick={() => setActivitiesOpen(!activitiesOpen)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${activitiesOpen ? (isLight ? "bg-black/10" : "bg-white/10") : ""} ${hoverBg} transition-colors ${textPrimary} text-sm font-medium`}
            aria-label="Activities"
          >
            <Monitor size={20} strokeWidth={1.5} />
            <span>Activities</span>
          </button>
          {activitiesOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setActivitiesOpen(false)}
              />
              <div
                className={`absolute left-0 top-full mt-1 py-2 rounded-xl shadow-2xl z-50 min-w-[200px] ${
                  isLight ? "bg-white border border-gray-200" : "bg-[#363636] border border-[#454545]"
                }`}
              >
                <div className="px-3 py-2 border-b border-[#4d4d4d]/30">
                  <span className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}>Applications</span>
                </div>
                <button
                  onClick={() => handleOpenApp("files")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 ${hoverBg} transition-colors ${textPrimary} text-sm`}
                >
                  <Folder size={20} className={isLight ? "text-amber-600" : "text-amber-400"} />
                  <span>Files</span>
                </button>
                <button
                  onClick={() => handleOpenApp("terminal")}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 ${hoverBg} transition-colors ${textPrimary} text-sm`}
                >
                  <Terminal size={20} className={isLight ? "text-green-700" : "text-green-400"} />
                  <span>Terminal</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Center - Clock */}
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        <span className={`${isLight ? "text-gray-900" : "text-gray-100"} text-sm font-medium tabular-nums`}>{timeStr}</span>
        <span className={`${textSecondary} text-[11px]`}>{dateStr}</span>
      </div>

      {/* Right - System tray + Settings + Exit + User */}
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-3 px-2 py-1 rounded-lg">
          <Wifi size={18} className={textSecondary} />
          <Volume2 size={18} className={textSecondary} />
          <div className="flex items-center gap-1.5">
            <Battery size={18} className={textSecondary} />
            <span className={`text-xs font-medium tabular-nums ${textSecondary}`}>{batteryPercent}%</span>
          </div>
        </div>
        <div className={`h-5 w-px ${divider} mx-1`} />

        {/* Settings */}
        <div className="relative">
          <button
            onClick={() => setSettingsOpen(!settingsOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded ${hoverBg} transition-colors ${textPrimary} text-sm`}
            aria-label="Settings"
          >
            <Settings size={18} />
            <span className="hidden sm:inline">Settings</span>
          </button>
          {settingsOpen && (
            <>
              <div
                className="fixed inset-0 z-[45]"
                onClick={() => setSettingsOpen(false)}
                aria-hidden="true"
              />
              <div
                className={`absolute right-0 top-full mt-1 py-2 rounded-lg shadow-xl z-[50] min-w-[180px] ${
                  isLight ? "bg-[#f3f4f6] border border-[#d1d5db]" : "bg-[#3d3d3d] border border-[#4d4d4d]"
                }`}
              >
                <div className="px-4 py-2 border-b border-[#4d4d4d]/50">
                  <span className={`text-sm font-medium ${textPrimary}`}>Appearance</span>
                </div>
                <button
                  onClick={() => {
                    toggleTheme();
                    setSettingsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 ${hoverBg} transition-colors ${textPrimary} text-sm`}
                >
                  {isLight ? (
                    <Moon size={18} className={textSecondary} />
                  ) : (
                    <Sun size={18} className={textSecondary} />
                  )}
                  <span>Switch to {isLight ? "Dark" : "Light"} Mode</span>
                </button>
              </div>
            </>
          )}
        </div>

        <div className={`h-6 w-px ${divider} mx-1`} />
        <Link
          href="/"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${hoverBg} transition-colors ${textPrimary} text-sm`}
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
