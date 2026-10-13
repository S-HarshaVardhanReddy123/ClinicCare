const pool = require("../config/db");

/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
*/

const getDashboardStats = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                (SELECT COUNT(*) FROM users) AS total_users,
                (SELECT COUNT(*) FROM users WHERE role = 'PATIENT') AS total_patients,
                (SELECT COUNT(*) FROM users WHERE role = 'DOCTOR') AS total_doctors,
                (SELECT COUNT(*) FROM users WHERE role = 'ADMIN') AS total_admins,
                (SELECT COUNT(*) FROM hospitals) AS total_hospitals,
                (SELECT COUNT(*) FROM hospitals WHERE is_active = true) AS active_hospitals,
                (SELECT COUNT(*) FROM locations) AS total_locations,
                (SELECT COUNT(*) FROM appointments) AS total_appointments,
                (SELECT COUNT(*) FROM appointments WHERE status = 'PENDING') AS pending_appointments,
                (SELECT COUNT(*) FROM appointments WHERE status = 'ACCEPTED') AS accepted_appointments,
                (SELECT COUNT(*) FROM appointments WHERE status = 'COMPLETED') AS completed_appointments,
                (SELECT COUNT(*) FROM appointments WHERE status = 'CANCELLED') AS cancelled_appointments,
                (SELECT COUNT(*) FROM reviews) AS total_reviews,
                (SELECT COUNT(*) FROM prescriptions) AS total_prescriptions,
                (SELECT COUNT(*) FROM payments) AS total_payments
        `);

        return res.status(200).json({
            success: true,
            statistics: result.rows[0],
        });
    } catch (error) {
        console.error("Get admin dashboard stats error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics",
        });
    }
};


/*
|--------------------------------------------------------------------------
| ADMIN USER MANAGEMENT
|--------------------------------------------------------------------------
*/

const getUsers = async (req, res) => {
    try {
        const result = await pool.query(`
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
            ORDER BY created_at DESC
        `);

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            users: result.rows,
        });
    } catch (error) {
        console.error("Get admin users error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

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
        console.error("Get admin user error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch user",
        });
    }
};


const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { is_active } = req.body;

        if (typeof is_active !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "is_active must be a boolean value",
            });
        }

        if (Number(userId) === Number(req.user.id) && !is_active) {
            return res.status(400).json({
                success: false,
                message: "Admin cannot deactivate their own account",
            });
        }

        const result = await pool.query(
            `
            UPDATE users
            SET
                is_active = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING
                id,
                name,
                email,
                phone,
                role,
                is_active,
                created_at,
                updated_at
            `,
            [is_active, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User status updated successfully",
            user: result.rows[0],
        });
    } catch (error) {
        console.error("Update user status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update user status",
        });
    }
};


/*
|--------------------------------------------------------------------------
| ADMIN HOSPITAL MANAGEMENT
|--------------------------------------------------------------------------
*/

const getHospitals = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                h.id,
                h.location_id,
                h.name,
                h.address,
                h.phone,
                h.email,
                h.website,
                h.emergency_available,
                h.description,
                h.is_active,
                h.created_at,
                h.updated_at,

                l.state,
                l.district,
                l.city,

                COALESCE(
                    ROUND(AVG(r.hospital_rating)::numeric, 2),
                    0
                ) AS rating,

                COUNT(r.id) AS review_count

            FROM hospitals h

            INNER JOIN locations l
                ON h.location_id = l.id

            LEFT JOIN reviews r
                ON h.id = r.hospital_id
                AND r.hospital_rating IS NOT NULL

            GROUP BY
                h.id,
                l.id

            ORDER BY h.created_at DESC
        `);

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            hospitals: result.rows,
        });
    } catch (error) {
        console.error("Get admin hospitals error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch hospitals",
        });
    }
};


