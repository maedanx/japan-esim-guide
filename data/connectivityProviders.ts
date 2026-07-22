export type ConnectivityProvider = {
  slug: string;
  name: string;
  category: string;
  fit: string;
  strengths: string[];
  caution: string;
  reviewHref: string;
  officialUrl?: string;
  affiliateUrl?: string;
  affiliateStatus: "not-configured" | "pending" | "active";
};

export const connectivityProviders: ConnectivityProvider[] = [
  {
    slug: "sakura-mobile",
    name: "Sakura Mobile",
    category: "eSIM · SIM · Pocket Wi-Fi",
    fit: "Travelers who value Japan-focused information and English-language guidance.",
    strengths: [
      "Several connection types",
      "Japan-focused support",
      "Options for short and longer stays",
    ],
    caution:
      "Compare the exact product because setup, pickup, validity, and pricing differ.",
    reviewHref: "/reviews/sakura-mobile",
    affiliateStatus: "pending",
  },
  {
    slug: "airalo",
    name: "Airalo",
    category: "eSIM",
    fit: "Solo travelers who want a fully digital purchase and installation process.",
    strengths: [
      "No physical collection",
      "Pre-trip installation",
      "Simple digital plan selection",
    ],
    caution:
      "Confirm phone compatibility, activation timing, data allowance, and hotspot rules.",
    reviewHref: "/reviews/airalo",
    affiliateStatus: "not-configured",
  },
  {
    slug: "ubigi",
    name: "Ubigi",
    category: "eSIM",
    fit: "Travelers comparing alternative prepaid eSIM plans for Japan.",
    strengths: [
      "Digital setup",
      "No rental device",
      "Useful alternative for compatible phones",
    ],
    caution:
      "Check current plan validity, supported networks, and installation instructions.",
    reviewHref: "/reviews/ubigi",
    affiliateStatus: "not-configured",
  },
  {
    slug: "nomad-esim",
    name: "Nomad eSIM",
    category: "eSIM",
    fit: "Travelers who want to compare several digital data packages.",
    strengths: [
      "Remote purchase",
      "No airport pickup",
      "Multiple plan sizes may be available",
    ],
    caution:
      "Plan conditions can change, so confirm activation and refund rules before purchase.",
    reviewHref: "/reviews/nomad-esim",
    affiliateStatus: "not-configured",
  },
  {
    slug: "japan-wireless",
    name: "Japan Wireless",
    category: "Pocket Wi-Fi · SIM",
    fit: "Groups and travelers who need several devices connected during the trip.",
    strengths: [
      "Pocket Wi-Fi options",
      "Useful for device sharing",
      "Physical delivery or pickup may be available",
    ],
    caution:
      "Check delivery deadlines, return method, battery use, and rental conditions.",
    reviewHref: "/reviews/japan-wireless",
    affiliateStatus: "pending",
  },
  {
    slug: "ninja-wifi",
    name: "NINJA WiFi",
    category: "Pocket Wi-Fi",
    fit: "Travelers who prefer a rental router and airport-oriented collection.",
    strengths: [
      "Multiple-device connection",
      "No phone SIM replacement",
      "Useful for families and groups",
    ],
    caution:
      "Confirm pickup location, opening hours, return rules, and additional rental charges.",
    reviewHref: "/reviews/ninja-wifi",
    affiliateStatus: "pending",
  },
];

export function getConnectivityProvider(slug: string) {
  return connectivityProviders.find((provider) => provider.slug === slug);
}

export function getProviderOutboundUrl(provider: ConnectivityProvider) {
  return provider.affiliateUrl || provider.officialUrl || provider.reviewHref;
}

export function hasProviderOutboundUrl(provider: ConnectivityProvider) {
  return Boolean(provider.affiliateUrl || provider.officialUrl);
}

export function isAffiliateProviderLink(provider: ConnectivityProvider) {
  return provider.affiliateStatus === "active" && Boolean(provider.affiliateUrl);
}
