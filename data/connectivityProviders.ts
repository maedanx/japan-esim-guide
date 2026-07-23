export type ConnectivityProvider = {
  slug: string;
  name: string;
  /** Short connection-type label used for compare/diagnosis filtering, e.g. "eSIM · SIM · Pocket Wi-Fi". */
  category: string;
  /** Individual connection types for the review-page badges, e.g. ["eSIM", "Physical SIM"]. */
  connectionTypes: string[];
  /** One-line descriptive tagline shown on the review page eyebrow. */
  tagline: string;
  /** Short compare-card summary. */
  fit: string;
  /** Long-form summary shown on the review page. */
  summary: string;
  /** Who may consider this provider (review page). */
  bestFor: string[];
  /** Short strengths list for the compare-page card. */
  strengths: string[];
  /** Longer strengths list for the review page. */
  reviewStrengths: string[];
  /** Single caution line for the compare-page card. */
  caution: string;
  /** Numbered considerations list for the review page. */
  considerations: string[];
  /** Checklist shown on the review page before buying. */
  checkBeforeBuying: string[];
  reviewHref: string;
  officialUrl?: string;
  affiliateUrl?: string;
  affiliateStatus: "approved" | "pending" | "unavailable";
  /** Affiliate network/program name, for internal bookkeeping only. */
  affiliateNetwork?: string;
  /** Optional per-provider disclosure line to show next to an active affiliate CTA. */
  affiliateDisclosure?: string;
  /** Optional CTA copy override; falls back to each page's default label when unset. */
  ctaLabel?: string;
};

