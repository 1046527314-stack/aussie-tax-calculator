import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Australian Tax Calculator 2026 | Aussie Tax Mate',
  description: 'Calculate your Australian after-tax salary, HECS, Medicare Levy and Superannuation instantly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4659587674577845"
          crossOrigin="anonymous"
        ></script>

      </head>

      <body>
        {children}
      </body>
    </html>
