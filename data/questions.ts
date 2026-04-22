export type Question = {
  id: number;
  text: string;
  options: string[];
  answer: string;
  feedback: string;
  multiSelect?: boolean;
};

export const questions: { kids: Question[]; adults: Question[] } = {
  kids: [
    {
      id: 1,
      text: "Warum gibt es im paralympischen Sport Klassifizierungen?",
      options: ["Damit es fair ist", "Damit es schneller geht", "Damit weniger mitmachen"],
      answer: "Damit es fair ist",
      feedback: "Klassifizierung sorgt für faire Wettbewerbe.",
    },
    {
      id: 2,
      text: "Welche Sportarten gibt es bei den Paralympics? (Mehrfachauswahl)",
      options: ["Goalball", "Boccia", "Rollstuhlrugby", "Baseball"],
      answer: "Goalball,Boccia,Rollstuhlrugby",
      feedback: "Das sind echte paralympische Sportarten.",
      multiSelect: true,
    },
    {
      id: 3,
      text: "Was ist besonders an Goalball?",
      options: ["Man kann den Ball hören", "Es gibt keinen Ball", "Man spielt ohne Tor"],
      answer: "Man kann den Ball hören",
      feedback: "Der Ball macht Geräusche, damit die Spieler ihn hören können.",
    },
    {
      id: 4,
      text: "Wie schnell können Rennrollstühle fahren?",
      options: ["ca. 15 km/h", "ca. 25 km/h", "über 30 km/h"],
      answer: "über 30 km/h",
      feedback: "Top-Athlet*innen sind im Rennrollstuhl sehr schnell unterwegs.",
    },
    {
      id: 5,
      text: "Was beschreibt paralympischen Sport am besten?",
      options: ["Hochleistungssport", "Nur Freizeit", "Ohne Wettbewerb"],
      answer: "Hochleistungssport",
      feedback: "Paralympischer Sport ist Leistungssport auf hohem Niveau.",
    },
    {
      id: 6,
      text: "Was ist das Ziel von Klassifizierung?",
      options: ["Fairness im Wettbewerb", "Schnellere Spiele", "Weniger Teilnehmer"],
      answer: "Fairness im Wettbewerb",
      feedback: "Alle sollen unter vergleichbaren Bedingungen antreten.",
    },
    {
      id: 7,
      text: "Welche Aussage stimmt?",
      options: ["Training ist entscheidend für Erfolg", "Glück ist wichtiger", "Regeln sind egal"],
      answer: "Training ist entscheidend für Erfolg",
      feedback: "Training ist die Grundlage im Sport.",
    },
    {
      id: 8,
      text: "Welche Sportart gibt es nur bei den Paralympics?",
      options: ["Boccia", "Fußball", "Tennis"],
      answer: "Boccia",
      feedback: "Boccia ist eine spezielle paralympische Sportart.",
    },
    {
      id: 9,
      text: "Wann gewann Niko Kappel Paralympics-Gold?",
      options: ["2012", "2016", "2020"],
      answer: "2016",
      feedback: "2016 gewann er Gold bei den Paralympics.",
    },
    {
      id: 10,
      text: "Wie erfolgreich ist Anna-Lena Forster?",
      options: ["Mehrere Medaillen bei Paralympics", "Nur Teilnahme", "Keine Erfolge"],
      answer: "Mehrere Medaillen bei Paralympics",
      feedback: "Sie gehört zu den erfolgreichsten Athletinnen im Para Ski Alpin.",
    },
  ],
  adults: [
    {
      id: 1,
      text: "Wofür steht die Klassifizierung im paralympischen Sport?",
      options: [
        "Einteilung nach funktionellen Fähigkeiten im Sport",
        "Einteilung nach Alter",
        "Einteilung nach Nationalität",
      ],
      answer: "Einteilung nach funktionellen Fähigkeiten im Sport",
      feedback: "Die Klassifizierung sorgt dafür, dass Athlet*innen mit vergleichbaren Voraussetzungen gegeneinander antreten.",
    },
    {
      id: 2,
      text: "Welche Aussage zur Klassifizierung ist korrekt?",
      options: [
        "Sie basiert nur auf der medizinischen Diagnose",
        "Sie berücksichtigt sportartspezifische Anforderungen",
        "Sie wird einmal festgelegt und bleibt immer gleich",
      ],
      answer: "Sie berücksichtigt sportartspezifische Anforderungen",
      feedback: "Die Klassifizierung berücksichtigt die Anforderungen der jeweiligen Sportart und kann sich auch verändern.",
    },
    {
      id: 3,
      text: "Welche dieser Sportarten sind paralympisch? (Mehrfachauswahl)",
      options: ["Goalball", "Boccia", "Rollstuhlrugby", "Squash"],
      answer: "Goalball,Boccia,Rollstuhlrugby",
      feedback: "Goalball, Boccia und Rollstuhlrugby sind feste Bestandteile der Paralympics.",
      multiSelect: true,
    },
    {
      id: 4,
      text: "Was ist das Besondere an Goalball?",
      options: [
        "Der Ball ist hörbar und alle tragen Augenbinden",
        "Es wird ohne Ball gespielt",
        "Es gibt keine Teams",
      ],
      answer: "Der Ball ist hörbar und alle tragen Augenbinden",
      feedback: "Alle Spieler*innen tragen Augenbinden – so sind die Bedingungen gleich.",
    },
    {
      id: 5,
      text: "In welcher Sportart gibt es keine Entsprechung im olympischen Programm?",
      options: ["Boccia", "Leichtathletik", "Schwimmen"],
      answer: "Boccia",
      feedback: "Boccia ist eine paralympische Sportart ohne olympisches Pendant.",
    },
    {
      id: 6,
      text: "Wie schnell können Rennrollstühle im Wettkampf erreichen?",
      options: ["ca. 20 km/h", "ca. 30 km/h", "über 35 km/h"],
      answer: "über 35 km/h",
      feedback: "Top-Athlet*innen erreichen im Rennrollstuhl Geschwindigkeiten von über 35 km/h.",
    },
    {
      id: 7,
      text: "Was ist das Hauptziel der Klassifizierung?",
      options: ["Spannung erhöhen", "Fairen Wettbewerb ermöglichen", "Wettkämpfe verkürzen"],
      answer: "Fairen Wettbewerb ermöglichen",
      feedback: "Ziel ist es, möglichst faire Bedingungen im Wettbewerb zu schaffen.",
    },
    {
      id: 8,
      text: "Welche Aussage beschreibt paralympischen Spitzensport am besten?",
      options: [
        "Hochleistungssport auf internationalem Niveau",
        "Freizeitsport ohne Wettbewerb",
        "Training ohne Wettkämpfe",
      ],
      answer: "Hochleistungssport auf internationalem Niveau",
      feedback: "Paralympischer Sport ist internationaler Hochleistungssport.",
    },
    {
      id: 9,
      text: "In welcher Sportart spielen ausschließlich sehbehinderte Athlet*innen?",
      options: ["Goalball", "Rollstuhlbasketball", "Tischtennis"],
      answer: "Goalball",
      feedback: "Goalball ist speziell für blinde und sehbehinderte Athlet*innen entwickelt.",
    },
    {
      id: 10,
      text: "Welche Rolle spielen Hilfsmittel im paralympischen Sport?",
      options: [
        "Sie gleichen funktionelle Unterschiede aus und sind Teil der Leistung",
        "Sie ersetzen Training",
        "Sie sind in Wettkämpfen verboten",
      ],
      answer: "Sie gleichen funktionelle Unterschiede aus und sind Teil der Leistung",
      feedback: "Hilfsmittel wie Sportrollstühle oder Prothesen sind integraler Bestandteil des Sports.",
    },
    {
      id: 11,
      text: "Wie viele Sportarten gibt es ungefähr bei den Sommer-Paralympics?",
      options: ["ca. 10", "ca. 22", "über 40"],
      answer: "ca. 22",
      feedback: "Bei den Sommer-Paralympics gibt es über 20 Sportarten.",
    },
    {
      id: 12,
      text: "Welche Aussage trifft auf paralympische Wettkämpfe zu?",
      options: [
        "Sie sind national organisiert",
        "Sie folgen internationalen Regeln und Standards",
        "Sie sind nicht vergleichbar",
      ],
      answer: "Sie folgen internationalen Regeln und Standards",
      feedback: "Paralympische Wettkämpfe sind international standardisiert.",
    },
    {
      id: 13,
      text: "In welcher Klassifizierung startet Niko Kappel?",
      options: ["F41", "T54", "F11"],
      answer: "F41",
      feedback: "Niko Kappel startet in der Klasse F41. Das 'F' steht fuer 'Field' (Wurf- und Sprungdisziplinen), '41' ist die spezifische Klasse fuer Athlet*innen mit Kleinwuchs. Ziel ist fairer Wettkampf unter vergleichbaren Voraussetzungen.",
    },
    {
      id: 14,
      text: "Wie erfolgreich ist Anna-Lena Forster bei Paralympics?",
      options: [
        "Mehrere Goldmedaillen",
        "Eine Teilnahme",
        "Teilnahme bis zu Bronzemedaille",
      ],
      answer: "Mehrere Goldmedaillen",
      feedback: "Anna-Lena Forster hat mehrere Goldmedaillen gewonnen und gehört zur Weltspitze.",
    },
  ],
};
