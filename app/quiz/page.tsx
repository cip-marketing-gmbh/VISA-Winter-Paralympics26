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
    <main className="flex flex-col h-screen bg-white overflow-hidden">

      {/* Header */}
      <div className="w-full bg-white py-5 flex justify-center border-b border-gray-100 shrink-0">
        <img src="/logo.png" alt="VISA" className="h-8 object-contain" />
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-6 py-6">

          {/* Progress */}
          <div className="w-full mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 text-center font-medium">
              Frage {currentIndex + 1} von {currentQuestions.length}
            </p>
            <div className="w-full bg-gray-200 h-[3px]">
              <div
                className="bg-[#1434CB] h-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <h2 className="text-2xl font-semibold text-black mb-2 text-center leading-snug w-full">
            {currentQuestion.text}
          </h2>
          {isMulti && (
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-6">Mehrere Antworten möglich</p>
          )}
          {!isMulti && <div className="mb-6" />}

          {/* Options */}
          <div className="w-full space-y-3">
            {currentQuestion.options.map((option) => {
              const isThisCorrect = correctAnswers.includes(option);
              const isThisSelected = selectedAnswers.includes(option);

              let buttonClass = "";
              if (!submitted) {
                buttonClass = isThisSelected
                  ? "border-2 border-[#1434CB] bg-[#1434CB] text-white font-medium"
                  : "border-2 border-black text-black hover:bg-gray-50";
              } else {
                if (isThisCorrect) {
                  buttonClass = "border-2 border-green-600 bg-green-50 text-green-800 font-semibold";
                } else if (isThisSelected && !isThisCorrect) {
                  buttonClass = "border-2 border-red-500 bg-red-50 text-red-700 font-medium";
                } else {
                  buttonClass = "border-2 border-black text-black";
                }
              }

              return (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  disabled={submitted}
                  className={`w-full p-5 text-left transition-all font-light flex justify-between items-center text-lg ${buttonClass}`}
                >
                  <span>{option}</span>
                  {submitted && isThisCorrect && <span className="text-green-600 font-bold text-xl">✓</span>}
                  {submitted && isThisSelected && !isThisCorrect && <span className="text-red-500 font-bold text-xl">✕</span>}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {submitted && (
            <div className={`w-full mt-5 p-5 border-l-4 animate-fade-in ${isCorrect ? "border-green-600 bg-green-50" : "border-red-500 bg-red-50"}`}>
              <p className={`text-sm uppercase tracking-widest font-bold mb-2 ${isCorrect ? "text-green-700" : "text-red-600"}`}>
                {isCorrect ? "Richtig!" : "Leider falsch."}
              </p>
              <p className="text-base text-gray-800 font-light leading-relaxed">
                {currentQuestion.feedback}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 w-full pb-4">
            {!submitted && (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswers.length === 0}
                className="w-full bg-[#1434CB] text-white py-5 uppercase tracking-widest text-base font-medium hover:bg-[#0f27a8] disabled:opacity-30 transition-all"
              >
                Antwort bestätigen
              </button>
            )}
            {submitted && (
              <button
                onClick={handleNext}
                className="w-full bg-[#1434CB] text-white py-5 uppercase tracking-widest text-base font-medium animate-fade-in hover:bg-[#0f27a8] transition-all"
              >
                {currentIndex < currentQuestions.length - 1 ? "Nächste Frage" : "Ergebnis anzeigen"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="w-full bg-[#1434CB] py-4 shrink-0" />
    </main>
  );
}
