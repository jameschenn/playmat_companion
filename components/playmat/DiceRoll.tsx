'use client';

import { useState, useEffect } from 'react';

export default function DiceRoll() {

  const [displayValue, setDisplayValue] = useState<number | string>('🎲');
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleDiceRoll = () => {
    
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Flash random numbers quickly
    let flashes = 0;
    const maxFlashes = 12;
    
    const flashInterval = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 12) + 1);
      flashes++;
      
      if (flashes >= maxFlashes) {
        clearInterval(flashInterval);
        // Generate final result
        const finalResult = Math.floor(Math.random() * 12) + 1;
        setTimeout(() => {
          setDisplayValue(finalResult);
          setResult(finalResult);
          setIsRolling(false);
        }, 100);
      }
    }, 80);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleDiceRoll}
        disabled={isRolling}
        className={`
          relative w-20 h-20 rounded-xl shadow-lg
          text-3xl font-bold transition-all duration-300
          active:scale-95
          disabled:cursor-not-allowed
          ${isRolling 
            ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 scale-110 shadow-yellow-400/50' 
            : 'bg-gradient-to-br from-slate-600 to-slate-700 text-white hover:from-slate-500 hover:to-slate-600 hover:shadow-xl'
          }
        `}
      >
        {displayValue}
        
        {/* Pulsing glow effect while rolling */}
        {isRolling && (
          <div className="absolute inset-0 rounded-xl bg-yellow-300 opacity-30 animate-pulse" />
        )}
      </button>
      
      <span className="text-xs font-semibold text-gray-400">
        {isRolling ? 'Rolling...' : 'Tap to Roll'}
      </span>
    </div>
  );
}

/*THIS VERSION USES THE ZUSTAND STORE, USE ME IF YOU WANT DICE DATA TO PERSIST FOR W/E REASON*/
// 'use client';

// import { useState, useEffect } from 'react';
// import { useGameStore } from '@/src/store';

// export default function DiceRoll() {

//   const { diceResult, rollDice } = useGameStore();
//   const [displayValue, setDisplayValue] = useState<number | string>('🎲');
//   const [isRolling, setIsRolling] = useState(false);

//   const handleDiceRoll = () => {
//     if (isRolling) return;
    
//     setIsRolling(true);
    
//     // Flash random numbers quickly
//     let flashes = 0;
//     const maxFlashes = 12;
    
//     const flashInterval = setInterval(() => {
//       setDisplayValue(Math.floor(Math.random() * 12) + 1);
//       flashes++;
      
//       if (flashes >= maxFlashes) {
//         clearInterval(flashInterval);
//         // Roll the actual dice and show final result
//         rollDice();
//         setTimeout(() => {
//           const finalResult = useGameStore.getState().diceResult;
//           setDisplayValue(finalResult || '🎲');
//           setIsRolling(false);
//         }, 100);
//       }
//     }, 80);
//   };

//   useEffect(() => {
//     if (diceResult !== null && !isRolling) {
//       setDisplayValue(diceResult);
//     }
//   }, [diceResult, isRolling]);

//   return (
//     <div className="flex flex-col items-center gap-2">
//       <button
//         onClick={handleDiceRoll}
//         disabled={isRolling}
//         className={`
//           relative w-20 h-20 rounded-xl shadow-lg
//           text-3xl font-bold transition-all
//           active:scale-95
//           disabled:cursor-not-allowed
//           ${isRolling 
//             ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-gray-900 scale-110 shadow-yellow-400/50' 
//            : 'bg-gradient-to-br from-slate-600 to-slate-700 text-white hover:from-slate-500 hover:to-slate-600 hover:shadow-xl'
//           }
//         `}
//       >
//         {displayValue}
        
//         {/* Pulsing glow effect while rolling */}
//         {isRolling && (
//           <div className="absolute inset-0 rounded-xl bg-yellow-300 opacity-30 animate-pulse" />
//         )}
//       </button>
      
//       <span className="text-xs font-semibold text-gray-600">
//         {isRolling ? 'Rolling...' : 'Tap to Roll'}
//       </span>
//     </div>
//   );
// }