const getHospitalById = async (req, res) => {
    try {
        const { hospitalId } = req.params;

        const result = await pool.query(
            `
            SELECT
                h.id,
                h.location_id,
                h.name,
                h.address,
                h.phone,
                h.email,
                h.website,
                h.emergency_available,
                h.description,
                h.is_active,
                h.created_at,
                h.updated_at,

                l.state,
                l.district,
                l.city,

                COALESCE(
                    ROUND(AVG(r.hospital_rating)::numeric, 2),
                    0
                ) AS rating,

                COUNT(r.id) AS review_count

            FROM hospitals h

            INNER JOIN locations l
                ON h.location_id = l.id

            LEFT JOIN reviews r
                ON h.id = r.hospital_id
                AND r.hospital_rating IS NOT NULL

            WHERE h.id = $1

            GROUP BY
                h.id,
                l.id
            `,
            [hospitalId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found",
            });
        }

        return res.status(200).json({
            success: true,
            hospital: result.rows[0],
        });
    } catch (error) {
        console.error("Get admin hospital error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch hospital",
        });
    }
};


const createHospital = async (req, res) => {
    try {
        const {
            location_id,
            name,
            address,
            phone,
            email,
            website,
            emergency_available,
            description,
        } = req.body;

        if (!location_id || !name || !address) {
            return res.status(400).json({
                success: false,
                message: "location_id, name and address are required",
            });
        }

        const locationCheck = await pool.query(
            `
            SELECT id
            FROM locations
            WHERE id = $1
            `,
            [location_id]
        );

        if (locationCheck.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Location not found",
            });
        }

        const result = await pool.query(
            `
            INSERT INTO hospitals (
                location_id,
                name,
                address,
                phone,
                email,
                website,
                emergency_available,
                description
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8
            )
            RETURNING
                id,
                location_id,
                name,
                address,
                phone,
                email,
                website,
                emergency_available,
                description,
                is_active,
                created_at,
                updated_at
            `,
            [
                location_id,
                name,
                address,
                phone || null,
                email || null,
                website || null,
                emergency_available ?? false,
                description || null,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Hospital created successfully",
            hospital: result.rows[0],
        });
    } catch (error) {
        console.error("Create admin hospital error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create hospital",
        });
    }
};


const updateHospital = async (req, res) => {
    try {
        const { hospitalId } = req.params;

        const {
            location_id,
            name,
            address,
            phone,
            email,
            website,
            emergency_available,
            description,
        } = req.body;

        if (!location_id || !name || !address) {
            return res.status(400).json({
                success: false,
                message: "location_id, name and address are required",
            });
        }

        const locationCheck = await pool.query(
            `
            SELECT id
            FROM locations
            WHERE id = $1
            `,
            [location_id]
        );

        if (locationCheck.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Location not found",
            });
        }

        const result = await pool.query(
            `
            UPDATE hospitals
            SET
                location_id = $1,
                name = $2,
                address = $3,
                phone = $4,
                email = $5,
                website = $6,
                emergency_available = $7,
                description = $8,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $9
            RETURNING
                id,
                location_id,
                name,
                address,
                phone,
                email,
                website,
                emergency_available,
                description,
                is_active,
                created_at,
                updated_at
            `,
            [
                location_id,
                name,
                address,
                phone || null,
                email || null,
                website || null,
                emergency_available ?? false,
                description || null,
                hospitalId,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hospital updated successfully",
            hospital: result.rows[0],
        });
    } catch (error) {
        console.error("Update admin hospital error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update hospital",
        });
    }
};


const updateHospitalStatus = async (req, res) => {
    try {
        const { hospitalId } = req.params;
        const { is_active } = req.body;

        if (typeof is_active !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "is_active must be a boolean value",
            });
        }

        const result = await pool.query(
            `
            UPDATE hospitals
            SET
                is_active = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING
                id,
                name,
                is_active,
                updated_at
            `,
            [is_active, hospitalId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hospital not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Hospital status updated successfully",
            hospital: result.rows[0],
        });
    } catch (error) {
        console.error("Update hospital status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update hospital status",
        });
    }
};


/*
|--------------------------------------------------------------------------
| ADMIN DOCTOR MANAGEMENT
|--------------------------------------------------------------------------
*/

