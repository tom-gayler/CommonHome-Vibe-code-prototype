
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Roadmap } from './components/Roadmap';
import { CommunityHub } from './components/CommunityHub';
import { AIAdvisor } from './components/AIAdvisor';
import { Layout } from './components/Layout';
import { Neighbor, BuildingFacts } from './types';

const MOCK_NEIGHBORS: Neighbor[] = [
  { id: '1', unit: 'Flat 1', name: 'Alex Thompson', status: 'signed', isResident: true, role: 'admin', contactStatus: 'available' },
  { id: '2', unit: 'Flat 2', name: 'Sarah Jenkins', status: 'signed', isResident: true, contactStatus: 'available' },
  { id: '3', unit: 'Flat 3', name: 'Michael Chen', status: 'pending', isResident: false, contactStatus: 'available' },
  { id: '4', unit: 'Flat 4', name: 'Unknown Owner', status: 'pending', isResident: true, contactStatus: 'missing' },
  { id: '5', unit: 'Flat 5', name: 'Alice Wong', status: 'pending', isResident: true, contactStatus: 'available' },
  { id: '6', unit: 'Flat 6', name: 'Bob Smith', status: 'opposed', isResident: false, contactStatus: 'missing' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roadmap' | 'community' | 'advisor'>('dashboard');
  const [neighbors, setNeighbors] = useState<Neighbor[]>(MOCK_NEIGHBORS);
  const [buildingName] = useState("Victoria Garden Courts");
  
  // New state for user stories regarding establishing facts
  const [buildingFacts] = useState<BuildingFacts>({
    freeholderName: "Earls Court Freeholds Ltd",
    managingAgent: "Prestige Property Mgmt",
    annualFees: "£42,000",
  });

  const totalUnits = 12;
  const signedCount = neighbors.filter(n => n.status === 'signed').length;
  const targetCount = Math.ceil(totalUnits * 0.5); // 50% for Right to Manage, often first step

  return (
    <Layout 
      buildingName={buildingName} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {activeTab === 'dashboard' && (
        <Dashboard 
          stats={{ totalUnits, signedUnits: signedCount, targetUnits: targetCount }} 
          neighbors={neighbors}
          buildingFacts={buildingFacts}
        />
      )}
      {activeTab === 'roadmap' && <Roadmap />}
      {activeTab === 'community' && <CommunityHub neighbors={neighbors} setNeighbors={setNeighbors} />}
      {activeTab === 'advisor' && <AIAdvisor />}
    </Layout>
  );
};

export default App;
