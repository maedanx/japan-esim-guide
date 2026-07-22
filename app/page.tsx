import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import HomeV2 from "@/components/home/HomeV2";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Japan Internet Guide: eSIM, SIM Card & Pocket Wi-Fi",
  description:
    "Compare eSIMs, physical SIM cards, and pocket Wi-Fi for Japan. Use beginner-friendly tools and provider guides to choose the right internet option for your trip.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "Japan Internet Guide | Japan X Trip",
    description:
      "Compare Japan eSIM, SIM card, and pocket Wi-Fi options with practical tools and beginner-friendly guidance.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image-web.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip internet guide for Japan travelers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Internet Guide | Japan X Trip",
    description:
      "Compare Japan eSIM, SIM card, and pocket Wi-Fi options before your trip.",
    images: ["/images/brand/og-image-web.png"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
      />
      <Header />
      <main>
        <HomeV2 />
      </main>
      <Footer />
    </>
  );
}
