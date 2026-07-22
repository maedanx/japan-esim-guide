import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/sim-card`;

export const metadata: Metadata = {
  title: "Japan SIM Card Guide: Compatibility, Setup & Pickup",
  description:
    "Learn how physical tourist SIM cards work in Japan, how to check phone compatibility, where to collect one, and how to avoid common setup problems.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Japan SIM Card Guide: Compatibility, Setup & Pickup",
    description:
      "A practical guide to choosing, collecting, installing, and using a physical SIM card in Japan.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image-web.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip physical SIM card guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan SIM Card Guide",
    description:
      "Check compatibility, pickup, installation, APN setup, and common physical SIM card mistakes.",
    images: ["/images/brand/og-image-web.png"],
  },
};

const benefits = [
  {
    title: "Works with many non-eSIM phones",
    text: "A physical SIM may be suitable when your unlocked phone does not support eSIM.",
  },
  {
    title: "No separate router",
    text: "Internet works directly on the phone without carrying and charging pocket Wi-Fi.",
  },
  {
    title: "Familiar installation",
    text: "Travelers who already use physical SIM cards may prefer the traditional card-based setup.",
  },
  {
    title: "Several collection methods",
    text: "Depending on the provider, airport pickup, hotel delivery, or shipping may be available.",
  },
];

const checks = [
  {
    title: "Is the phone unlocked?",
    text: "A carrier-locked phone may reject a Japanese travel SIM even when the device supports the correct SIM size.",
  },
  {
    title: "What SIM size is required?",
    text: "Most recent smartphones use nano-SIM, but always confirm the exact size required by your device.",
  },
  {
    title: "Are the network bands compatible?",
    text: "A phone sold outside Japan may support only some of the frequencies used by the provider’s network.",
  },
  {
    title: "Is APN setup required?",
    text: "Some SIM cards connect automatically, while others require manual APN settings after installation.",
  },
  {
    title: "Does the plan include calls or SMS?",
    text: "Many visitor SIM products are data-only and do not include a Japanese phone number.",
  },
  {
    title: "How will you receive the SIM?",
    text: "Check the airport terminal, delivery address, booking deadline, opening hours, and required identification.",
  },
];

const setupSteps = [
  {
    number: "01",
    title: "Confirm compatibility",
    text: "Check that the phone is unlocked and supports the SIM size and network bands required by the plan.",
  },
  {
    number: "02",
    title: "Choose the data plan",
    text: "Compare validity, data allowance, speed policy, tethering, support, and pickup or delivery conditions.",
  },
  {
    number: "03",
    title: "Receive the SIM card",
    text: "Collect it at the correct airport counter or receive it at the supported delivery location.",
  },
  {
    number: "04",
    title: "Turn the phone off",
    text: "Powering down before changing the SIM reduces the chance of installation or recognition problems.",
  },
  {
    number: "05",
    title: "Insert the Japan SIM",
    text: "Remove the SIM tray carefully, store your home SIM safely, and insert the new card in the correct orientation.",
  },
  {
    number: "06",
    title: "Configure and test",
    text: "Turn the phone on, enter any required APN details, and confirm that mobile data works.",
  },
];

const pickupOptions = [
  {
    title: "Airport pickup",
    strength: "Convenient after arrival",
    text: "Useful when the counter is in your arrival terminal and remains open when your flight lands.",
  },
  {
    title: "Hotel delivery",
    strength: "Avoid airport counters",
    text: "Useful when the hotel accepts parcels and the provider can deliver before check-in.",
  },
  {
    title: "Home delivery before travel",
    strength: "Prepare in advance",
    text: "Availability depends on the provider and the country where the SIM is being shipped.",
  },
  {
    title: "Retail purchase in Japan",
    strength: "Possible after arrival",
    text: "Choice, support, pricing, and stock can vary, so it may be less predictable than pre-ordering.",
  },
];

const mistakes = [
  "Buying a SIM without confirming that the phone is carrier-unlocked",
  "Assuming every foreign phone supports all Japanese network bands",
  "Losing the home SIM after removing it from the phone",
  "Discarding the SIM tray tool before the return trip",
  "Entering incorrect APN settings",
  "Expecting a data-only SIM to include normal voice calls or SMS",
  "Arriving after an airport pickup counter has closed",
  "Using international roaming on the home SIM by mistake",
];

const faqs = [
  {
    question: "Can I buy a physical SIM card after arriving in Japan?",
    answer:
      "Yes, physical travel SIM cards may be available at airports, electronics stores, vending machines, and other retailers. Availability, support, pricing, and setup instructions vary.",
  },
  {
    question: "Do Japan tourist SIM cards include a phone number?",
    answer:
      "Many short-term visitor SIM cards are data-only. Check the exact product if you require voice calls, SMS, or a Japanese telephone number.",
  },
  {
    question: "Can I use hotspot with a physical SIM?",
    answer:
      "It depends on the plan and device. Confirm the tethering rules before purchase.",
  },
  {
    question: "What should I do with my normal SIM card?",
    answer:
      "Store it in a secure SIM holder or labeled container. It is small and easy to lose while traveling.",
  },
  {
    question: "Is a physical SIM better than an eSIM?",
    answer:
      "A physical SIM can be better for an unlocked phone without eSIM support. An eSIM is often more convenient because it does not require removing the home SIM or collecting a card.",
  },
];

export default function SimCardPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Japan SIM Card Guide: Compatibility, Setup & Pickup",
    description:
      "A practical guide to choosing, collecting, installing, and using a physical SIM card in Japan.",
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
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
        name: "Japan SIM Card Guide",
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Header />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div>
              <p className={styles.eyebrow}>Japan physical SIM guide</p>

              <h1>Use a physical SIM card in Japan without arrival-day surprises</h1>

              <p className={styles.heroText}>
                Check whether your phone is unlocked, confirm network
                compatibility, understand airport pickup, and prepare for APN
                setup before replacing your normal SIM.
              </p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/compare">
                  Compare internet options
                </Link>

                <Link className={styles.secondaryButton} href="#setup">
                  See installation steps
                </Link>
              </div>

              <p className={styles.disclosure}>
                Provider affiliate applications are currently under review.
                Recommendations are not based on commission availability.
              </p>
            </div>

            <aside className={styles.heroCard}>
              <span>Quick answer</span>

              <h2>Who should consider a physical SIM?</h2>

              <ul>
                <li>Your unlocked phone does not support eSIM</li>
                <li>You want data directly on one phone</li>
                <li>You are comfortable removing your home SIM</li>
                <li>You can collect or receive the card before use</li>
              </ul>

              <Link href="/sim-card-vs-esim">
                Compare physical SIM and eSIM →
              </Link>
            </aside>
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.container}>
            <div className={styles.twoColumn}>
              <div>
                <p className={styles.eyebrow}>The basics</p>
                <h2>What is a Japan travel SIM card?</h2>
              </div>

              <div className={styles.longText}>
                <p>
                  A physical travel SIM is a small removable card that gives a
                  compatible unlocked phone access to mobile data in Japan.
                </p>

                <p>
                  The card is inserted into the phone’s SIM tray. Some products
                  connect automatically, while others require manual APN
                  settings supplied by the provider.
                </p>

                <p>
                  Many visitor SIM cards are data-only. They may not include a
                  Japanese phone number, ordinary voice calls, or SMS.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.altSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Main advantages</p>
              <h2>Why some travelers still choose physical SIM</h2>
            </div>

            <div className={styles.cardGrid}>
              {benefits.map((benefit) => (
                <article className={styles.infoCard} key={benefit.title}>
                  <span>✓</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before buying</p>
              <h2>Six checks that prevent most SIM card problems</h2>

              <p>
                Compatibility and collection details matter more than simply
                choosing the cheapest data allowance.
              </p>
            </div>

            <div className={styles.checkGrid}>
              {checks.map((check, index) => (
                <article className={styles.checkCard} key={check.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <div>
                    <h3>{check.title}</h3>
                    <p>{check.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.setupSection} id="setup">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Installation</p>
              <h2>How to install a physical SIM card</h2>

              <p>
                Follow the provider’s instructions because APN settings and
                activation procedures can differ.
              </p>
            </div>

            <div className={styles.timeline}>
              {setupSteps.map((step) => (
                <article className={styles.timelineItem} key={step.number}>
                  <span>{step.number}</span>

                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.warning}>
              <strong>Important:</strong>
              <p>
                Keep your home SIM in a secure labeled holder. Losing it abroad
                can make it difficult to restore your normal mobile service.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Receiving the card</p>
              <h2>Choose a pickup method that matches your arrival</h2>
            </div>

            <div className={styles.pickupGrid}>
              {pickupOptions.map((option) => (
                <article className={styles.pickupCard} key={option.title}>
                  <p>{option.strength}</p>
                  <h3>{option.title}</h3>
                  <span>{option.text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <div className={styles.container}>
            <div className={styles.comparisonBox}>
              <div>
                <p className={styles.eyebrow}>SIM, eSIM, or pocket Wi-Fi?</p>
                <h2>Choose based on your phone and travel style</h2>

                <p>
                  Physical SIM is mainly useful when your phone is unlocked but
                  does not support eSIM. Groups and multi-device travelers may
                  prefer pocket Wi-Fi.
                </p>
              </div>

              <div className={styles.comparisonLinks}>
                <Link href="/sim-card-vs-esim">
                  Compare physical SIM and eSIM
                </Link>

                <Link href="/esim">
                  Read the Japan eSIM guide
                </Link>

                <Link href="/pocket-wifi">
                  Read the pocket Wi-Fi guide
                </Link>

                <Link href="/compare">
                  Compare all Japan internet options
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.mistakeSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Avoid these mistakes</p>
              <h2>Common physical SIM problems</h2>
            </div>

            <div className={styles.mistakeGrid}>
              {mistakes.map((mistake) => (
                <div className={styles.mistakeItem} key={mistake}>
                  <span>!</span>
                  <p>{mistake}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Japan SIM card questions</h2>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalCtaInner}>
            <p className={styles.eyebrow}>Still deciding?</p>

            <h2>Compare physical SIM with eSIM and pocket Wi-Fi</h2>

            <p>
              Check your phone compatibility, arrival time, group size, and
              number of devices before choosing.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/compare">
                Compare all options
              </Link>

              <Link className={styles.secondaryButton} href="/diagnosis">
                Take the 30-sec check
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
