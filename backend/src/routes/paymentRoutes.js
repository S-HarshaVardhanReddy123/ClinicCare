const express = require("express");

const {
    createPayment,
    getMyPayments,
    getPaymentById,
} = require("../controllers/paymentController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    authenticateToken,
    authorizeRoles("PATIENT"),
    createPayment
);

router.get(
    "/my",
    authenticateToken,
    authorizeRoles("PATIENT"),
    getMyPayments
);

router.get(
    "/:paymentId",
    authenticateToken,
    getPaymentById
);

module.exports = router;