const getDoctors = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                d.id,
                d.user_id,
                d.hospital_id,
                d.name,
                d.qualification,
                d.specialization,
                d.experience_years,
                d.expertise,
                d.diseases_treated,
                d.languages,
                d.consultation_fee,
                d.is_verified,
                d.is_active,
                d.created_at,
                d.updated_at,

                u.email,
                u.phone,

                h.name AS hospital_name,

                l.state,
                l.district,
                l.city,

                COALESCE(
                    ROUND(AVG(r.doctor_rating)::numeric, 2),
                    0
                ) AS rating,

                COUNT(r.id) AS review_count

            FROM doctors d

            INNER JOIN users u
                ON d.user_id = u.id

            INNER JOIN hospitals h
                ON d.hospital_id = h.id

            INNER JOIN locations l
                ON h.location_id = l.id

            LEFT JOIN reviews r
                ON d.id = r.doctor_id
                AND r.doctor_rating IS NOT NULL

            GROUP BY
                d.id,
                u.id,
                h.id,
                l.id

            ORDER BY d.created_at DESC
        `);

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            doctors: result.rows,
        });
    } catch (error) {
        console.error("Get admin doctors error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctors",
        });
    }
};


const getDoctorById = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const result = await pool.query(
            `
            SELECT
                d.id,
                d.user_id,
                d.hospital_id,
                d.name,
                d.qualification,
                d.specialization,
                d.experience_years,
                d.expertise,
                d.diseases_treated,
                d.languages,
                d.consultation_fee,
                d.is_verified,
                d.is_active,
                d.created_at,
                d.updated_at,

                u.email,
                u.phone,

                h.name AS hospital_name,
                h.address AS hospital_address,

                l.state,
                l.district,
                l.city,

                COALESCE(
                    ROUND(AVG(r.doctor_rating)::numeric, 2),
                    0
                ) AS rating,

                COUNT(r.id) AS review_count

            FROM doctors d

            INNER JOIN users u
                ON d.user_id = u.id

            INNER JOIN hospitals h
                ON d.hospital_id = h.id

            INNER JOIN locations l
                ON h.location_id = l.id

            LEFT JOIN reviews r
                ON d.id = r.doctor_id
                AND r.doctor_rating IS NOT NULL

            WHERE d.id = $1

            GROUP BY
                d.id,
                u.id,
                h.id,
                l.id
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
        console.error("Get admin doctor error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctor",
        });
    }
};


