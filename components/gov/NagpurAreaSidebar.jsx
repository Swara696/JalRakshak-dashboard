'use client'

import { useState } from 'react'
import { getRiskLevel } from '@/lib/mockData'

export default function NagpurAreaSidebar({ villages = [], onAreaSelect }) {
  const [expandedArea, setExpandedArea] = useState(null)

  // Group villages by risk level
  const greenAreas = villages.filter((v) => v.risk < 40)
  const yellowAreas = villages.filter((v) => v.risk >= 40 && v.risk < 70)
  const redAreas = villages.filter((v) => v.risk >= 70)

  const RiskGroup = ({ title, areas, riskColor, icon }) => (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3 px-4 py-2 rounded-lg bg-[#121A2F]/50 border border-cyan-500/10">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-semibold text-gray-300">{title}</span>
        <span className="ml-auto text-xs bg-[#0B1220] px-2 py-1 rounded text-gray-400 font-bold">
          {areas.length}
        </span>
      </div>

      <div className="space-y-2 px-2">
        {areas.map((area) => (
          <button
            key={area.id}
            onClick={() => {
              setExpandedArea(expandedArea === area.id ? null : area.id)
              onAreaSelect?.(area)
            }}
            className={`
              w-full text-left p-3 rounded-lg transition-all duration-200
              ${
                expandedArea === area.id
                  ? 'bg-[#121A2F] border border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                  : `bg-${riskColor}/10 border border-${riskColor}/30 hover:bg-${riskColor}/20`
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full bg-${riskColor}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{area.name}</p>
                <p className="text-xs text-gray-400">{area.population.toLocaleString()} population</p>
              </div>
              <span className={`text-xs font-bold text-${riskColor}`}>{area.risk}%</span>
            </div>

            {/* Expanded details */}
            {expandedArea === area.id && (
              <div className="mt-3 pt-3 border-t border-gray-700/50 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#0B1220]/60 p-2 rounded">
                    <p className="text-gray-500 mb-1">Cases</p>
                    <p className="font-bold text-red-400">{area.cases}</p>
                  </div>
                  <div className="bg-[#0B1220]/60 p-2 rounded">
                    <p className="text-gray-500 mb-1">Complaints</p>
                    <p className="font-bold text-orange-400">{area.complaints}</p>
                  </div>
                  <div className="bg-[#0B1220]/60 p-2 rounded">
                    <p className="text-gray-500 mb-1">pH Level</p>
                    <p className="font-bold text-blue-400">{area.ph.toFixed(1)}</p>
                  </div>
                  <div className="bg-[#0B1220]/60 p-2 rounded">
                    <p className="text-gray-500 mb-1">TDS</p>
                    <p className="font-bold text-cyan-400">{area.tds}</p>
                  </div>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )

  const totalCases = villages.reduce((sum, v) => sum + v.cases, 0)
  const totalComplaints = villages.reduce((sum, v) => sum + v.complaints, 0)
  const avgRisk = (villages.reduce((sum, v) => sum + v.risk, 0) / villages.length).toFixed(1)

  return (
    <div className="w-80 bg-gradient-to-b from-[#0B1220] to-[#121A2F] border-r border-cyan-500/20 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#0B1220] to-[#121A2F]/80 backdrop-blur-sm border-b border-cyan-500/20 p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl">🗺️</span>
          <div>
            <h2 className="text-lg font-bold grad-text">Nagpur Region</h2>
            <p className="text-xs text-gray-400">Water Quality Monitor</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-[#121A2F]/60 p-2 rounded border border-cyan-500/10">
            <p className="text-xs text-gray-500 mb-1">Areas</p>
            <p className="text-lg font-bold text-cyan-400">{villages.length}</p>
          </div>
          <div className="bg-[#121A2F]/60 p-2 rounded border border-cyan-500/10">
            <p className="text-xs text-gray-500 mb-1">Cases</p>
            <p className="text-lg font-bold text-red-400">{totalCases}</p>
          </div>
          <div className="bg-[#121A2F]/60 p-2 rounded border border-cyan-500/10">
            <p className="text-xs text-gray-500 mb-1">Avg Risk</p>
            <p className="text-lg font-bold text-orange-400">{avgRisk}%</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Risk Level Distribution Bar */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-400 mb-2">Risk Distribution</p>
          <div className="flex h-8 rounded-lg overflow-hidden shadow-lg">
            <div
              className="bg-risk-green flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${(greenAreas.length / villages.length) * 100}%` }}
            >
              {greenAreas.length > 0 && greenAreas.length}
            </div>
            <div
              className="bg-risk-orange flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${(yellowAreas.length / villages.length) * 100}%` }}
            >
              {yellowAreas.length > 0 && yellowAreas.length}
            </div>
            <div
              className="bg-risk-red flex items-center justify-center text-white text-xs font-bold"
              style={{ width: `${(redAreas.length / villages.length) * 100}%` }}
            >
              {redAreas.length > 0 && redAreas.length}
            </div>
          </div>
          <div className="flex gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-risk-green rounded-full" />
              <span className="text-gray-400">Low ({greenAreas.length})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-risk-orange rounded-full" />
              <span className="text-gray-400">Med ({yellowAreas.length})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-risk-red rounded-full" />
              <span className="text-gray-400">High ({redAreas.length})</span>
            </div>
          </div>
        </div>

        {/* Green Areas */}
        {greenAreas.length > 0 && <RiskGroup title="✓ Safe Areas" areas={greenAreas} riskColor="risk-green" icon="🟢" />}

        {/* Yellow Areas */}
        {yellowAreas.length > 0 && (
          <RiskGroup title="⚠ Moderate Risk" areas={yellowAreas} riskColor="risk-orange" icon="🟡" />
        )}

        {/* Red Areas */}
        {redAreas.length > 0 && (
          <RiskGroup title="🚨 Critical Areas" areas={redAreas} riskColor="risk-red" icon="🔴" />
        )}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-gradient-to-t from-[#0B1220] to-transparent p-4 border-t border-cyan-500/10">
        <button className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 text-white rounded-lg transition-all font-semibold text-sm">
          📊 Generate Report
        </button>
      </div>
    </div>
  )
}
