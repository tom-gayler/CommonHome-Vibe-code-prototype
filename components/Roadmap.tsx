
import React from 'react';
import { RoadmapStep } from '../types';

const STEPS: RoadmapStep[] = [
  { id: 1, title: "Establish the Facts", description: "Identify the freeholder, managing agent, and collect info on current fees (service charges).", isCompleted: true, estimatedTime: "1 week", riskLevel: "Low" },
  { id: 2, title: "Build the Team", description: "Find contact details for all owners, specifically identifying non-resident investors.", isCompleted: false, estimatedTime: "2-3 weeks", riskLevel: "Medium" },
  { id: 3, title: "Make the Case", description: "Communicate benefits of Right to Manage/Commonhold to all owners to build consensus.", isCompleted: false, estimatedTime: "1 month", riskLevel: "Low" },
  { id: 4, title: "Get Commitment", description: "Secure formal agreement (signatures) from at least 50% of owners.", isCompleted: false, estimatedTime: "2-3 months", riskLevel: "High" },
  { id: 5, title: "Legal Process", description: "Serve formal notices to the freeholder and form the RTM/Commonhold company.", isCompleted: false, estimatedTime: "3-6 months", riskLevel: "Medium" },
];

export const Roadmap: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-brand-gradient text-white p-10 rounded-[2.5rem] shadow-2xl shadow-[#4c6fa1]/30 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-3">Project Roadmap</h3>
          <p className="text-white/80 max-w-lg font-medium leading-relaxed">A step-by-step guide to taking control of your building. From establishing the facts to serving the legal notices.</p>
        </div>
        <div className="absolute -right-8 -bottom-12 text-[12rem] opacity-10 select-none">🗺️</div>
      </div>

      <div className="space-y-6">
        {STEPS.map((step) => (
          <div 
            key={step.id} 
            className={`group bg-white p-8 rounded-3xl border transition-all duration-300 ${
              step.isCompleted 
                ? 'border-[#75b0d3]/20 bg-[#f8fbfe]' 
                : 'border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1'
            }`}
          >
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 shadow-sm ${
                step.isCompleted ? 'bg-brand-gradient text-white' : 'bg-slate-50 text-slate-300'
              }`}>
                {step.isCompleted ? '✓' : step.id}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h4 className={`font-black text-lg ${step.isCompleted ? 'text-[#4c6fa1]' : 'text-[#333333]'}`}>
                    {step.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase bg-slate-100 text-slate-500 tracking-wider">
                      {step.estimatedTime}
                    </span>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                      step.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                      step.riskLevel === 'Medium' ? 'bg-[#75b0d3]/20 text-[#4c6fa1]' :
                      'bg-[#d94e6d]/10 text-[#d94e6d]'
                    }`}>
                      {step.riskLevel} Risk
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.description}</p>
                
                {!step.isCompleted && (
                  <button className="mt-5 text-xs font-black text-[#d94e6d] hover:text-[#c03b57] flex items-center gap-2 group tracking-wider uppercase">
                    View Actions 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[#333333] text-white p-12 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-brand-gradient"></div>
        <h4 className="text-2xl font-black mb-3">Not sure about the legal process?</h4>
        <p className="text-white/60 text-sm mb-8 font-medium max-w-md mx-auto">Ask our AI advisor about "Right to Manage" requirements or how to find absent freeholders.</p>
        <button className="px-10 py-4 bg-[#4c6fa1] hover:bg-[#3e5c8a] text-white font-black rounded-2xl transition-all shadow-xl shadow-[#4c6fa1]/20 active:scale-95">
          Ask Common Home AI
        </button>
      </div>
    </div>
  );
};
