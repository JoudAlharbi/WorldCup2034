export const DIFFICULTY_SLUGS = ["easy", "medium", "hard"];

export const DIFFICULTY_META = {
  easy: {
    slug: "easy",
    label: "Easy",
    stars: "⭐",
    rating: "Casual",
    successRate: 87,
    theme: "easy",
    color: "#047857",
    colorSoft: "#ecfdf5",
    colorBorder: "rgba(16, 185, 129, 0.45)",
    colorBtn: "#059669",
  },
  medium: {
    slug: "medium",
    label: "Medium",
    stars: "⭐⭐",
    rating: "Fan",
    successRate: 54,
    theme: "medium",
    color: "#b45309",
    colorSoft: "#fffbeb",
    colorBorder: "rgba(212, 175, 55, 0.55)",
    colorBtn: "#d4af37",
  },
  hard: {
    slug: "hard",
    label: "Hard",
    stars: "⭐⭐⭐",
    rating: "Expert",
    successRate: 23,
    theme: "hard",
    color: "#b91c1c",
    colorSoft: "#fef2f2",
    colorBorder: "rgba(239, 68, 68, 0.45)",
    colorBtn: "#dc2626",
  },
};

export const GAMES = [
  {
    id: "who-am-i",
    title: "Who Am I?",
    description: "Identify players from real photograph reveals.",
    image: "/games/stadium-atmosphere.jpg",
    imageAlt: "Floodlit football stadium",
    accent: "gold",
    playRoute: (d) => `/quiz/${d}`,
    difficulties: {
      easy: {
        tagline: "Perfect for casual fans.",
        questions: 5,
        poolLabel: "Global superstars",
        hints: "Unlimited",
        timer: "No limit",
        reveals: "5 clear reveals",
        penalty: "None",
      },
      medium: {
        tagline: "For football enthusiasts.",
        questions: 5,
        poolLabel: "Elite internationals",
        hints: "2 per round",
        timer: "30 seconds",
        reveals: "Slower progression",
        penalty: "None",
      },
      hard: {
        tagline: "Only for true football experts.",
        questions: 5,
        poolLabel: "World Cup legends & heroes",
        hints: "Disabled",
        timer: "15 seconds",
        reveals: "Tight crops only",
        penalty: "-50 per wrong",
      },
    },
  },
  {
    id: "mcq",
    title: "FIFA World Cup Quiz",
    description: "Test your World Cup knowledge across eras.",
    image: "/games/trophy-moment.jpg",
    imageAlt: "Football trophy celebration",
    accent: "navy",
    playRoute: (d) => `/games/mcq/${d}`,
    difficulties: {
      easy: {
        tagline: "Perfect for casual fans.",
        questions: 10,
        poolLabel: "20 casual fan questions",
        hints: "Explanations",
        timer: "No limit",
        choices: "4 choices",
        penalty: "None",
      },
      medium: {
        tagline: "For football enthusiasts.",
        questions: 10,
        poolLabel: "20 fan-level questions",
        hints: "Explanations",
        timer: "45 seconds",
        choices: "4 choices",
        penalty: "None",
      },
      hard: {
        tagline: "Only for true football experts.",
        questions: 10,
        poolLabel: "20 expert trivia questions",
        hints: "No explanations delay",
        timer: "20 seconds",
        choices: "6 choices",
        penalty: "Faster pace",
      },
    },
  },
  {
    id: "quotes",
    title: "Who Said It?",
    description: "Match iconic quotes to football legends.",
    image: "/games/quotes-atmosphere.jpg",
    imageAlt: "Football stadium crowd",
    accent: "gold",
    playRoute: (d) => `/games/quotes/${d}`,
    difficulties: {
      easy: {
        tagline: "Perfect for casual fans.",
        questions: 8,
        poolLabel: "Messi, Ronaldo & superstars",
        hints: "None",
        timer: "No limit",
        choices: "4 choices",
        penalty: "None",
      },
      medium: {
        tagline: "For football enthusiasts.",
        questions: 8,
        poolLabel: "Coaches & personalities",
        hints: "None",
        timer: "30 seconds",
        choices: "4 choices",
        penalty: "None",
      },
      hard: {
        tagline: "Only for true football experts.",
        questions: 8,
        poolLabel: "Historic & obscure quotes",
        hints: "Disabled",
        timer: "15 seconds",
        choices: "5 choices",
        penalty: "Strict scoring",
      },
    },
  },
];

export function getGameById(id) {
  return GAMES.find((g) => g.id === id);
}

export function getDifficultyConfig(gameId, slug) {
  const game = getGameById(gameId);
  const meta = DIFFICULTY_META[slug];
  const settings = game?.difficulties?.[slug];
  if (!game || !meta || !settings) return null;
  return { game, meta, settings };
}

export function getThemeClass(slug) {
  return `theme-${slug}`;
}
