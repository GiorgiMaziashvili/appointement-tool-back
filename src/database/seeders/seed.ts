import "reflect-metadata";
import { AppDataSource } from "../data-source";
import { Doctor } from "../../entities/Doctor";
import { Appointment, AppointmentStatus } from "../../entities/Appointment";

const seedDoctors = [
  {
    id: 1,
    name: "დოქტორი სალომე ღოღობერიძე",
    specialty: "კარდიოლოგია",
    available: true,
    phone: "+995 (599) 12-34-67",
    email: "salome.ghoghoberidzde@clinic.com",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "დოქტორი ნიკოლოზ ბერიძე",
    specialty: "დერმატოლოგია",
    available: true,
    phone: "+995 (599) 23-45-78",
    email: "nikoloz.beridze@clinic.com",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "დოქტორი ნინო ხოშტარია",
    specialty: "პედიატრია",
    available: false,
    phone: "+995 (599) 34-56-89",
    email: "nino.khoshtaria@clinic.com",
    image:
      "https://images.unsplash.com/photo-1594824475317-d3be60f2e5e1?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "დოქტორი გიორგი მამაცაშვილი",
    specialty: "ორთოპედია",
    available: true,
    phone: "+995 (599) 45-67-90",
    email: "giorgi.mamatsashvili@clinic.com",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "დოქტორი თამარ ლობჟანიძე",
    specialty: "ნევროლოგია",
    available: true,
    phone: "+995 (599) 56-78-01",
    email: "tamar.lobzhanidze@clinic.com",
    image:
      "https://images.unsplash.com/photo-1551884303-5d4f4012dddb?w=300&h=300&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "დოქტორი ლევან წერეთელი",
    specialty: "კარდიოლოგია",
    available: false,
    phone: "+995 (599) 67-89-12",
    email: "levan.tsereteli@clinic.com",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
  },
];

const seedAppointments = [
  {
    doctorId: 1,
    doctorName: "დოქტორი სალომე ღოღობერიძე",
    doctorSpecialty: "კარდიოლოგია",
    date: "2024-01-15",
    time: "10:00",
    patientName: "გიორგი მაღრაძე",
    patientEmail: "giorgi.maghradze@email.com",
    patientPhone: "+995 (555) 11-22-33",
    reason: "რეგულარული შემოწმება",
    status: AppointmentStatus.SCHEDULED,
    createdAt: new Date("2024-01-10T09:00:00Z").toISOString(),
  },
  {
    doctorId: 2,
    doctorName: "დოქტორი ნიკოლოზ ბერიძე",
    doctorSpecialty: "დერმატოლოგია",
    date: "2024-01-16",
    time: "14:30",
    patientName: "ანა ჯავახიშვილი",
    patientEmail: "ana.javakhishvili@email.com",
    patientPhone: "+995 (555) 22-33-44",
    reason: "კანის პრობლემა",
    status: AppointmentStatus.COMPLETED,
    createdAt: new Date("2024-01-11T10:30:00Z").toISOString(),
  },
  {
    doctorId: 4,
    doctorName: "დოქტორი გიორგი მამაცაშვილი",
    doctorSpecialty: "ორთოპედია",
    date: "2024-01-17",
    time: "11:15",
    patientName: "დავით კვარაცხელია",
    patientEmail: "davit.kvaratskhelia@email.com",
    patientPhone: "+995 (555) 33-44-55",
    reason: "მუხლის ტკივილი",
    status: AppointmentStatus.SCHEDULED,
    createdAt: new Date("2024-01-12T14:15:00Z").toISOString(),
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Initialize database connection
    await AppDataSource.initialize();
    console.log("✅ Database connection established");

    // Clear existing data (delete child records first)
    const appointmentRepository = AppDataSource.getRepository(Appointment);
    const doctorRepository = AppDataSource.getRepository(Doctor);

    // First, delete all appointments
    const appointments = await appointmentRepository.find();
    if (appointments.length > 0) {
      await appointmentRepository.remove(appointments);
    }

    // Then, delete all doctors
    const doctors = await doctorRepository.find();
    if (doctors.length > 0) {
      await doctorRepository.remove(doctors);
    }
    
    console.log("🧹 Cleared existing data");

    // Seed doctors
    console.log("👨‍⚕️ Seeding doctors...");
    for (const doctorData of seedDoctors) {
      const doctor = doctorRepository.create(doctorData);
      await doctorRepository.save(doctor);
    }
    console.log(`✅ Seeded ${seedDoctors.length} doctors`);

    // Seed appointments
    console.log("📅 Seeding appointments...");
    for (const appointmentData of seedAppointments) {
      const appointment = appointmentRepository.create(appointmentData);
      await appointmentRepository.save(appointment);
    }
    console.log(`✅ Seeded ${seedAppointments.length} appointments`);

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    // Close database connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log("🔌 Database connection closed");
    }
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("✨ Seeding process completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding process failed:", error);
      process.exit(1);
    });
}

export { seedDatabase };
