"use client";

import { useState, useRef, useEffect } from "react";
import {
  getFileContent,
  listDir,
} from "@/data/linuxFiles";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const USER = "abhijit";
const HOST = "portfolio";

function formatPath(path: string): string {
  if (!path || path === ".") return "~";
  if (path.startsWith("/home/")) return "~" + path.slice(5);
  return path.startsWith("/") ? path : `~/${path}`;
}

function resolvePath(currentPath: string, input: string): string {
  let path = currentPath;
  const parts = input.split("/").filter(Boolean);

  for (const part of parts) {
    if (part === "..") {
      path = path.split("/").slice(0, -1).join("/") || ".";
    } else if (part !== ".") {
      path = path ? `${path}/${part}` : part;
    }
  }
  return path || ".";
}

export default function LinuxTerminal({ hideTitleBar = false }: { hideTitleBar?: boolean }) {
  const [history, setHistory] = useState<{ cmd: string; output: string[] }[]>([
    {
      cmd: "",
      output: [
        `Welcome to ${profile.name}'s Portfolio Terminal`,
        "",
        "Type 'help' for available commands. Try: ls, cat about.txt, cd projects",
        "",
      ],
    },
  ]);
  const [currentPath, setCurrentPath] = useState(".");
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState(`${USER}@${HOST}:~$ `);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPrompt(`${USER}@${HOST}:${formatPath(currentPath)}$ `);
  }, [currentPath]);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  const executeCommand = (cmd: string): string[] => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0]?.toLowerCase() || "";
    const args = parts.slice(1);

    if (!command) return [];

    switch (command) {
      case "clear":
        setHistory([{ cmd: "", output: [] }]);
        return [];

      case "help":
        return [
          "Available commands:",
          "  ls [path]     - List directory contents",
          "  cd <path>     - Change directory",
          "  cat <file>    - Display file contents",
          "  pwd           - Print working directory",
          "  whoami        - Print username",
          "  neofetch      - System information",
          "  clear         - Clear terminal",
          "  exit          - Close terminal",
          "",
          "Try: ls, cat about.txt, cd projects",
        ];

      case "pwd":
        return [formatPath(currentPath)];

      case "whoami":
        return [USER];

      case "ls": {
        const path = args[0] ? resolvePath(currentPath, args[0]) : currentPath;
        const files = listDir(path);
        if (files === null) return [`ls: cannot access '${args[0] || path}': No such file or directory`];
        const entries = files
          .map((f) => (f.type === "directory" ? `${f.name}/` : f.name))
          .sort((a, b) => a.localeCompare(b));
        return entries.length ? entries : ["(empty)"];
      }

      case "cd": {
        const target = args[0] || ".";
        const newPath = resolvePath(currentPath, target);
        const files = listDir(newPath);
        if (files === null) return [`cd: no such file or directory: ${target}`];
        setCurrentPath(newPath);
        return [];
      }

      case "cat": {
        if (!args[0]) return ["cat: missing file operand"];
        const filePath = resolvePath(currentPath, args[0]);
        const content = getFileContent(filePath);
        if (content === null) return [`cat: ${args[0]}: No such file or directory`];
        return content.split("\n");
      }

      case "neofetch":
        return [
          "        .88888888:.",
          "     .88888888888888.",
          "   .8888888888888888.",
          `  .888888888888888888.    ${profile.name}@portfolio`,
          "  88888888888888888888   --------------------",
          "  88888888888888888888   OS: Portfolio Linux 1.0",
          "  88888888888888888888   Host: Personal Website",
          "  '8888888888888888888   Kernel: React 19.x",
          "   .88888888888888888.   Uptime: Building cool stuff",
          "     .88888888888888.    Packages: " + projects.length + " projects",
          "       '88888888888'     Shell: bash 5.2",
          `                       ${profile.title}`,
          "                       " + profile.location,
        ];

      case "exit":
        window.close();
        return ["Use 'Exit to Classic' in the top bar to return to the main site."];

      default:
        return [`${command}: command not found. Type 'help' for available commands.`];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const output = executeCommand(input);
    setHistory((prev) => [
      ...prev,
      { cmd: input, output },
    ]);
    setInput("");
  };

  return (
    <div
      ref={containerRef}
      className="h-full font-mono text-sm flex flex-col overflow-auto rounded-b bg-[#1e1e1e] text-green-400"
    >
      {!hideTitleBar && (
        <div className="flex items-center gap-2 px-3 py-2 border-b bg-[#2d2d2d] border-[#3d3d3d]">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs ml-2 text-gray-400">bash - portfolio</span>
        </div>
      )}

      <div className="flex-1 p-4 overflow-auto min-h-0">
        {history.map((h, i) => (
          <div key={i} className="mb-2">
            {h.cmd && (
              <div className="flex">
                <span className="shrink-0 text-cyan-400">{prompt}</span>
                <span>{h.cmd}</span>
              </div>
            )}
            {h.output.length > 0 && (
              <pre className="whitespace-pre-wrap break-words mt-1 font-mono text-[13px] text-gray-300">
                {h.output.join("\n")}
              </pre>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex">
          <span className="shrink-0 text-cyan-400">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none font-mono ml-0 text-green-400"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
