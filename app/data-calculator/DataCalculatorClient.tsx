"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type UsageLevel = "none" | "light" | "regular" | "heavy";

type UsageDefinition = {
  label: string;
  description: string;
  dailyMb: number;
};

type UsageCategory = {
  id: string;
  title: string;
  helper: string;
  icon: string;
  levels: Record<UsageLevel, UsageDefinition>;
};

const levelOrder: UsageLevel[] = ["none", "light", "regular", "heavy"];

const categories: UsageCategory[] = [
  {
    id: "maps",
    title: "Maps and navigation",
    helper: "Google Maps, train routes, restaurant searches, and directions.",
    icon: "MAP",
    levels: {
      none: {
        label: "Almost none",
        description: "Mostly using downloaded or offline maps",
        dailyMb: 10,
      },
      light: {
        label: "Light",
        description: "A few directions and searches each day",
        dailyMb: 40,
      },
      regular: {
        label: "Regular",
        description: "Navigation throughout the day",
        dailyMb: 100,
      },
      heavy: {
        label: "Heavy",
        description: "Frequent navigation and location searches",
        dailyMb: 200,
      },
    },
  },
  {
    id: "messages",
    title: "Messages and email",
    helper: "LINE, WhatsApp, Messenger, email, and ordinary web browsing.",
    icon: "MSG",
    levels: {
      none: {
        label: "Almost none",
        description: "Emergency use only",
        dailyMb: 10,
      },
      light: {
        label: "Light",
        description: "Messages and occasional email",
        dailyMb: 50,
      },
      regular: {
        label: "Regular",
        description: "Frequent messaging and browsing",
        dailyMb: 150,
      },
      heavy: {
        label: "Heavy",
        description: "Constant messaging, browsing, and attachments",
        dailyMb: 350,
      },
    },
  },
  {
    id: "social",
    title: "Social media",
    helper: "Instagram, TikTok, X, Facebook, Threads, and photo uploads.",
    icon: "SNS",
    levels: {
      none: {
        label: "Almost none",
        description: "No regular social-media use",
        dailyMb: 0,
      },
      light: {
        label: "Light",
        description: "Brief checks and a few photo uploads",
        dailyMb: 150,
      },
      regular: {
        label: "Regular",
        description: "Browsing feeds and posting daily",
        dailyMb: 500,
      },
      heavy: {
        label: "Heavy",
        description: "Frequent reels, videos, stories, and uploads",
        dailyMb: 1200,
      },
    },
  },
  {
    id: "video",
    title: "Streaming video",
    helper: "YouTube, Netflix, live streams, and entertainment video.",
    icon: "VID",
    levels: {
      none: {
        label: "None",
        description: "No mobile-data streaming",
        dailyMb: 0,
      },
      light: {
        label: "Light",
        description: "Around 15 minutes per day",
        dailyMb: 250,
      },
      regular: {
        label: "Regular",
        description: "Around 45 minutes per day",
        dailyMb: 900,
      },
      heavy: {
        label: "Heavy",
        description: "90 minutes or more per day",
        dailyMb: 2200,
      },
    },
  },
  {
    id: "calls",
    title: "Video calls",
    helper: "FaceTime, Zoom, Google Meet, Teams, and WhatsApp calls.",
    icon: "CALL",
    levels: {
      none: {
        label: "None",
        description: "No video calls using mobile data",
        dailyMb: 0,
      },
      light: {
        label: "Light",
        description: "A short call every few days",
        dailyMb: 100,
      },
      regular: {
        label: "Regular",
        description: "Around 20–30 minutes per day",
        dailyMb: 450,
      },
      heavy: {
        label: "Heavy",
        description: "One hour or more per day",
        dailyMb: 1200,
      },
    },
  },
  {
    id: "hotspot",
    title: "Laptop and hotspot use",
    helper: "Tethering, remote work, cloud documents, and laptop browsing.",
    icon: "PC",
    levels: {
      none: {
        label: "None",
        description: "Phone use only",
        dailyMb: 0,
      },
      light: {
        label: "Light",
        description: "Occasional laptop browsing",
        dailyMb: 250,
      },
      regular: {
        label: "Regular",
        description: "Daily laptop use and cloud documents",
        dailyMb: 900,
      },
      heavy: {
        label: "Heavy",
        description: "Remote work, large files, and meetings",
        dailyMb: 2500,
      },
    },
  },
];

const defaultSelections: Record<string, UsageLevel> = {
  maps: "regular",
  messages: "regular",
  social: "regular",
  video: "light",
  calls: "none",
  hotspot: "none",
};

