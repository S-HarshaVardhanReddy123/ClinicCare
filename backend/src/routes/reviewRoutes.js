const express = require("express");

const {
    createReview,
    getMyReviews,
    getReviewById,
    getDoctorReviews,
    getHospitalReviews,
} = require("../controllers/reviewController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    authorizeRoles("PATIENT"),
    createReview
);

router.get(
    "/my",
    authenticateToken,
    authorizeRoles("PATIENT"),
    getMyReviews
);

router.get(
    "/doctor/:doctorId",
    getDoctorReviews
);

router.get(
    "/hospital/:hospitalId",
    getHospitalReviews
);

router.get(
    "/:reviewId",
    authenticateToken,
    getReviewById
);

module.exports = router;
