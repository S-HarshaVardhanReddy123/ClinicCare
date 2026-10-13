const express = require("express");

const {
    getLocations,
    getLocationById,
} = require("../controllers/locationController");

const router = express.Router();


// ============================================================
// PUBLIC LOCATION ROUTES
// ============================================================

router.get("/", getLocations);

router.get("/:locationId", getLocationById);


module.exports = router;