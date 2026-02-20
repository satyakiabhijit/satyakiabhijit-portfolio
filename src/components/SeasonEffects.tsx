"use client";

import { useEffect, useMemo, useState } from "react";
import LazyWinterEffects from "./LazyWinterEffects";

type SeasonTheme = "winter" | "summer" | "rain" | "autumn" | "spring" | "none";

function SummerEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-amber-300/35 blur-3xl" />
      <div className="absolute top-1/3 -left-16 h-64 w-64 rounded-full bg-orange-300/15 blur-3xl" />
    </div>
  );
}

function RainEffects() {
  const drops = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: (i * 2.5) % 100,
        duration: 0.9 + (i % 6) * 0.12,
        delay: (i % 8) * 0.14,
        opacity: 0.3 + (i % 5) * 0.1,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="absolute top-[-15%] h-12 w-px bg-cyan-200/70"
          style={{
            left: `${drop.left}%`,
            opacity: drop.opacity,
            animation: `rainfall ${drop.duration}s linear ${drop.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function AutumnEffects() {
  const leaves = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: (i * 4.2) % 100,
        size: 14 + (i % 6) * 2,
        duration: 8 + (i % 7) * 1.1,
        delay: (i % 10) * 0.45,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          className="absolute top-[-10%]"
          style={{
            left: `${leaf.left}%`,
            fontSize: `${leaf.size}px`,
            animation: `autumn-fall ${leaf.duration}s ease-in ${leaf.delay}s infinite`,
          }}
        >
          🍂
        </span>
      ))}
    </div>
  );
}

function SpringEffects() {
  const petals = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: (i * 5.1) % 100,
        size: 10 + (i % 5) * 1.8,
        duration: 9 + (i % 6) * 1,
        delay: (i % 9) * 0.5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute top-[-10%] text-pink-200"
          style={{
            left: `${petal.left}%`,
            fontSize: `${petal.size}px`,
            animation: `spring-fall ${petal.duration}s ease-in-out ${petal.delay}s infinite`,
          }}
        >
          ✿
        </span>
      ))}
    </div>
  );
}

export default function SeasonEffects() {
  const [season, setSeason] = useState<SeasonTheme>("winter");

  useEffect(() => {
    let ignore = false;
    const loadTheme = async () => {
      try {
        const res = await fetch(`/api/site-theme?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { season?: SeasonTheme };
        if (!ignore && data.season) {
          setSeason(data.season);
        }
      } catch {
        // keep default
      }
    };

    loadTheme();
    return () => {
      ignore = true;
    };
  }, []);

  if (season === "none") return null;
  if (season === "winter") return <LazyWinterEffects />;
  if (season === "summer") return <SummerEffects />;
  if (season === "rain") return <RainEffects />;
  if (season === "autumn") return <AutumnEffects />;
  return <SpringEffects />;
}
