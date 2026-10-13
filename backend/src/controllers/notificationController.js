const pool = require("../config/db");


// ============================================================
// GET MY NOTIFICATIONS
// ============================================================

const getMyNotifications = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `
            SELECT
                id,
                appointment_id,
                type,
                channel,
                message,
                status,
                sent_at,
                created_at

            FROM notifications

            WHERE user_id = $1

            ORDER BY created_at DESC
            `,
            [userId]
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            notifications: result.rows,
        });

    } catch (error) {
        console.error(
            "Get notifications error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch notifications",
        });
    }
};


// ============================================================
// MARK NOTIFICATION AS READ
// ============================================================

const markNotificationAsSent = async (req, res) => {
    try {
        const userId = req.user.id;
        const { notificationId } = req.params;

        const result = await pool.query(
            `
            UPDATE notifications

            SET
                status = 'SENT',
                sent_at = CURRENT_TIMESTAMP

            WHERE id = $1
              AND user_id = $2

            RETURNING
                id,
                appointment_id,
                type,
                channel,
                message,
                status,
                sent_at,
                created_at
            `,
            [
                notificationId,
                userId,
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Notification marked as sent",
            notification: result.rows[0],
        });

    } catch (error) {
        console.error(
            "Mark notification error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update notification",
        });
    }
};


module.exports = {
    getMyNotifications,
    markNotificationAsSent,
};
