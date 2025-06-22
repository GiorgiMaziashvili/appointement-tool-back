import { Request, Response } from "express";
import {
  AppointmentService,
  AppointmentFilters,
} from "../services/AppointmentService";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Appointment, AppointmentStatus } from "../entities/Appointment";

export class AppointmentController {
  private appointmentService: AppointmentService;

  constructor() {
    this.appointmentService = new AppointmentService();
  }

  async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const filters: AppointmentFilters = {
        status: req.query.status as AppointmentStatus | string,
        doctorName: req.query.doctorName as string,
        date: req.query.date as string,
        patientName: req.query.patientName as string,
        sortBy: req.query.sortBy as
          | "date"
          | "doctorName"
          | "patientName"
          | "status",
        sortOrder: req.query.sortOrder as "ASC" | "DESC",
      };

      // Remove undefined values
      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof AppointmentFilters] === undefined) {
          delete filters[key as keyof AppointmentFilters];
        }
      });

      const appointments = await this.appointmentService.getAllAppointments(
        filters
      );
      res.json(appointments);
    } catch (error) {
      console.error("Error getting appointments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAppointmentById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid appointment ID" });
        return;
      }

      const appointment = await this.appointmentService.getAppointmentById(id);
      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      res.json(appointment);
    } catch (error) {
      console.error("Error getting appointment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createAppointment(req: Request, res: Response): Promise<void> {
    try {
      const appointmentData = plainToClass(Appointment, req.body);
      const errors = await validate(appointmentData);

      if (errors.length > 0) {
        res.status(400).json({
          error: "Validation failed",
          details: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
        return;
      }

      const appointment = await this.appointmentService.createAppointment(
        req.body
      );
      res.status(201).json(appointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateAppointment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid appointment ID" });
        return;
      }

      const appointment = await this.appointmentService.updateAppointment(
        id,
        req.body
      );
      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      res.json(appointment);
    } catch (error) {
      console.error("Error updating appointment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateAppointmentStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid appointment ID" });
        return;
      }

      const { status } = req.body;
      if (!Object.values(AppointmentStatus).includes(status)) {
        res.status(400).json({ error: "Invalid status" });
        return;
      }

      const appointment = await this.appointmentService.updateAppointmentStatus(
        id,
        status
      );
      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      res.json(appointment);
    } catch (error) {
      console.error("Error updating appointment status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async cancelAppointment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid appointment ID" });
        return;
      }

      const appointment = await this.appointmentService.cancelAppointment(id);
      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      res.json(appointment);
    } catch (error) {
      console.error("Error canceling appointment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteAppointment(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid appointment ID" });
        return;
      }

      const deleted = await this.appointmentService.deleteAppointment(id);
      if (!deleted) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
