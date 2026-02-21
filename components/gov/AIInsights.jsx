'use client'

import { useState } from 'react'

export default function AIInsights({ insights = [] }) {
  const [expandedId, setExpandedId] = useState(null)

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-risk-red/20 text-risk-red border-l-4 border-risk-red'
      case 'medium':
        return 'bg-risk-orange/20 text-risk-orange border-l-4 border-risk-orange'
      case 'low':
        return 'bg-accent-blue/20 text-accent-blue border-l-4 border-accent-blue'
      default:
        return 'bg-gray-700/20 text-gray-300'
    }
  }

  const getConfidenceBadge = (confidence) => {
    if (confidence >= 85) return { color: 'risk-green', label: 'Very High' }
    if (confidence >= 70) return { color: 'risk-orange', label: 'High' }
    return { color: 'accent-blue', label: 'Moderate' }
  }

  return (
    <div className="glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold grad-text mb-1">AI Risk Analysis</h2>
        <p className="text-gray-400 text-sm">Machine learning insights into disease risk factors</p>
      </div>

      <div className="space-y-4">
        {insights.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No AI insights available yet</p>
            <p className="text-xs mt-2">Data will be analyzed as more reports come in</p>
          </div>
        ) : (
          insights.map((insight) => {
            const confidenceBadge = getConfidenceBadge(insight.confidence)
            const isExpanded = expandedId === insight.id

            return (
              <div
                key={insight.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  isExpanded
                    ? 'bg-dark-border/50 border-accent-cyan'
                    : 'bg-dark-border/20 border-dark-border hover:border-dark-border/80'
                }`}
                onClick={() => setExpandedId(isExpanded ? null : insight.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">🏘️ {insight.village}</h3>
                    <p className="text-sm text-gray-400">Risk Level Analysis</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-${confidenceBadge.color}/30 text-${confidenceBadge.color}`}>
                      🎯 {insight.confidence}% Confidence
                    </div>
                    <span className="text-gray-400">{isExpanded ? '△' : '▽'}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-dark-border rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-gradient-to-r from-accent-cyan to-blue-500 transition-all"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>

                {/* Factors List */}
                {isExpanded && (
                  <div className="space-y-3">
                    {insight.factors.map((factor, idx) => (
                      <div key={idx} className={`p-3 rounded transition-all ${getImpactColor(factor.impact)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-semibold">{factor.factor}</p>
                          <span className="text-xs px-2 py-1 rounded-full bg-dark-border/50 text-gray-300">
                            {factor.impact} impact
                          </span>
                        </div>
                        <p className="text-sm text-gray-200">{factor.description}</p>
                      </div>
                    ))}

                    {/* Recommendation */}
                    <div className="bg-accent-cyan/10 border border-accent-cyan/30 rounded p-3 mt-4">
                      <p className="text-sm text-accent-cyan">
                        <span className="font-bold">💡 Recommendation:</span> Immediate inspection and water quality testing required. Issue high-priority cleanup tickets and public health advisory.
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-3 border-t border-dark-border/50">
                      <button className="flex-1 text-sm px-3 py-2 bg-risk-red/20 hover:bg-risk-red/30 text-risk-red rounded transition-colors font-semibold">
                        Create Inspection Ticket
                      </button>
                      <button className="flex-1 text-sm px-3 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue rounded transition-colors font-semibold">
                        Send Alert
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
