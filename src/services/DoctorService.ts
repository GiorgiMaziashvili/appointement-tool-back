import { Repository } from "typeorm";
import { Doctor } from "../entities/Doctor";
import { AppDataSource } from "../database/data-source";

export interface DoctorFilters {
  name?: string;
  specialty?: string;
  available?: boolean | string;
}

export class DoctorService {
  private doctorRepository: Repository<Doctor>;

  constructor() {
    this.doctorRepository = AppDataSource.getRepository(Doctor);
  }

  async getAllDoctors(filters?: DoctorFilters): Promise<Doctor[]> {
    const queryBuilder = this.doctorRepository.createQueryBuilder("doctor");

    if (filters?.name) {
      queryBuilder.andWhere("LOWER(doctor.name) LIKE LOWER(:name)", {
        name: `%${filters.name}%`,
      });
    }

    if (filters?.specialty) {
      queryBuilder.andWhere("LOWER(doctor.specialty) LIKE LOWER(:specialty)", {
        specialty: `%${filters.specialty}%`,
      });
    }

    if (filters?.available !== undefined && filters?.available !== "all") {
      const isAvailable =
        filters.available === true || filters.available === "true";
      queryBuilder.andWhere("doctor.available = :available", {
        available: isAvailable,
      });
    }

    return await queryBuilder.getMany();
  }

  async getDoctorById(id: number): Promise<Doctor | null> {
    return await this.doctorRepository.findOne({
      where: { id },
      relations: ["appointments"],
    });
  }

  async createDoctor(doctorData: Partial<Doctor>): Promise<Doctor> {
    const doctor = this.doctorRepository.create(doctorData);
    return await this.doctorRepository.save(doctor);
  }

  async updateDoctor(
    id: number,
    doctorData: Partial<Doctor>
  ): Promise<Doctor | null> {
    await this.doctorRepository.update(id, doctorData);
    return await this.getDoctorById(id);
  }

  async deleteDoctor(id: number): Promise<boolean> {
    const result = await this.doctorRepository.delete(id);
    return result.affected !== 0;
  }

  async getAvailableDoctorsCount(): Promise<number> {
    return await this.doctorRepository.count({
      where: { available: true },
    });
  }

  async getTotalDoctorsCount(): Promise<number> {
    return await this.doctorRepository.count();
  }
}
