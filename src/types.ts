export type CharacterStatus = 
  | 'none'
  | 'blocker'
  | 'rush'
  | 'double-attack'
  | 'banish'
  | 'trigger'
  | 'frozen'
  | 'cant-attack'
  | 'immune-ko'
  | 'power-buff'
  | 'power-debuff'
  | 'cost-increase'
  | 'cost-decrease';

export type CharacterState = 'active' | 'rested';

export interface Character {
  id: string;
  name: string;
  attack: number;
  cost: number;
  status: CharacterStatus[];
  state: CharacterState;
}

export interface Leader {
  name: string;
  attack: number;
  cost: number;
  abilityUsed: boolean;
  status: CharacterStatus[];
}

export interface GameState {
  characters: Character[];
  leader: Leader;
//   diceResult: number | null;
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
  'none': 'None',
  'blocker': 'Blocker',
  'rush': 'Rush',
  'double-attack': 'Double Attack',
  'banish': 'Banish',
  'trigger': 'Trigger',
  'frozen': 'Frozen',
  'cant-attack': "Can't Attack",
  'immune-ko': 'Immune to KO',
  'power-buff': 'Power +1000',
  'power-debuff': 'Power -1000',
  'cost-increase': 'Cost +1',
  'cost-decrease': 'Cost -1',
};

export const INITIAL_LEADER: Leader = {
  name: '',
  attack: 0,
  cost: 0,
  abilityUsed: false,
  status: [],
};

export const createEmptyCharacter = (): Character => ({
  id: crypto.randomUUID(),
  name: '',
  attack: 0,
  cost: 0,
  status: [],
  state: 'active',
});