'use client'

export default function StatCard({ title, value, icon, trend, color = 'blue' }) {
  const colorClasses = {
    blue: 'from-cyan-400 to-blue-500',
    red: 'from-red-500 to-orange-500',
    green: 'from-emerald-400 to-green-500',
    orange: 'from-orange-400 to-yellow-500',
    purple: 'from-purple-400 to-pink-500',
  }

  const trendColor =
    trend > 0 ? 'text-red-400 bg-red-500/10 border-red-500/30' : 'text-green-400 bg-green-500/10 border-green-500/30'

  return (
    <div className="relative group glass-card glow-border overflow-hidden">
      {/* Ambient glow */}
      <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${colorClasses[color]} opacity-20 blur-[100px]`} />

      {/* Scanline effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 animate-[scan_2s_linear_infinite]" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`text-3xl p-3 rounded-2xl bg-gradient-to-br ${colorClasses[color]} bg-opacity-20 ring-1 ring-white/10 shadow-lg`}
          >
            {icon}
          </div>

          {typeof trend === 'number' && (
            <div className={`px-2 py-1 rounded-full border text-xs font-semibold flex items-center gap-1 ${trendColor}`}>
              <span className="animate-pulse">{trend > 0 ? '▲' : '▼'}</span>
              {Math.abs(trend)}%
            </div>
          )}
        </div>

        <h3 className="text-gray-400 text-xs tracking-widest uppercase mb-1">{title}</h3>

        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-extrabold grad-text leading-none">{value}</p>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colorClasses[color]} animate-[progress_3s_ease-in-out_infinite]`}
            style={{ width: `${Math.min(90, Math.max(30, value % 100))}%` }}
          />
        </div>
      </div>
    </div>
  )
}