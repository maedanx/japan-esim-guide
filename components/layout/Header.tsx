"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Compare", href: "/compare" },
  { label: "eSIM", href: "/esim" },
  { label: "Pocket WiFi", href: "/pocket-wifi" },
  { label: "SIM Card", href: "/sim-card" },
  { label: "Diagnosis", href: "/diagnosis" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header v2-header v22-header v23-header">
      <div className="container header-inner v2-header-inner v22-header-inner v23-header-inner">
        <Link
          className="brand brand--image"
          href="/"
          aria-label="Japan X Trip home"
          onClick={() => setOpen(false)}
        >
          <span className="header-logo-frame">
            <Image
              src="/images/brand/logo-header-web.png"
              alt="Japan X Trip"
              fill
              priority
              sizes="(max-width: 680px) 172px, 210px"
              className="header-logo-image"
            />
          </span>
        </Link>

        <button
          className="menu-button v23-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation v2-navigation v23-navigation ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <Link key={item.href + item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <button className="v2-language" type="button" aria-label="Language: English">
            <GlobeIcon /> EN <span aria-hidden="true">⌄</span>
          </button>
          <Link className="v2-header-cta" href="/#planner" onClick={() => setOpen(false)}>
            Build My Travel Kit
          </Link>
        </nav>
      </div>
    </header>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z" />
    </svg>
  );
}
