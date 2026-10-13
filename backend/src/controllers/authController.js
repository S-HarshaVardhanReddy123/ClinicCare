const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const pool = require("../config/db");

const {
    createPasswordResetToken,
} = require("../services/passwordResetService");


/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            role,
        } = req.body;

        if (
            !name ||
            !email ||
            !phone ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Name, email, phone and password are required",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 8 characters long",
            });
        }

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        /*
         * Public registration should create PATIENT accounts.
         * DOCTOR and ADMIN accounts should be created/managed
         * through the appropriate administrative workflow.
         */
        const accountRole = role || "PATIENT";

        if (accountRole !== "PATIENT") {
            return res.status(403).json({
                success: false,
                message:
                    "Public registration is available only for patients",
            });
        }

        const existingUser = await pool.query(
            `
            SELECT id
            FROM users
            WHERE LOWER(email) = LOWER($1)
               OR phone = $2
            `,
            [
                normalizedEmail,
                phone,
            ]
        );

        if (existingUser.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "An account with this email or phone already exists",
            });
        }

        const passwordHash = await bcrypt.hash(
            password,
            10
        );

        const result = await pool.query(
            `
            INSERT INTO users (
                name,
                email,
                phone,
                password_hash,
                role,
                is_active
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                'PATIENT',
                true
            )
            RETURNING
                id,
                name,
                email,
                phone,
                role,
                is_active,
                created_at
            `,
            [
                name.trim(),
                normalizedEmail,
                phone.trim(),
                passwordHash,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Registration successful",
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


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

const login = async (req, res) => {
    try {
        const {
            email,
            password,
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required",
            });
        }

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        const result = await pool.query(
            `
            SELECT
                id,
                name,
                email,
                phone,
                password_hash,
                role,
                is_active,
                created_at,
                updated_at
            FROM users
            WHERE LOWER(email) = LOWER($1)
            `,
            [normalizedEmail]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(403).json({
                success: false,
                message:
                    "Your account is inactive. Please contact the administrator.",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                is_active: user.is_active,
                created_at: user.created_at,
                updated_at: user.updated_at,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message: "Login failed",
        });
    }
};


/*
|--------------------------------------------------------------------------
| GET CURRENT USER
|--------------------------------------------------------------------------
*/

const getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT
                id,
                name,
                email,
                phone,
                role,
                is_active,
                created_at,
                updated_at
            FROM users
            WHERE id = $1
            `,
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user: result.rows[0],
        });
    } catch (error) {
        console.error("Get current user error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch user profile",
        });
    }
};


/*
|--------------------------------------------------------------------------
| FORGOT PASSWORD
|--------------------------------------------------------------------------
*/

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        const result = await pool.query(
            `
            SELECT
                id,
                name,
                email,
                is_active
            FROM users
            WHERE LOWER(email) = LOWER($1)
            `,
            [normalizedEmail]
        );

        /*
         * Do not reveal whether an account exists.
         */
        if (
            result.rows.length === 0 ||
            !result.rows[0].is_active
        ) {
            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, a password reset request has been created",
            });
        }

        const user = result.rows[0];

        const {
            token,
            tokenRecord,
        } = await createPasswordResetToken(
            user.id
        );

        /*
         * Development-only reset link.
         *
         * In production this token should be sent
         * through email/SMS instead of returning it.
         */
        const resetLink =
            `http://localhost:5174/reset-password?token=${token}`;

        return res.status(200).json({
            success: true,
            message:
                "If an account exists with this email, a password reset request has been created",

            development: {
                resetToken: token,
                resetLink,
                expiresAt: tokenRecord.expires_at,
            },
        });
    } catch (error) {
        console.error(
            "Forgot password error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to process password reset request",
        });
    }
};


/*
|--------------------------------------------------------------------------
| RESET PASSWORD
|--------------------------------------------------------------------------
*/

const resetPassword = async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            token,
            newPassword,
        } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "token and newPassword are required",
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 8 characters long",
            });
        }

        /*
         * Hash the supplied reset token.
         * Only the hash is stored in the database.
         */
        const tokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        await client.query("BEGIN");

        /*
         * Lock the token row so two simultaneous
         * reset requests cannot use the same token.
         */
        const tokenResult = await client.query(
            `
            SELECT
                id,
                user_id,
                expires_at
            FROM password_reset_tokens
            WHERE token_hash = $1
              AND used_at IS NULL
              AND expires_at > CURRENT_TIMESTAMP
            FOR UPDATE
            `,
            [tokenHash]
        );

        if (tokenResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message:
                    "Invalid, expired, or already used reset token",
            });
        }

        const resetToken = tokenResult.rows[0];

        /*
         * Generate the new bcrypt password hash.
         */
        const passwordHash = await bcrypt.hash(
            newPassword,
            10
        );

        /*
         * Update the user's password.
         */
        const userResult = await client.query(
            `
            UPDATE users
            SET
                password_hash = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
              AND is_active = true
            RETURNING
                id,
                name,
                email,
                role
            `,
            [
                passwordHash,
                resetToken.user_id,
            ]
        );

        if (userResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message:
                    "Unable to reset password for this account",
            });
        }

        /*
         * Mark this token as used.
         */
        await client.query(
            `
            UPDATE password_reset_tokens
            SET used_at = CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [resetToken.id]
        );

        /*
         * Invalidate any other unused reset tokens
         * belonging to this user.
         */
        await client.query(
            `
            UPDATE password_reset_tokens
            SET used_at = CURRENT_TIMESTAMP
            WHERE user_id = $1
              AND used_at IS NULL
              AND id <> $2
            `,
            [
                resetToken.user_id,
                resetToken.id,
            ]
        );

        await client.query("COMMIT");

        return res.status(200).json({
            success: true,
            message:
                "Password reset successfully",
        });
    } catch (error) {
        await client.query("ROLLBACK");

        console.error(
            "Reset password error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to reset password",
        });
    } finally {
        client.release();
    }
};


/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

module.exports = {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
};
