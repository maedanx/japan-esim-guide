export type JapanWirelessServiceCategory =
  | "pocket-wifi"
  | "esim"
  | "train"
  | "airport-transfer"
  | "bus";

export type VerificationStatus = "verified" | "needs-verification" | "unknown";
export type AffiliateLinkStatus = "active" | "pending-link" | "unavailable";

export type MarketingClaim = {
  text: string;
  angle: "price" | "trust" | "ease" | "fomo" | "feature";
  verificationStatus: VerificationStatus;
  publicUse: boolean;
};

export type JapanWirelessService = {
  id: string;
  providerId: "japan-wireless";
  slug: string;
  name: string;
  category: JapanWirelessServiceCategory;
  status: "available" | "asset-only";
  officialUrl: string | null;
  affiliateUrl: string | null;
  affiliateLinkStatus: AffiliateLinkStatus;
  commission: { model: "percentage" | "fixed" | "unknown"; value: number | null; currency: "JPY" | null; note: string };
  features: string[];
  marketingClaims: MarketingClaim[];
  trustSignals: MarketingClaim[];
  ctaOptions: string[];
  assets: { logo: string; representativeBanner: string; assetDirectory: string; audience?: string[]; seasonal?: boolean };
  sourceNotes: string[];
};

export const japanWirelessProvider = {
  id: "japan-wireless" as const,
  slug: "japan-wireless",
  name: "Japan Wireless",
  status: "approved-campaign" as const,
  officialUrl: null,
  logo: "/assets/affiliates/japan-wireless/pocket-wifi/logo/japan-wireless-logo-variant-01.png",
  assetDirectory: "/assets/affiliates/japan-wireless",
};

const unverifiedUnlimitedClaims: MarketingClaim[] = [
  { text: "Unlimited data", angle: "feature", verificationStatus: "needs-verification", publicUse: false },
  { text: "No throttling", angle: "feature", verificationStatus: "needs-verification", publicUse: false },
  { text: "No daily caps", angle: "feature", verificationStatus: "needs-verification", publicUse: false },
];

