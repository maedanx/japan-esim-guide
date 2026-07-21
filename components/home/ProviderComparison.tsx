import {
  getProviderUrl,
  providers,
  type ConnectionType,
} from "@/data/providers";

const typeLabels: Record<ConnectionType, string> = {
  esim: "eSIM",
  "physical-sim": "Physical SIM",
  "pocket-wifi": "Pocket Wi-Fi",
};

export default function ProviderComparison() {
  return (
    <section id="provider-list" className="provider-comparison-section">
      <div className="provider-comparison-container">
        <div className="provider-comparison-heading">
          <div>
            <p className="provider-comparison-eyebrow">
              Provider comparison
            </p>
            <h2>Compare providers before you buy.</h2>
          </div>

          <p>
            Prices and plan conditions change. We show the practical
            differences first, then send you to the provider for the latest
            confirmed details.
          </p>
        </div>

        <div className="provider-table-wrap">
          <table className="provider-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Available options</th>
                <th>Best for</th>
                <th>Data</th>
                <th>Validity</th>
                <th>Hotspot</th>
                <th>Price</th>
                <th aria-label="Provider link" />
              </tr>
            </thead>

            <tbody>
              {providers.map((provider) => (
                <tr key={provider.id}>
                  <td>
                    <div className="provider-name-cell">
                      <strong>{provider.name}</strong>
                      {provider.recommended ? (
                        <span>Recommended starting point</span>
                      ) : null}
                    </div>
                  </td>

                  <td>
                    <div className="provider-type-list">
                      {provider.type.map((type) => (
                        <span key={type}>{typeLabels[type]}</span>
                      ))}
                    </div>
                  </td>

                  <td>{provider.bestFor}</td>
                  <td>{provider.data}</td>
                  <td>{provider.validity}</td>
                  <td>{provider.hotspot}</td>
                  <td>
                    <strong>{provider.priceLabel}</strong>
                  </td>

                  <td>
                    <a
                      className="provider-table-button"
                      href={getProviderUrl(provider)}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                    >
                      View plans
                      <span aria-hidden="true">→</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="provider-mobile-grid">
          {providers.map((provider) => (
            <article className="provider-mobile-card" key={provider.id}>
              <div className="provider-mobile-card-heading">
                <div>
                  <h3>{provider.name}</h3>
                  <p>{provider.description}</p>
                </div>

                {provider.recommended ? (
                  <span>Recommended</span>
                ) : null}
              </div>

              <div className="provider-type-list">
                {provider.type.map((type) => (
                  <span key={type}>{typeLabels[type]}</span>
                ))}
              </div>

              <dl>
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

              <div className="provider-strengths">
                {provider.strengths.map((strength) => (
                  <p key={strength}>
                    <span aria-hidden="true">✓</span>
                    {strength}
                  </p>
                ))}
              </div>

              <div className="provider-card-caution">
                <strong>Check before buying</strong>
                <p>{provider.caution}</p>
              </div>

              <a
                className="provider-card-button"
                href={getProviderUrl(provider)}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
              >
                {provider.priceLabel}
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>

        <p className="provider-disclosure">
          Some links may become affiliate links after partnership approval.
          This does not increase the traveller&apos;s price. Recommendations
          should remain based on suitability, not commission.
        </p>
      </div>
    </section>
  );
}
