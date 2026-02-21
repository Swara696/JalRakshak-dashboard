'use client'

import { useState } from 'react'
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
    setTimeout(() => setIsSimulating(false), 2000)
  }

  const heatmapContent = (
    <>
      {/* Legend */}
      <div className="flex gap-4 mb-6 pb-4 border-b border-cyan-500/20 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-risk-green rounded" />
          <span className="text-sm text-gray-400">Low (&lt;40%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-risk-orange rounded" />
          <span className="text-sm text-gray-400">Medium (40-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-risk-red rounded" />
          <span className="text-sm text-gray-400">High (&gt;70%)</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {villages.map((village) => {
          const riskInfo = getRiskLevel(village.risk)
          const colorMap = {
            'risk-green': 'bg-risk-green/80 hover:bg-risk-green',
            'risk-orange': 'bg-risk-orange/80 hover:bg-risk-orange',
            'risk-red': 'bg-risk-red/80 hover:bg-risk-red',
          }

          return (
            <button
              key={village.id}
              onClick={() => setSelectedVillage(village)}
              className={`
                cursor-pointer p-2 rounded-lg transition-all duration-300 text-black text-center
                ${selectedVillage?.id === village.id ? 'ring-2 ring-cyan-400 scale-110' : ''}
                ${colorMap[riskInfo.color]} shadow-lg hover:shadow-xl
              `}
            >
              <p className="text-xs font-bold truncate">{village.name}</p>
              <p className="text-lg font-bold">{village.risk}%</p>
            </button>
          )
        })}
      </div>

      {/* Selected Village Details */}
      {selectedVillage && (
        <div className="mt-6 p-4 bg-gradient-to-br from-[#0B1220] to-[#121A2F] rounded-lg border border-cyan-500/30">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400">{selectedVillage.name}</h3>
              <p className="text-sm text-gray-400">Risk Level: {getRiskLevel(selectedVillage.risk).level.toUpperCase()}</p>
            </div>
            <button
              onClick={() => setSelectedVillage(null)}
              className="text-gray-400 hover:text-cyan-400 transition-colors text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-[#121A2F]/50 p-3 rounded-lg border border-cyan-500/20">
              <p className="text-gray-500 text-xs mb-1">Risk Score</p>
              <p className="text-2xl font-bold text-cyan-400">{selectedVillage.risk}%</p>
            </div>
            <div className="bg-[#121A2F]/50 p-3 rounded-lg border border-cyan-500/20">
              <p className="text-gray-500 text-xs mb-1">Active Cases</p>
              <p className="text-2xl font-bold text-red-400">{selectedVillage.cases}</p>
            </div>
            <div className="bg-[#121A2F]/50 p-3 rounded-lg border border-cyan-500/20">
              <p className="text-gray-500 text-xs mb-1">pH Level</p>
              <p className="text-2xl font-bold text-blue-400">{selectedVillage.ph.toFixed(1)}</p>
            </div>
            <div className="bg-[#121A2F]/50 p-3 rounded-lg border border-cyan-500/20">
              <p className="text-gray-500 text-xs mb-1">Population</p>
              <p className="text-2xl font-bold text-green-400">{(selectedVillage.population / 1000).toFixed(1)}K</p>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 text-white py-2 rounded-lg transition-all font-semibold">
            View Full Details →
          </button>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* Regular card view */}
      {!isFullScreen && (
        <div className="glass-card">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold grad-text mb-1">Risk Heatmap</h2>
              <p className="text-gray-400 text-sm">Village risk assessment grid</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsFullScreen(true)}
                className="px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-lg transition-all font-semibold border border-cyan-500/30"
              >
                ⛶ Full Screen
              </button>
              <button
                onClick={handleSimulateOutbreak}
                disabled={isSimulating}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all font-semibold text-white disabled:opacity-50"
              >
                {isSimulating ? '🚀 Simulating...' : '🚨 Outbreak'}
              </button>
            </div>
          </div>
          {heatmapContent}
        </div>
      )}

      {/* Full-screen overlay */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50">
          <div className="max-w-6xl mx-auto h-full flex flex-col p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold grad-text">Risk Heatmap - Full Screen</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleSimulateOutbreak}
                  disabled={isSimulating}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all font-semibold text-white disabled:opacity-50"
                >
                  {isSimulating ? '🚀 Simulating...' : '🚨 Simulate Outbreak'}
                </button>
                <button
                  onClick={() => setIsFullScreen(false)}
                  className="px-4 py-3 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-lg transition-all font-semibold border border-cyan-500/30"
                >
                  ✕ Exit
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0B1220] to-[#121A2F] p-8 rounded-lg border border-cyan-500/20">
              {heatmapContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
