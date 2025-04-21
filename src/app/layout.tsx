import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "삼성 라이온즈 | 공식 웹사이트",
  description: "KBO 리그 프로야구단 삼성 라이온즈의 공식 웹사이트입니다",
  keywords: ["삼성 라이온즈", "KBO", "야구", "한국야구", "삼성야구"],
  metadataBase: new URL("https://granen32.com"),
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" dir="ltr">
      <body className={inter.className}>
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
