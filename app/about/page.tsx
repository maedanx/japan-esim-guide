import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "About Japan X Trip",
  description:
    "Learn why Japan X Trip was created and how it helps international travelers compare internet options for Japan.",
};

export default function AboutPage() {
  return (
    <LegalPage
      eyebrow="About this guide"
      title="Clearer internet choices for travelers to Japan."
      intro="Japan X Trip helps international visitors understand and compare eSIMs, physical SIM cards, and pocket Wi-Fi without unnecessary jargon."
      sections={[
        {
          title: "What Japan X Trip does",
          paragraphs: [
            "Japan X Trip provides beginner-friendly information for travelers who need mobile internet during a trip to Japan.",
            "The site explains the practical differences between eSIMs, physical SIM cards, and pocket Wi-Fi, and helps travelers narrow down their options according to device compatibility, trip length, data needs, and the number of people or devices traveling together.",
          ],
        },
        {
          title: "Who the guide is for",
          paragraphs: [
            "The guide is designed primarily for international visitors, including first-time travelers who may not be familiar with Japanese mobile services, airport pickup procedures, carrier-lock restrictions, or eSIM activation.",
          ],
          bullets: [
            "Solo travelers using one compatible smartphone",
            "Families and groups sharing several devices",
            "Travelers carrying phones, tablets, or laptops",
            "Visitors staying for a few days, several weeks, or longer",
            "Anyone who wants simple setup and troubleshooting guidance",
          ],
        },
        {
          title: "How recommendations are made",
          paragraphs: [
            "Recommendations are based on traveler needs and practical comparison criteria rather than on a single provider being best for everyone.",
            "The 30-second check is intended as a starting point. Travelers should confirm current prices, device requirements, activation instructions, coverage, and refund conditions on the provider’s official website before purchasing.",
          ],
        },
        {
          title: "Who operates the site",
          paragraphs: [
            "The site is operated as Japan X Trip. Personal names, a physical office address, and a public telephone number are not presented because they are not required for the current informational service.",
            "Japan X Trip is an independent travel-information website and is not a mobile network operator, internet service provider, airport authority, or government service.",
          ],
        },
        {
          title: "Accuracy and updates",
          paragraphs: [
            "Information is checked primarily against official provider websites. However, providers may change prices, availability, plan names, data allowances, validity periods, setup procedures, and terms without notice.",
            "The latest provider information should always be confirmed before completing a purchase.",
          ],
        },
      ]}
    />
  );
}
