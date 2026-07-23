import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import DiagnosisClient from "./DiagnosisClient";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/diagnosis`;

export const metadata: Metadata = {
  title: "30-Second Japan Internet Finder",
  description:
    "Answer eight quick questions to find whether an eSIM, physical SIM, pocket Wi-Fi, roaming, or a combined setup suits your Japan trip.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "30-Second Japan Internet Finder",
    description:
      "Get a personalized Japan internet recommendation based on your phone, group size, trip length, devices, and data needs.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip 30-second internet finder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "30-Second Japan Internet Finder",
    description:
      "Find the right internet option for your Japan trip in seven questions.",
    images: ["/images/brand/og-image.png"],
  },
};

export default function DiagnosisPage() {
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "30-Second Japan Internet Finder",
    url: pageUrl,
    applicationCategory: "TravelApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    description:
      "A free interactive tool that recommends an internet connection method for travelers visiting Japan.",
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
        name: "30-Second Internet Finder",
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
              <p className={styles.eyebrow}>Free personalized travel tool</p>

              <h1>Find your best Japan internet option in 30 seconds</h1>

              <p className={styles.heroText}>
                Answer seven simple questions about your phone, travel group,
                devices, data use, and arrival plan. We will recommend an eSIM,
                physical SIM, pocket Wi-Fi, roaming, or a combined setup.
              </p>

              <div className={styles.heroBadges}>
                <span>7 quick questions</span>
                <span>No sign-up</span>
                <span>Free result</span>
              </div>
            </div>

            <aside className={styles.heroCard}>
              <p>What the result includes</p>

              <ul>
                <li>Your recommended connection method</li>
                <li>Why it fits your trip</li>
                <li>Important compatibility checks</li>
                <li>A backup option</li>
                <li>Relevant Japan X Trip guides</li>
              </ul>
            </aside>
          </div>
        </section>

        <DiagnosisClient />

        <section
          style={{
            background: "#ffffff",
            padding: "28px 24px 88px",
          }}
        >
          <div
            style={{
              width: "min(980px, 100%)",
              margin: "0 auto",
              border: "1px solid #dce4ee",
              borderRadius: "26px",
              background: "#f5f8fc",
              padding: "32px",
            }}
          >
            <p className={styles.eyebrow}>Next free tool</p>

            <h2
              style={{
                margin: 0,
                color: "#071f49",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                lineHeight: 1.15,
              }}
            >
              Calculate how much data your trip needs
            </h2>

            <p
              style={{
                margin: "15px 0 24px",
                color: "#59677b",
                lineHeight: 1.8,
              }}
            >
              Use your trip length, maps, social media, video, calls, and
              hotspot habits to estimate the right data-plan size.
            </p>

            <a
              href="/data-calculator"
              style={{
                display: "inline-flex",
                minHeight: "50px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "999px",
                background: "#ff402f",
                padding: "0 23px",
                color: "#ffffff",
                fontWeight: 850,
                textDecoration: "none",
              }}
            >
              Open the data calculator
            </a>
          </div>
        </section>

        <section className={styles.explanationSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>How the finder works</p>
              <h2>We prioritize fit, not one universal winner</h2>

              <p>
                There is no single internet method that is best for every
                traveler. The recommendation changes depending on phone
                compatibility, group size, trip length, connected devices,
                setup confidence, data usage, and arrival logistics.
              </p>
            </div>

            <div className={styles.explanationGrid}>
              <article>
                <span>01</span>
                <h3>Compatibility first</h3>
                <p>
                  An inexpensive eSIM is not useful when the phone is locked or
                  does not support eSIM.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>People and devices</h3>
                <p>
                  Pocket Wi-Fi becomes more attractive when several travelers
                  or devices need to connect together.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>Real travel behavior</h3>
                <p>
                  Navigation, social media, video, remote work, and tethering
                  create very different data needs.
                </p>
              </article>

              <article>
                <span>04</span>
                <h3>Arrival risk</h3>
                <p>
                  Late arrivals and uncertain airport pickup plans can make a
                  digital or backup connection more valuable.
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
                This tool provides general travel guidance, not a guarantee of
                device compatibility or service performance. Always confirm
                your phone model, SIM-lock status, provider conditions,
                coverage, activation rules, and final price before purchasing.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
    </>
  );
}
