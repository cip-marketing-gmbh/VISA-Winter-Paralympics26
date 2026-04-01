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
      text: "What are the three shapes in the Paralympics logo called?",
      options: ["Circles", "Agitos", "Arrows"],
      answer: "Agitos",
    },
    {
      id: 2,
      text: "In which vehicle do basketball pros play at the Paralympics?",
      options: ["Racing car", "Wheelchair", "Bicycle"],
      answer: "Wheelchair",
    },
    {
      id: 3,
      text: "Are there also Winter Paralympic Games (e.g. skiing)?",
      options: ["Yes", "No", "Only in the mountains"],
      answer: "Yes",
    },
    {
      id: 4,
      text: "What do the athletes receive when they win?",
      options: ["A pizza", "A medal", "A teddy bear"],
      answer: "A medal",
    },
    {
      id: 5,
      text: "Can blind people compete in the Paralympics?",
      options: ["Yes, often with a guide", "No", "Only if they wear glasses"],
      answer: "Yes, often with a guide",
    },
  ],
  adults: [
    {
      id: 1,
      text: "In which city were the first official Paralympic Summer Games held in 1960?",
      options: ["London", "Rome", "Tokyo"],
      answer: "Rome",
    },
    {
      id: 2,
      text: "What do the three 'Agitos' in the Paralympic logo symbolize?",
      options: ["Spirit, Body, and Mind", "The three continents", "Movement"],
      answer: "Spirit, Body, and Mind",
    },
    {
      id: 3,
      text: "Which sport is exclusively Paralympic and has no Olympic counterpart?",
      options: ["Boccia", "Para-Swimming", "Wheelchair Fencing"],
      answer: "Boccia",
    },
    {
      id: 4,
      text: "How often do the Paralympic Games normally take place?",
      options: ["Every 2 years", "Every 4 years", "Every 5 years"],
      answer: "Every 4 years",
    },
    {
      id: 5,
      text: "What is the main goal of the 'Classification' system in the Paralympics?",
      options: ["Separating age groups", "Fair competition despite different impairments", "Organizing nationalities"],
      answer: "Fair competition despite different impairments",
    },
  ],
};
