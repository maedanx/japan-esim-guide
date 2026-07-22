import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/esim`;

export const metadata: Metadata = {
  title: "Japan eSIM Guide: Compatibility, Setup & Travel Tips",
  description:
    "Learn how Japan eSIMs work, check phone compatibility, understand setup and activation, and avoid common mistakes before your trip.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Japan eSIM Guide: Compatibility, Setup & Travel Tips",
    description:
      "A beginner-friendly guide to choosing, installing, and using an eSIM in Japan.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image-web.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip eSIM guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan eSIM Guide",
    description:
      "Check compatibility, installation, activation, data use, and common eSIM mistakes before traveling to Japan.",
    images: ["/images/brand/og-image-web.png"],
  },
};

const benefits = [
  {
    title: "No airport pickup",
    text: "Purchase and install the plan digitally without waiting at a counter or arranging physical delivery.",
  },
  {
    title: "Keep your home SIM",
    text: "Many dual-SIM phones let you keep your usual SIM installed while using the Japan eSIM for mobile data.",
  },
  {
    title: "Prepare before departure",
    text: "You can often install the eSIM before flying, then activate or connect it after arriving in Japan.",
  },
  {
    title: "No rental device",
    text: "There is no separate router to charge, carry, protect, or return after the trip.",
  },
];

const checks = [
  {
    title: "Does your phone support eSIM?",
    text: "Not every phone model includes eSIM support. Compatibility can also differ by country, carrier, and device version.",
  },
  {
    title: "Is the phone unlocked?",
    text: "A carrier-locked phone may reject a travel eSIM even when the model itself supports eSIM.",
  },
  {
    title: "When does validity begin?",
    text: "Some plans begin after installation, while others begin after activation or the first connection to a supported network.",
  },
  {
    title: "Is tethering allowed?",
    text: "Hotspot use may be supported, restricted, or excluded depending on the exact plan.",
  },
  {
    title: "What happens after the data limit?",
    text: "The connection may stop, slow down, or require a top-up after the high-speed allowance is used.",
  },
  {
    title: "What support is available?",
    text: "Check whether the provider offers clear English setup instructions and practical help if installation fails.",
  },
];

const setupSteps = [
  {
    number: "01",
    title: "Confirm compatibility",
    text: "Check the exact phone model, eSIM support, carrier-lock status, and supported network bands.",
  },
  {
    number: "02",
    title: "Choose the plan",
    text: "Compare data allowance, validity, network information, tethering, activation timing, support, and refund conditions.",
  },
  {
    number: "03",
    title: "Install the eSIM",
    text: "Use the provider’s QR code, app, or manual activation details while connected to stable Wi-Fi.",
  },
  {
    number: "04",
    title: "Label the mobile plans",
    text: "Give the home line and Japan line clear names so you do not accidentally use the wrong connection.",
  },
  {
    number: "05",
    title: "Set the Japan eSIM for data",
    text: "Select the Japan eSIM as the mobile-data line and follow the provider’s instructions for data roaming.",
  },
  {
    number: "06",
    title: "Test after arrival",
    text: "Turn airplane mode off, confirm the correct line is active, and restart the phone if the network does not connect.",
  },
];

const mistakes = [
  "Buying before confirming that the exact phone model supports eSIM",
  "Assuming an eSIM-compatible phone is automatically carrier-unlocked",
  "Activating a plan too early and losing part of the validity period",
  "Deleting the eSIM profile before the trip is finished",
  "Turning on international data for the home SIM by mistake",
  "Expecting unlimited plans to provide unrestricted full-speed data",
  "Ignoring tethering, cancellation, or refund restrictions",
  "Sharing the eSIM QR code or activation details publicly",
];

const faqs = [
  {
    question: "Can I install a Japan eSIM before traveling?",
    answer:
      "Often yes. Many providers allow installation before departure, but the validity period may begin at installation, activation, or first network connection. Always check the exact plan rules.",
  },
  {
    question: "Should data roaming be on for a travel eSIM?",
    answer:
      "Some travel eSIMs require data roaming on because they connect through a partner network. Follow the provider’s instructions and make sure the home SIM is not being used for mobile data.",
  },
  {
    question: "Can I keep receiving messages on my normal SIM?",
    answer:
      "Many dual-SIM phones can keep the home SIM active while the Japan eSIM handles data. However, receiving calls or messages may still create roaming charges depending on your carrier.",
  },
  {
    question: "What if the eSIM does not connect in Japan?",
    answer:
      "Check that the eSIM is enabled, selected for mobile data, configured according to the provider’s roaming instructions, and connected to an available network. Restarting the phone may also help.",
  },
  {
    question: "Is eSIM better than pocket Wi-Fi?",
    answer:
      "eSIM is usually more convenient for one compatible phone. Pocket Wi-Fi may be better for families, groups, laptops, tablets, or several devices that remain together.",
  },
];

export default function EsimPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Japan eSIM Guide: Compatibility, Setup & Travel Tips",
    description:
      "A beginner-friendly guide to choosing, installing, and using an eSIM in Japan.",
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
        name: "Japan eSIM Guide",
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
              <p className={styles.eyebrow}>Japan eSIM guide</p>

              <h1>Use an eSIM in Japan without the usual setup confusion</h1>

              <p className={styles.heroText}>
                Learn how travel eSIMs work, confirm whether your phone is
                compatible, understand activation timing, and avoid the most
                common arrival-day mistakes.
              </p>

              <div className={styles.heroActions}>
                <Link
                  className={styles.primaryButton}
                  href="/best-esim-japan"
                >
                  Compare Japan eSIM options
                </Link>

                <Link className={styles.secondaryButton} href="#setup">
                  See setup steps
                </Link>
              </div>

              <p className={styles.disclosure}>
                Provider affiliate applications are currently under review.
                This guide does not rank providers according to commission
                availability.
              </p>
            </div>

            <div className={styles.heroCard}>
              <span className={styles.heroCardLabel}>Quick answer</span>

              <h2>Who should start with eSIM?</h2>

              <ul>
                <li>You have an unlocked eSIM-compatible phone</li>
                <li>You mainly need data on one smartphone</li>
                <li>You want to prepare before arriving in Japan</li>
                <li>You do not want to collect or return equipment</li>
              </ul>

              <Link href="/diagnosis">Take the 30-sec check →</Link>
            </div>
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.container}>
            <div className={styles.twoColumn}>
              <div>
                <p className={styles.eyebrow}>The basics</p>
                <h2>What is a travel eSIM?</h2>
              </div>

              <div className={styles.longText}>
                <p>
                  An eSIM is a digital mobile profile installed directly on a
                  compatible phone. Instead of inserting a plastic SIM card,
                  you usually scan a QR code, use a provider app, or enter
                  activation details manually.
                </p>

                <p>
                  A Japan travel eSIM normally provides mobile data during a
                  limited validity period. Many travel plans do not include a
                  Japanese telephone number, standard voice calls, or SMS.
                </p>

                <p>
                  The eSIM format is convenient, but the exact plan rules still
                  matter. Coverage, speed, data allowance, validity, hotspot
                  use, activation timing, and support can differ significantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.altSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Main advantages</p>
              <h2>Why travelers choose eSIM for Japan</h2>
            </div>

            <div className={styles.cardGrid}>
              {benefits.map((benefit) => (
                <article className={styles.infoCard} key={benefit.title}>
                  <span className={styles.checkIcon}>✓</span>
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
              <h2>Six checks that matter more than the advertised price</h2>
              <p>
                A cheap plan is not useful if the phone is incompatible, the
                validity begins too early, or support is unavailable when
                installation fails.
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
              <p className={styles.eyebrow}>Setup process</p>
              <h2>How to install and use a Japan eSIM</h2>
              <p>
                The exact menus vary by phone and provider, but the overall
                process is usually similar.
              </p>
            </div>

            <div className={styles.timeline}>
              {setupSteps.map((step) => (
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
                Do not delete the eSIM profile simply because the connection
                does not work immediately. Some providers do not allow the same
                profile or QR code to be installed again.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.comparisonBox}>
              <div>
                <p className={styles.eyebrow}>eSIM or another option?</p>
                <h2>eSIM is convenient, but it is not best for everyone</h2>
              </div>

              <div className={styles.comparisonLinks}>
                <Link href="/sim-card-vs-esim">
                  Compare eSIM and physical SIM
                </Link>

                <Link href="/compare">
                  Compare eSIM, SIM, and pocket Wi-Fi
                </Link>

                <Link href="/best-esim-japan">
                  See Japan eSIM provider comparisons
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.mistakeSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Avoid these mistakes</p>
              <h2>Common eSIM problems are often preventable</h2>
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
              <h2>Japan eSIM questions</h2>
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
            <p className={styles.eyebrow}>Ready to compare?</p>
            <h2>Find a Japan eSIM that matches your trip</h2>

            <p>
              Compare setup, compatibility, validity, data allowance, support,
              and travel style before making a decision.
            </p>

            <div className={styles.heroActions}>
              <Link
                className={styles.primaryButton}
                href="/best-esim-japan"
              >
                Compare eSIM providers
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
