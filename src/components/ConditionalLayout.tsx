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
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isLinuxMode && !isAdminRoute && <SeasonEffects />}
      {!isLinuxMode && !isAdminRoute && <Navbar />}
      <main className={isLinuxMode ? "" : ""}>{children}</main>
      {!isLinuxMode && !isAdminRoute && <Footer />}
    </>
  );
}
