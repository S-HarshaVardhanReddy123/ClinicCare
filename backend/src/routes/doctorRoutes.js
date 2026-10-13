const express = require("express");

const {
    getAllDoctors,
    getDoctorById,
    getDoctorAvailability,
} = require("../controllers/doctorController");

const router = express.Router();

// ------------------------------------------------------------
// GET ALL DOCTORS
// ------------------------------------------------------------

router.get("/", getAllDoctors);

// ------------------------------------------------------------
// GET DOCTOR DETAILS
// ------------------------------------------------------------

router.get("/:doctorId", getDoctorById);

// ------------------------------------------------------------
// GET DOCTOR AVAILABILITY
// ------------------------------------------------------------

router.get("/:doctorId/availability", getDoctorAvailability);

module.exports = router;