const createDoctor = async (req, res) => {
    const client = await pool.connect();

    try {
        const {
            user_id,
            hospital_id,
            name,
            qualification,
            specialization,
            experience_years,
            expertise,
            diseases_treated,
            languages,
            consultation_fee,
            is_verified,
            is_active,
        } = req.body;

        if (
            !user_id ||
            !hospital_id ||
            !name ||
            !qualification ||
            !specialization
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "user_id, hospital_id, name, qualification and specialization are required",
            });
        }

        await client.query("BEGIN");

        const userCheck = await client.query(
            `
            SELECT id, role
            FROM users
            WHERE id = $1
            `,
            [user_id]
        );

        if (userCheck.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const existingDoctor = await client.query(
            `
            SELECT id
            FROM doctors
            WHERE user_id = $1
            `,
            [user_id]
        );

        if (existingDoctor.rows.length > 0) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                success: false,
                message: "A doctor profile already exists for this user",
            });
        }

        const hospitalCheck = await client.query(
            `
            SELECT id
            FROM hospitals
            WHERE id = $1
            `,
            [hospital_id]
        );

        if (hospitalCheck.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                success: false,
                message: "Hospital not found",
            });
        }

        await client.query(
            `
            UPDATE users
            SET
                role = 'DOCTOR',
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [user_id]
        );

        const result = await client.query(
            `
            INSERT INTO doctors (
                user_id,
                hospital_id,
                name,
                qualification,
                specialization,
                experience_years,
                expertise,
                diseases_treated,
                languages,
                consultation_fee,
                is_verified,
                is_active
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11,
                $12
            )
            RETURNING *
            `,
            [
                user_id,
                hospital_id,
                name,
                qualification,
                specialization,
                experience_years ?? 0,
                expertise || null,
                diseases_treated || null,
                languages || null,
                consultation_fee ?? 0,
                is_verified ?? false,
                is_active ?? true,
            ]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            success: true,
            message: "Doctor created successfully",
            doctor: result.rows[0],
        });
    } catch (error) {
        await client.query("ROLLBACK");

        console.error("Create admin doctor error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create doctor",
        });
    } finally {
        client.release();
    }
};


const updateDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const {
            hospital_id,
            name,
            qualification,
            specialization,
            experience_years,
            expertise,
            diseases_treated,
            languages,
            consultation_fee,
        } = req.body;

        if (
            !hospital_id ||
            !name ||
            !qualification ||
            !specialization
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "hospital_id, name, qualification and specialization are required",
            });
        }

        const hospitalCheck = await pool.query(
            `
            SELECT id
            FROM hospitals
            WHERE id = $1
            `,
            [hospital_id]
        );

        if (hospitalCheck.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Hospital not found",
            });
        }

        const result = await pool.query(
            `
            UPDATE doctors
            SET
                hospital_id = $1,
                name = $2,
                qualification = $3,
                specialization = $4,
                experience_years = $5,
                expertise = $6,
                diseases_treated = $7,
                languages = $8,
                consultation_fee = $9,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $10
            RETURNING *
            `,
            [
                hospital_id,
                name,
                qualification,
                specialization,
                experience_years ?? 0,
                expertise || null,
                diseases_treated || null,
                languages || null,
                consultation_fee ?? 0,
                doctorId,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor updated successfully",
            doctor: result.rows[0],
        });
    } catch (error) {
        console.error("Update admin doctor error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update doctor",
        });
    }
};


const updateDoctorStatus = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { is_active } = req.body;

        if (typeof is_active !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "is_active must be a boolean value",
            });
        }

        const result = await pool.query(
            `
            UPDATE doctors
            SET
                is_active = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING
                id,
                name,
                is_active,
                updated_at
            `,
            [is_active, doctorId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor status updated successfully",
            doctor: result.rows[0],
        });
    } catch (error) {
        console.error("Update doctor status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update doctor status",
        });
    }
};


const verifyDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { is_verified } = req.body;

        if (typeof is_verified !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "is_verified must be a boolean value",
            });
        }

        const result = await pool.query(
            `
            UPDATE doctors
            SET
                is_verified = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING
                id,
                name,
                is_verified,
                updated_at
            `,
            [is_verified, doctorId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Doctor verification status updated successfully",
            doctor: result.rows[0],
        });
    } catch (error) {
        console.error("Verify doctor error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update doctor verification",
        });
    }
};


/*
|--------------------------------------------------------------------------
| ADMIN LOCATION MANAGEMENT
|--------------------------------------------------------------------------
*/

const getLocations = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                l.id,
                l.state,
                l.district,
                l.city,
                l.created_at,

                COUNT(DISTINCT h.id) AS hospital_count

            FROM locations l

            LEFT JOIN hospitals h
                ON h.location_id = l.id

            GROUP BY l.id

            ORDER BY
                l.state ASC,
                l.district ASC,
                l.city ASC
        `);

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            locations: result.rows,
        });
    } catch (error) {
        console.error("Get admin locations error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch locations",
        });
    }
};


const getLocationById = async (req, res) => {
    try {
        const { locationId } = req.params;

        const result = await pool.query(
            `
            SELECT
                l.id,
                l.state,
                l.district,
                l.city,
                l.created_at,

                COUNT(DISTINCT h.id) AS hospital_count

            FROM locations l

            LEFT JOIN hospitals h
                ON h.location_id = l.id

            WHERE l.id = $1

            GROUP BY l.id
            `,
            [locationId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Location not found",
            });
        }

        return res.status(200).json({
            success: true,
            location: result.rows[0],
        });
    } catch (error) {
        console.error("Get admin location error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch location",
        });
    }
};


