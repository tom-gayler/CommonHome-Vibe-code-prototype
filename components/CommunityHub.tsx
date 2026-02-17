
import React, { useState } from 'react';
import { Neighbor } from '../types';

interface CommunityHubProps {
  neighbors: Neighbor[];
  setNeighbors: React.Dispatch<React.SetStateAction<Neighbor[]>>;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({ neighbors, setNeighbors }) => {
  const [filter, setFilter] = useState<'all' | 'signed' | 'missing_contact' | 'non_resident'>('all');

  const filteredNeighbors = neighbors.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'signed') return n.status === 'signed';
    if (filter === 'missing_contact') return n.contactStatus === 'missing';
    if (filter === 'non_resident') return !n.isResident;
    return true;
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h3 className="text-3xl font-black text-[#333333]">Neighbor Directory</h3>
          <p className="text-slate-500 font-medium mt-1">Manage contacts and coordinate your building team.</p>
        </div>
        
        <div className="flex gap-3">
             {/* Broadcast Button (User Story: Send message to others) */}
            <button className="px-5 py-2.5 bg-[#4c6fa1] text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#3e5c8a] transition-colors shadow-lg">
              Broadcast Update
            </button>
        </div>
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-2xl shadow-inner border border-slate-50 w-full md:w-fit">
          {['all', 'signed', 'non_resident', 'missing_contact'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-5 py-2 rounded-xl text-xs font-black capitalize transition-all whitespace-nowrap ${
                filter === f ? 'bg-white text-[#d94e6d] shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNeighbors.map((neighbor) => (
          <div key={neighbor.id} className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#4c6fa1]/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            {neighbor.contactStatus === 'missing' && (
                <div className="absolute top-0 right-0 bg-amber-100 text-amber-700 text-[9px] font-black px-3 py-1.5 rounded-bl-2xl uppercase tracking-widest">
                    Contact Missing
                </div>
            )}
            
            <div className="flex justify-between items-start mb-6 mt-2">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg ${
                  neighbor.status === 'signed' ? 'bg-brand-gradient' :
                  neighbor.status === 'opposed' ? 'bg-slate-800' :
                  'bg-slate-200'
                }`}>
                  {neighbor.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-[#333333] text-lg leading-tight">{neighbor.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                     <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{neighbor.unit}</p>
                     {!neighbor.isResident && (
                         <span className="text-[9px] bg-[#4c6fa1] text-white px-1.5 py-0.5 rounded font-bold uppercase">Non-Resident</span>
                     )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4 pt-6 border-t border-slate-50">
              {neighbor.contactStatus === 'missing' ? (
                  <button className="flex-1 py-3 text-xs font-black text-white bg-amber-500 rounded-xl hover:bg-amber-600 transition-colors uppercase tracking-wider shadow-md shadow-amber-200">
                    Add Details
                  </button>
              ) : (
                  <button className="flex-1 py-3 text-xs font-black text-slate-500 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors uppercase tracking-wider">
                    Message
                  </button>
              )}
              
              {neighbor.status === 'pending' && neighbor.contactStatus !== 'missing' && (
                <button className="flex-1 py-3 text-xs font-black text-[#d94e6d] bg-[#d94e6d]/5 rounded-xl hover:bg-[#d94e6d]/10 transition-colors uppercase tracking-wider">
                  Remind
                </button>
              )}
            </div>
          </div>
        ))}
        
        {/* Add Neighbor Card */}
        <button className="border-4 border-dashed border-slate-100 rounded-[2rem] p-7 flex flex-col items-center justify-center gap-4 hover:border-[#75b0d3]/30 hover:bg-[#f8fbfe] transition-all group min-h-[180px]">
          <span className="text-4xl text-slate-300 group-hover:text-[#4c6fa1] transition-colors">+</span>
          <span className="text-xs font-black text-slate-400 group-hover:text-[#4c6fa1] uppercase tracking-widest transition-colors">Add Neighbor</span>
        </button>
      </div>

      <div className="bg-[#fdf8f9] rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10 border border-[#d94e6d]/10 relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#d94e6d]/5 rounded-full"></div>
        <div className="flex-1 relative z-10">
          <h4 className="text-2xl font-black text-[#333333] mb-3">Make the Case</h4>
          <p className="text-slate-600 text-base font-medium leading-relaxed max-w-2xl">Use our templates to communicate the benefits of Right to Manage and Commonhold to hesitant owners.</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="px-8 py-3.5 bg-[#4c6fa1] text-white font-black rounded-2xl text-sm shadow-xl shadow-[#4c6fa1]/20 hover:bg-[#3e5c8a] transition-all active:scale-95">
              Draft Letter
            </button>
            <button className="px-8 py-3.5 bg-white text-[#4c6fa1] font-black rounded-2xl text-sm border border-[#75b0d3]/30 hover:bg-slate-50 transition-all shadow-sm">
              View Benefits Guide
            </button>
          </div>
        </div>
        <div className="hidden lg:block w-48 text-9xl opacity-20 filter grayscale group-hover:grayscale-0 transition-all">📣</div>
      </div>
    </div>
  );
};
