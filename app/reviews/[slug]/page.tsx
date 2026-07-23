import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import {
  connectivityProviders,
  getConnectivityProvider,
  getProviderCtaLabel,
  getProviderDestination,
  isAffiliateProviderLink,
} from "@/data/connectivityProviders";

type ProviderReviewPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return connectivityProviders.map((provider) => ({
    slug: provider.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProviderReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = getConnectivityProvider(slug);

  if (!provider) {
    return {
      title: "Provider Review Not Found",
    };
  }

  const title = `${provider.name} Review for Japan Travelers`;
  const description =
    `${provider.name} review covering suitability, setup, ` +
    `connection types, strengths, limitations, and what to ` +
    `check before buying for a trip to Japan.`;
  const canonicalPath = `/reviews/${provider.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title,
      description,
      siteName: "Japan X Trip",
      images: [
        {
          url: "/images/brand/og-image-web.png",
          width: 1200,
          height: 630,
          alt: `${provider.name} review by Japan X Trip`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/brand/og-image-web.png"],
    },
  };
}

export default async function ProviderReviewPage({
  params,
}: ProviderReviewPageProps) {
  const { slug } = await params;
  const provider = getConnectivityProvider(slug);

  if (!provider) {
    notFound();
  }

  const affiliate = isAffiliateProviderLink(provider);
  const destination = getProviderDestination(provider);
  const ctaLabel = getProviderCtaLabel(provider, "Check current plans");

  return (
    <>
      <Header />

      <main className="review-page">
        <section className="review-hero">
          <div className="container review-hero-inner">
            <Link className="review-back-link" href="/#provider-list">
              <span aria-hidden="true">←</span>
              Back to provider comparison
            </Link>

            <p className="eyebrow">{provider.tagline}</p>

            <h1>{provider.name} review</h1>

            <p className="review-hero-summary">
              {provider.summary}
            </p>

            <div className="review-type-list">
              {provider.connectionTypes.map((type) => (
                <span key={type}>{type}</span>
              ))}
            </div>

            <div className="review-hero-actions">
              {destination ? (
                <a
                  className="button"
                  href={destination}
                  target="_blank"
                  rel={
                    affiliate
                      ? "sponsored nofollow noopener noreferrer"
                      : "noopener noreferrer"
                  }
                >
                  {ctaLabel}
                  <span aria-hidden="true">→</span>
                </a>
              ) : null}

              <Link
                className="review-secondary-link"
                href="/how-we-review-providers"
              >
                See our review method
              </Link>

              <Link className="review-secondary-link" href="/diagnosis">
                Not sure yet? Take the 30-sec check
              </Link>
            </div>
          </div>
        </section>

        <section className="review-content">
          <div className="container review-layout">
            <aside className="review-summary-card">
              <p className="eyebrow">Quick assessment</p>
              <h2>Who may consider it?</h2>

              <ul>
                {provider.bestFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="review-summary-note">
                This assessment is based primarily on provider
                information and practical traveler needs. It is
                not presented as a guarantee of performance.
              </p>
            </aside>

            <article className="review-article">
              <section className="review-section">
                <p className="eyebrow">Overview</p>
                <h2>What to know about {provider.name}</h2>

                <p>
                  {provider.summary} The most suitable choice
                  depends on device compatibility, trip length,
                  data use, the number of travelers and devices,
                  and the preferred setup method.
                </p>

                <p>
                  Prices, plan names, included data, validity,
                  network arrangements, and support conditions
                  may change. Confirm the latest information on
                  the provider&apos;s official website before
                  purchasing.
                </p>
              </section>

              <section className="review-section">
                <p className="eyebrow">Potential advantages</p>
                <h2>Strengths</h2>

                <div className="review-check-grid">
                  {provider.reviewStrengths.map((item) => (
                    <div key={item}>
                      <span aria-hidden="true">✓</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="review-section">
                <p className="eyebrow">Important limitations</p>
                <h2>Things to consider</h2>

                <div className="review-consideration-list">
                  {provider.considerations.map((item, index) => (
                    <div key={item}>
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="review-section">
                <p className="eyebrow">Before checkout</p>
                <h2>What to verify before buying</h2>

                <ul className="review-buying-list">
                  {provider.checkBeforeBuying.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="review-method-note">
                <div>
                  <p className="eyebrow">Transparency</p>
                  <h2>How this review was prepared</h2>
                </div>

                <div>
                  <p>
                    Japan X Trip checks information primarily
                    against official provider websites. We do not
                    claim that every provider has been personally
                    tested in every location, device, or network
                    condition.
                  </p>

                  <p>
                    Affiliate relationships do not determine
                    rankings or recommendations. This site may
                    receive a commission when a visitor purchases
                    through an affiliate link, at no additional
                    cost to the visitor.
                  </p>

                  <Link href="/how-we-review-providers">
                    Read the full review methodology
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </section>

              <section className="review-final-cta">
                <div>
                  <p className="eyebrow">Compare before buying</p>
                  <h2>
                    Check whether {provider.name} fits your trip.
                  </h2>

                  <p>
                    Compare it with alternative eSIM, physical SIM,
                    and pocket Wi-Fi options before making a final
                    decision.
                  </p>
                </div>

                <div className="review-final-actions">
                  {destination ? (
                    <a
                      className="button"
                      href={destination}
                      target="_blank"
                      rel={
                        affiliate
                          ? "sponsored nofollow noopener noreferrer"
                          : "noopener noreferrer"
                      }
                    >
                      {ctaLabel}
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : null}

                  <Link href="/#provider-list">
                    Compare all providers
                  </Link>
                </div>
              </section>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
