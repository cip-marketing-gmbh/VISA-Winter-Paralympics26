"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [participants, setParticipants] = useState<
    { name: string; category: string; date?: string }[]
  >([]);
  const [winner, setWinner] = useState<string | null>(null);
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

  const drawWinner = () => {
    if (participants.length === 0) return;
    const randomIndex = Math.floor(Math.random() * participants.length);
    setWinner(participants[randomIndex].name);
  };

  // Login-Formular
  if (!authed) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-white p-8">
        <h1 className="text-2xl font-bold text-visa-blue mb-8">Admin-Login</h1>
        <div className="w-full max-w-sm space-y-4">
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadData(password)}
            className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-visa-blue"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            onClick={() => loadData(password)}
            disabled={loading || !password}
            className="w-full bg-visa-blue text-white py-3 rounded font-medium hover:bg-[#040a2e] disabled:opacity-30"
          >
            {loading ? "Laden..." : "Einloggen"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-visa-blue mb-8">Admin-Dashboard</h1>

      <div className="bg-visa-blue text-white p-8 rounded-2xl mb-10 text-center">
        <h2 className="text-xl mb-4">Teilnehmer gesamt: {participants.length}</h2>
        <button
          onClick={drawWinner}
          className="bg-visa-gold text-visa-blue px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform"
        >
          Gewinner auslosen 🎲
        </button>

        {winner && (
          <div className="mt-8 p-6 bg-white text-visa-blue rounded-xl animate-bounce">
            <p className="text-sm uppercase font-bold text-gray-500">Der Gewinner ist:</p>
            <p className="text-4xl font-black">{winner}</p>
          </div>
        )}
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Kategorie</th>
              <th className="p-4">Datum</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-gray-600 uppercase text-xs">{p.category}</td>
                <td className="p-4 text-gray-400 text-xs">
                  {p.date ? new Date(p.date).toLocaleString("de-DE") : "–"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => loadData(password)} className="mt-6 text-sm text-visa-blue underline">
        ↻ Aktualisieren
      </button>
    </main>
  );
}
