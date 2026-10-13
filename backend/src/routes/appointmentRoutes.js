const express = require("express");

const {
    createAppointment,
    getDoctorAvailability,
    getMyAppointments,
    getAppointmentById,
    getDoctorAppointments,
    updateAppointmentStatus,
} = require("../controllers/appointmentController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// ============================================================
// PATIENT APPOINTMENTS
// ============================================================

// Create appointment
router.post(
    "/",
    authenticateToken,
    authorizeRoles("PATIENT"),
    createAppointment
);


// Get logged-in patient's appointments
router.get(
    "/my",
    authenticateToken,
    authorizeRoles("PATIENT"),
    getMyAppointments
);


// Get available slots for a doctor
router.get(
    "/doctor/:doctorId/availability",
    authenticateToken,
    authorizeRoles("PATIENT"),
    getDoctorAvailability
);


// ============================================================
// DOCTOR APPOINTMENTS
// ============================================================

// Get appointments belonging to logged-in doctor
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
// APPOINTMENT DETAILS
// ============================================================

// Patient / Doctor / Admin can view an authorized appointment
router.get(
    "/:appointmentId",
    authenticateToken,
    getAppointmentById
);


module.exports = router;