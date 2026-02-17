
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BuildingStats, Neighbor, BuildingFacts } from '../types';

interface DashboardProps {
  stats: BuildingStats;
  neighbors: Neighbor[];
  buildingFacts: BuildingFacts;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, neighbors, buildingFacts }) => {
  const percentage = Math.round((stats.signedUnits / stats.totalUnits) * 100);
  const targetPercentage = Math.round((stats.targetUnits / stats.totalUnits) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-10">
        
        {/* Progress Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="font-extrabold text-2xl text-[#333333]">Project Commitment</h3>
              <p className="text-slate-500 text-sm mt-1">Goal: Reach 50% for Right to Manage / Commonhold start.</p>
            </div>
            <span className="text-3xl font-black text-[#d94e6d]">{percentage}%</span>
          </div>
          
          <div className="relative h-5 bg-slate-50 rounded-full overflow-hidden mb-10 shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-brand-gradient transition-all duration-1500 ease-out rounded-full"
              style={{ width: `${percentage}%` }}
            />
            <div 
              className="absolute top-0 h-full border-r-2 border-dashed border-slate-300 flex items-center justify-center"
              style={{ left: `${targetPercentage}%` }}
            >
              <div className="absolute -top-6 text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Target ({targetPercentage}%)</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="p-6 bg-[#f8fbfe] rounded-3xl border border-slate-50">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Total Units</p>
              <p className="text-3xl font-black text-[#4c6fa1]">{stats.totalUnits}</p>
            </div>
            <div className="p-6 bg-[#fdf8f9] rounded-3xl border border-slate-50">
              <p className="text-xs text-[#d94e6d] font-bold uppercase tracking-wider mb-2">Committed</p>
              <p className="text-3xl font-black text-[#d94e6d]">{stats.signedUnits}</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-50">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Needed</p>
              <p className="text-3xl font-black text-slate-400">{stats.targetUnits}</p>
            </div>
          </div>
        </div>

        {/* Building Facts Card (New User Stories) */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#333333] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4c6fa1]"></span>
              Key Building Facts
            </h3>
            <button className="text-[10px] font-bold uppercase tracking-wider text-[#4c6fa1] hover:text-[#75b0d3]">Edit Details</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Current Freeholder</p>
              <p className="font-bold text-[#333333]">{buildingFacts.freeholderName}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Managing Agent</p>
              <p className="font-bold text-[#333333]">{buildingFacts.managingAgent}</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-2xl">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Annual Service Charge</p>
              <p className="font-bold text-[#333333]">{buildingFacts.annualFees}</p>
            </div>
          </div>
        </div>

        {/* Resident vs Investor Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="font-bold text-[#333333] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#75b0d3]"></span>
              Ownership Mix
            </h3>
            <div className="flex items-center gap-8">
              <div className="h-32 w-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Residents', value: neighbors.filter(n => n.isResident).length },
                        { name: 'Off-site', value: neighbors.filter(n => !n.isResident).length },
                      ]}
                      innerRadius={35}
                      outerRadius={50}
                      paddingAngle={8}
                      dataKey="value"
                      stroke="none"
                    >
                      <Cell fill="#4c6fa1" />
                      <Cell fill="#e2e8f0" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <div className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-[#4c6fa1]" />
                    <span className="text-sm font-bold text-slate-700">Residents</span>
                  </div>
                  <p className="text-xs text-slate-500">Owners living in the block</p>
                </div>
                <div className="group">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="text-sm font-bold text-slate-700">Investors</span>
                  </div>
                  <p className="text-xs text-slate-500">Non-resident owners</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="font-bold text-[#333333] mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d94e6d]"></span>
              Recent Activity
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 text-sm border border-green-100 shadow-sm shrink-0">✓</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Flat 4 signed the petition</p>
                  <p className="text-[11px] text-slate-400 font-medium">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#75b0d3]/10 flex items-center justify-center text-[#4c6fa1] text-sm border border-[#75b0d3]/20 shadow-sm shrink-0">👋</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">You added Flat 5 contact</p>
                  <p className="text-[11px] text-slate-400 font-medium">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side column: Immediate Tasks */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <h3 className="font-extrabold text-xl text-[#333333] mb-8">Priority Actions</h3>
        <div className="space-y-8 relative">
          <div className="absolute top-0 bottom-0 left-[11px] w-0.5 bg-slate-50"></div>
          
          <div className="relative pl-10">
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-brand-gradient flex items-center justify-center shadow-lg shadow-[#4c6fa1]/30">
               <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            </div>
            <h4 className="font-bold text-sm text-[#333333]">Establish Facts</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">Identify freeholder, agents, and confirm service charge costs.</p>
            <div className="mt-3 inline-flex px-3 py-1 bg-[#d94e6d]/10 text-[#d94e6d] text-[10px] font-black rounded-full uppercase tracking-wider">In Progress</div>
          </div>

          <div className="relative pl-10">
             <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-[#4c6fa1] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#4c6fa1]"></div>
             </div>
            <h4 className="font-bold text-sm text-[#333333]">Find Missing Contacts</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">We need contact details for 2 non-resident owners to proceed.</p>
          </div>

          <div className="relative pl-10 opacity-50">
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-100 border-2 border-slate-200"></div>
            <h4 className="font-bold text-sm text-slate-500">Make the Case</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Share benefits of RTM/Commonhold with all owners.</p>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-slate-50">
          <div className="bg-[#d94e6d] p-6 rounded-3xl shadow-xl shadow-[#d94e6d]/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-4xl opacity-10 group-hover:scale-125 transition-transform duration-500">⚠️</div>
            <p className="text-white/70 text-[10px] font-black mb-1 uppercase tracking-[0.2em]">Blocker</p>
            <p className="text-sm text-white font-bold leading-relaxed mb-5">Missing address for Flat 6 (Non-resident).</p>
            <button className="w-full py-3 bg-white text-[#d94e6d] text-xs font-black rounded-2xl hover:bg-slate-50 transition-all hover:shadow-lg active:scale-95">
              Find Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