function getPlanRecommendation(totalGb: number) {
  if (totalGb <= 2.2) {
    return {
      plan: "3GB",
      label: "Light-use plan",
      summary:
        "A 3GB plan should cover basic navigation, messages, email, and light browsing.",
      tone: "light",
    };
  }

  if (totalGb <= 4.2) {
    return {
      plan: "5GB",
      label: "Basic travel plan",
      summary:
        "A 5GB plan provides a practical buffer for maps, messaging, browsing, and some social media.",
      tone: "basic",
    };
  }

  if (totalGb <= 8.5) {
    return {
      plan: "10GB",
      label: "Balanced travel plan",
      summary:
        "A 10GB plan is a comfortable choice for regular travel use without extensive streaming.",
      tone: "balanced",
    };
  }

  if (totalGb <= 17) {
    return {
      plan: "20GB",
      label: "Heavy travel plan",
      summary:
        "A 20GB plan is better for frequent social media, video, uploads, or longer trips.",
      tone: "heavy",
    };
  }

  if (totalGb <= 42) {
    return {
      plan: "50GB",
      label: "Very heavy-use plan",
      summary:
        "A high-capacity plan is recommended for streaming, remote work, or extensive hotspot use.",
      tone: "veryHeavy",
    };
  }

  return {
    plan: "Unlimited",
    label: "Maximum-data plan",
    summary:
      "Your estimated usage is high enough that an unlimited or very high-capacity plan is the safest choice.",
    tone: "unlimited",
  };
}

function formatGb(value: number) {
  if (value < 0.1) {
    return "<0.1";
  }

  return value.toFixed(1);
}

