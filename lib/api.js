// API helpers for backend integration
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Generic fetch wrapper with error handling
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error)
    throw error
  }
}

// Health Reports API
export const healthReportsAPI = {
  getAll: () => fetchAPI('/health-reports'),
  getByVillage: (villageId) => fetchAPI(`/health-reports?village=${villageId}`),
  create: (data) => fetchAPI('/health-reports', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateStatus: (reportId, status) => fetchAPI(`/health-reports/${reportId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
}

// Water Issues API
export const waterIssuesAPI = {
  getAll: () => fetchAPI('/water-issues'),
  getByVillage: (villageId) => fetchAPI(`/water-issues?village=${villageId}`),
  create: (data) => fetchAPI('/water-issues', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}

// Sensor Data API
export const sensorDataAPI = {
  getAll: () => fetchAPI('/sensor-data'),
  getByVillage: (villageId) => fetchAPI(`/sensor-data/${villageId}`),
  getLatest: () => fetchAPI('/sensor-data/latest'),
}

// Inspection Tickets API
export const ticketsAPI = {
  getAll: () => fetchAPI('/inspection-tickets'),
  getById: (ticketId) => fetchAPI(`/inspection-tickets/${ticketId}`),
  create: (data) => fetchAPI('/inspection-tickets', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateStatus: (ticketId, status) => fetchAPI(`/inspection-tickets/${ticketId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
  assignOfficer: (ticketId, officerId) => fetchAPI(`/inspection-tickets/${ticketId}/assign`, {
    method: 'POST',
    body: JSON.stringify({ officerId }),
  }),
}

// Users/Officers API
export const usersAPI = {
  getAll: () => fetchAPI('/users/all'),
  getOfficers: () => fetchAPI('/users/officers'),
  getById: (userId) => fetchAPI(`/users/${userId}`),
}

// Images API
export const imagesAPI = {
  getAll: () => fetchAPI('/water-images'),
  getByVillage: (villageId) => fetchAPI(`/water-images?village=${villageId}`),
  upload: (file, metadata) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('metadata', JSON.stringify(metadata))
    
    return fetch(`${API_BASE}/water-images/upload`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json())
  },
  updateStatus: (imageId, status) => fetchAPI(`/water-images/${imageId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
}

// Alert Broadcast API
export const alertsAPI = {
  broadcast: (message, villages) => fetchAPI('/alerts/broadcast', {
    method: 'POST',
    body: JSON.stringify({ message, villages }),
  }),
  getHistory: () => fetchAPI('/alerts/history'),
}

// Cleaning Requests API
export const cleaningAPI = {
  getAll: () => fetchAPI('/cleaning-requests'),
  create: (data) => fetchAPI('/cleaning-requests', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updateStatus: (requestId, status) => fetchAPI(`/cleaning-requests/${requestId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),
  assignVendor: (requestId, vendorId) => fetchAPI(`/cleaning-requests/${requestId}/assign`, {
    method: 'POST',
    body: JSON.stringify({ vendorId }),
  }),
}

// Dashboard API
export const dashboardAPI = {
  getKPIs: () => fetchAPI('/dashboard/kpis'),
  getAIInsights: () => fetchAPI('/dashboard/ai-insights'),
  getVillageRisks: () => fetchAPI('/dashboard/village-risks'),
}

export default {
  healthReportsAPI,
  waterIssuesAPI,
  sensorDataAPI,
  ticketsAPI,
  usersAPI,
  imagesAPI,
  alertsAPI,
  cleaningAPI,
  dashboardAPI,
}
