const express = require("express");

const {
    createPrescription,
    getMyPrescriptions,
    getPrescriptionById,
    getDoctorPrescriptions,
} = require("../controllers/prescriptionController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();


// ============================================================
// DOCTOR - CREATE PRESCRIPTION
// ============================================================

router.post(
    "/",
    authenticateToken,
    authorizeRoles("DOCTOR"),
    createPrescription
);


// ============================================================
// PATIENT - GET MY PRESCRIPTIONS
// ============================================================

router.get(
    "/my",
    authenticateToken,
    authorizeRoles("PATIENT"),
    getMyPrescriptions
);


// ============================================================
// DOCTOR - GET MY PRESCRIPTIONS
// ============================================================

router.get(
    "/doctor",
    authenticateToken,
    authorizeRoles("DOCTOR"),
    getDoctorPrescriptions
);


// ============================================================
// GET PRESCRIPTION BY ID
// PATIENT / DOCTOR / ADMIN
// ============================================================

router.get(
    "/:prescriptionId",
    authenticateToken,
    getPrescriptionById
);


module.exports = router;
