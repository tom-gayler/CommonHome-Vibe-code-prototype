// ── Database row types (match column names from Supabase) ────
export interface Building {
  id: string;
  name: string;
  total_units: number;
  freeholder_name: string | null;
  managing_agent: string | null;
  annual_fees_pence: number | null;
  project_status: 'PLANNING' | 'GATHERING' | 'LEGAL' | 'COMPLETED';
  created_at: string;
  updated_at: string;
}

export interface Leaseholder {
  id: string;
  building_id: string;
  user_id: string | null;
  unit_label: string;
  display_name: string;
  is_resident: boolean;
  status: 'signed' | 'pending' | 'opposed';
  contact_status: 'available' | 'missing';
  role: 'admin' | 'member' | null;
  created_at: string;
  updated_at: string;
}

export interface RoadmapStep {
  id: string;
  building_id: string;
  display_order: number;
  title: string;
  description: string;
  estimated_time: string;
  is_completed: boolean;
  risk_level: 'Low' | 'Medium' | 'High';
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActivityLogEntry {
  id: string;
  building_id: string;
  actor_user_id: string | null;
  activity_type: 'success' | 'info';
  description: string;
  related_entity: string | null;
  created_at: string;
}

// ── Derived / UI types ───────────────────────────────────────
export interface BuildingStats {
  totalUnits: number;
  signedUnits: number;
  targetUnits: number;
}
