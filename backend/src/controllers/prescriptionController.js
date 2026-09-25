const pool = require("../config/db");

const {
    createNotification,
} = require("../services/notificationService");


// ============================================================
// CREATE PRESCRIPTION - DOCTOR
// ============================================================

const createPrescription = async (req, res) => {
    const client = await pool.connect();

    try {
        const doctorUserId = req.user.userId;

        const {
            appointmentId,
            diagnosis,
            instructions,
            medicines,
        } = req.body;

        // --------------------------------------------------------
        // Validate required fields
        // --------------------------------------------------------

        if (!appointmentId) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID is required",
            });
        }

        if (!medicines || !Array.isArray(medicines)) {
            return res.status(400).json({
                success: false,
                message: "Medicines must be provided as an array",
            });
        }

        // --------------------------------------------------------
        // Verify appointment belongs to logged-in doctor
        // --------------------------------------------------------

        const appointmentResult = await client.query(
            `
            SELECT
                a.id,
                a.patient_id,
                a.doctor_id,
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

        const appointment = appointmentResult.rows[0];

        // --------------------------------------------------------
        // Prescription allowed only for completed appointments
        // --------------------------------------------------------

        if (appointment.status !== "COMPLETED") {
            return res.status(409).json({
                success: false,
                message:
                    "Prescription can only be created for a completed appointment",
            });
        }

        // --------------------------------------------------------
        // Prevent duplicate prescription
        // --------------------------------------------------------

        const existingPrescription = await client.query(
            `
            SELECT id
            FROM prescriptions
            WHERE appointment_id = $1
            `,
            [appointmentId]
        );

        if (existingPrescription.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "A prescription already exists for this appointment",
            });
        }

        // --------------------------------------------------------
        // Validate medicines
        // --------------------------------------------------------

        for (const medicine of medicines) {
            if (
                !medicine.medicineName ||
                !medicine.dosage ||
                !medicine.frequency ||
                !medicine.duration
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Each medicine requires medicineName, dosage, frequency and duration",
                });
            }
        }

        // --------------------------------------------------------
        // Start transaction
        // --------------------------------------------------------

        await client.query("BEGIN");

        // --------------------------------------------------------
        // Create prescription
        // --------------------------------------------------------

        const prescriptionResult = await client.query(
            `
            INSERT INTO prescriptions (
                appointment_id,
                doctor_id,
                patient_id,
                diagnosis,
                instructions
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING
                id,
                appointment_id,
                doctor_id,
                patient_id,
                diagnosis,
                instructions,
                created_at,
                updated_at
            `,
            [
                appointmentId,
                appointment.doctor_id,
                appointment.patient_id,
                diagnosis || null,
                instructions || null,
            ]
        );

        const prescription = prescriptionResult.rows[0];

        // --------------------------------------------------------
        // Add medicines
        // --------------------------------------------------------

        const createdMedicines = [];

        for (const medicine of medicines) {
            const medicineResult = await client.query(
                `
                INSERT INTO prescription_medicines (
                    prescription_id,
                    medicine_name,
                    dosage,
                    frequency,
                    duration,
                    instructions
                )
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6
                )
                RETURNING
                    id,
                    prescription_id,
                    medicine_name,
                    dosage,
                    frequency,
                    duration,
                    instructions
                `,
                [
                    prescription.id,
                    medicine.medicineName,
                    medicine.dosage,
                    medicine.frequency,
                    medicine.duration,
                    medicine.instructions || null,
                ]
            );

            createdMedicines.push(
                medicineResult.rows[0]
            );
        }

        // --------------------------------------------------------
        // Commit transaction
        // --------------------------------------------------------

        await client.query("COMMIT");

        // --------------------------------------------------------
        // Create prescription notification
        // --------------------------------------------------------

        try {
            await createNotification({
                userId: prescription.patient_id,
                appointmentId: prescription.appointment_id,
                type: "PRESCRIPTION",
                channel: "IN_APP",
                message:
                    "Your prescription is now available.",
            });
        } catch (notificationError) {
            // Prescription was successfully created.
            // Notification failure should not make the
            // prescription creation request fail.
            console.error(
                "Prescription notification error:",
                notificationError
            );
        }

        return res.status(201).json({
            success: true,
            message: "Prescription created successfully",
            prescription: {
                ...prescription,
                medicines: createdMedicines,
            },
        });

    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error(
                "Prescription rollback error:",
                rollbackError
            );
        }

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message:
                    "A prescription already exists for this appointment",
            });
        }

        console.error(
            "Create prescription error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create prescription",
        });

    } finally {
        client.release();
    }
};


// ============================================================
// GET MY PRESCRIPTIONS - PATIENT
// ============================================================

const getMyPrescriptions = async (req, res) => {
    try {
        const patientId = req.user.userId;

        const result = await pool.query(
            `
            SELECT
                p.id,
                p.appointment_id,
                p.doctor_id,
                p.patient_id,
                p.diagnosis,
                p.instructions,
                p.created_at,
                p.updated_at,

                d.name AS doctor_name,
                d.qualification,
                d.specialization,

                h.name AS hospital_name,
                h.address AS hospital_address,

                a.appointment_date,
                a.appointment_time

            FROM prescriptions p

            JOIN doctors d
                ON d.id = p.doctor_id

            JOIN hospitals h
                ON h.id = d.hospital_id

            JOIN appointments a
                ON a.id = p.appointment_id

            WHERE p.patient_id = $1

            ORDER BY p.created_at DESC
            `,
            [patientId]
        );

        // --------------------------------------------------------
        // Fetch medicines
        // --------------------------------------------------------

        for (const prescription of result.rows) {
            const medicinesResult = await pool.query(
                `
                SELECT
                    id,
                    prescription_id,
                    medicine_name,
                    dosage,
                    frequency,
                    duration,
                    instructions

                FROM prescription_medicines

                WHERE prescription_id = $1

                ORDER BY id ASC
                `,
                [prescription.id]
            );

            prescription.medicines =
                medicinesResult.rows;
        }

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            prescriptions: result.rows,
        });

    } catch (error) {
        console.error(
            "Get patient prescriptions error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch prescriptions",
        });
    }
};


// ============================================================
// GET PRESCRIPTION BY ID
// ============================================================

const getPrescriptionById = async (req, res) => {
    try {
        const { prescriptionId } = req.params;

        const userId = req.user.userId;
        const userRole = req.user.role;

        let query;
        let params;

        // --------------------------------------------------------
        // Patient
        // --------------------------------------------------------

        if (userRole === "PATIENT") {
            query = `
                SELECT
                    p.id,
                    p.appointment_id,
                    p.doctor_id,
                    p.patient_id,
                    p.diagnosis,
                    p.instructions,
                    p.created_at,
                    p.updated_at,

                    d.name AS doctor_name,
                    d.qualification,
                    d.specialization,

                    h.name AS hospital_name,
                    h.address AS hospital_address,

                    a.appointment_date,
                    a.appointment_time

                FROM prescriptions p

                JOIN doctors d
                    ON d.id = p.doctor_id

                JOIN hospitals h
                    ON h.id = d.hospital_id

                JOIN appointments a
                    ON a.id = p.appointment_id

                WHERE p.id = $1
                  AND p.patient_id = $2
            `;

            params = [
                prescriptionId,
                userId,
            ];

        // --------------------------------------------------------
        // Doctor
        // --------------------------------------------------------

        } else if (userRole === "DOCTOR") {
            query = `
                SELECT
                    p.id,
                    p.appointment_id,
                    p.doctor_id,
                    p.patient_id,
                    p.diagnosis,
                    p.instructions,
                    p.created_at,
                    p.updated_at,

                    d.name AS doctor_name,
                    d.qualification,
                    d.specialization,

                    patient.name AS patient_name,
                    patient.email AS patient_email,
                    patient.phone AS patient_phone,

                    h.name AS hospital_name,
                    h.address AS hospital_address,

                    a.appointment_date,
                    a.appointment_time

                FROM prescriptions p

                JOIN doctors d
                    ON d.id = p.doctor_id

                JOIN users patient
                    ON patient.id = p.patient_id

                JOIN hospitals h
                    ON h.id = d.hospital_id

                JOIN appointments a
                    ON a.id = p.appointment_id

                WHERE p.id = $1
                  AND d.user_id = $2
            `;

            params = [
                prescriptionId,
                userId,
            ];

        // --------------------------------------------------------
        // Admin
        // --------------------------------------------------------

        } else if (userRole === "ADMIN") {
            query = `
                SELECT
                    p.id,
                    p.appointment_id,
                    p.doctor_id,
                    p.patient_id,
                    p.diagnosis,
                    p.instructions,
                    p.created_at,
                    p.updated_at,

                    d.name AS doctor_name,
                    d.qualification,
                    d.specialization,

                    patient.name AS patient_name,
                    patient.email AS patient_email,
                    patient.phone AS patient_phone,

                    h.name AS hospital_name,
                    h.address AS hospital_address,

                    a.appointment_date,
                    a.appointment_time

                FROM prescriptions p

                JOIN doctors d
                    ON d.id = p.doctor_id

                JOIN users patient
                    ON patient.id = p.patient_id

                JOIN hospitals h
                    ON h.id = d.hospital_id

                JOIN appointments a
                    ON a.id = p.appointment_id

                WHERE p.id = $1
            `;

            params = [prescriptionId];

        } else {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to view this prescription",
            });
        }

        const result = await pool.query(
            query,
            params
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Prescription not found",
            });
        }

        const prescription =
            result.rows[0];

        // --------------------------------------------------------
        // Get medicines
        // --------------------------------------------------------

        const medicinesResult = await pool.query(
            `
            SELECT
                id,
                prescription_id,
                medicine_name,
                dosage,
                frequency,
                duration,
                instructions

            FROM prescription_medicines

            WHERE prescription_id = $1

            ORDER BY id ASC
            `,
            [prescriptionId]
        );

        prescription.medicines =
            medicinesResult.rows;

        return res.status(200).json({
            success: true,
            prescription,
        });

    } catch (error) {
        console.error(
            "Get prescription error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch prescription",
        });
    }
};


// ============================================================
// GET DOCTOR PRESCRIPTIONS
// ============================================================

const getDoctorPrescriptions = async (req, res) => {
    try {
        const doctorUserId = req.user.userId;

        const result = await pool.query(
            `
            SELECT
                p.id,
                p.appointment_id,
                p.doctor_id,
                p.patient_id,
                p.diagnosis,
                p.instructions,
                p.created_at,
                p.updated_at,

                patient.name AS patient_name,
                patient.email AS patient_email,
                patient.phone AS patient_phone,

                d.name AS doctor_name,

                a.appointment_date,
                a.appointment_time

            FROM prescriptions p

            JOIN doctors d
                ON d.id = p.doctor_id

            JOIN users patient
                ON patient.id = p.patient_id

            JOIN appointments a
                ON a.id = p.appointment_id

            WHERE d.user_id = $1

            ORDER BY p.created_at DESC
            `,
            [doctorUserId]
        );

        for (const prescription of result.rows) {
            const medicinesResult = await pool.query(
                `
                SELECT
                    id,
                    prescription_id,
                    medicine_name,
                    dosage,
                    frequency,
                    duration,
                    instructions

                FROM prescription_medicines

                WHERE prescription_id = $1

                ORDER BY id ASC
                `,
                [prescription.id]
            );

            prescription.medicines =
                medicinesResult.rows;
        }

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            prescriptions: result.rows,
        });

    } catch (error) {
        console.error(
            "Get doctor prescriptions error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch doctor prescriptions",
        });
    }
};


// ============================================================
// EXPORT
// ============================================================

module.exports = {
    createPrescription,
    getMyPrescriptions,
    getPrescriptionById,
    getDoctorPrescriptions,
};