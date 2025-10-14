"use client";

import { useEffect, useState } from "react";
import { useGameStore } from "@/src/store";
import LeaderZone from "@/components/playmat/LeaderZone";
import CharacterZone from "@/components/playmat/CharacterZone";
import DiceRoll from "@/components/playmat/DiceRoll";
import TrashCounter from "@/components/playmat/TrashCounter";


export default function Home() {
  
  const { characters, leader, resetGame } = useGameStore();
  const [isLandscape, setIsLandscape] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const landscape = window.innerWidth > window.innerHeight;
      setIsLandscape(landscape);
      setIsMobile(window.innerWidth < 768);
    };

    checkOrientation();
    window.addEventListener('orientationchange', checkOrientation);
    window.addEventListener('resize', checkOrientation);

    return () => {
      window.removeEventListener('orientationchange', checkOrientation);
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  const handleReset = () => {
    if (confirm('Reset the entire game state? This cannot be undone.')) {
      resetGame();
    }
  };

  // Mobile Portrait - Rotation Prompt
  if (isMobile && !isLandscape) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center gap-6 p-4">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Playmat Companion</h1>
          <p className="text-lg text-gray-300 mb-8">Please rotate your device</p>
        </div>

        {/* Animated Rotation Icon */}
        <div className="animate-spin" style={{ animationDuration: '3s' }}>
          <div className="text-8xl">📱</div>
        </div>

        <p className="text-sm text-gray-400 text-center max-w-xs">
          This app works best in landscape mode for optimal playmat view.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 p-3 md:p-6">
      {/* Header */}
      <header className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl font-black text-red-700 mb-1">
          Playmat Companion
        </h1>
        <p className="text-xs md:text-sm text-gray-600">
          One Piece TCG Digital Companion
        </p>
      </header>

      {/* Main Playmat Container */}
      <div className="max-w-full mx-auto bg-gradient-to-b from-slate-600 to-slate-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4" style={{ minHeight: 'calc(100vh - 200px)' }}>
          
          {/* LEFT SIDE - Character Zone (8 cols) */}
          <div className="col-span-8 flex flex-col">
            <h2 className="text-lg md:text-xl font-black text-white mb-3 uppercase tracking-wide">
              ⚔️ Character Zone
            </h2>
            
            {/* Character Grid - 6 slots (3x2) */}
            <div className="grid grid-cols-3 gap-3 flex-1 auto-rows-fr">
              {characters.map((character) => (
                <div key={character.id} className="min-h-0">
                  <CharacterZone character={character} />
                </div>
              ))}
            </div>
          </div>

          {/* CENTER COLUMN - Leader & Controls (2 cols) */}
          <div className="col-span-2 flex flex-col gap-4">
            {/* Leader */}
            <div className="flex-shrink-0">
              <h2 className="text-sm md:text-base font-black text-white mb-2 uppercase tracking-wide">
                👑 Leader
              </h2>
              <LeaderZone leader={leader} />
            </div>

            {/* Dice & Reset */}
            <div className="flex flex-col gap-3">
              {/* Dice Roller */}
              <div className="bg-slate-500 rounded-lg p-3 flex flex-col items-center">
                <DiceRoll />
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors text-sm"
              >
                🔄 Reset
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - Trash Counter (2 cols) */}
          <div className="col-span-2 flex flex-col">
            <h2 className="text-sm md:text-base font-black text-white mb-3 uppercase tracking-wide">
              🗑️ Trash
            </h2>
            <div className="flex-1 min-h-0">
              <TrashCounter />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-4 text-gray-600 text-xs">
        <p>© 2025 Playmat Companion - Generic TCG Utility</p>
      </footer>
    </div>
  );
}