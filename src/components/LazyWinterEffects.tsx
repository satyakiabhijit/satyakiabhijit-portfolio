"use client";

import dynamic from "next/dynamic";

// Lazy load WinterEffects to reduce initial bundle and TBT
const WinterEffects = dynamic(() => import("./WinterEffects"), {
  ssr: false,
  loading: () => null,
});

export default function LazyWinterEffects() {
  return <WinterEffects />;
}
