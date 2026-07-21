import { siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand brand--footer" href="#top">
            <span className="brand-mark" aria-hidden="true">日</span>
            <span>
              <strong>{siteConfig.name}</strong>
              <small>Clear answers for travel in Japan</small>
            </span>
          </a>
          <p className="footer-copy">
            Independent, beginner-friendly guidance for travelers who want reliable
            internet in Japan without the jargon.
          </p>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Before you buy</h3>
          <ul>
            <li>Check eSIM support</li>
            <li>Confirm carrier unlock</li>
            <li>Estimate your data use</li>
            <li>Read activation timing</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <p>Built in Japan for international travelers.</p>
      </div>
    </footer>
  );
}
