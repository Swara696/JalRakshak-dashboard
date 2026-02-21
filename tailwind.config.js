/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0B1220',
        'dark-card': '#121A2F',
        'dark-border': '#2d3748',
        'risk-green': '#10b981',
        'risk-orange': '#f97316',
        'risk-red': '#ef4444',
        'accent-blue': '#3b82f6',
        'accent-cyan': '#06b6d4',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0B1220 0%, #121A2F 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      backdropBlur: {
        'xl': '12px',
      },
    },
  },
  plugins: [],
}
