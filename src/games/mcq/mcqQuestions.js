export const MCQ_CATEGORIES = {
  basics: "Football Basics",
  history: "World Cup History",
  records: "Records & Stats",
  venues: "Cities & Stadiums",
  legends: "Players & Awards",
  expert: "Expert Trivia",
};

/** Casual fan — no overlap with other tiers */
export const MCQ_EASY = [
  { id: "e1", category: "basics", question: "Which country won the FIFA World Cup in 2022?", options: ["Argentina", "France", "Brazil", "Germany"], answer: "Argentina", explanation: "Argentina beat France on penalties in Qatar 2022." },
  { id: "e2", category: "basics", question: "Cristiano Ronaldo represents which national team?", options: ["Portugal", "Brazil", "Spain", "Argentina"], answer: "Portugal", explanation: "Ronaldo is Portugal's all-time leading scorer." },
  { id: "e3", category: "basics", question: "What sport is FIFA primarily associated with?", options: ["Football (Soccer)", "Basketball", "Cricket", "Rugby"], answer: "Football (Soccer)", explanation: "FIFA governs international association football." },
  { id: "e4", category: "basics", question: "Which country has won the most World Cups?", options: ["Brazil", "Germany", "Italy", "Argentina"], answer: "Brazil", explanation: "Brazil has won five World Cup titles." },
  { id: "e5", category: "basics", question: "Lionel Messi won his first World Cup with which country?", options: ["Argentina", "Spain", "France", "Uruguay"], answer: "Argentina", explanation: "Messi lifted the trophy with Argentina in 2022." },
  { id: "e6", category: "basics", question: "The World Cup is held every how many years?", options: ["4 years", "2 years", "3 years", "5 years"], answer: "4 years", explanation: "The tournament takes place every four years." },
  { id: "e7", category: "basics", question: "Which country hosted the 2018 World Cup?", options: ["Russia", "Qatar", "Brazil", "South Africa"], answer: "Russia", explanation: "France won the 2018 tournament in Russia." },
  { id: "e8", category: "basics", question: "Which country will host the 2034 World Cup?", options: ["Saudi Arabia", "USA", "Australia", "Japan"], answer: "Saudi Arabia", explanation: "Saudi Arabia was confirmed as 2034 host." },
  { id: "e9", category: "basics", question: "Which nation did France beat in the 2018 World Cup final?", options: ["Croatia", "Belgium", "Brazil", "England"], answer: "Croatia", explanation: "France won 4–2 in Moscow." },
  { id: "e10", category: "basics", question: "Neymar is a famous player from which country?", options: ["Brazil", "Portugal", "Argentina", "Colombia"], answer: "Brazil", explanation: "Neymar is one of Brazil's biggest modern stars." },
  { id: "e11", category: "history", question: "Which country hosted the 2014 World Cup?", options: ["Brazil", "Germany", "Russia", "South Africa"], answer: "Brazil", explanation: "Germany won the 2014 final at the Maracanã." },
  { id: "e12", category: "history", question: "Which country hosted the 2010 World Cup?", options: ["South Africa", "Brazil", "Germany", "Japan"], answer: "South Africa", explanation: "South Africa 2010 was the first World Cup in Africa." },
  { id: "e13", category: "basics", question: "Erling Haaland represents which country?", options: ["Norway", "Denmark", "Sweden", "England"], answer: "Norway", explanation: "Haaland is Norway's star striker." },
  { id: "e14", category: "basics", question: "Mohamed Salah plays internationally for which country?", options: ["Egypt", "Morocco", "Algeria", "Tunisia"], answer: "Egypt", explanation: "Salah is Egypt's captain and top scorer." },
  { id: "e15", category: "basics", question: "Kylian Mbappé won the 2018 World Cup with which nation?", options: ["France", "Belgium", "Portugal", "Senegal"], answer: "France", explanation: "Mbappé starred for France as a teenager in 2018." },
  { id: "e16", category: "history", question: "Which country won the 2010 World Cup?", options: ["Spain", "Netherlands", "Germany", "Brazil"], answer: "Spain", explanation: "Spain won their first title in South Africa." },
  { id: "e17", category: "basics", question: "What colour is the FIFA World Cup trophy?", options: ["Gold", "Silver", "Bronze", "Blue"], answer: "Gold", explanation: "The trophy is made of 18-carat gold." },
  { id: "e18", category: "history", question: "Germany won the 2014 World Cup final 1–0 against:", options: ["Argentina", "Brazil", "Netherlands", "France"], answer: "Argentina", explanation: "Mario Götze scored the extra-time winner." },
  { id: "e19", category: "basics", question: "Which two countries co-host the 2026 World Cup with the USA?", options: ["Mexico and Canada", "Brazil and Argentina", "Spain and Portugal", "Japan and Korea"], answer: "Mexico and Canada", explanation: "USA, Mexico, and Canada will co-host in 2026." },
  { id: "e20", category: "basics", question: "Which country hosted the 2022 World Cup?", options: ["Qatar", "UAE", "Saudi Arabia", "Kuwait"], answer: "Qatar", explanation: "Qatar 2022 was the first World Cup in the Middle East." },
];

