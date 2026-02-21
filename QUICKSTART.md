# 🚀 JalRakshak Dashboard - Quick Start Guide

## Installation (2 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
```bash
cp .env.local.example .env.local
```

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Visit: **http://localhost:3000**

It auto-redirects to → **http://localhost:3000/gov-dashboard**

✅ **Dashboard is live!**

---

## 🧪 Demo the App

### Try These Features:

1. **Risk Heatmap** (Top)
   - Click 🚨 **"Simulate Outbreak"** button
   - Watch villages turn red
   - See KPIs update
   - New tickets appear

2. **Public Health Feed** (Left side)
   - Review citizen symptom reports
   - Click "Escalate" to trigger actions

3. **Inspection Tickets** (Middle)
   - Click "Details" to expand
   - Change status: Pending → Assigned → Inspecting → Resolved
   - Assign officers via dropdown

4. **Water Quality Monitoring** (Left side, bottom)
   - See pH & TDS readings
   - ⚠️ Warning badges for abnormal values
   - Real-time trends

5. **Water Image Review** (Right side, top)
   - Click "Next" to see sample images
   - Approve/Mark Safe/Escalate each image
   - Track status

6. **Tank Cleaning** (Right side, bottom)
   - Assign cleaning vendors
   - Mark requests completed

7. **AI Insights** (Bottom left)
   - Click cards to expand
   - See risk factors & confidence scores
   - Get recommendations

8. **Alert Broadcast** (Bottom right)
   - Click "+ New Alert"
   - Compose SMS message
   - Select target villages (click "Select All")
   - Click "📢 Broadcast Now"
   - See broadcast history

---

## 📦 What's Included

### ✅ All Components
- StatCard (KPIs)
- RiskHeatmap (Critical!)
- PublicHealthFeed
- TicketsTable
- ImageReviewPanel
- HardwarePanel
- CleaningRequests
- AIInsights
- AlertBroadcast

### ✅ Mock Data
- 12 villages with risk scores
- 5 health reports
- 5 inspection tickets
- 3 water images
- 5 sensor readings
- 4 cleaning requests
- 2 AI insights

### ✅ Complete Styling
- Dark theme (control room aesthetic)
- Glassmorphism cards
- Gradient accents
- Responsive mobile layout
- Professional typography

---

## 🔌 Connect Real Backend (Later)

### Option 1: Minimal Changes
1. Update API URLs in `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-api.com/api
```

2. The API calls in `lib/api.js` are already wired!
```javascript
// Just swap mock data for API calls
```

### Option 2: Replace Mock Data
In `app/gov-dashboard/page.jsx`, replace:
```javascript
// Instead of:
const [villages, setVillages] = useState(mockVillages)

// Use:
useEffect(() => {
  dashboardAPI.getVillageRisks()
    .then(setVillages)
    .catch(console.error)
}, [])
```

See `lib/api.js` for all wired endpoints.

---

## 🎨 Customize

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  colors: {
    'risk-green': '#10b981',      // ← Change green
    'risk-orange': '#f97316',     // ← Change orange
    'risk-red': '#ef4444',        // ← Change red
  }
}
```

### Add Villages
Edit `lib/mockData.js`:
```javascript
export const mockVillages = [
  // Add new objects here
  { id: 13, name: 'New Village', risk: 45, ... }
]
```

### Modify Dashboard Layout
Edit `app/gov-dashboard/page.jsx`:
- Reorder sections
- Add/remove components
- Adjust grid columns
- Change update intervals

---

## 📱 Mobile Preview

```bash
# Development
npm run dev
# Then open http://localhost:3000 on mobile/tablet
```

Responsive breakpoints:
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+

All components tested & work on all sizes!

---

## 🚀 Deploy to Vercel (2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

That's it! Live on `your-project.vercel.app`

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Node modules issue?
```bash
rm -rf node_modules
npm install
```

### Tailwind not loading?
```bash
npm run dev
# Wait 5 seconds for compilation
# Refresh browser
```

---

## ✨ Hackathon Tips

1. **Show the Heatmap First** (Most impressive)
2. **Click Simulate Outbreak** (Real-time demo)
3. **Show Alert Broadcast** (SMS demo)
4. **Highlight AI Insights** (ML angle)
5. **Change Status in Tickets** (Interactivity)

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `app/gov-dashboard/page.jsx` | Main dashboard |
| `components/gov/*.jsx` | 9 components |
| `lib/mockData.js` | Sample data + utilities |
| `lib/api.js` | Backend API calls |
| `app/globals.css` | Styling & animations |
| `tailwind.config.js` | Theme colors |

---

## 🎯 Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Open `http://localhost:3000`
4. ✅ Click 🚨 "Simulate Outbreak"
5. ✅ Explore features
6. ✅ When ready, connect real backend

**You're all set! 🚀**

---

Questions? Check `README.md` for full documentation!
