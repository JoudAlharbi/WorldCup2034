export const QUOTE_SPEAKERS = [
  "Cristiano Ronaldo",
  "Lionel Messi",
  "Pep Guardiola",
  "José Mourinho",
  "Arsène Wenger",
  "Sir Alex Ferguson",
  "Jürgen Klopp",
  "Zinedine Zidane",
];

export const QUOTES = [
  { id: 1, speaker: "Cristiano Ronaldo", difficulty: "easy", quote: "Your love makes me strong, your hate makes me unstoppable." },
  { id: 2, speaker: "Cristiano Ronaldo", difficulty: "medium", quote: "I don't follow the trends. I set them." },
  { id: 3, speaker: "Cristiano Ronaldo", difficulty: "hard", quote: "Talent without working hard is nothing." },
  { id: 4, speaker: "Lionel Messi", difficulty: "easy", quote: "You have to fight to reach your dream. You have to sacrifice and work hard for it." },
  { id: 5, speaker: "Lionel Messi", difficulty: "medium", quote: "I start early and I stay late, day after day, year after year. It took me 17 years and 114 days to become an overnight success." },
  { id: 6, speaker: "Lionel Messi", difficulty: "hard", quote: "Something deep in my character allows me to take the hits and get on with trying to win." },
  { id: 7, speaker: "Pep Guardiola", difficulty: "easy", quote: "The most important thing after the result is the way you play." },
  { id: 8, speaker: "Pep Guardiola", difficulty: "medium", quote: "I am not a coach for the tackles, so I don't train the tackles." },
  { id: 9, speaker: "Pep Guardiola", difficulty: "hard", quote: "We want to win the game by playing football. We want to be better than the opponent." },
  { id: 10, speaker: "José Mourinho", difficulty: "easy", quote: "I am a special one." },
  { id: 11, speaker: "José Mourinho", difficulty: "medium", quote: "Please don't call me arrogant, but I'm a European champion and I think I'm a special one." },
  { id: 12, speaker: "José Mourinho", difficulty: "hard", quote: "Look, I'm a coach, I'm not Harry Potter." },
  { id: 13, speaker: "Arsène Wenger", difficulty: "easy", quote: "When you look at people who are successful, you will find that they aren't the people who are motivated, but have consistency in their motivation." },
  { id: 14, speaker: "Arsène Wenger", difficulty: "medium", quote: "A manager is a guide. He takes a group of people and gives them direction." },
  { id: 15, speaker: "Arsène Wenger", difficulty: "hard", quote: "When you give success to stupid people, it makes them more stupid, not more intelligent." },
  { id: 16, speaker: "Sir Alex Ferguson", difficulty: "easy", quote: "My greatest challenge was knocking Liverpool right off their f***ing perch." },
  { id: 17, speaker: "Sir Alex Ferguson", difficulty: "medium", quote: "The work of a team should always embrace a great player, but the great player must always work." },
  { id: 18, speaker: "Sir Alex Ferguson", difficulty: "hard", quote: "Sometimes you have a noisy neighbour. You cannot do anything about that. You just have to get on with your life." },
  { id: 19, speaker: "Jürgen Klopp", difficulty: "easy", quote: "Football is the most important of the least important things in life." },
  { id: 20, speaker: "Jürgen Klopp", difficulty: "medium", quote: "I am the normal one." },
  { id: 21, speaker: "Jürgen Klopp", difficulty: "hard", quote: "If you win, you have to change. If you lose, you have to change." },
  { id: 22, speaker: "Zinedine Zidane", difficulty: "easy", quote: "I once cried because I had no shoes to play football with my friends, but one day I saw a man who had no feet and I realized how rich I am." },
  { id: 23, speaker: "Zinedine Zidane", difficulty: "medium", quote: "Everything I have achieved in football is due to playing football in the streets with my friends." },
  { id: 24, speaker: "Zinedine Zidane", difficulty: "hard", quote: "I have a need to play intensely every day, to fight every match hard." },
  { id: 25, speaker: "Sir Alex Ferguson", difficulty: "easy", quote: "Football, bloody hell!" },
  { id: 26, speaker: "José Mourinho", difficulty: "easy", quote: "We are the special ones." },
  { id: 27, speaker: "Jürgen Klopp", difficulty: "medium", quote: "We have to change from doubters to believers — and back again." },
  { id: 28, speaker: "Pep Guardiola", difficulty: "easy", quote: "I want my players to be happy. If they are happy, they play better." },
  { id: 29, speaker: "Arsène Wenger", difficulty: "easy", quote: "The target is to win the title, not to finish fourth." },
  { id: 30, speaker: "Cristiano Ronaldo", difficulty: "easy", quote: "I see myself as the best footballer in the world. If you don't believe you are the best, then you will never achieve all that you are capable of." },
];

function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

export function buildQuotesRound(difficulty, count = 8) {
  const pool = QUOTES.filter((q) => q.difficulty === difficulty);
  const selected = shuffle(pool).slice(0, Math.min(count, pool.length));

  return selected.map((item) => {
    const distractors = shuffle(QUOTE_SPEAKERS.filter((s) => s !== item.speaker)).slice(0, 3);
    return {
      ...item,
      options: shuffle([item.speaker, ...distractors]),
    };
  });
}
