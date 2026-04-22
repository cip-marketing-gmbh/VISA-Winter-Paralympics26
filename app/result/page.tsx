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

    if (!participantName) {
      router.push("/");
      return;
    }

    setName(participantName);

    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: participantName, category }),
    }).finally(() => setLoading(false));
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-white">

      {/* Same header as start page */}
      <div className="w-full bg-[#061354] py-8 flex justify-center">
        <img src="/logo.png" alt="VISA Logo" className="h-10 object-contain brightness-0 invert" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg px-8 text-center">

        <div className="w-20 h-20 bg-[#061354] rounded-full flex items-center justify-center mb-8 animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-[#061354] mb-3">
          Toll gemacht, {name}!
        </h1>
        <p className="text-xl text-gray-600 mb-10 font-light">
          Danke für deine Teilnahme am Paralympics-Quiz.
        </p>

        {/* Motto banner */}
        <div className="w-full bg-[#061354] text-white text-center py-6 px-6 mb-10">
          <p className="font-semibold text-lg leading-snug">
            Visa feiert Inklusion durch Sport.
          </p>
          <p className="font-light text-lg">
            Zusammen mit den Genossenschaftsbanken!
          </p>
        </div>

        {/* Verlosung – prominent */}
        <div className="w-full border-2 border-[#061354] p-6 mb-10">
          <p className="text-[#061354] font-bold text-xl mb-1">
            Du nimmst jetzt an der Verlosung teil!
          </p>
          <p className="text-[#061354] text-base font-light">
            Am Ende der Veranstaltung wird ein zufälliger Gewinner ausgelost.
          </p>
        </div>

        <button
          onClick={() => {
            sessionStorage.clear();
            router.push("/");
          }}
          className="w-full bg-[#061354] text-white py-5 font-medium hover:bg-[#040a2e] transition-colors uppercase tracking-widest text-base"
        >
          Zurück zum Start
        </button>
      </div>

      <div className="py-8" />
    </main>
  );
}
