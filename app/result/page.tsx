"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const [name, setName] = useState("");
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
    });
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="w-24 h-24 bg-visa-gold rounded-full flex items-center justify-center mb-8 animate-bounce">
        <svg className="w-12 h-12 text-visa-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-visa-blue mb-4">
        Toll gemacht, {name}!
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Danke für deine Teilnahme am Paralympics-Quiz.
      </p>

      <button
        onClick={() => {
          sessionStorage.clear();
          router.push("/");
        }}
        className="mt-4 text-visa-blue font-bold border-b-2 border-visa-blue pb-1 hover:text-visa-gold hover:border-visa-gold transition-all"
      >
        Zurück zum Start
      </button>
    </main>
  );
}
