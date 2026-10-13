const express = require("express");

const {
    getDashboardStats,

    getUsers,
    getUserById,
    updateUserStatus,

    getHospitals,
    getHospitalById,
    createHospital,
    updateHospital,
    updateHospitalStatus,

    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    updateDoctorStatus,
    verifyDoctor,

    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,

    getReviews,
    getReviewById,
    deleteReview,

    getAppointments,
    getAppointmentById,
    updateAppointmentStatus,
} = require("../controllers/adminController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRoles("ADMIN"));

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get("/dashboard", getDashboardStats);

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

router.get("/users", getUsers);
router.get("/users/:userId", getUserById);
router.patch("/users/:userId/status", updateUserStatus);

/*
|--------------------------------------------------------------------------
| Hospitals
|--------------------------------------------------------------------------
*/

router.get("/hospitals", getHospitals);
router.get("/hospitals/:hospitalId", getHospitalById);
router.post("/hospitals", createHospital);
router.patch("/hospitals/:hospitalId", updateHospital);
router.patch(
    "/hospitals/:hospitalId/status",
    updateHospitalStatus
);

/*
|--------------------------------------------------------------------------
| Doctors
|--------------------------------------------------------------------------
*/

router.get("/doctors", getDoctors);
router.get("/doctors/:doctorId", getDoctorById);
router.post("/doctors", createDoctor);
router.patch("/doctors/:doctorId", updateDoctor);
router.patch(
    "/doctors/:doctorId/status",
    updateDoctorStatus
);
router.patch(
    "/doctors/:doctorId/verify",
    verifyDoctor
);

/*
|--------------------------------------------------------------------------
| Locations
|--------------------------------------------------------------------------
*/

router.get("/locations", getLocations);
router.get("/locations/:locationId", getLocationById);
router.post("/locations", createLocation);
router.patch("/locations/:locationId", updateLocation);
router.delete("/locations/:locationId", deleteLocation);

/*
|--------------------------------------------------------------------------
| Reviews
|--------------------------------------------------------------------------
*/

router.get("/reviews", getReviews);
router.get("/reviews/:reviewId", getReviewById);
router.delete("/reviews/:reviewId", deleteReview);

/*
|--------------------------------------------------------------------------
| Appointments
|--------------------------------------------------------------------------
*/

router.get("/appointments", getAppointments);

router.get(
    "/appointments/:appointmentId",
    getAppointmentById
);

router.patch(
    "/appointments/:appointmentId/status",
    updateAppointmentStatus
);

module.exports = router;
