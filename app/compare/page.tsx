import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import {
  connectivityProviders,
  getProviderOutboundUrl,
  hasProviderOutboundUrl,
  isAffiliateProviderLink,
} from "@/data/connectivityProviders";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/compare`;

export const metadata: Metadata = {
  title: "Compare Japan eSIM, SIM Card & Pocket Wi-Fi",
  description:
    "Compare eSIMs, physical SIM cards, and pocket Wi-Fi for Japan by setup, compatibility, sharing, pickup, and travel style.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Compare Internet Options for Japan",
    description:
      "Compare eSIM, SIM card, and pocket Wi-Fi options for your Japan trip.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image-web.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip internet comparison guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Internet Options for Japan",
    description:
      "Find the right eSIM, SIM card, or pocket Wi-Fi option for your Japan trip.",
    images: ["/images/brand/og-image-web.png"],
  },
};

const connectionTypes = [
  {
    name: "eSIM",
    label: "Best for simple digital setup",
    description:
      "Install a data plan digitally without collecting or inserting a physical card.",
    bestFor: "Solo travelers with an unlocked eSIM-compatible phone",
    setup: "Digital installation, usually by QR code or provider app",
    sharing: "Usually one main phone, with hotspot when permitted",
    arrival: "Can often be prepared before departure",
    limitations:
      "Requires an unlocked compatible device and careful activation timing",
    href: "/best-esim-japan",
  },
  {
    name: "Physical SIM",
    label: "Best for phones without eSIM",
    description:
      "Insert a physical SIM card into an unlocked compatible phone after delivery or collection.",
    bestFor: "Travelers whose phone does not support eSIM",
    setup: "Insert the SIM and configure APN settings when required",
    sharing: "Usually one phone, with hotspot when permitted",
    arrival: "May require airport pickup, hotel delivery, or shipping",
    limitations:
      "You may need to remove and safely store your home SIM",
    href: "/sim-card-vs-esim",
  },
  {
    name: "Pocket Wi-Fi",
    label: "Best for groups and several devices",
    description:
      "Carry a rechargeable Wi-Fi router that connects multiple phones, tablets, or laptops.",
    bestFor: "Families, groups, and travelers carrying several devices",
    setup: "Turn on the router and connect using the Wi-Fi password",
    sharing: "Designed for multiple connected devices",
    arrival: "Usually collected or delivered as rental equipment",
    limitations:
      "Must be charged, carried, protected, and returned after the trip",
    href: "/#provider-list",
  },
];

const providers = connectivityProviders;

const faqs = [
  {
    question: "What is the easiest internet option for Japan?",
    answer:
      "For many solo travelers with an unlocked compatible phone, an eSIM is the simplest option because it does not require physical pickup. Travelers with incompatible phones may prefer a physical SIM, while groups often benefit from pocket Wi-Fi.",
  },
  {
    question: "Is eSIM always better than a physical SIM?",
    answer:
      "No. eSIM is convenient, but it requires a compatible unlocked device. A physical SIM may be more suitable for an older phone, while pocket Wi-Fi may work better for several travelers or devices.",
  },
  {
    question: "Can several people share one eSIM?",
    answer:
      "An eSIM normally operates on one phone. That phone may share data through tethering if the plan and device permit it. Pocket Wi-Fi is generally designed for several connected devices.",
  },
  {
    question: "Are the provider purchase links available now?",
    answer:
      "Provider partnerships and affiliate links are currently being prepared. Japan X Trip currently links to its own provider reviews so travelers can compare important conditions before purchasing.",
  },
];

export default function ComparePage() {
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Japan X Trip",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Compare",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Header />

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Japan internet comparison</p>

            <h1>Compare eSIM, SIM cards, and pocket Wi-Fi for Japan</h1>

            <p className={styles.heroText}>
              The best option depends on your phone, travel group, number of
              devices, setup preference, and trip length. Start with the
              connection type, then compare providers.
            </p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Take the 30-sec check
              </Link>

              <Link className={styles.secondaryButton} href="#providers">
                Compare providers
              </Link>
            </div>

            <p className={styles.notice}>
              Provider affiliate links are currently being prepared. Rankings
              and comparisons are not based on commission availability.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Step 1</p>
              <h2>Choose the right connection type</h2>
              <p>
                Start by deciding whether you need the simplicity of eSIM, the
                compatibility of a physical SIM, or the sharing ability of
                pocket Wi-Fi.
              </p>
            </div>

            <div className={styles.typeGrid}>
              {connectionTypes.map((type) => (
                <article className={styles.typeCard} key={type.name}>
                  <div>
                    <span className={styles.typeLabel}>{type.label}</span>
                    <h3>{type.name}</h3>
                    <p>{type.description}</p>
                  </div>

                  <dl className={styles.details}>
                    <div>
                      <dt>Best for</dt>
                      <dd>{type.bestFor}</dd>
                    </div>

                    <div>
                      <dt>Setup</dt>
                      <dd>{type.setup}</dd>
                    </div>

                    <div>
                      <dt>Sharing</dt>
                      <dd>{type.sharing}</dd>
                    </div>

                    <div>
                      <dt>Arrival</dt>
                      <dd>{type.arrival}</dd>
                    </div>

                    <div>
                      <dt>Main limitation</dt>
                      <dd>{type.limitations}</dd>
                    </div>
                  </dl>

                  <Link className={styles.textLink} href={type.href}>
                    Read the detailed guide →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.altSection} id="providers">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Step 2</p>
              <h2>Compare providers</h2>
              <p>
                These providers serve different traveler needs. Always confirm
                the current price, data allowance, validity, compatibility,
                pickup, refund, and support terms before purchasing.
              </p>
            </div>

            <div className={styles.providerGrid}>
              {providers.map((provider, index) => (
                <article className={styles.providerCard} key={provider.name}>
                  <div className={styles.providerTop}>
                    <span className={styles.number}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className={styles.category}>{provider.category}</p>
                      <h3>{provider.name}</h3>
                    </div>
                  </div>

                  <p className={styles.fit}>{provider.fit}</p>

                  <div className={styles.strengthBlock}>
                    <h4>Good points to compare</h4>
                    <ul>
                      {provider.strengths.map((strength) => (
                        <li key={strength}>{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.caution}>
                    <strong>Check before buying:</strong>
                    <span>{provider.caution}</span>
                  </div>

                  <div className={styles.cardActions}>
                    <Link
                      className={styles.reviewButton}
                      href={provider.reviewHref}
                    >
                      Read our review
                    </Link>

                    {hasProviderOutboundUrl(provider) ? (
                      <a
                        className={styles.pendingButton}
                        href={getProviderOutboundUrl(provider)}
                        rel={isAffiliateProviderLink(provider) ? "sponsored nofollow noopener" : "noopener"}
                        target="_blank"
                      >
                        Visit provider website
                      </a>
                    ) : (
                      <span
                        className={styles.pendingButton}
                        aria-label="Official provider link is being prepared"
                      >
                        Official link coming soon
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Quick decision guide</p>
              <h2>Which option should you start with?</h2>
            </div>

            <div className={styles.decisionGrid}>
              <article>
                <h3>Solo traveler</h3>
                <strong>Start with eSIM</strong>
                <p>
                  Best when your phone is unlocked, eSIM-compatible, and you
                  want to prepare before arrival.
                </p>
              </article>

              <article>
                <h3>Family or group</h3>
                <strong>Compare pocket Wi-Fi</strong>
                <p>
                  Useful when several people and devices stay together during
                  the trip.
                </p>
              </article>

              <article>
                <h3>Older phone</h3>
                <strong>Check physical SIM</strong>
                <p>
                  Confirm that the phone is unlocked and supports the required
                  network bands.
                </p>
              </article>

              <article>
                <h3>Business traveler</h3>
                <strong>Consider eSIM</strong>
                <p>
                  Keeping the home SIM installed can make dual-SIM use and
                  message access easier.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>FAQ</p>
              <h2>Japan internet comparison questions</h2>
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
            <p className={styles.eyebrow}>Still unsure?</p>
            <h2>Get a starting recommendation in 30 seconds</h2>
            <p>
              Answer a few simple questions about your phone, devices, travel
              group, and setup preference.
            </p>

            <Link className={styles.primaryButton} href="/diagnosis">
              Start the 30-sec check
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
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
