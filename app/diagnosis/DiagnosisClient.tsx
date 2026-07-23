"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { connectivityProviders } from "@/data/connectivityProviders";
import styles from "./page.module.css";

type Method = "esim" | "sim" | "wifi" | "check";

type AnswerOption = {
  label: string;
  description?: string;
  scores: Partial<Record<Exclude<Method, "check">, number>>;
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
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

const questions: Question[] = [
  {
    id: "esim",
    title: "Does your phone support eSIM?",
    helper: "Check your phone settings or manufacturer specifications when unsure.",
    options: [
      { label: "Yes", description: "My phone supports eSIM.", scores: { esim: 6, sim: 1 }, flags: ["esimSupported"] },
      { label: "No", description: "My phone does not support eSIM.", scores: { sim: 6, wifi: 3 }, flags: ["noEsim"] },
      { label: "I’m not sure", description: "I need to confirm compatibility.", scores: { wifi: 1 }, flags: ["unknownEsim"] },
    ],
  },
  {
    id: "unlocked",
    title: "Is your phone carrier-unlocked?",
    helper: "A locked phone may reject travel eSIMs and physical SIM cards.",
    options: [
      { label: "Yes", description: "It can use plans from other providers.", scores: { esim: 4, sim: 4 }, flags: ["unlocked"] },
      { label: "No", description: "My carrier restricts other SIMs.", scores: { wifi: 8 }, flags: ["locked"] },
      { label: "I’m not sure", description: "I have not checked yet.", scores: { wifi: 1 }, flags: ["unknownLock"] },
    ],
  },
  {
    id: "party",
    title: "Who and what needs internet?",
    helper: "Choose the closest match for your travel group and devices.",
    options: [
      { label: "1 person · 1 device", scores: { esim: 6, sim: 5 } },
      { label: "1–2 people · 2–3 devices", scores: { esim: 4, sim: 3, wifi: 3 } },
      { label: "3–4 people or 4–6 devices", scores: { wifi: 7, esim: 1 }, flags: ["sharedGroup"] },
      { label: "5+ people or many devices", scores: { wifi: 9 }, flags: ["largeGroup"] },
    ],
  },
  {
    id: "duration",
    title: "How long will you stay in Japan?",
    helper: "Trip length affects plan size, rental logistics, and recharging needs.",
    options: [
      { label: "1–3 days", scores: { esim: 4, sim: 2, wifi: 1 } },
      { label: "4–7 days", scores: { esim: 5, sim: 3, wifi: 3 } },
      { label: "8–14 days", scores: { esim: 5, sim: 4, wifi: 4 } },
      { label: "15 days or longer", scores: { sim: 5, esim: 4, wifi: 4 }, flags: ["longTrip"] },
    ],
  },
  {
    id: "usage",
    title: "How much data will you use?",
    helper: "Think about maps, social media, video, calls, uploads, and laptop use.",
    options: [
      { label: "Light", description: "Maps, messages, email, and occasional browsing.", scores: { esim: 4, sim: 3 } },
      { label: "Regular", description: "Daily maps, social media, photos, and browsing.", scores: { esim: 5, sim: 4, wifi: 3 } },
      { label: "Heavy", description: "Video, frequent uploads, streaming, or tethering.", scores: { wifi: 6, esim: 3, sim: 2 }, flags: ["heavyUse"] },
      { label: "Remote work", description: "Laptop use, meetings, and reliable tethering.", scores: { wifi: 7, esim: 2 }, flags: ["remoteWork"] },
    ],
  },
  {
    id: "arrival",
    title: "Do you need internet immediately after landing?",
    helper: "Pre-installed eSIMs can be convenient, while rentals require pickup or delivery planning.",
    options: [
      { label: "Yes, immediately", scores: { esim: 5, sim: 2, wifi: 2 }, flags: ["arrivalPriority"] },
      { label: "Airport pickup is fine", scores: { wifi: 5, sim: 3 }, flags: ["pickupOkay"] },
      { label: "Hotel delivery is fine", scores: { wifi: 4, sim: 3 }, flags: ["deliveryOkay"] },
      { label: "I can use airport Wi-Fi first", scores: { esim: 2, sim: 2, wifi: 2 } },
    ],
  },
  {
    id: "handling",
    title: "Which setup are you comfortable handling?",
    helper: "Choose the option that best matches your preferred level of setup and equipment.",
    options: [
      { label: "Digital setup only", description: "No pickup, SIM swap, or return.", scores: { esim: 7 }, flags: ["digitalOnly"] },
      { label: "Changing a physical SIM is fine", scores: { sim: 7 }, flags: ["simOkay"] },
      { label: "Carrying and returning a router is fine", scores: { wifi: 8 }, flags: ["rentalOkay"] },
      { label: "Whichever is simplest for my situation", scores: { esim: 3, sim: 2, wifi: 3 } },
    ],
  },
];

const results: Record<Method, ResultDefinition> = {
  esim: {
    name: "Travel eSIM",
    shortName: "eSIM",
    badge: "Best match",
    summary: "A travel eSIM is likely the most convenient match for your trip. It can be installed before departure and does not require pickup or return.",
    reasons: ["Fast digital setup for a compatible unlocked phone", "Good fit for independent travelers and immediate arrival access", "No rental device or physical SIM swap"],
    cautions: ["Confirm the exact phone model supports eSIM", "Confirm the phone is carrier-unlocked", "Check activation timing and hotspot rules before purchase"],
    primaryHref: "/esim",
    primaryLabel: "Read the Japan eSIM guide",
    secondaryHref: "/best-esim-japan",
    secondaryLabel: "Compare eSIM options",
  },
  sim: {
    name: "Physical SIM card",
    shortName: "Physical SIM",
    badge: "Best match",
    summary: "A physical travel SIM is likely the better fit for your unlocked phone, especially when eSIM is unavailable or you are comfortable changing SIM cards.",
    reasons: ["Works with many unlocked phones without eSIM", "Provides an independent mobile connection", "No separate router to charge or return"],
    cautions: ["Confirm the phone is carrier-unlocked", "Check SIM size, APN instructions, pickup, or delivery", "Store your home SIM safely during the trip"],
    primaryHref: "/sim-card",
    primaryLabel: "Read the Japan SIM card guide",
    secondaryHref: "/compare",
    secondaryLabel: "Compare all connection methods",
  },
  wifi: {
    name: "Pocket Wi-Fi",
    shortName: "Pocket Wi-Fi",
    badge: "Best match",
    summary: "Pocket Wi-Fi is likely the strongest match for shared access, multiple devices, heavy use, or a phone that cannot accept a travel SIM.",
    reasons: ["One router can connect several phones, tablets, and laptops", "Works through Wi-Fi even when a phone is carrier-locked", "Useful for groups that usually stay together"],
    cautions: ["The router must be charged and carried", "The group loses access when separated from the router", "Confirm pickup, delivery, return, and fair-use rules"],
    primaryHref: "/pocket-wifi",
    primaryLabel: "Read the pocket Wi-Fi guide",
    secondaryHref: "/compare",
    secondaryLabel: "Compare all connection methods",
  },
  check: {
    name: "Check your phone first",
    shortName: "Compatibility check",
    badge: "One step before choosing",
    summary: "Your phone compatibility is still unclear. Confirm eSIM support and carrier-lock status before buying, so you do not end up with a plan your phone cannot use.",
    reasons: ["eSIM and physical SIM both depend on phone compatibility", "A quick check prevents an unusable purchase", "Pocket Wi-Fi remains a safer fallback when the phone is locked"],
    cautions: ["Do not buy an eSIM until support is confirmed", "Ask your home carrier whether the phone is unlocked", "Check the exact model number, not only the phone family name"],
    primaryHref: "/compare",
    primaryLabel: "See the compatibility checklist",
    secondaryHref: "/pocket-wifi",
    secondaryLabel: "Review the safer Pocket Wi-Fi fallback",
  },
};

function trackDiagnosis(eventName: string, parameters: Record<string, string | number> = {}) {
  const browserWindow = window as typeof window & {
    gtag?: (command: "event", eventName: string, parameters?: Record<string, string | number>) => void;
  };
  browserWindow.gtag?.("event", eventName, parameters);
}

export default function DiagnosisClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const selectedAnswer = answers[currentStep];
  const progress = showResult ? 100 : Math.round((currentStep / questions.length) * 100);

  const analysis = useMemo(() => {
    const scores = { esim: 0, sim: 0, wifi: 0 };
    const flags = new Set<string>();

    answers.forEach((answerIndex, questionIndex) => {
      const option = questions[questionIndex]?.options[answerIndex];
      if (!option) return;
      Object.entries(option.scores).forEach(([method, score]) => {
        scores[method as keyof typeof scores] += score ?? 0;
      });
      option.flags?.forEach((flag) => flags.add(flag));
    });

    if (flags.has("unknownEsim") || flags.has("unknownLock")) {
      return { primary: "check" as Method, scores, flags };
    }
    if (flags.has("locked")) {
      return { primary: "wifi" as Method, scores, flags };
    }
    if (flags.has("noEsim")) scores.esim = -100;
    if (flags.has("sharedGroup") || flags.has("largeGroup")) scores.wifi += 4;
    if ((flags.has("remoteWork") || flags.has("heavyUse")) && flags.has("rentalOkay")) scores.wifi += 3;
    if (flags.has("digitalOnly") && flags.has("esimSupported")) scores.esim += 5;
    if (flags.has("simOkay") && flags.has("unlocked")) scores.sim += 4;

    const primary = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] || "wifi") as Method;
    return { primary, scores, flags };
  }, [answers]);

  function selectAnswer(optionIndex: number) {
    setAnswers((current) => {
      const next = current.slice(0, currentStep + 1);
      next[currentStep] = optionIndex;
      return next;
    });
    if (currentStep === 0 && answers[0] === undefined) trackDiagnosis("diagnosis_start");
  }

  function continueDiagnosis() {
    if (selectedAnswer === undefined) return;
    if (currentStep === questions.length - 1) {
      setShowResult(true);
      trackDiagnosis("diagnosis_complete", { result_type: analysis.primary, question_count: questions.length });
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
    if (currentStep > 0) setCurrentStep((step) => step - 1);
  }

  function restart() {
    setAnswers([]);
    setCurrentStep(0);
    setShowResult(false);
    trackDiagnosis("diagnosis_restart");
    window.setTimeout(() => document.getElementById("internet-finder")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  const result = results[analysis.primary];

  const rankedMethods = (["esim", "sim", "wifi"] as const)
    .map((method) => ({ method, score: analysis.scores[method] }))
    .sort((a, b) => b.score - a.score);

  const scoreRange = Math.max(
    1,
    rankedMethods[0].score - rankedMethods[rankedMethods.length - 1].score,
  );

  const methodLabels: Record<Exclude<Method, "check">, string> = {
    esim: "eSIM",
    sim: "Physical SIM",
    wifi: "Pocket Wi-Fi",
  };

  function fitLabel(score: number) {
    const distance = rankedMethods[0].score - score;
    if (distance === 0) return "Best fit";
    if (distance <= Math.max(3, Math.round(scoreRange * 0.35))) return "Good alternative";
    return "Less suitable";
  }
  const relevantProviders = connectivityProviders
    .filter((provider) => {
      if (analysis.primary === "esim") return provider.category.includes("eSIM");
      if (analysis.primary === "sim") return provider.category.includes("SIM");
      if (analysis.primary === "wifi") return provider.category.includes("Pocket Wi-Fi");
      return false;
    })
    .slice(0, 2);

  return (
    <section className={styles.finderSection} id="internet-finder">
      <div className={styles.finderContainer}>
        <div className={styles.progressHeader}>
          <div>
            <p>{showResult ? "Your recommendation" : `Question ${currentStep + 1} of ${questions.length}`}</p>
            <span>{progress}% complete</span>
          </div>
          <div aria-label={`${progress}% complete`} aria-valuemax={100} aria-valuemin={0} aria-valuenow={progress} className={styles.progressTrack} role="progressbar">
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

            <div className={styles.answerGrid} role="radiogroup" aria-label={questions[currentStep].title}>
              {questions[currentStep].options.map((option, optionIndex) => {
                const isSelected = selectedAnswer === optionIndex;
                return (
                  <button aria-checked={isSelected} className={`${styles.answerButton} ${isSelected ? styles.answerSelected : ""}`} key={option.label} onClick={() => selectAnswer(optionIndex)} role="radio" type="button">
                    <span className={styles.answerRadio} aria-hidden="true">{isSelected ? "✓" : ""}</span>
                    <span><strong>{option.label}</strong>{option.description ? <small>{option.description}</small> : null}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.questionFooter}>
              <button className={styles.backButton} disabled={currentStep === 0} onClick={goBack} type="button">← Previous</button>
              <button className={styles.continueButton} disabled={selectedAnswer === undefined} onClick={continueDiagnosis} type="button">
                {currentStep === questions.length - 1 ? "See my result" : "Continue"} →
              </button>
            </div>
            <p className={styles.privacyNote}>Your answers stay in this browser and are not submitted as personal information.</p>
          </div>
        ) : (
          <div className={styles.resultCard}>
            <div className={styles.resultTop}>
              <div>
                <p className={styles.resultBadge}>{result.badge}</p>
                <span>Based on your seven answers</span>
                <h2>{result.name}</h2>
                <p className={styles.resultSummary}>{result.summary}</p>
              </div>
              <div className={styles.resultMark}><span>Result</span><strong>{result.shortName}</strong></div>
            </div>

            <div className={styles.resultColumns}>
              <article className={styles.resultPanel}>
                <h3>Why this fits</h3>
                <ul className={styles.positiveList}>{result.reasons.map((reason) => <li key={reason}><span>✓</span>{reason}</li>)}</ul>
              </article>
              <article className={styles.resultPanel}>
                <h3>Check before buying</h3>
                <ul className={styles.cautionList}>{result.cautions.map((caution) => <li key={caution}><span>!</span>{caution}</li>)}</ul>
              </article>
            </div>

            {analysis.primary !== "check" ? (
              <section className={styles.fitComparison} aria-labelledby="fit-comparison-title">
                <div className={styles.fitComparisonHeading}>
                  <div>
                    <span>Quick comparison</span>
                    <h3 id="fit-comparison-title">How the three methods fit your answers</h3>
                  </div>
                  <Link href="/compare" onClick={() => trackDiagnosis("diagnosis_cta_click", { result_type: analysis.primary, cta: "comparison" })}>
                    Open the full comparison →
                  </Link>
                </div>

                <div className={styles.fitRows}>
                  {rankedMethods.map(({ method, score }, index) => {
                    const relativeWidth = Math.max(
                      18,
                      Math.round(100 - ((rankedMethods[0].score - score) / scoreRange) * 58),
                    );
                    return (
                      <div className={styles.fitRow} key={method}>
                        <div>
                          <strong>{methodLabels[method]}</strong>
                          <span>{fitLabel(score)}</span>
                        </div>
                        <div className={styles.fitBar} aria-hidden="true">
                          <span style={{ width: `${relativeWidth}%` }} />
                        </div>
                        <small>{index === 0 ? "Top match" : fitLabel(score)}</small>
                      </div>
                    );
                  })}
                </div>

                <p className={styles.fitNote}>
                  This is a fit comparison based on your answers, not a price, speed, or provider ranking.
                </p>
              </section>
            ) : null}

            {relevantProviders.length > 0 ? (
              <div className={styles.providerSection}>
                <div className={styles.providerHeading}><span>Options to research</span><small>No prices or rankings are assumed</small></div>
                <div className={styles.providerGrid}>
                  {relevantProviders.map((provider, index) => (
                    <article className={styles.providerCard} key={provider.slug}>
                      <span>{index === 0 ? "Start your comparison here" : "Also worth comparing"}</span>
                      <h3>{provider.name}</h3>
                      <p>{provider.fit}</p>
                      <Link href={provider.reviewHref} onClick={() => trackDiagnosis("diagnosis_provider_click", { result_type: analysis.primary, provider: provider.slug })}>Review details and cautions →</Link>
                    </article>
                  ))}
                </div>
                <p className={styles.providerDisclosure}>Some provider relationships may be pending or added later. Always confirm current conditions on the provider’s official site.</p>
              </div>
            ) : null}

            <div className={styles.resultActions}>
              <Link className={styles.resultPrimaryButton} href={result.primaryHref} onClick={() => trackDiagnosis("diagnosis_cta_click", { result_type: analysis.primary, cta: "primary" })}>{result.primaryLabel} →</Link>
              <Link className={styles.resultSecondaryButton} href={result.secondaryHref} onClick={() => trackDiagnosis("diagnosis_cta_click", { result_type: analysis.primary, cta: "secondary" })}>{result.secondaryLabel}</Link>
            </div>

            <div className={styles.bottomCta}>
              <div>
                <strong>Ready for the next step?</strong>
                <span>Use the guide to compare setup, pickup, compatibility, and current provider conditions.</span>
              </div>
              <Link href={result.primaryHref} onClick={() => trackDiagnosis("diagnosis_cta_click", { result_type: analysis.primary, cta: "bottom" })}>
                {result.primaryLabel} →
              </Link>
            </div>

            <div className={styles.resultFooter}>
              <button onClick={goBack} type="button">← Change the last answer</button>
              <button onClick={restart} type="button">Start again</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
