"use client";

import { createContext, useContext, useState, useCallback } from "react";

type LinuxTheme = "dark" | "light";

interface LinuxThemeContextType {
  theme: LinuxTheme;
  toggleTheme: () => void;
}

const LinuxThemeContext = createContext<LinuxThemeContextType | null>(null);

export function LinuxThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<LinuxTheme>("dark");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <LinuxThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </LinuxThemeContext.Provider>
  );
}

export function useLinuxTheme() {
  const ctx = useContext(LinuxThemeContext);
  if (!ctx) throw new Error("useLinuxTheme must be used within LinuxThemeProvider");
  return ctx;
}
