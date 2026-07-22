"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

type Brand = "apple" | "google" | "samsung";
type Region = "usa" | "canada" | "europe" | "japan" | "china" | "hong-kong-macau" | "other";
type Answer = "yes" | "no" | "unknown";
type Status = "supported" | "conditional" | "unsupported";

type Phone = {
  id: string;
  name: string;
  brand: Brand;
  status: Status;
  note?: string;
  chinaRestriction?: boolean;
  japanRestriction?: boolean;
};

const brands: Array<{ id: Brand; name: string; family: string }> = [
  { id: "apple", name: "Apple", family: "iPhone" },
  { id: "google", name: "Google", family: "Pixel" },
  { id: "samsung", name: "Samsung", family: "Galaxy" },
];

const regions: Array<{ id: Region; name: string }> = [
  { id: "usa", name: "United States" },
  { id: "canada", name: "Canada" },
  { id: "europe", name: "Europe or United Kingdom" },
  { id: "japan", name: "Japan" },
  { id: "china", name: "Mainland China" },
  { id: "hong-kong-macau", name: "Hong Kong or Macau" },
  { id: "other", name: "Another country or region" },
];

const phones: Phone[] = [
  ...["16", "15", "14", "13", "12", "11"].map((n) => ({ id: `iphone-${n}`, name: `iPhone ${n} series`, brand: "apple" as const, status: "supported" as const, chinaRestriction: true })),
  { id: "iphone-xs-xr", name: "iPhone XS, XS Max, or XR", brand: "apple", status: "supported", chinaRestriction: true },
  { id: "iphone-se-3", name: "iPhone SE (3rd generation)", brand: "apple", status: "supported", chinaRestriction: true },
  { id: "iphone-se-2", name: "iPhone SE (2nd generation)", brand: "apple", status: "supported", chinaRestriction: true },
  { id: "iphone-old", name: "iPhone X, 8, 7, 6, or older", brand: "apple", status: "unsupported" },

  ...["9", "8", "7", "6"].map((n) => ({ id: `pixel-${n}`, name: `Pixel ${n} series`, brand: "google" as const, status: "supported" as const })),
  { id: "pixel-5", name: "Pixel 5 or Pixel 5a", brand: "google", status: "supported" },
  { id: "pixel-4", name: "Pixel 4 or Pixel 4a", brand: "google", status: "supported" },
  { id: "pixel-3a", name: "Pixel 3a or Pixel 3a XL", brand: "google", status: "conditional", japanRestriction: true, note: "Some carrier-sold and Japan-purchased variants do not support eSIM." },
  { id: "pixel-3", name: "Pixel 3 or Pixel 3 XL", brand: "google", status: "conditional", japanRestriction: true, note: "Support depends heavily on purchase country and original carrier." },
  { id: "pixel-2", name: "Pixel 2 or Pixel 2 XL", brand: "google", status: "conditional", note: "Only limited variants originally supported eSIM." },
  { id: "pixel-old", name: "Original Pixel or older", brand: "google", status: "unsupported" },

  ...["25", "24", "23", "22", "21", "20"].map((n) => ({ id: `galaxy-s${n}`, name: `Galaxy S${n} series`, brand: "samsung" as const, status: "conditional" as const, note: "Regional and carrier variants can differ." })),
  { id: "galaxy-z", name: "Galaxy Z Fold or Z Flip series", brand: "samsung", status: "conditional", note: "Many generations support eSIM, but regional variants can differ." },
  { id: "galaxy-note20", name: "Galaxy Note20 or Note20 Ultra", brand: "samsung", status: "conditional", note: "Support varies by region and model number." },
  { id: "galaxy-a", name: "Galaxy A series", brand: "samsung", status: "conditional", note: "Only selected newer A-series models support eSIM." },
  { id: "galaxy-other", name: "Older Galaxy or another Galaxy model", brand: "samsung", status: "conditional", note: "Check the exact model number and look for Add eSIM in Settings." },
];

const answerLabel = (value: Answer) => value === "yes" ? "Yes" : value === "no" ? "No" : "Not sure";

