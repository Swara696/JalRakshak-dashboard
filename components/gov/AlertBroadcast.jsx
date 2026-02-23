'use client'

import { useState, useEffect } from 'react'

export default function AlertBroadcast({ villages = [] }) {
  const [isComposing, setIsComposing] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedVillages, setSelectedVillages] = useState([])
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [sentAlerts, setSentAlerts] = useState([])

  const handleVillageSelect = (villageId) => {
    setSelectedVillages((prev) =>
      prev.includes(villageId) ? prev.filter((id) => id !== villageId) : [...prev, villageId]
    )
  }

  const handleSendAlert = async () => {
    if (!message.trim() || selectedVillages.length === 0) return

    setIsBroadcasting(true)

    // Artificial "Transmission" delay for coolness
    setTimeout(() => {
      const newAlert = {
        id: Date.now(),
        message,
        villages: selectedVillages.length,
        timestamp: new Date(),
        recipients: selectedVillages.length * 5000,
      }

      setSentAlerts((prev) => [newAlert, ...prev])
      setIsBroadcasting(false)
      setMessage('')
      setSelectedVillages([])
      setIsComposing(false)
    }, 2500)
  }

  const handleSelectAll = () => {
    if (selectedVillages.length === villages.length) {
      setSelectedVillages([])
    } else {
      setSelectedVillages(villages.map((v) => v.id))
    }
  }

  return (
    <div className="relative overflow-hidden bg-slate-950 border border-slate-800 rounded-3xl p-1 shadow-2xl shadow-cyan-500/10">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 blur-[100px] pointer-events-none" />

      <div className="relative p-6">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <h2 className="text-xs font-mono tracking-[0.3em] text-slate-500 uppercase">Emergency Broadcast Hub</h2>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">JalRakshak <span className="text-cyan-400">Alerts</span></h1>
          </div>
          <button
            onClick={() => setIsComposing(!isComposing)}
            className={`px-6 py-2 rounded-full font-bold text-xs tracking-widest transition-all ${
              isComposing 
              ? 'bg-slate-800 text-slate-400 border border-slate-700' 
              : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
            }`}
          >
            {isComposing ? 'CLOSE TERMINAL' : 'INITIALIZE BROADCAST'}
          </button>
        </div>

        {isComposing ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* The Terminal-Style Message Box */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-10 group-focus-within:opacity-25 transition" />
              <div className="relative bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-800/30">
                  <span className="text-[10px] font-mono text-slate-500">MESSAGE_PAYLOAD // UTF-8</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                  </div>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter emergency instructions for citizens..."
                  className="w-full bg-transparent p-4 text-cyan-50 text-sm focus:outline-none min-h-[120px] placeholder:text-slate-600"
                />
                <div className="px-4 py-2 flex justify-between items-center bg-slate-800/20">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`h-1 w-4 rounded-full ${message.length > (i+1)*32 ? 'bg-cyan-400' : 'bg-slate-700'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{message.length}/500</span>
                </div>
              </div>
            </div>

            {/* Target Villages - Neon Grid */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-[10px] font-mono tracking-widest text-slate-500 uppercase italic">Target Deployment Sectors</h3>
                <button onClick={handleSelectAll} className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold">
                  {selectedVillages.length === villages.length ? 'PURGE SELECTION' : 'MAP ALL SECTORS'}
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {villages.map((village) => {
                  const isSelected = selectedVillages.includes(village.id);
                  return (
                    <div 
                      key={village.id}
                      onClick={() => handleVillageSelect(village.id)}
                      className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected 
                        ? 'bg-cyan-500/10 border-cyan-500 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]' 
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span className={`text-xs font-medium ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`}>
                        {village.name}
                      </span>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Send Button Sequence */}
            <button
              onClick={handleSendAlert}
              disabled={!message.trim() || selectedVillages.length === 0 || isBroadcasting}
              className={`w-full relative overflow-hidden group py-4 rounded-2xl font-black tracking-[0.2em] transition-all ${
                isBroadcasting ? 'bg-slate-800' : 'bg-red-500 hover:bg-red-600 active:scale-[0.98]'
              }`}
            >
              {isBroadcasting ? (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-cyan-400 text-[10px] animate-pulse">TRANSMITTING OVER SECURE CHANNEL...</span>
                  <div className="h-1 w-48 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 animate-[progress_2s_ease-in-out]" style={{ width: '100%' }} />
                  </div>
                </div>
              ) : (
                <span className="text-white flex items-center justify-center gap-3">
                  <span className="text-xl">📡</span> EXECUTE BROADCAST
                </span>
              )}
            </button>
          </div>
        ) : (
          /* History View / Dashboard Empty State */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 tracking-widest uppercase border-b border-slate-800 pb-2">
              <span>Transmission Logs</span>
              <span>24H Activity</span>
            </div>
            
            {sentAlerts.length === 0 ? (
              <div className="py-20 flex flex-col items-center opacity-20">
                <span className="text-5xl mb-4">📡</span>
                <p className="text-xs font-mono">STANDBY: NO ACTIVE BROADCASTS</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {sentAlerts.map((alert) => (
                  <div key={alert.id} className="group relative bg-slate-900/50 border border-slate-800 p-4 rounded-2xl hover:border-slate-600 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-slate-200 font-medium leading-relaxed pr-8">{alert.message}</p>
                      <span className="text-[10px] text-slate-500 font-mono">{alert.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <div className="flex gap-4 items-center mt-4 pt-4 border-t border-slate-800/50">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span className="text-[10px] text-slate-400">{alert.villages} Sectors</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-purple-400" />
                        <span className="text-[10px] text-slate-400">~{(alert.recipients / 1000).toFixed(1)}k Reach</span>
                      </div>
                      <div className="ml-auto flex gap-1">
                         <div className="w-1 h-3 bg-cyan-500/20 rounded-full" />
                         <div className="w-1 h-3 bg-cyan-500/40 rounded-full" />
                         <div className="w-1 h-3 bg-cyan-500/60 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
      `}</style>
    </div>
  )
}