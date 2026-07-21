import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Japan Internet Guide | Japan Made Clear",
    template: "%s | Japan Made Clear",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Japan eSIM",
    "Japan SIM card",
    "Japan pocket Wi-Fi",
    "internet in Japan",
    "Japan travel internet",
  ],
  openGraph: {
    title: "Japan Internet Guide | Japan Made Clear",
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Internet Guide | Japan Made Clear",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102c3b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
