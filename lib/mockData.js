// Mock data for the Government Command Dashboard
export const mockKPIs = {
  totalVillages: 47,
  activeReports: 234,
  highRiskZones: 8,
  populationAtRisk: 156420,
  activeInspections: 12,
}

export const mockVillages = [
  { id: 1, name: 'Kalmeshwar', risk: 85, cases: 45, complaints: 23, population: 8500, ph: 8.2, tds: 650, coords: { x: 15, y: 20 } },
  { id: 2, name: 'Hingna', risk: 72, cases: 38, complaints: 18, population: 6200, ph: 7.8, tds: 480, coords: { x: 45, y: 15 } },
  { id: 3, name: 'Umred', risk: 92, cases: 67, complaints: 45, population: 9100, ph: 8.9, tds: 890, coords: { x: 75, y: 25 } },
  { id: 4, name: 'Kamptee', risk: 25, cases: 5, complaints: 2, population: 4300, ph: 7.2, tds: 320, coords: { x: 25, y: 50 } },
  { id: 5, name: 'Saoner', risk: 58, cases: 28, complaints: 12, population: 5800, ph: 7.5, tds: 520, coords: { x: 55, y: 45 } },
  { id: 6, name: 'Katol', risk: 15, cases: 3, complaints: 1, population: 3200, ph: 7.1, tds: 280, coords: { x: 80, y: 50 } },
  { id: 7, name: 'Ramtek', risk: 88, cases: 56, complaints: 34, population: 7600, ph: 8.6, tds: 750, coords: { x: 30, y: 75 } },
  { id: 8, name: 'Kuhi', risk: 42, cases: 18, complaints: 9, population: 4900, ph: 7.3, tds: 410, coords: { x: 60, y: 70 } },
  { id: 9, name: 'Bhiwapur', risk: 19, cases: 4, complaints: 1, population: 2800, ph: 7.0, tds: 250, coords: { x: 20, y: 85 } },
  { id: 10, name: 'Mouda', risk: 65, cases: 32, complaints: 16, population: 6500, ph: 7.9, tds: 580, coords: { x: 70, y: 80 } },
  { id: 11, name: 'Narkhed', risk: 78, cases: 42, complaints: 28, population: 7200, ph: 8.4, tds: 620, coords: { x: 40, y: 90 } },
  { id: 12, name: 'Manori', risk: 22, cases: 6, complaints: 2, population: 3900, ph: 7.1, tds: 300, coords: { x: 65, y: 90 } },
]

export const mockHealthReports = [
  {
    id: 'HR001',
    village: 'Umred',
    reporter: 'Amit Kumar',
    symptoms: ['Diarrhea', 'Fever', 'Nausea'],
    severity: 'high',
    timestamp: new Date(Date.now() - 2 * 60000),
    status: 'new',
  },
  {
    id: 'HR002',
    village: 'Hingna',
    reporter: 'Priya Sharma',
    symptoms: ['Stomach Pain', 'Vomiting'],
    severity: 'medium',
    timestamp: new Date(Date.now() - 8 * 60000),
    status: 'reviewed',
  },
  {
    id: 'HR003',
    village: 'Ramtek',
    reporter: 'Rajesh Singh',
    symptoms: ['Diarrhea', 'Fever'],
    severity: 'high',
    timestamp: new Date(Date.now() - 15 * 60000),
    status: 'escalated',
  },
  {
    id: 'HR004',
    village: 'Mouda',
    reporter: 'Meera Joshi',
    symptoms: ['Headache', 'Fever'],
    severity: 'medium',
    timestamp: new Date(Date.now() - 25 * 60000),
    status: 'new',
  },
  {
    id: 'HR005',
    village: 'Narkhed',
    reporter: 'Vikram Patel',
    symptoms: ['Diarrhea', 'Stomach Pain'],
    severity: 'high',
    timestamp: new Date(Date.now() - 45 * 60000),
    status: 'reviewed',
  },
]

export const mockInspectionTickets = [
  {
    id: 'TKT001',
    village: 'Kalmeshwar',
    issueType: 'High TDS Reading',
    priority: 'critical',
    status: 'assigned',
    assignedOfficer: 'Officer Sharma',
    createdAt: new Date(Date.now() - 60 * 60000),
    notes: 'TDS > 800ppm detected in community tank',
  },
  {
    id: 'TKT002',
    village: 'Umred',
    issueType: 'pH Imbalance',
    priority: 'high',
    status: 'inspecting',
    assignedOfficer: 'Officer Singh',
    createdAt: new Date(Date.now() - 120 * 60000),
    notes: 'pH measured at 9.2, cleaning advised',
  },
  {
    id: 'TKT003',
    village: 'Ramtek',
    issueType: 'Disease Outbreak',
    priority: 'critical',
    status: 'pending',
    assignedOfficer: null,
    createdAt: new Date(Date.now() - 180 * 60000),
    notes: '15+ cases reported in last 48 hours',
  },
  {
    id: 'TKT004',
    village: 'Mouda',
    issueType: 'Tank Contamination',
    priority: 'high',
    status: 'resolved',
    assignedOfficer: 'Officer Kumar',
    createdAt: new Date(Date.now() - 240 * 60000),
    notes: 'Tank cleaned and disinfected',
  },
  {
    id: 'TKT005',
    village: 'Narkhed',
    issueType: 'Quality Degradation',
    priority: 'medium',
    status: 'assigned',
    assignedOfficer: 'Officer Patel',
    createdAt: new Date(Date.now() - 300 * 60000),
    notes: 'Water clarity issue, needs investigation',
  },
]

