'use client'

import { useState } from 'react'

export default function AlertBroadcast({ villages = [] }) {
  const [isComposing, setIsComposing] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedVillages, setSelectedVillages] = useState([])
  const [alertSent, setAlertSent] = useState(false)
  const [sentAlerts, setSentAlerts] = useState([])

  const handleVillageSelect = (villageId) => {
    setSelectedVillages((prev) =>
      prev.includes(villageId) ? prev.filter((id) => id !== villageId) : [...prev, villageId]
    )
  }

  const handleSendAlert = async () => {
    if (!message.trim() || selectedVillages.length === 0) return

    const newAlert = {
      id: Date.now(),
      message,
      villages: selectedVillages.length,
      timestamp: new Date(),
      recipients: selectedVillages.length * 5000, // estimate
    }

    setSentAlerts((prev) => [newAlert, ...prev])
    setAlertSent(true)

    setTimeout(() => {
      setAlertSent(false)
      setMessage('')
      setSelectedVillages([])
      setIsComposing(false)
    }, 2000)
  }

  const handleSelectAll = () => {
    if (selectedVillages.length === villages.length) {
      setSelectedVillages([])
    } else {
      setSelectedVillages(villages.map((v) => v.id))
    }
  }

  return (
    <div className="glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold grad-text mb-1">Alert Broadcast System</h2>
        <p className="text-gray-400 text-sm">Send SMS & app notifications to target villages</p>
      </div>

      {/* Alert Composer */}
      <div className={`p-4 rounded-lg border transition-all ${
        isComposing ? 'bg-dark-border/50 border-accent-cyan' : 'bg-dark-border/20 border-dark-border'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Compose Public Health Alert</h3>
          {!isComposing && (
            <button
              onClick={() => setIsComposing(true)}
              className="text-sm px-3 py-1 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue rounded transition-colors font-semibold"
            >
              + New Alert
            </button>
          )}
        </div>

        {isComposing && (
          <div className="space-y-4">
            {/* Message Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Alert Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type alert message (SMS - keep under 160 chars recommended)..."
                className="w-full bg-dark-border border border-dark-border/80 rounded-lg px-4 py-3 text-white text-sm focus:border-accent-blue focus:outline-none transition-colors resize-none"
                rows={4}
                maxLength={500}
              />
              <p className={`text-xs mt-2 ${message.length > 160 ? 'text-risk-orange' : 'text-gray-500'}`}>
                {message.length}/500 characters
              </p>
            </div>

            {/* Village Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-300">Target Villages</label>
                <button
                  onClick={handleSelectAll}
                  className="text-xs px-2 py-1 bg-dark-border/50 hover:bg-dark-border text-gray-400 rounded transition-colors"
                >
                  {selectedVillages.length === villages.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-3 bg-dark-border/30 rounded-lg border border-dark-border/50">
                {villages.map((village) => (
                  <label key={village.id} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-dark-border/50 rounded transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedVillages.includes(village.id)}
                      onChange={() => handleVillageSelect(village.id)}
                      className="w-4 h-4 rounded border-gray-600 bg-dark-border cursor-pointer"
                    />
                    <span className="text-sm text-gray-300">{village.name}</span>
                  </label>
                ))}
              </div>

              {selectedVillages.length > 0 && (
                <p className="text-xs text-accent-cyan mt-2">
                  📤 {selectedVillages.length} village(s) selected • ~{selectedVillages.length * 5000} recipients
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3 border-t border-dark-border/50">
              <button
                onClick={handleSendAlert}
                disabled={!message.trim() || selectedVillages.length === 0 || alertSent}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-risk-red to-risk-orange hover:shadow-lg hover:shadow-red-500/20 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {alertSent ? '✓ Alert Sent!' : '📢 Broadcast Now'}
              </button>
              <button
                onClick={() => setIsComposing(false)}
                className="px-4 py-3 bg-dark-border hover:bg-dark-border/80 text-gray-300 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Alert History */}
      {sentAlerts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">📝 Broadcast History (Last 24h)</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {sentAlerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-dark-border/30 border border-dark-border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold text-white line-clamp-2">{alert.message}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-risk-green/30 text-risk-green">
                    ✓ Sent
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>📤 {alert.villages} villages</span>
                  <span>👥 ~{alert.recipients} recipients</span>
                  <span>{alert.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
