import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import DataCalculatorClient from "./DataCalculatorClient";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/data-calculator`;

export const metadata: Metadata = {
  title: "Japan Travel Data Calculator",
  description:
    "Estimate how much mobile data you need for Japan based on trip length, travelers, maps, social media, video, calls, and tethering.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "Japan Travel Data Calculator",
    description:
      "Calculate whether you need 3GB, 5GB, 10GB, 20GB, 50GB, or unlimited data for Japan.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip data calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Travel Data Calculator",
    description:
      "Estimate your Japan travel data needs in less than one minute.",
    images: ["/images/brand/og-image.png"],
  },
};

export default function DataCalculatorPage() {
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Japan Travel Data Calculator",
    url: pageUrl,
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    description:
      "A free tool that estimates mobile-data requirements for travelers visiting Japan.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Japan Travel Data Calculator",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Header />

      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.eyebrow}>Free mobile-data calculator</p>

              <h1>How much data do you need in Japan?</h1>

              <p className={styles.heroText}>
                Enter your trip length and normal internet habits. The
                calculator estimates your total usage and recommends a
                practical data-plan size with a safety margin.
              </p>

              <div className={styles.heroBadges}>
                <span>No sign-up</span>
                <span>Instant estimate</span>
                <span>Adjustable usage</span>
              </div>
            </div>

            <aside className={styles.heroCard}>
              <p>Included in the estimate</p>

              <ul>
                <li>Google Maps and navigation</li>
                <li>Messaging and email</li>
                <li>Social media and photo uploads</li>
                <li>YouTube and streaming video</li>
                <li>Video calls and remote work</li>
                <li>Hotspot and tethering use</li>
              </ul>
            </aside>
          </div>
        </section>

        <DataCalculatorClient />

        <section className={styles.guideSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Understanding your result</p>
              <h2>Why actual data use can vary</h2>

              <p>
                Mobile-data consumption depends on video quality, automatic
                downloads, cloud backups, app updates, hotspot use, and how
                often hotel or public Wi-Fi is available.
              </p>
            </div>

            <div className={styles.guideGrid}>
              <article>
                <span>01</span>
                <h3>Maps use relatively little data</h3>
                <p>
                  Navigation is rarely the biggest problem. Video, cloud
                  uploads, and tethering usually consume much more.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>Video quality changes everything</h3>
                <p>
                  High-definition streaming can use several times more data
                  than standard-definition viewing.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>Groups need separate planning</h3>
                <p>
                  Individual eSIM users need their own plans, while pocket
                  Wi-Fi data is shared by connected devices.
                </p>
              </article>

              <article>
                <span>04</span>
                <h3>A safety margin prevents stress</h3>
                <p>
                  The calculator adds extra capacity because real travel use is
                  rarely identical every day.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.disclaimerSection}>
          <div className={styles.container}>
            <div className={styles.disclaimerBox}>
              <strong>Important:</strong>

              <p>
                This is an estimate rather than a guarantee. Provider
                definitions of unlimited data, high-speed data, throttling,
                tethering, and fair-use limits differ. Check the current plan
                conditions before purchasing.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applicationSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
