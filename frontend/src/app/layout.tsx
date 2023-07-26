import type { Metadata } from "next";
import {
  AuthProvider,
  Loading,
  LoadingContainer,
  LoadingProvider,
  ThemeProvider,
  SocketProvider,
} from "@/components";
import "./globals.css";

export const metadata: Metadata = {
  title: "What's App",
  description: "What's App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <SocketProvider>
            <ThemeProvider>
              <LoadingProvider loadingElement={<Loading id="root-loading" />}>
                <LoadingContainer>{children}</LoadingContainer>
              </LoadingProvider>
            </ThemeProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
