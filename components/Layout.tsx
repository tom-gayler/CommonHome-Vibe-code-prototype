
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  buildingName: string;
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Logo = ({ size = "md", isDark = false }: { size?: "sm" | "md" | "lg", isDark?: boolean }) => {
  const dimensions = size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : "w-16 h-16";
  const textColor = isDark ? "text-white" : "text-[#333333]";
  
  return (
    <div className="flex items-center gap-3">
      <div className={`${dimensions} relative shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="houseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#75b0d3" />
              <stop offset="50%" stopColor="#4c6fa1" />
              <stop offset="100%" stopColor="#d94e6d" />
            </linearGradient>
          </defs>
          <path d="M50 12 L18 44 V85 H82 V44 L50 12Z" fill="url(#houseGrad)" />
        </svg>
      </div>
      <div className={`flex flex-col leading-[1.1] ${textColor}`}>
        <span className={`font-bold tracking-tight ${size === "sm" ? "text-lg" : "text-2xl"}`}>
          Common
        </span>
        <span className={`font-bold tracking-tight ${size === "sm" ? "text-lg" : "text-2xl"}`}>
          Home
        </span>
      </div>
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, buildingName, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'roadmap', label: 'Process Guide', icon: '🗺️' },
    { id: 'community', label: 'Community Hub', icon: '🤝' },
    { id: 'advisor', label: 'Legal Advisor', icon: '🤖' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fcfdfe]">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 bg-[#ffffff] border-r border-slate-100 flex-col p-8 sticky top-0 h-screen">
        <div className="mb-14">
          <Logo />
          <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-[0.2em] opacity-80">Empowering Communities</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-[#4c6fa1] text-white shadow-lg shadow-[#4c6fa1]/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span className={`text-xl ${activeTab === tab.id ? 'brightness-200' : ''}`}>{tab.icon}</span>
              <span className="font-semibold text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-50">
          <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center font-bold text-white text-xs shadow-sm">AT</div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#333333] truncate">Alex Thompson</p>
              <p className="text-[10px] text-slate-500 font-medium">Flat 1 • Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Header - Mobile */}
      <header className="md:hidden bg-white border-b border-slate-100 p-4 sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <Logo size="sm" />
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2.5 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-[#4c6fa1] text-white shadow-md' 
                  : 'text-slate-400'
              }`}
            >
              {tab.icon}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-14 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="animate-in fade-in slide-in-from-left duration-500">
            <div className="flex items-center gap-2 text-[#d94e6d] font-bold text-[11px] uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d94e6d] animate-pulse"></span>
              In Progress
            </div>
            <h2 className="text-4xl font-extrabold text-[#333333] tracking-tight mb-1">{buildingName}</h2>
            <p className="text-slate-500 font-medium text-lg">Commonhold Conversion Portal</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0">
              Invite Neighbor
            </button>
            <button className="px-6 py-3 text-sm font-bold text-white bg-[#4c6fa1] hover:bg-[#3e5c8a] rounded-2xl shadow-xl shadow-[#4c6fa1]/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Sign Petition
            </button>
          </div>
        </header>
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
};
