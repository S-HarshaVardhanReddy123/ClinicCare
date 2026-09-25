const pool = require("../config/db");


// ============================================================
// CREATE NOTIFICATION
// ============================================================

const createNotification = async ({
    userId,
    appointmentId = null,
    type,
    channel,
    message,
}) => {
    try {
        const result = await pool.query(
            `
            INSERT INTO notifications (
                user_id,
                appointment_id,
                type,
                channel,
                message,
                status
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                'PENDING'
            )
            RETURNING
                id,
                user_id,
                appointment_id,
                type,
                channel,
                message,
                status,
                created_at
            `,
            [
                userId,
                appointmentId,
                type,
                channel,
                message,
            ]
        );

        return result.rows[0];

    } catch (error) {
        console.error(
            "Create notification error:",
            error
        );

        throw error;
    }
};


// ============================================================
// CREATE IN-APP APPOINTMENT NOTIFICATION
// ============================================================

const createAppointmentNotification = async ({
    userId,
    appointmentId,
    message,
}) => {
    return createNotification({
        userId,
        appointmentId,
        type: "APPOINTMENT",
        channel: "IN_APP",
        message,
    });
};


module.exports = {
    createNotification,
    createAppointmentNotification,
};
