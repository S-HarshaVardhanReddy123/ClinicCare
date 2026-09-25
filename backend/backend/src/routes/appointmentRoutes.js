const express = require("express");

const {
    createAppointment,
    getMyAppointments,
    getAppointmentById,
    getDoctorAppointments,
    updateAppointmentStatus,
} = require("../controllers/appointmentController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// ============================================================
// PATIENT ROUTES
// ============================================================

// Book appointment
router.post(
    "/",
    authenticateToken,
    authorizeRoles("PATIENT"),
    createAppointment
);


// Get patient's appointments
router.get(
    "/my",
    authenticateToken,
    authorizeRoles("PATIENT"),
    getMyAppointments
);


// ============================================================
// DOCTOR ROUTES
// ============================================================

// Get appointments assigned to logged-in doctor
router.get(
    "/doctor",
    authenticateToken,
    authorizeRoles("DOCTOR"),
    getDoctorAppointments
);


// Doctor accepts/rejects/completes appointment
router.patch(
    "/doctor/:appointmentId/status",
    authenticateToken,
    authorizeRoles("DOCTOR"),
    updateAppointmentStatus
);


// ============================================================
// SHARED ROUTE
// ============================================================

// Get one appointment
router.get(
    "/:appointmentId",
    authenticateToken,
    getAppointmentById
);


module.exports = router;