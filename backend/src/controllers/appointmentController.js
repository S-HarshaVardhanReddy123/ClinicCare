const pool = require("../config/db");


// ============================================================
// CREATE APPOINTMENT - PATIENT
// ============================================================

const createAppointment = async (req, res) => {
    const client = await pool.connect();

    try {
        // JWT contains "id", not "userId"
        const patientId = req.user.id;

        const {
            doctorId,
            availabilityId,
            reason,
        } = req.body;

        if (!doctorId || !availabilityId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID and availability ID are required",
            });
        }

        await client.query("BEGIN");

        // --------------------------------------------------------
        // Check availability slot
        // --------------------------------------------------------

        const availabilityResult = await client.query(
            `
            SELECT
                id,
                doctor_id,
                available_date,
                start_time,
                end_time,
                is_available
            FROM doctor_availability
            WHERE id = $1
              AND doctor_id = $2
            FOR UPDATE
            `,
            [
                availabilityId,
                doctorId,
            ]
        );

        if (availabilityResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                success: false,
                message: "Availability slot not found",
            });
        }

        const availability = availabilityResult.rows[0];

        // --------------------------------------------------------
        // Make sure slot is still available
        // --------------------------------------------------------

        if (!availability.is_available) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                success: false,
                message: "This appointment slot is no longer available",
            });
        }

        // --------------------------------------------------------
        // Verify doctor
        // --------------------------------------------------------

        const doctorResult = await client.query(
            `
            SELECT
                id,
                hospital_id,
                name
            FROM doctors
            WHERE id = $1
              AND is_active = TRUE
            `,
            [doctorId]
        );

        if (doctorResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        const doctor = doctorResult.rows[0];

        // --------------------------------------------------------
        // Create appointment
        // --------------------------------------------------------

        const appointmentResult = await client.query(
            `
            INSERT INTO appointments (
                patient_id,
                doctor_id,
                hospital_id,
                availability_id,
                appointment_date,
                appointment_time,
                reason,
                status
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                'PENDING'
            )
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
                created_at
            `,
            [
                patientId,
                doctorId,
                doctor.hospital_id,
                availabilityId,
                availability.available_date,
                availability.start_time,
                reason || null,
            ]
        );

        // --------------------------------------------------------
        // Lock the availability slot
        // --------------------------------------------------------

        await client.query(
            `
            UPDATE doctor_availability
            SET
                is_available = FALSE
            WHERE id = $1
            `,
            [availabilityId]
        );

        await client.query("COMMIT");

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            appointment: appointmentResult.rows[0],
        });

    } catch (error) {
        await client.query("ROLLBACK");

        // Unique constraint / duplicate appointment
        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message: "This appointment slot has already been booked",
            });
        }

        console.error(
            "Create appointment error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create appointment",
        });

    } finally {
        client.release();
    }
};


// ============================================================
// GET AVAILABLE SLOTS FOR A DOCTOR - PATIENT
// ============================================================

const getDoctorAvailability = async (req, res) => {
    try {
        const { doctorId } = req.params;

        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID is required",
            });
        }

        // --------------------------------------------------------
        // Verify doctor
        // --------------------------------------------------------

        const doctorResult = await pool.query(
            `
            SELECT
                id,
                name,
                specialization,
                hospital_id
            FROM doctors
            WHERE id = $1
              AND is_active = TRUE
            `,
            [doctorId]
        );

        if (doctorResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Doctor not found",
            });
        }

        // --------------------------------------------------------
        // Get available slots
        // --------------------------------------------------------

        const availabilityResult = await pool.query(
            `
            SELECT
                id,
                doctor_id,
                available_date,
                start_time,
                end_time,
                is_available
            FROM doctor_availability
            WHERE doctor_id = $1
              AND is_available = TRUE
              AND available_date >= CURRENT_DATE
            ORDER BY
                available_date ASC,
                start_time ASC
            `,
            [doctorId]
        );

        return res.status(200).json({
            success: true,
            doctor: doctorResult.rows[0],
            availability: availabilityResult.rows,
        });

    } catch (error) {
        console.error(
            "Get doctor availability error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctor availability",
        });
    }
};


