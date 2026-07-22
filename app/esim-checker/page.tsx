import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import EsimCheckerClient from "./EsimCheckerClient";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/esim-checker`;

export const metadata: Metadata = {
  title: "eSIM Compatibility Checker for Japan",
  description:
    "Check whether your iPhone, Google Pixel, or Samsung Galaxy can use a travel eSIM in Japan.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "eSIM Compatibility Checker for Japan",
    description:
      "Select your phone, purchase region, and lock status before buying a Japan travel eSIM.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip eSIM compatibility checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "eSIM Compatibility Checker for Japan",
    description: "Check your phone before buying a Japan travel eSIM.",
    images: ["/images/brand/og-image.png"],
  },
};

export default function EsimCheckerPage() {
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "eSIM Compatibility Checker for Japan",
    url: pageUrl,
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    description:
      "A free checker that helps travelers determine whether their phone can use an eSIM in Japan.",
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
        name: "eSIM Compatibility Checker",
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
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Free compatibility checker</p>

              <h1>Can your phone use an eSIM in Japan?</h1>

              <p className={styles.heroText}>
                Select your phone and answer a few quick questions before
                purchasing a Japan travel eSIM.
              </p>

              <div className={styles.heroTrust}>
                <div>
                  <span>✓</span>
                  <strong>Free compatibility check</strong>
                </div>

                <div>
                  <span>✓</span>
                  <strong>Carrier-lock guidance</strong>
                </div>

                <div>
                  <span>✓</span>
                  <strong>No registration required</strong>
                </div>
              </div>

              <div className={styles.heroNotice}>
                <strong>Model name alone is not enough</strong>

                <p>
                  eSIM support can vary by purchase region, exact model,
                  original carrier, and whether the device is unlocked.
                </p>
              </div>

              <div className={styles.heroBadges}>
                <span>Apple</span>
                <span>Google Pixel</span>
                <span>Samsung Galaxy</span>
              </div>
            </div>

            <aside className={styles.heroVisual}>
              <div className={styles.heroImageWrap}>
                <Image
                  src="/images/esim/japan-esim-checker-airport-traveler.png"
                  alt="International traveler checking an eSIM at a Japanese airport"
                  width={1122}
                  height={1402}
                  priority
                  sizes="(max-width: 1020px) 100vw, 420px"
                  className={styles.heroImage}
                />
              </div>
            </aside>
          </div>
        </section>

        <EsimCheckerClient />

        <section className={styles.helpSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before buying an eSIM</p>

              <h2>Three checks that prevent most problems</h2>
            </div>

            <div className={styles.helpGrid}>
              <article>
                <span>01</span>
                <h3>Confirm the exact model</h3>
                <p>
                  A product-family name may include several generations and
                  regional variants with different capabilities.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>Check the SIM restriction</h3>
                <p>
                  A phone can support eSIM hardware but still reject another
                  provider’s plan when it is carrier-locked.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>Look for an eSIM menu</h3>
                <p>
                  Check your mobile-network settings for an option such as Add
                  eSIM, Add Cellular Plan, or Download a SIM.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.disclaimerSection}>
          <div className={styles.container}>
            <div className={styles.disclaimer}>
              <strong>Important</strong>

              <p>
                This checker provides guidance, not a guarantee. Manufacturers
                may sell different regional variants under similar names.
                Always confirm the exact model number, carrier-lock status, and
                current provider requirements before purchasing.
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
