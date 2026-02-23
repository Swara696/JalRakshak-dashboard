'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function GovLogin() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [region, setRegion] = useState('Nagpur')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !role || !region) {
      alert('Please fill all details')
      return
    }

    const adminData = { name, role, region }
    localStorage.setItem('govAdmin', JSON.stringify(adminData))

    router.push('/gov-dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md glass-card p-8 rounded-2xl border border-cyan-500/30"
      >
        <h1 className="text-3xl font-bold grad-text mb-2">Admin Access</h1>
        <p className="text-gray-400 mb-6">Enter government admin details</p>

        <label className="block mb-2 text-sm">Full Name</label>
        <input
          className="w-full mb-4 p-3 rounded bg-[#0B1220] border border-cyan-500/20"
          placeholder="e.g. Ramesh Kulkarni"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 text-sm">Role</label>
        <input
          className="w-full mb-4 p-3 rounded bg-[#0B1220] border border-cyan-500/20"
          placeholder="e.g. Water Dept Officer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <label className="block mb-2 text-sm">Region</label>
        <select
          className="w-full mb-6 p-3 rounded bg-[#0B1220] border border-cyan-500/20"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="Nagpur">Nagpur</option>
          <option value="Kamptee">Kamptee</option>
          <option value="Hingna">Hingna</option>
          <option value="Kalmeshwar">Kalmeshwar</option>
        </select>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold hover:scale-[1.02] transition"
        >
          Enter Dashboard →
        </button>
      </form>
    </div>
  )
}