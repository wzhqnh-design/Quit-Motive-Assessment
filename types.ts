export interface Option {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export type SectionId = 'cash' | 'income' | 'execution' | 'retreat';

export interface Question {
  id: number;
  section: string;
  sectionId: SectionId;
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
  cash: number;
  income: number;
  execution: number;
  retreat: number;
}