/** Football fan knowledge — separate pool, no shared question IDs */
export const MCQ_MEDIUM = [
  { id: "m1", category: "venues", question: "In which city was the 2022 World Cup final played?", options: ["Lusail", "Doha", "Al Khor", "Jeddah"], answer: "Lusail", explanation: "The final was at Lusail Iconic Stadium near Doha." },
  { id: "m2", category: "legends", question: "Who won the Golden Ball at the 2018 World Cup?", options: ["Luka Modrić", "Kylian Mbappé", "Harry Kane", "Antoine Griezmann"], answer: "Luka Modrić", explanation: "Modrić won the award as Croatia reached the final." },
  { id: "m3", category: "venues", question: "Which stadium hosted the 2014 World Cup final?", options: ["Maracanã", "Arena Corinthians", "Mineirão", "Castelão"], answer: "Maracanã", explanation: "Germany beat Argentina at the Maracanã in Rio." },
  { id: "m4", category: "records", question: "Who holds the record for most World Cup goals?", options: ["Miroslav Klose", "Ronaldo Nazário", "Pelé", "Gerd Müller"], answer: "Miroslav Klose", explanation: "Klose scored 16 World Cup goals." },
  { id: "m5", category: "venues", question: "Which stadium hosted the 2010 World Cup final in Johannesburg?", options: ["Soccer City", "Ellis Park", "Loftus Versfeld", "Moses Mabhida"], answer: "Soccer City", explanation: "Spain beat the Netherlands at Soccer City." },
  { id: "m6", category: "legends", question: "Who won the Golden Boot at the 2022 World Cup?", options: ["Kylian Mbappé", "Lionel Messi", "Olivier Giroud", "Julian Alvarez"], answer: "Kylian Mbappé", explanation: "Mbappé scored eight goals including a final hat-trick." },
  { id: "m7", category: "history", question: "Which was the first World Cup held in Asia?", options: ["2002", "2018", "2022", "1994"], answer: "2002", explanation: "Japan and South Korea co-hosted in 2002." },
  { id: "m8", category: "venues", question: "Wembley Stadium is in which country?", options: ["England", "Scotland", "Wales", "Ireland"], answer: "England", explanation: "Wembley is England's national stadium." },
  { id: "m9", category: "records", question: "Which player has the most World Cup appearances?", options: ["Lothar Matthäus", "Miroslav Klose", "Cristiano Ronaldo", "Lionel Messi"], answer: "Lothar Matthäus", explanation: "Matthäus played 25 World Cup matches." },
  { id: "m10", category: "history", question: "Which nation won the 1966 World Cup on home soil?", options: ["England", "West Germany", "Portugal", "Brazil"], answer: "England", explanation: "England beat West Germany 4–2 at Wembley." },
  { id: "m11", category: "venues", question: "Estadio Azteca is located in which city?", options: ["Mexico City", "Guadalajara", "Monterrey", "Puebla"], answer: "Mexico City", explanation: "The Azteca hosted two World Cup finals." },
  { id: "m12", category: "legends", question: "Which Italian goalkeeper captained the 2006 World Cup win?", options: ["Gianluigi Buffon", "Dino Zoff", "Francesco Toldo", "Gianluigi Donnarumma"], answer: "Gianluigi Buffon", explanation: "Buffon was a cornerstone of Italy's 2006 triumph." },
  { id: "m13", category: "records", question: "Just Fontaine scored how many goals at the 1958 World Cup?", options: ["13", "10", "11", "15"], answer: "13", explanation: "Fontaine's 13 goals remain a single-tournament record." },
  { id: "m14", category: "history", question: "Which country won the 1998 World Cup final at home?", options: ["France", "Brazil", "Croatia", "Netherlands"], answer: "France", explanation: "Zidane scored twice as France beat Brazil 3–0." },
  { id: "m15", category: "venues", question: "Which stadium is nicknamed 'La Bombonera'?", options: ["Boca Juniors", "River Plate", "San Lorenzo", "Racing Club"], answer: "Boca Juniors", explanation: "Boca's home in Buenos Aires is La Bombonera." },
  { id: "m16", category: "legends", question: "Diego Maradona led which nation to the 1986 World Cup title?", options: ["Argentina", "Brazil", "Uruguay", "Italy"], answer: "Argentina", explanation: "Maradona captained Argentina in Mexico 1986." },
  { id: "m17", category: "records", question: "Which nation has appeared in the most World Cups without winning?", options: ["Mexico", "Belgium", "Netherlands", "Portugal"], answer: "Mexico", explanation: "Mexico has qualified 17 times without reaching a final." },
  { id: "m18", category: "history", question: "Italy won back-to-back World Cups in which years?", options: ["1934 and 1938", "1982 and 1986", "2006 and 2010", "1990 and 1994"], answer: "1934 and 1938", explanation: "Italy successfully defended the title in 1938." },
  { id: "m19", category: "venues", question: "King Fahd International Stadium is in which Saudi city?", options: ["Riyadh", "Jeddah", "Dammam", "Mecca"], answer: "Riyadh", explanation: "Riyadh is a key 2034 host city." },
  { id: "m20", category: "legends", question: "Pelé won three World Cups with which country?", options: ["Brazil", "Argentina", "Uruguay", "Italy"], answer: "Brazil", explanation: "Pelé won in 1958, 1962, and 1970." },
];

