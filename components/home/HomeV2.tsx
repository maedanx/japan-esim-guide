"use client";

import { useMemo, useState, type ReactNode } from "react";

const airports = [
  { label: "Narita", code: "NRT" },
  { label: "Haneda", code: "HND" },
  { label: "Kansai", code: "KIX" },
  { label: "Fukuoka", code: "FUK" },
];

const durations = ["3–5 days", "7 days", "14 days", "30+ days"];

const cities = ["Tokyo", "Kyoto", "Osaka", "Hokkaido"];
const travelStyles = ["Easy", "Budget", "Fast", "Family"];

type IconName = "plane" | "calendar" | "signal" | "wifi" | "sim" | "train" | "card" | "shield" | "scale" | "refresh" | "ban" | "ticket";


type RecommendationItem = {
  icon: IconName;
  name: string;
  provider: string;
  price: string;
  priceNote: string;
  reason: string;
  badge: string;
  bestFor: string;
  highlights: string[];
  caution: string;
  href: string;
  officialHref: string;
};

const durationDays = (duration: string) => {
  if (duration === "3–5 days") return 5;
  if (duration === "7 days") return 7;
  if (duration === "14 days") return 14;
  return 30;
};

function testIdPart(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const needs: { label: string; icon: IconName }[] = [
  { label: "eSIM", icon: "signal" },
  { label: "Pocket WiFi", icon: "wifi" },
  { label: "SIM Card", icon: "sim" },
  { label: "JR Pass", icon: "train" },
  { label: "Suica / IC", icon: "card" },
];

const categories: { icon: IconName; title: string; detail: string; href: string }[] = [
  { icon: "signal", title: "Internet", detail: "eSIM, WiFi, SIM", href: "/esim" },
  { icon: "train", title: "Transport", detail: "Trains and buses", href: "/compare" },
  { icon: "plane", title: "Airport", detail: "Transfers and pickup", href: "/airport" },
  { icon: "ticket", title: "Tickets", detail: "Attractions and passes", href: "/compare" },
  { icon: "card", title: "Money", detail: "IC cards and payments", href: "/compare" },
];

const products: { badge: string; title: string; detail: string; provider: string; note: string; href: string; icon: IconName }[] = [
  { badge: "START HERE", title: "eSIM", detail: "Digital setup before arrival", provider: "Compare Japan eSIM options", note: "Best for compatible unlocked phones", href: "/best-esim-japan", icon: "signal" },
  { badge: "GROUP OPTION", title: "Pocket WiFi", detail: "Share data across devices", provider: "Compare rental considerations", note: "Best for families and groups", href: "/pocket-wifi", icon: "wifi" },
  { badge: "COMPATIBILITY", title: "Physical SIM", detail: "A removable SIM for your phone", provider: "Review setup and pickup needs", note: "Useful when eSIM is unavailable", href: "/sim-card", icon: "sim" },
  { badge: "NOT SURE?", title: "30-sec check", detail: "Answer eight trip questions", provider: "Get a practical starting point", note: "No email or sign-up required", href: "/diagnosis", icon: "shield" },
];

export default function HomeV2() {
  const [airport, setAirport] = useState("NRT");
  const [duration, setDuration] = useState("7 days");
  const [selectedNeeds, setSelectedNeeds] = useState(["eSIM", "Suica / IC"]);
  const [selectedCities, setSelectedCities] = useState(["Tokyo", "Kyoto"]);
  const [travelStyle, setTravelStyle] = useState("Easy");

  const toggleCity = (city: string) => {
    setSelectedCities((current) => {
      if (current.includes(city)) {
        // Keep at least one destination selected so recommendations always stay valid.
        return current.length === 1 ? current : current.filter((item) => item !== city);
      }
      return [...current, city];
    });
  };

  const toggleNeed = (need: string) => {
    setSelectedNeeds((current) =>
      current.includes(need) ? current.filter((item) => item !== need) : [...current, need],
    );
  };

  const travelKit = useMemo<RecommendationItem[]>(() => {
    const kit: RecommendationItem[] = [];
    const days = durationDays(duration);
    const visitsTokyo = selectedCities.includes("Tokyo");
    const visitsKansai = selectedCities.includes("Kyoto") || selectedCities.includes("Osaka");
    const multiRegion = selectedCities.includes("Hokkaido") || (visitsTokyo && visitsKansai);

    if (selectedNeeds.includes("SIM Card") || days >= 30) {
      kit.push({
        icon: "sim",
        name: "Long-stay SIM",
        provider: "Compare prepaid SIM plans",
        price: "Compare plans",
        priceNote: "Varies by data and duration",
        reason: "Better suited to longer stays and travelers who want a Japanese phone number.",
        badge: days >= 30 ? "BEST FOR LONG STAYS" : "MATCHED TO YOUR NEEDS",
        bestFor: "30+ day stays or travelers needing a local number",
        highlights: ["Physical SIM options", "Long-stay data plans"],
        caution: "Check phone unlock status and supported SIM size before ordering.",
        href: "/sim-card",
        officialHref: "/sim-card",
      });
    } else if (selectedNeeds.includes("Pocket WiFi") || travelStyle === "Family") {
      kit.push({
        icon: "wifi",
        name: "Pocket WiFi",
        provider: "Compare shared-data options",
        price: "Compare prices",
        priceNote: "Daily rental varies by provider",
        reason: travelStyle === "Family"
          ? "One device can connect several family phones and tablets."
          : "A practical choice when several devices need reliable data.",
        badge: travelStyle === "Family" ? "BEST MATCH" : "SHARED DATA PICK",
        bestFor: "Families, groups, and travelers carrying several devices",
        highlights: ["Connect multiple devices", "No eSIM compatibility needed"],
        caution: "Requires charging, pickup or delivery, and return after your trip.",
        href: "/pocket-wifi",
        officialHref: "/pocket-wifi",
      });
    } else {
      kit.push({
        icon: "signal",
        name: "Travel eSIM",
        provider: "Compare compatible eSIM plans",
        price: "From low-cost plans",
        priceNote: "Depends on data allowance",
        reason: travelStyle === "Budget"
          ? "Usually the simplest low-cost option for one compatible phone."
          : "Fast setup without airport pickup or carrying another device.",
        badge: travelStyle === "Budget" ? "BEST VALUE MATCH" : "BEST MATCH",
        bestFor: "Solo travelers with an unlocked, eSIM-compatible phone",
        highlights: ["No pickup or return", "Activate before landing"],
        caution: "Confirm that your phone is unlocked and supports eSIM before purchase.",
        href: "/best-esim-japan",
        officialHref: "/best-esim-japan",
      });
    }

    if (multiRegion && days >= 7) {
      kit.push({
        icon: "train",
        name: "Long-distance rail check",
        provider: "JR Pass vs individual tickets",
        price: "Check value",
        priceNote: "Pass vs individual fares",
        reason: "Your route crosses regions, so compare a rail pass with point-to-point fares before buying.",
        badge: "ROUTE-SENSITIVE",
        bestFor: "Travelers making several expensive intercity journeys",
        highlights: ["Compare total route cost", "Avoid unnecessary pass spending"],
        caution: "A nationwide pass is not automatically cheaper for every multi-city trip.",
        href: "/compare",
        officialHref: "/diagnosis",
      });
    } else {
      const airportTransfer = {
        NRT: "Narita Express or Skyliner",
        HND: "Tokyo Monorail or Keikyu",
        KIX: "HARUKA or Nankai",
        FUK: "Fukuoka City Subway",
      }[airport] ?? "Airport transfer options";
      kit.push({
        icon: "plane",
        name: "Airport transfer",
        provider: airportTransfer,
        price: "See options",
        priceNote: "Fare depends on route",
        reason: `Matched to your ${airport} arrival and selected route.`,
        badge: "ARRIVAL MATCH",
        bestFor: `A smoother first journey from ${airport}`,
        highlights: ["Airport-specific options", "Compare speed and convenience"],
        caution: "The fastest option may not be the cheapest for your hotel location.",
        href: "/airport",
        officialHref: "/airport",
      });
    }

    if (selectedNeeds.includes("Suica / IC") || selectedCities.length > 0) {
      kit.push({
        icon: "card",
        name: "IC transit card",
        provider: "Suica / PASMO / regional IC",
        price: "Setup guide",
        priceNote: "Card balance is separate",
        reason: "Useful for local trains, subways, buses, and many small purchases.",
        badge: "LOCAL TRAVEL ESSENTIAL",
        bestFor: "Everyday city transport and small contactless purchases",
        highlights: ["Tap-and-go local travel", "Works across many regions"],
        caution: "An IC card does not replace every reserved or long-distance ticket.",
        href: "/compare",
        officialHref: "/compare",
      });
    }

    if (selectedNeeds.includes("JR Pass") && !multiRegion) {
      kit.push({
        icon: "scale",
        name: "JR Pass value check",
        provider: "Pass may not be necessary",
        price: "Check first",
        priceNote: "Do not buy automatically",
        reason: "A mostly local route often costs less with individual tickets or regional passes.",
        badge: "SAVE BEFORE BUYING",
        bestFor: "Travelers unsure whether a nationwide pass pays off",
        highlights: ["Route-based value check", "Regional alternatives considered"],
        caution: "Pass value depends on your exact travel dates and long-distance journeys.",
        href: "/diagnosis",
        officialHref: "/diagnosis",
      });
    }

    return kit.slice(0, 4);
  }, [airport, duration, selectedCities, selectedNeeds, travelStyle]);

  const recommendationSummary = useMemo(() => {
    const cityText = selectedCities.length ? selectedCities.join(" + ") : "your route";
    const styleText = {
      Easy: "Simple, low-stress picks",
      Budget: "Lower-cost picks",
      Fast: "Time-saving picks",
      Family: "Family-friendly picks",
    }[travelStyle] ?? "Practical picks";
    return `${styleText} for ${cityText}`;
  }, [selectedCities, travelStyle]);

  const recommendationInsights = useMemo(() => {
    const days = durationDays(duration);
    const insights = [
      `${airport} arrival considered`,
      `${duration} stay considered`,
      `${selectedCities.length} ${selectedCities.length === 1 ? "city" : "cities"} selected`,
    ];
    if (days >= 7 && selectedCities.length > 1) insights.push("Multi-city transport checked");
    if (travelStyle === "Budget") insights.push("Lower-cost options prioritized");
    if (travelStyle === "Family") insights.push("Shared and low-stress options prioritized");
    return insights.slice(0, 4);
  }, [airport, duration, selectedCities.length, travelStyle]);

  return (
    <>
      <section className="v24-mobile-home v25-mobile-home">
        <div className="v24-mobile-hero v25-mobile-hero">
          <p className="v24-eyebrow">YOUR JAPAN TRIP, SORTED</p>
          <h1>Japan travel,<br />sorted in 60 seconds.</h1>
          <a className="v25-hero-cta" href="#mobile-planner">
            Start My Travel Plan <ArrowIcon />
          </a>
          <p>Choose your route and travel style. Your recommendations update instantly.</p>
          <div className="v25-hero-proof" aria-label="Planner benefits">
            <span>Independent picks</span><span>No sponsored ranking</span>
          </div>
        </div>

        <aside className="v24-mobile-kit v25-mobile-kit" id="mobile-travel-kit">
          <div className="v24-kit-head">
            <div><small>YOUR STARTER PLAN</small><h2>Your Travel Kit</h2></div>
            <span>Live preview</span>
          </div>
          <div className="v24-kit-meta"><span>{airport}</span><span>{duration}</span><span>{travelStyle}</span></div>
          <p className="v26-kit-reason">{recommendationSummary}</p>
          <div className="v28-recommendation-list">
            {travelKit.map((item, index) => (
              <article className={`v28-recommendation-card${index === 0 ? " is-primary" : ""}`} key={item.name}>
                <div className="v28-card-topline">
                  <span className="v28-card-badge">{index === 0 ? "#1 " : ""}{item.badge}</span>
                  <span className="v28-affiliate-label">Independent recommendation</span>
                </div>
                <div className="v28-card-heading">
                  <span className="v24-kit-icon"><Icon name={item.icon} /></span>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.provider}</p>
                  </div>
                  <div className="v28-card-price"><strong>{item.price}</strong><small>{item.priceNote}</small></div>
                </div>
                <p className="v28-card-reason">{item.reason}</p>
                <div className="v28-best-for"><strong>Best for</strong><span>{item.bestFor}</span></div>
                <ul className="v28-highlight-list">
                  {item.highlights.map((highlight) => <li key={highlight}>✓ {highlight}</li>)}
                </ul>
                <p className="v28-card-caution"><strong>Before choosing:</strong> {item.caution}</p>
                <div className="v28-card-actions">
                  <a className="v28-secondary-action" href={item.href}>See details</a>
                  <a className="v28-primary-action" href={item.officialHref}>Compare options <ArrowIcon /></a>
                </div>
              </article>
            ))}
          </div>
          <div className="v27-why">
            <strong>Why these picks</strong>
            <div>{recommendationInsights.map((item) => <span key={item}>✓ {item}</span>)}</div>
          </div>
          <a className="v24-kit-link" href="/diagnosis">Review full recommendation <ArrowIcon /></a>
        </aside>

        <div className="v25-section-intro" id="mobile-planner">
          <small>4 QUICK STEPS</small>
          <h2>Make it yours</h2>
          <p>Your recommendations and reasons update as you choose.</p>
        </div>

        <div className="v24-mobile-planner v25-mobile-planner">
          <div className="v24-step">
            <div className="v24-step-title"><span>1</span><Icon name="plane" /><strong>Where do you arrive?</strong></div>
            <div className="v24-chip-grid v24-chip-grid--two">
              {airports.map((item) => (
                <button type="button" key={item.code} data-testid={`airport-${item.code.toLowerCase()}`} aria-pressed={airport === item.code} className={airport === item.code ? "is-active" : ""} onClick={() => setAirport(item.code)}>
                  <strong>{item.label}</strong><small>{item.code}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="v24-step">
            <div className="v24-step-title"><span>2</span><Icon name="calendar" /><strong>How long?</strong></div>
            <div className="v24-chip-grid v24-chip-grid--two">
              {durations.map((item) => (
                <button type="button" key={item} data-testid={`duration-${testIdPart(item)}`} aria-pressed={duration === item} className={duration === item ? "is-active" : ""} onClick={() => setDuration(item)}>{item}</button>
              ))}
            </div>
          </div>

          <div className="v24-step v263-city-step">
            <div className="v24-step-title"><span>3</span><Icon name="train" /><strong>Which cities will you visit?</strong></div>
            <div className="v263-city-guidance">
              <small>Select all that apply</small>
              <span>{selectedCities.length} {selectedCities.length === 1 ? "city" : "cities"} selected</span>
            </div>
            <div className="v26-city-grid">
              {cities.map((item) => {
                const isSelected = selectedCities.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    data-testid={`city-${testIdPart(item)}`}
                    aria-pressed={isSelected}
                    className={isSelected ? "is-active" : ""}
                    onClick={() => toggleCity(item)}
                  >
                    <span>{item}</span>
                    <span className="v263-city-check" aria-hidden="true">{isSelected ? "✓" : ""}</span>
                  </button>
                );
              })}
            </div>
            <p className="v263-city-note">Choose every city on your itinerary. At least one city must remain selected.</p>
          </div>

          <div className="v24-step">
            <div className="v24-step-title"><span>4</span><Icon name="shield" /><strong>What matters most?</strong></div>
            <div className="v26-style-grid">
              {travelStyles.map((item) => (
                <button type="button" key={item} data-testid={`style-${testIdPart(item)}`} aria-pressed={travelStyle === item} className={travelStyle === item ? "is-active" : ""} onClick={() => setTravelStyle(item)}>{item}</button>
              ))}
            </div>
          </div>

          <div className="v24-step v26-needs-step">
            <div className="v24-step-title"><Icon name="signal" /><strong>Add anything else</strong></div>
            <div className="v24-needs-scroll">
              {needs.map((item) => (
                <button type="button" key={item.label} data-testid={`need-${testIdPart(item.label)}`} aria-pressed={selectedNeeds.includes(item.label)} className={selectedNeeds.includes(item.label) ? "is-active" : ""} onClick={() => toggleNeed(item.label)}>
                  <Icon name={item.icon} /><span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <a className="v24-build-button" href="#mobile-travel-kit">
            Update My Recommended Kit <ArrowIcon />
          </a>
          <p className="v24-time-note">✓ Updates instantly — no sign-up required</p>
        </div>


        <div className="v24-mobile-trust">
          <div><Icon name="shield" /><span><strong>Independent</strong><small>Clear, unbiased guidance</small></span></div>
          <div><Icon name="refresh" /><span><strong>Updated</strong><small>Prices checked regularly</small></span></div>
        </div>
      </section>

      <section className="v2-hero v22-hero v23-hero" id="planner">
        <div className="v2-hero-scene v22-hero-scene" aria-hidden="true">
          <span className="v2-sun" />
          <span className="v2-mountain v2-mountain--back" />
          <span className="v2-mountain v2-mountain--front" />
          <span className="v2-tower" />
          <span className="v22-haze" />
        </div>

        <div className="container v2-hero-inner v22-hero-inner v23-hero-inner">
          <div className="v2-title-block v22-title-block v23-title-block">
            <p className="v2-kicker">YOUR JAPAN TRIP, SORTED</p>
            <h1>Plan Your<br />Japan Trip</h1>
            <p>Everything you need before landing—picked for your route, stay, and travel style.</p>
          </div>

          <div className="v2-planner-layout v22-planner-layout v23-planner-layout">
            <div className="v2-planner-card v22-planner-card v23-planner-card">
              <QuestionTitle icon="plane" step="1">Where do you arrive?</QuestionTitle>
              <div className="v2-option-row v2-option-row--four">
                {airports.map((item) => (
                  <button type="button" key={item.code} data-testid={`airport-${item.code.toLowerCase()}`} aria-pressed={airport === item.code} className={airport === item.code ? "is-active" : ""} onClick={() => setAirport(item.code)}>
                    <strong>{item.label}</strong><small>{item.code}</small>
                  </button>
                ))}
              </div>

              <div className="v22-question-gap" />
              <QuestionTitle icon="calendar" step="2">How long?</QuestionTitle>
              <div className="v2-option-row v2-option-row--four">
                {durations.map((item) => (
                  <button type="button" key={item} data-testid={`duration-${testIdPart(item)}`} aria-pressed={duration === item} className={duration === item ? "is-active" : ""} onClick={() => setDuration(item)}>{item}</button>
                ))}
              </div>

              <div className="v22-question-gap" />
              <QuestionTitle icon="signal" step="3">What do you need?</QuestionTitle>
              <div className="v2-option-row v2-option-row--needs">
                {needs.map((item) => (
                  <button type="button" key={item.label} data-testid={`need-${testIdPart(item.label)}`} aria-pressed={selectedNeeds.includes(item.label)} className={selectedNeeds.includes(item.label) ? "is-active" : ""} onClick={() => toggleNeed(item.label)}>
                    <Icon name={item.icon} />{item.label}
                  </button>
                ))}
              </div>

              <a className="v2-primary-cta v22-primary-cta" href="#travel-kit">
                Build My Travel Kit <ArrowIcon />
              </a>
              <p className="v2-microcopy"><span>✓</span> Takes less than 60 seconds</p>
            </div>

            <aside className="v2-kit-card v22-kit-card v23-kit-card" id="travel-kit">
              <div className="v2-kit-heading">
                <div><small>YOUR PLAN</small><h2>Your Japan Travel Kit</h2></div>
                <span>Recommended</span>
              </div>
              <div className="v2-kit-meta"><span>{airport}</span><span>{duration}</span></div>
              <div className="v28-desktop-kit-list">
                {travelKit.map((item, index) => (
                  <a className={`v28-desktop-kit-item${index === 0 ? " is-primary" : ""}`} key={item.name} href={item.href}>
                    <span className="v2-kit-icon"><Icon name={item.icon} /></span>
                    <div>
                      <span className="v28-desktop-badge">{index === 0 ? "#1 " : ""}{item.badge}</span>
                      <strong>{item.name}</strong>
                      <small>{item.provider}</small>
                      <em>{item.reason}</em>
                    </div>
                    <b>{item.price}<small>{item.priceNote}</small></b>
                  </a>
                ))}
              </div>
              <div className="v2-total v22-total"><span>Personalized shortlist</span><strong>{travelKit.length} picks</strong></div>
              <a className="v2-primary-cta v2-primary-cta--compact v22-primary-cta" href="/compare">View Details &amp; Compare</a>
              <small className="v2-customize">You can customize later</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="v2-trust v22-trust v23-trust" aria-label="Why travelers can trust Japan X Trip">
        <div className="container v2-trust-grid">
          <TrustItem icon="shield" title="Built for international travelers" detail="Clear guidance for first-time visitors" />
          <TrustItem icon="scale" title="Independent comparisons" detail="We compare. You choose." />
          <TrustItem icon="refresh" title="Reviewed regularly" detail="Important conditions are rechecked" />
          <TrustItem icon="ban" title="No sponsored rankings" detail="Recommendations are not sold" />
        </div>
      </section>

      <section className="v2-section" id="explore">
        <div className="container">
          <div className="v2-section-heading"><div><p>EXPLORE JAPAN</p><h2>Everything for a smoother trip.</h2></div><a href="/compare">Browse comparison →</a></div>
          <div className="v2-category-grid">
            {categories.map((item) => (
              <a href={item.href} className="v2-category-card" key={item.title}>
                <span><Icon name={item.icon} /></span><strong>{item.title}</strong><small>{item.detail}</small><i><ArrowIcon /></i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section v2-section--soft" id="recommended">
        <div className="container">
          <div className="v2-section-heading"><div><p>CURATED FOR YOUR TRIP</p><h2>Popular choices, compared clearly.</h2></div><a href="/compare">Compare all →</a></div>
          <div className="v2-product-grid">
            {products.map((item) => (
              <a className="v2-product-card" href={item.href} key={item.title}>
                <div className="v2-product-top">{item.badge && <span>{item.badge}</span>}<i><Icon name={item.icon} /></i></div>
                <h3>{item.title}</h3><p>{item.detail}</p><small>{item.provider}</small>
                <div className="v2-rating">{item.note}</div>
                <div className="v2-product-price"><strong>Read guide</strong><b><ArrowIcon /></b></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <a className="v23-mobile-sticky-cta v25-mobile-sticky-cta" href="#mobile-planner" aria-label="Start my Japan travel plan">
        <span><small>60-SECOND PLANNER</small><strong>Start My Travel Plan</strong></span>
        <ArrowIcon />
      </a>

      <section className="v2-final">
        <div className="container v2-final-inner">
          <div><p>READY WHEN YOU ARE</p><h2>Land with a plan—not a dozen open tabs.</h2></div>
          <a className="v2-primary-cta v2-primary-cta--light" href="#planner">Build My Travel Kit <ArrowIcon /></a>
        </div>
      </section>
    </>
  );
}

function QuestionTitle({ icon, step, children }: { icon: IconName; step: string; children: ReactNode }) {
  return <div className="v2-question-title"><span><Icon name={icon} /></span><strong>{step}</strong>{children}</div>;
}

function TrustItem({ icon, title, detail }: { icon: IconName; title: string; detail: string }) {
  return <div><span><Icon name={icon} /></span><div><strong>{title}</strong><small>{detail}</small></div></div>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    plane: <><path d="m3 11 18-7-7 18-3-7-8-4Z" /><path d="m11 15 4-4" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    signal: <><path d="M4 17h2M9 13h2v4H9zM14 9h2v8h-2zM19 5h2v12h-2z" /></>,
    wifi: <><path d="M4.9 9.9a10 10 0 0 1 14.2 0M7.8 12.8a6 6 0 0 1 8.4 0M10.6 15.6a2 2 0 0 1 2.8 0" /><circle cx="12" cy="19" r="1" /></>,
    sim: <><path d="M7 3h7l4 4v14H7z" /><path d="M10 11h5v6h-5zM10 14h5M12.5 11v6" /></>,
    train: <><rect x="5" y="3" width="14" height="15" rx="3" /><path d="M8 7h8M8 12h.01M16 12h.01M8 18l-2 3M16 18l2 3M8 21h8" /></>,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></>,
    shield: <><path d="M12 3 5 6v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    scale: <><path d="M12 3v18M5 6h14M7 6l-4 7h8L7 6ZM17 6l-4 7h8l-4-7ZM7 21h10" /></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.1 9a7 7 0 0 1 11.5-2L20 12M4 12l2.4 5a7 7 0 0 0 11.5-2" /></>,
    ban: <><circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" /></>,
    ticket: <><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v8a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2V8Z" /><path d="M13 7v2M13 11v2M13 15v2" /></>,
  };
  return <svg className="v22-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}
