"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getProviderUrl,
  isAffiliateLink,
  providers,
  type ConnectionType,
  type Provider,
  type ProviderId,
} from "@/data/providers";

type DiagnosisAnswers = {
  esim?: string;
  devices?: string;
  duration?: string;
  data?: string;
  priority?: string;
};

type FilterType = "all" | ConnectionType;

const filterLabels: Record<FilterType, string> = {
  all: "All providers",
  esim: "eSIM",
  "physical-sim": "Physical SIM",
  "pocket-wifi": "Pocket Wi-Fi",
};

const typeLabels: Record<ConnectionType, string> = {
  esim: "eSIM",
  "physical-sim": "Physical SIM",
  "pocket-wifi": "Pocket Wi-Fi",
};

const defaultOrder: ProviderId[] = [
  "sakura-mobile",
  "airalo",
  "ninja-wifi",
  "ubigi",
];

function getRecommendation(answers: DiagnosisAnswers | null): {
  providerId: ProviderId;
  title: string;
  explanation: string;
  suggestedFilter: FilterType;
} | null {
  if (!answers) return null;

  if (
    answers.devices === "group" ||
    answers.priority === "share"
  ) {
    return {
      providerId: "ninja-wifi",
      title: "Pocket Wi-Fi is likely your easiest match",
      explanation:
        "You need to connect several people or devices, so a shareable pocket Wi-Fi plan deserves your first look.",
      suggestedFilter: "pocket-wifi",
    };
  }

  if (answers.esim === "no") {
    return {
      providerId: "sakura-mobile",
      title: "Start with a physical SIM",
      explanation:
        "Your phone does not support eSIM, so compare physical SIM plans for an unlocked phone first.",
      suggestedFilter: "physical-sim",
    };
  }

  if (answers.esim === "unknown") {
    return {
      providerId: "sakura-mobile",
      title: "Check compatibility before buying",
      explanation:
        "Until eSIM support is confirmed, a provider with eSIM, physical SIM, and pocket Wi-Fi choices keeps your options open.",
      suggestedFilter: "all",
    };
  }

  if (answers.duration === "long") {
    return {
      providerId: "sakura-mobile",
      title: "Start with a Japan-focused long-stay option",
      explanation:
        "For more than 30 days, compare renewable or longer-stay plans rather than choosing only by the lowest short-trip price.",
      suggestedFilter: "all",
    };
  }

  if (
    answers.data === "heavy" &&
    answers.devices === "two"
  ) {
    return {
      providerId: "airalo",
      title: "Compare high-data eSIM plans first",
      explanation:
        "A digital eSIM with suitable hotspot conditions may offer the best balance for your phone and second device.",
      suggestedFilter: "esim",
    };
  }

  return {
    providerId: "airalo",
    title: "A travel eSIM is probably your simplest option",
    explanation:
      "For one compatible unlocked phone, installing a digital plan before departure is usually the most convenient starting point.",
    suggestedFilter: "esim",
  };
}