const createLocation = async (req, res) => {
    try {
        const {
            state,
            district,
            city,
        } = req.body;

        if (!state || !district || !city) {
            return res.status(400).json({
                success: false,
                message: "state, district and city are required",
            });
        }

        const duplicateCheck = await pool.query(
            `
            SELECT id
            FROM locations
            WHERE LOWER(state) = LOWER($1)
              AND LOWER(district) = LOWER($2)
              AND LOWER(city) = LOWER($3)
            `,
            [
                state,
                district,
                city,
            ]
        );

        if (duplicateCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "This location already exists",
            });
        }

        const result = await pool.query(
            `
            INSERT INTO locations (
                state,
                district,
                city
            )
            VALUES (
                $1,
                $2,
                $3
            )
            RETURNING
                id,
                state,
                district,
                city,
                created_at
            `,
            [
                state,
                district,
                city,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Location created successfully",
            location: result.rows[0],
        });
    } catch (error) {
        console.error("Create admin location error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create location",
        });
    }
};


const updateLocation = async (req, res) => {
    try {
        const { locationId } = req.params;

        const {
            state,
            district,
            city,
        } = req.body;

        if (!state || !district || !city) {
            return res.status(400).json({
                success: false,
                message: "state, district and city are required",
            });
        }

        const duplicateCheck = await pool.query(
            `
            SELECT id
            FROM locations
            WHERE LOWER(state) = LOWER($1)
              AND LOWER(district) = LOWER($2)
              AND LOWER(city) = LOWER($3)
              AND id <> $4
            `,
            [
                state,
                district,
                city,
                locationId,
            ]
        );

        if (duplicateCheck.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: "This location already exists",
            });
        }

        const result = await pool.query(
            `
            UPDATE locations
            SET
                state = $1,
                district = $2,
                city = $3
            WHERE id = $4
            RETURNING
                id,
                state,
                district,
                city,
                created_at
            `,
            [
                state,
                district,
                city,
                locationId,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Location not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Location updated successfully",
            location: result.rows[0],
        });
    } catch (error) {
        console.error("Update admin location error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update location",
        });
    }
};


const deleteLocation = async (req, res) => {
    try {
        const { locationId } = req.params;

        const hospitalCheck = await pool.query(
            `
            SELECT COUNT(*) AS count
            FROM hospitals
            WHERE location_id = $1
            `,
            [locationId]
        );

        if (Number(hospitalCheck.rows[0].count) > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "Cannot delete location because hospitals are associated with it",
            });
        }

        const result = await pool.query(
            `
            DELETE FROM locations
            WHERE id = $1
            RETURNING
                id,
                state,
                district,
                city
            `,
            [locationId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Location not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Location deleted successfully",
            location: result.rows[0],
        });
    } catch (error) {
        console.error("Delete admin location error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete location",
        });
    }
};


/*
|--------------------------------------------------------------------------
| ADMIN REVIEW MANAGEMENT
|--------------------------------------------------------------------------
*/

const getReviews = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                r.id,
                r.patient_id,
                r.appointment_id,
                r.hospital_id,
                r.doctor_id,
                r.hospital_rating,
                r.doctor_rating,
                r.comment,
                r.created_at,
                r.updated_at,

                p.name AS patient_name,
                p.email AS patient_email,

                h.name AS hospital_name,

                d.name AS doctor_name,
                d.specialization

            FROM reviews r

            INNER JOIN users p
                ON r.patient_id = p.id

            LEFT JOIN hospitals h
                ON r.hospital_id = h.id

            LEFT JOIN doctors d
                ON r.doctor_id = d.id

            ORDER BY r.created_at DESC
        `);

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            reviews: result.rows,
        });
    } catch (error) {
        console.error("Get admin reviews error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch reviews",
        });
    }
};


const getReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const result = await pool.query(
            `
            SELECT
                r.id,
                r.patient_id,
                r.appointment_id,
                r.hospital_id,
                r.doctor_id,
                r.hospital_rating,
                r.doctor_rating,
                r.comment,
                r.created_at,
                r.updated_at,

                p.name AS patient_name,
                p.email AS patient_email,

                h.name AS hospital_name,

                d.name AS doctor_name,
                d.specialization

            FROM reviews r

            INNER JOIN users p
                ON r.patient_id = p.id

            LEFT JOIN hospitals h
                ON r.hospital_id = h.id

            LEFT JOIN doctors d
                ON r.doctor_id = d.id

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

        return res.status(200).json({
            success: true,
            review: result.rows[0],
        });
    } catch (error) {
        console.error("Get admin review error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch review",
        });
    }
};


