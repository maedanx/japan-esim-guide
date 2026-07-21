"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Japan Made Clear home">
          <span className="brand-mark" aria-hidden="true">日</span>
          <span>
            <strong>{siteConfig.name}</strong>
            <small>Travel Japan with confidence</small>
          </span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <a className="button button--small" href="#diagnosis" onClick={closeMenu}>
            Find my best option
          </a>
        </nav>
      </div>
    </header>
  );
}
