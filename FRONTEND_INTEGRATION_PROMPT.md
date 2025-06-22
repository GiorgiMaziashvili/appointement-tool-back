# Medical Clinic Frontend Integration & Deployment Guide

## 🎯 **FRONTEND INTEGRATION PROMPT**

_(Copy this entire prompt to AI Cursor for your React frontend)_

---

## **Task: Connect React Frontend to Medical Clinic Backend API**

I have a **fully operational Node.js backend** with TypeORM and Supabase integration running at `http://localhost:3001`. I need you to help me **replace all localStorage calls** in my React frontend with **API calls** to connect to this backend.

### **🔗 Backend API Endpoints (Ready to Use)**

#### **Doctors API**

```typescript
GET    /api/doctors                    // Get all doctors (with optional filters)
POST   /api/doctors                    // Create new doctor
PUT    /api/doctors/:id                // Update doctor
DELETE /api/doctors/:id                // Delete doctor

// Query Parameters for filtering:
// ?name=search_term                   // Filter by name (case-insensitive)
// ?specialty=specialty_name           // Filter by specialty
// ?available=true|false|all           // Filter by availability
```

#### **Appointments API**

```typescript
GET    /api/appointments               // Get all appointments (with optional filters)
POST   /api/appointments               // Create new appointment
PUT    /api/appointments/:id           // Update appointment
PATCH  /api/appointments/:id/status    // Update appointment status
PATCH  /api/appointments/:id/cancel    // Cancel appointment (sets status to 'cancelled')
DELETE /api/appointments/:id           // Delete appointment

// Query Parameters for filtering:
// ?status=scheduled|in-progress|completed|cancelled|all
// ?doctorName=search_term             // Filter by doctor name
// ?date=YYYY-MM-DD                    // Filter by specific date
// ?patientName=search_term            // Filter by patient name
// ?sortBy=date|doctorName|patientName|status
// ?sortOrder=ASC|DESC
```

#### **Dashboard API**

```typescript
GET / api / dashboard / stats; // Get dashboard statistics
// Returns: { totalDoctors, availableDoctors, totalAppointments, todayAppointments, recentAppointments[] }
```

### **📊 Data Structures**

#### **Doctor Object**

```typescript
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  available: boolean;
  phone: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
```

#### **Appointment Object**

```typescript
interface Appointment {
  id: number;
  doctorId: number;
  doctorName: string;
  doctorSpecialty: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  createdAt: string; // ISO format
  updatedAt: string;
}
```

### **🔄 Integration Tasks**

#### **1. Replace LocalStorage Functions**

Find and replace these localStorage functions with API calls:

```typescript
// BEFORE (localStorage):
const getDoctors = () => JSON.parse(localStorage.getItem("doctors") || "[]");
const addDoctor = (doctor) => {
  /* localStorage logic */
};
const updateDoctor = (id, updatedData) => {
  /* localStorage logic */
};
const deleteDoctor = (id) => {
  /* localStorage logic */
};

// AFTER (API calls):
const getDoctors = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(
    `http://localhost:3001/api/doctors?${queryParams}`
  );
  return await response.json();
};

const addDoctor = async (doctorData) => {
  const response = await fetch("http://localhost:3001/api/doctors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doctorData),
  });
  return await response.json();
};

const updateDoctor = async (id, updatedData) => {
  const response = await fetch(`http://localhost:3001/api/doctors/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return await response.json();
};

const deleteDoctor = async (id) => {
  await fetch(`http://localhost:3001/api/doctors/${id}`, {
    method: "DELETE",
  });
};
```

#### **2. Replace Appointment Functions**

```typescript
// BEFORE (localStorage):
const getAppointments = () =>
  JSON.parse(localStorage.getItem("appointments") || "[]");
const saveAppointment = (appointment) => {
  /* localStorage logic */
};
const updateAppointmentStatus = (id, status) => {
  /* localStorage logic */
};
const cancelAppointment = (id) => {
  /* localStorage logic */
};
const deleteAppointment = (id) => {
  /* localStorage logic */
};

// AFTER (API calls):
const getAppointments = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await fetch(
    `http://localhost:3001/api/appointments?${queryParams}`
  );
  return await response.json();
};

