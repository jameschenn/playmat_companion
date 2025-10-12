'use client';

import { Character, STATUS_LABELS, CharacterStatus } from '@/src/types';
import { useGameStore } from '@/src/store';

interface CharacterSlotProps {
  character: Character;
  readonly?: boolean;
}

export default function CharacterSlot({ character, readonly = false }: CharacterSlotProps) {
  const {
    updateCharacterName,
    updateCharacterAttack,
    updateCharacterCost,
    toggleCharacterState,
    updateCharacterStatus,
  } = useGameStore();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value as CharacterStatus
    );
    updateCharacterStatus(character.id, selectedOptions);
  };

  return (
    <div
      className={`
        relative rounded-lg border-2 p-3 transition-all
        ${character.state === 'rested' ? 'rotate-90 opacity-70' : ''}
        ${readonly ? 'border-gray-400 bg-gray-100' : 'border-blue-500 bg-white'}
      `}
    >
      {/* Name Input */}
      <input
        type="text"
        value={character.name}
        onChange={(e) => updateCharacterName(character.id, e.target.value)}
        placeholder="Character"
        disabled={readonly}
        className="w-full mb-2 px-2 py-1 text-sm font-semibold border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
      />

      {/* Stats Row */}
      <div className="flex gap-2 mb-2">
        {/* Attack */}
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">ATK</label>
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateCharacterAttack(character.id, -1000)}
              disabled={readonly}
              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50"
            >
              -
            </button>
            <span className="flex-1 text-center font-bold">{character.attack}</span>
            <button
              onClick={() => updateCharacterAttack(character.id, 1000)}
              disabled={readonly}
              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        {/* Cost */}
        <div className="flex-1">
          <label className="block text-xs text-gray-600 mb-1">Cost</label>
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateCharacterCost(character.id, -1)}
              disabled={readonly}
              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50"
            >
              -
            </button>
            <span className="flex-1 text-center font-bold">{character.cost}</span>
            <button
              onClick={() => updateCharacterCost(character.id, 1)}
              disabled={readonly}
              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Status Select */}
      <select
        multiple
        value={character.status}
        onChange={handleStatusChange}
        disabled={readonly}
        className="w-full text-xs border rounded p-1 mb-2 max-h-20 disabled:bg-gray-100"
      >
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {/* State Toggle */}
      <button
        onClick={() => toggleCharacterState(character.id)}
        disabled={readonly}
        className={`
          w-full py-1 text-xs font-semibold rounded transition-colors
          ${character.state === 'active'
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
          }
          disabled:opacity-50
        `}
      >
        {character.state === 'active' ? '✓ Active' : '⟳ Rested'}
      </button>
    </div>
  );
}