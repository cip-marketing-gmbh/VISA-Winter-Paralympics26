"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const submitted = useRef(false);

  useEffect(() => {
    if (submitted.current) return;
    submitted.current = true;

    const participantName = sessionStorage.getItem("participantName");
    const category = sessionStorage.getItem("category");
    const finalScore = sessionStorage.getItem("finalScore");

    if (!participantName) {
      router.push("/");
      return;
    }

    setName(participantName);

    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: participantName,
        category,
        score: finalScore ? parseInt(finalScore) : 0,
      }),
    }).finally(() => setLoading(false));
  }, [router]);

  return (
    <main className="flex flex-col h-screen bg-white overflow-hidden">

      <div className="w-full bg-white py-6 flex justify-center border-b border-gray-100 shrink-0">
        <img src="/logo.png" alt="VISA Logo" className="h-10 object-contain" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg mx-auto px-8 text-center">

        <div className="w-20 h-20 bg-[#1434CB] rounded-full flex items-center justify-center mb-8 animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-black mb-3">
          Toll gemacht, {name}!
        </h1>
        <p className="text-xl text-gray-600 mb-10 font-light">
          Danke für deine Teilnahme am Paralympics-Quiz.
        </p>

        <div className="w-full p-6 mb-8">
          <p className="text-black font-bold text-xl mb-2">
            Du nimmst jetzt an der Verlosung teil!
          </p>
          <p className="text-black text-base font-light">
            Am Ende der Veranstaltung wird ein zufälliger Gewinner ausgelost.
          </p>
        </div>

        <button
          onClick={() => {
            sessionStorage.clear();
            router.push("/");
          }}
          className="w-full bg-[#1434CB] text-white py-5 font-medium hover:bg-[#0f27a8] transition-colors uppercase tracking-widest text-base"
        >
          Zurück zum Start
        </button>
      </div>

      <div className="w-full bg-[#1434CB] py-4 shrink-0" />
    </main>
  );
}