const saveAppointment = async (appointmentData) => {
  const url = appointmentData.id
    ? `http://localhost:3001/api/appointments/${appointmentData.id}`
    : "http://localhost:3001/api/appointments";

  const response = await fetch(url, {
    method: appointmentData.id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  return await response.json();
};

const updateAppointmentStatus = async (id, status) => {
  const response = await fetch(
    `http://localhost:3001/api/appointments/${id}/status`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );
  return await response.json();
};

const cancelAppointment = async (id) => {
  const response = await fetch(
    `http://localhost:3001/api/appointments/${id}/cancel`,
    {
      method: "PATCH",
    }
  );
  return await response.json();
};

const deleteAppointment = async (id) => {
  await fetch(`http://localhost:3001/api/appointments/${id}`, {
    method: "DELETE",
  });
};
```

#### **3. Add Dashboard API Integration**

```typescript
const getDashboardStats = async () => {
  const response = await fetch("http://localhost:3001/api/dashboard/stats");
  return await response.json();
};
```

#### **4. Error Handling & Loading States**

Add proper error handling and loading states:

```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleApiCall = async (apiFunction) => {
  try {
    setLoading(true);
    setError(null);
    const result = await apiFunction();
    return result;
  } catch (err) {
    setError(err.message);
    console.error("API Error:", err);
  } finally {
    setLoading(false);
  }
};
```

#### **5. Update React Hooks & Effects**

Replace localStorage useEffect hooks with API calls:

```typescript
// BEFORE:
useEffect(() => {
  const doctors = getDoctors();
  setDoctors(doctors);
}, []);

// AFTER:
useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const doctors = await getDoctors();
      setDoctors(doctors);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
  };
  fetchDoctors();
}, []);
```

### **⚡ Implementation Steps**

1. **Find all localStorage calls** in your React app
2. **Create an API service file** (e.g., `src/services/api.js`) with all the API functions above
3. **Replace localStorage imports** with API service imports
4. **Update all function calls** to be async/await
5. **Add error handling** for API failures
6. **Add loading states** for better UX
7. **Test all CRUD operations** (Create, Read, Update, Delete)

### **🔧 Environment Setup**

Create a `.env` file in your React project:

```env
REACT_APP_API_URL=http://localhost:3001
```

Use it in your API calls:

```typescript
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
```

### **✅ Testing Checklist**

- [ ] Doctors list loads from API
- [ ] Can add new doctor via API
- [ ] Can edit doctor via API
- [ ] Can delete doctor via API
- [ ] Can filter doctors by specialty/availability
- [ ] Appointments list loads from API
- [ ] Can create new appointment via API
- [ ] Can update appointment status via API
- [ ] Can cancel appointments via API
- [ ] Dashboard stats load correctly
- [ ] Error handling works for failed requests
- [ ] Loading states display properly

### **🎯 Expected Result**

After implementation, your React frontend will be **fully connected** to the backend database instead of localStorage, with all data persisting in PostgreSQL and available across browser sessions.

---

## 🚀 **RENDER.COM DEPLOYMENT GUIDE**

### **Deploy Backend to Render.com**

#### **1. Prepare for Deployment**

Create a `render.yaml` file in your backend root:

```yaml
services:
  - type: web
    name: medical-clinic-backend
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: DB_HOST
        value: aws-0-eu-north-1.pooler.supabase.com
      - key: DB_PORT
        value: 5432
      - key: DB_USERNAME
        value: postgres.twkhesmygojysvidmsfb
      - key: DB_PASSWORD
        fromDatabase:
          name: supabase-db
          property: password
      - key: DB_NAME
        value: postgres
      - key: DB_SSL
        value: true
      - key: FRONTEND_URL
        value: https://your-frontend-app.vercel.app
```

#### **2. Deploy Steps**

1. **Push to GitHub**:

   ```bash
   git init
   git add .
   git commit -m "Initial medical clinic backend"
   git branch -M main
   git remote add origin https://github.com/yourusername/medical-clinic-backend.git
   git push -u origin main
   ```

2. **Connect to Render**:

   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the backend repository

3. **Configure Service**:

   ```
   Name: medical-clinic-backend
   Environment: Node
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Add Environment Variables**:

   ```
   NODE_ENV=production
   PORT=10000
   DB_HOST=aws-0-eu-north-1.pooler.supabase.com
   DB_PORT=5432
   DB_USERNAME=postgres.twkhesmygojysvidmsfb
   DB_PASSWORD=gLvNAcy9nnpAgk3U
   DB_NAME=postgres
   DB_SSL=true
   FRONTEND_URL=https://your-frontend-domain.com
   ```

5. **Deploy**: Click "Create Web Service"

#### **3. Update Frontend API URL**

After deployment, update your React app's API URL:

```env
# For production
REACT_APP_API_URL=https://medical-clinic-backend.onrender.com

# For development
REACT_APP_API_URL=http://localhost:3001
```

#### **4. Test Deployment**

```bash
# Test health endpoint
curl https://medical-clinic-backend.onrender.com/health

# Test API endpoints
curl https://medical-clinic-backend.onrender.com/api/doctors
curl https://medical-clinic-backend.onrender.com/api/appointments
curl https://medical-clinic-backend.onrender.com/api/dashboard/stats
```

### **🔄 Continuous Deployment**

Every push to your main branch will automatically redeploy the backend.

### **📊 Monitor Deployment**

- View logs in Render dashboard
- Monitor performance and errors
- Check database connections

---

## 🎯 **QUICK START COMMANDS**

### **Backend (Already Running)**

```bash
cd qeto-project-back
npm run dev                    # Start development server
npm run seed                   # Seed database with sample data
```

### **Frontend Integration**

```bash
# In your React project
npm install axios             # Optional: for better HTTP handling
# Then replace localStorage with API calls using the guide above
```

### **Deployment**

```bash
# Push backend to GitHub
git add . && git commit -m "Ready for deployment"
git push origin main

# Deploy to Render.com using the guide above
```

---

## ✅ **Success Criteria**

After completing this integration:

1. ✅ **Frontend loads data from database** instead of localStorage
2. ✅ **All CRUD operations work** through API
3. ✅ **Data persists** across browser sessions
4. ✅ **Backend deployed** to Render.com
5. ✅ **Frontend connects** to production API
6. ✅ **Real-time updates** work properly

Your medical clinic management system will be **fully functional and deployed**! 🏥✨
