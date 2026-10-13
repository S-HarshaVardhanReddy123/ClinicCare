const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

// ============================================================
// ROUTES
// ============================================================

const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");


// ============================================================
// APP CONFIGURATION
// ============================================================

const app = express();

const PORT = process.env.PORT || 5001;


// ============================================================
// CORS CONFIGURATION
// ============================================================

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
];

app.use(
    cors({
        origin: (origin, callback) => {

            // Allow requests without an Origin header.
            // Useful for PowerShell, Postman and server-side requests.
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error(`CORS origin not allowed: ${origin}`)
            );
        },

        credentials: true,
    })
);


// ============================================================
// BODY PARSING
// ============================================================

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);


// ============================================================
// ROOT API
// ============================================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "ClinicCare API is running",
        version: "1.0.0",
    });
});


// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/api/health", async (req, res) => {
    try {

        await pool.query("SELECT 1");

        return res.status(200).json({
            success: true,
            message: "ClinicCare API and database are healthy",
            database: "connected",
        });

    } catch (error) {

        console.error(
            "Health check error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Database connection failed",
            database: "disconnected",
        });
    }
});


// ============================================================
// API ROUTES
// ============================================================

// Authentication
app.use(
    "/api/auth",
    authRoutes
);


// Locations
app.use(
    "/api/locations",
    locationRoutes
);


// Hospitals
app.use(
    "/api/hospitals",
    hospitalRoutes
);


// Doctors
app.use(
    "/api/doctors",
    doctorRoutes
);


// Appointments
app.use(
    "/api/appointments",
    appointmentRoutes
);


// Notifications
app.use(
    "/api/notifications",
    notificationRoutes
);


// Prescriptions
app.use(
    "/api/prescriptions",
    prescriptionRoutes
);


// Payments
app.use(
    "/api/payments",
    paymentRoutes
);


// Reviews
app.use(
    "/api/reviews",
    reviewRoutes
);


// Admin
app.use(
    "/api/admin",
    adminRoutes
);


// ============================================================
// 404 HANDLER
// ============================================================

app.use((req, res) => {

    return res.status(404).json({
        success: false,
        message: "API endpoint not found",
        path: req.originalUrl,
    });
});


// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use((error, req, res, next) => {

    console.error(
        "Unhandled server error:",
        error
    );

    // CORS error
    if (
        error.message &&
        error.message.startsWith(
            "CORS origin not allowed"
        )
    ) {

        return res.status(403).json({
            success: false,
            message: "CORS origin not allowed",
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
});


// ============================================================
// START SERVER
// ============================================================

const startServer = async () => {

    try {

        // Verify PostgreSQL connection
        await pool.query("SELECT 1");

        console.log(
            "Database connection verified"
        );

        app.listen(
            PORT,
            () => {

                console.log(
                    `ClinicCare backend running on port ${PORT}`
                );

                console.log(
                    `API: http://localhost:${PORT}`
                );

                console.log(
                    `Health: http://localhost:${PORT}/api/health`
                );

                console.log(
                    `Allowed frontend origins: ${allowedOrigins.join(", ")}`
                );
            }
        );

    } catch (error) {

        console.error(
            "Failed to connect to the database:",
            error
        );

        process.exit(1);
    }
};


// ============================================================
// START APPLICATION
// ============================================================

startServer();