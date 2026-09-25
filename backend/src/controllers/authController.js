const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// ------------------------------------------------------------
// REGISTER
// ------------------------------------------------------------

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            role = "PATIENT",
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required",
            });
        }

        const allowedRoles = ["PATIENT", "DOCTOR", "ADMIN"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user role",
            });
        }

        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email.toLowerCase()]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
            });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users
                (name, email, phone, password_hash, role)
             VALUES
                ($1, $2, $3, $4, $5)
             RETURNING id, name, email, phone, role, is_active, created_at`,
            [
                name,
                email.toLowerCase(),
                phone || null,
                passwordHash,
                role,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: result.rows[0],
        });
    } catch (error) {
        console.error("Registration error:", error);

        return res.status(500).json({
            success: false,
            message: "Registration failed",
        });
    }
};

// ------------------------------------------------------------
// LOGIN
// ------------------------------------------------------------

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user
        const result = await pool.query(
            `SELECT
                id,
                name,
                email,
                phone,
                password_hash,
                role,
                is_active
             FROM users
             WHERE email = $1`,
            [email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = result.rows[0];

        // Check whether account is active
        if (!user.is_active) {
            return res.status(403).json({
                success: false,
                message: "User account is inactive",
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        // Remove password hash before sending response
        delete user.password_hash;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};

// ------------------------------------------------------------
// EXPORT
// ------------------------------------------------------------

module.exports = {
    register,
    login,
};