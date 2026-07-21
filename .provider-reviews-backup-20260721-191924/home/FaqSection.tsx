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
