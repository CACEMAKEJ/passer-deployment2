import type { Metadata } from "next";
import { Sora, Space_Mono } from "next/font/google";
import "./globals.css";
import { PageTransition } from "@/components/ui/page-transition";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Passer | Volleyball Intelligence Platform",
  description:
    "Passer helps volleyball athletes turn raw match footage into polished insights, highlight reels, and recruiting-ready profiles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${spaceMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
