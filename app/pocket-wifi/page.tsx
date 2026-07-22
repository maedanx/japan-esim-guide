import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/pocket-wifi`;

export const metadata: Metadata = {
  title: "Pocket Wi-Fi in Japan: Rental, Pickup & Group Travel Guide",
  description:
    "Learn how pocket Wi-Fi rental works in Japan, who should use it, how airport pickup and return work, and what to check before booking.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Pocket Wi-Fi in Japan: Rental, Pickup & Group Travel Guide",
    description:
      "A practical guide to renting, collecting, using, charging, and returning pocket Wi-Fi in Japan.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image-web.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip pocket Wi-Fi guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pocket Wi-Fi in Japan",
    description:
      "Compare pocket Wi-Fi with eSIM and learn how rental, pickup, sharing, charging, and return work.",
    images: ["/images/brand/og-image-web.png"],
  },
};

const advantages = [
  {
    title: "Connect several devices",
    text: "One router can connect multiple phones, tablets, and laptops when travelers remain together.",
  },
  {
    title: "No SIM replacement",
    text: "You do not need to remove your home SIM or install a digital mobile profile.",
  },
  {
    title: "Simple Wi-Fi connection",
    text: "Turn on the router, find the network name, and enter the supplied password.",
  },
  {
    title: "Useful for groups",
    text: "Families and travel groups may find one shared router easier than arranging several separate plans.",
  },
];

const checks = [
  {
    title: "Pickup location",
    text: "Confirm the exact airport terminal, counter, post office, hotel, or delivery address before booking.",
  },
  {
    title: "Pickup opening hours",
    text: "Late-night or early-morning arrivals may fall outside counter or post-office operating hours.",
  },
  {
    title: "Delivery deadline",
    text: "Airport or hotel delivery usually requires advance booking before a stated cutoff.",
  },
  {
    title: "Return method",
    text: "Check whether the device must be returned at an airport counter, by prepaid envelope, or another specified method.",
  },
  {
    title: "Battery life",
    text: "Real battery life depends on connected devices, signal strength, temperature, and continuous use.",
  },
  {
    title: "Data policy",
    text: "Unlimited does not always mean unrestricted full-speed data. Fair-use or congestion policies may apply.",
  },
];

const workflow = [
  {
    number: "01",
    title: "Choose the rental period",
    text: "Match the start and end dates to your arrival, departure, pickup, and return schedule.",
  },
  {
    number: "02",
    title: "Reserve the device",
    text: "Enter traveler details, delivery or pickup information, and the required rental dates.",
  },
  {
    number: "03",
    title: "Collect or receive it",
    text: "Pick it up at the chosen airport or receive it at a hotel, residence, or other supported location.",
  },
  {
    number: "04",
    title: "Connect your devices",
    text: "Turn on the router and connect each device using the Wi-Fi name and password.",
  },
  {
    number: "05",
    title: "Charge it every day",
    text: "Keep the router charged and consider carrying a power bank for long sightseeing days.",
  },
  {
    number: "06",
    title: "Return all equipment",
    text: "Return the router, cable, adapter, case, and any included accessories by the stated deadline.",
  },
];

const bestFor = [
  {
    title: "Families",
    recommendation: "Strong option",
    text: "Useful when parents and children carry several phones or tablets and stay together.",
  },
  {
    title: "Groups",
    recommendation: "Strong option",
    text: "One shared rental can be convenient when the group follows the same itinerary.",
  },
  {
    title: "Laptop users",
    recommendation: "Worth comparing",
    text: "Helpful for travelers who need to connect a laptop or several work devices.",
  },
  {
    title: "Solo travelers",
    recommendation: "Compare with eSIM",
    text: "An eSIM is often simpler because there is no rental equipment to collect, charge, or return.",
  },
];

const mistakes = [
  "Booking airport pickup without checking the correct terminal",
  "Arriving after the pickup counter has closed",
  "Forgetting that everyone loses internet when the group separates",
  "Leaving the router uncharged before a full sightseeing day",
  "Assuming every unlimited plan offers unlimited full-speed data",
  "Returning only the router and forgetting cables or accessories",
  "Missing the return deadline and creating extra charges",
  "Putting the router in checked baggage while other devices still need access",
];

const faqs = [
  {
    question: "How many devices can connect to pocket Wi-Fi?",
    answer:
      "The maximum depends on the router model and provider. Even when many devices are technically supported, speed and battery performance may decline when several devices are active at once.",
  },
  {
    question: "Can I collect pocket Wi-Fi at a Japanese airport?",
    answer:
      "Many providers offer airport collection, but available airports, terminals, counters, opening hours, and advance-booking deadlines differ.",
  },
  {
    question: "What happens if I return the device late?",
    answer:
      "Late fees or additional rental charges may apply. Check the provider’s return deadline and instructions before leaving Japan.",
  },
  {
    question: "Is pocket Wi-Fi better than eSIM?",
    answer:
      "Pocket Wi-Fi is often better for groups and multiple devices. eSIM is usually more convenient for one traveler with a compatible unlocked phone.",
  },
  {
    question: "Do I need a power bank?",
    answer:
      "It is not always required, but it is useful for long days because battery life changes with signal quality, usage, and the number of connected devices.",
  },
];

export default function PocketWifiPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pocket Wi-Fi in Japan: Rental, Pickup & Group Travel Guide",
    description:
      "A practical guide to renting, collecting, using, charging, and returning pocket Wi-Fi in Japan.",
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
        name: "Pocket Wi-Fi in Japan",
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
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Japan pocket Wi-Fi guide</p>

              <h1>Share internet in Japan without changing your phone settings</h1>

              <p className={styles.heroText}>
                Pocket Wi-Fi can connect several phones, tablets, and laptops
                through one rental router. The main trade-off is that you must
                collect, charge, carry, protect, and return the device.
              </p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/compare">
                  Compare Japan internet options
                </Link>

                <Link className={styles.secondaryButton} href="#rental-process">
                  See the rental process
                </Link>
              </div>

              <p className={styles.disclosure}>
                Provider affiliate applications are currently under review.
                Recommendations are not based on commission availability.
              </p>
            </div>

            <aside className={styles.heroCard}>
              <span className={styles.heroCardLabel}>Quick answer</span>

              <h2>Who should consider pocket Wi-Fi?</h2>

              <ul>
                <li>Families or groups traveling together</li>
                <li>Travelers carrying several devices</li>
                <li>People whose phones do not support eSIM</li>
                <li>Visitors who prefer a normal Wi-Fi connection</li>
              </ul>

              <Link href="/diagnosis">Take the 30-sec check →</Link>
            </aside>
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.container}>
            <div className={styles.twoColumn}>
              <div>
                <p className={styles.eyebrow}>The basics</p>
                <h2>What is pocket Wi-Fi?</h2>
              </div>

              <div className={styles.longText}>
                <p>
                  Pocket Wi-Fi is a small rechargeable router that connects to
                  a mobile network and creates a private Wi-Fi network around
                  you.
                </p>

                <p>
                  Instead of installing an eSIM or replacing a physical SIM,
                  you connect your phone, tablet, or laptop using the Wi-Fi
                  network name and password provided with the device.
                </p>

                <p>
                  Most visitor services in Japan operate as rentals. You collect
                  or receive the router at the start of the trip and return it
                  before or after departure according to the provider’s rules.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.altSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Main advantages</p>
              <h2>Why travelers choose pocket Wi-Fi</h2>
            </div>

            <div className={styles.cardGrid}>
              {advantages.map((advantage) => (
                <article className={styles.infoCard} key={advantage.title}>
                  <span className={styles.icon}>✓</span>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before booking</p>
              <h2>Check the logistics, not only the daily price</h2>
              <p>
                Pickup and return details can matter more than a small price
                difference, especially around early flights, late arrivals, and
                airport transfers.
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

        <section className={styles.processSection} id="rental-process">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Rental process</p>
              <h2>How pocket Wi-Fi rental usually works</h2>
              <p>
                Exact procedures differ by provider, airport, and delivery
                method, but the general flow is similar.
              </p>
            </div>

            <div className={styles.timeline}>
              {workflow.map((step) => (
                <article className={styles.timelineItem} key={step.number}>
                  <span className={styles.stepNumber}>{step.number}</span>

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
                Confirm the final return deadline before traveling to the
                airport. Some return methods must be completed before airport
                security or before a counter closes.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Who is it best for?</p>
              <h2>Choose based on how your group actually travels</h2>
            </div>

            <div className={styles.travelerGrid}>
              {bestFor.map((traveler) => (
                <article className={styles.travelerCard} key={traveler.title}>
                  <p className={styles.recommendation}>
                    {traveler.recommendation}
                  </p>
                  <h3>{traveler.title}</h3>
                  <p>{traveler.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <div className={styles.container}>
            <div className={styles.comparisonBox}>
              <div>
                <p className={styles.eyebrow}>Pocket Wi-Fi or eSIM?</p>
                <h2>The biggest difference is sharing versus convenience</h2>

                <p>
                  Pocket Wi-Fi is built for sharing, but the group must remain
                  close to the router. eSIM is attached to one phone, but there
                  is no equipment to carry or return.
                </p>
              </div>

              <div className={styles.comparisonLinks}>
                <Link href="/compare">
                  Compare eSIM, SIM, and pocket Wi-Fi
                </Link>

                <Link href="/esim">
                  Read the Japan eSIM guide
                </Link>

                <Link href="/sim-card-vs-esim">
                  Compare physical SIM and eSIM
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.mistakeSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Avoid these mistakes</p>
              <h2>Common pocket Wi-Fi problems are usually logistical</h2>
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

        <section className={styles.providerSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Provider guides</p>
              <h2>Review Japan-focused pocket Wi-Fi options</h2>
              <p>
                Current purchase links are being prepared while partnership
                applications are under review.
              </p>
            </div>

            <div className={styles.providerGrid}>
              <article className={styles.providerCard}>
                <div>
                  <p>Pocket Wi-Fi · SIM</p>
                  <h3>Japan Wireless</h3>
                </div>

                <p>
                  Compare delivery, airport collection, return instructions,
                  included equipment, and current rental conditions.
                </p>

                <div className={styles.providerActions}>
                  <Link href="/reviews/japan-wireless">
                    Read our review
                  </Link>
                  <span>Official link coming soon</span>
                </div>
              </article>

              <article className={styles.providerCard}>
                <div>
                  <p>Pocket Wi-Fi</p>
                  <h3>NINJA WiFi</h3>
                </div>

                <p>
                  Compare airport pickup locations, operating hours, router
                  plans, and return conditions.
                </p>

                <div className={styles.providerActions}>
                  <Link href="/reviews/ninja-wifi">
                    Read our review
                  </Link>
                  <span>Official link coming soon</span>
                </div>
              </article>

              <article className={styles.providerCard}>
                <div>
                  <p>eSIM · SIM · Pocket Wi-Fi</p>
                  <h3>Sakura Mobile</h3>
                </div>

                <p>
                  Compare Japan-focused support, delivery options, product
                  types, and suitability for different trip lengths.
                </p>

                <div className={styles.providerActions}>
                  <Link href="/reviews/sakura-mobile">
                    Read our review
                  </Link>
                  <span>Official link coming soon</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Japan pocket Wi-Fi questions</h2>
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
            <h2>Compare pocket Wi-Fi with eSIM and physical SIM</h2>

            <p>
              The right choice depends on your phone, group size, number of
              devices, arrival airport, and willingness to carry rental
              equipment.
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
