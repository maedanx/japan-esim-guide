export type ConnectionType = "esim" | "physical-sim" | "pocket-wifi";

export type Provider = {
  id: string;
  name: string;
  type: ConnectionType[];
  bestFor: string;
  data: string;
  validity: string;
  hotspot: string;
  delivery: string;
  priceLabel: string;
  description: string;
  strengths: string[];
  caution: string;
  recommended?: boolean;
  officialUrl: string;
  affiliateUrl: string;
};

export const providers: Provider[] = [
  {
    id: "sakura-mobile",
    name: "Sakura Mobile",
    type: ["esim", "physical-sim", "pocket-wifi"],
    bestFor: "Travellers who want Japan-focused English support",
    data: "Varies by product",
    validity: "Short trips and longer stays",
    hotspot: "Depends on the selected product",
    delivery: "Online setup, delivery, or pickup",
    priceLabel: "Check latest price",
    description:
      "A Japan-focused provider offering eSIM, physical SIM, pocket Wi-Fi, and longer-stay options.",
    strengths: [
      "Multiple connection types",
      "English-language support",
      "Useful for both short and long stays",
    ],
    caution:
      "Compare the exact product because data limits, delivery methods, and activation rules differ.",
    recommended: true,
    officialUrl: "https://www.sakuramobile.jp/",
    affiliateUrl: "",
  },
  {
    id: "ninja-wifi",
    name: "NINJA WiFi",
    type: ["esim", "physical-sim", "pocket-wifi"],
    bestFor: "Families, groups, and airport pickup",
    data: "Varies by plan",
    validity: "Trip-based rental or prepaid plans",
    hotspot: "Pocket Wi-Fi supports multiple devices",
    delivery: "Airport counter, hotel, or delivery",
    priceLabel: "Check latest price",
    description:
      "A well-known Japan travel connectivity service with strong pocket Wi-Fi and airport pickup options.",
    strengths: [
      "Good for groups",
      "Multiple pickup options",
      "Suitable for phones and laptops",
    ],
    caution:
      "Pocket Wi-Fi must be charged, carried, and usually returned after the rental.",
    affiliateUrl: "",
    officialUrl: "https://ninjawifi.com/en/",
  },
  {
    id: "airalo",
    name: "Airalo",
    type: ["esim"],
    bestFor: "Solo travellers who want a quick eSIM setup",
    data: "Varies by Japan plan",
    validity: "Varies by plan",
    hotspot: "Check the individual plan",
    delivery: "Instant digital delivery",
    priceLabel: "Check latest price",
    description:
      "A global eSIM marketplace offering digital plans that can be installed before departure.",
    strengths: [
      "No physical pickup",
      "Can be installed before flying",
      "Useful for multi-country travellers",
    ],
    caution:
      "Your phone must support eSIM and be carrier-unlocked. Activation timing varies by plan.",
    affiliateUrl: "",
    officialUrl: "https://www.airalo.com/",
  },
  {
    id: "ubigi",
    name: "Ubigi",
    type: ["esim"],
    bestFor: "Travellers comparing alternative eSIM plans",
    data: "Varies by Japan plan",
    validity: "Varies by plan",
    hotspot: "Check the individual plan",
    delivery: "Instant digital delivery",
    priceLabel: "Check latest price",
    description:
      "An international eSIM provider offering prepaid data plans for Japan and other destinations.",
    strengths: [
      "Digital setup",
      "Useful alternative to other eSIM providers",
      "Plans available for many destinations",
    ],
    caution:
      "Confirm device compatibility, network coverage, validity, and hotspot rules before purchase.",
    affiliateUrl: "",
    officialUrl: "https://cellulardata.ubigi.com/",
  },
];

export function getProviderUrl(provider: Provider) {
  return provider.affiliateUrl || provider.officialUrl;
}
