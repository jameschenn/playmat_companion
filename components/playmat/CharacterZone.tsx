'use client';

import { useState } from 'react';
import { Character, STATUS_LABELS, CharacterStatus } from '@/src/types';
import { useGameStore } from '@/src/store';
import { ChevronDown, X, Trash2 } from 'lucide-react';

interface CharacterSlotProps {
  character: Character;
  readonly?: boolean;
}

export default function CharacterSlot({ character, readonly = false }: CharacterSlotProps) {
  
    const {
    updateCharacterAttack,
    updateCharacterCost,
    addCharacterStatus,
    removeCharacterStatus,
    trashCharacter,
  } = useGameStore();

  const [ isStatusOpen, setIsStatusOpen ] = useState(false);
  const isEmpty = character.attack === 0 && character.cost === 0 && character.status.length === 0;


if (isEmpty && !readonly) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2">
        <button
          onClick={() => {
            updateCharacterAttack(character.id, 1000);
            updateCharacterCost(character.id, 1);
          }}
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center"
        >
          +
        </button>
        <span className="text-xs font-semibold text-gray-400">Add Character</span>
      </div>
    );
  }

  return (
    <div className={`
      relative rounded-lg border-2 p-2.5 transition-all h-full
      ${readonly ? 'border-gray-400 bg-gray-100' : 'border-amber-600 bg-red-50'}
    `}>
      {/* Header with Trash Button */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1" />
        {!readonly && (
          <button
            onClick={() => trashCharacter(character.id)}
            className="p-1 rounded hover:bg-red-200 transition-colors"
            title="Trash character"
          >
            <Trash2 size={14} className="text-red-600" />
          </button>
        )}
      </div>

      {/* Stats Row - Compact */}
      <div className="flex gap-2 mb-2">
        {/* Attack */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-700 mb-0.5">ATK</label>
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateCharacterAttack(character.id, -1000)}
              disabled={readonly}
              className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50 font-semibold"
            >
              −
            </button>
            <span className={`flex-1 text-center font-bold text-sm ${
              character.attack < 0 ? 'text-red-600' : character.attack > 0 ? 'text-green-600' : ''
            }`}>
              {character.attack > 0 ? '+' : ''}{character.attack}
            </span>
            <button
              onClick={() => updateCharacterAttack(character.id, 1000)}
              disabled={readonly}
              className="px-1.5 py-0.5 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50 font-semibold"
            >
              +
            </button>
          </div>
        </div>

        {/* Cost */}
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-700 mb-0.5">Cost</label>
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateCharacterCost(character.id, -1)}
              disabled={readonly}
              className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50 font-semibold"
            >
              −
            </button>
            <span className={`flex-1 text-center font-bold text-sm ${
              character.cost < 0 ? 'text-red-600' : character.cost > 0 ? 'text-green-600' : ''
            }`}>
              {character.cost > 0 ? '+' : ''}{character.cost}
            </span>
            <button
              onClick={() => updateCharacterCost(character.id, 1)}
              disabled={readonly}
              className="px-1.5 py-0.5 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50 font-semibold"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Status Effects - Dropdown with Tags */}
      <div className="relative mb-2">
        <button
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          disabled={readonly}
          className="w-full flex items-center gap-1 px-2 py-1.5 text-xs bg-gray-100 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <span className="text-xs font-semibold flex-1 text-left">
            {character.status.length > 0 ? `${character.status.length} effect(s)` : 'Add effect'}
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
                    if (character.status.includes(value)) {
                      removeCharacterStatus(character.id, value);
                    } else {
                      addCharacterStatus(character.id, value);
                    }
                  }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                    character.status.includes(value)
                      ? 'bg-amber-100 font-semibold'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {character.status.includes(value) ? '✓ ' : ''}{label}
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* Status Tags */}
      {character.status.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {character.status.map((status) => (
            <div
              key={status}
              className="flex items-center gap-1 px-2 py-1 bg-amber-200 rounded text-xs font-semibold text-amber-900"
            >
              {STATUS_LABELS[status]}
              {!readonly && (
                <button
                  onClick={() => removeCharacterStatus(character.id, status)}
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
  );
}