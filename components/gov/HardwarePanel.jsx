'use client'

export default function HardwarePanel({ sensorData = [] }) {
  const getPhStatus = (ph) => {
    if (ph >= 6.5 && ph <= 8.5) return { status: 'normal', color: 'risk-green', icon: '✓' }
    if (ph > 8.5 || ph < 6.5) return { status: 'warning', color: 'risk-orange', icon: '⚠' }
    return { status: 'critical', color: 'risk-red', icon: '✕' }
  }

  const getTdsStatus = (tds) => {
    if (tds <= 500) return { status: 'normal', color: 'risk-green', icon: '✓' }
    if (tds <= 800) return { status: 'warning', color: 'risk-orange', icon: '⚠' }
    return { status: 'critical', color: 'risk-red', icon: '✕' }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'text-risk-green'
      case 'warning':
        return 'text-risk-orange'
      case 'critical':
        return 'text-risk-red'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusBg = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-risk-green/10'
      case 'warning':
        return 'bg-risk-orange/10'
      case 'critical':
        return 'bg-risk-red/10'
      default:
        return 'bg-gray-700/10'
    }
  }

  return (
    <div className="glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold grad-text mb-1">Water Quality Monitoring</h2>
        <p className="text-gray-400 text-sm">Real-time pH & TDS readings from field sensors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sensorData.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No sensor data available
          </div>
        ) : (
          sensorData.map((sensor, idx) => {
            const phStatus = getPhStatus(sensor.ph)
            const tdsStatus = getTdsStatus(sensor.tds)

            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border transition-all ${
                  phStatus.status === 'critical' || tdsStatus.status === 'critical'
                    ? 'border-risk-red/50 bg-risk-red/10 ring-1 ring-risk-red/20'
                    : phStatus.status === 'warning' || tdsStatus.status === 'warning'
                    ? 'border-risk-orange/50 bg-risk-orange/10 ring-1 ring-risk-orange/20'
                    : 'border-dark-border/50 bg-dark-border/30'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{sensor.village}</h3>
                    <p className="text-xs text-gray-500">
                      Updated {new Date(sensor.lastReading).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    sensor.status === 'critical' ? 'bg-risk-red/30 text-risk-red' :
                    sensor.status === 'warning' ? 'bg-risk-orange/30 text-risk-orange' :
                    'bg-risk-green/30 text-risk-green'
                  }`}>
                    {sensor.status === 'critical' ? '🔴' : sensor.status === 'warning' ? '🟠' : '🟢'} {sensor.status}
                  </div>
                </div>

                {/* pH Meter */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-300">pH Level</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${getStatusColor(phStatus.status)}`}>
                        {sensor.ph.toFixed(1)}
                      </span>
                      <span className={`text-xl ${getStatusColor(phStatus.status)}`}>
                        {phStatus.icon}
                      </span>
                    </div>
                  </div>

                  {/* pH Progress Bar */}
                  <div className="relative h-2 bg-dark-border rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        phStatus.status === 'critical' ? 'bg-risk-red' :
                        phStatus.status === 'warning' ? 'bg-risk-orange' :
                        'bg-risk-green'
                      }`}
                      style={{
                        width: `${Math.min(100, (sensor.ph / 14) * 100)}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Acidic (6.5)</span>
                    <span>Optimal</span>
                    <span>Alkaline (8.5)</span>
                  </div>

                  {phStatus.status !== 'normal' && (
                    <p className={`text-xs mt-2 ${getStatusColor(phStatus.status)}`}>
                      ⚠️ pH outside optimal range (6.5-8.5)
                    </p>
                  )}
                </div>

                {/* TDS Meter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-300">TDS (ppm)</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${getStatusColor(tdsStatus.status)}`}>
                        {sensor.tds}
                      </span>
                      <span className={`text-xl ${getStatusColor(tdsStatus.status)}`}>
                        {tdsStatus.icon}
                      </span>
                    </div>
                  </div>

                  {/* TDS Progress Bar */}
                  <div className="relative h-2 bg-dark-border rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        tdsStatus.status === 'critical' ? 'bg-risk-red' :
                        tdsStatus.status === 'warning' ? 'bg-risk-orange' :
                        'bg-risk-green'
                      }`}
                      style={{
                        width: `${Math.min(100, (sensor.tds / 1000) * 100)}%`,
                      }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Good (&lt;500)</span>
                    <span>Acceptable (&lt;800)</span>
                    <span>High (&gt;800)</span>
                  </div>

                  {tdsStatus.status !== 'normal' && (
                    <p className={`text-xs mt-2 ${getStatusColor(tdsStatus.status)}`}>
                      ⚠️ TDS exceeds recommended level (&lt;500 ppm)
                    </p>
                  )}
                </div>

                <button className="mt-4 w-full text-sm py-2 bg-dark-border/50 hover:bg-dark-border text-gray-300 rounded transition-colors font-semibold">
                  View Sensor Details
                </button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
