import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated?: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated = "July 2026",
  sections,
}: LegalPageProps) {
  return (
    <>
      <Header />

      <main className="information-page">
        <section className="information-hero">
          <div className="container information-hero-inner">
            <Link className="information-back-link" href="/">
              <span aria-hidden="true">←</span>
              Back to Japan eSIM Guide
            </Link>

            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="information-intro">{intro}</p>
            <p className="information-updated">
              Last updated: {updated}
            </p>
          </div>
        </section>

        <section className="information-content">
          <div className="container information-layout">
            <aside className="information-sidebar">
              <strong>On this page</strong>

              <nav aria-label={`${title} sections`}>
                {sections.map((section, index) => (
                  <a
                    key={section.title}
                    href={`#section-${index + 1}`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="information-article">
              {sections.map((section, index) => (
                <section
                  id={`section-${index + 1}`}
                  className="information-section"
                  key={section.title}
                >
                  <h2>{section.title}</h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <div className="information-return">
                <div>
                  <p className="eyebrow">Continue planning</p>
                  <h2>
                    Find the right internet option for your trip.
                  </h2>
                </div>

                <Link className="button" href="/#quick-check">
                  Start the 30-second check
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
