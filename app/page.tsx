import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import QuickDiagnosis from "@/components/home/QuickDiagnosis";
import ComparisonSection from "@/components/home/ComparisonSection";
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

      <ComparisonSection />
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
