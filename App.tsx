import React, { useState, useEffect, useCallback } from 'react';
import { Dashboard } from './components/Dashboard';
import { Roadmap } from './components/Roadmap';
import { CommunityHub } from './components/CommunityHub';
import { AIAdvisor } from './components/AIAdvisor';
import { Layout } from './components/Layout';
import { Building, Leaseholder, RoadmapStep, ActivityLogEntry, BuildingStats } from './types';
import { getBuilding, getLeaseholders, getRoadmapSteps, getActivityLog, completeStep, updateLeaseholder, addActivityLog } from './lib/api';

// Seeded building ID — matches 001_initial_schema.sql
const BUILDING_ID = 'b1000000-0000-0000-0000-000000000001';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roadmap' | 'community' | 'advisor'>('dashboard');
  const [building, setBuilding] = useState<Building | null>(null);
  const [leaseholders, setLeaseholders] = useState<Leaseholder[]>([]);
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      const [b, l, s, a] = await Promise.all([
        getBuilding(BUILDING_ID),
        getLeaseholders(BUILDING_ID),
        getRoadmapSteps(BUILDING_ID),
        getActivityLog(BUILDING_ID, 10),
      ]);
      setBuilding(b);
      setLeaseholders(l);
      setSteps(s);
      setActivityLog(a);
    } catch (err) {
      setError('Failed to load data. Check your Supabase connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleCompleteStep = async (id: string) => {
    const updated = await completeStep(id);
    setSteps(prev => prev.map(s => s.id === id ? updated : s));
  };

  const handleUpdateLeaseholder = async (
    id: string,
    patch: Partial<Pick<Leaseholder, 'status' | 'contact_status' | 'display_name' | 'is_resident'>>
  ) => {
    const updated = await updateLeaseholder(id, patch);
    setLeaseholders(prev => prev.map(l => l.id === id ? updated : l));
    const leaseholder = leaseholders.find(l => l.id === id);
    if (leaseholder) {
      await addActivityLog({
        building_id: BUILDING_ID,
        activity_type: 'info',
        description: `Updated ${leaseholder.unit_label}`,
        related_entity: leaseholder.unit_label,
      });
      setActivityLog(prev => [{
        id: crypto.randomUUID(),
        building_id: BUILDING_ID,
        actor_user_id: null,
        activity_type: 'info',
        description: `Updated ${leaseholder.unit_label}`,
        related_entity: leaseholder.unit_label,
        created_at: new Date().toISOString(),
      }, ...prev].slice(0, 10));
    }
  };

  const stats: BuildingStats | null = building ? {
    totalUnits: building.total_units,
    signedUnits: leaseholders.filter(l => l.status === 'signed').length,
    targetUnits: Math.ceil(building.total_units * 0.5),
  } : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfdfe]">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-gradient mx-auto mb-4 animate-pulse" />
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !building || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfdfe]">
        <div className="text-center max-w-md">
          <p className="text-[#d94e6d] font-bold mb-2">Connection Error</p>
          <p className="text-slate-500 text-sm">{error}</p>
          <p className="text-slate-400 text-xs mt-4">Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.local</p>
        </div>
      </div>
    );
  }

  return (
    <Layout
      buildingName={building.name}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <Dashboard
          stats={stats}
          leaseholders={leaseholders}
          building={building}
          activityLog={activityLog}
        />
      )}
      {activeTab === 'roadmap' && (
        <Roadmap steps={steps} onCompleteStep={handleCompleteStep} />
      )}
      {activeTab === 'community' && (
        <CommunityHub leaseholders={leaseholders} onUpdate={handleUpdateLeaseholder} />
      )}
      {activeTab === 'advisor' && <AIAdvisor />}
    </Layout>
  );
};

export default App;