export const connectivityProviders: ConnectivityProvider[] = [
  {
    slug: "sakura-mobile",
    name: "Sakura Mobile",
    category: "eSIM · SIM · Pocket Wi-Fi",
    connectionTypes: ["eSIM", "Physical SIM", "Pocket Wi-Fi"],
    tagline: "Japan-focused connectivity provider",
    fit: "Travelers who value Japan-focused information and English-language guidance.",
    summary:
      "Sakura Mobile is a useful starting point for travelers who want Japan-focused service and several connection options in one place.",
    bestFor: [
      "Travelers who want English-language guidance",
      "Visitors comparing eSIM, physical SIM, and pocket Wi-Fi",
      "Travelers staying for either a short trip or a longer period",
      "People who prefer a provider focused specifically on Japan",
    ],
    strengths: [
      "Several connection types",
      "Japan-focused support",
      "Options for short and longer stays",
    ],
    reviewStrengths: [
      "Several connection types are available to compare",
      "Japan-focused setup and support information",
      "Options may suit both short visits and longer stays",
      "Useful when eSIM compatibility is uncertain",
    ],
    caution:
      "Compare the exact product because setup, pickup, validity, and pricing differ.",
    considerations: [
      "The available data, validity, and delivery conditions depend on the selected product",
      "Physical products may require delivery or collection",
      "Tethering and activation rules should be checked for the exact plan",
      "The lowest-cost option may differ according to trip length",
    ],
    checkBeforeBuying: [
      "Whether the phone is unlocked and eSIM-compatible",
      "When the plan validity period begins",
      "Delivery or pickup deadlines",
      "Tethering and fair-use conditions",
      "Cancellation and refund terms",
    ],
    reviewHref: "/reviews/sakura-mobile",
    officialUrl: "https://www.sakuramobile.jp/",
    affiliateUrl: "",
    affiliateStatus: "pending",
  },
  {
    slug: "airalo",
    name: "Airalo",
    category: "eSIM",
    connectionTypes: ["eSIM"],
    tagline: "International travel eSIM provider",
    fit: "Solo travelers who want a fully digital purchase and installation process.",
    summary:
      "Airalo may suit travelers who want to purchase and install a digital Japan data plan before departure without collecting a physical product.",
    bestFor: [
      "Solo travelers using one unlocked eSIM-compatible phone",
      "Visitors who want digital delivery",
      "Travelers who prefer installation before flying",
      "People visiting multiple countries",
    ],
    strengths: [
      "No physical collection",
      "Pre-trip installation",
      "Simple digital plan selection",
    ],
    reviewStrengths: [
      "No physical pickup or return",
      "Installation can usually be prepared digitally",
      "A broad international travel focus",
      "Convenient for travelers already familiar with eSIM setup",
    ],
    caution:
      "Confirm phone compatibility, activation timing, data allowance, and hotspot rules.",
    considerations: [
      "The phone must support eSIM and be carrier-unlocked",
      "Activation timing differs between plans",
      "Some plans may provide data only rather than a local phone number",
      "Tethering and network conditions should be checked before purchase",
    ],
    checkBeforeBuying: [
      "Exact phone model compatibility",
      "When the validity period starts",
      "Included data and speed-reduction conditions",
      "Tethering availability",
      "Refund rules for installation or compatibility problems",
    ],
    reviewHref: "/reviews/airalo",
    officialUrl: "https://www.airalo.com/",
    affiliateUrl: "",
    affiliateStatus: "unavailable",
  },
  {
    slug: "ubigi",
    name: "Ubigi",
    category: "eSIM",
    connectionTypes: ["eSIM"],
    tagline: "International travel eSIM provider",
    fit: "Travelers comparing alternative prepaid eSIM plans for Japan.",
    summary:
      "Ubigi is another digital eSIM option for travelers comparing prepaid mobile-data plans for Japan.",
    bestFor: [
      "Travelers comparing several eSIM providers",
      "Visitors who want digital setup",
      "People using an unlocked eSIM-compatible device",
      "Travelers who may need connectivity in other destinations",
    ],
    strengths: [
      "Digital setup",
      "No rental device",
      "Useful alternative for compatible phones",
    ],
    reviewStrengths: [
      "Digital purchase and installation",
      "No rental device to collect or return",
      "Provides an alternative when comparing Japan eSIM plans",
      "International destination coverage may be useful for wider trips",
    ],
    caution:
      "Check current plan validity, supported networks, and installation instructions.",
    considerations: [
      "Device compatibility must be confirmed before purchase",
      "Plan conditions vary by destination and product",
      "Coverage and speed are not identical in every location",
      "Hotspot and validity rules should be checked for the selected plan",
    ],
    checkBeforeBuying: [
      "Supported device and operating-system version",
      "Data allowance and validity",
      "Activation instructions",
      "Hotspot conditions",
      "Cancellation and refund rules",
    ],
    reviewHref: "/reviews/ubigi",
    officialUrl: "https://cellulardata.ubigi.com/",
    affiliateUrl: "",
    affiliateStatus: "unavailable",
  },
  {
    slug: "nomad-esim",
    name: "Nomad eSIM",
    category: "eSIM",
    connectionTypes: ["eSIM"],
    tagline: "International travel eSIM provider",
    fit: "Travelers who want to compare several digital data packages.",
    summary:
      "Nomad eSIM may be worth comparing when a traveler wants a fully digital data option for Japan and is checking several eSIM plan structures.",
    bestFor: [
      "Travelers comparing eSIM prices and validity periods",
      "Visitors who want digital delivery",
      "People with an unlocked eSIM-compatible phone",
      "Travelers comfortable managing mobile-data settings",
    ],
    strengths: [
      "Remote purchase",
      "No airport pickup",
      "Multiple plan sizes may be available",
    ],
    reviewStrengths: [
      "No physical collection or return",
      "Can be considered alongside other travel eSIM providers",
      "Digital setup may be completed before or during travel",
      "Useful for travelers prioritizing convenience",
    ],
    caution:
      "Plan conditions can change, so confirm activation and refund rules before purchase.",
    considerations: [
      "Exact plans and availability may change",
      "The start of validity must be confirmed",
      "Device and carrier-lock compatibility remain essential",
      "Support, tethering, and refund terms vary by product",
    ],
    checkBeforeBuying: [
      "Current Japan plan availability",
      "Supported networks and coverage information",
      "Activation timing",
      "Tethering support",
      "Refund and cancellation policy",
    ],
    reviewHref: "/reviews/nomad-esim",
    officialUrl: "https://www.getnomad.app/",
    affiliateUrl: "",
    affiliateStatus: "unavailable",
  },
  {
    slug: "japan-wireless",
    name: "Japan Wireless",
    category: "Pocket Wi-Fi · eSIM",
    connectionTypes: ["Pocket Wi-Fi", "eSIM"],
    tagline: "Japan travel connectivity provider",
    fit: "Groups who want a shareable Pocket WiFi router, and solo travelers who prefer a fully digital eSIM setup.",
    summary:
      "Japan Wireless offers both a Pocket WiFi rental and an eSIM data plan for travelers in Japan. Pocket WiFi suits groups sharing one connection, while the eSIM option suits solo travelers who prefer a fully digital setup with no physical pickup or return.",
    bestFor: [
      "Families and groups who want a shared Pocket WiFi router",
      "Solo travelers using an unlocked eSIM-compatible phone",
      "Visitors comparing pocket Wi-Fi and eSIM options from one provider",
      "People who want a Japan-focused travel service",
    ],
    strengths: [
      "Pocket Wi-Fi and eSIM options from one provider",
      "Useful for device sharing or a fully digital setup",
      "Physical delivery or pickup may be available for Pocket Wi-Fi",
    ],
    reviewStrengths: [
      "Offers both Pocket Wi-Fi rental and an eSIM data plan",
      "Pocket Wi-Fi can avoid changing the phone SIM",
      "The eSIM option avoids physical pickup or return",
      "May provide a useful alternative to other rental or digital providers",
    ],
    caution:
      "Confirm current pricing, data conditions, and pickup or activation details for the selected product on the official site.",
    considerations: [
      "Physical Pocket Wi-Fi rentals need charging and return; the eSIM option does not",
      "Delivery and collection conditions apply only to the Pocket Wi-Fi rental",
      "Rental fees may depend on dates and trip length",
      "eSIM device and carrier-lock compatibility should be confirmed before purchase",
    ],
    checkBeforeBuying: [
      "Which product, Pocket Wi-Fi or eSIM, fits your trip",
      "Delivery or airport collection options for Pocket Wi-Fi",
      "Return procedure for Pocket Wi-Fi",
      "Phone eSIM compatibility if choosing the eSIM option",
      "Current plan availability and cancellation policy",
    ],
    reviewHref: "/reviews/japan-wireless",
    officialUrl: "https://www.japan-wireless.com/",
    affiliateUrl: "",
    affiliateStatus: "pending",
  },
  {
    slug: "ninja-wifi",
    name: "NINJA WiFi",
    category: "Pocket Wi-Fi",
    connectionTypes: ["Pocket Wi-Fi", "eSIM", "Physical SIM"],
    tagline: "Japan pocket Wi-Fi and travel connectivity",
    fit: "Travelers who prefer a rental router and airport-oriented collection.",
    summary:
      "NINJA WiFi is especially relevant for families, groups, and travelers who need to connect several devices during a trip to Japan.",
    bestFor: [
      "Families and groups",
      "Travelers carrying phones, tablets, and laptops",
      "Visitors who prefer airport pickup or physical delivery",
      "People who do not want to change the SIM in their phone",
    ],
    strengths: [
      "Multiple-device connection",
      "No phone SIM replacement",
      "Useful for families and groups",
    ],
    reviewStrengths: [
      "Pocket Wi-Fi can connect several devices",
      "Suitable for phones and larger devices such as laptops",
      "Physical pickup and delivery options may be available",
      "Useful when travelers want to share one connection",
    ],
    caution:
      "Confirm pickup location, opening hours, return rules, and additional rental charges.",
    considerations: [
      "A pocket Wi-Fi device must be carried and charged",
      "Rental equipment normally needs to be returned",
      "Loss, damage, late return, or extension fees may apply",
      "Actual performance varies by location and network conditions",
    ],
    checkBeforeBuying: [
      "Pickup location and opening hours",
      "Return location and deadline",
      "Battery expectations",
      "Number of supported connected devices",
      "Rental extension, cancellation, and damage policies",
    ],
    reviewHref: "/reviews/ninja-wifi",
    officialUrl: "https://ninjawifi.com/en/",
    affiliateUrl: "",
    affiliateStatus: "pending",
  },
];

export function getConnectivityProvider(slug: string) {
  return connectivityProviders.find((provider) => provider.slug === slug);
}

export function isAffiliateProviderLink(provider: ConnectivityProvider) {
  return provider.affiliateStatus === "approved" && Boolean(provider.affiliateUrl);
}

/**
 * The outbound URL to use for an "apply" / "check plans" CTA: the approved
 * affiliate link when available, otherwise the official site. Returns
 * undefined when neither exists, so callers can hide the CTA entirely.
 */
export function getProviderDestination(
  provider: ConnectivityProvider,
): string | undefined {
  if (isAffiliateProviderLink(provider)) return provider.affiliateUrl;
  return provider.officialUrl || undefined;
}

export function hasProviderOutboundUrl(provider: ConnectivityProvider) {
  return Boolean(getProviderDestination(provider));
}

export function getProviderCtaLabel(
  provider: ConnectivityProvider,
  fallbackLabel: string,
) {
  return provider.ctaLabel || fallbackLabel;
}
