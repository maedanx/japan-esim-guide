import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "Learn how affiliate links may be used on Japan X Trip and how they affect provider recommendations.",
};

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      eyebrow="Transparency"
      title="Affiliate Disclosure"
      intro="Some links on Japan X Trip may be affiliate links. This page explains what that means and how we keep recommendations independent."
      sections={[
        {
          title: "How affiliate links work",
          paragraphs: [
            "Japan X Trip may receive a commission when a visitor clicks an affiliate link and completes an eligible purchase.",
            "This commission is paid by the provider or affiliate network and does not normally add an extra charge to the visitor’s purchase price.",
          ],
        },
        {
          title: "Potential affiliate partners",
          paragraphs: [
            "The site may include affiliate links for eSIM, physical SIM, pocket Wi-Fi, travel-connectivity, or related services.",
            "Potential providers may include Sakura Mobile, NINJA WiFi, Airalo, Ubigi, Nomad eSIM, Japan Wireless, and other relevant services. This list may change as products, partnerships, and traveler needs change.",
            "Mentioning a provider on this page does not mean that an active affiliate relationship currently exists.",
          ],
        },
        {
          title: "How commissions affect recommendations",
          paragraphs: [
            "Affiliate relationships do not determine provider rankings or recommendations.",
            "Recommendations are based on traveler needs and comparison criteria such as price, total cost, data allowance, validity, coverage, reliability, setup, support, tethering, pickup, delivery, cancellation terms, and suitability for different trips.",
            "A higher commission does not automatically result in a higher ranking, and a provider may be compared even when no affiliate arrangement is available.",
          ],
        },
        {
          title: "Prices and provider terms",
          paragraphs: [
            "Prices, discounts, plan features, and provider terms can change without notice. Japan X Trip may not always reflect a change immediately.",
            "Visitors should confirm the final price, product details, compatibility rules, activation timing, cancellation policy, and refund conditions on the provider’s website before purchasing.",
          ],
        },
        {
          title: "Editorial independence",
          paragraphs: [
            "Japan X Trip aims to provide clear and practical information for international travelers.",
            "Affiliate income may help support the operation and improvement of the website, but it does not remove the need to present important restrictions, disadvantages, or alternative options.",
          ],
        },
      ]}
    />
  );
}
