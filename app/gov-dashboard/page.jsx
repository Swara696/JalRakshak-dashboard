'use client'

import { useState } from 'react'
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
  const [activeTab, setActiveTab] = useState('overview')
  const [kpis, setKpis] = useState(mockKPIs)
  const [villages, setVillages] = useState(mockVillages)
  const [healthReports, setHealthReports] = useState(mockHealthReports)
  const [tickets, setTickets] = useState(mockInspectionTickets)
  const [images, setImages] = useState(mockWaterImages)
  const [sensorData, setSensorData] = useState(mockSensorData)
  const [cleaningRequests, setCleaningRequests] = useState(mockCleaningRequests)
  const [aiInsights, setAiInsights] = useState(mockAIInsights)
  const [simulating, setSimulating] = useState(false)

  // Simulate outbreak
  const handleOutbreakSimulation = async () => {
    setSimulating(true)
    const simulatedVillages = villages.map((v) => {
      if ([1, 2, 3, 7, 11].includes(v.id)) {
        return {
          ...v,
          risk: 85 + Math.random() * 14,
          cases: v.cases + Math.floor(Math.random() * 30),
          complaints: v.complaints + Math.floor(Math.random() * 15),
        }
      }
      return v
    })
    setVillages(simulatedVillages)

    const newReport = {
      id: `HR${Math.random().toString(36).substr(2, 9)}`,
      village: simulatedVillages[0].name,
      reporter: 'Alert System',
      symptoms: ['Diarrhea', 'Fever', 'Vomiting'],
      severity: 'high',
      timestamp: new Date(),
      status: 'new',
    }
    setHealthReports((prev) => [newReport, ...prev])

    setKpis((prev) => ({
      ...prev,
      activeReports: prev.activeReports + 15,
      highRiskZones: 8,
    }))

    const newTicket = {
      id: `TKT${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      village: 'Umred',
      issueType: '⚠️ Outbreak Detected',
      priority: 'critical',
      status: 'pending',
      assignedOfficer: null,
      createdAt: new Date(),
      notes: 'Rapid spike in disease reports detected',
    }
    setTickets((prev) => [newTicket, ...prev])

    setTimeout(() => {
      setSimulating(false)
    }, 2000)
  }

  // Render different sections based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* KPI Cards */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Command Center Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Villages Monitored"
                  value={kpis.totalVillages}
                  icon="🏘️"
                  color="blue"
                  trend={2}
                />
                <StatCard
                  title="Active Health Reports"
                  value={kpis.activeReports}
                  icon="📊"
                  color="red"
                  trend={12}
                />
                <StatCard
                  title="High-Risk Zones"
                  value={kpis.highRiskZones}
                  icon="⚠️"
                  color="orange"
                  trend={8}
                />
              </div>
            </section>

            {/* Risk Heatmap */}
            <section className="mb-8">
              <RiskHeatmap villages={villages} onOutbreakSimulate={handleOutbreakSimulation} />
            </section>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <CollapsiblePanel title="Health Feed" icon="📋" defaultOpen={true}>
                <PublicHealthFeed reports={healthReports} />
              </CollapsiblePanel>

              <CollapsiblePanel title="Government Actions" icon="⚡" defaultOpen={true}>
                <ActionPanel />
              </CollapsiblePanel>
            </div>
          </>
        )

      case 'tickets':
        return (
          <section className="mb-8">
            <TicketsTable tickets={tickets} />
          </section>
        )

      case 'hardware':
        return (
          <div className="space-y-8">
            <CollapsiblePanel title="Water Quality Sensors" icon="📟" defaultOpen={true}>
              <HardwarePanel sensorData={sensorData} />
            </CollapsiblePanel>

            <CollapsiblePanel title="Tank Cleaning Requests" icon="🧹" defaultOpen={true}>
              <CleaningRequests requests={cleaningRequests} />
            </CollapsiblePanel>

            <CollapsiblePanel title="Water Sample Review" icon="🔬" defaultOpen={true}>
              <ImageReviewPanel images={images} />
            </CollapsiblePanel>
          </div>
        )

      case 'alerts':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CollapsiblePanel title="Send Alert Broadcast" icon="🚨" defaultOpen={true}>
              <AlertBroadcast villages={villages} />
            </CollapsiblePanel>

            <CollapsiblePanel title="AI Risk Insights" icon="🤖" defaultOpen={true}>
              <AIInsights insights={aiInsights} />
            </CollapsiblePanel>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1220]">
      {/* Header */}
      <Header />

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 ml-20 p-6 min-h-screen">
          <div className="max-w-7xl">
            {renderContent()}

            {/* Footer */}
            <footer className="border-t border-cyan-500/20 mt-12 pt-8 pb-4 text-center text-gray-500 text-sm">
              <p>JalRakshak © 2026 | Smart Early Warning System for Water-borne Disease Outbreaks</p>
              <p className="mt-2">Nagpur District | Real-time Monitoring Active</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