// ============================================================
// GET PATIENT APPOINTMENTS
// ============================================================

const getMyAppointments = async (req, res) => {
    try {
        // JWT contains "id"
        const patientId = req.user.id;

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

                d.id AS doctor_id,
                d.name AS doctor_name,
                d.qualification,
                d.specialization,
                d.consultation_fee,

                h.id AS hospital_id,
                h.name AS hospital_name,
                h.address AS hospital_address

            FROM appointments a

            JOIN doctors d
                ON d.id = a.doctor_id

            JOIN hospitals h
                ON h.id = a.hospital_id

            WHERE a.patient_id = $1

            ORDER BY
                a.appointment_date DESC,
                a.appointment_time DESC,
                a.created_at DESC
            `,
            [patientId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            appointments: result.rows,
        });
    } catch (error) {
        console.error(
            "Get patient appointments error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
        });
    }
};
const getAppointmentById = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // JWT contains "id"
        const userId = req.user.id;

        const userRole = req.user.role;

        let query;
        let params;

        // --------------------------------------------------------
        // PATIENT
        // --------------------------------------------------------

        if (userRole === "PATIENT") {

            query = `
                SELECT
                    a.id,
                    a.patient_id,
                    a.doctor_id,
                    a.hospital_id,
                    a.availability_id,
                    a.appointment_date,
                    a.appointment_time,
                    a.reason,
                    a.status,
                    a.doctor_notes,
                    a.created_at,
                    a.updated_at,

                    d.name AS doctor_name,
                    d.qualification,
                    d.specialization,
                    d.consultation_fee,

                    h.name AS hospital_name,
                    h.address AS hospital_address

                FROM appointments a

                JOIN doctors d
                    ON d.id = a.doctor_id

                JOIN hospitals h
                    ON h.id = a.hospital_id

                WHERE a.id = $1
                  AND a.patient_id = $2
            `;

            params = [
                appointmentId,
                userId,
            ];

        // --------------------------------------------------------
        // DOCTOR
        // --------------------------------------------------------

        } else if (userRole === "DOCTOR") {

            query = `
                SELECT
                    a.id,
                    a.patient_id,
                    a.doctor_id,
                    a.hospital_id,
                    a.availability_id,
                    a.appointment_date,
                    a.appointment_time,
                    a.reason,
                    a.status,
                    a.doctor_notes,
                    a.created_at,
                    a.updated_at,

                    p.name AS patient_name,
                    p.email AS patient_email,
                    p.phone AS patient_phone,

                    d.name AS doctor_name,
                    d.qualification,
                    d.specialization,

                    h.name AS hospital_name,
                    h.address AS hospital_address

                FROM appointments a

                JOIN users p
                    ON p.id = a.patient_id

                JOIN doctors d
                    ON d.id = a.doctor_id

                JOIN hospitals h
                    ON h.id = a.hospital_id

                WHERE a.id = $1
                  AND d.user_id = $2
            `;

            params = [
                appointmentId,
                userId,
            ];

        // --------------------------------------------------------
        // ADMIN
        // --------------------------------------------------------

        } else if (userRole === "ADMIN") {

            query = `
                SELECT
                    a.id,
                    a.patient_id,
                    a.doctor_id,
                    a.hospital_id,
                    a.availability_id,
                    a.appointment_date,
                    a.appointment_time,
                    a.reason,
                    a.status,
                    a.doctor_notes,
                    a.created_at,
                    a.updated_at,

                    p.name AS patient_name,
                    p.email AS patient_email,
                    p.phone AS patient_phone,

                    d.name AS doctor_name,
                    d.qualification,
                    d.specialization,

                    h.name AS hospital_name,
                    h.address AS hospital_address

                FROM appointments a

                JOIN users p
                    ON p.id = a.patient_id

                JOIN doctors d
                    ON d.id = a.doctor_id

                JOIN hospitals h
                    ON h.id = a.hospital_id

                WHERE a.id = $1
            `;

            params = [
                appointmentId,
            ];

        } else {

            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this appointment",
            });
        }

        const result = await pool.query(
            query,
            params
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
        console.error(
            "Get appointment by ID error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch appointment",
        });
    }
};


// ============================================================
// GET DOCTOR APPOINTMENTS
// ============================================================

const getDoctorAppointments = async (req, res) => {
    try {
        // JWT contains "id"
        const doctorUserId = req.user.id;

        const result = await pool.query(
            `
            SELECT
                a.id,
                a.patient_id,
                a.doctor_id,
                a.hospital_id,
                a.availability_id,
                a.appointment_date,
                a.appointment_time,
                a.reason,
                a.status,
                a.doctor_notes,
                a.created_at,
                a.updated_at,

                p.name AS patient_name,
                p.email AS patient_email,
                p.phone AS patient_phone,

                d.name AS doctor_name,
                d.specialization,

                h.name AS hospital_name,
                h.address AS hospital_address

            FROM appointments a

            JOIN users p
                ON p.id = a.patient_id

            JOIN doctors d
                ON d.id = a.doctor_id

            JOIN hospitals h
                ON h.id = a.hospital_id

            WHERE d.user_id = $1

            ORDER BY
                a.appointment_date DESC,
                a.appointment_time DESC
            `,
            [doctorUserId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            appointments: result.rows,
        });

    } catch (error) {
        console.error(
            "Get doctor appointments error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctor appointments",
        });
    }
};


// ============================================================
// UPDATE APPOINTMENT STATUS - DOCTOR
// ============================================================

const updateAppointmentStatus = async (req, res) => {
    try {
        // JWT contains "id"
        const doctorUserId = req.user.id;

        const { appointmentId } = req.params;

        const {
            status,
            doctorNotes,
        } = req.body;

        const allowedStatuses = [
            "ACCEPTED",
            "REJECTED",
            "COMPLETED",
            "NO_SHOW",
        ];

        // --------------------------------------------------------
        // Validate status
        // --------------------------------------------------------

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Appointment status is required",
            });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment status",
            });
        }

        // --------------------------------------------------------
        // Find appointment belonging to doctor
        // --------------------------------------------------------

        const appointmentResult = await pool.query(
            `
            SELECT
                a.id,
                a.status,
                d.user_id AS doctor_user_id
            FROM appointments a

            JOIN doctors d
                ON d.id = a.doctor_id

            WHERE a.id = $1
              AND d.user_id = $2
            `,
            [
                appointmentId,
                doctorUserId,
            ]
        );

        if (appointmentResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found for this doctor",
            });
        }

        const currentStatus =
            appointmentResult.rows[0].status;

        // --------------------------------------------------------
        // Valid appointment state transitions
        // --------------------------------------------------------

        const validTransitions = {
            PENDING: [
                "ACCEPTED",
                "REJECTED",
            ],

            ACCEPTED: [
                "COMPLETED",
                "NO_SHOW",
            ],

            REJECTED: [],

            COMPLETED: [],

            CANCELLED: [],

            NO_SHOW: [],
        };

        if (
            !validTransitions[currentStatus] ||
            !validTransitions[currentStatus].includes(status)
        ) {
            return res.status(409).json({
                success: false,
                message:
                    `Cannot change appointment from ${currentStatus} to ${status}`,
            });
        }

        // --------------------------------------------------------
        // Update appointment
        // --------------------------------------------------------

        const result = await pool.query(
            `
            UPDATE appointments
            SET
                status = $1,
                doctor_notes = COALESCE($2, doctor_notes),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
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
            [
                status,
                doctorNotes || null,
                appointmentId,
            ]
        );

        return res.status(200).json({
            success: true,
            message:
                `Appointment ${status.toLowerCase()} successfully`,
            appointment: result.rows[0],
        });

    } catch (error) {
        console.error(
            "Update appointment status error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update appointment status",
        });
    }
};


// ============================================================
// EXPORT
// ============================================================

module.exports = {
    createAppointment,
    getDoctorAvailability,
    getMyAppointments,
    getAppointmentById,
    getDoctorAppointments,
    updateAppointmentStatus,
};
