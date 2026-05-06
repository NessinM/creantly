import "./globals.css";

import {
  AnchoredToastProvider,
  ToastProvider,
} from "@creantly/ui/components/toast";
import { fontHeading, fontMono, fontSans } from "@creantly/ui/fonts";
import { ThemeProvider } from "@creantly/ui/shared/theme-provider";
import type { Metadata } from "next";
import { AppCommand } from "@/components/app/app-command";
import { DebugProvider } from "@/components/debug-context";

export const metadata: Metadata = {
  description: "creantly.com - the everything but AI company",
  metadataBase: new URL("https://creantly.com"),
  title: "creantly.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontHeading.variable} ${fontSans.variable} ${fontMono.variable} relative bg-sidebar font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <ToastProvider position="bottom-center">
            <AnchoredToastProvider>
              <DebugProvider>
                <AppCommand />
                {children}
              </DebugProvider>
            </AnchoredToastProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
