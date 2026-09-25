const pool = require("../config/db");

// Get all hospitals for a location
const getHospitalsByLocation = async (req, res) => {
    try {
        const { locationId } = req.params;

        const result = await pool.query(
            `
            SELECT
                h.id,
                h.name,
                h.address,
                h.phone,
                h.email,
                h.website,
                h.emergency_available,
                h.description,
                COALESCE(AVG(r.hospital_rating), 0) AS rating,
                COUNT(r.id) AS review_count
            FROM hospitals h
            LEFT JOIN reviews r
                ON r.hospital_id = h.id
            WHERE h.location_id = $1
              AND h.is_active = TRUE
            GROUP BY h.id
            ORDER BY rating DESC, h.name ASC
            `,
            [locationId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            hospitals: result.rows,
        });
    } catch (error) {
        console.error("Get hospitals by location error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch hospitals",
        });
    }
};


// Get hospital details
const getHospitalById = async (req, res) => {
    try {
        const { hospitalId } = req.params;

        const hospitalResult = await pool.query(
            `
            SELECT
                h.id,
                h.name,
                h.address,
                h.phone,
                h.email,
                h.website,
                h.emergency_available,
                h.description,
                l.state,
                l.district,
                l.city,
                COALESCE(AVG(r.hospital_rating), 0) AS rating,
                COUNT(r.id) AS review_count
            FROM hospitals h
            JOIN locations l
                ON l.id = h.location_id
            LEFT JOIN reviews r
                ON r.hospital_id = h.id
            WHERE h.id = $1
              AND h.is_active = TRUE
            GROUP BY
                h.id,
                l.state,
                l.district,
                l.city
            `,
            [hospitalId]
        );

        if (hospitalResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found",
            });
        }

        const departmentsResult = await pool.query(
            `
            SELECT
                d.id,
                d.name,
                d.description
            FROM departments d
            JOIN hospital_departments hd
                ON hd.department_id = d.id
            WHERE hd.hospital_id = $1
            ORDER BY d.name ASC
            `,
            [hospitalId]
        );

        const facilitiesResult = await pool.query(
            `
            SELECT
                f.id,
                f.name,
                f.description
            FROM facilities f
            JOIN hospital_facilities hf
                ON hf.facility_id = f.id
            WHERE hf.hospital_id = $1
            ORDER BY f.name ASC
            `,
            [hospitalId]
        );

        return res.status(200).json({
            success: true,
            hospital: {
                ...hospitalResult.rows[0],
                departments: departmentsResult.rows,
                facilities: facilitiesResult.rows,
            },
        });
    } catch (error) {
        console.error("Get hospital by ID error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch hospital details",
        });
    }
};


// Get doctors belonging to a hospital
const getDoctorsByHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;

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
                COALESCE(AVG(r.doctor_rating), 0) AS rating,
                COUNT(r.id) AS review_count
            FROM doctors d
            LEFT JOIN reviews r
                ON r.doctor_id = d.id
            WHERE d.hospital_id = $1
              AND d.is_active = TRUE
            GROUP BY d.id
            ORDER BY rating DESC, d.name ASC
            `,
            [hospitalId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            doctors: result.rows,
        });
    } catch (error) {
        console.error("Get doctors by hospital error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctors",
        });
    }
};


module.exports = {
    getHospitalsByLocation,
    getHospitalById,
    getDoctorsByHospital,
};