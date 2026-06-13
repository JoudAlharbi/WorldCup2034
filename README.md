# FIFA World Cup 2034 Fan Portal

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-Portfolio-blue)

A production-style fan platform for **FIFA World Cup 2034 in Saudi Arabia** — combining host city exploration, stadium showcases, interactive fan games, official tournament news, sustainability storytelling, and a live countdown in a responsive, FIFA-inspired experience.

**Developer:** [Joud Alharbi](https://github.com/JoudAlharbi)

**Live site:** [https://worldcup2034-nu.vercel.app/](https://worldcup2034-nu.vercel.app/)

---

## Overview

This project is a full-stack front-end application built with **React 19** and deployed on **Vercel**. It presents World Cup 2034 content through a multi-page SPA with shared navigation, a global footer, and section-specific UI systems tuned for desktop, tablet, and mobile.

The experience is designed to feel like an official fan portal while remaining an independent portfolio showcase — polished layouts, structured content, progressive game difficulty, and curated news from recognized tournament sources.

---

## Highlights

| Highlight | What it delivers |
|---|---|
| **Interactive Games** | Three Play Zone challenges — *Who Am I?*, *FIFA World Cup Quiz*, and *Who Said It?* — each with Easy, Medium, and Hard tiers, local progress tracking, and unlockable achievements |
| **Host Cities Explorer** | Five official host cities with imagery, regions, and stadium counts, plus a carousel of ten additional Saudi destinations with detail pages |
| **Stadium Showcase** | City-level stadium listings and individual venue detail pages with photography and descriptions across Riyadh, Jeddah, Abha, Al Khobar, and NEOM |
| **Countdown Experience** | Real-time countdown to 1 January 2034 on the Home page and Teams & Matches section |
| **Sustainability Section** | Home page feature on biodegradable stadiums, eco-friendly construction, and green venue technology with outbound reference links |
| **Official World Cup 2034 Content** | Overview hub covering Vision 2034, statistics, legacy goals, World Cup timeline, and Saudi Vision 2030 alignment |
| **Responsive Design** | Mobile-first layouts, adaptive grids, carousels, and touch-friendly navigation across all major sections |

---

## Key Features

### Home

- Cinematic hero video and scroll cue
- Live **Countdown to Kick-Off** (years through seconds)
- Tournament introduction and hosting cities map
- **Official WC 2034 news feed** — featured article + side cards with source, date, summary, and Read More links
- Sustainability spotlight with sub-cards on eco construction and green venue tech
- Ticket call-to-action linking to the official Saudi 2034 portal

### Host Cities & Stadiums (`/cities`)

- **Official Host Cities** grid: Riyadh, Jeddah, Abha, Al Khobar, NEOM
- **Additional Host Cities** infinite carousel: Al Baha, Jazan, Taif, Al Madinah, Al Ula, Umluj, Tabuk, Hail, Al Ahsa, Buraidah
- Per-city stadium routes (`/stadiums/:cityName`) and venue detail pages (`/stadiums/:cityName/:stadiumId`)

### Teams & Matches (`/teams-and-matches`)

- Pre-launch matches section with countdown and “What’s Coming” feature cards
- **National Teams Spotlight** horizontal carousel of featured nations (illustrative, not final qualification list)
- Optional **Live News Feed** on the Teams page (NewsData.io when configured)
- Team players showcase with modal player details

### Play Zone (`/play-zone`)

| Game | Description |
|---|---|
| **Who Am I?** | Identify players from progressive photograph reveals; tier-scoped player pools |
| **FIFA World Cup Quiz** | Multiple-choice World Cup trivia with difficulty-scaled timers and question pools |
| **Who Said It?** | Match iconic quotes to football legends across three difficulty tiers |

- Difficulty selector with per-tier briefs (pool size, timer, hints)
- Start Challenge modal before gameplay
- Progress bar: games played, accuracy, hard wins, achievements unlocked
- Achievement milestones stored in `localStorage`

### Overview (`/overview` and related routes)

- Tournament vision, legacy, future plans, goals, statistics, and Vision 2030 content
- World Cup history timeline (2022 → 2034)
- Rich media sections with photography and video

### Global UI

- Persistent navbar: Home, Overview, Host Cities & Stadiums, Teams & Matches, Play Zone
- Three-column responsive footer with quick links, contact, and official FIFA social accounts
- Login / Signup UI (optional PHP auth backend)

---

## News Integration

### Home page — Official WC 2034 sources

The Home page news section fetches curated, tournament-relevant articles through a **Vercel serverless API** at `/api/wc2034-news`. Sources are merged, filtered, deduplicated, and sorted newest-first:

| Priority | Source |
|---|---|
| 1 | [Saudi 2034 Official Website](https://saudi2034.com.sa/news-and-assets/) |
| 2 | [World Cup 2034 Hosting Higher Authority](https://www.wca34.gov.sa/en/media-center/news) |
| 3 | [FIFA World Cup 2034 Hub](https://inside.fifa.com/tournament-organisation/world-cup-2034) |

- Filters exclude unrelated club/transfer stories
- Graceful fallback to curated official articles if a source is temporarily unavailable
- Broken images fall back to a local placeholder

**No API key is required** for the Home page news feed in production.

### Teams page — Optional live feed

The Teams & Matches news section can use **NewsData.io** when `REACT_APP_NEWSDATA_API_KEY` is set at build time. Without it, a placeholder state is shown.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **UI Framework** | React 19 |
| **Routing** | React Router 6 |
| **Build Tool** | Create React App (`react-scripts` 5) |
| **Styling** | Custom CSS (section-scoped stylesheets) |
| **Icons** | Lucide React, Font Awesome 6 |
| **State & Progress** | React hooks, `localStorage` (game progression) |
| **Serverless API** | Vercel Functions (`/api/wc2034-news`) |
| **Deployment** | Vercel (SPA rewrites + API routes) |
| **Asset Pipeline** | Node scripts for Who Am I player image setup (`sharp`) |

---

## Project Structure

```
fifa-fan-app/
├── api/                          # Vercel serverless news API
│   ├── wc2034-news.js            # Merged WC 2034 news endpoint
│   └── lib/                      # Source parsers, filters, fallback data
├── public/                       # Static assets (cities, stadiums, games, teams)
├── scripts/                      # Who Am I asset download & validation tools
├── src/
│   ├── components/               # Hero, ScrollDownButton
│   ├── games/                    # MCQ, Quotes, difficulty config, progression
│   ├── HomePage/                 # Home, countdown, FifaNews
│   ├── matches/                  # MatchesComingSoon, match utilities
│   ├── news/                     # newsService, wc2034NewsService, LiveNewsFeed
│   ├── overview/                 # Vision, statistics, timeline, goals
│   ├── pages/                    # Cities, stadiums, host cities, news details
│   ├── teams/                    # TeamsSpotlight carousel
│   ├── whoami/                   # Who Am I game engine & player pools
│   ├── Signup/                   # Login & Signup UI
│   ├── App.js                    # Route definitions
│   ├── Layout.js                 # Navbar + Footer wrapper
│   └── NavbarFooter.js           # Global navigation & footer
├── vercel.json                   # SPA + API rewrite rules
├── .env.example                  # Optional environment variables
└── package.json
```

### Main Routes

| Path | Section |
|---|---|
| `/` | Home |
| `/overview` | Tournament overview hub |
| `/cities` | Host cities & additional destinations |
| `/stadiums/:cityName` | Stadiums by city |
| `/stadiums/:cityName/:stadiumId` | Stadium detail |
| `/teams-and-matches` | Teams & pre-launch matches |
| `/play-zone` | Fan games hub |
| `/quiz/:difficulty` | Who Am I game |
| `/games/mcq/:difficulty` | World Cup quiz |
| `/games/quotes/:difficulty` | Who Said It game |
| `/login`, `/signup` | Auth UI |

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) **18+** (LTS recommended)
- **npm** 8+

### Local setup

```bash
git clone https://github.com/JoudAlharbi/WorldCup2034.git
cd WorldCup2034
npm install
npm start
```

Open **http://localhost:3000**

### Environment variables (optional)

Copy `.env.example` to `.env` in the project root:

| Variable | Purpose |
|---|---|
| `REACT_APP_NEWSDATA_API_KEY` | Enables live news on the Teams & Matches page |
| `REACT_APP_AUTH_API_URL` | Base URL for login/signup PHP backend (defaults to localhost) |

The Home page WC 2034 news feed uses `/api/wc2034-news` and does **not** require an API key when deployed on Vercel.

> **Local API testing:** Run `vercel dev` to serve both the React app and `/api` routes locally. With `npm start` alone, the Home page falls back to curated official articles.

### Production build

```bash
npm run build
```

### Who Am I asset setup (optional)

```bash
npm run whoami:setup
```

Downloads and validates tier-scoped player images for the Who Am I game.

---

## Deployment

The app is deployed on **Vercel** with:

- Static build output from `npm run build`
- SPA routing via `vercel.json`
- Serverless function at `/api/wc2034-news`

### Deploy steps

1. Connect the repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. (Optional) Add `REACT_APP_NEWSDATA_API_KEY` for Teams page news
5. Deploy

**Production URL:** [https://worldcup2034-nu.vercel.app/](https://worldcup2034-nu.vercel.app/)

---

## Screenshots

> Add screenshots to a `docs/screenshots/` folder and replace the placeholders below.

| Section | Preview |
|---|---|
| Home — Hero & Countdown | _Add `docs/screenshots/home.png`_ |
| Home — Official News | _Add `docs/screenshots/news.png`_ |
| Host Cities | _Add `docs/screenshots/cities.png`_ |
| Stadium Detail | _Add `docs/screenshots/stadium.png`_ |
| Play Zone | _Add `docs/screenshots/play-zone.png`_ |
| Teams Spotlight | _Add `docs/screenshots/teams.png`_ |
| Sustainability | _Add `docs/screenshots/sustainability.png`_ |

```markdown
<!-- Example once added:
![Home Page](./docs/screenshots/home.png)
![Play Zone](./docs/screenshots/play-zone.png)
-->
```

---

## Future Enhancements

- **Live match center** — Real fixtures, scores, and bracket updates when the official schedule is published
- **Arabic / English localization** — Full bilingual support across all sections
- **Interactive host city map** — Clickable map linking cities to stadium routes
- **User profiles** — Persisted favorites, game history, and achievement sharing
- **PWA support** — Offline-friendly caching for core pages and game assets
- **Expanded Who Am I roster** — Automated pipeline refresh for player image assets

---

## Author

**Joud Alharbi**

Full-stack oriented front-end developer. Designed, built, and deployed this project independently — from UI architecture and game logic to Vercel serverless news integration and production deployment.

---

## Disclaimer

This is an **independent fan-made project** and is **not affiliated with, endorsed by, or associated with FIFA**.

Official trademarks, logos, and tournament references belong to their respective owners and are used here for illustrative and portfolio purposes only.

---

<p align="center">
  Built by Joud Alharbi · FIFA World Cup 2034 Fan Portal
</p>
