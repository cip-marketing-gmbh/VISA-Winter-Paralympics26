"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const startQuiz = (category: "kids" | "adults") => {
    if (!name.trim()) {
      alert("Please enter your name first!");
      return;
    }
    // Wir speichern den Namen kurzzeitig im SessionStorage für die nächste Seite
    sessionStorage.setItem("participantName", name);
    sessionStorage.setItem("category", category);
    router.push("/quiz");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {/* Platzhalter für VISA Logo */}
      <div className="mb-12 w-32 h-16 bg-visa-blue flex items-center justify-center text-white font-bold text-xl rounded">
        VISA
      </div>

      <h1 className="text-3xl font-bold text-visa-blue mb-2">
        Paralympics Quiz
      </h1>
      <p className="text-gray-600 mb-8">Welcome! Please enter your name to start.</p>

      <div className="w-full max-w-sm space-y-6">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b-2 border-visa-blue p-3 text-lg outline-none focus:border-visa-gold transition-colors text-center"
        />

        <div className="flex flex-col gap-4 pt-4">
          <button
            onClick={() => startQuiz("kids")}
            className="visa-btn-primary bg-visa-gold !text-visa-blue"
          >
            Start Kids Quiz
          </button>
          
          <button
            onClick={() => startQuiz("adults")}
            className="visa-btn-primary"
          >
            Start Adults Quiz
          </button>
        </div>
      </div>
      
      <p className="mt-12 text-xs text-gray-400 uppercase tracking-widest">
        Official Event Partner
      </p>
    </main>
  );
}
