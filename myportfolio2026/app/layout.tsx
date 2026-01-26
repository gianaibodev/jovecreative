import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PerformanceProvider } from "@/components/performance-provider";
import { CopyModeProvider } from "@/components/copy-mode-provider";
import { FullPageLoadingProvider } from "@/components/full-page-loading-context";
import { FramerMotionProvider } from "@/components/framer-motion-provider";
import { Footer } from "@/components/ui/footer-section";
import { FloatingConsultButtonPortal } from "@/components/ui/floating-consult-button-portal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gianaibo.tech";

export const metadata: Metadata = {
  title: "Gian Aibo | Portfolio 2025",
  description: "Computer Scientist | Experience Designer | AI Implementation | Technical Leader",
  metadataBase: new URL(baseUrl),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Gian Aibo | Portfolio 2025",
    description: "Computer Scientist | Experience Designer | AI Implementation | Technical Leader",
    type: "website",
    url: baseUrl,
    siteName: "Gian Aibo Portfolio",
    images: [
      {
        url: "/portfolio-screenshots/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Gian Aibo Portfolio Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gian Aibo | Portfolio 2025",
    description: "Computer Scientist | Experience Designer | AI Implementation | Technical Leader",
    images: ["/portfolio-screenshots/og-hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <PerformanceProvider>
            <CopyModeProvider>
              <FullPageLoadingProvider>
                <FramerMotionProvider>
                  <div className="flex min-h-screen flex-col">
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <FloatingConsultButtonPortal imageSrc="/lib/image.jpeg" />
                  </div>
                </FramerMotionProvider>
              </FullPageLoadingProvider>
            </CopyModeProvider>
          </PerformanceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
