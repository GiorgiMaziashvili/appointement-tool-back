import { Request, Response } from "express";
import { DoctorService, DoctorFilters } from "../services/DoctorService";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Doctor } from "../entities/Doctor";

export class DoctorController {
  private doctorService: DoctorService;

  constructor() {
    this.doctorService = new DoctorService();
  }

  async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const filters: DoctorFilters = {
        name: req.query.name as string,
        specialty: req.query.specialty as string,
        available: req.query.available as string | boolean,
      };

      // Remove undefined values
      Object.keys(filters).forEach((key) => {
        if (filters[key as keyof DoctorFilters] === undefined) {
          delete filters[key as keyof DoctorFilters];
        }
      });

      const doctors = await this.doctorService.getAllDoctors(filters);
      res.json(doctors);
    } catch (error) {
      console.error("Error getting doctors:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getDoctorById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid doctor ID" });
        return;
      }

      const doctor = await this.doctorService.getDoctorById(id);
      if (!doctor) {
        res.status(404).json({ error: "Doctor not found" });
        return;
      }

      res.json(doctor);
    } catch (error) {
      console.error("Error getting doctor:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createDoctor(req: Request, res: Response): Promise<void> {
    try {
      const doctorData = plainToClass(Doctor, req.body);
      const errors = await validate(doctorData);

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

      const doctor = await this.doctorService.createDoctor(req.body);
      res.status(201).json(doctor);
    } catch (error) {
      console.error("Error creating doctor:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateDoctor(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid doctor ID" });
        return;
      }

      const doctor = await this.doctorService.updateDoctor(id, req.body);
      if (!doctor) {
        res.status(404).json({ error: "Doctor not found" });
        return;
      }

      res.json(doctor);
    } catch (error) {
      console.error("Error updating doctor:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteDoctor(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid doctor ID" });
        return;
      }

      const deleted = await this.doctorService.deleteDoctor(id);
      if (!deleted) {
        res.status(404).json({ error: "Doctor not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