function sortProviders(
  items: Provider[],
  recommendedId?: ProviderId,
): Provider[] {
  const order = recommendedId
    ? [
        recommendedId,
        ...defaultOrder.filter((id) => id !== recommendedId),
      ]
    : defaultOrder;

  return [...items].sort(
    (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
  );
}

function ProviderLink({
  provider,
  className,
  children,
}: {
  provider: Provider;
  className: string;
  children: React.ReactNode;
}) {
  const affiliate = isAffiliateLink(provider);

  return (
    <a
      className={className}
      href={getProviderUrl(provider)}
      target="_blank"
      rel={
        affiliate
          ? "sponsored nofollow noopener noreferrer"
          : "noopener noreferrer"
      }
      aria-label={`View current ${provider.name} plans`}
    >
      {children}
    </a>
  );
}

export default function ProviderExperience() {
  const [answers, setAnswers] =
    useState<DiagnosisAnswers | null>(null);
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("all");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(
        "jmc-diagnosis",
      );

      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    } catch {
      // The comparison still works when storage is unavailable.
    }

    const handleDiagnosis = (event: Event) => {
      const customEvent =
        event as CustomEvent<DiagnosisAnswers>;

      setAnswers(customEvent.detail);
      setActiveFilter("all");
      setShowAll(false);
    };

    window.addEventListener(
      "jmc:diagnosis",
      handleDiagnosis,
    );

    return () => {
      window.removeEventListener(
        "jmc:diagnosis",
        handleDiagnosis,
      );
    };
  }, []);

  const recommendation = useMemo(
    () => getRecommendation(answers),
    [answers],
  );

  const orderedProviders = useMemo(
    () =>
      sortProviders(
        providers,
        recommendation?.providerId,
      ),
    [recommendation],
  );

  const visibleProviders = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? orderedProviders
        : orderedProviders.filter((provider) =>
            provider.types.includes(activeFilter),
          );

    if (showAll || filtered.length <= 3) {
      return filtered;
    }

    return filtered.slice(0, 3);
  }, [activeFilter, orderedProviders, showAll]);

  const selectRecommendationFilter = () => {
    if (!recommendation) return;

    setActiveFilter(recommendation.suggestedFilter);
    setShowAll(true);

    window.setTimeout(() => {
      document
        .getElementById("compare-all-providers")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <section
      id="provider-list"
      className="provider-experience"
    >
      <div className="provider-shell">
        <header className="provider-intro">
          <div>
            <p className="provider-eyebrow">
              Independent comparison
            </p>

            <h2>
              Start with the option that fits your trip.
            </h2>
          </div>

          <p className="provider-intro-copy">
            There is no universal winner. Compare phone
            compatibility, trip length, number of devices,
            setup, and return requirements before choosing.
          </p>
        </header>

        {recommendation ? (
          <aside className="personal-match">
            <div className="personal-match-icon">
              ✓
            </div>

            <div className="personal-match-copy">
              <p>Your 30-second check</p>
              <h3>{recommendation.title}</h3>
              <span>{recommendation.explanation}</span>
            </div>

            <button
              type="button"
              onClick={selectRecommendationFilter}
            >
              Show my matches
              <span aria-hidden="true">→</span>
            </button>
          </aside>
        ) : (
          <aside className="personal-match personal-match-empty">
            <div className="personal-match-icon">?</div>

            <div className="personal-match-copy">
              <p>Need a personal recommendation?</p>
              <h3>Take the 30-second check first.</h3>
              <span>
                We will reorder these providers according to
                your phone, devices, trip length, and priorities.
              </span>
            </div>

            <a href="#quick-check">
              Start the check
              <span aria-hidden="true">↑</span>
            </a>
          </aside>
        )}

        <div className="top-picks-heading">
          <div>
            <p className="provider-eyebrow">
              Our starting picks
            </p>
            <h3>Four useful places to begin.</h3>
          </div>

          <p>
            These labels describe who each provider may suit.
            They are not paid rankings or review scores.
          </p>
        </div>

        <div className="top-picks-grid">
          {orderedProviders.map((provider, index) => {
            const isPersonalMatch =
              recommendation?.providerId === provider.id;

            return (
              <article
                className={`top-pick-card ${
                  isPersonalMatch
                    ? "top-pick-card-recommended"
                    : ""
                }`}
                key={provider.id}
              >
                <div className="top-pick-card-top">
                  <span className="top-pick-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {isPersonalMatch ? (
                    <span className="personal-badge">
                      Recommended for you
                    </span>
                  ) : (
                    <span className="category-badge">
                      {provider.category}
                    </span>
                  )}
                </div>

                <div className="provider-mark">
                  {provider.shortName}
                </div>

                <p className="pick-award">
                  {provider.award}
                </p>

                <h4>{provider.name}</h4>
                <p className="pick-summary">
                  {provider.summary}
                </p>

                <div className="type-badges">
                  {provider.types.map((type) => (
                    <span key={type}>
                      {typeLabels[type]}
                    </span>
                  ))}
                </div>

                <p className="pick-best-for">
                  <strong>Best for</strong>
                  {provider.bestFor}
                </p>

                <ProviderLink
                  provider={provider}
                  className="pick-button"
                >
                  <span>{provider.priceLabel}</span>
                  <span aria-hidden="true">→</span>
                </ProviderLink>
              </article>
            );
          })}
        </div>

        <div
          id="compare-all-providers"
          className="provider-detail-section"
        >
          <div className="provider-detail-heading">
            <div>
              <p className="provider-eyebrow">
                Detailed comparison
              </p>
              <h3>Compare all providers.</h3>
            </div>

            <div
              className="provider-filters"
              aria-label="Filter providers"
            >
              {(
                Object.keys(
                  filterLabels,
                ) as FilterType[]
              ).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    activeFilter === filter
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setActiveFilter(filter);
                    setShowAll(true);
                  }}
                  aria-pressed={
                    activeFilter === filter
                  }
                >
                  {filterLabels[filter]}
                </button>
              ))}
            </div>
          </div>

          <div className="provider-detail-grid">
            {visibleProviders.map((provider) => {
              const isPersonalMatch =
                recommendation?.providerId === provider.id;

              return (
                <article
                  className={`provider-detail-card ${
                    isPersonalMatch
                      ? "provider-detail-card-recommended"
                      : ""
                  }`}
                  key={provider.id}
                >
                  <div className="detail-card-heading">
                    <div className="detail-card-identity">
                      <div className="provider-mark">
                        {provider.shortName}
                      </div>

                      <div>
                        <p>{provider.category}</p>
                        <h4>{provider.name}</h4>
                      </div>
                    </div>

                    {isPersonalMatch ? (
                      <span className="personal-badge">
                        Your match
                      </span>
                    ) : null}
                  </div>

                  <p className="detail-summary">
                    {provider.summary}
                  </p>

                  <div className="type-badges">
                    {provider.types.map((type) => (
                      <span key={type}>
                        {typeLabels[type]}
                      </span>
                    ))}
                  </div>

                  <dl className="provider-facts">
                    <div>
                      <dt>Best for</dt>
                      <dd>{provider.bestFor}</dd>
                    </div>
                    <div>
                      <dt>Data</dt>
                      <dd>{provider.data}</dd>
                    </div>
                    <div>
                      <dt>Validity</dt>
                      <dd>{provider.validity}</dd>
                    </div>
                    <div>
                      <dt>Hotspot</dt>
                      <dd>{provider.hotspot}</dd>
                    </div>
                    <div>
                      <dt>Delivery</dt>
                      <dd>{provider.delivery}</dd>
                    </div>
                  </dl>

                  <div className="provider-strength-list">
                    {provider.strengths.map(
                      (strength) => (
                        <p key={strength}>
                          <span aria-hidden="true">✓</span>
                          {strength}
                        </p>
                      ),
                    )}
                  </div>

                  <div className="provider-caution">
                    <strong>Check before buying</strong>
                    <p>{provider.caution}</p>
                  </div>

                  <ProviderLink
                    provider={provider}
                    className="detail-button"
                  >
                    <span>{provider.priceLabel}</span>
                    <span aria-hidden="true">→</span>
                  </ProviderLink>
                </article>
              );
            })}
          </div>

          {!showAll &&
          orderedProviders.length > 3 ? (
            <button
              className="show-all-providers"
              type="button"
              onClick={() => setShowAll(true)}
            >
              Show all providers
              <span aria-hidden="true">↓</span>
            </button>
          ) : null}
        </div>

        <div className="choice-guide">
          <div>
            <p className="provider-eyebrow">
              Quick decision guide
            </p>
            <h3>Who should choose what?</h3>
          </div>

          <div className="choice-guide-grid">
            <div>
              <span>Solo traveller</span>
              <strong>Start with an eSIM</strong>
            </div>
            <div>
              <span>Family or group</span>
              <strong>Compare pocket Wi-Fi</strong>
            </div>
            <div>
              <span>No eSIM support</span>
              <strong>Choose a physical SIM</strong>
            </div>
            <div>
              <span>Phone and laptop</span>
              <strong>
                Check hotspot or pocket Wi-Fi
              </strong>
            </div>
            <div>
              <span>Over 30 days</span>
              <strong>
                Compare longer-stay plans
              </strong>
            </div>
            <div>
              <span>Not sure</span>
              <strong>
                Take the 30-second check
              </strong>
            </div>
          </div>
        </div>

        <footer className="provider-disclosure">
          <strong>How this comparison works</strong>
          <p>
            Prices, availability, data allowances, and plan
            conditions can change. Confirm the current details
            on the provider&apos;s website before buying. Some
            links may become affiliate links after partnership
            approval, at no additional cost to the traveller.
            Recommendations remain based on suitability rather
            than commission.
          </p>
        </footer>
      </div>
    </section>
  );
}
