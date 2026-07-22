import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import styles from "./page.module.css";

const pageUrl = `${siteConfig.url}/sim-card-vs-esim`;
export const metadata: Metadata = {
  title: "Japan SIM Card vs eSIM (2026): Which Is Better?",
  description:
    "Compare eSIM and physical SIM cards for Japan by setup, compatibility, convenience, cost, tethering, and travel style.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "article",
    url: pageUrl,
    title: "Japan SIM Card vs eSIM (2026): Which Is Better?",
    description:
      "A practical comparison of eSIM and physical SIM cards for travelers visiting Japan.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan SIM Card vs eSIM (2026): Which Is Better?",
    description:
      "Compare setup, compatibility, convenience, and travel use before choosing internet for Japan.",
  },
};

const comparisonRows = [
  {
    item: "Setup",
    esim: "Install digitally, usually by QR code or provider app.",
    sim: "Insert the card and configure it if required.",
  },
  {
    item: "Delivery",
    esim: "No physical delivery or airport collection.",
    sim: "May require shipping, hotel delivery, or airport pickup.",
  },
  {
    item: "Activation",
    esim: "Often ready shortly after installation and connection.",
    sim: "Usually activates after insertion and network connection.",
  },
  {
    item: "Compatibility",
    esim: "Requires an unlocked phone that supports eSIM.",
    sim: "Works with many unlocked phones that have the correct SIM slot.",
  },
  {
    item: "Keeping your home SIM",
    esim: "Usually stays inside the phone, making dual-SIM use easier.",
    sim: "Often requires removing and safely storing your home SIM.",
  },
  {
    item: "Price",
    esim: "Varies by provider, data allowance, validity, and network terms.",
    sim: "Also varies; delivery or pickup convenience may affect value.",
  },
  {
    item: "Coverage and speed",
    esim: "Depends on the selected plan, partner network, location, and congestion.",
    sim: "Depends on the selected plan, network, location, and congestion.",
  },
  {
    item: "Tethering",
    esim: "Available on some plans; always check the exact terms.",
    sim: "Available on some plans; always check the exact terms.",
  },
  {
    item: "Best for short trips",
    esim: "Usually the simplest option for compatible phones.",
    sim: "Useful when the phone cannot use eSIM.",
  },
  {
    item: "Best for long stays",
    esim: "Good when the plan validity and data structure fit the stay.",
    sim: "Can be useful for longer-term plans or maximum device compatibility.",
  },
];

const faqs = [
  {
    question: "Is an eSIM better than a physical SIM card for Japan?",
    answer:
      "For many short-term travelers with an unlocked eSIM-compatible phone, an eSIM is more convenient because it can be purchased and installed digitally. A physical SIM remains useful for older phones, devices without eSIM support, or travelers who prefer a traditional card.",
  },
  {
    question: "Is an eSIM cheaper than a SIM card in Japan?",
    answer:
      "Not always. Prices depend on the provider, data allowance, validity period, network arrangement, support, and any delivery or pickup costs. Compare the total plan conditions rather than choosing only by the headline price.",
  },
  {
    question: "Can I keep my normal SIM while using a Japan eSIM?",
    answer:
      "Many dual-SIM phones allow the home SIM to remain installed while the Japan eSIM handles mobile data. To avoid unexpected roaming charges, disable data roaming and automatic data switching on the home line unless you intentionally need them.",
  },
  {
    question: "Does my phone need to be unlocked?",
    answer:
      "Yes. Whether you choose an eSIM or physical travel SIM, the phone generally needs to be carrier-unlocked. It must also support the selected SIM type and the relevant network bands.",
  },
  {
    question: "Can I buy a physical SIM after arriving in Japan?",
    answer:
      "Yes. Physical travel SIMs may be available through airports, electronics stores, delivery services, or specialist providers. Stock, pickup hours, registration requirements, and setup support can vary.",
  },
  {
    question: "Does eSIM coverage differ from physical SIM coverage?",
    answer:
      "The SIM format itself does not determine coverage. Coverage and speed depend on the plan's partner network, location, buildings, terrain, congestion, device support, and any fair-use or speed-management rules.",
  },
  {
    question: "Can I use hotspot or tethering?",
    answer:
      "Some eSIM and physical SIM plans allow tethering, while others restrict it or apply separate limits. Check the exact plan conditions before buying, especially when you need to connect a laptop or several devices.",
  },
  {
    question: "What should I choose when traveling with family?",
    answer:
      "Individual eSIMs can be convenient when every traveler has a compatible phone. When several phones, tablets, or laptops need one shared connection, compare pocket Wi-Fi as well as SIM options.",
  },
];

