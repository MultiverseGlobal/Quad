import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Quad | The Campus Community for Nigerian Students",
  description: "Connect with your department, explore opportunities, and grow your campus network. Exclusive to Nigerian university students.",
};

import { ToastProvider } from "@/components/providers/ToastProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ToastProvider>
          <main className="page-transition">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  );
}
