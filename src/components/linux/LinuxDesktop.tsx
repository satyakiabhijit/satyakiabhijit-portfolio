"use client";

import { useState, useCallback, useEffect } from "react";
import { Minus, Square, X, Maximize2 } from "lucide-react";
import LinuxTopBar from "./LinuxTopBar";
import LinuxFileManager from "./LinuxFileManager";
import LinuxTerminal from "./LinuxTerminal";
import LinuxDesktopIcons from "./LinuxDesktopIcons";
import { useTheme } from "@/components/ThemeProvider";

type WindowType = "files" | "terminal" | null;

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 500;
const TERMINAL_WIDTH = 700;
const TERMINAL_HEIGHT = 450;

interface WindowState {
  id: string;
  type: WindowType;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  maximized: boolean;
  initialFile?: string;
}

export default function LinuxDesktop() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [dragState, setDragState] = useState<{
    id: string;
    startX: number;
    startY: number;
    windowX: number;
    windowY: number;
  } | null>(null);
  const [resizeState, setResizeState] = useState<{
    id: string;
    edge: string;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    startWindowX: number;
    startWindowY: number;
  } | null>(null);

  const openWindow = (type: "files" | "terminal", initialFile?: string) => {
    const id = `${type}-${Date.now()}`;
    const newWindow: WindowState = {
      id,
      type,
      x: 80 + windows.length * 40,
      y: 60 + windows.length * 30,
      width: type === "terminal" ? TERMINAL_WIDTH : DEFAULT_WIDTH,
      height: type === "terminal" ? TERMINAL_HEIGHT : DEFAULT_HEIGHT,
      minimized: false,
      maximized: false,
      ...(type === "files" && initialFile ? { initialFile } : {}),
    };
    setWindows((prev) => [...prev, newWindow]);
    setActiveWindow(id);
  };

  const closeWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const next = prev.filter((w) => w.id !== id);
        if (activeWindow === id && next.length > 0) {
          setActiveWindow(next.find((x) => !x.minimized)?.id ?? next[0].id);
        } else if (activeWindow === id) {
          setActiveWindow(null);
        }
        return next;
      });
    },
    [activeWindow]
  );

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
    setActiveWindow((current) => (current === id ? null : current));
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: false } : w))
    );
    setActiveWindow(id);
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      )
    );
  }, []);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const updateWindowSize = useCallback(
    (id: string, width: number, height: number, x?: number, y?: number) => {
      setWindows((prev) =>
        prev.map((w) => {
          if (w.id !== id) return w;
          const updates: Partial<WindowState> = {
            width: Math.max(400, Math.min(width, window.innerWidth)),
            height: Math.max(300, Math.min(height, window.innerHeight - 60)),
          };
          if (x !== undefined) updates.x = Math.max(0, x);
          if (y !== undefined) updates.y = Math.max(0, y);
          return { ...w, ...updates };
        })
      );
    },
    []
  );

  const handleTitleBarMouseDown = (e: React.MouseEvent, id: string) => {
    if ((e.target as HTMLElement).closest("button")) return;
    e.preventDefault();
    const w = windows.find((w) => w.id === id);
    if (w && !w.maximized) {
      setActiveWindow(id);
      setDragState({
        id,
        startX: e.clientX,
        startY: e.clientY,
        windowX: w.x,
        windowY: w.y,
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent, id: string, edge: string) => {
    e.stopPropagation();
    const w = windows.find((w) => w.id === id);
    if (w) {
      setResizeState({
        id,
        edge,
        startX: e.clientX,
        startY: e.clientY,
        startW: w.width,
        startH: w.height,
        startWindowX: w.x,
        startWindowY: w.y,
      });
    }
  };

  useEffect(() => {
    if (!dragState) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      updateWindowPosition(
        dragState.id,
        Math.max(0, dragState.windowX + dx),
        Math.max(0, dragState.windowY + dy)
      );
    };
    const onUp = () => setDragState(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragState, updateWindowPosition]);

  useEffect(() => {
    if (!resizeState) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeState.startX;
      const dy = e.clientY - resizeState.startY;
      let width = resizeState.startW;
      let height = resizeState.startH;
      let x = resizeState.startWindowX;
      let y = resizeState.startWindowY;
      if (resizeState.edge.includes("e")) width = resizeState.startW + dx;
      if (resizeState.edge.includes("w")) {
        width = resizeState.startW - dx;
        x = resizeState.startWindowX + dx;
      }
      if (resizeState.edge.includes("s")) height = resizeState.startH + dy;
      if (resizeState.edge.includes("n")) {
        height = resizeState.startH - dy;
        y = resizeState.startWindowY + dy;
      }
      updateWindowSize(resizeState.id, width, height, x, y);
    };
    const onUp = () => setResizeState(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizeState, updateWindowSize]);

  const minimizedWindows = windows.filter((w) => w.minimized);
  const visibleWindows = windows.filter((w) => !w.minimized);

  return (
    <div
      className={`h-screen flex flex-col overflow-hidden ${
        isLight ? "bg-[#c4b5fd]" : "bg-[#1a1a2e]"
      }`}
    >
      <LinuxTopBar onOpenFiles={() => openWindow("files")} onOpenTerminal={() => openWindow("terminal")} />

      {/* Desktop background with subtle pattern */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <LinuxDesktopIcons
          onOpenFiles={() => openWindow("files")}
          onOpenTerminal={() => openWindow("terminal")}
          onOpenFile={(file) => openWindow("files", file)}
        />

        {/* Taskbar for minimized windows */}
        {minimizedWindows.length > 0 && (
          <div
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-xl backdrop-blur border ${
              isLight
                ? "bg-white/90 border-gray-300"
                : "bg-[#2d2d2d]/90 border-[#3d3d3d]"
            }`}
          >
            {minimizedWindows.map((w) => (
              <button
                key={w.id}
                onClick={() => restoreWindow(w.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isLight
                    ? "bg-gray-200 hover:bg-indigo-500 hover:text-white text-gray-700"
                    : "bg-[#3d3d3d] hover:bg-indigo-600/50 text-gray-300 hover:text-white"
                }`}
              >
                {w.type === "files" ? "Files" : "Terminal"}
              </button>
            ))}
          </div>
        )}

        {/* Floating windows */}
        {visibleWindows.map((w) => {
          const isMax = w.maximized;
          const style = isMax
            ? {
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }
            : {
                width: w.width,
                height: w.height,
                left: w.x,
                top: w.y,
              };
          return (
            <div
              key={w.id}
              className={`absolute shadow-2xl rounded-t overflow-hidden flex flex-col select-none resize-box ${
                activeWindow === w.id ? "z-20 ring-2 ring-indigo-500/50" : "z-10"
              }`}
              style={style}
              onClick={() => setActiveWindow(w.id)}
            >
              {/* Draggable title bar */}
              <div
                className={`flex items-center gap-2 px-3 py-2 border-b cursor-grab active:cursor-grabbing shrink-0 ${
                  isLight ? "bg-[#e5e7eb] border-[#d1d5db]" : "bg-[#3d3d3d] border-[#4d4d4d]"
                }`}
                onMouseDown={(e) => handleTitleBarMouseDown(e, w.id)}
              >
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeWindow(w.id);
                    }}
                    className="w-5 h-5 rounded-full bg-[#ff5f57] hover:bg-[#e0443e] flex items-center justify-center transition-colors group"
                    aria-label="Close"
                    title="Close"
                  >
                    <X size={11} className="text-black/50 group-hover:text-black/90" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      minimizeWindow(w.id);
                    }}
                    className="w-5 h-5 rounded-full bg-[#febc2e] hover:bg-[#e5a81a] flex items-center justify-center transition-colors group"
                    aria-label="Minimize"
                    title="Minimize"
                  >
                    <Minus size={11} className="text-black/50 group-hover:text-black/90" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMaximize(w.id);
                    }}
                    className="w-5 h-5 rounded-full bg-[#28c840] hover:bg-[#1e9e32] flex items-center justify-center transition-colors group"
                    aria-label={w.maximized ? "Restore" : "Maximize"}
                    title={w.maximized ? "Restore" : "Maximize"}
                  >
                    {w.maximized ? (
                      <Square size={9} className="text-black/50 group-hover:text-black/90" strokeWidth={2} />
                    ) : (
                      <Maximize2 size={9} className="text-black/50 group-hover:text-black/90" strokeWidth={2} />
                    )}
                  </button>
                </div>
                <span
                  className={`text-sm ml-2 truncate flex-1 ${
                    isLight ? "text-gray-700" : "text-gray-300"
                  }`}
                >
                  {w.type === "files" ? "Files — Home" : "Terminal"}
                </span>
              </div>

              {/* Window content */}
              <div className="flex-1 min-h-0 overflow-hidden relative">
                {w.type === "files" && <LinuxFileManager hideTitleBar initialFile={w.initialFile} />}
                {w.type === "terminal" && <LinuxTerminal hideTitleBar />}

                {/* Resize handle - bottom-right corner, only when not maximized */}
                {!isMax && (
                  <div
                    className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize flex items-end justify-end pr-0.5 pb-0.5 hover:bg-indigo-500/20 rounded-tl transition-colors"
                    onMouseDown={(e) => handleResizeMouseDown(e, w.id, "se")}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-500">
                      <path d="M12 12V8L8 12h4zM12 4V0H8l4 4z" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
