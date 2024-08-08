import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/styles/globals.css";
import "../app/styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "새미네 부엌",
  description: "새미네 부엌 클론코딩",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
