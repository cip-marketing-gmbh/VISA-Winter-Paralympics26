"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const startQuiz = (category: "kids" | "adults") => {
    if (!name.trim()) return;
    sessionStorage.setItem("participantName", name);
    sessionStorage.setItem("category", category);
    router.push("/quiz");
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-white">

      {/* Hero Banner – Visa-style wide blue element */}
      <div className="w-full bg-[#061354] py-8 flex justify-center">
        <img src="/logo.png" alt="VISA Logo" className="h-10 object-contain brightness-0 invert" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg px-8">

        <h1 className="text-5xl font-light text-[#061354] mb-2 tracking-tight text-center">
          Paralympics <span className="font-bold">Quiz</span>
        </h1>
        <p className="text-gray-600 mb-8 font-light text-lg text-center">Mach mit. Teste dein Wissen.</p>

        {/* Motto – wide blue banner */}
        <div className="w-full bg-[#061354] text-white text-center py-6 px-6 mb-10">
          <p className="font-semibold text-lg leading-snug">
            Visa feiert Inklusion durch Sport.
          </p>
          <p className="font-light text-lg">
            Zusammen mit den Genossenschaftsbanken!
          </p>
        </div>

        <div className="w-full space-y-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Dein Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-2 border-gray-300 py-4 text-2xl outline-none focus:border-[#061354] transition-all text-center font-light placeholder:text-gray-300 text-[#061354]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 pt-2">
            <button
              onClick={() => startQuiz("adults")}
              disabled={!name}
              className="w-full bg-[#061354] text-white py-5 font-medium hover:bg-[#040a2e] transition-colors disabled:opacity-30 uppercase tracking-widest text-base"
            >
              Erwachsenen-Quiz starten
            </button>
            <button
              onClick={() => startQuiz("kids")}
              disabled={!name}
              className="w-full border-2 border-[#061354] text-[#061354] py-5 font-medium hover:bg-gray-50 transition-colors disabled:opacity-30 uppercase tracking-widest text-base"
            >
              Kids-Quiz starten
            </button>
          </div>
        </div>
      </div>

      <div className="py-8" />
    </main>
  );
}
