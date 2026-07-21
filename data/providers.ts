export type ConnectionType = "esim" | "physical-sim" | "pocket-wifi";

export type ProviderId =
  | "sakura-mobile"
  | "ninja-wifi"
  | "airalo"
  | "ubigi";

export type Provider = {
  id: ProviderId;
  name: string;
  shortName: string;
  category: string;
  award: string;
  awardIcon: string;
  types: ConnectionType[];
  bestFor: string;
  summary: string;
  data: string;
  validity: string;
  hotspot: string;
  delivery: string;
  strengths: string[];
  caution: string;
  priceLabel: string;
  officialUrl: string;

  /**
   * 承認後にここだけ変更してください。
   * 空欄の場合は officialUrl が使用されます。
   */
  affiliateUrl: string;
};

export const providers: Provider[] = [
  {
    id: "sakura-mobile",
    name: "Sakura Mobile",
    shortName: "SM",
    category: "Japan specialist",
    award: "Best overall",
    awardIcon: "01",
    types: ["esim", "physical-sim", "pocket-wifi"],
    bestFor:
      "Travellers who want Japan-focused service and several connection choices.",
    summary:
      "A Japan-focused provider offering eSIM, physical SIM, pocket Wi-Fi, and longer-stay options.",
    data: "Depends on the selected product",
    validity: "Short trips and longer stays",
    hotspot: "Depends on the selected product",
    delivery: "Digital setup, delivery, or pickup",
    strengths: [
      "Multiple connection types",
      "Japan-focused English guidance",
      "Useful for short and longer stays",
    ],
    caution:
      "Check the exact plan because activation, data, pickup, and hotspot conditions differ.",
    priceLabel: "Check current plans",
    officialUrl: "https://www.sakuramobile.jp/",
    affiliateUrl: "",
  },
  {
    id: "airalo",
    name: "Airalo",
    shortName: "AI",
    category: "Digital eSIM",
    award: "Best simple eSIM",
    awardIcon: "02",
    types: ["esim"],
    bestFor:
      "Solo travellers who want to install an eSIM before departure.",
    summary:
      "A digital eSIM marketplace with Japan plans that can be purchased and installed online.",
    data: "Depends on the Japan plan",
    validity: "Depends on the selected plan",
    hotspot: "Check the selected plan",
    delivery: "Instant digital delivery",
    strengths: [
      "No physical pickup",
      "Install before travelling",
      "Useful for multi-country trips",
    ],
    caution:
      "The phone must support eSIM and be carrier-unlocked. Check when plan validity begins.",
    priceLabel: "Check current plans",
    officialUrl: "https://www.airalo.com/",
    affiliateUrl: "",
  },
  {
    id: "ninja-wifi",
    name: "NINJA WiFi",
    shortName: "NW",
    category: "Pocket Wi-Fi",
    award: "Best for families",
    awardIcon: "03",
    types: ["pocket-wifi", "esim", "physical-sim"],
    bestFor:
      "Families, groups, laptops, and travellers who need several connected devices.",
    summary:
      "A Japan travel connectivity provider with pocket Wi-Fi and multiple collection options.",
    data: "Depends on the selected plan",
    validity: "Trip-based rental or prepaid plan",
    hotspot: "Designed to connect several devices",
    delivery: "Airport, hotel, or delivery",
    strengths: [
      "Good for groups",
      "Connect phones and laptops",
      "Multiple receiving options",
    ],
    caution:
      "Pocket Wi-Fi needs charging and carrying, and rental devices normally need to be returned.",
    priceLabel: "Check current plans",
    officialUrl: "https://ninjawifi.com/en/",
    affiliateUrl: "",
  },
  {
    id: "ubigi",
    name: "Ubigi",
    shortName: "UB",
    category: "Digital eSIM",
    award: "eSIM alternative",
    awardIcon: "04",
    types: ["esim"],
    bestFor:
      "Travellers who want to compare another digital eSIM option.",
    summary:
      "An international eSIM provider offering prepaid mobile-data plans for Japan.",
    data: "Depends on the Japan plan",
    validity: "Depends on the selected plan",
    hotspot: "Check the selected plan",
    delivery: "Instant digital delivery",
    strengths: [
      "Fully digital setup",
      "Alternative eSIM choice",
      "Plans for multiple destinations",
    ],
    caution:
      "Confirm device support, coverage, validity, and hotspot conditions before purchase.",
    priceLabel: "Check current plans",
    officialUrl: "https://cellulardata.ubigi.com/",
    affiliateUrl: "",
  },
];

export function getProviderUrl(provider: Provider): string {
  return provider.affiliateUrl.trim() || provider.officialUrl;
}

export function isAffiliateLink(provider: Provider): boolean {
  return provider.affiliateUrl.trim().length > 0;
}
