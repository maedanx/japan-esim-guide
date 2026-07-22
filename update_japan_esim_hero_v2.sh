#!/bin/bash
set -euo pipefail

PROJECT_DIR="$HOME/Documents/Japan X Trip/01_Website/japan-esim-guide"
cd "$PROJECT_DIR"

BACKUP_DIR=".hero-v2-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

cp app/globals.css "$BACKUP_DIR/globals.css"
cp components/home/Hero.tsx "$BACKUP_DIR/Hero.tsx"

python3 <<'PY'
from pathlib import Path

css_path = Path("app/globals.css")
css = css_path.read_text(encoding="utf-8")

replacements = {
'''h1 {
  margin-bottom: 24px;
  font-size: clamp(3rem, 7vw, 5.9rem);
  font-weight: 760;
}''':
'''h1 {
  margin-bottom: 22px;
  font-size: clamp(3rem, 5.25vw, 4.95rem);
  font-weight: 760;
}''',

'''.hero {
  position: relative;
  overflow: hidden;
  padding: 104px 0 120px;''':
'''.hero {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 76px);
  display: flex;
  align-items: center;
  padding: 58px 0 72px;''',

'''.hero-grid {
  display: grid;
  align-items: center;
  gap: 78px;
  grid-template-columns: minmax(0, 1.06fr) minmax(380px, 0.94fr);
}''':
'''.hero-grid {
  display: grid;
  align-items: center;
  gap: 44px;
  grid-template-columns: minmax(0, 0.94fr) minmax(420px, 1.06fr);
}''',

'''.hero-lead {
  max-width: 680px;
  margin-bottom: 34px;''':
'''.hero-lead {
  max-width: 610px;
  margin-bottom: 28px;''',

'''.trust-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  padding: 0;
  margin: 34px 0 0;''':
'''.trust-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 22px;
  padding: 0;
  margin: 28px 0 0;''',

'''.hero-visual {
  position: relative;
  min-height: 560px;
}''':
'''.hero-visual {
  position: relative;
  min-height: 500px;
}''',

'''.phone-card {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: min(340px, 78vw);''':
'''.phone-card {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: min(370px, 80vw);''',

'''.floating-note--top {
  top: 13%;
  right: -2%;
}''':
'''.floating-note--top {
  top: 12%;
  right: 1%;
}''',

'''.floating-note--bottom {
  bottom: 12%;
  left: -3%;
}''':
'''.floating-note--bottom {
  bottom: 10%;
  left: 0;
}''',

'''  .hero {
    padding: 72px 0 86px;
  }''':
'''  .hero {
    min-height: auto;
    padding: 64px 0 76px;
  }''',
}

for old, new in replacements.items():
    if old not in css:
        raise SystemExit(f"CSS置換対象が見つかりません: {old[:60]!r}")
    css = css.replace(old, new)

insert_after = '''.trust-list span {
  display: grid;
  width: 20px;
  height: 20px;
  place-items: center;
  border-radius: 50%;
  color: var(--mint-dark);
  background: var(--mint);
  font-size: 0.72rem;
  font-weight: 900;
}
'''

addition = '''
.hero-proof {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
  margin-top: 18px;
  color: var(--ink-soft);
  font-size: 0.82rem;
}

.hero-proof strong {
  color: var(--ink);
}

.hero-proof-divider {
  width: 1px;
  height: 18px;
  background: var(--line);
}

.scroll-cue {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 22px;
  color: var(--ink-soft);
  font-size: 0.78rem;
  font-weight: 750;
}

.scroll-cue span {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.68);
}
'''

if addition.strip() not in css:
    css = css.replace(insert_after, insert_after + addition)

css_path.write_text(css, encoding="utf-8")

hero_path = Path("components/home/Hero.tsx")
hero = hero_path.read_text(encoding="utf-8")

old = '''          <ul className="trust-list" aria-label="Why use this guide">
            {trustItems.map((item) => (
              <li key={item}>
                <span aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
'''

new = '''          <ul className="trust-list" aria-label="Why use this guide">
            {trustItems.map((item) => (
              <li key={item}>
                <span aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="hero-proof" aria-label="Guide highlights">
            <strong>Built for international travelers</strong>
            <span className="hero-proof-divider" aria-hidden="true" />
            <span>Airport-ready setup</span>
            <span className="hero-proof-divider" aria-hidden="true" />
            <span>No email required</span>
          </div>

          <a className="scroll-cue" href="#diagnosis">
            <span aria-hidden="true">↓</span>
            See your best option
          </a>
'''

if old not in hero:
    raise SystemExit("Hero.tsxの置換対象が見つかりません")

hero = hero.replace(old, new)
hero_path.write_text(hero, encoding="utf-8")
PY

cp app/globals.css src/app/globals.css
cp components/home/Hero.tsx src/components/home/Hero.tsx

echo ""
echo "✅ ファーストビュー v2 を反映しました"
echo "📦 バックアップ: $PROJECT_DIR/$BACKUP_DIR"
echo ""
open http://localhost:3000
open .
