const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

const PORT = process.env.PORT || 5001;

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5174",
        credentials: true,
    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// Root Route
// --------------------------------------------------

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "ClinicCare API is running",
        version: "1.0.0",
    });
});

// --------------------------------------------------
// Health Check
// --------------------------------------------------

app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.status(200).json({
            success: true,
            message: "ClinicCare API and database are healthy",
            database: "connected",
        });
    } catch (error) {
        console.error("Health check error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
            database: "disconnected",
        });
    }
});

// --------------------------------------------------
// API Routes
// --------------------------------------------------

app.use("/api/auth", authRoutes);

app.use("/api/hospitals", hospitalRoutes);

app.use("/api/doctors", doctorRoutes);

app.use("/api/appointments", appointmentRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/prescriptions", prescriptionRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/reviews", reviewRoutes);

// --------------------------------------------------
// 404 Handler
// --------------------------------------------------

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
        path: req.originalUrl,
    });
});

// --------------------------------------------------
// Global Error Handler
// --------------------------------------------------

app.use((error, req, res, next) => {
    console.error("Unhandled server error:", error);

    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});

// --------------------------------------------------
// Start Server
// --------------------------------------------------

const startServer = async () => {
    try {
        await pool.query("SELECT 1");

        console.log("Database connection verified");

        app.listen(PORT, () => {
            console.log(`ClinicCare backend running on port ${PORT}`);
            console.log(`API: http://localhost:${PORT}`);
            console.log(`Health: http://localhost:${PORT}/api/health`);
        });
    } catch (error) {
        console.error(
            "Failed to connect to the database:",
            error
        );

        process.exit(1);
    }
};

startServer();