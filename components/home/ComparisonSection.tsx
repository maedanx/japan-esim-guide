type Option = {
  name: string;
  label: string;
  description: string;
  bestFor: string;
  setup: string;
  sharing: string;
  receive: string;
  strengths: string[];
  caution: string;
  featured?: boolean;
};

const options: Option[] = [
  {
    name: "Travel eSIM",
    label: "Fastest setup",
    description:
      "Install a digital data plan on a compatible unlocked phone before arriving in Japan.",
    bestFor: "Solo travellers with an eSIM-compatible phone",
    setup: "Install online",
    sharing: "Hotspot may be available",
    receive: "Nothing to collect",
    strengths: [
      "Can be prepared before departure",
      "No physical card to insert",
      "Keep your regular SIM in the phone",
    ],
    caution:
      "Check phone compatibility, carrier lock status, activation timing, and hotspot limits.",
    featured: true,
  },
  {
    name: "Physical SIM",
    label: "Simple alternative",
    description:
      "Insert a prepaid Japanese data SIM into an unlocked phone after arrival or before departure.",
    bestFor: "Phones without eSIM support",
    setup: "Insert SIM card",
    sharing: "Depends on the plan",
    receive: "Delivery or pickup",
    strengths: [
      "Works on many unlocked phones",
      "No separate device to charge",
      "Useful when eSIM is unavailable",
    ],
    caution:
      "Your phone must be unlocked, and changing SIM cards can affect access to your normal number.",
  },
  {
    name: "Pocket Wi-Fi",
    label: "Best for groups",
    description:
      "Carry a portable Wi-Fi router that connects several phones, tablets, or laptops.",
    bestFor: "Families, groups, and multiple devices",
    setup: "Turn on and connect",
    sharing: "Designed for several devices",
    receive: "Airport, hotel, or delivery",
    strengths: [
      "Connect multiple devices",
      "Easy for groups to share",
      "No phone compatibility check",
    ],
    caution:
      "The router must be charged and carried, and rental devices usually need to be returned.",
  },
];

export default function ComparisonSection() {
  return (
    <section id="compare" className="comparison-section">
      <div className="comparison-container">
        <div className="comparison-heading">
          <div>
            <p className="comparison-eyebrow">Compare your options</p>
            <h2>Three practical ways to get internet in Japan.</h2>
          </div>

          <p className="comparison-lead">
            Start with the option recommended by the 30-second check, then
            compare the differences before choosing a provider.
          </p>
        </div>

        <div className="comparison-grid">
          {options.map((option) => (
            <article
              key={option.name}
              className={`comparison-card ${
                option.featured ? "comparison-card--featured" : ""
              }`}
            >
              <div className="comparison-card-top">
                <span className="comparison-label">{option.label}</span>
                <h3>{option.name}</h3>
                <p>{option.description}</p>
              </div>

              <dl className="comparison-facts">
                <div>
                  <dt>Best for</dt>
                  <dd>{option.bestFor}</dd>
                </div>
                <div>
                  <dt>Setup</dt>
                  <dd>{option.setup}</dd>
                </div>
                <div>
                  <dt>Sharing</dt>
                  <dd>{option.sharing}</dd>
                </div>
                <div>
                  <dt>How you receive it</dt>
                  <dd>{option.receive}</dd>
                </div>
              </dl>

              <div className="comparison-strengths">
                {option.strengths.map((strength) => (
                  <div key={strength}>
                    <span aria-hidden="true">✓</span>
                    <p>{strength}</p>
                  </div>
                ))}
              </div>

              <div className="comparison-caution">
                <strong>Check before buying</strong>
                <p>{option.caution}</p>
              </div>

              <a
                className={`comparison-button ${
                  option.featured ? "comparison-button--primary" : ""
                }`}
                href="#provider-list"
              >
                View recommended {option.name.toLowerCase()} plans
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        <div id="provider-list" className="provider-placeholder">
          <div>
            <p className="comparison-eyebrow">Provider comparison</p>
            <h3>Verified plan comparisons are coming next.</h3>
            <p>
              This area will contain real providers, current prices, data
              allowances, validity periods, hotspot rules, refund conditions,
              and affiliate links after each offer has been checked.
            </p>
          </div>

          <a href="#diagnosis">
            Retake the diagnosis
            <span aria-hidden="true">↑</span>
          </a>
        </div>

        <p className="comparison-disclosure">
          Prices and conditions can change. Always confirm the latest details
          on the provider&apos;s official website before purchasing. Some
          future links on this page may be affiliate links, at no additional
          cost to the traveller.
        </p>
      </div>
    </section>
  );
}
