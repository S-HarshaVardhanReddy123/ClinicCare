const bcrypt = require("bcrypt");
const pool = require("../src/config/db");

async function main() {
    const patientPassword = await bcrypt.hash("Test@98765", 10);
    const doctorPassword = await bcrypt.hash("Doctor@12345", 10);
    const adminPassword = await bcrypt.hash("Admin@12345", 10);

    await pool.query(
        `INSERT INTO users (name, email, phone, password_hash, role, is_active)
         VALUES ('CI Test Patient', 'patient@cliniccare.com', '919900000001', $1, 'PATIENT', TRUE)
         ON CONFLICT (email) DO UPDATE
         SET password_hash = EXCLUDED.password_hash, role = 'PATIENT', is_active = TRUE`,
        [patientPassword]
    );

    await pool.query(
        `INSERT INTO users (name, email, phone, password_hash, role, is_active)
         VALUES ('Dr. Ananya Rao', 'ananya.rao@cliniccare.demo', '9100000001', $1, 'DOCTOR', TRUE)
         ON CONFLICT (email) DO UPDATE
         SET password_hash = EXCLUDED.password_hash, role = 'DOCTOR', is_active = TRUE`,
        [doctorPassword]
    );

    await pool.query(
        `INSERT INTO users (name, email, phone, password_hash, role, is_active)
         VALUES ('CI Test Admin', 'admin@cliniccare.demo', '919900000003', $1, 'ADMIN', TRUE)
         ON CONFLICT (email) DO UPDATE
         SET password_hash = EXCLUDED.password_hash, role = 'ADMIN', is_active = TRUE`,
        [adminPassword]
    );

    const doctorResult = await pool.query(
        `SELECT d.id, d.hospital_id
         FROM doctors d
         JOIN users u ON u.id = d.user_id
         WHERE u.email = 'ananya.rao@cliniccare.demo'
           AND d.is_active = TRUE`
    );

    if (doctorResult.rows.length === 0) {
        throw new Error(
            "CI fixture could not find Dr. Ananya Rao. Check database/seed.sql."
        );
    }

    const doctor = doctorResult.rows[0];

    let availabilityResult = await pool.query(
        `SELECT id, available_date, start_time
         FROM doctor_availability
         WHERE doctor_id = $1
           AND available_date >= CURRENT_DATE
           AND is_available = TRUE
         ORDER BY available_date, start_time
         LIMIT 1`,
        [doctor.id]
    );

    if (availabilityResult.rows.length === 0) {
        await pool.query(
            `INSERT INTO doctor_availability
                (doctor_id, available_date, start_time, end_time, is_available)
             VALUES ($1, CURRENT_DATE + 1, TIME '09:00', TIME '10:00', TRUE)
             ON CONFLICT (doctor_id, available_date, start_time, end_time)
             DO NOTHING`,
            [doctor.id]
        );

        availabilityResult = await pool.query(
            `SELECT id, available_date, start_time
             FROM doctor_availability
             WHERE doctor_id = $1
               AND available_date >= CURRENT_DATE
               AND is_available = TRUE
             ORDER BY available_date, start_time
             LIMIT 1`,
            [doctor.id]
        );
    }

    if (availabilityResult.rows.length === 0) {
        throw new Error("CI fixture could not create a future doctor availability slot.");
    }

    const availability = availabilityResult.rows[0];

    const patientResult = await pool.query(
        `SELECT id FROM users WHERE email = 'patient@cliniccare.com'`
    );

    await pool.query(
        `INSERT INTO appointments
            (patient_id, doctor_id, hospital_id, availability_id,
             appointment_date, appointment_time, reason, status)
         SELECT $1, $2, $3, $4, $5, $6, $7, 'PENDING'
         WHERE NOT EXISTS (
             SELECT 1 FROM appointments
             WHERE patient_id = $1
               AND doctor_id = $2
               AND reason = $7
         )`,
        [
            patientResult.rows[0].id,
            doctor.id,
            doctor.hospital_id,
            availability.id,
            availability.available_date,
            availability.start_time,
            "CI pipeline fixture appointment"
        ]
    );

    console.log("CI test accounts and appointment fixture prepared.");
}

main()
    .catch((error) => {
        console.error("CI fixture setup failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await pool.end();
    });
