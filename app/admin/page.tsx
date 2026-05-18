"use client";

import { useState } from "react";

type Participant = {
  name: string;
  category: string;
  score?: number;
  date?: string;
};

export default function AdminPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [winnerCategory, setWinnerCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  const loadData = async (pw: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/list", {
        headers: { Authorization: `Bearer ${pw}` },
      });

      if (res.status === 401) {
        setError("Falsches Passwort.");
        setAuthed(false);
        return;
      }

      const data = await res.json();
      const parsed = (data.participants ?? []).map((p: unknown) =>
        typeof p === "string" ? JSON.parse(p) : p
      );
      setParticipants(parsed);
      setAuthed(true);
    } catch {
      setError("Verbindungsfehler.");
    } finally {
      setLoading(false);
    }
  };

  const drawWinner = (cat: "adults" | "kids") => {
    const pool = participants.filter(p => p.category === cat);
    if (pool.length === 0) return;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setWinner(pool[randomIndex]);
    setWinnerCategory(cat);
  };

  const totalKids = participants.filter(p => p.category === "kids").length;
  const totalAdults = participants.filter(p => p.category === "adults").length;
  const avgScore = participants.length > 0
    ? (participants.reduce((sum, p) => sum + (p.score ?? 0), 0) / participants.length).toFixed(1)
    : "–";

  if (!authed) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <div className="w-full flex justify-center mb-10">
          <img src="/logo.png" alt="VISA Logo" className="h-10 object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-black mb-8">Admin-Login</h1>
        <div className="w-full max-w-sm space-y-4">
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadData(password)}
            className="w-full border-2 border-gray-300 px-4 py-3 outline-none focus:border-[#1434CB] text-black"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            onClick={() => loadData(password)}
            disabled={loading || !password}
            className="w-full bg-[#1434CB] text-white py-4 font-medium hover:bg-[#0f27a8] disabled:opacity-30 uppercase tracking-widest"
          >
            {loading ? "Laden..." : "Einloggen"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      <div className="w-full bg-white py-5 flex justify-center border-b border-gray-100">
        <img src="/logo.png" alt="VISA Logo" className="h-8 object-contain" />
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">

        <h1 className="text-3xl font-bold text-black mb-8">
          Paralympics Quiz – Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border-2 border-[#1434CB] p-5 text-center">
            <p className="text-4xl font-black text-[#1434CB]">{participants.length}</p>
            <p className="text-sm text-gray-600 uppercase tracking-widest mt-1">Teilnehmer</p>
          </div>
          <div className="border-2 border-[#1434CB] p-5 text-center">
            <p className="text-4xl font-black text-[#1434CB]">{avgScore}</p>
            <p className="text-sm text-gray-600 uppercase tracking-widest mt-1">Ø Richtige</p>
          </div>
          <div className="border-2 border-[#1434CB] p-5 text-center">
            <p className="text-2xl font-black text-[#1434CB]">{totalAdults} / {totalKids}</p>
            <p className="text-sm text-gray-600 uppercase tracking-widest mt-1">Erw. / Kids</p>
          </div>
        </div>

        {/* Verlosung */}
        <div className="bg-[#1434CB] p-8 mb-8 text-center">
          <h2 className="text-white text-lg font-light mb-6 uppercase tracking-widest">Verlosung</h2>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => drawWinner("adults")}
              disabled={totalAdults === 0}
              className="bg-white text-[#1434CB] px-8 py-4 font-bold text-base hover:bg-gray-100 transition-colors uppercase tracking-widest disabled:opacity-30"
            >
              Erwachsene auslosen
            </button>
            <button
              onClick={() => drawWinner("kids")}
              disabled={totalKids === 0}
              className="bg-white text-[#1434CB] px-8 py-4 font-bold text-base hover:bg-gray-100 transition-colors uppercase tracking-widest disabled:opacity-30"
            >
              Kids auslosen
            </button>
          </div>

          {winner && (
            <div className="mt-8 p-6 bg-white text-[#1434CB]">
              <p className="text-sm uppercase font-bold text-gray-400 mb-1">
                Gewinner {winnerCategory === "adults" ? "Erwachsene" : "Kids"}:
              </p>
              <p className="text-4xl font-black">{winner.name}</p>
              {winner.date && (
                <p className="text-sm text-gray-400 mt-2">
                  Teilgenommen: {new Date(winner.date).toLocaleString("de-DE")}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Tabelle */}
        <div className="border border-gray-200 overflow-hidden mb-4">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-sm uppercase tracking-widest text-gray-500">Name</th>
                <th className="p-4 text-sm uppercase tracking-widest text-gray-500">Kategorie</th>
                <th className="p-4 text-sm uppercase tracking-widest text-gray-500">Richtige</th>
                <th className="p-4 text-sm uppercase tracking-widest text-gray-500">Datum</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-medium text-black">{p.name}</td>
                  <td className="p-4 text-gray-500 uppercase text-xs">{p.category}</td>
                  <td className="p-4 font-bold text-[#1434CB]">
                    {p.score !== undefined ? p.score : "–"}
                  </td>
                  <td className="p-4 text-gray-400 text-xs">
                    {p.date ? new Date(p.date).toLocaleString("de-DE") : "–"}
                  </td>
                </tr>
              ))}
              {participants.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400">Noch keine Teilnehmer.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={() => loadData(password)}
          className="text-sm text-[#1434CB] underline"
        >
          ↻ Aktualisieren
        </button>
      </div>

      <div className="w-full bg-[#1434CB] py-4 mt-8" />
    </main>
  );
}
