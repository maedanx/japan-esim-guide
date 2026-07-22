import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://japanxtrip.com"),

  title: {
    default: "Japan X Trip | Travel Smarter in Japan",
    template: "%s | Japan X Trip",
  },

  description: siteConfig.description,

  applicationName: "Japan X Trip",

  alternates: {
    canonical: "/",
  },

  keywords: [
    "Japan travel",
    "Japan eSIM",
    "Japan SIM card",
    "Japan pocket Wi-Fi",
    "internet in Japan",
    "Japan travel internet",
  ],

  icons: {
    icon: [
      {
        url: "/images/brand/favicon-web.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/brand/favicon-web.png",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "Japan X Trip | Travel Smarter in Japan",
    description: siteConfig.description,
    url: "https://japanxtrip.com",
    type: "website",
    locale: "en_US",
    siteName: "Japan X Trip",
    images: [
      {
        url: "/images/brand/og-image-web.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Japan X Trip | Travel Smarter in Japan",
    description: siteConfig.description,
    images: ["/images/brand/og-image-web.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071f49",
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
