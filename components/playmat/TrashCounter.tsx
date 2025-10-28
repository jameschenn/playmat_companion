'use client';

import { useGameStore } from '@/src/store';

export default function TrashCounter() {
  const { trashCount, incrementTrashCount, decrementTrashCount, resetTrashCount } = useGameStore();
  const total = trashCount.character + trashCount.event;

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Total Count */}
      <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
        <div className="text-3xl font-black text-red-500 mb-1">{total}</div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Trash</div>
      </div>

      {/* Character Trash */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-700 rounded-lg p-2.5 flex flex-col items-center gap-1.5 shadow-lg">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Characters</div>
        <div className="text-2xl font-black text-red-500">{trashCount.character}</div>
        <div className="flex gap-1 w-full">
          <button
            onClick={() => decrementTrashCount('character')}
            className="flex-1 px-2 py-1.5 bg-red-900 text-red-200 text-sm font-bold rounded hover:bg-red-800 transition-colors"
          >
            −
          </button>
          <button
            onClick={() => incrementTrashCount('character')}
            className="flex-1 px-2 py-1.5 bg-green-900 text-green-200 text-sm font-bold rounded hover:bg-green-800 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Event Trash */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-700 rounded-lg p-2.5 flex flex-col items-center gap-1.5 shadow-lg">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Events</div>
        <div className="text-2xl font-black text-red-500">{trashCount.event}</div>
        <div className="flex gap-1 w-full">
          <button
            onClick={() => decrementTrashCount('event')}
            className="flex-1 px-2 py-1.5 bg-red-900 text-red-200 text-sm font-bold rounded hover:bg-red-800 transition-colors"
          >
            −
          </button>
          <button
            onClick={() => incrementTrashCount('event')}
            className="flex-1 px-2 py-1.5 bg-green-900 text-green-200 text-sm font-bold rounded hover:bg-green-800 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetTrashCount}
        className="px-2 py-1.5 text-xs font-bold bg-gray-700 hover:bg-gray-600 text-gray-200 rounded transition-colors uppercase tracking-wide"
      >
        Empty Trash
      </button>
    </div>
  );
}