const travelerChoices = [
  {
    title: "Solo traveler",
    choice: "Start with an eSIM",
    text: "A compatible unlocked phone and a digital plan usually provide the least complicated arrival-day setup.",
  },
  {
    title: "First-time visitor",
    choice: "Choose strong setup support",
    text: "Either format can work. Prioritize clear English instructions and support over a tiny price difference.",
  },
  {
    title: "Family or group",
    choice: "Compare eSIMs with pocket Wi-Fi",
    text: "Separate eSIMs offer independence, while pocket Wi-Fi may be simpler when several devices stay together.",
  },
  {
    title: "Business traveler",
    choice: "Use eSIM when possible",
    text: "Keeping the home SIM in place can help with messages and calls while the Japan line handles data.",
  },
  {
    title: "Older or incompatible phone",
    choice: "Use a physical SIM",
    text: "Confirm the phone is unlocked, accepts the correct SIM size, and supports the network bands used by the plan.",
  },
  {
    title: "Long stay or digital nomad",
    choice: "Compare the exact long-term terms",
    text: "Validity, renewal, high-speed data, hotspot rules, and support matter more than whether the plan is eSIM or physical.",
  },
];

const providerCards = [
  {
    name: "Sakura Mobile",
    slug: "sakura-mobile",
    label: "Japan-focused options",
    text: "A useful starting point when comparing eSIM, physical SIM, pocket Wi-Fi, and longer-stay choices.",
  },
  {
    name: "Airalo",
    slug: "airalo",
    label: "Digital eSIM",
    text: "A fully digital option for travelers who want to buy and install a Japan data plan before departure.",
  },
  {
    name: "Ubigi",
    slug: "ubigi",
    label: "eSIM alternative",
    text: "Another prepaid eSIM option to compare by current data, validity, hotspot, and activation terms.",
  },
  {
    name: "NINJA WiFi",
    slug: "ninja-wifi",
    label: "Groups and several devices",
    text: "Worth comparing when a group needs pocket Wi-Fi or multiple connectivity formats.",
  },
];

