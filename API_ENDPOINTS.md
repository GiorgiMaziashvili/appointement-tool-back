# 🏥 Medical Clinic API - Quick Reference

## Base URL

- **Development**: `http://localhost:3001`
- **Production**: `https://your-backend.onrender.com`

---

## 👨‍⚕️ DOCTORS

| Method   | Endpoint           | Purpose         | Use For                |
| -------- | ------------------ | --------------- | ---------------------- |
| `GET`    | `/api/doctors`     | Get all doctors | Doctor list, dropdowns |
| `POST`   | `/api/doctors`     | Create doctor   | Add doctor form        |
| `PUT`    | `/api/doctors/:id` | Update doctor   | Edit doctor form       |
| `DELETE` | `/api/doctors/:id` | Delete doctor   | Delete button          |

**Filters**: `?name=search&specialty=cardiology&available=true`

---

## 📅 APPOINTMENTS

| Method   | Endpoint                       | Purpose              | Use For                     |
| -------- | ------------------------------ | -------------------- | --------------------------- |
| `GET`    | `/api/appointments`            | Get all appointments | Appointments list, calendar |
| `POST`   | `/api/appointments`            | Create appointment   | Book appointment form       |
| `PUT`    | `/api/appointments/:id`        | Update appointment   | Edit appointment            |
| `PATCH`  | `/api/appointments/:id/status` | Change status        | Status buttons              |
| `PATCH`  | `/api/appointments/:id/cancel` | Cancel appointment   | Cancel button               |
| `DELETE` | `/api/appointments/:id`        | Delete appointment   | Delete button               |

**Filters**: `?status=scheduled&doctorName=search&date=2024-01-15`
**Sorting**: `?sortBy=date&sortOrder=ASC`

---

## 📊 DASHBOARD

| Method | Endpoint               | Purpose        | Use For        |
| ------ | ---------------------- | -------------- | -------------- |
| `GET`  | `/api/dashboard/stats` | Get statistics | Dashboard page |

**Returns**: `{ totalDoctors, availableDoctors, totalAppointments, todayAppointments, recentAppointments[] }`

---

## 🔧 UTILITY

| Method | Endpoint  | Purpose             | Use For            |
| ------ | --------- | ------------------- | ------------------ |
| `GET`  | `/health` | Server health check | Connection testing |

---

## 📋 STATUS VALUES

- `"scheduled"` - Appointment is booked
- `"in-progress"` - Appointment is happening now
- `"completed"` - Appointment is finished
- `"cancelled"` - Appointment is cancelled

## 📅 DATA FORMATS

- **Date**: `YYYY-MM-DD` (e.g., "2024-01-15")
- **Time**: `HH:MM` (e.g., "14:30")
- **Available**: `true` / `false` / `"all"`
