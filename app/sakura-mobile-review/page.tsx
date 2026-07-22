import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/sakura-mobile-review`;

const officialUrls = {
  home: "https://www.sakuramobile.jp/",
  travel: "https://www.sakuramobile.jp/travel/",
  esim: "https://www.sakuramobile.jp/travel/esim/",
  sim: "https://www.sakuramobile.jp/travel/sim/",
  pickup: "https://www.sakuramobile.jp/travel/pickup-return/",
};

export const metadata: Metadata = {
  title: "Sakura Mobile Review 2026: eSIM, SIM & Pocket WiFi",
  description:
    "Independent Sakura Mobile review for Japan travelers. Compare its eSIM, physical SIM, pocket WiFi, English support, pickup options, strengths, limitations, and suitable users.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Sakura Mobile Review 2026: eSIM, SIM & Pocket WiFi",
    description:
      "An independent, evidence-based assessment of Sakura Mobile for travelers visiting Japan.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip Sakura Mobile review",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakura Mobile Review 2026",
    description:
      "Who Sakura Mobile suits, what it offers, and what to check before ordering.",
    images: ["/images/brand/og-image.png"],
  },
};

const scoreItems = [
  {
    title: "Product choice",
    score: "Strong",
    text: "Travelers can choose between eSIM, physical SIM, and pocket WiFi rather than being limited to one connection method.",
  },
  {
    title: "English accessibility",
    score: "Strong",
    text: "The provider publishes English ordering, setup, compatibility, pickup, and support information.",
  },
  {
    title: "Pickup flexibility",
    score: "Strong",
    text: "Supported options include selected airports, hotels, residences, and other delivery or collection locations.",
  },
  {
    title: "Price transparency",
    score: "Check live price",
    text: "Plans and promotions can change, so travelers should compare the final checkout price for their exact dates.",
  },
];

const strengths = [
  {
    title: "Three connection formats",
    text: "Sakura Mobile offers travel eSIM, physical SIM, and pocket WiFi options. This makes it easier to match the product to the traveler’s phone and group size.",
  },
  {
    title: "Designed for international visitors",
    text: "Its travel products, instructions, compatibility information, and support pages are presented in English.",
  },
  {
    title: "Multiple receipt options",
    text: "Physical products may be collected or delivered through supported airports, hotels, residences, post offices, and other designated locations.",
  },
  {
    title: "Local support structure",
    text: "Travelers who value assistance may prefer a Japan-focused provider over a completely self-service global marketplace.",
  },
];

const limitations = [
  {
    title: "Not automatically the cheapest option",
    text: "Travelers should compare the total price with specialist eSIM providers, roaming packages, and other Japan-based services.",
  },
  {
    title: "Airport pickup requires planning",
    text: "Supported airports, terminals, counter rules, deadlines, and operating hours must be checked before departure.",
  },
  {
    title: "Most travel plans are data focused",
    text: "Do not assume that a travel product includes a Japanese telephone number, standard voice calls, or SMS.",
  },
  {
    title: "Device compatibility still matters",
    text: "An eSIM-capable or unlocked phone is still required for the relevant product. Buying from a Japan-based company does not remove device restrictions.",
  },
];

const bestFor = [
  "Travelers who want English-language assistance",
  "Visitors deciding between eSIM, physical SIM, and pocket WiFi",
  "Families or groups considering one shared router",
  "Travelers who want airport pickup or hotel delivery",
  "People who prefer a Japan-focused provider",
];

const compareFirst = [
  "Solo travelers seeking the lowest possible eSIM price",
  "People who need a Japanese voice number or normal SMS",
  "Travelers arriving late without a reliable pickup plan",
  "Users whose phones may be locked or incompatible",
  "Heavy hotspot users who have not checked tethering limits",
];

const productRows = [
  {
    product: "Travel eSIM",
    suitable: "Compatible unlocked eSIM phones",
    delivery: "Digital installation",
    keyCheck: "Compatibility, activation timing, hotspot rules",
    guide: "/esim",
  },
  {
    product: "Physical SIM",
    suitable: "Unlocked phones using a removable SIM",
    delivery: "Pickup or supported delivery",
    keyCheck: "SIM lock, SIM size, APN, pickup location",
    guide: "/sim-card",
  },
  {
    product: "Pocket WiFi",
    suitable: "Groups and multiple devices",
    delivery: "Pickup or supported delivery",
    keyCheck: "Battery, pickup, return, connected-device use",
    guide: "/pocket-wifi",
  },
];

const bookingSteps = [
  {
    number: "01",
    title: "Choose the correct product type",
    text: "Start with phone compatibility and the number of people and devices, not only the advertised data allowance.",
  },
  {
    number: "02",
    title: "Enter the exact travel period",
    text: "Compare the final plan length and checkout total for your actual arrival and departure dates.",
  },
  {
    number: "03",
    title: "Confirm receipt details",
    text: "For physical products, verify the airport, terminal, hotel, residence, post office, deadline, and operating hours.",
  },
  {
    number: "04",
    title: "Save instructions offline",
    text: "Keep the order confirmation, setup instructions, APN details, pickup map, and support contact information available without internet.",
  },
  {
    number: "05",
    title: "Test before leaving the pickup area",
    text: "Install or activate the service while airport, hotel, or provider assistance is still accessible.",
  },
];

const faqs = [
  {
    question: "Is Sakura Mobile legitimate?",
    answer:
      "Sakura Mobile is a Japan-focused communications provider offering travel and resident services. This page evaluates its traveler products using information published on its official website.",
  },
  {
    question: "Does Sakura Mobile offer eSIM?",
    answer:
      "Yes. Sakura Mobile lists a data-only travel eSIM for compatible devices. Travelers should check compatibility, installation, activation, validity, and hotspot conditions before purchase.",
  },
  {
    question: "Can I collect Sakura Mobile at a Japanese airport?",
    answer:
      "The provider publishes airport pickup options for supported physical products. Exact airports, terminals, counters, deadlines, and operating hours can change and must be confirmed before travel.",
  },
  {
    question: "Does Sakura Mobile have English support?",
    answer:
      "Its official website provides English product, setup, pickup, compatibility, FAQ, and contact information for international customers.",
  },
  {
    question: "Is Sakura Mobile the best option for every traveler?",
    answer:
      "No. It may suit travelers who value English support and flexible product choices, but price-focused eSIM users or travelers needing voice and SMS should compare alternatives.",
  },
  {
    question: "Has Japan X Trip personally tested Sakura Mobile?",
    answer:
      "Not yet. This version is an independent desk-based assessment using current official provider information. We do not present it as a hands-on performance test.",
  },
];

export default function SakuraMobileReviewPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Sakura Mobile Review 2026: eSIM, SIM & Pocket WiFi",
    description:
      "An independent assessment of Sakura Mobile for international travelers visiting Japan.",
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
        name: "Sakura Mobile Review",
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
              <p className={styles.eyebrow}>Independent provider review</p>

              <h1>Sakura Mobile review for Japan travelers</h1>

              <p className={styles.heroText}>
                Sakura Mobile is a Japan-focused provider offering travel
                eSIMs, physical SIM cards, and pocket WiFi. Its clearest
                advantage is the combination of English accessibility, product
                choice, and flexible receipt options.
              </p>

              <div className={styles.heroActions}>
                <a
                  className={styles.primaryButton}
                  href={officialUrls.travel}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Check official plans
                </a>

                <Link className={styles.secondaryButton} href="/compare">
                  Compare all options
                </Link>
              </div>

              <p className={styles.disclosure}>
                Japan X Trip has not yet completed a hands-on network test.
                This assessment is based on official provider information
                checked in July 2026. We will clearly label affiliate links
                after partnership approval.
              </p>
            </div>

            <aside className={styles.verdictCard}>
              <span>Our current verdict</span>
              <h2>Best for travelers who value support and flexibility</h2>

              <p>
                Sakura Mobile appears especially suitable for visitors who want
                English guidance and the ability to choose between eSIM,
                physical SIM, and pocket WiFi.
              </p>

              <div className={styles.verdictTags}>
                <span>English friendly</span>
                <span>3 product types</span>
                <span>Japan focused</span>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.summarySection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Quick assessment</p>
              <h2>Sakura Mobile at a glance</h2>
            </div>

            <div className={styles.scoreGrid}>
              {scoreItems.map((item) => (
                <article className={styles.scoreCard} key={item.title}>
                  <p>{item.score}</p>
                  <h3>{item.title}</h3>
                  <span>{item.text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.productsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Available formats</p>
              <h2>Which Sakura Mobile product fits your trip?</h2>

              <p>
                Choose the connection method before comparing individual plan
                lengths or promotions.
              </p>
            </div>

            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Suitable for</th>
                    <th>Receipt</th>
                    <th>Check before buying</th>
                    <th>Guide</th>
                  </tr>
                </thead>

                <tbody>
                  {productRows.map((row) => (
                    <tr key={row.product}>
                      <th>{row.product}</th>
                      <td>{row.suitable}</td>
                      <td>{row.delivery}</td>
                      <td>{row.keyCheck}</td>
                      <td>
                        <Link href={row.guide}>Read guide</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.prosConsSection}>
          <div className={styles.container}>
            <div className={styles.prosConsGrid}>
              <div>
                <div className={styles.sectionHeading}>
                  <p className={styles.eyebrow}>Strengths</p>
                  <h2>What Sakura Mobile does well</h2>
                </div>

                <div className={styles.pointList}>
                  {strengths.map((item) => (
                    <article className={styles.positiveCard} key={item.title}>
                      <span>✓</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div>
                <div className={styles.sectionHeading}>
                  <p className={styles.eyebrow}>Limitations</p>
                  <h2>What to check carefully</h2>
                </div>

                <div className={styles.pointList}>
                  {limitations.map((item) => (
                    <article className={styles.cautionCard} key={item.title}>
                      <span>!</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.audienceSection}>
          <div className={styles.container}>
            <div className={styles.audienceGrid}>
              <article className={styles.audienceCard}>
                <p className={styles.eyebrow}>Good match</p>
                <h2>Consider Sakura Mobile when...</h2>

                <ul>
                  {bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className={styles.audienceCard}>
                <p className={styles.eyebrow}>Compare first</p>
                <h2>Check alternatives when...</h2>

                <ul>
                  {compareFirst.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.bookingSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before ordering</p>
              <h2>Five-step Sakura Mobile booking check</h2>
            </div>

            <div className={styles.timeline}>
              {bookingSteps.map((step) => (
                <article className={styles.timelineItem} key={step.number}>
                  <span>{step.number}</span>

                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.pickupSection}>
          <div className={styles.container}>
            <div className={styles.pickupBox}>
              <div>
                <p className={styles.eyebrow}>Airport and hotel receipt</p>
                <h2>Physical products require more planning than eSIM</h2>

                <p>
                  Sakura Mobile publishes several pickup and delivery methods,
                  but availability depends on the product and location. Confirm
                  the airport, terminal, counter, deadline, operating hours,
                  hotel policy, and return method before payment.
                </p>
              </div>

              <div className={styles.pickupLinks}>
                <a
                  href={officialUrls.pickup}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Official pickup and return information
                </a>

                <Link href="/airport">
                  Read the Japan airport internet guide
                </Link>

                <Link href="/pocket-wifi">
                  Read the pocket WiFi guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.methodologySection}>
          <div className={styles.container}>
            <div className={styles.methodologyBox}>
              <p className={styles.eyebrow}>How we reviewed it</p>
              <h2>No invented hands-on claims</h2>

              <p>
                This version evaluates product range, traveler accessibility,
                setup requirements, receipt methods, support information, and
                likely suitability using Sakura Mobile’s official pages.
              </p>

              <p>
                We have not yet independently measured speed, latency, coverage,
                battery life, customer-service response time, or real-world
                reliability. Those areas will be updated only after suitable
                testing or sufficiently reliable evidence.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Sakura Mobile questions</h2>
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

        <section className={styles.sourcesSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Official sources</p>
              <h2>Information checked for this review</h2>
            </div>

            <div className={styles.sourceLinks}>
              <a
                href={officialUrls.home}
                rel="noopener noreferrer"
                target="_blank"
              >
                Sakura Mobile official website
              </a>

              <a
                href={officialUrls.travel}
                rel="noopener noreferrer"
                target="_blank"
              >
                Official travel products
              </a>

              <a
                href={officialUrls.esim}
                rel="noopener noreferrer"
                target="_blank"
              >
                Official travel eSIM
              </a>

              <a
                href={officialUrls.sim}
                rel="noopener noreferrer"
                target="_blank"
              >
                Official travel SIM
              </a>

              <a
                href={officialUrls.pickup}
                rel="noopener noreferrer"
                target="_blank"
              >
                Official pickup and return information
              </a>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.finalCtaInner}>
            <p className={styles.eyebrow}>Final recommendation</p>
            <h2>Check Sakura Mobile, then compare before paying</h2>

            <p>
              It is a strong candidate for English-speaking travelers who value
              support and flexible product formats, but the best choice still
              depends on device compatibility, trip length, group size, pickup
              logistics, and final price.
            </p>

            <div className={styles.heroActions}>
              <a
                className={styles.primaryButton}
                href={officialUrls.travel}
                rel="noopener noreferrer"
                target="_blank"
              >
                View official plans
              </a>

              <Link className={styles.secondaryButton} href="/compare">
                Compare internet options
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
