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
