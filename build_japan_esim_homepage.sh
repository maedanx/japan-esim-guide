#!/bin/bash
set -euo pipefail

PROJECT_DIR="$HOME/Documents/Japan X Trip/01_Website/japan-esim-guide"

if [ ! -d "$PROJECT_DIR" ]; then
  echo "❌ プロジェクトが見つかりません:"
  echo "   $PROJECT_DIR"
  exit 1
fi

cd "$PROJECT_DIR"

BACKUP_DIR=".homepage-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

for item in src/app src/components src/data; do
  if [ -e "$item" ]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$item")"
    cp -R "$item" "$BACKUP_DIR/$(dirname "$item")/"
  fi
done

mkdir -p \
  src/app \
  src/components/layout \
  src/components/home \
  src/components/ui \
  src/data \
  src/lib \
  public/images \
  public/icons

cat > src/data/site.ts <<'EOF'
export const siteConfig = {
  name: "Japan X Trip",
  shortName: "JMC",
  description:
    "Simple, practical guidance for staying connected in Japan—from choosing an eSIM to fixing connection problems after arrival.",
  url: "https://example.com",
  email: "hello@example.com",
  navigation: [
    { label: "30-sec check", href: "#diagnosis" },
    { label: "Compare", href: "#compare" },
    { label: "Setup", href: "#setup" },
    { label: "Troubleshooting", href: "#troubleshooting" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;
EOF

cat > src/data/faq.ts <<'EOF'
export const faqItems = [
  {
    question: "Should I buy an eSIM before arriving in Japan?",
    answer:
      "Usually, yes. Installing it before departure means you can connect soon after landing. Keep the eSIM turned off until you arrive, and follow your provider’s activation instructions.",
  },
  {
    question: "Will my phone work with a Japanese eSIM?",
    answer:
      "Your phone needs to support eSIM and be carrier-unlocked. Check both before purchasing. Some phones sold in certain countries or through specific carriers may have restrictions.",
  },
  {
    question: "Is an eSIM better than a pocket Wi-Fi?",
    answer:
      "An eSIM is usually simpler for one traveler with a compatible phone. Pocket Wi-Fi can be useful for groups, laptops, or several devices, but it adds another device to charge and return.",
  },
  {
    question: "Can I keep using WhatsApp, LINE, and my usual apps?",
    answer:
      "Yes. A data-only eSIM normally does not change your app accounts. Your regular phone number may still receive messages depending on your home carrier and roaming settings.",
  },
  {
    question: "What should I do if the eSIM has no signal?",
    answer:
      "Check that the eSIM line is turned on, mobile data is assigned to it, data roaming is enabled when required, and airplane mode has been toggled once. Then restart the phone.",
  },
  {
    question: "Do I need a Japanese phone number?",
    answer:
      "Most short-term visitors do not. Data is enough for maps, translation, messaging, reservations, and internet calls. A Japanese number may help for some local services or longer stays.",
  },
] as const;
EOF

cat > src/components/ui/SectionHeading.tsx <<'EOF'
type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-description">{description}</p> : null}
    </div>
  );
}
EOF

cat > src/components/layout/Header.tsx <<'EOF'
"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Japan X Trip home">
          <span className="brand-mark" aria-hidden="true">日</span>
          <span>
            <strong>{siteConfig.name}</strong>
            <small>Travel Japan with confidence</small>
          </span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="button button--small" href="#diagnosis" onClick={closeMenu}>
            Find my best option
          </a>
        </nav>
      </div>
    </header>
  );
}
EOF

cat > src/components/layout/Footer.tsx <<'EOF'
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
EOF

cat > src/components/home/Hero.tsx <<'EOF'
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
EOF

cat > src/components/home/QuickDiagnosis.tsx <<'EOF'
"use client";

