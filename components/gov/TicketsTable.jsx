'use client'

import { useState } from 'react'

export default function TicketsTable({ tickets = [] }) {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [assignedOfficers, setAssignedOfficers] = useState({})

  const officers = ['Officer Sharma', 'Officer Singh', 'Officer Kumar', 'Officer Patel', 'Officer Joshi']

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-risk-red/20 text-risk-red border-l-4 border-risk-red'
      case 'high':
        return 'bg-risk-orange/20 text-risk-orange border-l-4 border-risk-orange'
      case 'medium':
        return 'bg-accent-blue/20 text-accent-blue border-l-4 border-accent-blue'
      default:
        return 'bg-gray-700/20 text-gray-300 border-l-4 border-gray-700'
    }
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { color: 'bg-risk-orange/30 text-risk-orange', icon: '⏳' },
      assigned: { color: 'bg-accent-blue/30 text-accent-blue', icon: '📋' },
      inspecting: { color: 'bg-accent-cyan/30 text-accent-cyan', icon: '🔍' },
      resolved: { color: 'bg-risk-green/30 text-risk-green', icon: '✓' },
    }
    return statusMap[status] || statusMap.pending
  }

  const handleAssignOfficer = (ticketId, officer) => {
    setAssignedOfficers((prev) => ({
      ...prev,
      [ticketId]: officer,
    }))
  }

  const handleStatusChange = (ticketId, newStatus) => {
    console.log(`Ticket ${ticketId} status changed to ${newStatus}`)
  }

  return (
    <div className="glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold grad-text mb-1">Inspection Ticket System</h2>
        <p className="text-gray-400 text-sm">Manage field inspections and status updates</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Ticket ID</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Village</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Issue Type</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Priority</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Status</th>
              <th className="text-left py-3 px-4 text-gray-400 font-semibold">Officer</th>
              <th className="text-center py-3 px-4 text-gray-400 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => {
              const statusInfo = getStatusBadge(ticket.status)
              return (
                <tr
                  key={ticket.id}
                  className={`border-b border-dark-border hover:bg-dark-border/50 transition-colors ${getPriorityColor(ticket.priority)}`}
                >
                  <td className="py-3 px-4 font-mono text-accent-cyan">{ticket.id}</td>
                  <td className="py-3 px-4 font-semibold">{ticket.village}</td>
                  <td className="py-3 px-4">{ticket.issueType}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      ticket.priority === 'critical' ? 'bg-risk-red/30 text-risk-red' :
                      ticket.priority === 'high' ? 'bg-risk-orange/30 text-risk-orange' :
                      'bg-accent-blue/30 text-accent-blue'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color}`}>
                      {statusInfo.icon} {ticket.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {assignedOfficers[ticket.id] || ticket.assignedOfficer ? (
                      <span className="text-accent-cyan font-semibold">
                        {assignedOfficers[ticket.id] || ticket.assignedOfficer}
                      </span>
                    ) : (
                      <select
                        onChange={(e) => handleAssignOfficer(ticket.id, e.target.value)}
                        className="bg-dark-border border border-dark-border rounded px-2 py-1 text-sm text-gray-300 hover:border-accent-blue transition-colors"
                      >
                        <option value="">Assign...</option>
                        {officers.map((officer) => (
                          <option key={officer} value={officer}>
                            {officer}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedTicket(selectedTicket?.id === ticket.id ? null : ticket)}
                      className="text-accent-blue hover:text-accent-cyan transition-colors text-sm font-semibold"
                    >
                      {selectedTicket?.id === ticket.id ? '△ Collapse' : '▽ Details'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Expanded Ticket Details */}
      {selectedTicket && (
        <div className="mt-6 p-4 bg-dark-border/30 rounded-lg border border-dark-border">
          <h3 className="text-lg font-bold text-accent-cyan mb-4">Ticket Details: {selectedTicket.id}</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Notes</p>
              <p className="text-white">{selectedTicket.notes}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Created</p>
              <p className="text-white">
                {selectedTicket.createdAt.toLocaleDateString()} {selectedTicket.createdAt.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <select
              onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
              defaultValue={selectedTicket.status}
              className="bg-dark-border border border-dark-border rounded px-3 py-2 text-white text-sm hover:border-accent-blue transition-colors"
            >
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="inspecting">Inspecting</option>
              <option value="resolved">Resolved</option>
            </select>
            <button className="px-4 py-2 bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue rounded transition-colors font-semibold">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