export default function DataCalculatorClient() {
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(1);
  const [sharedConnection, setSharedConnection] = useState(false);
  const [hotelWifi, setHotelWifi] = useState(true);
  const [selections, setSelections] =
    useState<Record<string, UsageLevel>>(defaultSelections);

  const calculation = useMemo(() => {
    const dailyMbPerPerson = categories.reduce((total, category) => {
      const selectedLevel = selections[category.id] ?? "none";
      return total + category.levels[selectedLevel].dailyMb;
    }, 0);

    const travelerMultiplier = sharedConnection ? travelers : 1;
    const wifiMultiplier = hotelWifi ? 0.82 : 1;
    const rawMb =
      dailyMbPerPerson * days * travelerMultiplier * wifiMultiplier;

    const rawGb = rawMb / 1000;
    const safetyMargin = rawGb * 0.25;
    const recommendedGb = rawGb + safetyMargin;
    const recommendation = getPlanRecommendation(recommendedGb);

    const categoryBreakdown = categories
      .map((category) => {
        const selectedLevel = selections[category.id] ?? "none";
        const dailyMb = category.levels[selectedLevel].dailyMb;
        const totalMb =
          dailyMb * days * travelerMultiplier * wifiMultiplier;

        return {
          id: category.id,
          title: category.title,
          level: category.levels[selectedLevel].label,
          totalGb: totalMb / 1000,
        };
      })
      .sort((a, b) => b.totalGb - a.totalGb);

    return {
      dailyMbPerPerson,
      rawGb,
      safetyMargin,
      recommendedGb,
      recommendation,
      categoryBreakdown,
    };
  }, [days, travelers, sharedConnection, hotelWifi, selections]);

  function updateSelection(categoryId: string, level: UsageLevel) {
    setSelections((current) => ({
      ...current,
      [categoryId]: level,
    }));
  }

  function resetCalculator() {
    setDays(7);
    setTravelers(1);
    setSharedConnection(false);
    setHotelWifi(true);
    setSelections(defaultSelections);
  }

  return (
    <section className={styles.calculatorSection} id="data-calculator">
      <div className={styles.calculatorContainer}>
        <div className={styles.calculatorGrid}>
          <div className={styles.controlsCard}>
            <div className={styles.cardHeading}>
              <p>Trip details</p>
              <h2>Build your estimate</h2>
            </div>

            <div className={styles.numberControls}>
              <label className={styles.numberControl}>
                <span>Trip length</span>

                <div>
                  <button
                    aria-label="Reduce trip length"
                    disabled={days <= 1}
                    onClick={() => setDays((value) => Math.max(1, value - 1))}
                    type="button"
                  >
                    −
                  </button>

                  <strong>
                    {days}
                    <small>{days === 1 ? " day" : " days"}</small>
                  </strong>

                  <button
                    aria-label="Increase trip length"
                    disabled={days >= 90}
                    onClick={() => setDays((value) => Math.min(90, value + 1))}
                    type="button"
                  >
                    +
                  </button>
                </div>
              </label>

              <label className={styles.numberControl}>
                <span>Travelers using the data</span>

                <div>
                  <button
                    aria-label="Reduce travelers"
                    disabled={travelers <= 1}
                    onClick={() =>
                      setTravelers((value) => Math.max(1, value - 1))
                    }
                    type="button"
                  >
                    −
                  </button>

                  <strong>
                    {travelers}
                    <small>{travelers === 1 ? " person" : " people"}</small>
                  </strong>

                  <button
                    aria-label="Increase travelers"
                    disabled={travelers >= 12}
                    onClick={() =>
                      setTravelers((value) => Math.min(12, value + 1))
                    }
                    type="button"
                  >
                    +
                  </button>
                </div>
              </label>
            </div>

            <div className={styles.toggleGroup}>
              <button
                aria-pressed={sharedConnection}
                className={sharedConnection ? styles.toggleActive : ""}
                onClick={() => setSharedConnection((value) => !value)}
                type="button"
              >
                <span className={styles.toggleSwitch}>
                  <span />
                </span>

                <span>
                  <strong>Shared plan or pocket Wi-Fi</strong>
                  <small>
                    Include the usage of all {travelers} traveler
                    {travelers === 1 ? "" : "s"}.
                  </small>
                </span>
              </button>

              <button
                aria-pressed={hotelWifi}
                className={hotelWifi ? styles.toggleActive : ""}
                onClick={() => setHotelWifi((value) => !value)}
                type="button"
              >
                <span className={styles.toggleSwitch}>
                  <span />
                </span>

                <span>
                  <strong>Hotel Wi-Fi available</strong>
                  <small>
                    Reduce mobile use for updates, backups, and evening video.
                  </small>
                </span>
              </button>
            </div>

            <div className={styles.usageHeading}>
              <div>
                <p>Daily usage</p>
                <h3>Choose your normal level</h3>
              </div>

              <span>Per person</span>
            </div>

            <div className={styles.usageList}>
              {categories.map((category) => (
                <article className={styles.usageCard} key={category.id}>
                  <div className={styles.usageTitle}>
                    <span>{category.icon}</span>

                    <div>
                      <h4>{category.title}</h4>
                      <p>{category.helper}</p>
                    </div>
                  </div>

                  <div className={styles.levelButtons}>
                    {levelOrder.map((level) => {
                      const definition = category.levels[level];
                      const selected = selections[category.id] === level;

                      return (
                        <button
                          aria-pressed={selected}
                          className={selected ? styles.levelSelected : ""}
                          key={level}
                          onClick={() => updateSelection(category.id, level)}
                          title={definition.description}
                          type="button"
                        >
                          {definition.label}
                        </button>
                      );
                    })}
                  </div>

                  <p className={styles.selectedDescription}>
                    {
                      category.levels[selections[category.id] ?? "none"]
                        .description
                    }
                  </p>
                </article>
              ))}
            </div>

            <button
              className={styles.resetButton}
              onClick={resetCalculator}
              type="button"
            >
              Reset calculator
            </button>
          </div>

          <aside className={styles.resultCard}>
            <div className={styles.stickyResult}>
              <p className={styles.resultEyebrow}>Recommended plan size</p>

              <div className={styles.planCircle}>
                <span>Choose around</span>
                <strong>{calculation.recommendation.plan}</strong>
              </div>

              <h2>{calculation.recommendation.label}</h2>
              <p className={styles.resultSummary}>
                {calculation.recommendation.summary}
              </p>

              <div className={styles.estimateBox}>
                <div>
                  <span>Estimated use</span>
                  <strong>{formatGb(calculation.rawGb)} GB</strong>
                </div>

                <div>
                  <span>Safety margin</span>
                  <strong>{formatGb(calculation.safetyMargin)} GB</strong>
                </div>

                <div>
                  <span>Recommended minimum</span>
                  <strong>
                    {formatGb(calculation.recommendedGb)} GB
                  </strong>
                </div>
              </div>

              <div className={styles.breakdown}>
                <h3>Estimated usage breakdown</h3>

                {calculation.categoryBreakdown.map((item) => {
                  const largest =
                    calculation.categoryBreakdown[0]?.totalGb || 1;
                  const width =
                    largest > 0
                      ? Math.max(3, (item.totalGb / largest) * 100)
                      : 3;

                  return (
                    <div className={styles.breakdownRow} key={item.id}>
                      <div>
                        <span>{item.title}</span>
                        <strong>{formatGb(item.totalGb)} GB</strong>
                      </div>

                      <div className={styles.breakdownTrack}>
                        <span style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.recommendationNote}>
                <strong>
                  {sharedConnection
                    ? `This estimate covers ${travelers} travelers sharing one connection.`
                    : travelers > 1
                      ? `This estimate is for one person. Multiply or calculate separately for all ${travelers} travelers.`
                      : "This estimate covers one traveler."}
                </strong>

                <p>
                  {hotelWifi
                    ? "Hotel Wi-Fi availability has reduced the mobile-data estimate."
                    : "The estimate assumes mobile data may also be used at your accommodation."}
                </p>
              </div>

              <div className={styles.resultActions}>
                <Link href="/diagnosis">
                  Find the right connection type
                </Link>

                <Link href="/compare">
                  Compare internet options
                </Link>
              </div>

              <p className={styles.resultDisclaimer}>
                “Unlimited” plans may still apply speed restrictions or
                fair-use policies.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
