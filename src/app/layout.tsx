import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WinterEffects from "@/components/WinterEffects";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhijit Satyaki | Full Stack Developer & ML Enthusiast",
  description:
    "Portfolio of Abhijit Satyaki - Full Stack Developer, Lead Software Tester at edulink.dev, and IT undergraduate. Specializing in React, Node.js, Python, and Machine Learning.",
  keywords: [
    "Abhijit Satyaki",
    "Full Stack Developer",
    "Web Developer",
    "Machine Learning",
    "React",
    "Node.js",
    "Python",
    "Portfolio",
    "JGEC",
    "edulink.dev",
  ],
  authors: [{ name: "Abhijit Satyaki" }],
  creator: "Abhijit Satyaki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhijitsatyaki.vercel.app",
    siteName: "Abhijit Satyaki Portfolio",
    title: "Abhijit Satyaki | Full Stack Developer & ML Enthusiast",
    description:
      "Portfolio of Abhijit Satyaki - Full Stack Developer, Lead Software Tester at edulink.dev, and IT undergraduate.",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/171671037?v=4",
        width: 400,
        height: 400,
        alt: "Abhijit Satyaki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijit Satyaki | Full Stack Developer & ML Enthusiast",
    description:
      "Portfolio of Abhijit Satyaki - Full Stack Developer, Lead Software Tester at edulink.dev, and IT undergraduate.",
    images: ["https://avatars.githubusercontent.com/u/171671037?v=4"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100`}
      >
        <ThemeProvider>
          <WinterEffects />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
