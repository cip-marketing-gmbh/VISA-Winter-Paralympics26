"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

export default function QuizPage() {
  const router = useRouter();
  const [category, setCategory] = useState<"kids" | "adults" | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // Neuer State für die Auflösung
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return; // Verhindert Mehrfachklicks

    const correct = option === currentQuestion.answer;
    setSelectedAnswer(option);
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      // Reset für die nächste Frage
      setSelectedAnswer(null);
      setIsCorrect(null);
      setCurrentIndex(prev => prev + 1);
    } else {
      sessionStorage.setItem("finalScore", score.toString());
      router.push("/result");
    }
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-white">
      <div className="w-full flex justify-center py-6 border-b-[1px] border-gray-100">
        <img src="/logo.png" alt="VISA" className="h-8 object-contain" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl p-6">
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

        <h2 className="text-2xl font-light text-visa-blue mb-10 text-center leading-snug">
          {currentQuestion.text}
        </h2>

        <div className="w-full space-y-3">
          {currentQuestion.options.map((option) => {
            // Logik für die Farbkennzeichnung
            const isThisCorrect = option === currentQuestion.answer;
            const isThisSelected = option === selectedAnswer;
            
            let buttonClass = "border-gray-200 text-visa-blue";
            if (selectedAnswer) {
              if (isThisCorrect) buttonClass = "border-green-500 bg-green-50 text-green-700 font-medium";
              else if (isThisSelected) buttonClass = "border-red-400 bg-red-50 text-red-700";
              else buttonClass = "border-gray-100 text-gray-300 opacity-50";
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                disabled={!!selectedAnswer}
                className={`w-full p-5 text-left border-[1px] rounded-sm transition-all font-light flex justify-between items-center ${buttonClass}`}
              >
                <span>{option}</span>
                {selectedAnswer && isThisCorrect && <span>✓</span>}
                {selectedAnswer && isThisSelected && !isThisCorrect && <span>✕</span>}
              </button>
            );
          })}
        </div>

        {/* Auflösungs-Bereich & Next Button */}
        <div className="h-24 mt-10 w-full flex flex-col items-center">
          {selectedAnswer && (
            <button
              onClick={handleNext}
              className="bg-visa-blue text-white px-12 py-3 rounded-sm uppercase tracking-widest text-sm animate-fade-in hover:bg-[#040a2e]"
            >
              {currentIndex < currentQuestions.length - 1 ? "Next Question" : "See Results"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
