import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./database/data-source";
import routes from "./routes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || "https://appointement-tool.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", routes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Medical Clinic API is running" });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log("Database connection established");

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(
        `📊 API documentation available at http://localhost:${PORT}/api`
      );
      console.log(`🏥 Medical Clinic Management System Backend`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log("Database connection closed");
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down server...");
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log("Database connection closed");
  }
  process.exit(0);
});

// Start the server
startServer();
