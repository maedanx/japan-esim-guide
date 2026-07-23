import Link from "next/link";
import { connectivityProviders } from "@/data/connectivityProviders";

export default function ProviderReviewLinks() {
  return (
    <section className="provider-review-links">
      <div className="container">
        <header className="provider-review-links-heading">
          <div>
            <p className="eyebrow">Provider guides</p>
            <h2>Read the details before you choose.</h2>
          </div>

          <p>
            Review suitability, setup, advantages, limitations,
            and the details to confirm before purchasing.
          </p>
        </header>

        <div className="provider-review-link-grid">
          {connectivityProviders.map((provider, index) => (
            <Link
              className="provider-review-link-card"
              href={`/reviews/${provider.slug}`}
              key={provider.slug}
            >
              <div>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <small>{provider.tagline}</small>
              </div>

              <h3>{provider.name}</h3>
              <p>{provider.summary}</p>

              <strong>
                Read review
                <span aria-hidden="true">→</span>
              </strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
