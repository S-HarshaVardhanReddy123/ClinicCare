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

router.post(
    "/",
    authenticateToken,
    authorizeRoles("PATIENT"),
    createAppointment
);

router.get(
    "/my",
    authenticateToken,
    authorizeRoles("PATIENT"),
    getMyAppointments
);


// ============================================================
// DOCTOR ROUTES
// ============================================================

router.get(
    "/doctor",
    authenticateToken,
    authorizeRoles("DOCTOR"),
    getDoctorAppointments
);

router.patch(
    "/doctor/:appointmentId/status",
    authenticateToken,
    authorizeRoles("DOCTOR"),
    updateAppointmentStatus
);


// ============================================================
// SHARED APPOINTMENT DETAILS
// ============================================================

router.get(
    "/:appointmentId",
    authenticateToken,
    getAppointmentById
);


module.exports = router;