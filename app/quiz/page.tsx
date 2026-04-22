"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

export default function QuizPage() {
  const router = useRouter();
  const [category, setCategory] = useState<"kids" | "adults" | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
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
  const isMulti = currentQuestion.multiSelect === true;
  const correctAnswers = currentQuestion.answer.split(",");

  const handleOptionClick = (option: string) => {
    if (submitted) return;
    if (isMulti) {
      setSelectedAnswers(prev =>
        prev.includes(option) ? prev.filter(a => a !== option) : [...prev, option]
      );
    } else {
      setSelectedAnswers([option]);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) return;
    const correct =
      correctAnswers.length === selectedAnswers.length &&
      correctAnswers.every(a => selectedAnswers.includes(a));
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setSelectedAnswers([]);
      setSubmitted(false);
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
            Frage {currentIndex + 1} von {currentQuestions.length}
          </p>
          <div className="w-full bg-gray-100 h-[2px]">
            <div
              className="bg-visa-blue h-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-light text-visa-blue mb-2 text-center leading-snug">
          {currentQuestion.text}
        </h2>
        {isMulti && (
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-8">Mehrere Antworten möglich</p>
        )}
        {!isMulti && <div className="mb-8" />}

        <div className="w-full space-y-3">
          {currentQuestion.options.map((option) => {
            const isThisCorrect = correctAnswers.includes(option);
            const isThisSelected = selectedAnswers.includes(option);

            let buttonClass = "border-gray-200 text-visa-blue";
            if (submitted) {
              if (isThisCorrect) buttonClass = "border-green-500 bg-green-50 text-green-700 font-medium";
              else if (isThisSelected && !isThisCorrect) buttonClass = "border-red-400 bg-red-50 text-red-700";
              else buttonClass = "border-gray-100 text-gray-300 opacity-50";
            } else if (isThisSelected) {
              buttonClass = "border-visa-blue bg-blue-50 text-visa-blue font-medium";
            }

            return (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                disabled={submitted}
                className={`w-full p-5 text-left border-[1px] rounded-sm transition-all font-light flex justify-between items-center ${buttonClass}`}
              >
                <span>{option}</span>
                {submitted && isThisCorrect && <span>✓</span>}
                {submitted && isThisSelected && !isThisCorrect && <span>✕</span>}
              </button>
            );
          })}
        </div>

        {/* Feedback block */}
        {submitted && (
          <div className={`w-full mt-6 p-5 rounded-sm border-l-4 animate-fade-in ${isCorrect ? "border-green-500 bg-green-50" : "border-red-400 bg-red-50"}`}>
            <p className={`text-xs uppercase tracking-widest font-semibold mb-1 ${isCorrect ? "text-green-700" : "text-red-600"}`}>
              {isCorrect ? "Richtig!" : "Leider falsch."}
            </p>
            <p className="text-sm text-gray-700 font-light leading-relaxed">
              {currentQuestion.feedback}
            </p>
          </div>
        )}

        <div className="h-24 mt-8 w-full flex flex-col items-center justify-center gap-3">
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswers.length === 0}
              className="bg-visa-blue text-white px-12 py-3 rounded-sm uppercase tracking-widest text-sm hover:bg-[#040a2e] disabled:opacity-30 transition-all"
            >
              Antwort bestätigen
            </button>
          )}
          {submitted && (
            <button
              onClick={handleNext}
              className="bg-visa-blue text-white px-12 py-3 rounded-sm uppercase tracking-widest text-sm animate-fade-in hover:bg-[#040a2e]"
            >
              {currentIndex < currentQuestions.length - 1 ? "Nächste Frage" : "Ergebnis anzeigen"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
