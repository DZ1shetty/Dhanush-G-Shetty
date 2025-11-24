import React from 'react';
import { GraduationCap, Building2, Calendar, Terminal } from 'lucide-react';

const JourneyCard = ({ item, index }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(8,7,31,0.3)]">
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-cyan-500 tracking-[0.3em]">LOG_0{index + 1}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Calendar className="w-3 h-3" />
          {item.date}
        </div>
      </div>
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3">
          {item.type === 'Education' ? (
            <GraduationCap className="w-10 h-10 text-cyan-400 p-2 rounded-full bg-cyan-500/10 border border-cyan-500/40" />
          ) : (
            <Building2 className="w-10 h-10 text-purple-400 p-2 rounded-full bg-purple-500/10 border border-purple-500/40" />
          )}
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-[0.3em]">{item.type}</p>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-purple-300">
          <Building2 className="w-4 h-4" />
          {item.institution}
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
};

const Journey = ({ data }) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-end mb-8 px-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/70 bg-cyan-900/10 px-4 py-2 rounded-full border border-cyan-500/20">
          <span>ACTIVE_LOGS: {data.length}</span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {data.map((item, index) => (
          <JourneyCard key={`${item.title}-${index}`} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Journey;
