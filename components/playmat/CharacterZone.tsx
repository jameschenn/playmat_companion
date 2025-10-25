'use client';

import { useState } from 'react';
import { Character, STATUS_LABELS, CharacterStatus } from '@/src/types';
import { useGameStore } from '@/src/store';
import { ChevronDown, X, Trash2 } from 'lucide-react';

interface CharacterSlotProps {
  character: Character;
  readonly?: boolean;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}

export default function CharacterSlot({
    character, 
    readonly = false,
    isDragging = false,
    onDragStart,
    onDragOver,
    onDrop, 
}: CharacterSlotProps) {
  
    const {
    activateCharacter,
    updateCharacterAttack,
    updateCharacterCost,
    addCharacterStatus,
    removeCharacterStatus,
    toggleCharacterAbility,
    trashCharacter,
  } = useGameStore();


const [isStatusOpen, setIsStatusOpen] = useState(false);
// Empty state: no attack, no cost, no status
const isEmpty = character.attack === 0 && character.cost === 0 && character.status.length === 0;
  
// If empty and not readonly, show + button
if (!character.isActive && !readonly) {
    return (
      <div
        draggable={!readonly}
        onDragStart={onDragStart ? (e) => onDragStart(e, character.id) : undefined}
        onDragOver={onDragOver}
        onDrop={onDrop ? (e) => onDrop(e, character.id) : undefined}
        className={`
          relative rounded-lg border-2 border-dashed border-gray-500 bg-gray-900 p-2.5 transition-all h-full
          flex items-center justify-center min-h-24
          ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
          ${!readonly && !isDragging ? 'cursor-grab active:cursor-grabbing hover:border-gray-400' : ''}
        `}
        onClick={() => activateCharacter(character.id)}
      >
        <div className="text-center">
          <div className="text-3xl font-black text-gray-500 mb-1">+</div>
          <div className="text-xs font-semibold text-gray-500">Empty</div>
        </div>
      </div>
    );
  }

  return (
    <div
      draggable={!readonly}
      onDragStart={onDragStart ? (e) => onDragStart(e, character.id) : undefined}
      onDragOver={onDragOver}
      onDrop={onDrop ? (e) => onDrop(e, character.id) : undefined}
      className={`
        relative rounded-lg border-2 p-3 transition-all h-full
        bg-gradient-to-br from-gray-800 to-gray-900 border-red-700 shadow-lg
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        ${!readonly && !isDragging ? 'cursor-grab active:cursor-grabbing hover:shadow-xl hover:border-red-600' : ''}
      `}
    >
      {/* Header with Trash Button */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1" />
        {!readonly && (
          <button
            onClick={() => trashCharacter(character.id)}
            className="p-1.5 rounded hover:bg-red-900/50 transition-colors"
            title="Trash character"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        )}
      </div>

      {/* Stats Row - Compact */}
      <div className="flex gap-2 mb-2">
        {/* Attack */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wide">ATK</label>
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateCharacterAttack(character.id, -1000)}
              disabled={readonly}
              className="px-1.5 py-0.5 bg-red-900 text-red-200 text-xs rounded hover:bg-red-800 disabled:opacity-50 font-bold transition-colors"
            >
              −
            </button>
            <span
              className={`flex-1 text-center font-black text-sm ${
                character.attack < 0
                  ? 'text-red-500'
                  : character.attack > 0
                    ? 'text-green-500'
                    : 'text-gray-300'
              }`}
            >
              {character.attack > 0 ? '+' : ''}
              {character.attack}
            </span>
            <button
              onClick={() => updateCharacterAttack(character.id, 1000)}
              disabled={readonly}
              className="px-1.5 py-0.5 bg-green-900 text-green-200 text-xs rounded hover:bg-green-800 disabled:opacity-50 font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Cost */}
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-400 mb-0.5 uppercase tracking-wide">Cost</label>
          <div className="flex items-center gap-1">
            <button
              onClick={() => updateCharacterCost(character.id, -1)}
              disabled={readonly}
              className="px-1.5 py-0.5 bg-red-900 text-red-200 text-xs rounded hover:bg-red-800 disabled:opacity-50 font-bold transition-colors"
            >
              −
            </button>
            <span
              className={`flex-1 text-center font-black text-sm ${
                character.cost < 0
                  ? 'text-red-500'
                  : character.cost > 0
                    ? 'text-green-500'
                    : 'text-gray-300'
              }`}
            >
              {character.cost > 0 ? '+' : ''}
              {character.cost}
            </span>
            <button
              onClick={() => updateCharacterCost(character.id, 1)}
              disabled={readonly}
              className="px-1.5 py-0.5 bg-green-900 text-green-200 text-xs rounded hover:bg-green-800 disabled:opacity-50 font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Status Effects - Dropdown */}
      <div className="relative mb-2">
        <button
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          disabled={readonly}
          className="w-full flex items-center gap-1 px-2 py-1.5 text-xs bg-gray-800 border border-gray-700 rounded hover:bg-gray-700 disabled:opacity-50 transition-colors font-semibold text-gray-300"
        >
          <span className="flex-1 text-left">
            {character.status.length > 0 ? `${character.status.length} effect(s)` : 'Add effect'}
          </span>
          <ChevronDown size={14} />
        </button>

        {/* Dropdown Menu */}
        {isStatusOpen && !readonly && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg z-[9999] max-h-60 overflow-y-auto">
            {(Object.entries(STATUS_LABELS) as [CharacterStatus, string][]).map(([value, label]) => (
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
                    ? 'bg-red-900 text-red-200 font-semibold'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {character.status.includes(value) ? '✓ ' : ''}
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status Tags */}
      {character.status.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {character.status.map((status) => (
            <div
              key={status}
              className="flex items-center gap-1 px-2 py-1 bg-red-900/50 rounded text-xs font-semibold text-red-300 border border-red-700"
            >
              {STATUS_LABELS[status]}
              {!readonly && (
                <button
                  onClick={() => removeCharacterStatus(character.id, status)}
                  className="hover:opacity-70 transition-opacity ml-0.5"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Ability Used Toggle */}
      <button
        onClick={() => toggleCharacterAbility(character.id)}
        disabled={readonly}
        className={`
          w-full py-1.5 text-xs font-bold rounded transition-colors uppercase tracking-wide
          ${
            character.abilityUsed
              ? 'bg-gray-700 text-gray-400'
              : 'bg-blue-900 text-blue-200 hover:bg-blue-800'
          }
          disabled:opacity-50
        `}
      >
        {character.abilityUsed ? '✗ Ability Used' : '✓ Ability Ready'}
      </button>
    </div>
  );
}