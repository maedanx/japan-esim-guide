"use client";

import { useMemo, useState } from "react";

type Answers = {
  esim: string;
  devices: string;
  duration: string;
  data: string;
  priority: string;
};

type Question = {
  key: keyof Answers;
  title: string;
  description: string;
  options: {
    value: string;
    label: string;
    detail: string;
  }[];
};

const initialAnswers: Answers = {
  esim: "",
  devices: "",
  duration: "",
  data: "",
  priority: "",
};

const questions: Question[] = [
  {
    key: "esim",
    title: "Does your phone support eSIM?",
    description:
      "Most newer iPhones, Google Pixel phones, and some Samsung Galaxy models support eSIM.",
    options: [
      {
        value: "yes",
        label: "Yes",
        detail: "My phone supports eSIM",
      },
      {
        value: "no",
        label: "No",
        detail: "My phone does not support eSIM",
      },
      {
        value: "unknown",
        label: "Not sure",
        detail: "I need help checking",
      },
    ],
  },
  {
    key: "devices",
    title: "How many devices need internet?",
    description:
      "Include phones, tablets, and laptops you want to connect during your trip.",
    options: [
      {
        value: "one",
        label: "One phone",
        detail: "Only my smartphone",
      },
      {
        value: "two",
        label: "Two devices",
        detail: "For example, phone and laptop",
      },
      {
        value: "group",
        label: "A group",
        detail: "Several people or devices",
      },
    ],
  },
  {
    key: "duration",
    title: "How long will you stay in Japan?",
    description:
      "Your trip length affects which plans offer the best value.",
    options: [
      {
        value: "short",
        label: "1–7 days",
        detail: "A short trip",
      },
      {
        value: "medium",
        label: "8–30 days",
        detail: "A standard holiday",
      },
      {
        value: "long",
        label: "Over 30 days",
        detail: "An extended stay",
      },
    ],
  },
  {
    key: "data",
    title: "How will you use mobile data?",
    description:
      "Choose the option that best matches your normal travel habits.",
    options: [
      {
        value: "light",
        label: "Light use",
        detail: "Maps, messages, and email",
      },
      {
        value: "normal",
        label: "Regular use",
        detail: "Social media and some video",
      },
      {
        value: "heavy",
        label: "Heavy use",
        detail: "Streaming, work, or hotspot use",
      },
    ],
  },
  {
    key: "priority",
    title: "What matters most to you?",
    description:
      "There is no single best option for everyone. Choose your top priority.",
    options: [
      {
        value: "easy",
        label: "Easy setup",
        detail: "I want to connect quickly",
      },
      {
        value: "price",
        label: "Low price",
        detail: "I want the cheapest practical choice",
      },
      {
        value: "share",
        label: "Easy sharing",
        detail: "I need internet for multiple devices",
      },
    ],
  },
];

