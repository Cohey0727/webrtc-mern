import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What's App",
  description: "What's App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
