export type Question = {
  id: number;
  text: string;
  options: string[];
  answer: string;
};

export const questions: { kids: Question[]; adults: Question[] } = {
  kids: [
    {
      id: 1,
      text: "Wie heißen die drei Formen im Paralympics-Logo?",
      options: ["Kreise", "Agitos", "Pfeile"],
      answer: "Agitos",
    },
    {
      id: 2,
      text: "In welchem Fahrzeug spielen die Basketballprofis bei den Paralympics?",
      options: ["Rennauto", "Rollstuhl", "Fahrrad"],
      answer: "Rollstuhl",
    },
    {
      id: 3,
      text: "Gibt es auch Winter-Paralympics (z.B. Skifahren)?",
      options: ["Ja", "Nein", "Nur in den Bergen"],
      answer: "Ja",
    },
    {
      id: 4,
      text: "Was bekommen die Athleten, wenn sie gewinnen?",
      options: ["Eine Pizza", "Eine Medaille", "Ein Kuscheltier"],
      answer: "Eine Medaille",
    },
    {
      id: 5,
      text: "Können blinde Menschen bei den Paralympics mitmachen?",
      options: ["Ja, oft mit einem Guide", "Nein", "Nur mit Brille"],
      answer: "Ja, oft mit einem Guide",
    },
  ],
  adults: [
    {
      id: 1,
      text: "In welcher Stadt fanden 1960 die ersten offiziellen Sommer-Paralympics statt?",
      options: ["London", "Rom", "Tokio"],
      answer: "Rom",
    },
    {
      id: 2,
      text: "Was symbolisieren die drei 'Agitos' im Paralympics-Logo?",
      options: ["Geist, Körper und Seele", "Die drei Kontinente", "Bewegung"],
      answer: "Geist, Körper und Seele",
    },
    {
      id: 3,
      text: "Welche Sportart gibt es nur bei den Paralympics, nicht bei den Olympischen Spielen?",
      options: ["Boccia", "Para-Schwimmen", "Rollstuhlfechten"],
      answer: "Boccia",
    },
    {
      id: 4,
      text: "Wie oft finden die Paralympischen Spiele normalerweise statt?",
      options: ["Alle 2 Jahre", "Alle 4 Jahre", "Alle 5 Jahre"],
      answer: "Alle 4 Jahre",
    },
    {
      id: 5,
      text: "Was ist das Hauptziel des 'Klassifizierungs'-Systems bei den Paralympics?",
      options: [
        "Altersgruppen trennen",
        "Fairer Wettkampf trotz unterschiedlicher Beeinträchtigungen",
        "Nationalitäten ordnen",
      ],
      answer: "Fairer Wettkampf trotz unterschiedlicher Beeinträchtigungen",
    },
  ],
};
