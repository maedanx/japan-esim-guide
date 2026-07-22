import type { Metadata } from "next";
import LegalPage from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "How We Review Providers",
  description:
    "See how Japan X Trip compares eSIM, physical SIM, and pocket Wi-Fi providers for international travelers.",
};

export default function ReviewMethodPage() {
  return (
    <LegalPage
      eyebrow="Our review process"
      title="How we compare internet providers for Japan."
      intro="Our comparisons focus on the practical details that affect a traveler before purchase, during setup, and throughout a trip."
      sections={[
        {
          title: "Our approach",
          paragraphs: [
            "Japan X Trip compares eSIMs, physical SIM cards, and pocket Wi-Fi according to the needs of international travelers rather than treating one connection type or provider as the best choice for everyone.",
            "Information is checked primarily from official provider websites, including product pages, setup instructions, frequently asked questions, and published terms when available.",
          ],
        },
        {
          title: "Price and total cost",
          paragraphs: [
            "We consider the advertised plan price together with other costs that may affect the traveler, such as delivery, airport pickup, rental extensions, deposits, optional insurance, return charges, and potential fees for lost or damaged rental equipment.",
            "A low advertised price is not automatically treated as the best value when important charges or restrictions apply.",
          ],
        },
        {
          title: "Data allowance and validity",
          paragraphs: [
            "We compare the amount of included high-speed data, whether a plan is unlimited or subject to a fair-use policy, what happens after the allowance is used, and how long the plan remains valid.",
            "We also consider when validity starts, because some products begin when installed, activated, connected to a network, collected, delivered, or on a selected reservation date.",
          ],
        },
        {
          title: "Network coverage, speed, and reliability",
          paragraphs: [
            "We review the network and coverage information published by the provider and consider whether the product is suitable for common travel routes, cities, regional destinations, and transport between locations.",
            "Connection speed can vary according to network congestion, location, building conditions, device compatibility, data usage, and network-management policies. We therefore avoid presenting a speed as guaranteed unless the provider clearly guarantees it.",
          ],
        },
        {
          title: "Setup difficulty",
          paragraphs: [
            "We consider how easy the product is to purchase, install, activate, collect, use, and return.",
            "For eSIMs, this can include QR-code installation, carrier-lock requirements, APN settings, roaming settings, activation timing, and whether installation can be completed before departure.",
            "For physical products, we consider delivery, airport counters, collection hours, SIM insertion, charging requirements, and return procedures.",
          ],
        },
        {
          title: "English-language support",
          paragraphs: [
            "We assess the availability and clarity of English-language product information, setup instructions, troubleshooting resources, and customer-support options.",
            "English support is considered alongside the type of assistance offered and any published operating hours or response limitations.",
          ],
        },
        {
          title: "Airport pickup and delivery",
          paragraphs: [
            "For physical SIM cards and pocket Wi-Fi, we consider airport-counter availability, collection locations, opening hours, hotel delivery, postal delivery, reservation deadlines, and return options when these details are published.",
          ],
        },
        {
          title: "Tethering and device sharing",
          paragraphs: [
            "We check whether tethering or personal hotspot use is supported, restricted, or not clearly stated.",
            "This is particularly important for travelers who need to connect a laptop, tablet, second phone, family members, or a group of travelers.",
          ],
        },
        {
          title: "Cancellation and refund policy",
          paragraphs: [
            "We review published rules concerning cancellation, refunds, changes, failed installation, incompatible devices, unused plans, delayed delivery, rental extensions, and returned equipment where this information is available.",
            "Policies can differ substantially between products from the same provider, so travelers should read the terms applying to the exact product they intend to purchase.",
          ],
        },
        {
          title: "Suitability for different trips",
          paragraphs: [
            "Recommendations consider trip length, number of travelers, number of devices, eSIM compatibility, carrier-lock status, expected data use, need for tethering, preferred setup method, and whether the traveler is comfortable carrying and returning a rental device.",
            "The most suitable option for a solo traveler with one unlocked eSIM-compatible phone may be different from the best option for a family sharing phones and laptops.",
          ],
        },
        {
          title: "Affiliate relationships and rankings",
          paragraphs: [
            "Japan X Trip may receive a commission when a visitor purchases through an affiliate link, at no additional cost to the visitor.",
            "Affiliate relationships do not determine rankings or recommendations. Recommendations are based on traveler needs and the comparison criteria described on this page.",
            "A provider may be included without an affiliate relationship, and an affiliate provider is not guaranteed a higher position or favorable recommendation.",
          ],
        },
        {
          title: "Changes and limitations",
          paragraphs: [
            "Prices and plan details may change after they are checked. Product availability may also vary by travel date, device, nationality, country of purchase, pickup location, or other provider conditions.",
            "Japan X Trip does not independently operate the networks or fulfill provider orders. Final purchasing, activation, support, cancellation, and refund decisions are handled under the selected provider’s terms.",
          ],
        },
      ]}
    />
  );
}
