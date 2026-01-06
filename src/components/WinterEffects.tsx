"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// Debounce helper
function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function WinterEffects() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Defer snowflake generation until idle
  useEffect(() => {
    const generateSnowflakes = () => {
      const flakes: Snowflake[] = [];
      const flakeCount = 25; // Reduced from 50

      for (let i = 0; i < flakeCount; i++) {
        flakes.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 10 + 10,
          delay: Math.random() * 10,
          opacity: Math.random() * 0.6 + 0.2,
        });
      }
      setSnowflakes(flakes);
      setIsMounted(true);
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(generateSnowflakes, {
        timeout: 2000,
      });
      return () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(generateSnowflakes, 100);
      return () => clearTimeout(id);
    }
  }, []);

  // Debounced mouse position update
  const updateMousePosition = useCallback(
    debounce((x: number, y: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x, y });
      });
    }, 16), // ~60fps
    [],
  );

  // Mouse tracking with debouncing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateMousePosition]);

  // Don't render until mounted (deferred)
  if (!isMounted) return null;

  return (
    <>
      {/* Snowfall Effect - Using CSS animations */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute top-0 text-white snowflake"
            style={{
              left: `${flake.x}%`,
              fontSize: `${flake.size}px`,
              opacity: flake.opacity,
              animation: `snowfall ${flake.duration}s linear ${flake.delay}s infinite`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* Mouse Glow Light Effect - Only on desktop */}
      <motion.div
        className="fixed pointer-events-none z-30 hidden md:block"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 150,
          mass: 0.5,
        }}
      >
        <div className="w-[400px] h-[400px] rounded-full bg-gradient-radial from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl" />
      </motion.div>

      {/* Secondary smaller glow */}
      <motion.div
        className="fixed pointer-events-none z-30 hidden md:block"
        animate={{
          x: mousePosition.x - 75,
          y: mousePosition.y - 75,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 35,
          stiffness: 200,
          mass: 0.3,
        }}
      >
        <div className="w-[150px] h-[150px] rounded-full bg-gradient-radial from-indigo-400/15 via-purple-400/5 to-transparent blur-3xl" />
      </motion.div>
    </>
  );
}
