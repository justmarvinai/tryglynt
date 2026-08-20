# Glynt

**Alle Nährstoffe im Blick.** Glynt ist ein privacy-first Ernährungs-Companion für den deutschen Markt — keine Diät-App. Kalorien, Makros und das volle Panel an Vitaminen & Mineralstoffen, gemessen an deinem persönlichen Tagesbedarf.

- 📱 Mobile-first PWA — installierbar, voll offline, kein Account, kein Backend
- 🔒 Alle Daten auf dem Gerät (IndexedDB) mit Export/Import-Backups
- 🧬 Persönliche Ziele: Energie, Makros + 26 Mikronährstoff-Referenzwerte (EFSA, umschaltbar NIH)
- 💡 Smarte Vorschläge: Lebensmittel, die deine heutigen Lücken schließen — erklärbar, ein Tap zum Loggen
- 🛒 Offline-Lebensmitteldatenbank + Open Food Facts (Suche & Barcode) für Markenprodukte
- 🎨 [CleanOS](https://github.com/EinPallux/CleanOS)-Designsystem — clean, iOS-inspiriert, monochrom + Glynt-Grün
- ⚡ Vite · React 19 · TypeScript · Tailwind CSS v4 · Dexie — deployed auf Vercel
- 📦 Native iOS/Android via Capacitor nach v1

## Status

**In development** — see [ROADMAP.md](./ROADMAP.md) for milestones.

## Documentation

| | |
|---|---|
| [docs/PRODUCT.md](./docs/PRODUCT.md) | Vision, features, flows |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Stack, structure, conventions |
| [docs/DATA.md](./docs/DATA.md) | Data model, food sources, backup |
| [docs/SCIENCE.md](./docs/SCIENCE.md) | Formulas, reference values, suggestions |
| [docs/DESIGN.md](./docs/DESIGN.md) | Design system, brand, tone |
| [docs/DECISIONS.md](./docs/DECISIONS.md) | Binding decision log |
| [AGENTS.md](./AGENTS.md) / [CLAUDE.md](./CLAUDE.md) | Guide for AI-assisted development |
| [CHANGELOG.md](./CHANGELOG.md) | What changed |
| [USER_QUESTIONS.md](./USER_QUESTIONS.md) | Open questions for Marvin |

## Development

```bash
npm install
npm run dev      # dev server
npm run check    # lint + typecheck + tests
npm run build    # production build
```

## Disclaimer

Glynt liefert Referenzwerte auf Bevölkerungsebene und ist kein medizinischer Rat.
