# JalRakshak - Government Command Dashboard

Smart Early Warning System for Water-borne Disease Outbreaks

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ & npm/yarn
- Modern web browser

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` → automatically redirects to `/gov-dashboard`

## 📁 Project Structure

```
JalRakshak/
├── app/
│   ├── layout.jsx              # Root layout
│   ├── page.jsx                # Redirect to dashboard
│   ├── globals.css             # Global styles & animations
│   └── gov-dashboard/
│       └── page.jsx            # Main dashboard (ALL components)
├── components/gov/
│   ├── StatCard.jsx            # KPI cards
│   ├── RiskHeatmap.jsx         # Village risk grid (CRITICAL)
│   ├── PublicHealthFeed.jsx    # Citizen reports feed
│   ├── TicketsTable.jsx        # Inspection tickets
│   ├── ImageReviewPanel.jsx    # Water quality images
│   ├── HardwarePanel.jsx       # pH & TDS monitoring
│   ├── CleaningRequests.jsx    # Tank cleaning approvals
│   ├── AIInsights.jsx          # Risk factor analysis
│   └── AlertBroadcast.jsx      # SMS alert system
├── lib/
│   ├── mockData.js             # All mock data + utilities
│   └── api.js                  # Backend API helpers
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── .env.local.example
```

## ✨ Key Features

### 1. **Risk Heatmap (MOST IMPORTANT)**
- 12-village grid with color-coded risk levels (green/orange/red)
- Real-time risk scores, active cases, complaints
- Click villages for detailed info
- **🚨 Simulate Outbreak button** → turns villages red, adds tickets, triggers alerts

### 2. **Command Center Overview**
- 5 KPI cards:
  - Total villages monitored
  - Active health reports
  - High-risk zones
  - Population at risk
  - Active inspections

### 3. **Public Health Feed**
- Live streamed citizen reports
- Symptoms, severity, location, timestamp
- Quick review & escalation buttons

### 4. **Inspection Ticket System**
- Table with ticket ID, village, issue, priority, status
- Officer assignment dropdown
- Status change (Pending → Assigned → Inspecting → Resolved)
- Expandable details panel

### 5. **Water Image Review**
- Carousel of uploaded water samples
- Approve/Mark Safe/Escalate buttons
- Status tracking
- Thumbnail queue

### 6. **Hardware Monitoring**
- pH level monitoring (Optimal: 6.5-8.5)
- TDS monitoring (Good: <500 ppm)
- Live sensor readings with warning badges
- Progress bars & status indicators

### 7. **Tank Cleaning Management**
- Request list: Household, Location, Time
- Vendor assignment dropdown
- Mark completed functionality
- Priority levels

### 8. **AI Insights**
- Machine learning risk factors
- Expandable analysis cards
- Confidence scores (85%+ = Very High)
- Actionable recommendations

### 9. **Alert Broadcast System**
- Compose SMS alerts
- Multi-village selection
- Broadcast history
- Recipient estimates

## 🎨 Design System

### Colors
- **Dark Theme**: `#0f1419` background, `#1a1f28` cards
- **Risk Levels**: 🟢 Green, 🟠 Orange, 🔴 Red
- **Accents**: Cyan, Blue, Purple gradients

### Components
- **Glassmorphism**: Semi-transparent cards with blur
- **Gradients**: Text, buttons, progress bars
- **Responsive**: Mobile-first, grid layouts
- **Animations**: Pulse badges, smooth transitions

### Typography
- Headings: Bold, grad-text gradient
- Body: Clean sans-serif, 14-16px
- Monospace: Ticket IDs, codes

## 🔌 Backend Integration

### Wired API Endpoints (Update when backend ready)

```javascript
// Health Reports
GET /api/health-reports
POST /api/health-reports
PATCH /api/health-reports/:id/status

// Water Issues
GET /api/water-issues
POST /api/water-issues

// Sensor Data
GET /api/sensor-data
GET /api/sensor-data/:villageId

// Inspection Tickets
GET /api/inspection-tickets
POST /api/inspection-tickets
PATCH /api/inspection-tickets/:id/status
POST /api/inspection-tickets/:id/assign

// Images
GET /api/water-images
PATCH /api/water-images/:id/status
POST /api/water-images/upload

// Alerts
POST /api/alerts/broadcast

// Cleaning
GET /api/cleaning-requests
PATCH /api/cleaning-requests/:id/status
```

### Currently Using Mock Data
- All components populated from `/lib/mockData.js`
- No backend required for demo
- Ready to swap mock → real API calls

## 🧪 Demo Features

### Simulate Outbreak
Click **🚨 Simulate Outbreak** button:
1. Villages turn red with increased risk
2. New health reports added
3. Inspection tickets created
4. KPIs update
5. Alert system shows "ready to broadcast"

Use this for hackathon demo!

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.jalrakshak.com
```

## 📦 Dependencies

- **Next.js 14**: App Router, server components
- **React 18**: UI framework
- **Tailwind CSS 3**: Styling
- **Axios**: HTTP requests (in api.js)

## 🛠️ Development

### Styling
- All styles use Tailwind + custom CSS in `globals.css`
- No external UI libraries (built from scratch)
- Dark theme with accent colors

### Component Structure
- Each component is a client component (`'use client'`)
- Props-driven design for reusability
- useState for local interactions
- Ready for Redux/Context API later

### Adding New Features
1. Create component in `components/gov/`
2. Import in main dashboard page
3. Add mock data in `lib/mockData.js`
4. Wire API calls in `lib/api.js`

## 📱 Responsive Breakpoints

- **Mobile**: Single column
- **Tablet**: 2-column grid
- **Desktop**: 3+ columns

All components tested on 320px - 1920px screens.

## 🎯 Hackathon Features

✅ Production-ready code  
✅ Beautiful dark UI  
✅ All components functional  
✅ Mock data included  
✅ Outbreak simulation  
✅ No dependencies on external services  
✅ Copy-paste ready  
✅ Mobile responsive  
✅ Backend-ready APIs  

## 📝 Notes

- **No Student UI**: Professional control room aesthetic
- **No Routing Issues**: Uses Next.js 14 App Router
- **Modular**: Each component standalone & reusable
- **Scalable**: Easy to add new villages, reports, tickets
- **Demo-First**: Works without backend, swap data sources easily

## 🔒 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Database integration (PostgreSQL)
- [ ] User authentication
- [ ] Role-based access (Officer, Admin, Citizen)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics & ML
- [ ] Multi-language support

---

**Built for JalRakshak Hackathon 2026**  
Smart Early Warning System for Water-borne Disease Outbreaks
