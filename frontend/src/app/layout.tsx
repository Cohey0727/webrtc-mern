import type { Metadata } from "next";
import { ThemeProvider } from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "What's App",
  description: "What's App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
