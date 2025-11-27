import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { AppProvider } from "./app";
import { YandexMetrika } from "@/src/shared/ui/YandexMetrika";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} | %s`,
  },
  description: siteConfig.description,
  openGraph: {
    title: {
      default: siteConfig.name,
      template: `${siteConfig.name} | %s`,
    },
    description: siteConfig.description,
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Beam & Beat',
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <YandexMetrika />

          <AppProvider>
            {children}
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
