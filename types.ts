
export enum ProjectStatus {
  PLANNING = 'PLANNING',
  GATHERING = 'GATHERING',
  LEGAL = 'LEGAL',
  COMPLETED = 'COMPLETED'
}

export interface Neighbor {
  id: string;
  unit: string;
  name: string;
  status: 'signed' | 'pending' | 'opposed';
  isResident: boolean;
  role?: 'admin' | 'member';
  contactStatus: 'available' | 'missing'; // New field for finding contacts user story
}

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  estimatedTime: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface BuildingStats {
  totalUnits: number;
  signedUnits: number;
  targetUnits: number;
}

export interface BuildingFacts {
  freeholderName: string;
  managingAgent: string;
  annualFees: string;
}
