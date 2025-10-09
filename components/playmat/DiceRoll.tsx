'use client';

import { useState } from 'react';
import { useGameStore } from '@/src/store';

export default function DiceRoll() {

  const { diceResult, rollDice } = useGameStore();
  const [isRolling, setIsRolling] = useState(false);

  const handleDiceRoll = () => {
    setIsRolling(true);
    rollDice();
    
    // Stop animation after 500ms
    setTimeout(() => {
      setIsRolling(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleDiceRoll}
        disabled={isRolling}
        className={`
          relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 
          text-white text-3xl font-bold rounded-xl shadow-lg
          hover:from-red-600 hover:to-red-800 
          active:scale-95 transition-all
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isRolling ? 'animate-bounce' : ''}
        `}
      >
        {diceResult !== null ? diceResult : '🎲'}
      </button>
      
      <span className="text-xs font-semibold text-gray-600">
        {isRolling ? 'Rolling...' : 'Tap to Roll'}
      </span>
    </div>
  );
}