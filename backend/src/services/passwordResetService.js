const crypto = require("crypto");
const pool = require("../config/db");

const RESET_TOKEN_EXPIRY_MINUTES = 15;

const generateResetToken = () => {
    return crypto.randomBytes(32).toString("hex");
};

const hashResetToken = (token) => {
    return crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
};

const createPasswordResetToken = async (userId) => {
    const token = generateResetToken();
    const tokenHash = hashResetToken(token);

    await pool.query(
        `
        UPDATE password_reset_tokens
        SET used_at = CURRENT_TIMESTAMP
        WHERE user_id = $1
          AND used_at IS NULL
        `,
        [userId]
    );

    const result = await pool.query(
        `
        INSERT INTO password_reset_tokens (
            user_id,
            token_hash,
            expires_at
        )
        VALUES (
            $1,
            $2,
            CURRENT_TIMESTAMP + ($3 * INTERVAL '1 minute')
        )
        RETURNING
            id,
            user_id,
            expires_at,
            created_at
        `,
        [
            userId,
            tokenHash,
            RESET_TOKEN_EXPIRY_MINUTES,
        ]
    );

    return {
        token,
        tokenRecord: result.rows[0],
    };
};

const consumePasswordResetToken = async (token) => {
    if (!token) {
        return null;
    }

    const tokenHash = hashResetToken(token);

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const result = await client.query(
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

        if (result.rows.length === 0) {
            await client.query("ROLLBACK");
            return null;
        }

        const resetToken = result.rows[0];

        await client.query(
            `
            UPDATE password_reset_tokens
            SET used_at = CURRENT_TIMESTAMP
            WHERE id = $1
            `,
            [resetToken.id]
        );

        await client.query("COMMIT");

        return resetToken;
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    createPasswordResetToken,
    consumePasswordResetToken,
};
