'use client'

import { useState } from 'react'

export default function CollapsiblePanel({ 
  title, 
  icon = '📋', 
  children, 
  defaultOpen = true,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`glass-card ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-0 hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-2xl font-bold grad-text">{title}</h2>
        </div>
        <div className="text-3xl text-cyan-400 transition-transform duration-300" style={{
          transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'
        }}>
          ▼
        </div>
      </button>

      {/* Collapsible Content */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '2000px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="mt-6 pt-6 border-t border-cyan-500/20">
          {children}
        </div>
      </div>
    </div>
  )
}
