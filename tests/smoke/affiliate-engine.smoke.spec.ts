import { expect, test } from "@playwright/test";
import {
  connectivityProviders,
  getProviderDestination,
  isAffiliateProviderLink,
  type ConnectivityProvider,
} from "@/data/connectivityProviders";

function baseProvider(overrides: Partial<ConnectivityProvider>): ConnectivityProvider {
  return {
    slug: "test-provider",
    name: "Test Provider",
    category: "eSIM",
    connectionTypes: ["eSIM"],
    tagline: "Test provider",
    fit: "Test fit",
    summary: "Test summary",
    bestFor: [],
    strengths: [],
    reviewStrengths: [],
    caution: "Test caution",
    considerations: [],
    checkBeforeBuying: [],
    reviewHref: "/reviews/test-provider",
    affiliateStatus: "unavailable",
    ...overrides,
  };
}

test("approved provider with an affiliate URL uses the affiliate URL", () => {
  const provider = baseProvider({
    affiliateStatus: "approved",
    affiliateUrl: "https://affiliate.example.com/test?ref=abc",
    officialUrl: "https://official.example.com/",
  });
  expect(getProviderDestination(provider)).toBe("https://affiliate.example.com/test?ref=abc");
  expect(isAffiliateProviderLink(provider)).toBe(true);
});

test("pending or unavailable providers fall back to the official URL", () => {
  for (const affiliateStatus of ["pending", "unavailable"] as const) {
    const provider = baseProvider({
      affiliateStatus,
      affiliateUrl: "https://affiliate.example.com/should-not-be-used",
      officialUrl: "https://official.example.com/?promo=summer",
    });
    expect(getProviderDestination(provider)).toBe("https://official.example.com/?promo=summer");
    expect(isAffiliateProviderLink(provider)).toBe(false);
  }
});

test("a provider with no affiliate or official URL has no outbound destination", () => {
  const provider = baseProvider({ affiliateStatus: "unavailable" });
  expect(getProviderDestination(provider)).toBeUndefined();
});

test("official URLs already in the data source keep their query strings unmodified", () => {
  for (const provider of connectivityProviders) {
    if (!provider.officialUrl) continue;
    expect(getProviderDestination(provider)).toBe(provider.officialUrl);
  }
});
