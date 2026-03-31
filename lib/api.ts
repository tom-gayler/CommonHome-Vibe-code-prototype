import { supabase } from './supabase';
import { Building, Leaseholder, RoadmapStep, ActivityLogEntry } from '../types';

// ── Buildings ────────────────────────────────────────────────

export async function getBuilding(id: string): Promise<Building> {
  const { data, error } = await supabase
    .from('buildings')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// ── Leaseholders ─────────────────────────────────────────────

export async function getLeaseholders(buildingId: string): Promise<Leaseholder[]> {
  const { data, error } = await supabase
    .from('leaseholders')
    .select('*')
    .eq('building_id', buildingId)
    .order('unit_label');
  if (error) throw error;
  return data;
}

export async function updateLeaseholder(
  id: string,
  patch: Partial<Pick<Leaseholder, 'status' | 'contact_status' | 'display_name' | 'is_resident'>>
): Promise<Leaseholder> {
  const { data, error } = await supabase
    .from('leaseholders')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Roadmap Steps ────────────────────────────────────────────

export async function getRoadmapSteps(buildingId: string): Promise<RoadmapStep[]> {
  const { data, error } = await supabase
    .from('roadmap_steps')
    .select('*')
    .eq('building_id', buildingId)
    .order('display_order');
  if (error) throw error;
  return data;
}

export async function completeStep(id: string): Promise<RoadmapStep> {
  const { data, error } = await supabase
    .from('roadmap_steps')
    .update({
      is_completed: true,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Activity Log ─────────────────────────────────────────────

export async function getActivityLog(
  buildingId: string,
  limit = 10
): Promise<ActivityLogEntry[]> {
  const { data, error } = await supabase
    .from('activity_log')
    .select('*')
    .eq('building_id', buildingId)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data;
}

export async function addActivityLog(
  entry: Pick<ActivityLogEntry, 'building_id' | 'activity_type' | 'description' | 'related_entity'>
): Promise<void> {
  const { error } = await supabase.from('activity_log').insert(entry);
  if (error) throw error;
}
