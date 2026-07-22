import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

const guideLinks = [
  { label: "Best eSIM for Japan", href: "/best-esim-japan" },
  { label: "30-sec check", href: "/#quick-check" },
  { label: "Compare", href: "/#provider-list" },
  { label: "Setup", href: "/#setup" },
  { label: "Troubleshooting", href: "/#troubleshooting" },
  { label: "FAQ", href: "/#faq" },
];

const informationLinks = [
  { label: "About", href: "/about" },
  {
    label: "How We Review Providers",
    href: "/how-we-review-providers",
  },
  {
    label: "Affiliate Disclosure",
    href: "/affiliate-disclosure",
  },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid footer-grid-expanded">
          <div>
            <Link
              className="brand brand--footer brand--footer-image"
              href="/"
              aria-label={`${siteConfig.name} home`}
            >
              <span className="footer-logo-frame">
                <Image
                  src="/images/brand/logo-footer-web.png"
                  alt="Japan X Trip"
                  fill
                  sizes="260px"
                  className="footer-logo-image"
                />
              </span>
            </Link>

            <p className="footer-copy">
              Independent, beginner-friendly guidance for travelers
              who want reliable internet in Japan without the jargon.
            </p>
          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              {guideLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>About this guide</h3>
            <ul>
              {informationLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>Built in Japan for international travelers.</p>
        </div>
      </div>
    </footer>
  );
}
