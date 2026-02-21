'use client'

import { useState } from 'react'
import Header from '@/components/gov/Header'
import NagpurAreaSidebar from '@/components/gov/NagpurAreaSidebar'
import StatCard from '@/components/gov/StatCard'
import CollapsiblePanel from '@/components/gov/CollapsiblePanel'
import { mockVillages, mockHealthReports } from '@/lib/mockData'

export default function AreaMonitor() {
  const [selectedArea, setSelectedArea] = useState(null)
  const [villages] = useState(mockVillages)

  // Modal states
  const [showDetails, setShowDetails] = useState(false)
  const [showAdvisory, setShowAdvisory] = useState(false)
  const [showCleaning, setShowCleaning] = useState(false)
  const [showTicket, setShowTicket] = useState(false)

  // Form states
  const [advisoryMessage, setAdvisoryMessage] = useState('')
  const [cleaningVendor, setCleaningVendor] = useState('')
  const [ticketType, setTicketType] = useState('high-tds')
  const [ticketNotes, setTicketNotes] = useState('')

  // Notifications
  const [notifications, setNotifications] = useState([])

  const handleAreaSelect = (area) => {
    setSelectedArea(area)
  }

  const areaReports = selectedArea
    ? mockHealthReports.filter(
        (report) =>
          report.village.toLowerCase().includes(selectedArea.name.toLowerCase()) ||
          selectedArea.name.toLowerCase().includes(report.village.toLowerCase())
      )
    : []

  const addNotification = (message, type = 'success') => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)
  }

  const handleSendAdvisory = (e) => {
    e.preventDefault()
    if (!advisoryMessage.trim()) {
      addNotification('Please enter an advisory message', 'error')
      return
    }
    addNotification(`✓ Advisory sent to ${selectedArea.name}`)
    setAdvisoryMessage('')
    setShowAdvisory(false)
  }

  const handleRequestCleaning = (e) => {
    e.preventDefault()
    if (!cleaningVendor.trim()) {
      addNotification('Please select a vendor', 'error')
      return
    }
    addNotification(`✓ Cleaning request created for ${selectedArea.name}`)
    setCleaningVendor('')
    setShowCleaning(false)
  }

  const handleCreateTicket = (e) => {
    e.preventDefault()
    addNotification(`✓ Inspection ticket created for ${selectedArea.name}`)
    setTicketType('high-tds')
    setTicketNotes('')
    setShowTicket(false)
  }

  const vendors = ['AquaCare Services', 'PureWater Solutions', 'EcoClean Industries', 'WaterTech Services', 'SafeWater Maintenance']

  return (
    <div className="min-h-screen bg-[#0B1220]">
      <Header />
      <div className="flex">
        {/* Geographic Sidebar */}
        <NagpurAreaSidebar villages={villages} onAreaSelect={handleAreaSelect} />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Notifications */}
            <div className="fixed top-24 right-8 z-50 space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm ${
                    notif.type === 'success'
                      ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                      : 'bg-red-500/20 border border-red-500/50 text-red-300'
                  }`}
                >
                  {notif.message}
                </div>
              ))}
            </div>

            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold grad-text mb-2">Nagpur Area Analysis</h1>
              <p className="text-gray-400">Real-time monitoring and detailed area assessment</p>
            </div>

            {/* Selected Area Details */}
            {selectedArea ? (
              <>
                {/* Area Header */}
                <div className="glass-card mb-8 bg-gradient-to-r from-[#0B1220] to-[#121A2F]">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-cyan-400 mb-2">{selectedArea.name}</h2>
                      <p className="text-gray-400">
                        Population: {(selectedArea.population / 1000).toFixed(1)}K | Active Cases: {selectedArea.cases}
                      </p>
                    </div>
                    <div className={`text-5xl ${
                      selectedArea.risk < 40 ? 'text-risk-green' : 
                      selectedArea.risk < 70 ? 'text-risk-orange' : 
                      'text-risk-red'
                    }`}>
                      {selectedArea.risk}%
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#121A2F]/60 p-4 rounded-lg border border-cyan-500/20">
                      <p className="text-gray-500 text-sm mb-1">Risk Level</p>
                      <p className="text-2xl font-bold">
                        {selectedArea.risk < 40 ? '🟢 Low' : selectedArea.risk < 70 ? '🟡 Medium' : '🔴 Critical'}
                      </p>
                    </div>
                    <div className="bg-[#121A2F]/60 p-4 rounded-lg border border-red-500/20">
                      <p className="text-gray-500 text-sm mb-1">Cases Reported</p>
                      <p className="text-2xl font-bold text-red-400">{selectedArea.cases}</p>
                    </div>
                    <div className="bg-[#121A2F]/60 p-4 rounded-lg border border-blue-500/20">
                      <p className="text-gray-500 text-sm mb-1">pH Level</p>
                      <p className="text-2xl font-bold text-blue-400">{selectedArea.ph.toFixed(1)}</p>
                    </div>
                    <div className="bg-[#121A2F]/60 p-4 rounded-lg border border-cyan-500/20">
                      <p className="text-gray-500 text-sm mb-1">TDS Level</p>
                      <p className="text-2xl font-bold text-cyan-400">{selectedArea.tds} ppm</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <CollapsiblePanel
                  title="Quick Actions"
                  icon="⚡"
                  defaultOpen={true}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button 
                      onClick={() => setShowDetails(true)}
                      className="p-4 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/40 hover:to-blue-600/40 rounded-lg border border-cyan-500/30 transition-all text-left hover:shadow-lg hover:shadow-cyan-500/20">
                      <p className="font-bold text-cyan-400 mb-1">📊 View Details</p>
                      <p className="text-xs text-gray-400">Complete area assessment</p>
                    </button>
                    <button 
                      onClick={() => setShowAdvisory(true)}
                      className="p-4 bg-gradient-to-br from-orange-600/20 to-red-600/20 hover:from-orange-600/40 hover:to-red-600/40 rounded-lg border border-orange-500/30 transition-all text-left hover:shadow-lg hover:shadow-orange-500/20">
                      <p className="font-bold text-orange-400 mb-1">📢 Send Advisory</p>
                      <p className="text-xs text-gray-400">Alert residents</p>
                    </button>
                    <button 
                      onClick={() => setShowCleaning(true)}
                      className="p-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 hover:from-green-600/40 hover:to-emerald-600/40 rounded-lg border border-green-500/30 transition-all text-left hover:shadow-lg hover:shadow-green-500/20">
                      <p className="font-bold text-green-400 mb-1">🧹 Request Cleaning</p>
                      <p className="text-xs text-gray-400">Schedule tank cleaning</p>
                    </button>
                    <button 
                      onClick={() => setShowTicket(true)}
                      className="p-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 rounded-lg border border-purple-500/30 transition-all text-left hover:shadow-lg hover:shadow-purple-500/20">
                      <p className="font-bold text-purple-400 mb-1">🎫 Create Ticket</p>
                      <p className="text-xs text-gray-400">Assign inspection task</p>
                    </button>
                  </div>
                </CollapsiblePanel>

                {/* Water Quality Trend */}
                <CollapsiblePanel
                  title="Water Quality Status"
                  icon="💧"
                  defaultOpen={true}
                  className="mt-6"
                >
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">pH Level (Safe: 6.5-8.5)</span>
                        <span className="font-bold text-blue-400">{selectedArea.ph.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-[#121A2F]/60 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full"
                          style={{ width: `${(selectedArea.ph / 10) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">TDS Level (Safe: &lt;500 ppm)</span>
                        <span className="font-bold text-cyan-400">{selectedArea.tds} ppm</span>
                      </div>
                      <div className="w-full bg-[#121A2F]/60 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            selectedArea.tds < 500
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                              : selectedArea.tds < 700
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                              : 'bg-gradient-to-r from-orange-500 to-red-500'
                          }`}
                          style={{ width: `${Math.min((selectedArea.tds / 1000) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Disease Risk Level</span>
                        <span className="font-bold text-orange-400">{selectedArea.risk}%</span>
                      </div>
                      <div className="w-full bg-[#121A2F]/60 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            selectedArea.risk < 40
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                              : selectedArea.risk < 70
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                              : 'bg-gradient-to-r from-orange-500 to-red-500'
                          }`}
                          style={{ width: `${selectedArea.risk}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CollapsiblePanel>

                {/* Health Reports */}
                {areaReports.length > 0 && (
                  <CollapsiblePanel
                    title={`Health Reports (${areaReports.length})`}
                    icon="🏥"
                    defaultOpen={true}
                    className="mt-6"
                  >
                    <div className="space-y-3">
                      {areaReports.map((report) => (
                        <div
                          key={report.id}
                          className={`p-4 rounded-lg border-l-4 ${
                            report.severity === 'high'
                              ? 'bg-red-500/10 border-l-red-500'
                              : report.severity === 'medium'
                              ? 'bg-orange-500/10 border-l-orange-500'
                              : 'bg-blue-500/10 border-l-blue-500'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-white">{report.reporter}</p>
                              <p className="text-sm text-gray-400">{report.symptoms.join(', ')}</p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                report.severity === 'high'
                                  ? 'bg-red-500/30 text-red-300'
                                  : report.severity === 'medium'
                                  ? 'bg-orange-500/30 text-orange-300'
                                  : 'bg-blue-500/30 text-blue-300'
                              }`}
                            >
                              {report.severity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsiblePanel>
                )}
              </>
            ) : (
              <div className="glass-card text-center py-12">
                <span className="text-6xl mb-4 block">🗺️</span>
                <h3 className="text-2xl font-bold text-gray-400 mb-2">Select an Area</h3>
                <p className="text-gray-500">Click on an area in the sidebar to view detailed monitoring data</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* MODALS */}

      {/* Details Modal */}
      {showDetails && selectedArea && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#0B1220] to-[#121A2F] rounded-lg border border-cyan-500/30 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-b from-[#0B1220] to-transparent p-6 border-b border-cyan-500/20 flex items-center justify-between">
              <h3 className="text-2xl font-bold grad-text">📊 Details - {selectedArea.name}</h3>
              <button onClick={() => setShowDetails(false)} className="text-2xl hover:text-cyan-400 transition-colors">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#121A2F]/60 p-4 rounded-lg border border-cyan-500/20">
                  <p className="text-gray-500 text-sm mb-2">Population</p>
                  <p className="text-2xl font-bold text-cyan-400">{selectedArea.population.toLocaleString()}</p>
                </div>
                <div className="bg-[#121A2F]/60 p-4 rounded-lg border border-red-500/20">
                  <p className="text-gray-500 text-sm mb-2">Active Cases</p>
                  <p className="text-2xl font-bold text-red-400">{selectedArea.cases}</p>
                </div>
                <div className="bg-[#121A2F]/60 p-4 rounded-lg border border-orange-500/20">
                  <p className="text-gray-500 text-sm mb-2">Complaints</p>
                  <p className="text-2xl font-bold text-orange-400">{selectedArea.complaints}</p>
                </div>
                <div className="bg-[#121A2F]/60 p-4 rounded-lg border border-blue-500/20">
                  <p className="text-gray-500 text-sm mb-2">pH Level</p>
                  <p className="text-2xl font-bold text-blue-400">{selectedArea.ph.toFixed(1)}</p>
                </div>
                <div className="bg-[#121A2F]/60 p-4 rounded-lg border border-cyan-500/20">
                  <p className="text-gray-500 text-sm mb-2">TDS Level</p>
                  <p className="text-2xl font-bold text-cyan-400">{selectedArea.tds} ppm</p>
                </div>
                <div className={`bg-[#121A2F]/60 p-4 rounded-lg border ${selectedArea.risk < 40 ? 'border-green-500/20' : selectedArea.risk < 70 ? 'border-orange-500/20' : 'border-red-500/20'}`}>
                  <p className="text-gray-500 text-sm mb-2">Risk Level</p>
                  <p className={`text-2xl font-bold ${selectedArea.risk < 40 ? 'text-green-400' : selectedArea.risk < 70 ? 'text-orange-400' : 'text-red-400'}`}>{selectedArea.risk}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advisory Modal */}
      {showAdvisory && selectedArea && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#0B1220] to-[#121A2F] rounded-lg border border-orange-500/30 max-w-2xl w-full">
            <div className="bg-gradient-to-b from-[#0B1220] to-transparent p-6 border-b border-orange-500/20 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-orange-400">📢 Send Advisory</h3>
              <button onClick={() => setShowAdvisory(false)} className="text-2xl hover:text-orange-400 transition-colors">✕</button>
            </div>
            <form onSubmit={handleSendAdvisory} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Area: {selectedArea.name}</label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Advisory Message</label>
                <textarea
                  value={advisoryMessage}
                  onChange={(e) => setAdvisoryMessage(e.target.value)}
                  placeholder="Enter health advisory message..."
                  rows="4"
                  className="w-full bg-[#121A2F] border border-orange-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/60"
                />
                <p className="text-xs text-gray-500 mt-1">{advisoryMessage.length} characters</p>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowAdvisory(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-600/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-lg hover:shadow-orange-500/30 text-white rounded-lg transition-all font-semibold"
                >
                  Send Advisory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cleaning Request Modal */}
      {showCleaning && selectedArea && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#0B1220] to-[#121A2F] rounded-lg border border-green-500/30 max-w-2xl w-full">
            <div className="bg-gradient-to-b from-[#0B1220] to-transparent p-6 border-b border-green-500/20 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-green-400">🧹 Request Tank Cleaning</h3>
              <button onClick={() => setShowCleaning(false)} className="text-2xl hover:text-green-400 transition-colors">✕</button>
            </div>
            <form onSubmit={handleRequestCleaning} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Area: {selectedArea.name}</label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Select Cleaning Vendor</label>
                <select
                  value={cleaningVendor}
                  onChange={(e) => setCleaningVendor(e.target.value)}
                  className="w-full bg-[#121A2F] border border-green-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500/60"
                >
                  <option value="">Choose vendor...</option>
                  {vendors.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowCleaning(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-600/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg hover:shadow-green-500/30 text-white rounded-lg transition-all font-semibold"
                >
                  Request Cleaning
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Ticket Modal */}
      {showTicket && selectedArea && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#0B1220] to-[#121A2F] rounded-lg border border-purple-500/30 max-w-2xl w-full">
            <div className="bg-gradient-to-b from-[#0B1220] to-transparent p-6 border-b border-purple-500/20 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-purple-400">🎫 Create Inspection Ticket</h3>
              <button onClick={() => setShowTicket(false)} className="text-2xl hover:text-purple-400 transition-colors">✕</button>
            </div>
            <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Area: {selectedArea.name}</label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Issue Type</label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value)}
                  className="w-full bg-[#121A2F] border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500/60"
                >
                  <option value="high-tds">⚠️ High TDS Reading ({selectedArea.tds} ppm)</option>
                  <option value="ph-imbalance">🔬 pH Imbalance ({selectedArea.ph})</option>
                  <option value="disease-outbreak">🚨 Disease Outbreak ({selectedArea.cases} cases)</option>
                  <option value="contamination">☠️ Tank Contamination</option>
                  <option value="quality-check">📋 Regular Quality Check</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Internal Notes</label>
                <textarea
                  value={ticketNotes}
                  onChange={(e) => setTicketNotes(e.target.value)}
                  placeholder="Add notes for inspection officer..."
                  rows="3"
                  className="w-full bg-[#121A2F] border border-purple-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowTicket(false)}
                  className="px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:bg-gray-600/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/30 text-white rounded-lg transition-all font-semibold"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
