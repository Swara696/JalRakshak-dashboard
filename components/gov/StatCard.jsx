'use client'

export default function StatCard({ title, value, icon, trend, color = 'blue' }) {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    red: 'from-red-500 to-orange-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-yellow-500',
    purple: 'from-purple-500 to-pink-500',
  }

  return (
    <div className="glass-card group">
      <div className="flex items-start justify-between mb-4">
        <div className={`text-3xl p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} bg-opacity-20`}>
          {icon}
        </div>
        {trend && (
          <div className={`text-sm font-semibold flex items-center gap-1 ${
            trend > 0 ? 'text-red-400' : 'text-green-400'
          }`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold grad-text">{value}</p>
      </div>
      <div className="mt-4 h-1 bg-dark-border rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${colorClasses[color]} w-3/4`} />
      </div>
    </div>
  )
}
