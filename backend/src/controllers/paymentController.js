const pool = require("../config/db");
const crypto = require("crypto");
const {
    createNotification,
} = require("../services/notificationService");


// ============================================================
// CREATE MOCK PAYMENT - PATIENT
// ============================================================

const createPayment = async (req, res) => {
    const client = await pool.connect();

    try {
        const patientId = req.user.id;

        const {
            appointmentId,
            paymentMethod = "MOCK",
        } = req.body;

        if (!appointmentId) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID is required",
            });
        }

        const allowedMethods = [
            "MOCK",
            "CARD",
            "UPI",
            "NET_BANKING",
        ];

        if (!allowedMethods.includes(paymentMethod)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method",
            });
        }

        await client.query("BEGIN");

        // --------------------------------------------------------
        // Verify completed appointment belongs to patient
        // --------------------------------------------------------

        const appointmentResult = await client.query(
            `
            SELECT
                a.id,
                a.patient_id,
                a.doctor_id,
                a.hospital_id,
                a.status,
                d.consultation_fee,
                d.name AS doctor_name
            FROM appointments a
            JOIN doctors d
                ON d.id = a.doctor_id
            WHERE a.id = $1
              AND a.patient_id = $2
            FOR UPDATE
            `,
            [
                appointmentId,
                patientId,
            ]
        );

        if (appointmentResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                success: false,
                message: "Appointment not found for this patient",
            });
        }

        const appointment = appointmentResult.rows[0];

        // --------------------------------------------------------
        // Payment allowed only after completed appointment
        // --------------------------------------------------------

        if (appointment.status !== "COMPLETED") {
            await client.query("ROLLBACK");

            return res.status(409).json({
                success: false,
                message:
                    "Payment can only be created for a completed appointment",
            });
        }

        // --------------------------------------------------------
        // Prevent duplicate payment
        // --------------------------------------------------------

        const existingPayment = await client.query(
            `
            SELECT
                id,
                payment_status
            FROM payments
            WHERE appointment_id = $1
            `,
            [appointmentId]
        );

        if (existingPayment.rows.length > 0) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                success: false,
                message:
                    "A payment already exists for this appointment",
                payment: existingPayment.rows[0],
            });
        }

        // --------------------------------------------------------
        // Validate consultation fee
        // --------------------------------------------------------

        if (
            appointment.consultation_fee === null ||
            appointment.consultation_fee === undefined
        ) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                success: false,
                message:
                    "Consultation fee is not configured for this doctor",
            });
        }

        const amount = Number(appointment.consultation_fee);

        if (!Number.isFinite(amount) || amount <= 0) {
            await client.query("ROLLBACK");

            return res.status(409).json({
                success: false,
                message: "Invalid consultation fee",
            });
        }

        // --------------------------------------------------------
        // Generate mock transaction ID
        // --------------------------------------------------------

        const transactionId =
            `MOCK-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;

        // --------------------------------------------------------
        // Mock payment = SUCCESS
        // --------------------------------------------------------

        const paymentResult = await client.query(
            `
            INSERT INTO payments (
                appointment_id,
                patient_id,
                amount,
                payment_method,
                payment_status,
                transaction_id,
                paid_at
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                'SUCCESS',
                $5,
                CURRENT_TIMESTAMP
            )
            RETURNING
                id,
                appointment_id,
                patient_id,
                amount,
                payment_method,
                payment_status,
                transaction_id,
                paid_at,
                created_at,
                updated_at
            `,
            [
                appointmentId,
                patientId,
                amount,
                paymentMethod,
                transactionId,
            ]
        );

        await client.query("COMMIT");

        const payment = paymentResult.rows[0];

        // --------------------------------------------------------
        // Create in-app payment notification
        // --------------------------------------------------------

        try {
            await createNotification({
                userId: patientId,
                appointmentId,
                type: "PAYMENT",
                channel: "IN_APP",
                message:
                    `Payment successful. Transaction ID: ${transactionId}`,
            });
        } catch (notificationError) {
            console.error(
                "Payment notification error:",
                notificationError
            );
        }

        return res.status(201).json({
            success: true,
            message: "Payment completed successfully",
            payment,
        });

    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error(
                "Payment rollback error:",
                rollbackError
            );
        }

        if (error.code === "23505") {
            return res.status(409).json({
                success: false,
                message:
                    "A payment already exists for this appointment",
            });
        }

        console.error(
            "Create payment error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to create payment",
        });

    } finally {
        client.release();
    }
};


// ============================================================
// GET MY PAYMENTS - PATIENT
// ============================================================

const getMyPayments = async (req, res) => {
    try {
        const patientId = req.user.id;

        const result = await pool.query(
            `
            SELECT
                p.id,
                p.appointment_id,
                p.patient_id,
                p.amount,
                p.payment_method,
                p.payment_status,
                p.transaction_id,
                p.paid_at,
                p.created_at,
                p.updated_at,

                d.id AS doctor_id,
                d.name AS doctor_name,
                d.specialization,

                h.id AS hospital_id,
                h.name AS hospital_name,

                a.appointment_date,
                a.appointment_time

            FROM payments p

            JOIN appointments a
                ON a.id = p.appointment_id

            JOIN doctors d
                ON d.id = a.doctor_id

            JOIN hospitals h
                ON h.id = a.hospital_id

            WHERE p.patient_id = $1

            ORDER BY p.created_at DESC
            `,
            [patientId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            payments: result.rows,
        });

    } catch (error) {
        console.error(
            "Get patient payments error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch payments",
        });
    }
};


// ============================================================
// GET PAYMENT BY ID
// ============================================================

const getPaymentById = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const { paymentId } = req.params;

        let query;
        let params;

        if (userRole === "PATIENT") {

            query = `
                SELECT
                    p.id,
                    p.appointment_id,
                    p.patient_id,
                    p.amount,
                    p.payment_method,
                    p.payment_status,
                    p.transaction_id,
                    p.paid_at,
                    p.created_at,
                    p.updated_at,

                    d.id AS doctor_id,
                    d.name AS doctor_name,
                    d.specialization,

                    h.id AS hospital_id,
                    h.name AS hospital_name,

                    a.appointment_date,
                    a.appointment_time

                FROM payments p

                JOIN appointments a
                    ON a.id = p.appointment_id

                JOIN doctors d
                    ON d.id = a.doctor_id

                JOIN hospitals h
                    ON h.id = a.hospital_id

                WHERE p.id = $1
                  AND p.patient_id = $2
            `;

            params = [
                paymentId,
                userId,
            ];

        } else if (userRole === "DOCTOR") {

            query = `
                SELECT
                    p.id,
                    p.appointment_id,
                    p.patient_id,
                    p.amount,
                    p.payment_method,
                    p.payment_status,
                    p.transaction_id,
                    p.paid_at,
                    p.created_at,
                    p.updated_at,

                    patient.name AS patient_name,
                    patient.email AS patient_email,
                    patient.phone AS patient_phone,

                    d.id AS doctor_id,
                    d.name AS doctor_name,

                    h.id AS hospital_id,
                    h.name AS hospital_name,

                    a.appointment_date,
                    a.appointment_time

                FROM payments p

                JOIN appointments a
                    ON a.id = p.appointment_id

                JOIN doctors d
                    ON d.id = a.doctor_id

                JOIN users patient
                    ON patient.id = p.patient_id

                JOIN hospitals h
                    ON h.id = a.hospital_id

                WHERE p.id = $1
                  AND d.user_id = $2
            `;

            params = [
                paymentId,
                userId,
            ];

        } else if (userRole === "ADMIN") {

            query = `
                SELECT
                    p.id,
                    p.appointment_id,
                    p.patient_id,
                    p.amount,
                    p.payment_method,
                    p.payment_status,
                    p.transaction_id,
                    p.paid_at,
                    p.created_at,
                    p.updated_at,

                    patient.name AS patient_name,
                    patient.email AS patient_email,
                    patient.phone AS patient_phone,

                    d.id AS doctor_id,
                    d.name AS doctor_name,

                    h.id AS hospital_id,
                    h.name AS hospital_name,

                    a.appointment_date,
                    a.appointment_time

                FROM payments p

                JOIN appointments a
                    ON a.id = p.appointment_id

                JOIN doctors d
                    ON d.id = a.doctor_id

                JOIN users patient
                    ON patient.id = p.patient_id

                JOIN hospitals h
                    ON h.id = a.hospital_id

                WHERE p.id = $1
            `;

            params = [paymentId];

        } else {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view this payment",
            });
        }

        const result = await pool.query(
            query,
            params
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        return res.status(200).json({
            success: true,
            payment: result.rows[0],
        });

    } catch (error) {
        console.error(
            "Get payment error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch payment",
        });
    }
};


module.exports = {
    createPayment,
    getMyPayments,
    getPaymentById,
};
