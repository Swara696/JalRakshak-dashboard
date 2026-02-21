import './globals.css'

export const metadata = {
  title: 'JalRakshak - Government Command Dashboard',
  description: 'Smart Early Warning System for Water-borne Disease Outbreaks',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%233b82f6"/><path d="M50 20 L60 35 L75 35 L65 45 L70 60 L50 50 L30 60 L35 45 L25 35 L40 35 Z" fill="%23fff"/></svg>',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark-bg antialiased">
        {children}
      </body>
    </html>
  )
}
