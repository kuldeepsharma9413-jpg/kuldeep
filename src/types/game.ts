export type AgeGroup = 'all' | 'toddler' | 'junior'; // toddler: 3-5, junior: 6-8, all: 3-8

export interface Question {
  id: string;
  statement: string;
  category: string;
  ageGroup: 'toddler' | 'junior' | 'both';
  emoji: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, or 3
  explanation: string;
  hint: string;
}

export type OptionLetter = 'A' | 'B' | 'C' | 'D';

export type GameStatus = 
  | 'WELCOME'
  | 'PLAYING'
  | 'LOCKED'
  | 'REVEALED_CORRECT'
  | 'REVEALED_WRONG'
  | 'WON'
  | 'GAME_OVER';

export interface LifelineState {
  fiftyFifty: boolean;
  audiencePoll: boolean;
  expertHint: boolean;
  flipQuestion: boolean;
}

export interface PrizeLevel {
  level: number;
  points: number;
  label: string;
  isMilestone: boolean; // Padhao
}
