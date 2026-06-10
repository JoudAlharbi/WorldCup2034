# FIFA World Cup 2034 Portal ⚽🏆

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-Educational-blue)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

An interactive web platform dedicated to **FIFA World Cup 2034** in **Saudi Arabia** — built to give fans a modern, immersive way to explore host cities, stadiums, match schedules, sustainability initiatives, live football news, and engaging mini-games.

Developed with **React.js** and modern web technologies, this project combines responsive design, client-side routing, and API-driven content to deliver a portfolio-quality experience inspired by official sports event websites.

---

## 🌐 Live Demo

**[https://world-cup2034.vercel.app/](https://world-cup2034.vercel.app/)**

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🏙️ **Host Cities Explorer** | Browse official and additional host cities with rich imagery and details |
| 🏟️ **Stadium Information** | Explore stadium profiles, locations, and venue highlights across Saudi Arabia |
| 📰 **FIFA News Integration** | Live football and World Cup news with featured articles and dynamic cards |
| 📅 **Match & Tournament Information** | Match Center with fixtures, filters, featured upcoming matches, and schedule search |
| 🌿 **Sustainability & Green Initiatives** | Showcase of eco-friendly stadiums and Vision 2030 alignment |
| 🎮 **Interactive Quiz & Mini Games** | Play Zone with league-based quizzes and fan challenges |
| 📱 **Responsive Design** | Optimized for desktop, tablet, and mobile devices |
| 🎨 **Modern User Interface** | Premium card layouts, smooth animations, and FIFA-inspired styling |
| ⏳ **Countdown to FIFA World Cup 2034** | Live countdown timer with years, months, days, hours, minutes, and seconds |

---

## 🛠️ Tech Stack

- **React.js** — Component-based UI architecture
- **JavaScript (ES6+)** — Modern client-side logic
- **HTML5** — Semantic page structure
- **CSS3** — Responsive layouts, animations, and custom styling
- **React Router** — Client-side navigation and multi-page routing
- **NewsAPI** — Live news feed integration
- **Vercel Deployment** — Production hosting with SPA routing support

---

## 📁 Project Structure

```
FIFAWorldCup2034/
├── public/                  # Static assets (images, icons, favicon)
├── src/
│   ├── components/          # Reusable UI components (Hero, ScrollDownButton, etc.)
│   ├── pages/               # Route-level pages (Cities, Stadiums, Host Cities, News)
│   ├── HomePage/            # Homepage, countdown, and news section
│   ├── matches/             # Match Center (schedule, cards, featured match, service)
│   ├── overview/            # Statistics, timeline, vision, and sustainability sections
│   ├── Signup/              # Auth UI components (optional / future use)
│   ├── App.js               # Application routing configuration
│   ├── Layout.js            # Shared layout wrapper (navbar + footer)
│   └── index.js             # React entry point
├── vercel.json              # SPA rewrite rules for deployment
└── package.json             # Dependencies and scripts
```

| Layer | Purpose |
|---|---|
| **Components** | Reusable building blocks shared across pages |
| **Pages** | Full views mapped to routes (cities, stadiums, teams, play zone) |
| **Assets** | Images, icons, and static media in `public/` |
| **Services / API** | Data fetching layers (e.g. news, match fixtures) |
| **Routing** | React Router paths for all app sections and deep links |

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) **v16+** (LTS recommended)
- **npm** v8+

### Setup

```bash
git clone https://github.com/JoudAlharbi/WorldCup2034.git
cd FIFAWorldCup2034
npm install
npm start
```

The application runs on:

**http://localhost:3000**

### Production Build

```bash
npm run build
```

---

## 🎬 Demo Walkthrough

Watch a full screen recording of the platform in action:

**[▶ View Project Demo on Google Drive](https://drive.google.com/file/d/1wAztjgf4PKc4OfIIl2OnXpgz6w_6vkYx/view?usp=drive_link)**

---

## 📸 Screenshots

> Add screenshots of the following sections to showcase the project on GitHub:

| Section | Status |
|---|---|
| Home Page | _Screenshot coming soon_ |
| Host Cities | _Screenshot coming soon_ |
| Stadiums | _Screenshot coming soon_ |
| News Section | _Screenshot coming soon_ |
| Quiz / Game Section | _Screenshot coming soon_ |

<!-- Example format once screenshots are added:
![Home Page](./docs/screenshots/home.png)
![Host Cities](./docs/screenshots/cities.png)
-->

---

## 🔮 Future Enhancements

- ⚡ **Real-time match updates** — Live scores and match status during the tournament
- 🗺️ **Interactive maps** — Explore host cities and stadiums on an interactive map
- 👤 **User accounts** — Sign-in and personalized fan profiles
- ⭐ **Personalized favorite teams** — Save and follow preferred nations and players
- 🌍 **Multi-language support** — Arabic and English localization

---

## 👥 Credits

This project was developed by:

- **Joud Alharbi**
- **Rama Alguthmi**
- **Wed Abdullah**
- **Taif Alsaadi**
- **Amjad Bajaber**

Built as part of the **CPIT405 Web Development** course at **King Abdulaziz University**, under the supervision of **Dr. Rania Alhazmi**.

---

## 📄 Disclaimer

This is an independent, fan-made project created for **educational and portfolio purposes**. It is **not affiliated with, endorsed by, or associated with FIFA**.

---

<p align="center">
  Built with ❤️ for FIFA World Cup 2034 and Saudi Arabia's historic hosting journey.
</p>
