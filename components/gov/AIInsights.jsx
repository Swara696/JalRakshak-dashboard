'use client'

import { useState, useEffect } from 'react'

export default function AIInsights({ insights = [] }) {
  const [isSimulating, setIsSimulating] = useState(false)
  const [analysisText, setAnalysisText] = useState("")
  const [activeTab, setActiveTab] = useState('analysis') // analysis | simulation | chat

  // Simulate AI "typing" or thinking
  useEffect(() => {
    if (insights.length > 0) {
      setAnalysisText("Analyzing historical water flow patterns... Cross-referencing with local health reports... Detecting anomalies in pH levels at Sector 7...")
    }
  }, [insights])

  const runSimulation = () => {
    setIsSimulating(true)
    setTimeout(() => setIsSimulating(false), 3000)
  }

  return (
    <div className="glass-card bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
      {/* Top Status Bar: Simulation Engine */}
      <div className="bg-slate-800/50 p-4 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`relative flex items-center justify-center`}>
             <span className={`absolute inline-flex h-3 w-3 rounded-full bg-cyan-500 opacity-75 ${isSimulating ? 'animate-ping' : ''}`}></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </div>
          <h2 className="text-sm font-mono tracking-widest uppercase text-cyan-400">JalRakshak Core v2.4</h2>
        </div>
        <button 
          onClick={runSimulation}
          className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-4 py-1.5 rounded-md border border-cyan-500/30 transition-all text-xs font-bold"
        >
          <span className={`${isSimulating ? 'animate-spin' : ''}`}>⚙️</span>
          {isSimulating ? "RUNNING SIMULATION..." : "START PREDICTIVE SIM"}
        </button>
      </div>

      <div className="p-6">
        {/* The "Chat Bot" Style Analysis Header */}
        <div className="mb-8 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-xl shadow-lg shadow-cyan-500/20 shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <div className="bg-slate-800/80 rounded-2xl rounded-tl-none p-4 text-slate-200 text-sm border border-slate-700 shadow-sm leading-relaxed">
              <p className="font-mono text-[10px] text-cyan-500 mb-1 opacity-70">SYSTEM_LOG // ANALYSIS_READY</p>
              {analysisText}
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-[10px] rounded border border-red-500/20">Critical: Flow Drop</span>
                <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 text-[10px] rounded border border-orange-500/20">Predictive: 72hr Contamination Risk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Cards */}
        <div className="grid grid-cols-1 gap-6">
          {insights.map((insight) => (
            <div key={insight.id} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              
              <div className="relative bg-slate-900 border border-slate-700 rounded-xl p-5">
                {/* Header with Village & Probability */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{insight.village}</h3>
                    <p className="text-slate-400 text-xs">Primary Risk Factor: <span className="text-red-400">Biological Contaminants</span></p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-mono font-bold text-cyan-400">{insight.confidence}%</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">ML Confidence</div>
                  </div>
                </div>

                {/* The "Prediction" Timeline */}
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-tighter text-slate-500 mb-3">72-Hour Predictive Forecast</h4>
                  <div className="flex justify-between items-center px-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex flex-col items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-orange-500' : 'bg-red-600 animate-pulse'}`}></div>
                        <span className="text-[9px] text-slate-400">+{step*24}h</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-1 w-full bg-slate-800 mt-[-18px] rounded-full">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 w-3/4 rounded-full"></div>
                  </div>
                </div>

                {/* Dynamic Factors */}
                <div className="space-y-3">
                  {insight.factors.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                      <div className="flex gap-3 items-center">
                         <span className="text-cyan-400 text-lg">⚡</span>
                         <span className="text-sm text-slate-300 font-medium">{f.factor}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-500">{f.impact.toUpperCase()} IMPACT</span>
                    </div>
                  ))}
                </div>

                {/* Bot CTA */}
                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-white text-slate-900 text-xs font-bold py-3 rounded-lg hover:bg-cyan-50 transition-colors uppercase tracking-wider">
                    Deploy Field Team
                  </button>
                  <button className="px-4 bg-slate-800 text-white rounded-lg border border-slate-700 hover:bg-slate-700">
                    💬
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}