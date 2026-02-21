# JalRakshak Dashboard - Component Architecture Guide

## Component Tree

```
app/gov-dashboard/page.jsx (Main Dashboard)
├── Header (Status badge + User profile)
├── KPI Section
│   ├── StatCard (Villages Monitored)
│   ├── StatCard (Active Reports)
│   ├── StatCard (High-Risk Zones)
│   ├── StatCard (Population at Risk)
│   └── StatCard (Active Inspections)
├── RiskHeatmap (12-village grid + simulation)
├── Two Column Layout
│   ├── Left Column
│   │   ├── PublicHealthFeed (5 reports)
│   │   └── HardwarePanel (5 sensor readings)
│   └── Right Column
│       ├── ImageReviewPanel (3 images)
│       └── CleaningRequests (4 requests)
├── TicketsTable (5 inspection tickets)
├── Two Column Layout (Bottom)
│   ├── AIInsights (2 analysis cards)
│   └── AlertBroadcast (SMS system)
└── Footer
```

---

## Component Details

### 1. StatCard.jsx
**Purpose**: Display KPI metrics with trends

**Props**:
```javascript
{
  title: string,           // "Total Villages Monitored"
  value: number|string,    // 47
  icon: string,            // "🏘️"
  trend: number,           // +2 (positive/negative)
  color: 'blue'|'red'|'green'|'orange'|'purple'
}
```

**Features**:
- Progress bar visualization
- Trend indicator (↑/↓)
- Glassmorphism styling
- Color-coded via prop

---

### 2. RiskHeatmap.jsx ⭐ CRITICAL
**Purpose**: Village risk visualization & outbreak simulation

**Props**:
```javascript
{
  villages: Array<{
    id: number,
    name: string,
    risk: number,          // 0-100 %
    cases: number,
    complaints: number
  }>,
  onOutbreakSimulate: async function
}
```

**Features**:
- 6-column responsive grid
- Color-coded: 🟢 <40%, 🟠 40-70%, 🔴 >70%
- Click village for details
- 🚨 Simulate Outbreak button
- Triggers KPI updates & new tickets

**Key Logic**:
```javascript
getRiskLevel(90)  // → { level: 'high', color: 'risk-red', badge: '🔴' }
```

---

### 3. PublicHealthFeed.jsx
**Purpose**: Live citizen health reports

**Props**:
```javascript
{
  reports: Array<{
    id: string,
    village: string,
    reporter: string,
    symptoms: string[],    // ['Diarrhea', 'Fever']
    severity: 'high'|'medium'|'low',
    timestamp: Date,
    status: 'new'|'reviewed'|'escalated'
  }>
}
```

**Features**:
- Scrollable list
- Color-coded severity
- Symptom chips
- Review/Escalate buttons
- Auto-scroll with new reports

---

### 4. TicketsTable.jsx
**Purpose**: Inspection ticket management

**Props**:
```javascript
{
  tickets: Array<{
    id: string,
    village: string,
    issueType: string,
    priority: 'critical'|'high'|'medium',
    status: 'pending'|'assigned'|'inspecting'|'resolved',
    assignedOfficer: string|null,
    createdAt: Date,
    notes: string
  }>
}
```

**Features**:
- Sortable table
- Officer assignment dropdown
- Status change select
- Expandable details
- Priority-based row coloring

**Status Flow**:
```
pending → assigned → inspecting → resolved
```

---

### 5. ImageReviewPanel.jsx
**Purpose**: Water sample image review & approval

**Props**:
```javascript
{
  images: Array<{
    id: string,
    village: string,
    url: string,
    description: string,
    severity: 'high'|'medium'|'low',
    location: string,
    uploadTime: Date,
    status: 'pending_review'|'approved'|'safe'|'escalated'
  }>
}
```

**Features**:
- Carousel navigation
- Large image display
- Thumbnail queue
- Three-action system:
  - ✓ Approve Inspection
  - 🛡️ Mark Safe
  - 📍 Escalate
- Status persistence across images

---

### 6. HardwarePanel.jsx
**Purpose**: Real-time pH & TDS monitoring

**Props**:
```javascript
{
  sensorData: Array<{
    village: string,
    ph: number,            // 0-14
    tds: number,           // ppm (parts per million)
    temperature: number,
    lastReading: Date,
    status: 'normal'|'warning'|'critical'
  }>
}
```

**Thresholds**:
- **pH**: Optimal 6.5-8.5 (auto-warns outside range)
- **TDS**: Good <500 ppm, Warning 500-800 ppm, Critical >800 ppm

**Features**:
- Progress bars for each metric
- Status-based card coloring
- Sensor detail buttons
- Warning badges

---

### 7. CleaningRequests.jsx
**Purpose**: Tank cleaning vendor management

**Props**:
```javascript
{
  requests: Array<{
    id: string,
    household: string,
    village: string,
    location: string,
    requestTime: Date,
    cleanerAssigned: string|null,
    status: 'pending'|'in_progress'|'completed',
    priority: 'critical'|'high'|'medium'
  }>
}
```

**Features**:
- Vendor assignment dropdown
- Status progression
- Mark completed button
- Priority-based sorting
- Notification trigger

---

### 8. AIInsights.jsx
**Purpose**: ML-powered risk factor analysis

**Props**:
```javascript
{
  insights: Array<{
    id: string,
    village: string,
    factors: Array<{
      factor: string,      // "Symptom Rise"
      impact: 'high'|'medium'|'low',
      description: string
    }>,
    confidence: number     // 0-100 %
  }>
}
```

**Confidence Badges**:
- 85%+ = Very High (🟢)
- 70-84% = High (🟠)
- <70% = Moderate (🔵)

