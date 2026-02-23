'use client'

import Link from 'next/link'

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Risk Map', icon: '🗺️' },
    { id: 'tickets', label: 'Tickets', icon: '🎫' },
    { id: 'hardware', label: 'Hardware', icon: '📟' },
    { id: 'alerts', label: 'Alerts', icon: '🚨' },
  ]

  return (
    <aside className="fixed left-4 top-24 h-[calc(100vh-7rem)] w-20 glass-effect glow-border rounded-2xl flex flex-col items-center py-5 gap-4 z-30">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
            className={`
              relative group w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1
              transition-all duration-300
              ${isActive
                ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-500/40 scale-105'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-300'}
            `}
          >
            {/* Glow halo */}
            {isActive && (
              <span className="absolute inset-0 rounded-2xl bg-cyan-500/20 blur-lg -z-10" />
            )}

            <span className="text-2xl">{tab.icon}</span>
            <span className={`text-[10px] font-bold tracking-wide ${isActive ? 'text-cyan-300' : 'text-gray-400'}`}>
              {tab.label.split(' ')[0]}
            </span>

            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-1 rounded-full glass-effect text-xs text-cyan-300 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none">
              {tab.label}
            </div>
          </button>
        )
      })}

      {/* Area Monitor */}
      <Link
        href="/area-monitor"
        title="Area Monitor"
        className="relative group w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 bg-white/5 text-purple-300 hover:bg-purple-500/10 hover:text-purple-300 transition-all"
      >
        <span className="text-2xl">📍</span>
        <span className="text-[10px] font-bold tracking-wide">Areas</span>

        <div className="absolute left-full ml-3 px-3 py-1 rounded-full glass-effect text-xs text-purple-300 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none">
          Area Monitor
        </div>
      </Link>

      <div className="flex-1" />

      {/* Settings */}
      <button
        title="Settings"
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl text-gray-400 hover:text-cyan-300 hover:bg-white/10 transition-all"
      >
        ⚙️
      </button>
    </aside>
  )
}