import { DataSource } from "typeorm";
import { Doctor } from "../entities/Doctor";
import { Appointment } from "../entities/Appointment";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "aws-0-eu-north-1.pooler.supabase.com",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres.twkhesmygojysvidmsfb",
  password: process.env.DB_PASSWORD || "gLvNAcy9nnpAgk3U",
  database: process.env.DB_NAME || "postgres",
  ssl:
    process.env.DB_SSL === "true"
      ? {
          rejectUnauthorized: false,
        }
      : false,
  synchronize: true, // Set to false in production
  logging: process.env.NODE_ENV === "development",
  entities: [Doctor, Appointment],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: ["src/database/subscribers/*.ts"],
});

export default AppDataSource;