**Features**:
- Expandable analysis cards
- Factor impact visualization
- Action recommendations
- Quick ticket creation

---

### 9. AlertBroadcast.jsx
**Purpose**: SMS alert broadcasting system

**Props**:
```javascript
{
  villages: Array<{ id: number, name: string }>
}
```

**Features**:
- Rich textarea for message
- Character counter (500 max, 160 recommended)
- Multi-select villages
- "Select All" toggle
- Broadcast history with date/time
- Recipient estimate (~5k per village)

**Alert Storage**:
- Local state in component
- Ready for backend integration
- Timestamp tracking

---

## Data Flow

### Data Sources Setup
```javascript
// In app/gov-dashboard/page.jsx

const [villages, setVillages] = useState(mockVillages)
// → Later: useEffect(() => { 
//    dashboardAPI.getVillageRisks().then(setVillages)
//  })
```

### Mock Data (lib/mockData.js)
```javascript
export const mockVillages = [...]
export const mockHealthReports = [...]
export const mockInspectionTickets = [...]
// All data already in one file
```

### Real Backend
```javascript
// Swap in lib/api.js calls
export const dashboardAPI = {
  getVillageRisks: () => fetchAPI('/dashboard/village-risks'),
  // etc.
}
```

---

## Styling Architecture

### CSS Variables (globals.css)
```css
.glass-effect          /* Glassmorphism base */
.glass-card            /* Glassmorphism + padding */
.grad-text             /* Cyan-to-blue text gradient */
.badge-pulse           /* Pulsing animation */
```

### Tailwind Classes Used
```
bg-dark-bg             /* Main background */
bg-dark-card           /* Card background */
text-gray-{100-600}    /* Text hierarchy */
from-cyan-500          /* Gradient starts */
to-blue-500            /* Gradient ends */
border-dark-border/50  /* Transparent borders */
```

### Color Theme (tailwind.config.js)
```javascript
'risk-green': '#10b981',   // Low risk
'risk-orange': '#f97316',  // Medium risk
'risk-red': '#ef4444',     // High risk
'accent-blue': '#3b82f6',  // Primary action
'accent-cyan': '#06b6d4',  // Highlight
```

---

## Adding New Components

### Step 1: Create Component File
```javascript
// components/gov/NewComponent.jsx
'use client'

export default function NewComponent({ prop1, prop2 }) {
  return (
    <div className="glass-card">
      {/* Component JSX */}
    </div>
  )
}
```

### Step 2: Add Props Interface (TypeScript optional)
```javascript
// Define expected props clearly
NewComponent.propTypes = {
  prop1: PropTypes.array,
  prop2: PropTypes.function,
}
```

### Step 3: Import in Dashboard
```javascript
// app/gov-dashboard/page.jsx
import NewComponent from '@/components/gov/NewComponent'

// In JSX:
<NewComponent prop1={data} prop2={handler} />
```

### Step 4: Add Mock Data
```javascript
// lib/mockData.js
export const mockNewData = [...]
```

---

## Interactivity Patterns

### 1. State Management
```javascript
const [selectedItem, setSelectedItem] = useState(null)
const [statuses, setStatuses] = useState({})

// Update nested state
setStatuses(prev => ({
  ...prev,
  [itemId]: newStatus
}))
```

### 2. Button Actions
```javascript
<button onClick={() => handleAction(itemId)}>
  Action
</button>
```

### 3. Form Inputs
```javascript
<select
  onChange={(e) => setState(e.target.value)}
  className="form-select"
>
  <option>Option</option>
</select>
```

### 4. Async Operations
```javascript
const handleAsync = async () => {
  try {
    const data = await api.fetch()
    setState(data)
  } catch (err) {
    console.error(err)
  }
}
```

---

## Performance Tips

### 1. Component Memoization
```javascript
import { memo } from 'react'

const StatCard = memo(({ title, value }) => (
  // Component
))
```

### 2. List Rendering
```javascript
{items.map(item => (
  <div key={item.id}>  {/* Always use key! */}
    {item.name}
  </div>
))}
```

### 3. Avoid Inline Functions
```javascript
// ❌ Bad
<button onClick={() => handleClick(id)}>

// ✅ Good
const handleClickBound = () => handleClick(id)
<button onClick={handleClickBound}>
```

---

## Testing Guide

### Component Isolation
```bash
# Test each component independently
# Export component from file
# Render with mock props
```

### Mock Data Testing
```javascript
import { mockVillages, getRiskLevel } from '@/lib/mockData'

// Verify risk levels
getRiskLevel(85)  // Should return high
getRiskLevel(45)  // Should return medium
```

### API Testing
```javascript
import { dashboardAPI } from '@/lib/api'

// Mock fetch before testing
global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockData)
  })
)
```

---

## Deployment Checklist

- [ ] All components render without errors
- [ ] Mock data loads correctly
- [ ] "Simulate Outbreak" button works
- [ ] All dropdowns populate
- [ ] Buttons trigger actions
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Images load (SVG data URIs)
- [ ] Colors display correctly
- [ ] Animations smooth

---

## Future Enhancements

### Short Term
- [ ] Real API integration
- [ ] Database persistence
- [ ] User authentication
- [ ] Dark/Light theme toggle

### Medium Term
- [ ] Real-time WebSocket updates
- [ ] Advanced filters & search
- [ ] Export to PDF/CSV
- [ ] Email notifications

### Long Term
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Custom dashboards per user
- [ ] Multi-language i18n

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hooks**: https://react.dev/reference/react/hooks
- **Vercel Deployment**: https://vercel.com/docs

---

**Happy Building! 🚀**

Questions? Check README.md or code comments.
