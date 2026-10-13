const pool = require("../config/db");


// ============================================================
// GET ALL LOCATIONS
// ============================================================

const getLocations = async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT
                id,
                state,
                district,
                city,
                created_at
            FROM locations
            ORDER BY
                state ASC,
                city ASC
            `
        );

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            locations: result.rows,
        });

    } catch (error) {
        console.error("Get locations error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch locations",
        });
    }
};


// ============================================================
// GET LOCATION BY ID
// ============================================================

const getLocationById = async (req, res) => {
    try {
        const { locationId } = req.params;

        const result = await pool.query(
            `
            SELECT
                id,
                state,
                district,
                city,
                created_at
            FROM locations
            WHERE id = $1
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
        console.error("Get location error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch location",
        });
    }
};


module.exports = {
    getLocations,
    getLocationById,
};