# Career Hub

Analyze your career progression, plan a learning roadmap, and discover jobs aligned with your skills. This app provides two core experiences: Skills Gap analysis and Job Discovery, all powered by a modern Next.js stack.

## Features

- Skills Gap Analyzer: compare current skills to target roles, get readiness score, category insights, salary projection, and an actionable learning roadmap
- Job Discovery: browse a rich set of mock jobs with filters (location, salary, experience, skills, type), save and apply flow, and profile persistence
- Polished UI: shared background layout, animated cards, iconography, and responsive design

## Tech Stack

- Next.js 16 (App Router) and React 19
- TypeScript with strict mode
- Tailwind CSS v4
- ESLint 9 with Next.js core web vitals
- lucide-react for icons
- recharts for data visualizations

## Getting Started

### Prerequisites

- Node.js 18 or newer
- A package manager: npm, pnpm, yarn, or bun

### Install

```bash
npm install
# or
pnpm install
# or
yarn
# or
bun install
```

### Develop

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

### Lint

```bash
npm run lint
```

### Build & Start

```bash
npm run build
npm run start
```

## Scripts

- dev: start the development server
- build: build the application
- start: run the production server
- lint: run ESLint

## Project Structure

- app/layout.tsx: root layout and metadata
- app/page.tsx: main page with navigation between features
- app/globals.css: global styles using Tailwind v4 (@import "tailwindcss")
- components/BackgroundLayout.tsx: shared background and container
- components/HomePage.tsx: landing page with entry cards
- components/SkillsGapAnalyzer.tsx: analysis experience and charts
- components/JobDiscoveryApp.tsx: job discovery, filters, saved/applied flow, profile form
- components/Footer.tsx: footer component
- public/: static assets (home.png, svgs)
- tsconfig.json: TypeScript configuration (strict, path alias @/*)
- eslint.config.mjs: ESLint configuration (Next core web vitals)
- package.json: scripts and dependencies

## Styling

- Tailwind CSS v4 is used with a single import in app/globals.css
- No separate tailwind.config.js is required

## Data & State

- The app runs fully on the client
- Job data is generated deterministically for demo purposes
- No external APIs or environment variables are required

## Deployment

- Deploy to any Node-compatible host or to Vercel
- Use npm run build followed by npm run start

## Acknowledgements

- Built by Bismay and Mohit
