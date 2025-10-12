'use client';

import { useGameStore } from '@/src/store';

export default function TrashCounter() {
  const { trashCount, incrementTrashCount, decrementTrashCount, resetTrashCount } = useGameStore();
  const total = trashCount.character + trashCount.event;

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Total Count */}
      <div className="text-center">
        <div className="text-2xl font-black text-red-700 mb-1">{total}</div>
        <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">Total Trash</div>
      </div>

      {/* Character Trash */}
      <div className="bg-red-50 border-2 border-red-600 rounded-lg p-2.5 flex flex-col items-center gap-1.5">
        <div className="text-xs font-bold text-gray-600 uppercase">Characters</div>
        <div className="text-xl font-black text-red-700">{trashCount.character}</div>
        <div className="flex gap-1 w-full">
          <button
            onClick={() => decrementTrashCount('character')}
            className="flex-1 px-2 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-600 transition-colors"
          >
            −
          </button>
          <button
            onClick={() => incrementTrashCount('character')}
            className="flex-1 px-2 py-1 bg-green-500 text-white text-sm font-bold rounded hover:bg-green-600 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Event Trash */}
      <div className="bg-red-50 border-2 border-red-600 rounded-lg p-2.5 flex flex-col items-center gap-1.5">
        <div className="text-xs font-bold text-gray-600 uppercase">Events</div>
        <div className="text-xl font-black text-red-700">{trashCount.event}</div>
        <div className="flex gap-1 w-full">
          <button
            onClick={() => decrementTrashCount('event')}
            className="flex-1 px-2 py-1 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-600 transition-colors"
          >
            −
          </button>
          <button
            onClick={() => incrementTrashCount('event')}
            className="flex-1 px-2 py-1 bg-green-500 text-white text-sm font-bold rounded hover:bg-green-600 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetTrashCount}
        className="px-2 py-1.5 text-xs font-bold bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors mt-auto"
      >
        Reset
      </button>
    </div>
  );
}