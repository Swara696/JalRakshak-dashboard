'use client'

export default function ActionPanel() {
  const actions = [
    { id: 1, label: 'Send Advisory', icon: '📢', color: 'from-blue-600 to-blue-500', desc: 'Public health notice' },
    { id: 2, label: 'Tank Cleaning', icon: '🧹', color: 'from-yellow-600 to-yellow-500', desc: 'Request cleaning' },
    { id: 3, label: 'Rent Sensor', icon: '📊', color: 'from-green-600 to-green-500', desc: '₹99/month' },
    { id: 4, label: 'Assign Officer', icon: '👨‍💼', color: 'from-purple-600 to-purple-500', desc: 'Installation' },
  ]

  return (
    <div className="glass-card">
      <h2 className="text-2xl font-bold grad-text mb-6">Government Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            className={`
              p-4 rounded-lg bg-gradient-to-br ${action.color} 
              hover:shadow-lg hover:shadow-current/50 hover:scale-105
              transition-all duration-300 text-white border border-current/30
              group relative overflow-hidden
            `}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <div className="relative z-10 text-center">
              <div className="text-4xl mb-2">{action.icon}</div>
              <h3 className="font-bold text-sm">{action.label}</h3>
              <p className="text-xs opacity-90 mt-1">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
