'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/src/store';
import Script from 'next/script';
import CharacterSlot from '@/components/playmat/CharacterZone';
import LeaderZone from '@/components/playmat/LeaderZone';
import TrashCounter from '@/components/playmat/TrashCounter';
import DiceRoller from '@/components/playmat/DiceRoll';

export default function PlaymatPage() {
  const { characters, leader, resetGame, swapCharacters } = useGameStore();
  const [isLandscape, setIsLandscape] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [draggedCharacterId, setDraggedCharacterId] = useState<string | null>(null);

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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedCharacterId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
    e.preventDefault();
    if (draggedCharacterId && draggedCharacterId !== targetId) {
      swapCharacters(draggedCharacterId, targetId);
    }
    setDraggedCharacterId(null);
  };

  const handleDragEnd = () => {
    setDraggedCharacterId(null);
  };

  // Mobile Portrait - Rotation Prompt
  if (isMobile && !isLandscape) {
    return (
      <div className="w-screen h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex flex-col items-center justify-center gap-6 p-4">
        <div className="absolute top-2 left-2 opacity-30 hover:opacity-100 transition-opacity z-10">
          <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-3 md:p-4 flex flex-col">
      {/* Header TWO OPTIONS FOR NOW. 1) 1 looks good for now since it's just the playmat 2) might be better if we expand and build other features */}
      {/* <header className="flex items-center justify-between px-4 py-2 mb-3">
        <div className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
          <span className="text-sm font-bold text-gray-400">Playmat Companion</span>
        </div>
        <button className="text-xs text-gray-500">⚙️ Settings</button>
      </header> */}

      {/* Main Playmat Container */}

      {/* current 1 header */}
      <div className="flex-1 flex flex-col gap-4 max-w-full mx-auto w-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 p-4">
        <div className="absolute top-7 left-7 opacity-50 hover:opacity-100 transition-opacity z-10">
          <img src="/favicon.ico" alt="Logo" className="w-5 h-5" />
        </div>

        {/* TOP HALF - Character Zone (5 draggable slots) */}
        <div className="flex-1 flex flex-col min-h-0 relative z-50">
           <h2 className="text-lg md:text-xl font-black text-white mb-3 uppercase tracking-wider text-center">
              Character Zone
          </h2>
          
          {/* Character Grid - 5 slots in a row */}
          <div className="flex gap-3 flex-1">
            {characters.slice(0, 5).map((character) => (
              <div
                key={character.id}
                className="flex-1 min-h-0"
                onDragEnd={handleDragEnd}
              >
                <CharacterSlot
                  character={character}
                  isDragging={draggedCharacterId === character.id}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* BOTTOM HALF - Leader, Dice, Trash (3-column) */}
        <div className="flex-1 flex gap-4">
          
          {/* Leader Zone - Left */}
          <div className="flex-1 min-h-0">
            <h2 className="text-sm md:text-base font-black text-white mb-2 uppercase tracking-wider text-center">
              Leader
            </h2>
            <LeaderZone leader={leader} />
          </div>

          {/* Dice & Reset - Center */}
          <div className="flex flex-col gap-3 justify-center items-center">
            {/* Dice Roller */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg p-3 flex flex-col items-center border border-gray-600 shadow-lg">
              <DiceRoller />
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="py-2 px-4 bg-gradient-to-br from-red-900 to-red-950 hover:from-red-800 hover:to-red-900 text-red-200 font-bold rounded-lg transition-colors text-sm border border-red-700 shadow-lg"
            >
              🔄 Reset
            </button>
          </div>

          {/* Trash Counter - Right */}
          <div className="flex-1 min-h-0">
            <h2 className="text-sm md:text-base font-black text-white mb-2 uppercase tracking-wider text-center">
              🗑️ Trash
            </h2>
            <TrashCounter />
          </div>

        </div>
      </div>

      {/* Footer */}
      {/* <footer className="text-center mt-3 text-gray-600 text-xs">
        <p>© 2025 Playmat Companion - Generic TCG Utility</p>
        <Script
        src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
        strategy="afterInteractive"
        className='flex '
        onLoad={() => {
          // @ts-ignore - Ko-fi script attaches global object
          if (window.kofiWidgetOverlay) {
            // @ts-ignore
            window.kofiWidgetOverlay.draw("chenllectibles", {
              type: "floating-chat",
              "floating-chat.donateButton.text": "Support me",
              "floating-chat.donateButton.background-color": "#ffffff",
              "floating-chat.donateButton.text-color": "#323842",
            });
          }
        }}
      />
      </footer> */}

      <footer className="flex items-center justify-between mt-3 text-xs px-4">
        <a href='https://ko-fi.com/H2H21N1MTO' target='_blank'><img height='36' className='border-0 h-9' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>   
        <p className="text-gray-600">© 2025 Playmat Companion</p>
      </footer>
    </div>
  );
}