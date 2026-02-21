'use client'

import { formatTime } from '@/lib/mockData'

export default function PublicHealthFeed({ reports = [] }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'border-l-4 border-risk-red bg-risk-red/10'
      case 'medium':
        return 'border-l-4 border-risk-orange bg-risk-orange/10'
      case 'low':
        return 'border-l-4 border-risk-green bg-risk-green/10'
      default:
        return 'border-l-4 border-gray-600 bg-gray-600/10'
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'high':
        return '🔴 High'
      case 'medium':
        return '🟠 Medium'
      case 'low':
        return '🟢 Low'
      default:
        return '⚪ Unknown'
    }
  }

  return (
    <div className="glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold grad-text mb-1">Public Health Feed</h2>
        <p className="text-gray-400 text-sm">Live citizen reports & complaints</p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No reports available</p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              className={`p-4 rounded-lg glass-effect transition-all hover:bg-dark-border/50 ${getSeverityColor(report.severity)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white">{report.reporter}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-dark-border text-gray-300">
                      {report.village}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{formatTime(report.timestamp)}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  report.severity === 'high' ? 'bg-risk-red/30 text-risk-red' :
                  report.severity === 'medium' ? 'bg-risk-orange/30 text-risk-orange' :
                  'bg-risk-green/30 text-risk-green'
                }`}>
                  {getSeverityBadge(report.severity)}
                </span>
              </div>

              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-200 mb-2">Symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {report.symptoms.map((symptom, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-800"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className={`text-xs px-3 py-1 rounded transition-colors ${
                    report.status === 'reviewed'
                      ? 'bg-risk-green/30 text-risk-green'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                  }`}
                >
                  {report.status === 'reviewed' ? '✓ Reviewed' : 'Review'}
                </button>
                <button className="text-xs px-3 py-1 rounded bg-risk-red/20 hover:bg-risk-red/30 text-risk-red transition-colors">
                  Escalate
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
