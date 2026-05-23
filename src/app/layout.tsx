import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aura - Elevate Your Everyday",
  description: "Discover timeless elegance and sustainable fashion for the modern lifestyle. Shop our collection of premium clothing.",
  keywords: ["Aura", "fashion", "e-commerce", "sustainable", "clothing", "luxury", "modern style"],
  authors: [{ name: "Aura" }],
  openGraph: {
    title: "Aura - Elevate Your Everyday",
    description: "Discover timeless elegance and sustainable fashion for the modern lifestyle",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aura - Elevate Your Everyday",
    description: "Discover timeless elegance and sustainable fashion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