export const mockWaterImages = [
  {
    id: 'IMG001',
    village: 'Neerpur',
    url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"><rect fill="%23ff6b6b" width="200" height="150"/><text x="100" y="75" text-anchor="middle" fill="white" font-size="14" dy=".3em">Contaminated Water Sample</text></svg>',
    description: 'Turbid water with visible particles',
    severity: 'high',
    location: 'Community Tank A',
    uploadTime: new Date(Date.now() - 30 * 60000),
    status: 'pending_review',
  },
  {
    id: 'IMG002',
    village: 'Jalpuri',
    url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"><rect fill="%23ffd93d" width="200" height="150"/><text x="100" y="75" text-anchor="middle" fill="black" font-size="14" dy=".3em">Moderately Turbid Water</text></svg>',
    description: 'Slight cloudiness, debris present',
    severity: 'medium',
    location: 'Bore Well B',
    uploadTime: new Date(Date.now() - 90 * 60000),
    status: 'pending_review',
  },
  {
    id: 'IMG003',
    village: 'Dharampuri',
    url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150"><rect fill="%2351cf66" width="200" height="150"/><text x="100" y="75" text-anchor="middle" fill="white" font-size="14" dy=".3em">Clear Water Sample</text></svg>',
    description: 'Crystal clear water, good quality',
    severity: 'low',
    location: 'Municipal Supply',
    uploadTime: new Date(Date.now() - 180 * 60000),
    status: 'approved',
  },
]

export const mockSensorData = [
  {
    village: 'Neerpur',
    ph: 8.7,
    tds: 650,
    temperature: 28.5,
    lastReading: new Date(Date.now() - 5 * 60000),
    status: 'warning',
  },
  {
    village: 'Talab Vihar',
    ph: 9.1,
    tds: 890,
    temperature: 29.2,
    lastReading: new Date(Date.now() - 3 * 60000),
    status: 'critical',
  },
  {
    village: 'Jalpuri',
    ph: 7.3,
    tds: 520,
    temperature: 27.8,
    lastReading: new Date(Date.now() - 2 * 60000),
    status: 'warning',
  },
  {
    village: 'Dharampuri',
    ph: 7.0,
    tds: 280,
    temperature: 26.5,
    lastReading: new Date(Date.now() - 1 * 60000),
    status: 'normal',
  },
  {
    village: 'Kalipur',
    ph: 8.9,
    tds: 750,
    temperature: 29.8,
    lastReading: new Date(Date.now() - 4 * 60000),
    status: 'critical',
  },
]

export const mockCleaningRequests = [
  {
    id: 'CLN001',
    household: 'Sharma Family',
    village: 'Neerpur',
    location: 'East Tank',
    requestTime: new Date(Date.now() - 120 * 60000),
    cleanerAssigned: 'Vendor - Rajesh',
    status: 'completed',
    priority: 'high',
  },
  {
    id: 'CLN002',
    household: 'Singh Household',
    village: 'Talab Vihar',
    location: 'Central Tank',
    requestTime: new Date(Date.now() - 60 * 60000),
    cleanerAssigned: 'Vendor - Arun',
    status: 'in_progress',
    priority: 'critical',
  },
  {
    id: 'CLN003',
    household: 'Patel Community',
    village: 'Jalpuri',
    location: 'Main Tank',
    requestTime: new Date(Date.now() - 30 * 60000),
    cleanerAssigned: null,
    status: 'pending',
    priority: 'high',
  },
  {
    id: 'CLN004',
    household: 'Kumar Family',
    village: 'Kalipur',
    location: 'West Tank',
    requestTime: new Date(Date.now() - 180 * 60000),
    cleanerAssigned: 'Vendor - Mohan',
    status: 'completed',
    priority: 'medium',
  },
]

export const mockAIInsights = [
  {
    id: 'AI001',
    village: 'Talab Vihar',
    factors: [
      { factor: 'Symptom Rise', impact: 'high', description: '67 cases reported in 48 hours (↑15%)' },
      { factor: 'Water Quality', impact: 'high', description: 'TDS spike to 890ppm (normal: 300-500)' },
      { factor: 'pH Imbalance', impact: 'medium', description: 'pH 9.1 (optimal: 6.5-8.5)' },
      { factor: 'Recent Rainfall', impact: 'medium', description: '35mm rainfall diluted treatment' },
    ],
    confidence: 92,
  },
  {
    id: 'AI002',
    village: 'Neerpur',
    factors: [
      { factor: 'TDS Elevation', impact: 'high', description: 'Possible groundwater contamination' },
      { factor: 'Tank Age', impact: 'medium', description: 'Tank > 8 years old, needs inspection' },
      { factor: 'Symptom Cluster', impact: 'medium', description: 'Cases concentrated in east zone' },
    ],
    confidence: 78,
  },
]

// Utility function to get risk level
export const getRiskLevel = (riskPercentage) => {
  if (riskPercentage >= 70) return { level: 'high', color: 'risk-red', badge: '🔴' }
  if (riskPercentage >= 40) return { level: 'medium', color: 'risk-orange', badge: '🟠' }
  return { level: 'low', color: 'risk-green', badge: '🟢' }
}

// Format timestamp
export const formatTime = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}
