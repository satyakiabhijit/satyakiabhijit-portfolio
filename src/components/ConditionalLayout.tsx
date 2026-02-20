"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SeasonEffects from "./SeasonEffects";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLinuxMode = pathname === "/linux";

  return (
    <>
      {!isLinuxMode && <SeasonEffects />}
      {!isLinuxMode && <Navbar />}
      <main className={isLinuxMode ? "" : ""}>{children}</main>
      {!isLinuxMode && <Footer />}
    </>
  );
}
