import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import {
  IsString,
  IsBoolean,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  Length,
} from "class-validator";
import { Appointment } from "./Appointment";

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  @Length(1, 255)
  name!: string;

  @Column({ type: "varchar", length: 100 })
  @IsString()
  @Length(1, 100)
  specialty!: string;

  @Column({ type: "boolean", default: true })
  @IsBoolean()
  available!: boolean;

  @Column({ type: "varchar", length: 20 })
  @IsString()
  @Length(1, 20)
  phone!: string;

  @Column({ type: "varchar", length: 255 })
  @IsEmail()
  @Length(1, 255)
  email!: string;

  @Column({ type: "text", nullable: true })
  @IsOptional()
  @IsString()
  image!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  appointments!: Appointment[];
}