import { useMemo, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

type Answers = {
  esim: string;
  devices: string;
  duration: string;
};

const initialAnswers: Answers = {
  esim: "",
  devices: "",
  duration: "",
};

export default function QuickDiagnosis() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);

  const result = useMemo(() => {
    if (!answers.esim || !answers.devices || !answers.duration) return null;

    if (answers.esim === "no") {
      return {
        title: "Physical SIM card",
        description:
          "Your phone does not support eSIM, so a prepaid physical SIM is likely the simplest choice.",
        note: "Confirm that your phone is carrier-unlocked before buying.",
      };
    }

    if (answers.devices === "many") {
      return {
        title: "Pocket Wi-Fi",
        description:
          "You want to connect several devices, so one shared pocket Wi-Fi may be more convenient.",
        note: "Remember that it must be charged, carried, and usually returned.",
      };
    }

    if (answers.duration === "long") {
      return {
        title: "Long-stay eSIM or local SIM",
        description:
          "For a longer stay, compare renewable eSIMs with local monthly plans rather than buying a short tourist package.",
        note: "Check identity requirements and whether a Japanese phone number is included.",
      };
    }

    return {
      title: "Travel eSIM",
      description:
        "For one compatible phone and a short trip, an eSIM is usually the fastest and easiest option.",
      note: "Install it before departure and activate it according to the provider’s instructions.",
    };
  }, [answers]);

  const updateAnswer = (key: keyof Answers, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="section diagnosis-section" id="diagnosis">
      <div className="container">
        <SectionHeading
          eyebrow="30-second connection check"
          title="Which option fits your trip?"
          description="Answer three quick questions. No email address and no technical knowledge needed."
          align="center"
        />

        <div className="diagnosis-card">
          <fieldset>
            <legend>
              <span>1</span>
              Does your phone support eSIM?
            </legend>
            <div className="option-grid">
              {[
                ["yes", "Yes", "My phone supports eSIM"],
                ["no", "No / not sure", "I need a physical option"],
              ].map(([value, title, text]) => (
                <label
                  className={answers.esim === value ? "choice is-selected" : "choice"}
                  key={value}
                >
                  <input
                    type="radio"
                    name="esim"
                    value={value}
                    checked={answers.esim === value}
                    onChange={() => updateAnswer("esim", value)}
                  />
                  <span className="choice-radio" />
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span>2</span>
              How many devices need internet?
            </legend>
            <div className="option-grid">
              {[
                ["one", "One phone", "Just my smartphone"],
                ["many", "Several devices", "A group, tablet, or laptop"],
              ].map(([value, title, text]) => (
                <label
                  className={answers.devices === value ? "choice is-selected" : "choice"}
                  key={value}
                >
                  <input
                    type="radio"
                    name="devices"
                    value={value}
                    checked={answers.devices === value}
                    onChange={() => updateAnswer("devices", value)}
                  />
                  <span className="choice-radio" />
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span>3</span>
              How long will you stay?
            </legend>
            <div className="option-grid option-grid--three">
              {[
                ["short", "1–14 days", "Short visit"],
                ["medium", "15–30 days", "Longer trip"],
                ["long", "Over 30 days", "Extended stay"],
              ].map(([value, title, text]) => (
                <label
                  className={answers.duration === value ? "choice is-selected" : "choice"}
                  key={value}
                >
                  <input
                    type="radio"
                    name="duration"
                    value={value}
                    checked={answers.duration === value}
                    onChange={() => updateAnswer("duration", value)}
                  />
                  <span className="choice-radio" />
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={`diagnosis-result ${result ? "is-visible" : ""}`} aria-live="polite">
            {result ? (
              <>
                <div className="result-icon" aria-hidden="true">✓</div>
                <div>
                  <p>Your likely best fit</p>
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                  <small>{result.note}</small>
                </div>
              </>
            ) : (
              <p>Choose one answer in each row to see your recommendation.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/components/home/ConnectionOptions.tsx <<'EOF'
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
EOF

cat > src/components/home/SetupSteps.tsx <<'EOF'
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    timing: "Before departure",
    title: "Install the eSIM",
    text: "Use stable Wi-Fi, scan the QR code, and label the new line “Japan.” Do not delete it after installation.",
  },
  {
    number: "02",
    timing: "After landing",
    title: "Turn on the Japan line",
    text: "Select it for mobile data. Enable data roaming if your provider instructs you to do so.",
  },
  {
    number: "03",
    timing: "Final check",
    title: "Test the connection",
    text: "Switch off airport Wi-Fi and open a webpage or Maps. If it loads, your setup is complete.",
  },
];

export default function SetupSteps() {
  return (
    <section className="section setup-section" id="setup">
      <div className="container setup-grid">
        <div>
          <SectionHeading
            eyebrow="Arrival setup"
            title="From landing to online in three steps"
            description="The exact labels vary by phone, but the basic flow is the same."
          />
          <div className="setup-note">
            <span aria-hidden="true">!</span>
            <p>
              Keep your purchase email and QR code available offline. Some QR codes
              can only be used once.
            </p>
          </div>
        </div>

        <div className="step-list">
          {steps.map((step) => (
            <article className="setup-step" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div>
                <p>{step.timing}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/components/home/Troubleshooting.tsx <<'EOF'
import SectionHeading from "@/components/ui/SectionHeading";

const fixes = [
  {
    symptom: "No signal",
    icon: "×",
    checks: [
      "Confirm the Japan line is turned on",
      "Toggle airplane mode for 10 seconds",
      "Restart the phone",
    ],
  },
  {
    symptom: "Signal, but no internet",
    icon: "↯",
    checks: [
      "Assign mobile data to the Japan line",
      "Enable data roaming if required",
      "Check the provider’s APN instructions",
    ],
  },
  {
    symptom: "Internet is very slow",
    icon: "…",
    checks: [
      "Move away from underground or crowded areas",
      "Check whether your high-speed data is exhausted",
      "Try automatic network selection",
    ],
  },
  {
    symptom: "Regular SIM is charging",
    icon: "¥",
    checks: [
      "Turn off data switching",
      "Disable roaming on your home SIM",
      "Keep mobile data assigned to the Japan line",
    ],
  },
];

export default function Troubleshooting() {
  return (
    <section className="section troubleshooting-section" id="troubleshooting">
      <div className="container">
        <SectionHeading
          eyebrow="Quick troubleshooting"
          title="Something not working?"
          description="Start with the symptom you see. Most arrival-day issues are caused by one setting."
          align="center"
        />

        <div className="fix-grid">
          {fixes.map((fix) => (
            <article className="fix-card" key={fix.symptom}>
              <span className="fix-icon" aria-hidden="true">{fix.icon}</span>
              <h3>{fix.symptom}</h3>
              <ol>
                {fix.checks.map((check, index) => (
                  <li key={check}>
                    <span>{index + 1}</span>
                    {check}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="emergency-tip">
          <strong>Still offline?</strong>
          <p>
            Connect to airport, hotel, or convenience-store Wi-Fi and open your
            provider’s setup guide. Do not delete the eSIM unless support tells you to.
          </p>
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/components/home/FaqSection.tsx <<'EOF'
import SectionHeading from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";

export default function FaqSection() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <div>
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="The details travelers ask about most"
            description="Simple answers before you spend money or change phone settings."
          />
          <div className="faq-side-card">
            <span aria-hidden="true">?</span>
            <div>
              <strong>Use this guide before buying</strong>
              <p>Compatibility and activation rules differ between providers.</p>
            </div>
          </div>
        </div>

        <div className="accordion-list">
          {faqItems.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
EOF

cat > src/app/page.tsx <<'EOF'
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import QuickDiagnosis from "@/components/home/QuickDiagnosis";
import ConnectionOptions from "@/components/home/ConnectionOptions";
import SetupSteps from "@/components/home/SetupSteps";
import Troubleshooting from "@/components/home/Troubleshooting";
import FaqSection from "@/components/home/FaqSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <QuickDiagnosis />
        <ConnectionOptions />
        <SetupSteps />
        <Troubleshooting />
        <FaqSection />

        <section className="final-cta">
          <div className="container final-cta-inner">
            <div>
              <p className="eyebrow">Start with the simplest answer</p>
              <h2>Find your best connection option before you fly.</h2>
            </div>
            <a className="button button--light" href="#diagnosis">
              Take the 30-second check
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
EOF

cat > src/app/layout.tsx <<'EOF'
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Japan Internet Guide | Japan X Trip",
    template: "%s | Japan X Trip",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Japan eSIM",
    "Japan SIM card",
    "Japan pocket Wi-Fi",
    "internet in Japan",
    "Japan travel internet",
  ],
  openGraph: {
    title: "Japan Internet Guide | Japan X Trip",
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan Internet Guide | Japan X Trip",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102c3b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOF

cat > src/app/robots.ts <<'EOF'
import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
EOF

cat > src/app/sitemap.ts <<'EOF'
import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
EOF

cat > src/app/globals.css <<'EOF'
:root {
  --ink: #102c3b;
  --ink-soft: #49626f;
  --paper: #f8faf7;
  --paper-warm: #f1f3eb;
  --white: #ffffff;
  --accent: #e44f3f;
  --accent-dark: #c93d30;
  --mint: #d9eee4;
  --mint-dark: #2f745b;
  --gold: #f2c66d;
  --line: #dce5e2;
  --shadow: 0 24px 70px rgba(16, 44, 59, 0.12);
  --shadow-small: 0 12px 32px rgba(16, 44, 59, 0.08);
  --radius-large: 32px;
  --radius-medium: 22px;
  --radius-small: 14px;
  --container: 1180px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--ink);
  background: var(--paper);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

body,
button,
input {
  font: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

img {
  max-width: 100%;
  height: auto;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2,
h3 {
  line-height: 1.12;
  letter-spacing: -0.035em;
}

h1 {
  margin-bottom: 24px;
  font-size: clamp(3rem, 7vw, 5.9rem);
  font-weight: 760;
}

h1 span {
  display: block;
  color: var(--accent);
}

h2 {
  margin-bottom: 20px;
  font-size: clamp(2.2rem, 4.2vw, 4rem);
}

h3 {
  font-size: 1.42rem;
}

.container {
  width: min(calc(100% - 40px), var(--container));
  margin-inline: auto;
}

.section {
  padding: 112px 0;
}

.eyebrow {
  margin-bottom: 14px;
  color: var(--accent);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.section-heading {
  max-width: 720px;
  margin-bottom: 48px;
}

.section-heading--center {
  margin-inline: auto;
  text-align: center;
}

.section-description {
  max-width: 640px;
  margin-bottom: 0;
  color: var(--ink-soft);
  font-size: 1.08rem;
}

.section-heading--center .section-description {
  margin-inline: auto;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.button {
  display: inline-flex;
  min-height: 54px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 24px;
  border: 0;
  border-radius: 999px;
  color: var(--white);
  background: var(--accent);
  box-shadow: 0 12px 30px rgba(228, 79, 63, 0.25);
  font-weight: 800;
  transition:
    transform 180ms ease,
    background 180ms ease,
    box-shadow 180ms ease;
}

.button:hover {
  transform: translateY(-2px);
  background: var(--accent-dark);
  box-shadow: 0 16px 34px rgba(228, 79, 63, 0.32);
}

.button--small {
  min-height: 42px;
  padding-inline: 18px;
  font-size: 0.9rem;
}

.button--light {
  color: var(--ink);
  background: var(--white);
  box-shadow: none;
}

.button--light:hover {
  color: var(--white);
  background: var(--accent);
}

.text-link {
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  border-bottom: 1px solid var(--ink);
  font-weight: 750;
}

.site-header {
  position: sticky;
  z-index: 50;
  top: 0;
  border-bottom: 1px solid rgba(220, 229, 226, 0.8);
  background: rgba(248, 250, 247, 0.9);
  backdrop-filter: blur(16px);
}

.header-inner {
  display: flex;
  min-height: 76px;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 13px;
  color: var(--white);
  background: var(--accent);
  font-family: Georgia, serif;
  font-size: 1.25rem;
  font-weight: 700;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 1rem;
  letter-spacing: -0.02em;
}

.brand small {
  color: var(--ink-soft);
  font-size: 0.7rem;
}

.primary-navigation {
  display: flex;
  align-items: center;
  gap: 26px;
  color: var(--ink-soft);
  font-size: 0.9rem;
  font-weight: 700;
}

.primary-navigation > a:not(.button):hover {
  color: var(--accent);
}

.menu-button {
  display: none;
  width: 44px;
  height: 44px;
  padding: 10px;
  border: 0;
  border-radius: 12px;
  background: var(--white);
}

.menu-button span:not(.sr-only) {
  display: block;
  height: 2px;
  margin: 5px 0;
  border-radius: 999px;
  background: var(--ink);
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 104px 0 120px;
  background:
    radial-gradient(circle at 82% 18%, rgba(217, 238, 228, 0.95), transparent 30%),
    linear-gradient(145deg, #fbfcf9 0%, #f3f7f1 100%);
}

.hero::before {
  position: absolute;
  top: 4%;
  left: -8%;
  width: 260px;
  height: 260px;
  border: 1px solid rgba(16, 44, 59, 0.07);
  border-radius: 50%;
  content: "";
}

.hero-grid {
  display: grid;
  align-items: center;
  gap: 78px;
  grid-template-columns: minmax(0, 1.06fr) minmax(380px, 0.94fr);
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-lead {
  max-width: 680px;
  margin-bottom: 34px;
  color: var(--ink-soft);
  font-size: clamp(1.05rem, 1.8vw, 1.28rem);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 26px;
}

.trust-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  padding: 0;
  margin: 34px 0 0;
  color: var(--ink-soft);
  font-size: 0.9rem;
  list-style: none;
}

.trust-list li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.trust-list span {
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  border-radius: 50%;
  color: var(--mint-dark);
  background: var(--mint);
  font-size: 0.72rem;
  font-weight: 900;
}

.hero-visual {
  position: relative;
  min-height: 560px;
}

.hero-orbit {
  position: absolute;
  border: 1px solid rgba(16, 44, 59, 0.1);
  border-radius: 50%;
}

.hero-orbit--one {
  inset: 5% -6% 5% 5%;
}

.hero-orbit--two {
  inset: 16% 7% 17% 17%;
}

.phone-card {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: min(340px, 78vw);
  padding: 18px 20px 26px;
  transform: translate(-50%, -50%) rotate(2.5deg);
  border: 8px solid var(--ink);
  border-radius: 44px;
  background: var(--white);
  box-shadow: var(--shadow);
}

.phone-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
  padding-inline: 8px;
  font-size: 0.72rem;
  font-weight: 800;
}

.signal-panel {
  position: relative;
  overflow: hidden;
  min-height: 185px;
  padding: 24px;
  border-radius: 26px;
  color: var(--white);
  background:
    linear-gradient(135deg, rgba(16, 44, 59, 0.98), rgba(47, 116, 91, 0.9));
}

.signal-panel::after {
  position: absolute;
  right: -48px;
  bottom: -75px;
  width: 180px;
  height: 180px;
  border: 28px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  content: "";
}

.signal-icon {
  display: grid;
  width: 42px;
  height: 42px;
  margin-bottom: 18px;
  place-items: center;
  border-radius: 13px;
  color: var(--ink);
  background: var(--gold);
  font-size: 1.6rem;
}

.signal-panel p {
  margin-bottom: 3px;
  opacity: 0.72;
  font-size: 0.8rem;
}

.signal-panel strong {
  font-size: 1.55rem;
}

.signal-bars {
  display: flex;
  position: absolute;
  right: 23px;
  bottom: 25px;
  align-items: flex-end;
  gap: 4px;
}

.signal-bars i {
  width: 5px;
  border-radius: 5px;
  background: var(--white);
}

.signal-bars i:nth-child(1) { height: 8px; }
.signal-bars i:nth-child(2) { height: 13px; }
.signal-bars i:nth-child(3) { height: 18px; }
.signal-bars i:nth-child(4) { height: 24px; }

.mini-step {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 5px 0;
}

.mini-step > span {
  display: grid;
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 50%;
  color: var(--mint-dark);
  background: var(--mint);
  font-size: 0.8rem;
  font-weight: 900;
}

.mini-step strong,
.mini-step small {
  display: block;
}

.mini-step strong {
  font-size: 0.86rem;
}

.mini-step small {
  color: var(--ink-soft);
  font-size: 0.72rem;
}

.floating-note {
  display: flex;
  position: absolute;
  z-index: 3;
  align-items: center;
  gap: 12px;
  padding: 14px 17px;
  border: 1px solid rgba(220, 229, 226, 0.9);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow-small);
  backdrop-filter: blur(10px);
}

.floating-note--top {
  top: 13%;
  right: -2%;
}

.floating-note--bottom {
  bottom: 12%;
  left: -3%;
}

.floating-note > span {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 11px;
  color: var(--accent-dark);
  background: #fde8e3;
  font-weight: 900;
}

.floating-note strong,
.floating-note small {
  display: block;
}

.floating-note strong {
  font-size: 0.86rem;
}

.floating-note small {
  color: var(--ink-soft);
  font-size: 0.7rem;
}

.diagnosis-section {
  background: var(--ink);
}

.diagnosis-section .section-heading h2,
.diagnosis-section .section-heading .section-description {
  color: var(--white);
}

.diagnosis-section .section-description {
  opacity: 0.72;
}

.diagnosis-card {
  max-width: 970px;
  padding: 48px;
  margin-inline: auto;
  border-radius: var(--radius-large);
  background: var(--white);
  box-shadow: var(--shadow);
}

fieldset {
  padding: 0 0 30px;
  margin: 0 0 30px;
  border: 0;
  border-bottom: 1px solid var(--line);
}

legend {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 1.08rem;
  font-weight: 850;
}

legend > span {
  display: grid;
  width: 31px;
  height: 31px;
  place-items: center;
  border-radius: 10px;
  color: var(--white);
  background: var(--ink);
  font-size: 0.8rem;
}

.option-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.option-grid--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.choice {
  display: flex;
  min-height: 82px;
  align-items: center;
  gap: 13px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 16px;
  cursor: pointer;
  transition: 160ms ease;
}

.choice:hover {
  border-color: var(--mint-dark);
  transform: translateY(-1px);
}

.choice.is-selected {
  border-color: var(--mint-dark);
  background: #f0f8f4;
  box-shadow: inset 0 0 0 1px var(--mint-dark);
}

.choice input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.choice-radio {
  display: block;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  border: 2px solid #a5b7af;
  border-radius: 50%;
}

.choice.is-selected .choice-radio {
  border: 6px solid var(--mint-dark);
}

.choice strong,
.choice small {
  display: block;
}

.choice small {
  color: var(--ink-soft);
  font-size: 0.8rem;
}

.diagnosis-result {
  display: flex;
  min-height: 84px;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 22px;
  border-radius: 18px;
  color: var(--ink-soft);
  background: var(--paper-warm);
  text-align: center;
}

.diagnosis-result.is-visible {
  justify-content: flex-start;
  color: var(--ink);
  background: var(--mint);
  text-align: left;
}

.result-icon {
  display: grid;
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 50%;
  color: var(--white);
  background: var(--mint-dark);
  font-weight: 900;
}

.diagnosis-result p,
.diagnosis-result h3 {
  margin-bottom: 4px;
}

.diagnosis-result h3 {
  color: var(--mint-dark);
  font-size: 1.55rem;
}

.diagnosis-result small {
  color: var(--ink-soft);
}

.comparison-section {
  background: var(--paper-warm);
}

.option-card-grid {
  display: grid;
  gap: 22px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.connection-card {
  position: relative;
  padding: 34px;
  border: 1px solid var(--line);
  border-radius: var(--radius-medium);
  background: var(--white);
  box-shadow: var(--shadow-small);
}

.connection-card.is-featured {
  border-color: var(--accent);
  transform: translateY(-10px);
}

.recommended-badge {
  position: absolute;
  top: -14px;
  right: 24px;
  padding: 7px 13px;
  border-radius: 999px;
  color: var(--white);
  background: var(--accent);
  font-size: 0.72rem;
  font-weight: 850;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.connection-icon {
  display: grid;
  width: 58px;
  height: 58px;
  margin-bottom: 24px;
  place-items: center;
  border-radius: 18px;
  color: var(--mint-dark);
  background: var(--mint);
  font-size: 1.04rem;
  font-weight: 900;
}

.card-kicker {
  margin-bottom: 5px;
  color: var(--accent);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
}

.connection-card h3 {
  margin-bottom: 22px;
  font-size: 1.75rem;
}

.connection-card ul {
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 0 0 28px;
  list-style: none;
}

.connection-card li {
  display: flex;
  gap: 10px;
  color: var(--ink-soft);
  font-size: 0.92rem;
}

.connection-card li span {
  color: var(--mint-dark);
  font-weight: 900;
}

.watch-box {
  padding: 16px;
  border-radius: 14px;
  background: var(--paper-warm);
}

.watch-box strong {
  font-size: 0.75rem;
  text-transform: uppercase;
}

.watch-box p {
  margin: 4px 0 0;
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.buy-checklist {
  display: grid;
  align-items: center;
  gap: 60px;
  padding: 42px 46px;
  margin-top: 54px;
  border-radius: var(--radius-medium);
  color: var(--white);
  background: var(--ink);
  grid-template-columns: 0.8fr 1.2fr;
}

.buy-checklist h3 {
  margin-bottom: 0;
  font-size: 1.8rem;
}

.buy-checklist ol {
  display: grid;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.buy-checklist li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.88rem;
}

.buy-checklist li span {
  color: var(--gold);
  font-size: 0.75rem;
  font-weight: 900;
}

.setup-section {
  background: var(--white);
}

.setup-grid {
  display: grid;
  gap: 90px;
  grid-template-columns: 0.8fr 1.2fr;
}

.setup-note {
  display: flex;
  gap: 14px;
  max-width: 470px;
  padding: 18px;
  border-radius: 16px;
  background: #fff4db;
}

.setup-note span {
  display: grid;
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  place-items: center;
  border-radius: 50%;
  color: #77530d;
  background: var(--gold);
  font-weight: 900;
}

.setup-note p {
  margin: 0;
  color: #6a571f;
  font-size: 0.88rem;
}

.step-list {
  position: relative;
}

.step-list::before {
  position: absolute;
  top: 48px;
  bottom: 48px;
  left: 31px;
  width: 1px;
  background: var(--line);
  content: "";
}

.setup-step {
  display: grid;
  position: relative;
  z-index: 2;
  gap: 24px;
  padding: 0 0 45px;
  grid-template-columns: 64px 1fr;
}

.step-number {
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  border: 7px solid var(--white);
  border-radius: 20px;
  color: var(--white);
  background: var(--ink);
  box-shadow: var(--shadow-small);
  font-size: 0.8rem;
  font-weight: 900;
}

.setup-step > div {
  padding: 8px 0 0;
}

.setup-step p:first-child {
  margin-bottom: 4px;
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 850;
  text-transform: uppercase;
}

.setup-step h3 {
  margin-bottom: 10px;
  font-size: 1.55rem;
}

.setup-step p:last-child {
  margin-bottom: 0;
  color: var(--ink-soft);
}

.troubleshooting-section {
  background: #eef4f1;
}

.fix-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.fix-card {
  padding: 28px;
  border-radius: var(--radius-medium);
  background: var(--white);
  box-shadow: var(--shadow-small);
}

.fix-icon {
  display: grid;
  width: 48px;
  height: 48px;
  margin-bottom: 22px;
  place-items: center;
  border-radius: 15px;
  color: var(--accent-dark);
  background: #fde8e3;
  font-size: 1.2rem;
  font-weight: 900;
}

.fix-card h3 {
  min-height: 51px;
  margin-bottom: 20px;
}

.fix-card ol {
  display: grid;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.fix-card li {
  display: flex;
  gap: 9px;
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.fix-card li span {
  display: grid;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  place-items: center;
  border-radius: 50%;
  color: var(--mint-dark);
  background: var(--mint);
  font-size: 0.65rem;
  font-weight: 900;
}

.emergency-tip {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px 28px;
  margin-top: 26px;
  border-left: 5px solid var(--accent);
  border-radius: 0 16px 16px 0;
  background: var(--white);
}

.emergency-tip strong {
  flex: 0 0 auto;
}

.emergency-tip p {
  margin: 0;
  color: var(--ink-soft);
}

.faq-section {
  background: var(--paper);
}

.faq-grid {
  display: grid;
  gap: 90px;
  grid-template-columns: 0.8fr 1.2fr;
}

.faq-side-card {
  display: flex;
  gap: 14px;
  padding: 18px;
  border-radius: 16px;
  background: var(--mint);
}

.faq-side-card > span {
  display: grid;
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  color: var(--white);
  background: var(--mint-dark);
  font-weight: 900;
}

.faq-side-card p {
  margin: 3px 0 0;
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.accordion-list {
  border-top: 1px solid var(--line);
}

.accordion-list details {
  border-bottom: 1px solid var(--line);
}

.accordion-list summary {
  display: flex;
  min-height: 82px;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  cursor: pointer;
  font-size: 1.04rem;
  font-weight: 800;
  list-style: none;
}

.accordion-list summary::-webkit-details-marker {
  display: none;
}

.accordion-list summary span {
  font-size: 1.5rem;
  transition: transform 180ms ease;
}

.accordion-list details[open] summary span {
  transform: rotate(45deg);
}

.accordion-list details > p {
  padding-right: 50px;
  margin: -5px 0 24px;
  color: var(--ink-soft);
}

.final-cta {
  padding: 72px 0;
  color: var(--white);
  background: var(--accent);
}

.final-cta .eyebrow {
  color: #ffd4cd;
}

.final-cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
}

.final-cta h2 {
  max-width: 780px;
  margin-bottom: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
}

.site-footer {
  padding: 76px 0 30px;
  color: rgba(255, 255, 255, 0.74);
  background: #0c2532;
}

.footer-grid {
  display: grid;
  gap: 70px;
  grid-template-columns: 1.5fr 0.7fr 1fr;
}

.brand--footer {
  color: var(--white);
}

.brand--footer small {
  color: rgba(255, 255, 255, 0.58);
}

.footer-copy {
  max-width: 430px;
  margin: 24px 0 0;
}

.site-footer h3 {
  color: var(--white);
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.site-footer ul {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.site-footer a:hover {
  color: var(--white);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  margin-top: 60px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 0.78rem;
}

.footer-bottom p {
  margin: 0;
}

@media (max-width: 1050px) {
  .primary-navigation {
    gap: 16px;
  }

  .primary-navigation > a:not(.button) {
    display: none;
  }

  .hero-grid {
    gap: 40px;
    grid-template-columns: 1fr 0.85fr;
  }

  .fix-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .fix-card h3 {
    min-height: auto;
  }
}

@media (max-width: 820px) {
  .section {
    padding: 84px 0;
  }

  .menu-button {
    display: block;
  }

  .primary-navigation {
    display: none;
    position: absolute;
    top: 68px;
    right: 20px;
    left: 20px;
    align-items: stretch;
    padding: 20px;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: var(--white);
    box-shadow: var(--shadow-small);
  }

  .primary-navigation.is-open {
    display: grid;
  }

  .primary-navigation > a:not(.button) {
    display: block;
    padding: 9px 6px;
  }

  .hero {
    padding: 72px 0 86px;
  }

  .hero-grid,
  .setup-grid,
  .faq-grid {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    min-height: 520px;
  }

  .option-card-grid {
    grid-template-columns: 1fr;
  }

  .connection-card.is-featured {
    transform: none;
  }

  .buy-checklist {
    gap: 30px;
    grid-template-columns: 1fr;
  }

  .final-cta-inner {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-grid {
    grid-template-columns: 1.3fr 0.7fr;
  }

  .footer-grid > div:last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 580px) {
  .container {
    width: min(calc(100% - 28px), var(--container));
  }

  h1 {
    font-size: clamp(2.65rem, 14vw, 4rem);
  }

  h2 {
    font-size: 2.2rem;
  }

  .header-inner {
    min-height: 68px;
  }

  .brand small {
    display: none;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .text-link {
    align-self: flex-start;
  }

  .trust-list {
    display: grid;
  }

  .hero-visual {
    min-height: 470px;
  }

  .floating-note--top {
    right: -2%;
  }

  .floating-note--bottom {
    bottom: 7%;
    left: -2%;
  }

  .floating-note {
    padding: 10px 12px;
  }

  .phone-card {
    width: 290px;
  }

  .diagnosis-card {
    padding: 26px 18px;
    border-radius: 24px;
  }

  .option-grid,
  .option-grid--three {
    grid-template-columns: 1fr;
  }

  .choice {
    min-height: 72px;
  }

  .diagnosis-result.is-visible {
    align-items: flex-start;
  }

  .connection-card,
  .fix-card {
    padding: 25px;
  }

  .buy-checklist {
    padding: 30px 24px;
  }

  .buy-checklist ol {
    grid-template-columns: 1fr;
  }

  .setup-grid,
  .faq-grid {
    gap: 46px;
  }

  .fix-grid {
    grid-template-columns: 1fr;
  }

  .emergency-tip {
    align-items: flex-start;
    flex-direction: column;
  }

  .accordion-list summary {
    font-size: 0.96rem;
  }

  .accordion-list details > p {
    padding-right: 10px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-grid > div:last-child {
    grid-column: auto;
  }

  .footer-bottom {
    gap: 10px;
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
EOF

echo ""
echo "✅ トップページ一式を生成しました"
echo "📦 バックアップ: $PROJECT_DIR/$BACKUP_DIR"
echo ""
echo "次のURLを開きます:"
echo "http://localhost:3000"
echo ""

open http://localhost:3000
open .
