"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

type Method = "esim" | "sim" | "wifi" | "roaming" | "hybrid";

type AnswerOption = {
  label: string;
  description?: string;
  scores: Partial<Record<Method, number>>;
  flags?: string[];
};

type Question = {
  id: string;
  title: string;
  helper: string;
  options: AnswerOption[];
};

type ResultDefinition = {
  name: string;
  shortName: string;
  badge: string;
  summary: string;
  reasons: string[];
  cautions: string[];
  backup: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

const methodOrder: Method[] = ["esim", "wifi", "sim", "hybrid", "roaming"];

const questions: Question[] = [
  {
    id: "esim",
    title: "Does your phone support eSIM?",
    helper:
      "Check your phone settings or manufacturer specifications when unsure.",
    options: [
      {
        label: "Yes",
        description: "My phone supports eSIM.",
        scores: { esim: 5, hybrid: 3, roaming: 1 },
        flags: ["esimSupported"],
      },
      {
        label: "No",
        description: "My phone does not support eSIM.",
        scores: { sim: 5, wifi: 4, roaming: 1 },
        flags: ["noEsim"],
      },
      {
        label: "I’m not sure",
        description: "I need to confirm compatibility.",
        scores: { wifi: 3, sim: 2, esim: 1, hybrid: 1 },
        flags: ["unknownEsim"],
      },
    ],
  },
  {
    id: "unlocked",
    title: "Is your phone unlocked?",
    helper:
      "A carrier-locked phone may reject travel eSIMs and physical SIM cards.",
    options: [
      {
        label: "Yes",
        description: "It can use SIMs from other providers.",
        scores: { esim: 4, sim: 4, hybrid: 2 },
        flags: ["unlocked"],
      },
      {
        label: "No",
        description: "My carrier restricts other SIMs.",
        scores: { wifi: 6, roaming: 4 },
        flags: ["locked"],
      },
      {
        label: "I’m not sure",
        description: "I have not checked.",
        scores: { wifi: 3, roaming: 2, esim: 1, sim: 1 },
        flags: ["unknownLock"],
      },
    ],
  },
  {
    id: "travelers",
    title: "How many people need internet?",
    helper:
      "Count the people who need regular access while moving around Japan.",
    options: [
      {
        label: "1 person",
        scores: { esim: 5, sim: 4, roaming: 2 },
        flags: ["solo"],
      },
      {
        label: "2 people",
        scores: { esim: 3, wifi: 4, hybrid: 3, sim: 2 },
        flags: ["couple"],
      },
      {
        label: "3–4 people",
        scores: { wifi: 6, hybrid: 4, esim: 1 },
        flags: ["group"],
      },
      {
        label: "5 or more",
        scores: { wifi: 7, hybrid: 5 },
        flags: ["largeGroup"],
      },
    ],
  },
  {
    id: "devices",
    title: "How many devices need a connection?",
    helper:
      "Include phones, tablets, laptops, game consoles, and work devices.",
    options: [
      {
        label: "1 device",
        scores: { esim: 5, sim: 4, roaming: 2 },
      },
      {
        label: "2 devices",
        scores: { esim: 3, wifi: 3, hybrid: 3, sim: 2 },
      },
      {
        label: "3–5 devices",
        scores: { wifi: 6, hybrid: 4 },
        flags: ["manyDevices"],
      },
      {
        label: "6 or more",
        scores: { wifi: 7, hybrid: 5 },
        flags: ["manyDevices"],
      },
    ],
  },
  {
    id: "duration",
    title: "How long will you stay in Japan?",
    helper:
      "Longer stays make price, data allowance, and recharging more important.",
    options: [
      {
        label: "1–3 days",
        scores: { roaming: 4, esim: 4, sim: 1, wifi: 1 },
        flags: ["shortTrip"],
      },
      {
        label: "4–7 days",
        scores: { esim: 5, sim: 3, wifi: 3 },
      },
      {
        label: "8–14 days",
        scores: { esim: 5, wifi: 4, sim: 4, hybrid: 2 },
      },
      {
        label: "15 days or longer",
        scores: { sim: 5, wifi: 5, esim: 4, hybrid: 3 },
        flags: ["longTrip"],
      },
    ],
  },
  {
    id: "usage",
    title: "How will you use mobile data?",
    helper:
      "Choose the option closest to your normal travel behavior.",
    options: [
      {
        label: "Light",
        description: "Maps, messages, email, and occasional browsing.",
        scores: { esim: 4, sim: 3, roaming: 3 },
        flags: ["lightUse"],
      },
      {
        label: "Regular",
        description: "Maps, social media, photos, and daily browsing.",
        scores: { esim: 5, sim: 4, wifi: 3 },
      },
      {
        label: "Heavy",
        description: "Video, frequent uploads, calls, or streaming.",
        scores: { wifi: 6, hybrid: 4, esim: 3 },
        flags: ["heavyUse"],
      },
      {
        label: "Remote work",
        description: "Laptop use, video meetings, and tethering.",
        scores: { wifi: 6, hybrid: 6, esim: 2 },
        flags: ["remoteWork"],
      },
    ],
  },
  {
    id: "separation",
    title: "Will your group separate during the day?",
    helper:
      "A shared router stays with one person unless the group remains together.",
    options: [
      {
        label: "I’m traveling alone",
        scores: { esim: 4, sim: 3 },
      },
      {
        label: "We will usually stay together",
        scores: { wifi: 6, hybrid: 2 },
        flags: ["stayTogether"],
      },
      {
        label: "We may separate sometimes",
        scores: { hybrid: 5, esim: 3, sim: 2, wifi: 1 },
        flags: ["sometimesSeparate"],
      },
      {
        label: "We will often travel separately",
        scores: { esim: 5, sim: 4, hybrid: 5 },
        flags: ["separateOften"],
      },
    ],
  },
  {
    id: "priority",
    title: "What matters most to you?",
    helper:
      "Your preference helps decide between convenience, price, and flexibility.",
    options: [
      {
        label: "The easiest setup",
        scores: { roaming: 5, esim: 4, wifi: 2 },
        flags: ["easyPriority"],
      },
      {
        label: "A low total price",
        scores: { esim: 5, sim: 4, wifi: 2 },
        flags: ["pricePriority"],
      },
      {
        label: "Connecting many devices",
        scores: { wifi: 7, hybrid: 4 },
        flags: ["devicePriority"],
      },
      {
        label: "A reliable backup",
        scores: { hybrid: 7, esim: 2, wifi: 2 },
        flags: ["backupPriority"],
      },
    ],
  },
];

const results: Record<Method, ResultDefinition> = {
  esim: {
    name: "Travel eSIM",
    shortName: "eSIM",
    badge: "Best overall fit",
    summary:
      "A travel eSIM is likely the most convenient match for your trip. It avoids airport pickup and keeps your physical SIM slot available.",
    reasons: [
      "Works well for one traveler or independently connected travelers",
      "Can be installed before departure",
      "Does not require carrying or returning a router",
      "Often provides a strong balance of price and convenience",
    ],
    cautions: [
      "Confirm that the exact phone model supports eSIM",
      "Confirm that the phone is carrier-unlocked",
      "Follow activation instructions to avoid starting the plan too early",
      "Check whether tethering is permitted",
    ],
    backup:
      "Keep airport Wi-Fi or your home carrier’s roaming available until the eSIM connection has been tested.",
    primaryHref: "/esim",
    primaryLabel: "Read the Japan eSIM guide",
    secondaryHref: "/best-esim-japan",
    secondaryLabel: "Compare eSIM options",
  },
  sim: {
    name: "Physical SIM card",
    shortName: "Physical SIM",
    badge: "Best compatible choice",
    summary:
      "A physical travel SIM is likely the better fit when your unlocked phone does not support eSIM or you prefer a removable SIM.",
    reasons: [
      "Suitable for many unlocked phones without eSIM support",
      "Does not require carrying a separate router",
      "Can provide a dedicated mobile-data connection",
      "May suit longer stays and travelers comfortable changing SIMs",
    ],
    cautions: [
      "Confirm that the phone is unlocked",
      "Check the required SIM size and APN instructions",
      "Store your home SIM safely",
      "Confirm pickup or delivery arrangements before arrival",
    ],
    backup:
      "Save setup instructions offline and keep airport Wi-Fi available until the SIM is working.",
    primaryHref: "/sim-card",
    primaryLabel: "Read the Japan SIM card guide",
    secondaryHref: "/airport",
    secondaryLabel: "Check airport pickup planning",
  },
  wifi: {
    name: "Pocket Wi-Fi",
    shortName: "Pocket Wi-Fi",
    badge: "Best for shared access",
    summary:
      "Pocket Wi-Fi is likely the strongest match because several people or devices need to connect together, or your phone may not accept a travel SIM.",
    reasons: [
      "One router can connect several phones, tablets, and laptops",
      "Useful when group members usually stay together",
      "Avoids changing phone SIM settings",
      "Can work with locked phones through Wi-Fi",
    ],
    cautions: [
      "The group loses access when separated from the router",
      "The router must be charged and carried",
      "Pickup and return instructions must be followed",
      "Connected-device limits and fair-use policies may apply",
    ],
    backup:
      "For groups that sometimes separate, add one low-cost eSIM or roaming connection for emergencies.",
    primaryHref: "/pocket-wifi",
    primaryLabel: "Read the pocket Wi-Fi guide",
    secondaryHref: "/airport",
    secondaryLabel: "Plan airport pickup and return",
  },
  roaming: {
    name: "International roaming",
    shortName: "Roaming",
    badge: "Best for maximum simplicity",
    summary:
      "Your home carrier’s roaming option may be sufficient for a very short or light-use trip when simplicity matters more than the lowest price.",
    reasons: [
      "No SIM replacement or router pickup",
      "Your normal number and phone setup remain available",
      "Useful for short stays and light data use",
      "Can serve as an immediate arrival backup",
    ],
    cautions: [
      "Daily or per-gigabyte charges may be expensive",
      "High-speed data limits may be restrictive",
      "Coverage depends on your carrier’s Japanese partner network",
      "Confirm charges before enabling data roaming",
    ],
    backup:
      "Compare the full roaming cost with a small eSIM plan before departure.",
    primaryHref: "/compare",
    primaryLabel: "Compare all Japan internet methods",
    secondaryHref: "/esim",
    secondaryLabel: "Compare with a travel eSIM",
  },
  hybrid: {
    name: "Combined setup",
    shortName: "Hybrid setup",
    badge: "Best for flexibility and backup",
    summary:
      "A combined setup is likely best: use pocket Wi-Fi or one main data plan for heavy use, plus an independent eSIM, SIM, or roaming connection as backup.",
    reasons: [
      "Supports groups that sometimes separate",
      "Provides backup if one connection fails",
      "Can separate work data from personal mobile access",
      "Reduces dependence on a single router or phone",
    ],
    cautions: [
      "The total price can be higher",
      "Each connection has separate activation and usage rules",
      "Avoid paying for more data than the group needs",
      "Decide who carries and returns shared equipment",
    ],
    backup:
      "Keep the secondary connection small and inexpensive unless both connections will be used heavily.",
    primaryHref: "/compare",
    primaryLabel: "Build your combined setup",
    secondaryHref: "/pocket-wifi",
    secondaryLabel: "Review pocket Wi-Fi first",
  },
};

function getAlternative(primary: Method, scores: Record<Method, number>): Method {
  return methodOrder
    .filter((method) => method !== primary)
    .sort((a, b) => scores[b] - scores[a])[0];
}

export default function DiagnosisClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const progress = showResult
    ? 100
    : Math.round((currentStep / questions.length) * 100);

  const analysis = useMemo(() => {
    const scores: Record<Method, number> = {
      esim: 0,
      sim: 0,
      wifi: 0,
      roaming: 0,
      hybrid: 0,
    };

    const flags = new Set<string>();

    answers.forEach((answerIndex, questionIndex) => {
      const option = questions[questionIndex]?.options[answerIndex];

      if (!option) {
        return;
      }

      Object.entries(option.scores).forEach(([method, score]) => {
        scores[method as Method] += score ?? 0;
      });

      option.flags?.forEach((flag) => flags.add(flag));
    });

    if (flags.has("locked")) {
      scores.esim = Math.max(0, scores.esim - 10);
      scores.sim = Math.max(0, scores.sim - 10);
      scores.wifi += 4;
      scores.roaming += 3;
    }

    if (flags.has("noEsim")) {
      scores.esim = Math.max(0, scores.esim - 12);
    }

    if (
      flags.has("largeGroup") ||
      flags.has("manyDevices") ||
      flags.has("devicePriority")
    ) {
      scores.wifi += 3;
    }

    if (
      flags.has("separateOften") ||
      flags.has("sometimesSeparate") ||
      flags.has("backupPriority") ||
      flags.has("remoteWork")
    ) {
      scores.hybrid += 3;
    }

    if (
      flags.has("shortTrip") &&
      flags.has("lightUse") &&
      flags.has("easyPriority")
    ) {
      scores.roaming += 5;
    }

    let primary = methodOrder
      .slice()
      .sort((a, b) => scores[b] - scores[a])[0];

    if (primary === "wifi" && flags.has("separateOften")) {
      primary = "hybrid";
    }

    if (
      primary === "esim" &&
      (flags.has("noEsim") || flags.has("locked"))
    ) {
      primary = scores.wifi >= scores.sim ? "wifi" : "sim";
    }

    const alternative = getAlternative(primary, scores);

    return {
      scores,
      flags,
      primary,
      alternative,
    };
  }, [answers]);

  function selectAnswer(optionIndex: number) {
    const nextAnswers = answers.slice(0, currentStep);
    nextAnswers[currentStep] = optionIndex;
    setAnswers(nextAnswers);

    if (currentStep === questions.length - 1) {
      setShowResult(true);
      return;
    }

    setCurrentStep((step) => step + 1);
  }

  function goBack() {
    if (showResult) {
      setShowResult(false);
      setCurrentStep(questions.length - 1);
      return;
    }

    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  }

  function restart() {
    setAnswers([]);
    setCurrentStep(0);
    setShowResult(false);

    window.setTimeout(() => {
      document
        .getElementById("internet-finder")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  const result = results[analysis.primary];
  const alternative = results[analysis.alternative];

  const tripProfile = answers
    .map((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const option = question?.options[answerIndex];

      if (!question || !option) {
        return null;
      }

      return {
        label: question.title,
        value: option.label,
      };
    })
    .filter((item): item is { label: string; value: string } => item !== null);

  const rankedMethods = methodOrder
    .map((method) => ({ method, score: analysis.scores[method] }))
    .sort((a, b) => b.score - a.score);

  const scoreGap = Math.max(0, rankedMethods[0].score - rankedMethods[1].score);
  const confidenceLabel =
    scoreGap >= 8 ? "Strong match" : scoreGap >= 4 ? "Good match" : "Close match";

  return (
    <section className={styles.finderSection} id="internet-finder">
      <div className={styles.finderContainer}>
        <div className={styles.progressHeader}>
          <div>
            <p>
              {showResult
                ? "Your recommendation"
                : `Question ${currentStep + 1} of ${questions.length}`}
            </p>

            <span>{progress}% complete</span>
          </div>

          <div
            aria-label={`${progress}% complete`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress}
            className={styles.progressTrack}
            role="progressbar"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        {!showResult ? (
          <div className={styles.questionCard}>
            <div className={styles.questionHeading}>
              <span>{String(currentStep + 1).padStart(2, "0")}</span>

              <div>
                <h2>{questions[currentStep].title}</h2>
                <p>{questions[currentStep].helper}</p>
              </div>
            </div>

            <div className={styles.answerGrid}>
              {questions[currentStep].options.map((option, optionIndex) => {
                const isSelected = answers[currentStep] === optionIndex;

                return (
                  <button
                    className={`${styles.answerButton} ${
                      isSelected ? styles.answerSelected : ""
                    }`}
                    key={option.label}
                    onClick={() => selectAnswer(optionIndex)}
                    type="button"
                  >
                    <span className={styles.answerRadio}>
                      {isSelected ? "✓" : ""}
                    </span>

                    <span>
                      <strong>{option.label}</strong>

                      {option.description ? (
                        <small>{option.description}</small>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className={styles.questionFooter}>
              <button
                className={styles.backButton}
                disabled={currentStep === 0}
                onClick={goBack}
                type="button"
              >
                ← Previous question
              </button>

              <p>Your answers remain on this device only during this visit.</p>
            </div>
          </div>
        ) : (
          <div className={styles.resultCard}>
            <div className={styles.resultTop}>
              <div>
                <p className={styles.resultBadge}>{result.badge}</p>
                <span>Your recommended option</span>
                <h2>{result.name}</h2>
                <p className={styles.resultSummary}>{result.summary}</p>
              </div>

              <div className={styles.resultMark}>
                <span>Recommended</span>
                <strong>{result.shortName}</strong>
              </div>
            </div>

            <div className={styles.matchSummary}>
              <div>
                <span>Recommendation confidence</span>
                <strong>{confidenceLabel}</strong>
              </div>

              <p>
                We compared eSIM, physical SIM, pocket Wi-Fi, roaming, and a
                combined setup using all {questions.length} of your answers.
              </p>
            </div>

            <div className={styles.tripProfile}>
              <div className={styles.tripProfileHeading}>
                <span>Your trip profile</span>
                <small>Based on the answers you selected</small>
              </div>

              <div className={styles.tripProfileGrid}>
                {tripProfile.map((item) => (
                  <div className={styles.tripProfileItem} key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.resultColumns}>
              <article className={styles.resultPanel}>
                <h3>Why it fits your trip</h3>

                <ul className={styles.positiveList}>
                  {result.reasons.map((reason) => (
                    <li key={reason}>
                      <span>✓</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.resultPanel}>
                <h3>Check before purchasing</h3>

                <ul className={styles.cautionList}>
                  {result.cautions.map((caution) => (
                    <li key={caution}>
                      <span>!</span>
                      {caution}
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <div className={styles.backupBox}>
              <div>
                <p>Suggested backup plan</p>
                <strong>{result.backup}</strong>
              </div>
            </div>

            <div className={styles.alternativeBox}>
              <div>
                <span>Second-best match</span>
                <h3>{alternative.name}</h3>
                <p>{alternative.summary}</p>
              </div>

              <Link href={alternative.primaryHref}>
                Review this alternative →
              </Link>
            </div>

            <div className={styles.resultActions}>
              <Link
                className={styles.resultPrimaryButton}
                href={result.primaryHref}
              >
                {result.primaryLabel} →
              </Link>

              <Link
                className={styles.resultSecondaryButton}
                href={result.secondaryHref}
              >
                {result.secondaryLabel}
              </Link>
            </div>

            <div className={styles.resultFooter}>
              <button onClick={goBack} type="button">
                ← Change the last answer
              </button>

              <button onClick={restart} type="button">
                Start again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
