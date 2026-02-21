'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Risk Map', icon: '🗺️' },
    { id: 'tickets', label: 'Tickets', icon: '🎫' },
    { id: 'hardware', label: 'Hardware', icon: '📟' },
    { id: 'alerts', label: 'Alerts', icon: '🚨' },
  ]

  return (
    <aside className="fixed left-0 top-16 h-screen w-20 bg-gradient-to-b from-[#0B1220] to-[#121A2F] border-r border-cyan-500/20 flex flex-col items-center py-6 gap-4 z-30">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            w-16 h-16 rounded-lg flex flex-col items-center justify-center gap-1
            transition-all duration-300 relative group
            ${
              activeTab === tab.id
                ? 'bg-gradient-to-br from-cyan-500/40 to-blue-500/40 border border-cyan-400/50 shadow-lg shadow-cyan-500/30'
                : 'bg-[#121A2F]/50 border border-transparent hover:border-cyan-500/30 hover:bg-[#121A2F]'
            }
          `}
          title={tab.label}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span className={`text-xs font-bold ${activeTab === tab.id ? 'text-cyan-400' : 'text-gray-400'}`}>
            {tab.label.split(' ')[0]}
          </span>

          {/* Tooltip on hover */}
          <div className="absolute left-full ml-2 px-3 py-1 bg-[#121A2F] border border-cyan-500/50 rounded text-xs text-cyan-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {tab.label}
          </div>
        </button>
      ))}

      {/* Navigation Link to Area Monitor */}
      <Link
        href="/area-monitor"
        className="w-16 h-16 rounded-lg flex flex-col items-center justify-center gap-1 transition-all duration-300 relative group bg-[#121A2F]/50 border border-transparent hover:border-purple-500/30 hover:bg-[#121A2F]"
        title="Area Monitor"
      >
        <span className="text-2xl">📍</span>
        <span className="text-xs font-bold text-gray-400">Areas</span>

        {/* Tooltip on hover */}
        <div className="absolute left-full ml-2 px-3 py-1 bg-[#121A2F] border border-purple-500/50 rounded text-xs text-purple-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Area Monitor
        </div>
      </Link>

      {/* Bottom spacer */}
      <div className="flex-1" />

      {/* Settings button */}
      <button className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl hover:bg-[#121A2F]/80 border border-transparent hover:border-cyan-500/30 transition-all">
        ⚙️
      </button>
    </aside>
  )
}
