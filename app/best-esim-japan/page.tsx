import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { siteConfig } from "@/data/site";
import {
  connectivityProviders,
  getProviderDestination,
  isAffiliateProviderLink,
  type ConnectivityProvider,
} from "@/data/connectivityProviders";

const pageUrl = `${siteConfig.url}/best-esim-japan`;

export const metadata: Metadata = {
  title: "Best eSIM for Japan (2026 Guide)",
  description:
    "Compare eSIM options for Japan by setup, data, validity, device compatibility, support, and travel style.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Best eSIM for Japan (2026 Guide)",
    description:
      "Compare eSIM options for Japan and find a practical match for your trip, device, and data needs.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Best eSIM for Japan (2026 Guide)",
    description:
      "Compare eSIM options for Japan by setup, data, validity, support, and travel style.",
  },
};

const displayOrder = [
  "sakura-mobile",
  "airalo",
  "ubigi",
  "nomad-esim",
  "japan-wireless",
  "ninja-wifi",
];

const providerNotes: Record<
  string,
  {
    label: string;
    fit: string;
    setup: string;
    pickup: string;
    support: string;
  }
> = {
  "sakura-mobile": {
    label: "Japan-focused starting point",
    fit: "Travelers who want several connection types and Japan-focused guidance.",
    setup: "Digital or physical, depending on product",
    pickup: "Available for some physical products",
    support: "English-language guidance available",
  },
  airalo: {
    label: "Simple digital eSIM",
    fit: "Solo travelers with an unlocked eSIM-compatible phone.",
    setup: "Digital installation",
    pickup: "Not required",
    support: "Online support and setup resources",
  },
  ubigi: {
    label: "Alternative digital eSIM",
    fit: "Travelers comparing multiple prepaid eSIM options.",
    setup: "Digital installation",
    pickup: "Not required",
    support: "Online support resources",
  },
  "nomad-esim": {
    label: "Additional eSIM option",
    fit: "Travelers comparing current data allowances and validity periods.",
    setup: "Digital installation",
    pickup: "Not required",
    support: "Online support resources",
  },
  "japan-wireless": {
    label: "Japan travel alternative",
    fit: "Travelers comparing eSIM and physical connectivity options.",
    setup: "Depends on selected product",
    pickup: "Available for some products",
    support: "Japan-focused traveler information",
  },
  "ninja-wifi": {
    label: "Family and group alternative",
    fit: "Families and groups connecting several phones, tablets, or laptops.",
    setup: "Physical rental or selected digital product",
    pickup: "Airport or delivery options may be available",
    support: "English-language traveler guidance",
  },
};

const faqs = [
  {
    question: "What is the best eSIM for Japan?",
    answer:
      "There is no single best eSIM for every traveler. The right option depends on phone compatibility, trip length, data use, tethering needs, support preferences, and whether you want a fully digital setup.",
  },
  {
    question: "Can I install an eSIM before arriving in Japan?",
    answer:
      "Many travel eSIMs can be installed before departure. However, the moment when validity begins differs by provider and plan. Confirm whether the plan starts at installation, activation, first network connection, or another specified time.",
  },
  {
    question: "Does an eSIM work outside Tokyo?",
    answer:
      "An eSIM may work outside Tokyo when the selected plan includes network coverage in those areas. Actual performance varies by location, terrain, buildings, congestion, device compatibility, and the provider’s network arrangements.",
  },
  {
    question: "Is unlimited data really unlimited?",
    answer:
      "The word unlimited may still be subject to fair-use policies, speed reductions, daily limits, network management, or tethering restrictions. Read the conditions for the exact plan before purchasing.",
  },
  {
    question: "Should I choose pocket Wi-Fi instead?",
    answer:
      "Pocket Wi-Fi may be a better match for families, groups, laptops, or travelers with phones that do not support eSIM. It must be carried, charged, and usually returned after the rental.",
  },
];

function getOrderedProviders(): ConnectivityProvider[] {
  return displayOrder
    .map((slug) =>
      connectivityProviders.find((provider) => provider.slug === slug),
    )
    .filter(
      (provider): provider is ConnectivityProvider =>
        provider !== undefined,
    );
}