export default function QuickDiagnosis() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [step, setStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[step];
  const selectedValue = currentQuestion
    ? answers[currentQuestion.key]
    : "";

  const result = useMemo(() => {
    if (
      !answers.esim ||
      !answers.devices ||
      !answers.duration ||
      !answers.data ||
      !answers.priority
    ) {
      return null;
    }

    if (answers.esim === "no") {
      return {
        type: "Physical SIM",
        badge: "Best match",
        summary:
          "A prepaid physical SIM is the safest choice because your phone does not support eSIM.",
        reasons: [
          "Works without eSIM support",
          "No separate Wi-Fi device to carry",
          "Suitable for one unlocked smartphone",
        ],
        watchOut:
          "Confirm that your phone is carrier-unlocked before purchasing.",
        action: "Compare physical SIM options",
      };
    }

    if (answers.esim === "unknown") {
      return {
        type: "Check compatibility first",
        badge: "One quick check needed",
        summary:
          "Check whether your phone supports eSIM before buying. If it does, a travel eSIM will probably be your simplest option.",
        reasons: [
          "Avoids buying an incompatible plan",
          "Takes only a few minutes to check",
          "Keeps both eSIM and physical SIM options open",
        ],
        watchOut:
          "Your exact phone model and country of purchase can affect eSIM support.",
        action: "Check my phone",
      };
    }

    if (
      answers.devices === "group" ||
      answers.priority === "share"
    ) {
      return {
        type: "Pocket Wi-Fi",
        badge: "Best for sharing",
        summary:
          "Pocket Wi-Fi is likely the easiest way to connect several people or devices with one plan.",
        reasons: [
          "Connects multiple devices",
          "Useful for families and groups",
          "No eSIM installation on every phone",
        ],
        watchOut:
          "You must carry and charge the device, and some rentals must be returned.",
        action: "Compare pocket Wi-Fi",
      };
    }

    if (answers.duration === "long") {
      return {
        type: "Long-stay eSIM or local SIM",
        badge: "Best for long stays",
        summary:
          "For a stay longer than 30 days, compare renewable eSIM plans with local monthly SIM options.",
        reasons: [
          "Better value for extended use",
          "More flexible data renewal",
          "Suitable for work, study, or long visits",
        ],
        watchOut:
          "Some local plans may require identification, an address, or a longer contract.",
        action: "See long-stay options",
      };
    }

    if (answers.data === "heavy" && answers.devices === "two") {
      return {
        type: "High-data eSIM",
        badge: "Best for heavy use",
        summary:
          "A high-data eSIM with hotspot support should give you the best balance of speed and convenience.",
        reasons: [
          "No device collection or return",
          "Can connect a second device by hotspot",
          "Good for video, work, and navigation",
        ],
        watchOut:
          "Check hotspot limits and fair-use speed restrictions before buying.",
        action: "Compare high-data eSIMs",
      };
    }

    return {
      type: "Travel eSIM",
      badge: "Recommended",
      summary:
        "A travel eSIM is probably the fastest and simplest option for your Japan trip.",
      reasons: [
        "Install before departure",
        "Connect without visiting a shop",
        "Keep your physical SIM in your phone",
      ],
      watchOut:
        "Install it before departure, but activate it according to the provider’s instructions.",
      action: "Compare travel eSIMs",
    };
  }, [answers]);

  const selectAnswer = (value: string) => {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.key]: value,
    }));
  };

  const goNext = () => {
    if (!selectedValue) return;

    if (step === questions.length - 1) {
      setShowResult(true);
      return;
    }

    setStep((current) => current + 1);
  };

  const goBack = () => {
    if (step > 0) {
      setStep((current) => current - 1);
    }
  };

  const restart = () => {
    setAnswers(initialAnswers);
    setStep(0);
    setShowResult(false);
  };

  const progress = showResult
    ? 100
    : Math.round(((step + 1) / questions.length) * 100);

  return (
    <section id="diagnosis" className="diagnosis-section">
      <div className="diagnosis-shell">
        <div className="diagnosis-intro">
          <span className="diagnosis-kicker">30-second check</span>
          <h2>Find the best way to stay connected in Japan.</h2>
          <p>
            Answer five simple questions. We will recommend an eSIM,
            physical SIM, or pocket Wi-Fi based on your trip.
          </p>

          <div className="diagnosis-trust">
            <span>✓ No signup</span>
            <span>✓ No email required</span>
            <span>✓ Free result</span>
          </div>
        </div>

        <div className="diagnosis-card">
          <div className="diagnosis-progress-row">
            <span>
              {showResult
                ? "Your result"
                : `Question ${step + 1} of ${questions.length}`}
            </span>
            <strong>{progress}%</strong>
          </div>

          <div className="diagnosis-progress-track">
            <div
              className="diagnosis-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          {!showResult && currentQuestion ? (
            <div className="diagnosis-question">
              <h3>{currentQuestion.title}</h3>
              <p>{currentQuestion.description}</p>

              <div className="diagnosis-options">
                {currentQuestion.options.map((option) => {
                  const selected = selectedValue === option.value;

                  return (
                    <button
                      type="button"
                      key={option.value}
                      className={`diagnosis-option ${
                        selected ? "is-selected" : ""
                      }`}
                      onClick={() => selectAnswer(option.value)}
                      aria-pressed={selected}
                    >
                      <span className="diagnosis-option-radio">
                        {selected ? "✓" : ""}
                      </span>

                      <span>
                        <strong>{option.label}</strong>
                        <small>{option.detail}</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="diagnosis-navigation">
                <button
                  type="button"
                  className="diagnosis-back"
                  onClick={goBack}
                  disabled={step === 0}
                >
                  Back
                </button>

                <button
                  type="button"
                  className="diagnosis-next"
                  onClick={goNext}
                  disabled={!selectedValue}
                >
                  {step === questions.length - 1
                    ? "See my result"
                    : "Next question"}
                </button>
              </div>
            </div>
          ) : result ? (
            <div className="diagnosis-result" aria-live="polite">
              <div className="diagnosis-result-icon">✓</div>
              <span className="diagnosis-result-badge">
                {result.badge}
              </span>

              <p className="diagnosis-result-label">
                Your likely best option
              </p>

              <h3>{result.type}</h3>
              <p className="diagnosis-result-summary">
                {result.summary}
              </p>

              <div className="diagnosis-reasons">
                {result.reasons.map((reason) => (
                  <div key={reason}>
                    <span>✓</span>
                    <p>{reason}</p>
                  </div>
                ))}
              </div>

              <div className="diagnosis-warning">
                <strong>Before you buy</strong>
                <p>{result.watchOut}</p>
              </div>

              <a className="diagnosis-action" href="#compare">
                {result.action}
              </a>

              <button
                type="button"
                className="diagnosis-restart"
                onClick={restart}
              >
                Start again
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
