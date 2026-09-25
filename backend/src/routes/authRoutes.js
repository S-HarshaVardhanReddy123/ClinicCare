const express = require("express");

const {
    register,
    login,
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Get currently authenticated user
router.get("/me", authenticateToken, async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Authenticated user",
        user: req.user,
    });
});

module.exports = router;