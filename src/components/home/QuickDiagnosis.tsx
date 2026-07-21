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