export default function SimCardVsEsimPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Japan SIM Card vs eSIM (2026): Which Is Better?",
    description:
      "A practical comparison of eSIM and physical SIM cards for travelers visiting Japan.",
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    author: {
      "@type": "Organization",
      name: "Japan X Trip",
    },
    publisher: {
      "@type": "Organization",
      name: "Japan X Trip",
    },
    datePublished: "2026-07-21",
    dateModified: "2026-07-21",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Japan X Trip",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Japan SIM Card vs eSIM",
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      <main data-build-marker="20260721-214638">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <section className={styles.hero}>
          <div className={styles.container}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>SIM Card vs eSIM</span>
            </nav>

            <p className={styles.eyebrow}>Japan internet comparison</p>
            <h1>Japan SIM Card vs eSIM</h1>
            <p className={styles.lead}>
              Which option is better for your Japan trip? Compare setup,
              compatibility, convenience, and the situations where a physical
              SIM still makes more sense.
            </p>

            <div className={styles.meta}>
              <span>Updated July 21, 2026</span>
              <span>Independent traveler guide</span>
            </div>

            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Start the 30-second check
              </Link>
              <Link className={styles.secondaryButton} href="/best-esim-japan">
                Compare Japan eSIMs
              </Link>
            </div>

          </div>

          <div className={styles.heroVisual}>
            <figure
              className={styles.heroImage}
              data-hero-image="sim-card-vs-esim"
            >
              <Image
                src="/images/article/sim-card-vs-esim/01-hero-esim-vs-sim.webp"
                alt="Japan eSIM and physical SIM card comparison"
                width={1600}
                height={900}
                priority
                sizes="(max-width: 680px) 100vw, (max-width: 1500px) 94vw, 1440px"
                className={styles.heroImageFile}
              />
            </figure>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.narrow}>
            <div className={styles.quickAnswer}>
              <p className={styles.cardLabel}>Quick answer</p>
              <h2>Most compatible-phone users should start with an eSIM.</h2>
              <p>
                An eSIM is usually easier for a short Japan trip because there
                is no card to collect, insert, or store. You can often install
                it before departure and keep your home SIM inside the phone.
              </p>
              <p>
                Choose a physical SIM when your phone does not support eSIM,
                when you prefer a traditional card, or when a physical plan
                provides the compatibility or support you need.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Side-by-side comparison</p>
              <h2>eSIM vs physical SIM for Japan</h2>
              <p>
                Neither format automatically guarantees better coverage,
                speed, or price. Those depend on the exact plan and network.
              </p>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Comparison</th>
                    <th>eSIM</th>
                    <th>Physical SIM</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.item}>
                      <th scope="row">{row.item}</th>
                      <td>{row.esim}</td>
                      <td>{row.sim}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className={styles.note}>
              Prices, data allowances, network partners, activation rules, and
              tethering policies can change. Confirm the exact plan on the
              provider&apos;s website before purchasing.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Simple decision guide</p>
              <h2>Choose eSIM when convenience matters most</h2>
            </div>

            <div className={styles.twoColumn}>
              <article className={styles.optionCard}>
                <div className={styles.optionIcon} aria-hidden="true">e</div>
                <p className={styles.cardLabel}>Choose eSIM if...</p>
                <h3>You want the lightest setup</h3>
                <ul>
                  <li>Your unlocked phone supports eSIM.</li>
                  <li>You want to install the plan before departure.</li>
                  <li>You want to keep your home SIM in the phone.</li>
                  <li>You do not want airport pickup or delivery.</li>
                  <li>You are traveling alone or using one main phone.</li>
                </ul>
              </article>

              <article className={styles.optionCard}>
                <div className={styles.optionIcon} aria-hidden="true">SIM</div>
                <p className={styles.cardLabel}>Choose a physical SIM if...</p>
                <h3>Compatibility matters most</h3>
                <ul>
                  <li>Your phone does not support eSIM.</li>
                  <li>You are comfortable replacing your home SIM.</li>
                  <li>You prefer a card you can physically insert or replace.</li>
                  <li>Your preferred provider offers better physical-SIM terms.</li>
                  <li>You want in-person pickup or assistance.</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Advantages and limitations</p>
              <h2>Pros and cons travelers should actually consider</h2>
            </div>

            <div className={styles.prosGrid}>
              <article className={styles.proConCard}>
                <h3>eSIM advantages</h3>
                <ul className={styles.checkList}>
                  <li>Digital purchase and installation</li>
                  <li>No small card to lose</li>
                  <li>Home SIM can often remain installed</li>
                  <li>Easy to compare several digital plans</li>
                </ul>
              </article>

              <article className={styles.proConCard}>
                <h3>eSIM limitations</h3>
                <ul className={styles.crossList}>
                  <li>Requires an unlocked compatible phone</li>
                  <li>QR codes and installation rules vary</li>
                  <li>Deleting an installed eSIM can cause problems</li>
                  <li>Some travelers prefer hands-on support</li>
                </ul>
              </article>

              <article className={styles.proConCard}>
                <h3>Physical SIM advantages</h3>
                <ul className={styles.checkList}>
                  <li>Works with many older unlocked phones</li>
                  <li>Familiar insert-and-use format</li>
                  <li>Pickup may include in-person guidance</li>
                  <li>Can be moved between compatible devices</li>
                </ul>
              </article>

              <article className={styles.proConCard}>
                <h3>Physical SIM limitations</h3>
                <ul className={styles.crossList}>
                  <li>May require delivery or pickup</li>
                  <li>Home SIM must be stored safely</li>
                  <li>Small cards are easy to lose or damage</li>
                  <li>Changing cards is less convenient in transit</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Match the format to your trip</p>
              <h2>Which one should you choose?</h2>
            </div>

            <div className={styles.choiceGrid}>
              {travelerChoices.map((item) => (
                <article className={styles.choiceCard} key={item.title}>
                  <p className={styles.cardLabel}>{item.title}</p>
                  <h3>{item.choice}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Before you buy</p>
              <h2>Five checks that matter more than the SIM format</h2>
            </div>

            <ol className={styles.steps}>
              <li>
                <span>1</span>
                <div>
                  <h3>Confirm that the phone is carrier-unlocked</h3>
                  <p>
                    A locked phone may reject both a travel eSIM and a physical
                    SIM from another provider.
                  </p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <h3>Check eSIM support or SIM-slot compatibility</h3>
                  <p>
                    Model names can look similar across countries while their
                    SIM capabilities differ.
                  </p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <h3>Understand when validity begins</h3>
                  <p>
                    It may begin at installation, activation, or first network
                    connection depending on the plan.
                  </p>
                </div>
              </li>
              <li>
                <span>4</span>
                <div>
                  <h3>Read hotspot and fair-use conditions</h3>
                  <p>
                    Unlimited wording may still involve daily limits, speed
                    reductions, or tethering restrictions.
                  </p>
                </div>
              </li>
              <li>
                <span>5</span>
                <div>
                  <h3>Save setup instructions offline</h3>
                  <p>
                    Keep the QR code, APN details, and support information
                    available before leaving reliable Wi-Fi.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Provider guides</p>
              <h2>Useful places to start comparing</h2>
              <p>
                These are starting points, not permanent rankings. Check the
                current plan that matches your device and trip.
              </p>
            </div>

            <div className={styles.providerGrid}>
              {providerCards.map((provider) => (
                <article className={styles.providerCard} key={provider.slug}>
                  <p className={styles.cardLabel}>{provider.label}</p>
                  <h3>{provider.name}</h3>
                  <p>{provider.text}</p>
                  <Link href={`/reviews/${provider.slug}`}>
                    Read review <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>

            <div className={styles.relatedLinks}>
              <h3>Continue comparing</h3>
              <div>
                <Link href="/best-esim-japan">Best eSIM for Japan</Link>
                <Link href="/reviews/japan-wireless">
                  Japan Wireless review
                </Link>
                <Link href="/how-we-review-providers">
                  How we review providers
                </Link>
                <Link href="/affiliate-disclosure">
                  Affiliate disclosure
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.narrow}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Frequently asked questions</p>
              <h2>Japan SIM card vs eSIM FAQ</h2>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details className={styles.faqItem} key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.narrow}>
            <p className={styles.eyebrow}>Still unsure?</p>
            <h2>Find the best connection option in about 30 seconds.</h2>
            <p>
              Answer five simple questions about your phone, trip length,
              devices, and priorities.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/diagnosis">
                Start the 30-second check
              </Link>
              <Link className={styles.secondaryButton} href="/best-esim-japan">
                Read the eSIM comparison
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
