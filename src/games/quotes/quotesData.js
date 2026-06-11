export const QUOTE_SPEAKERS = [
  "Cristiano Ronaldo",
  "Lionel Messi",
  "Neymar Jr.",
  "Kylian Mbappé",
  "Mohamed Salah",
  "Pep Guardiola",
  "José Mourinho",
  "Arsène Wenger",
  "Sir Alex Ferguson",
  "Jürgen Klopp",
  "Zinedine Zidane",
  "Gary Lineker",
  "Fabio Capello",
  "Jorge Burruchaga",
  "Hristo Stoichkov",
  "Carlos Alberto",
];

const EASY_SPEAKERS = ["Cristiano Ronaldo", "Lionel Messi", "Neymar Jr.", "Kylian Mbappé", "Mohamed Salah"];

const MEDIUM_SPEAKERS = [
  "Pep Guardiola",
  "José Mourinho",
  "Arsène Wenger",
  "Sir Alex Ferguson",
  "Jürgen Klopp",
  "Zinedine Zidane",
  "Gary Lineker",
  "Fabio Capello",
];

/** Easy — instantly recognizable superstar quotes only */
export const QUOTES_EASY = [
  { id: "qe1", speaker: "Cristiano Ronaldo", quote: "Your love makes me strong, your hate makes me unstoppable." },
  { id: "qe2", speaker: "Lionel Messi", quote: "You have to fight to reach your dream. You have to sacrifice and work hard for it." },
  { id: "qe3", speaker: "Neymar Jr.", quote: "I always want to be the best. I want to be the best Neymar I can be." },
  { id: "qe4", speaker: "Kylian Mbappé", quote: "I have always dreamed of playing football and scoring goals." },
  { id: "qe5", speaker: "Mohamed Salah", quote: "I always try to be the best version of myself on and off the pitch." },
  { id: "qe6", speaker: "Cristiano Ronaldo", quote: "I see myself as the best footballer in the world." },
  { id: "qe7", speaker: "Lionel Messi", quote: "I start early and I stay late, day after day, year after year." },
  { id: "qe8", speaker: "Neymar Jr.", quote: "Football is my life. It is what I love most in the world." },
  { id: "qe9", speaker: "Kylian Mbappé", quote: "I want to win everything — that is my mentality." },
  { id: "qe10", speaker: "Mohamed Salah", quote: "Always believe in yourself and keep working hard." },
];

/** Medium — managers, analysts, former stars */
export const QUOTES_MEDIUM = [
  { id: "qm1", speaker: "Pep Guardiola", quote: "The most important thing after the result is the way you play." },
  { id: "qm2", speaker: "José Mourinho", quote: "I am a special one." },
  { id: "qm3", speaker: "Arsène Wenger", quote: "A manager is a guide. He takes a group of people and gives them direction." },
  { id: "qm4", speaker: "Sir Alex Ferguson", quote: "Football, bloody hell!" },
  { id: "qm5", speaker: "Jürgen Klopp", quote: "Football is the most important of the least important things in life." },
  { id: "qm6", speaker: "Zinedine Zidane", quote: "Everything I have achieved in football is due to playing football in the streets with my friends." },
  { id: "qm7", speaker: "Gary Lineker", quote: "Football is a simple game. Twenty-two men chase a ball for 90 minutes and at the end, the Germans always win." },
  { id: "qm8", speaker: "Fabio Capello", quote: "When you have the ball, you have to know what you are going to do with it before you get it." },
  { id: "qm9", speaker: "Pep Guardiola", quote: "I want my players to be happy. If they are happy, they play better." },
  { id: "qm10", speaker: "Jürgen Klopp", quote: "I am the normal one." },
];

/** Hard — rare historical quotes, difficult attribution */
export const QUOTES_HARD = [
  { id: "qh1", speaker: "Sir Alex Ferguson", quote: "My greatest challenge was knocking Liverpool right off their f***ing perch." },
  { id: "qh2", speaker: "José Mourinho", quote: "Look, I'm a coach, I'm not Harry Potter." },
  { id: "qh3", speaker: "Arsène Wenger", quote: "When you give success to stupid people, it makes them more stupid, not more intelligent." },
  { id: "qh4", speaker: "Sir Alex Ferguson", quote: "Sometimes you have a noisy neighbour. You cannot do anything about that." },
  { id: "qh5", speaker: "Jürgen Klopp", quote: "If you win, you have to change. If you lose, you have to change." },
  { id: "qh6", speaker: "Zinedine Zidane", quote: "I have a need to play intensely every day, to fight every match hard." },
  { id: "qh7", speaker: "Hristo Stoichkov", quote: "Football is an art, and I am an artist." },
  { id: "qh8", speaker: "Carlos Alberto", quote: "The ball is like a woman — she loves to be treated with elegance." },
  { id: "qh9", speaker: "Jorge Burruchaga", quote: "That goal was for all of Argentina — we dreamed of it every day." },
  { id: "qh10", speaker: "Pep Guardiola", quote: "I am not a coach for the tackles, so I don't train the tackles." },
];

const POOLS = { easy: QUOTES_EASY, medium: QUOTES_MEDIUM, hard: QUOTES_HARD };
const SPEAKER_POOLS = { easy: EASY_SPEAKERS, medium: MEDIUM_SPEAKERS, hard: QUOTE_SPEAKERS };

function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function getQuotesMechanics(difficulty) {
  const map = {
    easy: { questionTimer: null, optionCount: 4 },
    medium: { questionTimer: 30, optionCount: 4 },
    hard: { questionTimer: 15, optionCount: 5 },
  };
  return map[difficulty] || map.easy;
}

export function buildQuotesRound(difficulty, count = 8) {
  const mechanics = getQuotesMechanics(difficulty);
  const pool = POOLS[difficulty] || [];
  const speakerPool = SPEAKER_POOLS[difficulty] || QUOTE_SPEAKERS;
  const selected = shuffle(pool).slice(0, Math.min(count, pool.length));

  return selected.map((item) => {
    const distractors = shuffle(speakerPool.filter((s) => s !== item.speaker)).slice(
      0,
      mechanics.optionCount - 1
    );
    return {
      ...item,
      options: shuffle([item.speaker, ...distractors]),
    };
  });
}