export default function EsimCheckerClient() {
  const [brand, setBrand] = useState<Brand | "">("");
  const [modelId, setModelId] = useState("");
  const [region, setRegion] = useState<Region | "">("");
  const [unlocked, setUnlocked] = useState<Answer>("unknown");
  const [menu, setMenu] = useState<Answer>("unknown");

  const models = useMemo(() => phones.filter((phone) => phone.brand === brand), [brand]);
  const phone = phones.find((item) => item.id === modelId);

  const result = useMemo(() => {
    if (!phone || !region) return null;
    if (phone.status === "unsupported") return { status: "unsupported" as const, title: "This phone is unlikely to support eSIM", summary: "The selected generation normally lacks standard eSIM support.", action: "Use a physical SIM card or pocket Wi-Fi." };
    if (unlocked === "no") return { status: "blocked" as const, title: "The phone appears carrier-locked", summary: "A locked device may reject a travel eSIM from another provider.", action: "Ask the original carrier to unlock it, or use pocket Wi-Fi." };
    if (phone.chinaRestriction && (region === "china" || region === "hong-kong-macau")) return { status: "conditional" as const, title: "This regional iPhone needs extra verification", summary: "Some regional iPhones use a different SIM configuration.", action: "Confirm that Add eSIM or Add Cellular Plan appears in Settings." };
    if (phone.japanRestriction && region === "japan") return { status: "conditional" as const, title: "This model may not support eSIM", summary: "Some Japan-purchased variants of this generation do not support eSIM.", action: "Check for Download a SIM or Add eSIM in network settings." };
    if (menu === "no") return { status: "conditional" as const, title: "The eSIM menu could not be found", summary: "This may indicate an unsupported variant or software restriction.", action: "Verify the exact model number with the manufacturer." };
    if (phone.status === "conditional" || unlocked === "unknown" || menu === "unknown") return { status: "conditional" as const, title: "Your phone may support a Japan travel eSIM", summary: phone.note ?? "More verification is needed.", action: "Confirm that the phone is unlocked and Add eSIM appears in Settings." };
    return { status: "supported" as const, title: "Your phone should support a Japan travel eSIM", summary: "The selected model normally supports eSIM, is unlocked, and shows an eSIM menu.", action: "Compare travel eSIM plans and check provider coverage before buying." };
  }, [phone, region, unlocked, menu]);

  const reset = () => { setBrand(""); setModelId(""); setRegion(""); setUnlocked("unknown"); setMenu("unknown"); };

  return (
    <section className={styles.checkerSection}>
      <div className={styles.checkerContainer}>
        <div className={styles.checkerGrid}>
          <div className={styles.formCard}>
            <div className={styles.formHeading}><p>Step 1</p><h2>Select your phone</h2></div>
            <div className={styles.brandGrid}>
              {brands.map((item) => <button key={item.id} type="button" aria-pressed={brand === item.id} className={brand === item.id ? styles.selectedButton : ""} onClick={() => { setBrand(item.id); setModelId(""); setRegion(""); }}><span>{item.name}</span><strong>{item.family}</strong></button>)}
            </div>

            <label className={styles.field}><span>Phone model or generation</span><select disabled={!brand} value={modelId} onChange={(e) => setModelId(e.target.value)}><option value="">{brand ? "Select your model" : "Select a brand first"}</option>{models.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>

            <div className={styles.divider} />
            <div className={styles.formHeading}><p>Step 2</p><h2>Check the regional variant</h2></div>
            <label className={styles.field}><span>Where was the phone originally purchased?</span><select disabled={!modelId} value={region} onChange={(e) => setRegion(e.target.value as Region)}><option value="">Select a country or region</option>{regions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>

            <div className={styles.divider} />
            <div className={styles.formHeading}><p>Step 3</p><h2>Confirm two settings</h2></div>
            <Question question="Is the phone carrier-unlocked?" description="A locked phone may only accept plans from its original carrier." answer={unlocked} disabled={!region} onChange={setUnlocked} />
            <Question question="Can you see an eSIM option in Settings?" description="Look for Add eSIM, Add Cellular Plan, or Download a SIM." answer={menu} disabled={!region} onChange={setMenu} />
            <button className={styles.resetButton} type="button" onClick={reset}>Reset checker</button>
          </div>

          <aside className={styles.resultCard}>
            {!result ? <div className={styles.emptyResult}><span>eSIM</span><h2>Your result will appear here</h2><p>Select a model and purchase region to begin.</p></div> :
              <div className={`${styles.completedResult} ${styles[`result_${result.status}`]}`}>
                <p className={styles.resultLabel}>Compatibility result</p>
                <div className={styles.resultIcon}>{result.status === "supported" ? "✓" : result.status === "conditional" ? "!" : "×"}</div>
                <h2>{result.title}</h2><p className={styles.resultSummary}>{result.summary}</p>
                <div className={styles.deviceSummary}>
                  <div><span>Device</span><strong>{phone?.name}</strong></div>
                  <div><span>Purchase region</span><strong>{regions.find((item) => item.id === region)?.name}</strong></div>
                  <div><span>Unlocked</span><strong>{answerLabel(unlocked)}</strong></div>
                  <div><span>eSIM menu</span><strong>{answerLabel(menu)}</strong></div>
                </div>
                <div className={styles.nextAction}><strong>What to do next</strong><p>{result.action}</p></div>
                <div className={styles.resultLinks}>{result.status === "supported" ? <><Link href="/best-esim">See recommended eSIMs</Link><Link href="/data-calculator">Calculate your data needs</Link></> : <><Link href="/pocket-wifi">See pocket Wi-Fi options</Link><Link href="/sim-card-vs-esim">Compare SIM, eSIM, and Wi-Fi</Link></>}</div>
                <p className={styles.resultDisclaimer}>Final compatibility can depend on exact model number, software, carrier, and eSIM provider.</p>
              </div>}
          </aside>
        </div>
      </div>
    </section>
  );
}

function Question({ question, description, answer, disabled, onChange }: { question: string; description: string; answer: Answer; disabled: boolean; onChange: (answer: Answer) => void; }) {
  return <div className={styles.question}><div><strong>{question}</strong><p>{description}</p></div><div className={styles.answerButtons}>{(["yes", "no", "unknown"] as Answer[]).map((item) => <button key={item} type="button" disabled={disabled} aria-pressed={answer === item} className={answer === item ? styles.answerSelected : ""} onClick={() => onChange(item)}>{answerLabel(item)}</button>)}</div></div>;
}