export const japanWirelessServices: JapanWirelessService[] = [
  {
    id: "japan-wireless-pocket-wifi", providerId: "japan-wireless", slug: "japan-wireless-pocket-wifi", name: "Japan Wireless Pocket WiFi", category: "pocket-wifi", status: "available",
    officialUrl: null, affiliateUrl: null, affiliateLinkStatus: "pending-link",
    commission: { model: "unknown", value: null, currency: null, note: "Not stated in the supplied assets." },
    features: ["Airport pickup referenced in official copy", "Postbox return referenced in official copy", "Supports multiple devices", "Power bank referenced in official copy"],
    marketingClaims: [
      { text: "Airport pickup", angle: "ease", verificationStatus: "needs-verification", publicUse: false },
      { text: "Postbox return", angle: "ease", verificationStatus: "needs-verification", publicUse: false },
      { text: "Up to 10 devices", angle: "feature", verificationStatus: "needs-verification", publicUse: false },
      { text: "Free power bank", angle: "feature", verificationStatus: "needs-verification", publicUse: false },
      { text: "From $4.7 per day", angle: "price", verificationStatus: "needs-verification", publicUse: false },
      ...unverifiedUnlimitedClaims,
    ],
    trustSignals: [
      { text: "Trusted by 1.6 million travelers", angle: "trust", verificationStatus: "needs-verification", publicUse: false },
      { text: "Since 2012", angle: "trust", verificationStatus: "needs-verification", publicUse: false },
    ],
    ctaOptions: ["Check Rates & Availability", "Compare Plans", "Reserve Before Your Trip"],
    assets: { logo: "/assets/affiliates/japan-wireless/pocket-wifi/logo/japan-wireless-logo-variant-01.png", representativeBanner: "/assets/affiliates/japan-wireless/pocket-wifi/banners/japan-wireless-pocket-wifi-shibuya-1200x628.webp", assetDirectory: "/assets/affiliates/japan-wireless/pocket-wifi" },
    sourceNotes: ["Official affiliate ZIP and copywriting swipe file supplied 2026-07-23.", "All changing product claims require current-site verification before public use."],
  },
  {
    id: "japan-wireless-esim", providerId: "japan-wireless", slug: "japan-wireless-esim", name: "Japan Wireless eSIM", category: "esim", status: "available",
    officialUrl: null, affiliateUrl: null, affiliateLinkStatus: "pending-link",
    commission: { model: "percentage", value: 10, currency: null, note: "10% of sales, supplied by the campaign participant." },
    features: ["Digital setup", "No physical device pickup or return", "Requires an unlocked eSIM-compatible phone"],
    marketingClaims: [
      { text: "Instant activation", angle: "ease", verificationStatus: "needs-verification", publicUse: false },
      { text: "QR code delivery in two minutes", angle: "ease", verificationStatus: "needs-verification", publicUse: false },
      { text: "Free Pocket WiFi if the eSIM fails", angle: "trust", verificationStatus: "needs-verification", publicUse: false },
      ...unverifiedUnlimitedClaims,
    ],
    trustSignals: [{ text: "Provider since 2012", angle: "trust", verificationStatus: "needs-verification", publicUse: false }],
    ctaOptions: ["Check eSIM Compatibility", "Skip the Device Rental", "Connect on Arrival"],
    assets: { logo: "/assets/affiliates/japan-wireless/esim/logo/japan-wireless-esim-logo.png", representativeBanner: "/assets/affiliates/japan-wireless/esim/banners/japan-wireless-esim-1200x628.webp", assetDirectory: "/assets/affiliates/japan-wireless/esim" },
    sourceNotes: ["Official affiliate ZIP and copywriting swipe file supplied 2026-07-23.", "Commission terms beyond the percentage were not supplied."],
  },
  {
    id: "japan-bullet-train", providerId: "japan-wireless", slug: "japan-bullet-train", name: "Japan Bullet Train", category: "train", status: "asset-only",
    officialUrl: null, affiliateUrl: null, affiliateLinkStatus: "pending-link",
    commission: { model: "fixed", value: 1000, currency: "JPY", note: "Per booking, supplied by the campaign participant." },
    features: [], marketingClaims: [], trustSignals: [], ctaOptions: [],
    assets: { logo: "/assets/affiliates/japan-wireless/shinkansen/logo/japan-bullet-train-logo-white.png", representativeBanner: "/assets/affiliates/japan-wireless/shinkansen/banners/japan-bullet-train-1200x628.webp", assetDirectory: "/assets/affiliates/japan-wireless/shinkansen", seasonal: true },
    sourceNotes: ["Seasonal festival and fireworks assets are stored but not intended for permanent display."],
  },
  {
    id: "airport-taxi", providerId: "japan-wireless", slug: "airport-taxi", name: "Airport Taxi", category: "airport-transfer", status: "asset-only",
    officialUrl: null, affiliateUrl: null, affiliateLinkStatus: "pending-link",
    commission: { model: "fixed", value: 1100, currency: "JPY", note: "Per booking, supplied by the campaign participant." },
    features: [], marketingClaims: [], trustSignals: [], ctaOptions: [],
    assets: { logo: "/assets/affiliates/japan-wireless/airport-taxi/logo/airport-taxi-logo-01.png", representativeBanner: "/assets/affiliates/japan-wireless/airport-taxi/banners/family-group/airport-taxi-family-group-1200x628.webp", assetDirectory: "/assets/affiliates/japan-wireless/airport-taxi", audience: ["business-elite", "family-group"] },
    sourceNotes: ["Business Elite and Family & Group variants are kept as separate audience assets."],
  },
  {
    id: "japan-bus-tickets", providerId: "japan-wireless", slug: "japan-bus-tickets", name: "Japan Bus Tickets", category: "bus", status: "asset-only",
    officialUrl: null, affiliateUrl: null, affiliateLinkStatus: "pending-link",
    commission: { model: "fixed", value: 300, currency: "JPY", note: "Per booking, supplied by the campaign participant." },
    features: [], marketingClaims: [], trustSignals: [], ctaOptions: [],
    assets: { logo: "/assets/affiliates/japan-wireless/bus-tickets/logo/japan-bus-tickets-logo.png", representativeBanner: "/assets/affiliates/japan-wireless/bus-tickets/banners/japan-bus-tickets-mt-fuji-1200x628.webp", assetDirectory: "/assets/affiliates/japan-wireless/bus-tickets" },
    sourceNotes: ["Official logo and Mt. Fuji generic banners supplied."],
  },
];

export const japanWirelessConnectivityServices = japanWirelessServices.filter(
  (service) => service.category === "pocket-wifi" || service.category === "esim",
);

export const japanWirelessTransportServices = japanWirelessServices.filter(
  (service) => !japanWirelessConnectivityServices.includes(service),
);
