'use client';

import { useState } from 'react';
import { Leader, STATUS_LABELS, CharacterStatus } from '@/src/types';
import { useGameStore } from '@/src/store';
import { ChevronDown, X } from 'lucide-react';

interface LeaderZoneProps {
  leader: Leader;
  readonly?: boolean;
}

export default function LeaderZone({ leader, readonly = false }: LeaderZoneProps) {
  const {
    // updateLeader,
    updateLeaderAttack,
    updateLeaderCost,
    toggleLeaderAbility,
    addLeaderStatus,
    removeLeaderStatus,
    // updateLeaderStatus,
  } = useGameStore();

  const [ isStatusOpen, setIsStatusOpen ] = useState(false);

return (
    <div
      className={`
        rounded-lg border-2 p-3.5 transition-all
        bg-gradient-to-br from-gray-800 to-gray-900 border-yellow-700 shadow-lg
        ${readonly ? 'opacity-75' : 'hover:shadow-xl'}
      `}
    >
      {/* <h2 className="text-base font-black mb-3 text-center text-yellow-500 uppercase tracking-wider">
            Leader
      </h2> */}

      {/* Stats Row */}
      <div className="flex gap-3 mb-3">
        {/* Attack */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">ATK</label>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => updateLeaderAttack(-1000)}
              disabled={readonly}
              className="px-2 py-1 bg-red-900 text-red-200 text-xs rounded hover:bg-red-800 disabled:opacity-50 font-bold transition-colors"
            >
              −
            </button>
            <span
              className={`flex-1 text-center text-lg font-black ${
                leader.attack < 0
                  ? 'text-red-500'
                  : leader.attack > 0
                    ? 'text-green-500'
                    : 'text-gray-300'
              }`}
            >
              {leader.attack > 0 ? '+' : ''}
              {leader.attack}
            </span>
            <button
              onClick={() => updateLeaderAttack(1000)}
              disabled={readonly}
              className="px-2 py-1 bg-green-900 text-green-200 text-xs rounded hover:bg-green-800 disabled:opacity-50 font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Cost */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">Cost</label>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => updateLeaderCost(-1)}
              disabled={readonly}
              className="px-2 py-1 bg-red-900 text-red-200 text-xs rounded hover:bg-red-800 disabled:opacity-50 font-bold transition-colors"
            >
              −
            </button>
            <span
              className={`flex-1 text-center text-lg font-black ${
                leader.cost < 0
                  ? 'text-red-500'
                  : leader.cost > 0
                    ? 'text-green-500'
                    : 'text-gray-300'
              }`}
            >
              {leader.cost > 0 ? '+' : ''}
              {leader.cost}
            </span>
            <button
              onClick={() => updateLeaderCost(1)}
              disabled={readonly}
              className="px-2 py-1 bg-green-900 text-green-200 text-xs rounded hover:bg-green-800 disabled:opacity-50 font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Status Dropdown */}
      <div className="relative mb-3">
        <button
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          disabled={readonly}
          className="w-full flex items-center gap-1 px-2 py-1.5 text-xs bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 disabled:opacity-50 transition-colors font-semibold text-gray-300 mb-2"
        >
          <span className="flex-1 text-left">
            {leader.status.length > 0 ? `${leader.status.length} effect(s)` : 'Add effect'}
          </span>
          <ChevronDown size={14} />
        </button>

        {/* Dropdown Menu */}
        {isStatusOpen && !readonly && (
        //   <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-gray-800 border border-gray-700 rounded shadow-lg z-50 max-h-60 overflow-y-auto">
            {(Object.entries(STATUS_LABELS) as [CharacterStatus, string][]).map(([value, label]) => (
              <button
                key={value}
                onClick={() => {
                  if (leader.status.includes(value)) {
                    removeLeaderStatus(value);
                  } else {
                    addLeaderStatus(value);
                  }
                }}
                className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                  leader.status.includes(value)
                    ? 'bg-yellow-900 text-yellow-200 font-semibold'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {leader.status.includes(value) ? '✓ ' : ''}
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Status Tags */}
        {leader.status.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {leader.status.map((status) => (
              <div
                key={status}
                className="flex items-center gap-1 px-2 py-1 bg-yellow-900/50 rounded text-xs font-semibold text-yellow-300 border border-yellow-700"
              >
                {STATUS_LABELS[status]}
                {!readonly && (
                  <button
                    onClick={() => removeLeaderStatus(status)}
                    className="hover:opacity-70 transition-opacity ml-0.5"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ability Used Toggle */}
      <button
        onClick={toggleLeaderAbility}
        disabled={readonly}
        className={`
          w-full py-2 text-xs font-bold rounded transition-colors uppercase tracking-wide
          ${
            leader.abilityUsed
              ? 'bg-gray-700 text-gray-400'
              : 'bg-blue-900 text-blue-200 hover:bg-blue-800'
          }
          disabled:opacity-50
        `}
      >
        {leader.abilityUsed ? '✗ Ability Used' : '✓ Ability Ready'}
      </button>
    </div>
  );
}