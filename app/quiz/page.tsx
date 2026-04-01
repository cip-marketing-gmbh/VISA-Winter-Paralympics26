"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, Question } from "@/data/questions";

export default function QuizPage() {
  const router = useRouter();
  const [category, setCategory] = useState<"kids" | "adults" | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Hole die Wahl vom Startbildschirm
    const savedCategory = sessionStorage.getItem("category") as "kids" | "adults";
    if (!savedCategory) {
      router.push("/"); // Zurück, falls jemand die Seite direkt aufruft
      return;
    }
    setCategory(savedCategory);
  }, [router]);

  if (!category) return null;

  const currentQuestions = questions[category];
  const currentQuestion = currentQuestions[currentIndex];

  const handleAnswer = (selectedOption: string) => {
    // Falls die Antwort richtig ist, Punkt zählen
    if (selectedOption === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    // Nächste Frage oder zum Ziel
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Endergebnis kurz speichern und weiter
      sessionStorage.setItem("finalScore", (score + (selectedOption === currentQuestion.answer ? 1 : 0)).toString());
      router.push("/result");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Fortschrittsanzeige */}
      <div className="absolute top-10 left-0 w-full px-10">
        <div className="flex justify-between mb-2 text-xs font-bold text-visa-blue uppercase tracking-widest">
          <span>{category} Quiz</span>
          <span>Question {currentIndex + 1} of {currentQuestions.length}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-visa-gold h-full transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border-t-8 border-visa-blue">
        <h2 className="text-2xl font-bold text-visa-blue mb-8 text-center">
          {currentQuestion.text}
        </h2>

        <div className="grid gap-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full p-5 text-lg font-medium border-2 border-gray-100 rounded-xl hover:border-visa-gold hover:bg-gray-50 transition-all text-left"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