const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const result = await pool.query(
            `
            DELETE FROM reviews
            WHERE id = $1
            RETURNING
                id,
                patient_id,
                appointment_id,
                hospital_id,
                doctor_id,
                hospital_rating,
                doctor_rating,
                comment
            `,
            [reviewId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
            review: result.rows[0],
        });
    } catch (error) {
        console.error("Delete admin review error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete review",
        });
    }
};


/*
|--------------------------------------------------------------------------
| ADMIN APPOINTMENT MANAGEMENT
|--------------------------------------------------------------------------
*/

const getAppointments = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                a.id,
                a.appointment_date,
                a.appointment_time,
                a.reason,
                a.status,
                a.doctor_notes,
                a.created_at,
                a.updated_at,

                p.id AS patient_id,
                p.name AS patient_name,
                p.email AS patient_email,
                p.phone AS patient_phone,

                d.id AS doctor_id,
                d.name AS doctor_name,
                d.specialization,
                d.qualification,

                h.id AS hospital_id,
                h.name AS hospital_name,

                l.state,
                l.district,
                l.city

            FROM appointments a

            INNER JOIN users p
                ON a.patient_id = p.id

            INNER JOIN doctors d
                ON a.doctor_id = d.id

            INNER JOIN hospitals h
                ON a.hospital_id = h.id

            INNER JOIN locations l
                ON h.location_id = l.id

            ORDER BY
                a.appointment_date DESC,
                a.appointment_time DESC,
                a.id DESC
        `);

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            appointments: result.rows,
        });
    } catch (error) {
        console.error("Get admin appointments error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
        });
    }
};


const getAppointmentById = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const result = await pool.query(
            `
            SELECT
                a.id,
                a.appointment_date,
                a.appointment_time,
                a.reason,
                a.status,
                a.doctor_notes,
                a.created_at,
                a.updated_at,

                p.id AS patient_id,
                p.name AS patient_name,
                p.email AS patient_email,
                p.phone AS patient_phone,

                d.id AS doctor_id,
                d.name AS doctor_name,
                d.specialization,
                d.qualification,
                d.experience_years,
                d.consultation_fee,

                h.id AS hospital_id,
                h.name AS hospital_name,
                h.address AS hospital_address,
                h.phone AS hospital_phone,

                l.state,
                l.district,
                l.city

            FROM appointments a

            INNER JOIN users p
                ON a.patient_id = p.id

            INNER JOIN doctors d
                ON a.doctor_id = d.id

            INNER JOIN hospitals h
                ON a.hospital_id = h.id

            INNER JOIN locations l
                ON h.location_id = l.id

            WHERE a.id = $1
            `,
            [appointmentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        return res.status(200).json({
            success: true,
            appointment: result.rows[0],
        });
    } catch (error) {
        console.error("Get admin appointment error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch appointment",
        });
    }
};


const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "PENDING",
            "ACCEPTED",
            "REJECTED",
            "COMPLETED",
            "CANCELLED",
            "NO_SHOW",
        ];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment status",
                allowedStatuses,
            });
        }

        const result = await pool.query(
            `
            UPDATE appointments
            SET
                status = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING
                id,
                patient_id,
                doctor_id,
                hospital_id,
                availability_id,
                appointment_date,
                appointment_time,
                reason,
                status,
                doctor_notes,
                created_at,
                updated_at
            `,
            [status, appointmentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment: result.rows[0],
        });
    } catch (error) {
        console.error("Update admin appointment status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update appointment status",
        });
    }
};


/*
|--------------------------------------------------------------------------
| EXPORT ALL ADMIN CONTROLLERS
|--------------------------------------------------------------------------
*/

module.exports = {
    // Dashboard
    getDashboardStats,

    // Users
    getUsers,
    getUserById,
    updateUserStatus,

    // Hospitals
    getHospitals,
    getHospitalById,
    createHospital,
    updateHospital,
    updateHospitalStatus,

    // Doctors
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    updateDoctorStatus,
    verifyDoctor,

    // Locations
    getLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,

    // Reviews
    getReviews,
    getReviewById,
    deleteReview,

    // Appointments
    getAppointments,
    getAppointmentById,
    updateAppointmentStatus,
};
