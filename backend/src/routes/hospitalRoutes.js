const express = require("express");

const {
    getHospitalsByLocation,
    getHospitalById,
    getDoctorsByHospital,
} = require("../controllers/hospitalController");

const router = express.Router();

// Get hospitals by location
router.get("/location/:locationId", getHospitalsByLocation);

// Get hospital details
router.get("/:hospitalId", getHospitalById);

// Get doctors belonging to a hospital
router.get("/:hospitalId/doctors", getDoctorsByHospital);

module.exports = router;
