-- ============================================================
-- ClinicCare Database Schema
-- Group 1: Users, Locations, Hospitals
-- PostgreSQL
-- ============================================================

-- ------------------------------------------------------------
-- USERS
-- ------------------------------------------------------------

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    phone VARCHAR(20) UNIQUE,

    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT 'PATIENT',

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_role_check
        CHECK (role IN ('PATIENT', 'DOCTOR', 'ADMIN'))
);


-- ------------------------------------------------------------
-- LOCATIONS
-- ------------------------------------------------------------

CREATE TABLE locations (
    id BIGSERIAL PRIMARY KEY,

    state VARCHAR(100) NOT NULL,

    district VARCHAR(100),

    city VARCHAR(100) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT locations_unique_city
        UNIQUE (state, district, city)
);


-- ------------------------------------------------------------
-- HOSPITALS
-- ------------------------------------------------------------

CREATE TABLE hospitals (
    id BIGSERIAL PRIMARY KEY,

    location_id BIGINT NOT NULL,

    name VARCHAR(200) NOT NULL,

    address TEXT NOT NULL,

    phone VARCHAR(20),

    email VARCHAR(150),

    website VARCHAR(255),

    emergency_available BOOLEAN NOT NULL DEFAULT FALSE,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT hospitals_location_fk
        FOREIGN KEY (location_id)
        REFERENCES locations(id)
        ON DELETE RESTRICT
);


-- ------------------------------------------------------------
-- INDEXES
-- ------------------------------------------------------------

CREATE INDEX idx_hospitals_location_id
    ON hospitals(location_id);

CREATE INDEX idx_hospitals_name
    ON hospitals(name);

CREATE INDEX idx_locations_state_city
    ON locations(state, city);

-- ============================================================
-- Group 2: Departments, Facilities, Doctors, Availability
-- ============================================================

-- ------------------------------------------------------------
-- DEPARTMENTS
-- ------------------------------------------------------------

