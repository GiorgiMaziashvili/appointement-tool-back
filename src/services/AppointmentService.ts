import { Repository } from "typeorm";
import { Appointment, AppointmentStatus } from "../entities/Appointment";
import { AppDataSource } from "../database/data-source";

export interface AppointmentFilters {
  status?: AppointmentStatus | string;
  doctorName?: string;
  date?: string;
  patientName?: string;
  sortBy?: "date" | "doctorName" | "patientName" | "status";
  sortOrder?: "ASC" | "DESC";
}

export class AppointmentService {
  private appointmentRepository: Repository<Appointment>;

  constructor() {
    this.appointmentRepository = AppDataSource.getRepository(Appointment);
  }

  async getAllAppointments(
    filters?: AppointmentFilters
  ): Promise<Appointment[]> {
    const queryBuilder =
      this.appointmentRepository.createQueryBuilder("appointment");

    if (filters?.status && filters.status !== "all") {
      queryBuilder.andWhere("appointment.status = :status", {
        status: filters.status,
      });
    }

    if (filters?.doctorName) {
      queryBuilder.andWhere(
        "LOWER(appointment.doctorName) LIKE LOWER(:doctorName)",
        {
          doctorName: `%${filters.doctorName}%`,
        }
      );
    }

    if (filters?.date) {
      queryBuilder.andWhere("appointment.date = :date", {
        date: filters.date,
      });
    }

    if (filters?.patientName) {
      queryBuilder.andWhere(
        "LOWER(appointment.patientName) LIKE LOWER(:patientName)",
        {
          patientName: `%${filters.patientName}%`,
        }
      );
    }

    // Apply sorting
    if (filters?.sortBy) {
      const order = filters.sortOrder || "ASC";
      queryBuilder.orderBy(`appointment.${filters.sortBy}`, order);
    } else {
      queryBuilder.orderBy("appointment.date", "DESC");
      queryBuilder.addOrderBy("appointment.time", "DESC");
    }

    return await queryBuilder.getMany();
  }

  async getAppointmentById(id: number): Promise<Appointment | null> {
    return await this.appointmentRepository.findOne({
      where: { id },
      relations: ["doctor"],
    });
  }

  async createAppointment(
    appointmentData: Partial<Appointment>
  ): Promise<Appointment> {
    // Set createdAt as ISO string to match frontend format
    const appointmentWithTimestamp = {
      ...appointmentData,
      createdAt: new Date().toISOString(),
      status: appointmentData.status || AppointmentStatus.SCHEDULED,
    };

    const appointment = this.appointmentRepository.create(
      appointmentWithTimestamp
    );
    return await this.appointmentRepository.save(appointment);
  }

  async updateAppointment(
    id: number,
    appointmentData: Partial<Appointment>
  ): Promise<Appointment | null> {
    await this.appointmentRepository.update(id, appointmentData);
    return await this.getAppointmentById(id);
  }

  async updateAppointmentStatus(
    id: number,
    status: AppointmentStatus
  ): Promise<Appointment | null> {
    await this.appointmentRepository.update(id, { status });
    return await this.getAppointmentById(id);
  }

  async cancelAppointment(id: number): Promise<Appointment | null> {
    return await this.updateAppointmentStatus(id, AppointmentStatus.CANCELLED);
  }

  async deleteAppointment(id: number): Promise<boolean> {
    const result = await this.appointmentRepository.delete(id);
    return result.affected !== 0;
  }

  async getTotalAppointmentsCount(): Promise<number> {
    return await this.appointmentRepository.count();
  }

  async getTodayAppointmentsCount(): Promise<number> {
    const today = new Date().toISOString().split("T")[0];
    return await this.appointmentRepository.count({
      where: { date: today },
    });
  }

  async getRecentAppointments(limit: number = 5): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      order: { createdAt: "DESC" },
      take: limit,
    });
  }
}
