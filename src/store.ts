import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { /*Character, Leader, CharacterState*/ GameState, CharacterStatus, } from './types';
import { INITIAL_LEADER, createEmptyCharacter } from './types';

interface GameStore extends GameState {
  // Character actions
  // addCharacter: () => void;
  // removeCharacter: (id: string) => void;
  // updateCharacter: (id: string, updates: Partial<Character>) => void;
  // updateCharacterName: (id: string, name: string) => void;
  activateCharacter: (id: string) => void;
  updateCharacterAttack: (id: string, delta: number) => void;
  updateCharacterCost: (id: string, delta: number) => void;
  addCharacterStatus: (id: string, status: CharacterStatus) => void;
  removeCharacterStatus: (id: string, status: CharacterStatus) => void;
  trashCharacter: (id: string) => void;
  toggleCharacterAbility: (id: string) => void;
  // toggleCharacterState: (id: string) => void;
  // updateCharacterStatus: (id: string, status: CharacterStatus[]) => void;
  swapCharacters: (id1: string, id2: string) => void;
  
  // Leader actions
  // updateLeader: (updates: Partial<Leader>) => void;
  updateLeaderAttack: (delta: number) => void;
  updateLeaderCost: (delta: number) => void;
  toggleLeaderAbility: () => void;
  addLeaderStatus: (status: CharacterStatus) => void;
  removeLeaderStatus: (status: CharacterStatus) => void;
  // updateLeaderStatus: (status: CharacterStatus[]) => void;
  
  // // Dice actions (NOTE TO SELF: If you ever want to save dice results, uncomment all dice functions)
  // rollDice: () => void; 

  // Trash counter actions
  incrementTrashCount: (type: 'character' | 'event') => void;
  decrementTrashCount: (type: 'character' | 'event') => void;
  resetTrashCount: () => void;
  
  // Game actions
  resetGame: () => void;
  loadState: (state: GameState) => void;
}