/** Expert trivia — separate pool for dedicated fans */
export const MCQ_HARD = [
  { id: "h1", category: "expert", question: "Which nation eliminated Brazil in the 1982 World Cup second group stage?", options: ["Italy", "Argentina", "France", "West Germany"], answer: "Italy", explanation: "Paolo Rossi scored a hat-trick in Barcelona as Italy won 3–2." },
  { id: "h2", category: "expert", question: "Who scored the winning penalty for West Germany in the 1990 World Cup final?", options: ["Andreas Brehme", "Lothar Matthäus", "Jürgen Klinsmann", "Rudi Völler"], answer: "Andreas Brehme", explanation: "Brehme converted an 85th-minute penalty against Argentina." },
  { id: "h3", category: "expert", question: "Which goalkeeper kept the most clean sheets at the 2006 World Cup?", options: ["Gianluigi Buffon", "Jens Lehmann", "Fabien Barthez", "Petr Čech"], answer: "Gianluigi Buffon", explanation: "Buffon kept five clean sheets as Italy won the tournament." },
  { id: "h4", category: "expert", question: "Which nation won the 1950 World Cup in Brazil?", options: ["Uruguay", "Brazil", "Sweden", "Italy"], answer: "Uruguay", explanation: "Uruguay's 2–1 win is known as the Maracanazo." },
  { id: "h5", category: "expert", question: "Who scored a hat-trick in the 1966 World Cup final?", options: ["Geoff Hurst", "Pelé", "Eusébio", "Franz Beckenbauer"], answer: "Geoff Hurst", explanation: "Hurst remains the only player with a World Cup final hat-trick." },
  { id: "h6", category: "expert", question: "Which player scored the fastest hat-trick in World Cup history?", options: ["Ernie Brandts", "Geoff Hurst", "Just Fontaine", "Harry Kane"], answer: "Ernie Brandts", explanation: "Brandts scored three in about 26 minutes for the Netherlands in 1978." },
  { id: "h7", category: "expert", question: "Which country lost the 1974 World Cup final to West Germany?", options: ["Netherlands", "Brazil", "Poland", "Argentina"], answer: "Netherlands", explanation: "Gerd Müller scored the winner in Munich." },
  { id: "h8", category: "expert", question: "Roger Milla became a World Cup icon at age 38 for which country?", options: ["Cameroon", "Nigeria", "Senegal", "Ghana"], answer: "Cameroon", explanation: "Milla's celebrations at Italia '90 captivated global audiences." },
  { id: "h9", category: "expert", question: "Which World Cups were cancelled due to World War II?", options: ["1942 and 1946", "1940 and 1944", "1938 and 1942", "1944 only"], answer: "1942 and 1946", explanation: "No tournaments were held in 1942 or 1946." },
  { id: "h10", category: "expert", question: "Who is the youngest goal scorer in World Cup history?", options: ["Pelé", "Michael Owen", "Manuel Rosas", "Lamine Yamal"], answer: "Pelé", explanation: "Pelé was 17 years 239 days when he scored in 1958." },
  { id: "h11", category: "expert", question: "Which nation finished as World Cup runner-up three times without winning until 2010?", options: ["Netherlands", "Czech Republic", "Hungary", "Sweden"], answer: "Netherlands", explanation: "The Netherlands lost finals in 1974, 1978, and 2010 before any title." },
  { id: "h12", category: "expert", question: "Which country hosted the 1982 World Cup?", options: ["Spain", "Italy", "Mexico", "Argentina"], answer: "Spain", explanation: "Italy won the 1982 tournament in Spain." },
  { id: "h13", category: "expert", question: "Which Bulgarian striker won the Golden Boot at the 1994 World Cup?", options: ["Hristo Stoichkov", "Yordan Letchkov", "Krasimir Balakov", "Emil Kostadinov"], answer: "Hristo Stoichkov", explanation: "Stoichkov shared the Golden Boot with Oleg Salenko in 1994." },
  { id: "h14", category: "expert", question: "Fabio Grosso scored the decisive penalty for Italy in which World Cup final?", options: ["2006", "1994", "1982", "2010"], answer: "2006", explanation: "Grosso's penalty beat France in the Berlin shootout." },
  { id: "h15", category: "expert", question: "Jorge Burruchaga scored the winning goal in which World Cup final?", options: ["1986", "1982", "1990", "1978"], answer: "1986", explanation: "Burruchaga scored Argentina's third in the 3–2 win over West Germany." },
  { id: "h16", category: "expert", question: "Which player scored the 'Goal of the Century' at the 1986 World Cup?", options: ["Diego Maradona", "Lothar Matthäus", "Karl-Heinz Rummenigge", "Gerd Müller"], answer: "Diego Maradona", explanation: "Maradona's solo run against England is iconic." },
  { id: "h17", category: "expert", question: "Which was the first African nation to reach a World Cup semi-final?", options: ["Morocco", "Senegal", "Cameroon", "Ghana"], answer: "Morocco", explanation: "Morocco reached the semi-finals at Qatar 2022." },
  { id: "h18", category: "expert", question: "Carlos Alberto scored in which World Cup final?", options: ["1970", "1966", "1974", "1982"], answer: "1970", explanation: "Carlos Alberto's strike capped Brazil's 4–1 win over Italy." },
  { id: "h19", category: "expert", question: "Davor Šuker won the Golden Boot at which World Cup?", options: ["1998", "2002", "1994", "2006"], answer: "1998", explanation: "Šuker scored six goals as Croatia finished third in France." },
  { id: "h20", category: "expert", question: "Which goalkeeper has the most World Cup clean sheets overall?", options: ["Peter Shilton", "Gianluigi Buffon", "Manuel Neuer", "Lev Yashin"], answer: "Peter Shilton", explanation: "Shilton kept 10 clean sheets across three World Cups." },
];

