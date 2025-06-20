import { DashboardContextProvider } from "@/contexts/dashboard-context";
import { QueryProvider } from "@/contexts/query-client";
import { siteConfig } from "@/lib/meta";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <body
          className={`${geistSans.className} ${geistMono.variable} min-h-dvh antialiased`}
        >
          <DashboardContextProvider>
            <div className="h-dvh">{children}</div>
          </DashboardContextProvider>
          <Suspense fallback={null}>
            <Toaster position="top-center" richColors />
          </Suspense>
        </body>
      </html>
    </QueryProvider>
  );
}

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  title: { template: `%s |  ${siteConfig.title}`, default: siteConfig.title },
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.json",
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },

  keywords: siteConfig.keywords,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: siteConfig.title,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.title,
    locale: "en_US",
    description: siteConfig.description,
    // images: [siteConfig.default_image],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@shopsnicketts",
    creatorId: "1467726470533754880",
  },

  robots: {
    index: false,
    follow: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    apple: [
      { url: "/apple-icon.png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
      {
        rel: "icon",
        url: "/favicon.svg",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
