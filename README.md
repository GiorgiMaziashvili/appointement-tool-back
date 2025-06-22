# Medical Clinic Management System - Backend

A complete Node.js backend with TypeORM and Supabase integration for managing medical clinic operations.

## 🚀 Features

- **Doctors Management**: CRUD operations for doctors with filtering by name, specialty, and availability
- **Appointments Management**: Complete appointment scheduling system with status tracking
- **Dashboard Statistics**: Real-time analytics and recent appointments
- **Database Integration**: PostgreSQL with Supabase cloud database
- **Type Safety**: Full TypeScript implementation with validation
- **REST API**: RESTful endpoints matching frontend localStorage structure

## 🛠️ Tech Stack

- **Runtime**: Node.js with Express.js
- **Database**: Supabase PostgreSQL with TypeORM
- **Language**: TypeScript
- **Validation**: class-validator and class-transformer
- **CORS**: Enabled for frontend integration

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Access to Supabase database

## 🔧 Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd qeto-project-back
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:

   ```env
   # Supabase Database Connection
   DB_HOST=db.twkhesmygojysvidmsfb.supabase.co
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=gLvNAcy9nnpAgk3U
   DB_NAME=postgres
   DB_SSL=true

   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # CORS Configuration
   FRONTEND_URL=http://localhost:3000
   ```

4. **Build the project**:

   ```bash
   npm run build
   ```

5. **Seed the database**:

   ```bash
   npm run seed
   ```

6. **Start the server**:

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📊 API Endpoints

### Doctors (`/api/doctors`)

- `GET /api/doctors` - Get all doctors (with optional filters)
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointments (`/api/appointments`)

- `GET /api/appointments` - Get all appointments (with optional filters)
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `PATCH /api/appointments/:id/status` - Update appointment status
- `PATCH /api/appointments/:id/cancel` - Cancel appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Dashboard (`/api/dashboard`)

- `GET /api/dashboard/stats` - Get dashboard statistics

## 🔍 Query Parameters

### Doctors Filtering

- `name` - Filter by doctor name (case-insensitive)
- `specialty` - Filter by specialty (contains)
- `available` - Filter by availability (true/false/all)

### Appointments Filtering

- `status` - Filter by status (scheduled/in-progress/completed/cancelled/all)
- `doctorName` - Filter by doctor name (case-insensitive)
- `date` - Filter by date (YYYY-MM-DD format)
- `patientName` - Filter by patient name (case-insensitive)
- `sortBy` - Sort by field (date/doctorName/patientName/status)
- `sortOrder` - Sort order (ASC/DESC)

## 🗄️ Database Schema

### Doctors Table

```sql
CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  available BOOLEAN DEFAULT true,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Appointments Table

```sql
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES doctors(id),
  doctor_name VARCHAR(255) NOT NULL,
  doctor_specialty VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  patient_name VARCHAR(255) NOT NULL,
  patient_email VARCHAR(255) NOT NULL,
  patient_phone VARCHAR(20) NOT NULL,
  reason TEXT,
  status VARCHAR(20) DEFAULT 'scheduled',
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server

# Database
npm run seed        # Seed database with sample data

# TypeORM Migrations
npm run migration:generate  # Generate new migration
npm run migration:run      # Run pending migrations
npm run migration:revert   # Revert last migration
```

## 🌱 Sample Data

The seed script creates:

- **6 doctors** with Georgian names and specialties
- **3 sample appointments** with different statuses
- Proper relationships between doctors and appointments

## 🔒 Environment Variables

| Variable       | Description           | Default                               |
| -------------- | --------------------- | ------------------------------------- |
| `DB_HOST`      | Database host         | `db.twkhesmygojysvidmsfb.supabase.co` |
| `DB_PORT`      | Database port         | `5432`                                |
| `DB_USERNAME`  | Database username     | `postgres`                            |
| `DB_PASSWORD`  | Database password     | Required                              |
| `DB_NAME`      | Database name         | `postgres`                            |
| `DB_SSL`       | Enable SSL            | `true`                                |
| `PORT`         | Server port           | `3001`                                |
| `NODE_ENV`     | Environment           | `development`                         |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000`               |

## 🚀 Deployment

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Start the server**:
   ```bash
   npm start
   ```

## 🔧 Development

1. **Start development server**:

   ```bash
   npm run dev
   ```

2. **The server will start on http://localhost:3001**

3. **Health check**: Visit http://localhost:3001/health

## 📝 API Response Format

### Success Response

```json
{
  "data": [...],
  "status": "success"
}
```

### Error Response

```json
{
  "error": "Error message",
  "details": [...] // Optional validation details
}
```

## 🤝 Frontend Integration

This backend is designed to work seamlessly with the React frontend. Simply replace localStorage calls with API calls:

```javascript
// Before (localStorage)
const doctors = JSON.parse(localStorage.getItem("doctors") || "[]");

// After (API)
const response = await fetch("http://localhost:3001/api/doctors");
const doctors = await response.json();
```

## 📄 License

MIT License - see LICENSE file for details.

## 👥 Support

For support, email your-email@example.com or create an issue in the repository.
