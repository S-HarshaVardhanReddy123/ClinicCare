const pool = require("../config/db");

const createReview = async (req, res) => {
    try {
        const patientId = req.user.userId;

        const {
            appointmentId,
            hospitalRating,
            doctorRating,
            comment,
        } = req.body;

        if (!appointmentId) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID is required",
            });
        }

        if (
            hospitalRating === undefined &&
            doctorRating === undefined
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "At least one hospital or doctor rating is required",
            });
        }

        if (
            hospitalRating !== undefined &&
            hospitalRating !== null &&
            (!Number.isInteger(Number(hospitalRating)) ||
                Number(hospitalRating) < 1 ||
                Number(hospitalRating) > 5)
        ) {
            return res.status(400).json({
                success: false,
                message: "Hospital rating must be between 1 and 5",
            });
        }

        if (
            doctorRating !== undefined &&
            doctorRating !== null &&
            (!Number.isInteger(Number(doctorRating)) ||
                Number(doctorRating) < 1 ||
                Number(doctorRating) > 5)
        ) {
            return res.status(400).json({
                success: false,
                message: "Doctor rating must be between 1 and 5",
            });
        }

        const appointmentResult = await pool.query(
            `
            SELECT
                a.id,
                a.patient_id,
                a.doctor_id,
                a.hospital_id,
                a.status
            FROM appointments a
            WHERE a.id = $1
            `,
            [appointmentId]
        );

        if (appointmentResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        const appointment = appointmentResult.rows[0];

        if (Number(appointment.patient_id) !== Number(patientId)) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to review this appointment",
            });
        }

        if (appointment.status !== "COMPLETED") {
            return res.status(400).json({
                success: false,
                message:
                    "A review can only be submitted for a completed appointment",
            });
        }

        const existingReview = await pool.query(
            `
            SELECT id
            FROM reviews
            WHERE appointment_id = $1
            `,
            [appointmentId]
        );

        if (existingReview.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "A review has already been submitted for this appointment",
            });
        }

        const result = await pool.query(
            `
            INSERT INTO reviews (
                patient_id,
                appointment_id,
                hospital_id,
                doctor_id,
                hospital_rating,
                doctor_rating,
                comment
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
            )
            RETURNING
                id,
                patient_id,
                appointment_id,
                hospital_id,
                doctor_id,
                hospital_rating,
                doctor_rating,
                comment,
                created_at,
                updated_at
            `,
            [
                patientId,
                appointmentId,
                appointment.hospital_id,
                appointment.doctor_id,
                hospitalRating ?? null,
                doctorRating ?? null,
                comment ?? null,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Review submitted successfully",
            review: result.rows[0],
        });
    } catch (error) {
        console.error("Create review error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create review",
        });
    }
};

const getMyReviews = async (req, res) => {
    try {
        const patientId = req.user.userId;

        const result = await pool.query(
            `
            SELECT
                r.id,
                r.appointment_id,
                r.hospital_id,
                h.name AS hospital_name,
                r.doctor_id,
                d.name AS doctor_name,
                r.hospital_rating,
                r.doctor_rating,
                r.comment,
                r.created_at,
                r.updated_at
            FROM reviews r
            JOIN hospitals h
                ON h.id = r.hospital_id
            JOIN doctors d
                ON d.id = r.doctor_id
            WHERE r.patient_id = $1
            ORDER BY r.created_at DESC
            `,
            [patientId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            reviews: result.rows,
        });
    } catch (error) {
        console.error("Get my reviews error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch reviews",
        });
    }
};

const getReviewById = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user.userId;
        const role = req.user.role;

        const result = await pool.query(
            `
            SELECT
                r.id,
                r.patient_id,
                r.appointment_id,
                r.hospital_id,
                h.name AS hospital_name,
                r.doctor_id,
                d.name AS doctor_name,
                r.hospital_rating,
                r.doctor_rating,
                r.comment,
                r.created_at,
                r.updated_at
            FROM reviews r
            JOIN hospitals h
                ON h.id = r.hospital_id
            JOIN doctors d
                ON d.id = r.doctor_id
            WHERE r.id = $1
            `,
            [reviewId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        const review = result.rows[0];

        if (
            role !== "ADMIN" &&
            Number(review.patient_id) !== Number(userId) &&
            role !== "DOCTOR"
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this review",
            });
        }

        return res.status(200).json({
            success: true,
            review,
        });
    } catch (error) {
        console.error("Get review error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch review",
        });
    }
};

const getDoctorReviews = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        const result = await pool.query(
            `
            SELECT
                r.id,
                r.appointment_id,
                r.hospital_rating,
                r.doctor_rating,
                r.comment,
                r.created_at,
                u.name AS patient_name
            FROM reviews r
            JOIN users u
                ON u.id = r.patient_id
            WHERE r.doctor_id = $1
            ORDER BY r.created_at DESC
            `,
            [doctorId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            reviews: result.rows,
        });
    } catch (error) {
        console.error("Get doctor reviews error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctor reviews",
        });
    }
};

const getHospitalReviews = async (req, res) => {
    try {
        const hospitalId = req.params.hospitalId;

        const result = await pool.query(
            `
            SELECT
                r.id,
                r.appointment_id,
                r.hospital_rating,
                r.doctor_rating,
                r.comment,
                r.created_at,
                u.name AS patient_name,
                d.name AS doctor_name
            FROM reviews r
            JOIN users u
                ON u.id = r.patient_id
            JOIN doctors d
                ON d.id = r.doctor_id
            WHERE r.hospital_id = $1
            ORDER BY r.created_at DESC
            `,
            [hospitalId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            reviews: result.rows,
        });
    } catch (error) {
        console.error("Get hospital reviews error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch hospital reviews",
        });
    }
};

module.exports = {
    createReview,
    getMyReviews,
    getReviewById,
    getDoctorReviews,
    getHospitalReviews,
};
