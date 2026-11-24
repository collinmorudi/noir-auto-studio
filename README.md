# NOIR Auto Studio

NOIR Auto Studio is a **fictional portfolio concept** for a premium automotive detailing studio in Gauteng, South Africa. The frontend demonstrates responsive design, accessible navigation, reusable React components and test-driven development.

## Stack

React, TypeScript, Vite, Tailwind CSS 4 via its Vite plugin, React Router in declarative mode and Lucide React. Vitest runs with jsdom, React Testing Library, user-event and jest-dom. Playwright covers browser flows, and ESLint uses flat configuration.

## Getting started

Use Node.js 22.22.2+ on the 22.x line or 24.15.0+ on the 24.x line, with npm. Inter and Manrope are served locally from bundled Fontsource packages.

```sh
npm ci
npx playwright install chromium
npm run dev
```

Open the local URL printed by Vite. On a Linux runner that also needs Chromium system dependencies, use `npx playwright install --with-deps chromium`.

## Development and testing

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run typecheck` | Type-check the app, tests and tooling configuration. |
| `npm run lint` | Run ESLint. |
| `npm test` | Run Vitest unit and component tests once. |
| `npm run test:watch` | Run Vitest in watch mode. |
| `npm run test:e2e` | Run Playwright in Chromium. Playwright starts Vite automatically on port 4173. |
| `npm run build` | Type-check and generate the production site in `dist/`. |
| `npm run preview` | Serve the built site locally. |

Vitest discovers `src/**/*.test.{ts,tsx}` in jsdom. Playwright discovers browser specs in `e2e/` and checks navigation at 360px, 768px and 1440px. To host a production build, configure the static host to serve `index.html` for unknown frontend paths so React Router can handle direct links and render the 404 view.

## Project structure

```text
src/
  app/                 Route configuration and route tests
  components/
    layout/            Shared site shell, header and footer
    ui/                Container, button, section heading and page hero
  pages/               Route-level views
  styles/              Tailwind theme and base styles
  test/                Shared Vitest setup
e2e/                   Playwright smoke and responsive tests
public/images/         Reserved image directories
docs/                  Image asset register
```

## Implementation status

Stage 1 provides a shared header and footer, responsive navigation, a preliminary homepage hero, four placeholder pages and a 404 page. The homepage links to the quote page, which is currently a placeholder. The hero uses a CSS background. See the [image asset register](docs/asset-register.md) for how future imagery will be tracked.

Planned stages include the full homepage, a services catalogue, a filterable project gallery, an expanded About page, before-and-after comparisons and an interactive quotation request builder.
