import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ConditionalLayout from "@/components/ConditionalLayout";

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

const siteUrl = "https://satyakiabhijit.vercel.app";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Abhijit Satyaki | Full Stack Developer & ML Engineer",
    template: "%s | Abhijit Satyaki",
  },
  icons: {
    icon: [{ url: "/images/logos/logo.ico", sizes: "any" }],
    shortcut: "/images/logos/logo.ico",
    apple: "/images/logos/logo.ico",
  },
  description:
    "Portfolio of Abhijit Satyaki - Full Stack Developer, Lead Software Tester at edulink.dev, and B.Tech IT student at JGEC. Expert in React, Node.js, Python, Machine Learning, and Web Development. View my projects and get in touch.",
  keywords: [
    "Abhijit Satyaki",
    "satyakiabhijit",
    "Full Stack Developer",
    "Web Developer",
    "Machine Learning Engineer",
    "React Developer",
    "Node.js Developer",
    "Python Developer",
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "JGEC",
    "Jalpaiguri Government Engineering College",
    "edulink.dev",
    "India Developer",
    "Portfolio",
    "Hire Developer",
    "Freelance Developer",
    "West Bengal Developer",
  ],
  authors: [{ name: "Abhijit Satyaki", url: siteUrl }],
  creator: "Abhijit Satyaki",
  publisher: "Abhijit Satyaki",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Abhijit Satyaki - Developer Portfolio",
    title: "Abhijit Satyaki | Full Stack Developer & ML Engineer",
    description:
      "Full Stack Developer specializing in React, Node.js, Python & Machine Learning. B.Tech IT student at JGEC. View my projects and let's build something amazing together.",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "Abhijit Satyaki - Full Stack Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhijit Satyaki | Full Stack Developer & ML Engineer",
    description:
      "Full Stack Developer specializing in React, Node.js, Python & ML. Check out my portfolio!",
    images: ["/logo.png"],
    creator: "@satyakiabhijit",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Abhijit Satyaki Portfolio",
      description:
        "Portfolio of Abhijit Satyaki - Full Stack Developer & ML Engineer",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Abhijit Satyaki",
      url: siteUrl,
      image: "/logo.png",
      sameAs: [
        "https://github.com/satyakiabhijit",
        "https://linkedin.com/in/abhijitsatyaki",
      ],
      jobTitle: [
        "Full Stack Developer",
        "Machine Learning Engineer",
        "Lead Software Tester",
      ],
      worksFor: {
        "@type": "Organization",
        name: "edulink.dev",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Jalpaiguri Government Engineering College",
      },
      knowsAbout: [
        "Web Development",
        "Full Stack Development",
        "React.js",
        "Node.js",
        "Python",
        "Machine Learning",
        "JavaScript",
        "TypeScript",
        "MongoDB",
        "REST APIs",
      ],
      description:
        "Full Stack Developer and ML Engineer specializing in building modern web applications with React, Node.js, and Python.",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Abhijit Satyaki - Developer Portfolio",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/images/logos/logo.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logos/logo.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100`}
      >
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
        {/* Buy Me a Coffee Button */}
        <Script
          src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
          data-name="bmc-button"
          data-slug="satyakiabhijit"
          data-color="#40DCA5"
          data-emoji=""
          data-font="Cookie"
          data-text="Buy me a coffee"
          data-outline-color="#000000"
          data-font-color="#ffffff"
          data-coffee-color="#FFDD00"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
