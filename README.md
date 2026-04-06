# LaunchLab — Da idea a MVP in 6 settimane

Landing page per LaunchLab, studio di consulenza che trasforma idee in MVP funzionanti in 6 settimane.

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** con design system custom
- **Framer Motion** per animazioni scroll-driven e parallax
- **Remotion** per l'animazione "From Idea to Launch" nella hero
- **next-intl** per i18n (IT, EN, CS)
- **Lenis** per smooth scrolling

## Struttura

```
src/
  app/
    [locale]/         Routing internazionalizzato
    globals.css       Design system (Solar-style palette)
    layout.tsx        Root layout con Inter + IBM Plex Mono
  components/
    layout/           Navbar, Footer
    sections/         Hero, PainCards, Metodo, Processo, Pricing, SocialProof, CtaFinale
    effects/          HeroBackground, DevSymbolsBackground, Fade, Divider, DiagonalSVG, VerticalLines, ...
    remotion/         IdeaToLaunch composition (4 acts: Idea, Wireframe, Design, Live)
  messages/           Traduzioni (it.json, en.json, cs.json)
  hooks/              Custom React hooks
  i18n/               Config internazionalizzazione
  lib/                Utility (cn, merge classi)
```

## Design

Stile ispirato a [Solar Tremor](https://solar.tremor.so/):
- Tema light (`bg-gray-50`) con accenti arancione `#f97316`
- Sezioni separate da FeatureDivider con linee verticali tratteggiate
- Cards bianche con `ring-1 ring-black/5`, hover arancione
- Game of Life canvas nell'hero (puntini arancioni + grigi)
- Dev Symbols background nella sezione Timeline (simboli `{}`, `=>`, `</>`)
- Remotion Player con animazione 30s loop (Idea -> Wireframe -> Design -> Live)
- Font: Inter (display/body), IBM Plex Mono (codice)

## Sezioni

| # | Sezione | Descrizione |
|---|---------|-------------|
| 1 | **Hero** | Headline con TypeWriter, badge, CTA, Game of Life background, Remotion player |
| 2 | **PainCards** | 3 pain points in grid Solar con icone e diagonal SVG pattern |
| 3 | **Metodo** | 3 step con illustrazioni programmatiche animate (WorkshopViz, DesignViz, BuildViz) |
| 4 | **Processo** | Mini Gantt chart + 3 deliverable cards con DevSymbols background |
| 5 | **Pricing** | 2 piani (Workshop + MVP Build) con checkmarks emerald |
| 6 | **SocialProof** | Founder cards con video + tech stack marquee |
| 7 | **CtaFinale** | CTA con Game of Life background (variante subtile) |

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## i18n

Lingue supportate: Italiano (`/it`), English (`/en`), Czech (`/cs`).

Le traduzioni sono in `src/messages/`. Tutte le stringhe visibili usano `useTranslations()` di next-intl, inclusa l'animazione Remotion.

## Deploy

```bash
npm run build
```

Compatibile con Vercel, Coolify, o qualsiasi hosting Node.js.