const INITIAL_STATE: GameState = {
  characters: Array(5).fill(null).map(() => createEmptyCharacter()),
  leader: { ...INITIAL_LEADER },
  // diceResult: null,
  trashCount: {
    character: 0,
    event: 0,
  },
};

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      // Character actions
      // addCharacter: () => set((state) => {
      //   if (state.characters.length >= 5) return state;
      //   return {
      //     characters: [...state.characters, createEmptyCharacter()],
      //   };
      // }),

      // removeCharacter: (id) => set((state) => ({
      //   characters: state.characters.filter((c) => c.id !== id),
      // })),

      // updateCharacter: (id, updates) => set((state) => ({
      //   characters: state.characters.map((c) =>
      //     c.id === id ? { ...c, ...updates } : c
      //   ),
      // })),

      // updateCharacterName: (id, name) => set((state) => ({
      //   characters: state.characters.map((c) =>
      //     c.id === id ? { ...c, name } : c
      //   ),
      // })),

      // updateCharacterAttack: (id, delta) => set((state) => ({
      //   characters: state.characters.map((c) =>
      //     c.id === id ? { ...c, attack: Math.max(0, c.attack + delta) } : c
      //   ),
      // })),

      // updateCharacterCost: (id, delta) => set((state) => ({
      //   characters: state.characters.map((c) =>
      //     c.id === id ? { ...c, cost: Math.max(0, c.cost + delta) } : c
      //   ),
      // })),

      // toggleCharacterState: (id) => set((state) => ({
      //   characters: state.characters.map((c) =>
      //     c.id === id
      //       ? { ...c, state: c.state === 'active' ? 'rested' : 'active' }
      //       : c
      //   ),
      // })),

      // updateCharacterStatus: (id, status) => set((state) => ({
      //   characters: state.characters.map((c) =>
      //     c.id === id ? { ...c, status } : c
      //   ),
      // })),

      activateCharacter: (id) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id ? { ...c, isActive: true } : c
        ),
      })),

      updateCharacterAttack: (id, delta) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id ? { ...c, attack: c.attack + delta } : c
        ),
      })),

      updateCharacterCost: (id, delta) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id ? { ...c, cost: c.cost + delta } : c
        ),
      })),

      addCharacterStatus: (id, status) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id && !c.status.includes(status)
            ? { ...c, status: [...c.status, status] }
            : c
        ),
      })),

      removeCharacterStatus: (id, status) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id
            ? { ...c, status: c.status.filter((s) => s !== status) }
            : c
        ),
      })),

      toggleCharacterAbility: (id) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id
            ? { ...c, abilityUsed: !c.abilityUsed }
            : c
        ),
      })),

      trashCharacter: (id) => set((state) => ({
        characters: state.characters.map((c) =>
          c.id === id
            ? { ...createEmptyCharacter(), id }
            : c
        ),
      })),

      swapCharacters: (id1, id2) => set((state) => {
        const idx1 = state.characters.findIndex((c) => c.id === id1);
        const idx2 = state.characters.findIndex((c) => c.id === id2);
        
        if (idx1 === -1 || idx2 === -1) return state;
        
        const newCharacters = [...state.characters];
        [newCharacters[idx1], newCharacters[idx2]] = [newCharacters[idx2], newCharacters[idx1]];
        
        return { characters: newCharacters };
      }),

      // Leader actions
      // updateLeader: (updates) => set((state) => ({
      //   leader: { ...state.leader, ...updates },
      // })),

      // updateLeaderAttack: (delta) => set((state) => ({
      //   leader: {
      //     ...state.leader,
      //     attack: Math.max(0, state.leader.attack + delta),
      //   },
      // })),

      // updateLeaderCost: (delta) => set((state) => ({
      //   leader: {
      //     ...state.leader,
      //     cost: Math.max(0, state.leader.cost + delta),
      //   },
      // })),

      // toggleLeaderAbility: () => set((state) => ({
      //   leader: {
      //     ...state.leader,
      //     abilityUsed: !state.leader.abilityUsed,
      //   },
      // })),

      // updateLeaderStatus: (status) => set((state) => ({
      //   leader: { ...state.leader, status },
      // })),
      
      updateLeaderAttack: (delta) => set((state) => ({
        leader: {
          ...state.leader,
          attack: state.leader.attack + delta,
        },
      })),

      updateLeaderCost: (delta) => set((state) => ({
        leader: {
          ...state.leader,
          cost: state.leader.cost + delta,
        },
      })),

      toggleLeaderAbility: () => set((state) => ({
        leader: {
          ...state.leader,
          abilityUsed: !state.leader.abilityUsed,
        },
      })),

      addLeaderStatus: (status) => set((state) => ({
        leader: {
          ...state.leader,
          status: !state.leader.status.includes(status)
            ? [...state.leader.status, status]
            : state.leader.status,
        },
      })),

      removeLeaderStatus: (status) => set((state) => ({
        leader: {
          ...state.leader,
          status: state.leader.status.filter((s) => s !== status),
        },
      })),

      // // Dice actions
      // rollDice: () => set(() => ({
      //   diceResult: Math.floor(Math.random() * 12) + 1,
      // })),

      // Trash counter actions
      incrementTrashCount: (type) => set((state) => ({
        trashCount: {
          ...state.trashCount,
          [type]: state.trashCount[type] + 1,
        },
      })),

      decrementTrashCount: (type) => set((state) => ({
        trashCount: {
          ...state.trashCount,
          [type]: Math.max(0, state.trashCount[type] - 1),
        },
      })),

      resetTrashCount: () => set({
        trashCount: { character: 0, event: 0 },
      }),

      // Game actions
      resetGame: () => set({
        characters: Array(5).fill(null).map(() => createEmptyCharacter()),
        leader: { ...INITIAL_LEADER },
        trashCount: { character: 0, event: 0 },
        // diceResult: null,
      }),

      loadState: (state) => set(state),
    }),
    {
      name: 'playmat-storage',
      version: 1,
    }
  )
);