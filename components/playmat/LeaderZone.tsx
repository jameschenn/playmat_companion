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
    <div className={`
      rounded-xl border-3 p-3.5 transition-all
      ${readonly ? 'border-gray-400 bg-gray-100' : 'border-red-600 bg-red-100'}
    `}>
      <h2 className="text-base font-black mb-3 text-center text-red-700 uppercase tracking-wide">
        👑 Leader
      </h2>

      {/* Stats Row */}
      <div className="flex gap-3 mb-3">
        {/* Attack */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 mb-1">ATK</label>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => updateLeaderAttack(-1000)}
              disabled={readonly}
              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50 font-bold"
            >
              −
            </button>
            <span className={`flex-1 text-center text-lg font-bold ${
              leader.attack < 0 ? 'text-red-600' : leader.attack > 0 ? 'text-green-600' : ''
            }`}>
              {leader.attack > 0 ? '+' : ''}{leader.attack}
            </span>
            <button
              onClick={() => updateLeaderAttack(1000)}
              disabled={readonly}
              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50 font-bold"
            >
              +
            </button>
          </div>
        </div>

        {/* Cost */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-700 mb-1">Cost</label>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => updateLeaderCost(-1)}
              disabled={readonly}
              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50 font-bold"
            >
              −
            </button>
            <span className={`flex-1 text-center text-lg font-bold ${
              leader.cost < 0 ? 'text-red-600' : leader.cost > 0 ? 'text-green-600' : ''
            }`}>
              {leader.cost > 0 ? '+' : ''}{leader.cost}
            </span>
            <button
              onClick={() => updateLeaderCost(1)}
              disabled={readonly}
              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50 font-bold"
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
          className="w-full flex items-center gap-1 px-2 py-1.5 text-xs bg-gray-100 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 transition-colors mb-2 font-semibold"
        >
          <span className="flex-1 text-left">
            {leader.status.length > 0 ? `${leader.status.length} effect(s)` : 'Add effect'}
          </span>
          <ChevronDown size={14} />
        </button>

        {/* Dropdown Menu */}
        {isStatusOpen && !readonly && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
            {(Object.entries(STATUS_LABELS) as [CharacterStatus, string][]).map(
              ([value, label]) => (
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
                      ? 'bg-red-100 font-semibold'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {leader.status.includes(value) ? '✓ ' : ''}{label}
                </button>
              )
            )}
          </div>
        )}

        {/* Status Tags */}
        {leader.status.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {leader.status.map((status) => (
              <div
                key={status}
                className="flex items-center gap-1 px-2 py-1 bg-red-200 rounded text-xs font-semibold text-red-900"
              >
                {STATUS_LABELS[status]}
                {!readonly && (
                  <button
                    onClick={() => removeLeaderStatus(status)}
                    className="hover:opacity-70 transition-opacity"
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
          w-full py-2 text-xs font-bold rounded transition-colors
          ${leader.abilityUsed
            ? 'bg-gray-400 text-white'
            : 'bg-blue-500 text-white hover:bg-blue-600'
          }
          disabled:opacity-50
        `}
      >
        {leader.abilityUsed ? '✗ Ability Used' : '✓ Ability Ready'}
      </button>
    </div>
  );
}