import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import {
  IsString,
  IsInt,
  IsEmail,
  IsIn,
  IsOptional,
  Length,
  IsDateString,
} from "class-validator";
import { Doctor } from "./Doctor";

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "int" })
  @IsInt()
  doctorId!: number;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @Length(1, 255)
  doctorName!: string;

  @Column({ type: "varchar", length: 100 })
  @IsString()
  @Length(1, 100)
  doctorSpecialty!: string;

  @Column({ type: "date" })
  @IsString()
  date!: string; // Keep as string to match frontend format (YYYY-MM-DD)

  @Column({ type: "time" })
  @IsString()
  time!: string; // Keep as string to match frontend format (HH:MM)

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @Length(1, 255)
  patientName!: string;

  @Column({ type: "varchar", length: 255 })
  @IsEmail()
  @Length(1, 255)
  patientEmail!: string;

  @Column({ type: "varchar", length: 20 })
  @IsString()
  @Length(1, 20)
  patientPhone!: string;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  @IsString()
  reason!: string;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  @IsIn(Object.values(AppointmentStatus))
  status!: AppointmentStatus;

  @Column({ type: "timestamp" })
  @IsDateString()
  createdAt!: string; // Keep as string to match frontend ISO format

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: "doctorId" })
  doctor!: Doctor;
}
