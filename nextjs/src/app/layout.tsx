import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "阪大文学サークル 中文会",
  description: "大阪大学非公認サークル「中国文学同好会」の公式サイトです。中国文学を楽しく学ぶことを目的とした文学サークルです。外国語学部生が中心を担っています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
      </body>
    </html>
  );
}
