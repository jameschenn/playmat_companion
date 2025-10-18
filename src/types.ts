export type CharacterStatus =
  | 'banish'
  | 'blocker'
  | `can't-attack`
  | `can't-block`
  | 'double-attack'
  | 'frozen'
  | 'immune-ko'
  | 'nullified'
  | 'rush'
  | 'tax'
  | 'untargetable';

// export type CharacterState = 'active' | 'rested';

export interface Character {
  id: string;
  // name: string;
  attack: number;
  cost: number;
  status: CharacterStatus[];
  isActive: boolean;
  // state: CharacterState;
}

export interface Leader {
  // name: string;
  attack: number;
  cost: number;
  abilityUsed: boolean;
  status: CharacterStatus[];
}

export interface GameState {
  characters: Character[];
  leader: Leader;
//   diceResult: number | null;
  trashCount: {
    character: number;
    event: number;
  }
}

export interface Room {
  id: string;
  code: string;
  status: 'waiting' | 'active' | 'finished';
  created_at: string;
}

export interface Player {
  id: string;
  room_id: string;
  seat: 1 | 2;
  user_id?: string;
}

export const STATUS_LABELS: Record<CharacterStatus, string> = {
  'banish': 'Banish',
  'blocker': 'Blocker',
  "can't-attack": "Can't Attack",
  "can't-block": "Can't Block",
  'double-attack': 'Double Attack',
  'frozen': 'Frozen',
  'immune-ko': 'Immune to KO',
  'nullified': 'Nullified',
  'rush': 'Rush',
  'tax': 'Tax',
  'untargetable': 'Untargetable',
};

export const INITIAL_LEADER: Leader = {
  // name: '',
  attack: 0,
  cost: 0,
  abilityUsed: false,
  status: [],
};

export const createEmptyCharacter = (): Character => ({
  id: crypto.randomUUID(),
  // name: '',
  attack: 0,
  cost: 0,
  status: [],
  // state: 'active',
  isActive: false,
});