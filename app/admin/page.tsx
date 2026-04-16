"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [participants, setParticipants] = useState<
    { name: string; category: string; date?: string }[]
  >([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const secret = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "";
      const res = await fetch("/api/admin/list", {
        headers: { Authorization: `Bearer ${secret}` },
      });

      if (res.status === 401) {
        setError("Nicht autorisiert – bitte NEXT_PUBLIC_ADMIN_SECRET prüfen.");
        return;
      }

      const data = await res.json();
      const parsed = (data.participants ?? []).map((p: unknown) =>
        typeof p === "string" ? JSON.parse(p) : p
      );
      setParticipants(parsed);
    } catch {
      setError("Teilnehmerdaten konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const drawWinner = () => {
    if (participants.length === 0) return;
    const randomIndex = Math.floor(Math.random() * participants.length);
    setWinner(participants[randomIndex].name);
  };

  if (loading) return <div className="p-10">Lade Teilnehmer...</div>;
  if (error) return <div className="p-10 text-red-600 font-bold">{error}</div>;

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

      <button onClick={loadData} className="mt-6 text-sm text-visa-blue underline">
        ↻ Aktualisieren
      </button>
    </main>
  );
}
