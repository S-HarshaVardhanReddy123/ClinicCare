const express = require("express");

const {
    getMyNotifications,
    markNotificationAsSent,
} = require("../controllers/notificationController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();


// Get logged-in user's notifications
router.get(
    "/my",
    authenticateToken,
    getMyNotifications
);


// Mark notification as sent
router.patch(
    "/:notificationId/sent",
    authenticateToken,
    markNotificationAsSent
);


module.exports = router;
