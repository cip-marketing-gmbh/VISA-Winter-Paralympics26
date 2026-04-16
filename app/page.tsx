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
    <main className="flex flex-col items-center justify-between min-h-screen bg-white p-8">
      <div className="w-full flex justify-center py-6">
        <img src="/logo.png" alt="VISA Logo" className="h-12 object-contain" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <h1 className="text-4xl font-light text-visa-blue mb-2 tracking-tight">
          Paralympics <span className="font-bold">Quiz</span>
        </h1>
        <p className="text-gray-500 mb-12 font-light">Mach mit. Teste dein Wissen.</p>

        <div className="w-full space-y-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Dein Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-[1px] border-gray-300 py-4 text-xl outline-none focus:border-visa-blue transition-all text-center font-light placeholder:text-gray-300 text-visa-blue"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4">
            <button
              onClick={() => startQuiz("adults")}
              disabled={!name}
              className="w-full bg-[#061354] text-white py-4 rounded-sm font-medium hover:bg-[#040a2e] transition-colors disabled:opacity-30 uppercase tracking-widest text-sm"
            >
              Erwachsenen-Quiz starten
            </button>
            <button
              onClick={() => startQuiz("kids")}
              disabled={!name}
              className="w-full border-[1px] border-visa-blue text-visa-blue py-4 rounded-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-30 uppercase tracking-widest text-sm"
            >
              Kinder-Quiz starten
            </button>
          </div>
        </div>
      </div>

      <div className="py-8 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
        Offizieller weltweiter Partner
      </div>
    </main>
  );
}
