import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/airport`;

export const metadata: Metadata = {
  title: "Japan Airport Internet Guide: eSIM, SIM & Pocket Wi-Fi Pickup",
  description:
    "Plan internet access after landing in Japan. Compare eSIM activation, airport SIM pickup, pocket Wi-Fi collection, opening hours, terminals, and late-arrival risks.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Japan Airport Internet Guide: eSIM, SIM & Pocket Wi-Fi Pickup",
    description:
      "A practical arrival guide for collecting or activating internet service at Japanese airports.",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Japan X Trip airport internet guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Airport Internet Guide",
    description:
      "Avoid terminal, opening-hour, pickup, delivery, and return problems after landing in Japan.",
    images: ["/images/brand/og-image.png"],
  },
};

const arrivalOptions = [
  {
    title: "Activate an eSIM",
    label: "Fastest when prepared",
    text: "Install the eSIM before departure, then activate the correct mobile data line after landing.",
    href: "/esim",
  },
  {
    title: "Collect a physical SIM",
    label: "Suitable for non-eSIM phones",
    text: "Use a reserved airport counter, post office, delivery service, or supported retail location.",
    href: "/sim-card",
  },
  {
    title: "Collect pocket Wi-Fi",
    label: "Useful for groups",
    text: "Pick up the router and accessories at the selected counter, terminal, post office, or delivery point.",
    href: "/pocket-wifi",
  },
];

const preArrivalChecks = [
  {
    title: "Confirm the airport",
    text: "Tokyo has both Narita and Haneda. Osaka-area travelers may use Kansai International Airport or another regional airport.",
  },
  {
    title: "Confirm the terminal",
    text: "A provider may operate only in certain terminals. Changing terminals after immigration can take significant time.",
  },
  {
    title: "Check the arrival time",
    text: "A delayed evening flight may arrive after a counter or airport post office closes.",
  },
  {
    title: "Check the booking deadline",
    text: "Airport pickup and hotel delivery often require reservations several days before arrival.",
  },
  {
    title: "Save the confirmation",
    text: "Keep the booking number, pickup instructions, map, and provider contact details available offline.",
  },
  {
    title: "Prepare backup internet",
    text: "Download essential maps, hotel details, railway routes, and translation information before departure.",
  },
];

const airportTypes = [
  {
    title: "Narita Airport",
    code: "NRT",
    text: "A major international gateway east of central Tokyo. Confirm the exact terminal because transfer time between terminals can be substantial.",
  },
  {
    title: "Haneda Airport",
    code: "HND",
    text: "Closer to central Tokyo. International arrivals may use different terminals depending on the airline and route.",
  },
  {
    title: "Kansai International Airport",
    code: "KIX",
    text: "A major gateway for Osaka, Kyoto, Kobe, and western Japan. Check whether pickup is in Terminal 1, Terminal 2, or another location.",
  },
  {
    title: "Chubu Centrair",
    code: "NGO",
    text: "A main international airport for Nagoya and central Japan. Confirm counter location and arrival-hall access.",
  },
  {
    title: "Fukuoka Airport",
    code: "FUK",
    text: "Convenient for Kyushu travel. Domestic and international terminal arrangements differ, so verify the collection point.",
  },
  {
    title: "New Chitose Airport",
    code: "CTS",
    text: "The main gateway for Sapporo and Hokkaido. Weather disruption can affect arrival and counter timing during winter.",
  },
];

const arrivalTimeline = [
  {
    number: "01",
    title: "Land and complete arrival procedures",
    text: "Pass through immigration, baggage claim, and customs before heading to most public arrival-area counters.",
  },
  {
    number: "02",
    title: "Connect to airport Wi-Fi if necessary",
    text: "Use airport Wi-Fi to retrieve booking information, but keep critical instructions saved offline as a backup.",
  },
  {
    number: "03",
    title: "Go to the correct pickup location",
    text: "Follow the provider’s terminal, floor, counter, post-office, or delivery instructions exactly.",
  },
  {
    number: "04",
    title: "Check the package",
    text: "Confirm the SIM, router, charger, cable, adapter, return envelope, and instructions before leaving.",
  },
  {
    number: "05",
    title: "Test the connection",
    text: "Activate the eSIM, install the physical SIM, or power on the router while help is still nearby.",
  },
  {
    number: "06",
    title: "Save return instructions",
    text: "Pocket Wi-Fi rentals may require airport return, postal return, or another procedure before departure.",
  },
];

const lateArrivalOptions = [
  {
    title: "Use a pre-installed eSIM",
    text: "This is usually the least dependent on airport counter opening hours.",
  },
  {
    title: "Arrange hotel delivery",
    text: "Confirm that the hotel accepts parcels and that delivery will occur before or on your arrival date.",
  },
  {
    title: "Use airport Wi-Fi temporarily",
    text: "This can help with initial messages and directions, but it does not replace mobile internet after leaving the airport.",
  },
  {
    title: "Use roaming as an emergency backup",
    text: "Check your home carrier’s charges first because international roaming can be expensive.",
  },
];

const mistakes = [
  "Booking pickup at Narita when the flight arrives at Haneda",
  "Choosing the right airport but the wrong terminal",
  "Assuming an airport counter stays open until the final flight",
  "Forgetting to account for immigration and baggage delays",
  "Keeping the pickup confirmation only in an online email",
  "Leaving the counter before testing the SIM or router",
  "Forgetting the return envelope or rental accessories",
  "Passing airport security before completing a required return",
];

const faqs = [
  {
    question: "Can I buy a SIM card at the airport after landing?",
    answer:
      "Often yes, but availability, inventory, price, support, opening hours, and compatibility assistance vary. Reserving in advance is usually more predictable.",
  },
  {
    question: "Can I collect pocket Wi-Fi at any terminal?",
    answer:
      "Not necessarily. Providers may support only specific terminals, counters, post offices, or delivery points.",
  },
  {
    question: "What happens if my flight arrives after the counter closes?",
    answer:
      "You may need to use a pre-installed eSIM, hotel delivery, airport Wi-Fi, roaming, or another temporary connection method.",
  },
  {
    question: "Should I activate my eSIM before arriving in Japan?",
    answer:
      "Installation before departure is usually helpful, but activation and validity rules differ. Follow the provider’s instructions so the plan does not start too early.",
  },
  {
    question: "Can I return pocket Wi-Fi at the airport?",
    answer:
      "Many services allow airport or postal return, but the accepted location, terminal, deadline, and security-area restrictions depend on the provider.",
  },
];

export default function AirportPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "Japan Airport Internet Guide: eSIM, SIM & Pocket Wi-Fi Pickup",
    description:
      "A practical arrival guide for collecting or activating internet service at Japanese airports.",
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
        name: "Japan Airport Internet Guide",
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
              <p className={styles.eyebrow}>Japan airport internet guide</p>

              <h1>Get connected after landing without searching the wrong terminal</h1>

              <p className={styles.heroText}>
                Plan your eSIM activation, physical SIM collection, or pocket
                Wi-Fi pickup before departure. Airport, terminal, opening hours,
                booking deadlines, and return rules all matter.
              </p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryButton} href="/compare">
                  Compare internet options
                </Link>

                <Link className={styles.secondaryButton} href="#arrival-checklist">
                  View arrival checklist
                </Link>
              </div>

              <p className={styles.disclosure}>
                Airport services and operating hours can change. Confirm the
                latest pickup and return instructions directly with the
                provider before traveling.
              </p>
            </div>

            <aside className={styles.heroCard}>
              <span>Most important</span>

              <h2>Airport name alone is not enough</h2>

              <ul>
                <li>Confirm the airport code</li>
                <li>Confirm the arrival terminal</li>
                <li>Check counter opening hours</li>
                <li>Allow time for immigration and baggage</li>
                <li>Save instructions offline</li>
              </ul>

              <Link href="#airports">See major airport notes →</Link>
            </aside>
          </div>
        </section>

        <section className={styles.optionsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Your three main options</p>
              <h2>Choose how you want to connect after arrival</h2>
            </div>

            <div className={styles.optionGrid}>
              {arrivalOptions.map((option) => (
                <article className={styles.optionCard} key={option.title}>
                  <p>{option.label}</p>
                  <h3>{option.title}</h3>
                  <span>{option.text}</span>
                  <Link href={option.href}>Read the full guide →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.checkSection} id="arrival-checklist">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before departure</p>
              <h2>Complete these checks before boarding your flight</h2>

              <p>
                Most airport internet problems begin before the traveler reaches
                Japan.
              </p>
            </div>

            <div className={styles.checkGrid}>
              {preArrivalChecks.map((check, index) => (
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

        <section className={styles.airportSection} id="airports">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Major international gateways</p>
              <h2>Airport-specific planning notes</h2>

              <p>
                These notes explain what to verify. Exact counters, providers,
                opening hours, and terminal services should always be checked
                before travel.
              </p>
            </div>

            <div className={styles.airportGrid}>
              {airportTypes.map((airport) => (
                <article className={styles.airportCard} key={airport.code}>
                  <span>{airport.code}</span>
                  <h3>{airport.title}</h3>
                  <p>{airport.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.timelineSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>After landing</p>
              <h2>A practical arrival-day sequence</h2>
            </div>

            <div className={styles.timeline}>
              {arrivalTimeline.map((step) => (
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
              <strong>Do not leave immediately:</strong>
              <p>
                Test the connection while you are still close to the pickup
                counter or airport support area. Problems are harder to solve
                after boarding a train or bus.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.lateSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Late-night arrivals</p>
              <h2>Prepare a plan that does not depend on an open counter</h2>
            </div>

            <div className={styles.lateGrid}>
              {lateArrivalOptions.map((option) => (
                <article className={styles.lateCard} key={option.title}>
                  <h3>{option.title}</h3>
                  <p>{option.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.comparisonSection}>
          <div className={styles.container}>
            <div className={styles.comparisonBox}>
              <div>
                <p className={styles.eyebrow}>Choose before arrival</p>
                <h2>Airport pickup is convenient, but it is not always necessary</h2>

                <p>
                  An eSIM can remove pickup logistics entirely. Physical SIM and
                  pocket Wi-Fi remain useful when device compatibility, group
                  size, or multiple-device use makes them a better fit.
                </p>
              </div>

              <div className={styles.comparisonLinks}>
                <Link href="/esim">Japan eSIM guide</Link>
                <Link href="/sim-card">Japan SIM card guide</Link>
                <Link href="/pocket-wifi">Japan pocket Wi-Fi guide</Link>
                <Link href="/compare">Compare all options</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.mistakeSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Avoid these mistakes</p>
              <h2>Common airport internet problems</h2>
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
              <h2>Japan airport internet questions</h2>
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
            <p className={styles.eyebrow}>Plan before flying</p>

            <h2>Choose your Japan internet method before arrival day</h2>

            <p>
              Compare device compatibility, airport logistics, group size,
              setup effort, and return requirements.
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
