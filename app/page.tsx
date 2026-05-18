"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const name = `${firstName.trim()} ${lastName.trim()}`.trim();
  const router = useRouter();

  const startQuiz = (category: "kids" | "adults") => {
    if (!firstName.trim() || !lastName.trim()) return;
    sessionStorage.setItem("participantName", name);
    sessionStorage.setItem("category", category);
    router.push("/quiz");
  };

  return (
    <main className="flex flex-col h-screen bg-white overflow-hidden">

      {/* Header */}
      <div className="w-full bg-white py-6 flex justify-center border-b border-gray-100 shrink-0">
        <img src="/logo.png" alt="VISA Logo" className="h-10 object-contain" />
      </div>

      {/* Content – etwas höher positioniert mit justify-start + pt */}
      <div className="flex-1 flex flex-col items-center justify-start pt-10 w-full max-w-lg mx-auto px-8">

        <h1 className="text-5xl font-light text-black mb-2 tracking-tight text-center">
          Paralympics <span className="font-bold">Quiz</span>
        </h1>
        <p className="text-gray-600 mb-8 font-light text-lg text-center">Mach mit. Teste dein Wissen.</p>

        {/* Motto – keine Trennstriche */}
        <div className="w-full text-center py-5 mb-10">
          <p className="font-semibold text-black text-lg leading-snug">
            Visa feiert Inklusion durch Sport.
          </p>
          <p className="font-light text-black text-lg">
            Zusammen mit den Genossenschaftsbanken!
          </p>
        </div>

        <div className="w-full space-y-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Vorname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border-b-2 border-gray-300 py-4 text-2xl outline-none focus:border-[#1434CB] transition-all text-center font-light placeholder:text-gray-300 text-black"
            />
            <input
              type="text"
              placeholder="Nachname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border-b-2 border-gray-300 py-4 text-2xl outline-none focus:border-[#1434CB] transition-all text-center font-light placeholder:text-gray-300 text-black"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2">
            <button
              onClick={() => startQuiz("adults")}
              disabled={!firstName.trim() || !lastName.trim()}
              className="w-full bg-[#1434CB] text-white py-5 font-medium hover:bg-[#0f27a8] transition-colors disabled:opacity-30 uppercase tracking-widest text-base"
            >
              Erwachsenen-Quiz starten
            </button>
            <button
              onClick={() => startQuiz("kids")}
              disabled={!firstName.trim() || !lastName.trim()}
              className="w-full border-2 border-[#1434CB] text-[#1434CB] py-5 font-medium hover:bg-blue-50 transition-colors disabled:opacity-30 uppercase tracking-widest text-base"
            >
              Kids-Quiz starten (10–16 Jahre)
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#1434CB] py-4 shrink-0" />
    </main>
  );
}
