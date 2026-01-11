export interface Option {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: number;
  section: string;
  sectionId: 'emotion' | 'family' | 'risk' | 'value' | 'structure';
  text: string;
  options: Option[];
}

export type ResultType = 'HIGH_RISK' | 'PREPARATION_NEEDED' | 'STRATEGIC_RESIGNATION';

export interface ResultContent {
  title: string;
  scoreRange: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string[];
}

export interface ScoreBreakdown {
  total: number;
  emotion: number;
  family: number;
  risk: number;
  value: number;
  structure: number;
}