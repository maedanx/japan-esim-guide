import SectionHeading from "@/components/ui/SectionHeading";

const options = [
  {
    icon: "e",
    title: "Travel eSIM",
    label: "Best for most solo travelers",
    best: true,
    pros: ["Buy before departure", "No physical pickup", "Keep your normal SIM installed"],
    watch: "Requires an unlocked, eSIM-compatible phone",
  },
  {
    icon: "SIM",
    title: "Physical SIM",
    label: "Best for phones without eSIM",
    pros: ["Works with many older phones", "No extra device to carry", "Widely available"],
    watch: "You must swap SIM cards and store your usual SIM safely",
  },
  {
    icon: "Wi",
    title: "Pocket Wi-Fi",
    label: "Best for groups or many devices",
    pros: ["Share one connection", "Connect phones and laptops", "Simple for groups"],
    watch: "Needs charging, carrying, pickup, and usually return",
  },
];

export default function ConnectionOptions() {
  return (
    <section className="section comparison-section" id="compare">
      <div className="container">
        <SectionHeading
          eyebrow="Compare your choices"
          title="Three ways to get online in Japan"
          description="There is no universal winner. The best choice depends on your phone, your group, and how you travel."
        />

        <div className="option-card-grid">
          {options.map((option) => (
            <article className={`connection-card ${option.best ? "is-featured" : ""}`} key={option.title}>
              {option.best ? <span className="recommended-badge">Recommended</span> : null}
              <div className="connection-icon" aria-hidden="true">{option.icon}</div>
              <p className="card-kicker">{option.label}</p>
              <h3>{option.title}</h3>
              <ul>
                {option.pros.map((pro) => (
                  <li key={pro}>
                    <span aria-hidden="true">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
              <div className="watch-box">
                <strong>Check first</strong>
                <p>{option.watch}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="buy-checklist">
          <div>
            <p className="eyebrow">Before purchasing</p>
            <h3>Four checks that prevent most problems</h3>
          </div>
          <ol>
            <li><span>01</span> Your phone supports the product</li>
            <li><span>02</span> Your phone is carrier-unlocked</li>
            <li><span>03</span> Coverage includes your destinations</li>
            <li><span>04</span> You understand when validity begins</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
