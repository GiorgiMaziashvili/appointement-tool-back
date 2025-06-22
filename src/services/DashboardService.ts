import { DoctorService } from "./DoctorService";
import { AppointmentService } from "./AppointmentService";
import { Appointment } from "../entities/Appointment";

export interface DashboardStats {
  totalDoctors: number;
  availableDoctors: number;
  totalAppointments: number;
  todayAppointments: number;
  recentAppointments: Appointment[];
}

export class DashboardService {
  private doctorService: DoctorService;
  private appointmentService: AppointmentService;

  constructor() {
    this.doctorService = new DoctorService();
    this.appointmentService = new AppointmentService();
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const [
      totalDoctors,
      availableDoctors,
      totalAppointments,
      todayAppointments,
      recentAppointments,
    ] = await Promise.all([
      this.doctorService.getTotalDoctorsCount(),
      this.doctorService.getAvailableDoctorsCount(),
      this.appointmentService.getTotalAppointmentsCount(),
      this.appointmentService.getTodayAppointmentsCount(),
      this.appointmentService.getRecentAppointments(5),
    ]);

    return {
      totalDoctors,
      availableDoctors,
      totalAppointments,
      todayAppointments,
      recentAppointments,
    };
  }
}
