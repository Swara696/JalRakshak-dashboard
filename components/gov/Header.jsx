'use client'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#0B1220] to-[#121A2F] border-b border-cyan-500/20 backdrop-blur-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="text-3xl drop-shadow-lg">💧</div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              JalRakshak
            </h1>
            <p className="text-xs text-gray-400">Government Command Platform</p>
          </div>
        </div>

        {/* Live Status */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#121A2F]/60 border border-green-500/30">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
          <span className="text-sm text-green-400 font-semibold">Live Monitoring Active</span>
        </div>

        {/* User Profile */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30">
          GV
        </div>
      </div>
    </header>
  )
}