function ProviderExternalLink({
  provider,
  className,
  children,
}: {
  provider: ConnectivityProvider;
  className: string;
  children: React.ReactNode;
}) {
  const affiliate = isAffiliateProviderLink(provider);
  const destination = getProviderDestination(provider);

  if (!destination) return null;

  return (
    <a
      className={className}
      href={destination}
      target="_blank"
      rel={
        affiliate
          ? "sponsored nofollow noopener noreferrer"
          : "noopener noreferrer"
      }
    >
      {children}
    </a>
  );
}

export default function BestEsimJapanPage() {
  const providers = getOrderedProviders();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best eSIM for Japan (2026 Guide)",
    description:
      "A practical comparison of eSIM and internet options for travelers visiting Japan.",
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: "Japan X Trip",
    },
    publisher: {
      "@type": "Organization",
      name: "Japan X Trip",
    },
    dateModified: "2026-07-21",
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
        name: "Best eSIM for Japan",
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

      <main className="best-esim-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        <section className="best-esim-hero">
          <div className="container best-esim-hero-inner">
            <nav
              className="best-esim-breadcrumb"
              aria-label="Breadcrumb"
            >
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Best eSIM for Japan</span>
            </nav>

            <p className="eyebrow">Japan internet comparison</p>

            <h1>Best eSIM for Japan (2026 Guide)</h1>

            <p className="best-esim-intro">
              Choosing an eSIM for Japan can be confusing. This
              guide compares practical options by setup, device
              compatibility, trip style, support, and the details
              travelers should check before purchasing.
            </p>

            <div className="best-esim-hero-actions">
              <Link className="button" href="/#quick-check">
                Get a 30-second recommendation
                <span aria-hidden="true">→</span>
              </Link>

              <a href="#comparison">
                Compare providers
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <p className="best-esim-update">
              Last reviewed: July 2026. Prices and plan details
              may change.
            </p>
          </div>
        </section>

        <section className="best-esim-content">
          <div className="container">
            <section className="best-esim-picks">
              <header className="best-esim-section-heading">
                <div>
                  <p className="eyebrow">Quick starting points</p>
                  <h2>Choose according to your trip.</h2>
                </div>

                <p>
                  These are use-case labels, not paid rankings.
                  The most suitable option depends on the traveler.
                </p>
              </header>

              <div className="best-esim-pick-grid">
                {providers.slice(0, 4).map((provider, index) => (
                  <Link
                    className="best-esim-pick-card"
                    href={`/reviews/${provider.slug}`}
                    key={provider.slug}
                  >
                    <span className="best-esim-pick-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <small>
                      {providerNotes[provider.slug]?.label}
                    </small>

                    <h3>{provider.name}</h3>

                    <p>
                      {providerNotes[provider.slug]?.fit ??
                        provider.summary}
                    </p>

                    <strong>
                      Read full review
                      <span aria-hidden="true">→</span>
                    </strong>
                  </Link>
                ))}
              </div>
            </section>

            <section
              id="comparison"
              className="best-esim-comparison"
            >
              <header className="best-esim-section-heading">
                <div>
                  <p className="eyebrow">Provider comparison</p>
                  <h2>Compare before you buy.</h2>
                </div>

                <p>
                  Exact prices, allowances, validity periods, and
                  promotional offers should be confirmed on the
                  provider’s official website.
                </p>
              </header>

              <div className="best-esim-table-wrap">
                <table className="best-esim-table">
                  <thead>
                    <tr>
                      <th>Provider</th>
                      <th>Connection type</th>
                      <th>Setup</th>
                      <th>Pickup</th>
                      <th>Support</th>
                      <th>Best for</th>
                      <th>Current plans</th>
                    </tr>
                  </thead>

                  <tbody>
                    {providers.map((provider) => {
                      const note = providerNotes[provider.slug];

                      return (
                        <tr key={provider.slug}>
                          <td>
                            <strong>{provider.name}</strong>
                            <Link
                              href={`/reviews/${provider.slug}`}
                            >
                              Read review
                            </Link>
                          </td>

                          <td>
                            {provider.connectionTypes.join(", ")}
                          </td>

                          <td>{note?.setup}</td>
                          <td>{note?.pickup}</td>
                          <td>{note?.support}</td>
                          <td>{note?.fit}</td>

                          <td>
                            <ProviderExternalLink
                              provider={provider}
                              className="best-esim-table-link"
                            >
                              See latest price
                              <span aria-hidden="true">→</span>
                            </ProviderExternalLink>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="best-esim-provider-sections">
              <header className="best-esim-section-heading">
                <div>
                  <p className="eyebrow">Provider overview</p>
                  <h2>What each option may suit.</h2>
                </div>

                <p>
                  These summaries describe practical starting
                  points. Read the full review and current provider
                  terms before deciding.
                </p>
              </header>

              <div className="best-esim-provider-list">
                {providers.map((provider, index) => (
                  <article
                    className="best-esim-provider-card"
                    key={provider.slug}
                  >
                    <div className="best-esim-provider-title">
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <p>{provider.tagline}</p>
                        <h3>{provider.name}</h3>
                      </div>
                    </div>

                    <p className="best-esim-provider-summary">
                      {provider.summary}
                    </p>

                    <div className="best-esim-provider-columns">
                      <div>
                        <h4>Potential advantages</h4>
                        <ul>
                          {provider.reviewStrengths
                            .slice(0, 3)
                            .map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                        </ul>
                      </div>

                      <div>
                        <h4>Things to check</h4>
                        <ul>
                          {provider.considerations
                            .slice(0, 3)
                            .map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <div className="best-esim-provider-actions">
                      <Link href={`/reviews/${provider.slug}`}>
                        Read full review
                        <span aria-hidden="true">→</span>
                      </Link>

                      <ProviderExternalLink
                        provider={provider}
                        className="best-esim-provider-external"
                      >
                        See current plans
                      </ProviderExternalLink>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="best-esim-choose">
              <header>
                <p className="eyebrow">How to choose</p>
                <h2>Match the connection to your trip.</h2>
              </header>

              <div className="best-esim-choice-grid">
                <article>
                  <span>01</span>
                  <h3>Check eSIM compatibility</h3>
                  <p>
                    Confirm that the exact phone model supports
                    eSIM and that the device is carrier-unlocked.
                  </p>
                </article>

                <article>
                  <span>02</span>
                  <h3>Compare trip length</h3>
                  <p>
                    Check validity carefully and confirm when the
                    validity period begins.
                  </p>
                </article>

                <article>
                  <span>03</span>
                  <h3>Estimate data use</h3>
                  <p>
                    Navigation, video, tethering, remote work, and
                    social media can require very different amounts
                    of data.
                  </p>
                </article>

                <article>
                  <span>04</span>
                  <h3>Count travelers and devices</h3>
                  <p>
                    A family sharing phones and laptops may prefer
                    pocket Wi-Fi or a plan with clear tethering
                    support.
                  </p>
                </article>

                <article>
                  <span>05</span>
                  <h3>Review support options</h3>
                  <p>
                    Check English instructions, support channels,
                    operating hours, and troubleshooting resources.
                  </p>
                </article>

                <article>
                  <span>06</span>
                  <h3>Read cancellation terms</h3>
                  <p>
                    Refund rules may differ for installed eSIMs,
                    incompatible phones, unused plans, and rental
                    products.
                  </p>
                </article>
              </div>
            </section>

            <section className="best-esim-method">
              <div>
                <p className="eyebrow">Editorial transparency</p>
                <h2>How we compare providers.</h2>
              </div>

              <div>
                <p>
                  Information is checked primarily from official
                  provider websites. Prices and plan details may
                  change after publication.
                </p>

                <p>
                  Affiliate relationships do not determine rankings
                  or recommendations. Recommendations are based on
                  traveler needs and the comparison criteria
                  described in our review methodology.
                </p>

                <div>
                  <Link href="/how-we-review-providers">
                    How We Review Providers
                  </Link>
                  <Link href="/affiliate-disclosure">
                    Affiliate Disclosure
                  </Link>
                </div>
              </div>
            </section>

            <section className="best-esim-faq">
              <header className="best-esim-section-heading">
                <div>
                  <p className="eyebrow">Frequently asked questions</p>
                  <h2>Japan eSIM FAQ</h2>
                </div>
              </header>

              <div className="best-esim-faq-list">
                {faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="best-esim-final">
              <div>
                <p className="eyebrow">Still deciding?</p>
                <h2>
                  Get a recommendation based on your own trip.
                </h2>

                <p>
                  Answer a few questions about your phone, trip
                  length, devices, and priorities.
                </p>
              </div>

              <Link className="button" href="/#quick-check">
                View 30-second recommendation
                <span aria-hidden="true">→</span>
              </Link>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
