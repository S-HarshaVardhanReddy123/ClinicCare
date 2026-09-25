const express = require("express");

const {
    getDoctorById,
    getDoctorAvailability,
} = require("../controllers/doctorController");

const router = express.Router();

// Get doctor details
router.get("/:doctorId", getDoctorById);

// Get doctor availability
router.get("/:doctorId/availability", getDoctorAvailability);

module.exports = router;