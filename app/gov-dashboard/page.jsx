'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/gov/Header'
import Sidebar from '@/components/gov/Sidebar'
import StatCard from '@/components/gov/StatCard'
import RiskHeatmap from '@/components/gov/RiskHeatmap'
import PublicHealthFeed from '@/components/gov/PublicHealthFeed'
import TicketsTable from '@/components/gov/TicketsTable'
import ImageReviewPanel from '@/components/gov/ImageReviewPanel'
import HardwarePanel from '@/components/gov/HardwarePanel'
import CleaningRequests from '@/components/gov/CleaningRequests'
import AIInsights from '@/components/gov/AIInsights'
import AlertBroadcast from '@/components/gov/AlertBroadcast'
import ActionPanel from '@/components/gov/ActionPanel'
import CollapsiblePanel from '@/components/gov/CollapsiblePanel'

import {
  mockKPIs,
  mockVillages,
  mockHealthReports,
  mockInspectionTickets,
  mockWaterImages,
  mockSensorData,
  mockCleaningRequests,
  mockAIInsights,
} from '@/lib/mockData'

export default function GovDashboard() {
  const router = useRouter()   // ✅ THIS WAS MISSING

  const [activeTab, setActiveTab] = useState('overview')
  const [kpis, setKpis] = useState(mockKPIs)
  const [villages, setVillages] = useState(mockVillages)
  const [healthReports, setHealthReports] = useState(mockHealthReports)

  const [tickets, setTickets] = useState([
    {
      ...mockInspectionTickets[0],
      applicantName: 'Ishika Burde',
    },
    ...mockInspectionTickets.slice(1),
  ])

  const [simulatingTickets, setSimulatingTickets] = useState(false)

  // ✅ HARD REDIRECT (WORKING)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const admin = localStorage.getItem('govAdmin')
    if (!admin) router.replace('/gov-login')
  }, [router])

  // ✅ Live Ticket Simulation
  useEffect(() => {
    if (!simulatingTickets) return

    const interval = setInterval(() => {
      const randomVillage =
        mockVillages[Math.floor(Math.random() * mockVillages.length)]

      const applicants = [
        'Ishika Burde',
        'Ravi Patil',
        'Sonal Deshmukh',
        'Amit Joshi',
        'Pooja Kulkarni',
        'Rahul Pawar',
      ]

      const newTicket = {
        id: `SIM-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
        applicantName: applicants[Math.floor(Math.random() * applicants.length)],
        village: randomVillage.name,
        issueType: ['Tank Contamination', 'Pipeline Leakage', 'High TDS', 'pH Imbalance'][Math.floor(Math.random() * 4)],
        priority: ['medium', 'high', 'critical'][Math.floor(Math.random() * 3)],
        status: 'pending',
        assignedOfficer: null,
        createdAt: new Date(),
        notes: 'Auto-generated ticket from sensor anomaly detection',
      }

      setTickets((prev) => [newTicket, ...prev])
    }, 3000)

    return () => clearInterval(interval)
  }, [simulatingTickets])

  const handleOutbreakSimulation = () => {
    const simulatedVillages = villages.map((v) =>
      [1, 2, 3].includes(v.id) ? { ...v, risk: 90 } : v
    )
    setVillages(simulatedVillages)
    setKpis((prev) => ({ ...prev, highRiskZones: 8 }))
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 ml-24 mr-8 py-8">
          <div className="max-w-[1400px] mx-auto">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-3xl font-light tracking-tight text-white">
                      Command <span className="font-bold text-cyan-400">Center</span>
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                      Real-time surveillance & emergency response
                    </p>
                  </div>

                  <button
                    onClick={() => setSimulatingTickets((s) => !s)}
                    className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
                      simulatingTickets
                        ? 'bg-red-500/10 text-red-400 border border-red-500/50'
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/50'
                    }`}
                  >
                    {simulatingTickets ? 'Stop Simulation' : 'Live Simulation'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard title="Villages Monitored" value={kpis.totalVillages} icon="🏘️" color="blue" trend={2} />
                  <StatCard title="Active Health Reports" value={kpis.activeReports} icon="📊" color="red" trend={12} />
                  <StatCard title="High-Risk Zones" value={kpis.highRiskZones} icon="⚠️" color="orange" trend={8} />
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-2xl">
                  <RiskHeatmap villages={villages} onOutbreakSimulate={handleOutbreakSimulation} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <CollapsiblePanel title="Health Feed" icon="📋" defaultOpen>
                    <PublicHealthFeed reports={healthReports} />
                  </CollapsiblePanel>

                  <CollapsiblePanel title="Government Actions" icon="⚡" defaultOpen>
                    <ActionPanel />
                  </CollapsiblePanel>
                </div>
              </div>
            )}

            {activeTab === 'tickets' && <TicketsTable tickets={tickets} />}

            {activeTab === 'hardware' && (
              <div className="grid gap-8">
                <HardwarePanel sensorData={mockSensorData} />
                <CleaningRequests requests={mockCleaningRequests} />
                <ImageReviewPanel images={mockWaterImages} />
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AlertBroadcast villages={villages} />
                <AIInsights insights={mockAIInsights} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}