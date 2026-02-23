'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('govAdmin')
    if (data) setAdmin(JSON.parse(data))
  }, [])

  const initials = admin?.name
    ? admin.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'GV'

  return (
    <header className="sticky top-4 z-40 mx-4 glass-effect glow-border">
      <div className="px-6 py-4 flex items-center justify-between relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-0 -right-20 w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full" />

        {/* Logo & Title */}
        <div className="relative flex items-center gap-3">
          <div className="text-3xl drop-shadow-lg">💧</div>
          <div>
            <h1 className="text-xl font-bold grad-text tracking-wide">
              JalRakshak
            </h1>
            <p className="text-xs text-gray-400 tracking-widest uppercase">
              Government Command Center
            </p>
          </div>
        </div>

        {/* Live Status */}
        <div className="relative flex items-center gap-3 px-4 py-2 rounded-full glass-effect">
          <span className="pulse-dot" />
          <span className="text-sm text-green-400 font-semibold tracking-wide">
            Live Monitoring Active
          </span>
        </div>

        {/* User Profile */}
        <div className="relative flex items-center gap-4">
          {admin && (
            <div className="hidden md:flex flex-col items-end leading-tight">
              <p className="text-sm text-white font-semibold tracking-wide">
                {admin.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {admin.role}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  {admin.region}
                </span>
              </div>
            </div>
          )}

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/40 ring-1 ring-cyan-400/40 hover:scale-105 transition-transform">
            {initials}
          </div>
        </div>
      </div>
    </header>
  )
}
