'use client'

import { useState } from 'react'

export default function CleaningRequests({ requests = [] }) {
  const [requestStatuses, setRequestStatuses] = useState({})

  const vendors = ['Vendor - Rajesh', 'Vendor - Arun', 'Vendor - Mohan', 'Vendor - Priya', 'Vendor - Deepak']

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-risk-red/20 text-risk-red'
      case 'high':
        return 'bg-risk-orange/20 text-risk-orange'
      case 'medium':
        return 'bg-accent-blue/20 text-accent-blue'
      default:
        return 'bg-gray-700/20 text-gray-300'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-risk-orange/20 text-risk-orange border-l-4 border-risk-orange'
      case 'in_progress':
        return 'bg-accent-cyan/20 text-accent-cyan border-l-4 border-accent-cyan'
      case 'completed':
        return 'bg-risk-green/20 text-risk-green border-l-4 border-risk-green'
      default:
        return 'bg-gray-700/20 text-gray-300'
    }
  }

  const handleApproveVendor = (requestId, vendor) => {
    setRequestStatuses((prev) => ({
      ...prev,
      [requestId]: { ...prev[requestId], vendor },
    }))
  }

  const handleCompleteRequest = (requestId) => {
    setRequestStatuses((prev) => ({
      ...prev,
      [requestId]: { ...prev[requestId], status: 'completed' },
    }))
  }

  return (
    <div className="glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold grad-text mb-1">Tank Cleaning Management</h2>
        <p className="text-gray-400 text-sm">Approve vendor assignments and track cleaning progress</p>
      </div>

      <div className="space-y-3">
        {requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No cleaning requests
          </div>
        ) : (
          requests.map((request) => (
            <div
              key={request.id}
              className={`p-4 rounded-lg border ${getStatusColor(requestStatuses[request.id]?.status || request.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{request.household}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-dark-border text-gray-300">
                      {request.village}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{request.location}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(request.priority)}`}>
                    {request.priority === 'critical' ? '🔴' : '🟠'} {request.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    requestStatuses[request.id]?.status === 'completed' ? 'bg-risk-green/30 text-risk-green' :
                    requestStatuses[request.id]?.status === 'in_progress' || request.status === 'in_progress' ? 'bg-accent-cyan/30 text-accent-cyan' :
                    'bg-risk-orange/30 text-risk-orange'
                  }`}>
                    {requestStatuses[request.id]?.status === 'completed' ? '✓' :
                     requestStatuses[request.id]?.status === 'in_progress' || request.status === 'in_progress' ? '⚙️' :
                     '⏳'} {requestStatuses[request.id]?.status || request.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Requested</p>
                  <p className="text-sm text-gray-300">
                    {new Date(request.requestTime).toLocaleDateString()} {new Date(request.requestTime).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Assigned Vendor</p>
                  {requestStatuses[request.id]?.vendor || request.cleanerAssigned ? (
                    <p className="text-sm text-accent-cyan font-semibold">
                      {requestStatuses[request.id]?.vendor || request.cleanerAssigned}
                    </p>
                  ) : (
                    <select
                      onChange={(e) => handleApproveVendor(request.id, e.target.value)}
                      className="bg-dark-border border border-dark-border rounded px-2 py-1 text-sm text-gray-300 hover:border-accent-blue transition-colors"
                    >
                      <option value="">Select vendor...</option>
                      {vendors.map((vendor) => (
                        <option key={vendor} value={vendor}>
                          {vendor}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-3 border-t border-dark-border/50">
                {(requestStatuses[request.id]?.vendor || request.cleanerAssigned) && 
                 (requestStatuses[request.id]?.status || request.status) !== 'completed' && (
                  <button
                    onClick={() => handleCompleteRequest(request.id)}
                    className="flex-1 text-sm px-3 py-2 bg-risk-green/20 hover:bg-risk-green/30 text-risk-green rounded transition-colors font-semibold"
                  >
                    ✓ Mark Completed
                  </button>
                )}
                <button className="flex-1 text-sm px-3 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue rounded transition-colors font-semibold">
                  Send Notification
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