CREATE TABLE departments (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ------------------------------------------------------------
-- HOSPITAL DEPARTMENTS
-- ------------------------------------------------------------

CREATE TABLE hospital_departments (
    hospital_id BIGINT NOT NULL,

    department_id BIGINT NOT NULL,

    PRIMARY KEY (hospital_id, department_id),

    CONSTRAINT hospital_departments_hospital_fk
        FOREIGN KEY (hospital_id)
        REFERENCES hospitals(id)
        ON DELETE CASCADE,

    CONSTRAINT hospital_departments_department_fk
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE CASCADE
);


-- ------------------------------------------------------------
-- FACILITIES
-- ------------------------------------------------------------

CREATE TABLE facilities (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ------------------------------------------------------------
-- HOSPITAL FACILITIES
-- ------------------------------------------------------------

CREATE TABLE hospital_facilities (
    hospital_id BIGINT NOT NULL,

    facility_id BIGINT NOT NULL,

    PRIMARY KEY (hospital_id, facility_id),

    CONSTRAINT hospital_facilities_hospital_fk
        FOREIGN KEY (hospital_id)
        REFERENCES hospitals(id)
        ON DELETE CASCADE,

    CONSTRAINT hospital_facilities_facility_fk
        FOREIGN KEY (facility_id)
        REFERENCES facilities(id)
        ON DELETE CASCADE
);


-- ------------------------------------------------------------
-- DOCTORS
-- ------------------------------------------------------------

CREATE TABLE doctors (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL UNIQUE,

    hospital_id BIGINT NOT NULL,

    name VARCHAR(150) NOT NULL,

    qualification VARCHAR(255) NOT NULL,

    specialization VARCHAR(150) NOT NULL,

    experience_years INTEGER NOT NULL DEFAULT 0,

    expertise TEXT,

    diseases_treated TEXT,

    languages VARCHAR(255),

    consultation_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,

    is_verified BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT doctors_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT doctors_hospital_fk
        FOREIGN KEY (hospital_id)
        REFERENCES hospitals(id)
        ON DELETE RESTRICT,

    CONSTRAINT doctors_experience_check
        CHECK (experience_years >= 0),

    CONSTRAINT doctors_fee_check
        CHECK (consultation_fee >= 0)
);


-- ------------------------------------------------------------
-- DOCTOR AVAILABILITY
-- ------------------------------------------------------------

CREATE TABLE doctor_availability (
    id BIGSERIAL PRIMARY KEY,

    doctor_id BIGINT NOT NULL,

    available_date DATE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT doctor_availability_doctor_fk
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(id)
        ON DELETE CASCADE,

    CONSTRAINT doctor_availability_time_check
        CHECK (end_time > start_time),

    CONSTRAINT doctor_availability_unique_slot
        UNIQUE (doctor_id, available_date, start_time, end_time)
);


-- ------------------------------------------------------------
-- INDEXES
-- ------------------------------------------------------------

CREATE INDEX idx_doctors_hospital_id
    ON doctors(hospital_id);

CREATE INDEX idx_doctors_specialization
    ON doctors(specialization);

CREATE INDEX idx_doctor_availability_doctor_date
    ON doctor_availability(doctor_id, available_date);


-- ============================================================
-- Group 3: Appointments, Prescriptions, Medicines
-- ============================================================

-- ------------------------------------------------------------
-- APPOINTMENTS
-- ------------------------------------------------------------

CREATE TABLE appointments (
    id BIGSERIAL PRIMARY KEY,

    patient_id BIGINT NOT NULL,

    doctor_id BIGINT NOT NULL,

    hospital_id BIGINT NOT NULL,

    availability_id BIGINT,

    appointment_date DATE NOT NULL,

    appointment_time TIME NOT NULL,

    reason TEXT,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    doctor_notes TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT appointments_patient_fk
        FOREIGN KEY (patient_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT appointments_doctor_fk
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(id)
        ON DELETE RESTRICT,

    CONSTRAINT appointments_hospital_fk
        FOREIGN KEY (hospital_id)
        REFERENCES hospitals(id)
        ON DELETE RESTRICT,

    CONSTRAINT appointments_availability_fk
        FOREIGN KEY (availability_id)
        REFERENCES doctor_availability(id)
        ON DELETE SET NULL,

    CONSTRAINT appointments_status_check
        CHECK (
            status IN (
                'PENDING',
                'ACCEPTED',
                'REJECTED',
                'COMPLETED',
                'CANCELLED',
                'NO_SHOW'
            )
        )
);


-- ------------------------------------------------------------
-- PRESCRIPTIONS
-- ------------------------------------------------------------

CREATE TABLE prescriptions (
    id BIGSERIAL PRIMARY KEY,

    appointment_id BIGINT NOT NULL UNIQUE,

    doctor_id BIGINT NOT NULL,

    patient_id BIGINT NOT NULL,

    diagnosis TEXT,

    instructions TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT prescriptions_appointment_fk
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(id)
        ON DELETE RESTRICT,

    CONSTRAINT prescriptions_doctor_fk
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(id)
        ON DELETE RESTRICT,

    CONSTRAINT prescriptions_patient_fk
        FOREIGN KEY (patient_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
);


-- ------------------------------------------------------------
-- PRESCRIPTION MEDICINES
-- ------------------------------------------------------------

CREATE TABLE prescription_medicines (
    id BIGSERIAL PRIMARY KEY,

    prescription_id BIGINT NOT NULL,

    medicine_name VARCHAR(200) NOT NULL,

    dosage VARCHAR(100),

    frequency VARCHAR(100),

    duration VARCHAR(100),

    instructions TEXT,

    CONSTRAINT prescription_medicines_prescription_fk
        FOREIGN KEY (prescription_id)
        REFERENCES prescriptions(id)
        ON DELETE CASCADE
);


-- ------------------------------------------------------------
-- INDEXES
-- ------------------------------------------------------------

CREATE INDEX idx_appointments_patient_id
    ON appointments(patient_id);

CREATE INDEX idx_appointments_doctor_id
    ON appointments(doctor_id);

CREATE INDEX idx_appointments_hospital_id
    ON appointments(hospital_id);

CREATE INDEX idx_appointments_date_status
    ON appointments(appointment_date, status);

CREATE INDEX idx_prescriptions_patient_id
    ON prescriptions(patient_id);

CREATE INDEX idx_prescriptions_doctor_id
    ON prescriptions(doctor_id);

CREATE INDEX idx_prescription_medicines_prescription_id
    ON prescription_medicines(prescription_id);

-- ============================================================
-- Group 4: Payments, Reviews, Notifications
-- ============================================================

-- ------------------------------------------------------------
-- PAYMENTS
-- ------------------------------------------------------------

CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,

    appointment_id BIGINT NOT NULL UNIQUE,

    patient_id BIGINT NOT NULL,

    amount NUMERIC(10, 2) NOT NULL,

    payment_method VARCHAR(30) NOT NULL DEFAULT 'MOCK',

    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    transaction_id VARCHAR(150) UNIQUE,

    paid_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT payments_appointment_fk
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(id)
        ON DELETE RESTRICT,

    CONSTRAINT payments_patient_fk
        FOREIGN KEY (patient_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT payments_amount_check
        CHECK (amount >= 0),

    CONSTRAINT payments_method_check
        CHECK (
            payment_method IN (
                'MOCK',
                'CARD',
                'UPI',
                'NET_BANKING'
            )
        ),

    CONSTRAINT payments_status_check
        CHECK (
            payment_status IN (
                'PENDING',
                'SUCCESS',
                'FAILED',
                'REFUNDED'
            )
        )
);


-- ------------------------------------------------------------
-- REVIEWS
-- ------------------------------------------------------------

CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,

    patient_id BIGINT NOT NULL,

    appointment_id BIGINT NOT NULL UNIQUE,

    hospital_id BIGINT NOT NULL,

    doctor_id BIGINT NOT NULL,

    hospital_rating INTEGER,

    doctor_rating INTEGER,

    comment TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT reviews_patient_fk
        FOREIGN KEY (patient_id)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT reviews_appointment_fk
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(id)
        ON DELETE RESTRICT,

    CONSTRAINT reviews_hospital_fk
        FOREIGN KEY (hospital_id)
        REFERENCES hospitals(id)
        ON DELETE RESTRICT,

    CONSTRAINT reviews_doctor_fk
        FOREIGN KEY (doctor_id)
        REFERENCES doctors(id)
        ON DELETE RESTRICT,

    CONSTRAINT reviews_hospital_rating_check
        CHECK (
            hospital_rating IS NULL
            OR hospital_rating BETWEEN 1 AND 5
        ),

    CONSTRAINT reviews_doctor_rating_check
        CHECK (
            doctor_rating IS NULL
            OR doctor_rating BETWEEN 1 AND 5
        ),

    CONSTRAINT reviews_rating_required
        CHECK (
            hospital_rating IS NOT NULL
            OR doctor_rating IS NOT NULL
        )
);


-- ------------------------------------------------------------
-- NOTIFICATIONS
-- ------------------------------------------------------------

CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    appointment_id BIGINT,

    type VARCHAR(30) NOT NULL,

    channel VARCHAR(20) NOT NULL,

    message TEXT NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    sent_at TIMESTAMP,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT notifications_user_fk
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT notifications_appointment_fk
        FOREIGN KEY (appointment_id)
        REFERENCES appointments(id)
        ON DELETE SET NULL,

    CONSTRAINT notifications_type_check
        CHECK (
            type IN (
                'APPOINTMENT',
                'PRESCRIPTION',
                'PAYMENT',
                'REMINDER',
                'SYSTEM'
            )
        ),

    CONSTRAINT notifications_channel_check
        CHECK (
            channel IN (
                'EMAIL',
                'SMS',
                'IN_APP'
            )
        ),

    CONSTRAINT notifications_status_check
        CHECK (
            status IN (
                'PENDING',
                'SENT',
                'FAILED'
            )
        )
);


-- ------------------------------------------------------------
-- INDEXES
-- ------------------------------------------------------------

CREATE INDEX idx_payments_patient_id
    ON payments(patient_id);

CREATE INDEX idx_payments_status
    ON payments(payment_status);

CREATE INDEX idx_reviews_hospital_id
    ON reviews(hospital_id);

CREATE INDEX idx_reviews_doctor_id
    ON reviews(doctor_id);

CREATE INDEX idx_notifications_user_id
    ON notifications(user_id);

CREATE INDEX idx_notifications_status
    ON notifications(status);

-- ------------------------------------------------------------
-- APPOINTMENT SLOT UNIQUENESS
-- ------------------------------------------------------------

CREATE UNIQUE INDEX IF NOT EXISTS
    idx_appointments_availability_unique
ON appointments (availability_id);
-- ============================================================
-- PASSWORD RESET TOKENS
-- ============================================================

CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    token_hash VARCHAR(255) NOT NULL UNIQUE,

    expires_at TIMESTAMP NOT NULL,

    used_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_password_reset_tokens_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id
    ON password_reset_tokens(user_id);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at
    ON password_reset_tokens(expires_at);