const POOLS = { easy: MCQ_EASY, medium: MCQ_MEDIUM, hard: MCQ_HARD };

export function buildMcqRound(difficulty, count = 10) {
  const pool = POOLS[difficulty] || [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));
  const optionCount = difficulty === "hard" ? 6 : 4;
  const allOptions = [...new Set([...MCQ_EASY, ...MCQ_MEDIUM, ...MCQ_HARD].flatMap((q) => q.options))];

  return selected.map((q) => {
    let distractors = [...q.options].filter((o) => o !== q.answer).sort(() => Math.random() - 0.5);
    const extras = allOptions.filter((o) => o !== q.answer && !distractors.includes(o));
    while (distractors.length < optionCount - 1 && extras.length > 0) {
      distractors.push(extras.splice(Math.floor(Math.random() * extras.length), 1)[0]);
    }
    distractors = distractors.slice(0, optionCount - 1);
    return {
      ...q,
      options: [q.answer, ...distractors].sort(() => Math.random() - 0.5),
    };
  });
}

export function getMcqMechanics(difficulty) {
  const map = {
    easy: { questionTimer: null, feedbackMs: 1800, showExplain: true },
    medium: { questionTimer: 45, feedbackMs: 1600, showExplain: true },
    hard: { questionTimer: 20, feedbackMs: 900, showExplain: true },
  };
  return map[difficulty] || map.easy;
}

export function getMcqPoolSize(difficulty) {
  return (POOLS[difficulty] || []).length;
}

/** @deprecated use tier pools */
export const MCQ_QUESTIONS = [...MCQ_EASY, ...MCQ_MEDIUM, ...MCQ_HARD];
