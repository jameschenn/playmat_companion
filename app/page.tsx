"use client";

import { useGameStore } from "@/src/store";
import Image from "next/image";
import LeaderZone from "@/components/playmat/LeaderZone";
import CharacterZone from "@/components/playmat/CharacterZone";
import DiceRoll from "@/components/playmat/DiceRoll";


export default function Home() {

  const { characters, leader, resetGame } = useGameStore();

  const handleReset = () => {
    if (confirm('Reset the entire game state? This cannot be undone.')) {
      resetGame();
    }
  };

  return (
    <>
    
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-4">
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold text-white mb-2">
          Playmat Companion
        </h1>
        <p className="text-gray-400 text-sm">
          Your digital TCG companion
        </p>
      </header>

      {/* Main Playmat - Landscape Layout */}
      <div className="max-w-7xl mx-auto bg-slate-700 rounded-xl shadow-2xl p-6">
        
        {/* TOP HALF - Character Zone */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <span className="text-2xl">⚔️</span>
            Character Zone
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {characters.map((character) => (
              <CharacterZone key={character.id} character={character} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-slate-500 my-6"></div>

        {/* BOTTOM HALF - Leader Zone + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Leader Zone */}
          <div className="lg:col-span-2">
            <LeaderZone leader={leader} />
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            {/* Dice Roller */}
            <div className="bg-slate-600 rounded-lg p-4 flex flex-col items-center">
              <h3 className="text-white font-semibold mb-3">Dice Roll</h3>
              <DiceRoll />
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-lg"
            >
              🔄 Reset Game
            </button>

            {/* Multiplayer Button - Placeholder */}
            <button
              disabled
              className="w-full py-3 bg-gray-500 text-gray-300 font-bold rounded-lg cursor-not-allowed opacity-50"
            >
              🌐 Multiplayer (Coming Soon)
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-6 text-gray-500 text-sm">
        <p>© 2025 Playmat Companion - Generic TCG Utility</p>
      </footer>
    </div>
  );
    </>
  );
}
