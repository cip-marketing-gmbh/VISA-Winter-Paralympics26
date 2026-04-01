"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [participants, setParticipants] = useState<{name: string, category: string}[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Daten von der API laden
  const loadData = async () => {
    const res = await fetch("/api/admin/list"); // Wir brauchen noch eine kleine Listen-API
    const data = await res.json();
    setParticipants(data.participants || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const drawWinner = () => {
    if (participants.length === 0) return;
    const randomIndex = Math.floor(Math.random() * participants.length);
    setWinner(participants[randomIndex].name);
  };

  if (loading) return <div className="p-10">Loading participants...</div>;

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-visa-blue mb-8">Admin Dashboard</h1>
      
      <div className="bg-visa-blue text-white p-8 rounded-2xl mb-10 text-center">
        <h2 className="text-xl mb-4">Total Participants: {participants.length}</h2>
        <button 
          onClick={drawWinner}
          className="bg-visa-gold text-visa-blue px-10 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform"
        >
          Draw a Random Winner 🎲
        </button>
        
        {winner && (
          <div className="mt-8 p-6 bg-white text-visa-blue rounded-xl animate-bounce">
            <p className="text-sm uppercase font-bold text-gray-500">The Winner is:</p>
            <p className="text-4xl font-black">{winner}</p>
          </div>
        )}
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-gray-600 uppercase text-xs">{p.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
