export type ProviderReview = {
  slug: string;
  name: string;
  category: string;
  connectionTypes: string[];
  summary: string;
  bestFor: string[];
  strengths: string[];
  considerations: string[];
  checkBeforeBuying: string[];
  officialUrl: string;
  affiliateUrl: string;
};

export const providerReviews: ProviderReview[] = [
  {
    slug: "sakura-mobile",
    name: "Sakura Mobile",
    category: "Japan-focused connectivity provider",
    connectionTypes: ["eSIM", "Physical SIM", "Pocket Wi-Fi"],
    summary:
      "Sakura Mobile is a useful starting point for travelers who want Japan-focused service and several connection options in one place.",
    bestFor: [
      "Travelers who want English-language guidance",
      "Visitors comparing eSIM, physical SIM, and pocket Wi-Fi",
      "Travelers staying for either a short trip or a longer period",
      "People who prefer a provider focused specifically on Japan",
    ],
    strengths: [
      "Several connection types are available to compare",
      "Japan-focused setup and support information",
      "Options may suit both short visits and longer stays",
      "Useful when eSIM compatibility is uncertain",
    ],
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
    officialUrl: "https://www.sakuramobile.jp/",
    affiliateUrl: "",
  },
  {
    slug: "ninja-wifi",
    name: "NINJA WiFi",
    category: "Japan pocket Wi-Fi and travel connectivity",
    connectionTypes: ["Pocket Wi-Fi", "eSIM", "Physical SIM"],
    summary:
      "NINJA WiFi is especially relevant for families, groups, and travelers who need to connect several devices during a trip to Japan.",
    bestFor: [
      "Families and groups",
      "Travelers carrying phones, tablets, and laptops",
      "Visitors who prefer airport pickup or physical delivery",
      "People who do not want to change the SIM in their phone",
    ],
    strengths: [
      "Pocket Wi-Fi can connect several devices",
      "Suitable for phones and larger devices such as laptops",
      "Physical pickup and delivery options may be available",
      "Useful when travelers want to share one connection",
    ],
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
    officialUrl: "https://ninjawifi.com/en/",
    affiliateUrl: "",
  },
  {
    slug: "airalo",
    name: "Airalo",
    category: "International travel eSIM provider",
    connectionTypes: ["eSIM"],
    summary:
      "Airalo may suit travelers who want to purchase and install a digital Japan data plan before departure without collecting a physical product.",
    bestFor: [
      "Solo travelers using one unlocked eSIM-compatible phone",
      "Visitors who want digital delivery",
      "Travelers who prefer installation before flying",
      "People visiting multiple countries",
    ],
    strengths: [
      "No physical pickup or return",
      "Installation can usually be prepared digitally",
      "A broad international travel focus",
      "Convenient for travelers already familiar with eSIM setup",
    ],
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
    officialUrl: "https://www.airalo.com/",
    affiliateUrl: "",
  },
  {
    slug: "ubigi",
    name: "Ubigi",
    category: "International travel eSIM provider",
    connectionTypes: ["eSIM"],
    summary:
      "Ubigi is another digital eSIM option for travelers comparing prepaid mobile-data plans for Japan.",
    bestFor: [
      "Travelers comparing several eSIM providers",
      "Visitors who want digital setup",
      "People using an unlocked eSIM-compatible device",
      "Travelers who may need connectivity in other destinations",
    ],
    strengths: [
      "Digital purchase and installation",
      "No rental device to collect or return",
      "Provides an alternative when comparing Japan eSIM plans",
      "International destination coverage may be useful for wider trips",
    ],
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
    officialUrl: "https://cellulardata.ubigi.com/",
    affiliateUrl: "",
  },
  {
    slug: "nomad-esim",
    name: "Nomad eSIM",
    category: "International travel eSIM provider",
    connectionTypes: ["eSIM"],
    summary:
      "Nomad eSIM may be worth comparing when a traveler wants a fully digital data option for Japan and is checking several eSIM plan structures.",
    bestFor: [
      "Travelers comparing eSIM prices and validity periods",
      "Visitors who want digital delivery",
      "People with an unlocked eSIM-compatible phone",
      "Travelers comfortable managing mobile-data settings",
    ],
    strengths: [
      "No physical collection or return",
      "Can be considered alongside other travel eSIM providers",
      "Digital setup may be completed before or during travel",
      "Useful for travelers prioritizing convenience",
    ],
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
    officialUrl: "https://www.getnomad.app/",
    affiliateUrl: "",
  },
  {
    slug: "japan-wireless",
    name: "Japan Wireless",
    category: "Japan travel connectivity provider",
    connectionTypes: ["Pocket Wi-Fi", "eSIM"],
    summary:
      "Japan Wireless may suit travelers comparing pocket Wi-Fi and digital connectivity options for a trip to Japan.",
    bestFor: [
      "Families and travelers with several devices",
      "Visitors comparing pocket Wi-Fi providers",
      "People who want a Japan-focused travel service",
      "Travelers who need internet for phones and laptops",
    ],
    strengths: [
      "Relevant for multi-device travel",
      "Japan-focused product information",
      "Pocket Wi-Fi can avoid changing the phone SIM",
      "May provide a useful alternative to other rental providers",
    ],
    considerations: [
      "Physical rental products need charging and return",
      "Delivery and collection conditions should be checked",
      "Rental fees may depend on dates and trip length",
      "Device loss, damage, and late return rules may apply",
    ],
    checkBeforeBuying: [
      "Delivery or airport collection options",
      "Return procedure",
      "Battery and connected-device limits",
      "Current plan availability",
      "Cancellation, extension, and equipment policies",
    ],
    officialUrl: "https://www.japan-wireless.com/",
    affiliateUrl: "",
  },
];

export function getProviderReview(
  slug: string,
): ProviderReview | undefined {
  return providerReviews.find(
    (provider) => provider.slug === slug,
  );
}

export function getProviderReviewUrl(
  provider: ProviderReview,
): string {
  return provider.affiliateUrl.trim() || provider.officialUrl;
}

export function isProviderAffiliateLink(
  provider: ProviderReview,
): boolean {
  return provider.affiliateUrl.trim().length > 0;
}
