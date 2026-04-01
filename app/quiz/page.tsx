"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

export default function QuizPage() {
  const router = useRouter();
  const [category, setCategory] = useState<"kids" | "adults" | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedCategory = sessionStorage.getItem("category") as "kids" | "adults";
    if (!savedCategory) {
      router.push("/");
      return;
    }
    setCategory(savedCategory);
  }, [router]);

  if (!category) return null;

  const currentQuestions = questions[category];
  const currentQuestion = currentQuestions[currentIndex];

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === currentQuestion.answer;
    const newScore = isCorrect ? score + 1 : score;
    
    if (currentIndex < currentQuestions.length - 1) {
      setScore(newScore);
      setCurrentIndex(prev => prev + 1);
    } else {
      sessionStorage.setItem("finalScore", newScore.toString());
      router.push("/result");
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      {/* Header mit Logo */}
      <div className="w-full flex justify-center py-6 border-b-[1px] border-gray-100">
        <img src="/logo.png" alt="VISA" className="h-8 object-contain" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl p-6">
        {/* Fortschritt */}
        <div className="w-full mb-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-2 text-center">
            Question {currentIndex + 1} of {currentQuestions.length}
          </p>
          <div className="w-full bg-gray-100 h-[2px]">
            <div 
              className="bg-visa-blue h-full transition-all duration-500" 
              style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Frage */}
        <h2 className="text-2xl font-light text-visa-blue mb-10 text-center leading-snug">
          {currentQuestion.text}
        </h2>

        {/* Antworten */}
        <div className="w-full space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full p-5 text-left border-[1px] border-gray-200 rounded-sm hover:border-visa-blue hover:bg-gray-50 transition-all font-light text-visa-blue group flex justify-between items-center"
            >
              <span>{option}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-visa-blue">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-8 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
        {category} Category
      </div>
    </main>
  );
}
