const pool = require("../config/db");

// ------------------------------------------------------------
// GET ALL ACTIVE DOCTORS
// ------------------------------------------------------------

const getAllDoctors = async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT
                d.id,
                d.name,
                d.qualification,
                d.specialization,
                d.experience_years,
                d.expertise,
                d.diseases_treated,
                d.languages,
                d.consultation_fee,
                d.is_verified,

                h.id AS hospital_id,
                h.name AS hospital_name,
                h.address AS hospital_address,

                l.state,
                l.district,
                l.city,

                COALESCE(AVG(r.doctor_rating), 0) AS rating,
                COUNT(r.id)::int AS review_count

            FROM doctors d

            JOIN hospitals h
                ON h.id = d.hospital_id

            JOIN locations l
                ON l.id = h.location_id

            LEFT JOIN reviews r
                ON r.doctor_id = d.id

            WHERE d.is_active = TRUE
              AND h.is_active = TRUE

            GROUP BY
                d.id,
                h.id,
                l.id

            ORDER BY
                COALESCE(AVG(r.doctor_rating), 0) DESC,
                d.name ASC
            `
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            doctors: result.rows,
        });
    } catch (error) {
        console.error("Get all doctors error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctors",
        });
    }
};


// ------------------------------------------------------------
// GET DOCTOR DETAILS
// ------------------------------------------------------------

const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const result = await pool.query(
            `
            SELECT
                d.id,
                d.name,
                d.qualification,
                d.specialization,
                d.experience_years,
                d.expertise,
                d.diseases_treated,
                d.languages,
                d.consultation_fee,
                d.is_verified,

                h.id AS hospital_id,
                h.name AS hospital_name,
                h.address AS hospital_address,
                h.phone AS hospital_phone,

                COALESCE(AVG(r.doctor_rating), 0) AS rating,
                COUNT(r.id)::int AS review_count

            FROM doctors d

            JOIN hospitals h
                ON h.id = d.hospital_id

            LEFT JOIN reviews r
                ON r.doctor_id = d.id

            WHERE d.id = $1
              AND d.is_active = TRUE

            GROUP BY
                d.id,
                h.id
            `,
            [doctorId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        return res.status(200).json({
            success: true,
            doctor: result.rows[0],
        });
    } catch (error) {
        console.error("Get doctor by ID error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctor details",
        });
    }
};


// ------------------------------------------------------------
// GET DOCTOR AVAILABILITY
// ------------------------------------------------------------

const getDoctorAvailability = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const result = await pool.query(
            `
            SELECT
                id,
                available_date,
                start_time,
                end_time,
                is_available
            FROM doctor_availability
            WHERE doctor_id = $1
              AND available_date >= CURRENT_DATE
              AND is_available = TRUE
            ORDER BY available_date ASC, start_time ASC
            `,
            [doctorId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            availability: result.rows,
        });
    } catch (error) {
        console.error("Get doctor availability error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctor availability",
        });
    }
};


module.exports = {
    getAllDoctors,
    getDoctorById,
    getDoctorAvailability,
};