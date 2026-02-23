'use client'

import { useState, useEffect } from 'react'
import { getRiskLevel } from '@/lib/mockData'

export default function RiskHeatmap({ villages = [], onOutbreakSimulate }) {
  const [selectedVillage, setSelectedVillage] = useState(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)

  const handleSimulateOutbreak = async () => {
    setIsSimulating(true)
    if (onOutbreakSimulate) {
      await onOutbreakSimulate()
    }
    setTimeout(() => setIsSimulating(false), 3000)
  }

  const heatmapContent = (
    <div className="relative">
      {/* Simulation Overlay Effect */}
      {isSimulating && (
        <div className="absolute inset-0 z-10 pointer-events-none border-2 border-rose-500/50 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-rose-500/5 animate-pulse" />
          <div className="h-1 w-full bg-rose-500/40 absolute top-0 animate-[scan_2s_linear_infinite]" />
        </div>
      )}

      {/* Legend - Tactical Monochromatic */}
      <div className="flex gap-6 mb-8 pb-4 border-b border-white/5 items-center">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Risk Spectrum:</span>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Optimal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.4)]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Elevated</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Critical</span>
          </div>
        </div>
      </div>

      {/* Advanced Cellular Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {villages.map((village) => {
          const isCritical = village.risk > 70;
          const isModerate = village.risk > 40 && village.risk <= 70;

          return (
            <button
              key={village.id}
              onClick={() => setSelectedVillage(village)}
              className={`
                relative group p-4 rounded-lg transition-all duration-500
                border flex flex-col items-center justify-center min-h-[110px]
                ${selectedVillage?.id === village.id 
                  ? 'ring-2 ring-cyan-400 ring-offset-4 ring-offset-[#060B1A] scale-110 z-20 shadow-[0_0_30px_rgba(34,211,238,0.3)]' 
                  : 'hover:scale-105'
                }
                
                ${isCritical 
                  ? 'bg-rose-500/10 border-rose-500/40 text-rose-400' 
                  : isModerate
                  ? 'bg-sky-500/10 border-sky-500/40 text-sky-400'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500'
                }
              `}
            >
              {/* Tactical Corner Brackets */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-inherit opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-inherit opacity-40 group-hover:opacity-100 transition-opacity" />

              {/* The Risk Core Glow */}
              <div className={`
                absolute w-12 h-12 rounded-full blur-xl transition-opacity duration-700
                ${isCritical ? 'bg-rose-500/20 opacity-100' : isModerate ? 'bg-sky-500/15 opacity-100' : 'opacity-0'}
              `} />

              {/* Village Metadata */}
              <span className="relative text-[9px] font-mono opacity-50 mb-1 tracking-widest uppercase">
                Sect_{village.id}
              </span>
              
              <span className="relative text-[10px] font-bold truncate mb-2 max-w-full">
                {village.name}
              </span>

              <div className="relative flex items-baseline gap-1">
                <span className={`text-2xl font-black font-mono tracking-tighter ${isCritical ? 'text-rose-400' : isModerate ? 'text-sky-400' : 'text-slate-400'}`}>
                  {village.risk}
                </span>
                <span className="text-[10px] opacity-40">%</span>
              </div>

              {/* Critical Alert Ping */}
              {isCritical && (
                <div className="absolute top-2 right-2 flex gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-rose-500 animate-ping" />
                  <span className="w-1 h-1 rounded-full bg-rose-500/50" />
                </div>
              )}

              {/* Bottom activity indicator */}
              <div className="absolute bottom-2 left-3 right-3 h-[1px] bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-current transition-all duration-1000" 
                  style={{ width: `${village.risk}%` }} 
                />
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected Village Details Panel */}
      {selectedVillage && (
        <div className="mt-8 relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-900/60 backdrop-blur-xl p-6 animate-in fade-in slide-in-from-top-4">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                <p className="text-[10px] font-mono text-cyan-500 tracking-[0.2em] uppercase">Sector Deep Scan Active</p>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">{selectedVillage.name}</h3>
            </div>
            <button
              onClick={() => setSelectedVillage(null)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 transition-all border border-white/5"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Risk Probability', val: `${selectedVillage.risk}%`, color: 'text-cyan-400', sub: 'Predictive ML Score' },
              { label: 'Biosensor Count', val: selectedVillage.cases, color: 'text-rose-400', sub: 'Anomaly detections' },
              { label: 'Hydration pH', val: selectedVillage.ph.toFixed(1), color: 'text-sky-400', sub: 'Hardware telemetry' },
              { label: 'Coverage', val: `${(selectedVillage.population / 1000).toFixed(1)}k`, color: 'text-emerald-400', sub: 'Live connections' }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-800/30 border border-white/5 p-4 rounded-xl relative group overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-0.5 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-all" />
                <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">{stat.label}</p>
                <p className={`text-2xl font-black font-mono tracking-tighter ${stat.color}`}>{stat.val}</p>
                <p className="text-[9px] text-slate-600 mt-1 uppercase tracking-tighter">{stat.sub}</p>
              </div>
            ))}
          </div>

          <button className="w-full bg-white text-slate-950 hover:bg-cyan-400 transition-all font-black text-[11px] py-4 rounded-xl uppercase tracking-[0.3em] shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
            Open Full Diagnostic Terminal
          </button>
        </div>
      )}
    </div>
  )

  return (
    <>
      {!isFullScreen ? (
        <div className="glass-card bg-[#050810]/60 border-slate-800/50 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />
          
          <div className="relative flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-black text-white mb-1 tracking-tight">Geospatial Risk Matrix</h2>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Simulation Node // JalRakshak v4.0</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsFullScreen(true)}
                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg transition-all border border-slate-700 uppercase tracking-widest"
              >
                ⛶ Expand
              </button>
              <button
                onClick={handleSimulateOutbreak}
                disabled={isSimulating}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 rounded-lg text-white text-[10px] font-bold transition-all uppercase tracking-widest shadow-lg shadow-rose-900/20 disabled:opacity-50"
              >
                {isSimulating ? 'Processing...' : '🚨 Trigger Outbreak'}
              </button>
            </div>
          </div>
          {heatmapContent}
        </div>
      ) : (
        /* Full Screen UI */
        <div className="fixed inset-0 bg-[#030712] z-50 flex flex-col p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
              <div>
                <h2 className="text-5xl font-black text-white tracking-tighter mb-2">RISK_HEATMAP</h2>
                <div className="flex items-center gap-4 text-cyan-500 font-mono text-[10px] tracking-widest uppercase">
                  <span className="animate-pulse flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    Live_Feed_Active
                  </span>
                  <span className="text-slate-700">|</span>
                  <span>Buffer: 0.4ms</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSimulateOutbreak}
                  className="px-8 py-4 bg-rose-600 rounded-xl font-black text-xs text-white uppercase tracking-[0.2em] hover:bg-rose-500 transition-colors"
                >
                   {isSimulating ? 'SIMULATION_ACTIVE' : 'TRIGGER_OUTBREAK'}
                </button>
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-black text-[10px] text-slate-400 hover:text-white hover:border-white/20 uppercase tracking-[0.2em] transition-all"
                >
                  Exit_Terminal
                </button>
              </div>
            </div>
            <div className="p-10 bg-slate-900/20 rounded-3xl border border-white/5 shadow-inner backdrop-blur-3xl">
               {heatmapContent}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          from { top: -10%; }
          to { top: 110%; }
        }
      `}</style>
    </>
  )
}