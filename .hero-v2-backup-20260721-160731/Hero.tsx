const trustItems = [
  "No confusing jargon",
  "Made for first-time visitors",
  "Independent guidance",
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow">Internet in Japan, made simple</p>
          <h1>
            Land in Japan.
            <span>Get connected without the guesswork.</span>
          </h1>
          <p className="hero-lead">
            Choose the right eSIM, SIM card, or pocket Wi-Fi in about 30 seconds—
            then follow clear setup steps when you arrive.
          </p>

          <div className="hero-actions">
            <a className="button" href="#diagnosis">
              Start the 30-second check
              <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href="#compare">
              Compare all options
            </a>
          </div>

          <ul className="trust-list" aria-label="Why use this guide">
            {trustItems.map((item) => (
              <li key={item}>
                <span aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual" aria-label="Connection guide preview">
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />

          <div className="phone-card">
            <div className="phone-top">
              <span>9:41</span>
              <span>● ●●</span>
            </div>

            <div className="signal-panel">
              <span className="signal-icon" aria-hidden="true">⌁</span>
              <p>Japan connection</p>
              <strong>Ready to go</strong>
              <div className="signal-bars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>

            <div className="mini-step">
              <span>1</span>
              <div>
                <strong>Install before departure</strong>
                <small>Keep the line turned off</small>
              </div>
            </div>
            <div className="mini-step">
              <span>2</span>
              <div>
                <strong>Turn it on after landing</strong>
                <small>Enable data roaming if required</small>
              </div>
            </div>
            <div className="mini-step">
              <span>3</span>
              <div>
                <strong>Open Maps and explore</strong>
                <small>You are connected</small>
              </div>
            </div>
          </div>

          <div className="floating-note floating-note--top">
            <span aria-hidden="true">⚡</span>
            <div>
              <strong>Fast setup</strong>
              <small>Usually a few minutes</small>
            </div>
          </div>

          <div className="floating-note floating-note--bottom">
            <span aria-hidden="true">✓</span>
            <div>
              <strong>Arrival-ready</strong>
              <small>No airport counter needed</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
