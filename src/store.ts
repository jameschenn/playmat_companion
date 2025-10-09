import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Character, Leader, GameState, CharacterStatus, CharacterState } from './types';
import { INITIAL_LEADER, createEmptyCharacter } from './types';

interface GameStore extends GameState {
  // Character actions
  addCharacter: () => void;
  removeCharacter: (id: string) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  updateCharacterName: (id: string, name: string) => void;
  updateCharacterAttack: (id: string, delta: number) => void;
  updateCharacterCost: (id: string, delta: number) => void;
  toggleCharacterState: (id: string) => void;
  updateCharacterStatus: (id: string, status: CharacterStatus[]) => void;
  
  // Leader actions
  updateLeader: (updates: Partial<Leader>) => void;
  updateLeaderAttack: (delta: number) => void;
  updateLeaderCost: (delta: number) => void;
  toggleLeaderAbility: () => void;
  updateLeaderStatus: (status: CharacterStatus[]) => void;
  
  // Dice actions
  rollDice: () => void;
  
  // Game actions
  resetGame: () => void;
  loadState: (state: GameState) => void;
}

const INITIAL_STATE: GameState = {
  characters: Array(5).fill(null).map(() => createEmptyCharacter()),
  leader: { ...INITIAL_LEADER },
  diceResult: null,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      // Character actions
      addCharacter: () => set((state) => {
        if (state.characters.length >= 5) return state;
        return {
          characters: [...state.characters, createEmptyCharacter()],
        };
      }),

      removeCharacter: (id) => set((state) => ({
        characters: state.characters.filter((c) => c.id !== id),
      })),

      updateCharacter: (id, updates) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        ),
      })),

      updateCharacterName: (id, name) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id ? { ...c, name } : c
        ),
      })),

      updateCharacterAttack: (id, delta) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id ? { ...c, attack: Math.max(0, c.attack + delta) } : c
        ),
      })),

      updateCharacterCost: (id, delta) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id ? { ...c, cost: Math.max(0, c.cost + delta) } : c
        ),
      })),

      toggleCharacterState: (id) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id
            ? { ...c, state: c.state === 'active' ? 'rested' : 'active' }
            : c
        ),
      })),

      updateCharacterStatus: (id, status) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id ? { ...c, status } : c
        ),
      })),

      // Leader actions
      updateLeader: (updates) => set((state) => ({
        leader: { ...state.leader, ...updates },
      })),

      updateLeaderAttack: (delta) => set((state) => ({
        leader: {
          ...state.leader,
          attack: Math.max(0, state.leader.attack + delta),
        },
      })),

      updateLeaderCost: (delta) => set((state) => ({
        leader: {
          ...state.leader,
          cost: Math.max(0, state.leader.cost + delta),
        },
      })),

      toggleLeaderAbility: () => set((state) => ({
        leader: {
          ...state.leader,
          abilityUsed: !state.leader.abilityUsed,
        },
      })),

      updateLeaderStatus: (status) => set((state) => ({
        leader: { ...state.leader, status },
      })),

      // Dice actions
      rollDice: () => set(() => ({
        diceResult: Math.floor(Math.random() * 6) + 1,
      })),

      // Game actions
      resetGame: () => set({
        characters: Array(6).fill(null).map(() => createEmptyCharacter()),
        leader: { ...INITIAL_LEADER },
        diceResult: null,
      }),

      loadState: (state) => set(state),
    }),
    {
      name: 'playmat-storage',
      version: 1,
    }
  )
);