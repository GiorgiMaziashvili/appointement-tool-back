import { Router } from "express";
import { DoctorController } from "../controllers/DoctorController";
import { AppointmentController } from "../controllers/AppointmentController";
import { DashboardController } from "../controllers/DashboardController";

const router = Router();

// Initialize controllers
const doctorController = new DoctorController();
const appointmentController = new AppointmentController();
const dashboardController = new DashboardController();

// Doctor routes
router.get("/doctors", (req, res) => doctorController.getAllDoctors(req, res));
router.get("/doctors/:id", (req, res) =>
  doctorController.getDoctorById(req, res)
);
router.post("/doctors", (req, res) => doctorController.createDoctor(req, res));
router.put("/doctors/:id", (req, res) =>
  doctorController.updateDoctor(req, res)
);
router.delete("/doctors/:id", (req, res) =>
  doctorController.deleteDoctor(req, res)
);

// Appointment routes
router.get("/appointments", (req, res) =>
  appointmentController.getAllAppointments(req, res)
);
router.get("/appointments/:id", (req, res) =>
  appointmentController.getAppointmentById(req, res)
);
router.post("/appointments", (req, res) =>
  appointmentController.createAppointment(req, res)
);
router.put("/appointments/:id", (req, res) =>
  appointmentController.updateAppointment(req, res)
);
router.patch("/appointments/:id/status", (req, res) =>
  appointmentController.updateAppointmentStatus(req, res)
);
router.patch("/appointments/:id/cancel", (req, res) =>
  appointmentController.cancelAppointment(req, res)
);
router.delete("/appointments/:id", (req, res) =>
  appointmentController.deleteAppointment(req, res)
);

// Dashboard routes
router.get("/dashboard/stats", (req, res) =>
  dashboardController.getDashboardStats(req, res)
);

export default router;
