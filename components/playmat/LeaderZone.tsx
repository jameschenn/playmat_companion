'use client';

import { Leader, STATUS_LABELS, CharacterStatus } from '@/src/types';
import { useGameStore } from '@/src/store';

interface LeaderZoneProps {
  leader: Leader;
  readonly?: boolean;
}

export default function LeaderZone({ leader, readonly = false }: LeaderZoneProps) {
  const {
    updateLeader,
    updateLeaderAttack,
    updateLeaderCost,
    toggleLeaderAbility,
    updateLeaderStatus,
  } = useGameStore();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value as CharacterStatus
    );
    updateLeaderStatus(selectedOptions);
  };

  return (
    <div className={`
      rounded-lg border-4 p-4
      ${readonly ? 'border-gray-500 bg-gray-100' : 'border-yellow-500 bg-yellow-50'}
    `}>
      <h2 className="text-lg font-bold mb-3 text-center text-yellow-700">
        👑 LEADER
      </h2>

      {/* Name Input */}
      <input
        type="text"
        value={leader.name}
        onChange={(e) => updateLeader({ name: e.target.value })}
        placeholder="Leader Name"
        disabled={readonly}
        className="w-full mb-3 px-3 py-2 text-base font-semibold border-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-100"
      />

      {/* Stats Row */}
      <div className="flex gap-3 mb-3">
        {/* Attack */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Attack
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateLeaderAttack(-1000)}
              disabled={readonly}
              className="px-3 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 disabled:opacity-50"
            >
              -
            </button>
            <span className="flex-1 text-center text-xl font-bold">
              {leader.attack}
            </span>
            <button
              onClick={() => updateLeaderAttack(1000)}
              disabled={readonly}
              className="px-3 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Cost */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Cost
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateLeaderCost(-1)}
              disabled={readonly}
              className="px-3 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 disabled:opacity-50"
            >
              -
            </button>
            <span className="flex-1 text-center text-xl font-bold">
              {leader.cost}
            </span>
            <button
              onClick={() => updateLeaderCost(1)}
              disabled={readonly}
              className="px-3 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Status Select */}
      <select
        multiple
        value={leader.status}
        onChange={handleStatusChange}
        disabled={readonly}
        className="w-full text-sm border-2 rounded p-2 mb-3 max-h-24 disabled:bg-gray-100"
      >
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* Ability Used Toggle */}
      <button
        onClick={toggleLeaderAbility}
        disabled={readonly}
        className={`
          w-full py-2 text-sm font-bold rounded transition-colors
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