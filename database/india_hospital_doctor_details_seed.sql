-- ClinicCare demo hospital details and doctor seed
-- Adds detailed demo departments/facilities and 2 demo doctors per ClinicCare Demo hospital.
-- Existing ClinicCare data is preserved.
-- All generated hospital/doctor records are explicitly DEMO data.

BEGIN;

-- ------------------------------------------------------------
-- DEPARTMENTS
-- ------------------------------------------------------------
INSERT INTO departments (name, description)
SELECT v.name, v.description
FROM (VALUES
    ('General Medicine','Diagnosis and treatment of common adult illnesses and chronic conditions.'),
    ('Cardiology','Heart and cardiovascular disease evaluation and treatment.'),
    ('Orthopedics','Bone, joint, muscle, spine and sports injury care.'),
    ('Pediatrics','Medical care for infants, children and adolescents.'),
    ('Dermatology','Diagnosis and treatment of skin, hair and nail conditions.'),
    ('Neurology','Evaluation and treatment of neurological disorders.'),
    ('Gynecology','Women''s reproductive and gynecological healthcare.'),
    ('General Surgery','Surgical evaluation and common operative procedures.'),
    ('ENT','Ear, nose and throat evaluation and treatment.'),
    ('Ophthalmology','Eye examinations and treatment of eye conditions.'),
    ('Emergency Medicine','Urgent assessment and emergency medical care.')
) AS v(name, description)
WHERE NOT EXISTS (
    SELECT 1 FROM departments d WHERE LOWER(d.name) = LOWER(v.name)
);

-- ------------------------------------------------------------
-- FACILITIES
-- ------------------------------------------------------------
INSERT INTO facilities (name, description)
SELECT v.name, v.description
FROM (VALUES
    ('24x7 Emergency','Emergency support available around the clock for demo purposes.'),
    ('Pharmacy','In-house pharmacy facility for routine prescriptions.'),
    ('Diagnostic Laboratory','Routine laboratory and diagnostic testing facility.'),
    ('Radiology','Imaging and radiology support facility.'),
    ('Ambulance','Ambulance support listed for this demo hospital.'),
    ('ICU','Intensive care unit facility listed for this demo hospital.'),
    ('Operation Theatre','Surgical operation theatre facility.'),
    ('Blood Bank','Blood storage and transfusion support facility.'),
    ('Health Checkup','Preventive and routine health checkup services.')
) AS v(name, description)
WHERE NOT EXISTS (
    SELECT 1 FROM facilities f WHERE LOWER(f.name) = LOWER(v.name)
);

-- ------------------------------------------------------------
-- HOSPITAL DETAILS + DEPARTMENTS + FACILITIES
-- ------------------------------------------------------------
UPDATE hospitals
SET
    description = CASE
        WHEN description IS NULL OR description = '' OR description NOT ILIKE '%DEMO%' THEN
            'ClinicCare DEMO hospital providing multispeciality healthcare services for application testing. This is sample data and not a real hospital.'
        ELSE description
    END,
    emergency_available = TRUE,
    phone = COALESCE(NULLIF(phone,''), '1800-000-0000'),
    email = COALESCE(NULLIF(email,''), 'support@cliniccare.demo'),
    website = COALESCE(NULLIF(website,''), 'https://cliniccare.demo')
WHERE name ILIKE 'ClinicCare Demo %';

-- Link every demo hospital to all demo departments.
INSERT INTO hospital_departments (hospital_id, department_id)
SELECT h.id, d.id
FROM hospitals h
CROSS JOIN departments d
WHERE h.name ILIKE 'ClinicCare Demo %'
  AND NOT EXISTS (
      SELECT 1
      FROM hospital_departments hd
      WHERE hd.hospital_id = h.id
        AND hd.department_id = d.id
  );

-- Link every demo hospital to all demo facilities.
INSERT INTO hospital_facilities (hospital_id, facility_id)
SELECT h.id, f.id
FROM hospitals h
CROSS JOIN facilities f
WHERE h.name ILIKE 'ClinicCare Demo %'
  AND NOT EXISTS (
      SELECT 1
      FROM hospital_facilities hf
      WHERE hf.hospital_id = h.id
        AND hf.facility_id = f.id
  );

-- ------------------------------------------------------------
-- DEMO DOCTORS
-- ------------------------------------------------------------
DO $$
DECLARE
    h RECORD;
    i INTEGER;
    doctor_name TEXT;
    first_name TEXT;
    last_name TEXT;
    specialty TEXT;
    qualification TEXT;
    expertise_text TEXT;
    diseases_text TEXT;
    languages_text TEXT;
    email_text TEXT;
    phone_text TEXT;
    doctor_user_id INTEGER;
    existing_doctor INTEGER;
    specialties TEXT[] := ARRAY[
        'General Medicine',
        'Cardiology',
        'Orthopedics',
        'Pediatrics',
        'Dermatology',
        'Neurology',
        'Gynecology',
        'General Surgery',
        'ENT',
        'Ophthalmology'
    ];
    first_names TEXT[] := ARRAY[
        'Ananya','Rahul','Priya','Arjun','Sneha','Vikram','Kavya','Rohan',
        'Meera','Kiran','Nisha','Aditya','Divya','Sanjay','Neha','Varun',
        'Pooja','Aarav','Ishita','Manish'
    ];
    last_names TEXT[] := ARRAY[
        'Rao','Sharma','Reddy','Patel','Verma','Kumar','Singh','Nair',
        'Kapoor','Gupta','Joshi','Iyer','Menon','Das','Chowdhury','Mishra'
    ];
BEGIN
    FOR h IN
        SELECT
            hp.id AS hospital_id,
            hp.name AS hospital_name,
            l.city,
            l.state
        FROM hospitals hp
        JOIN locations l ON l.id = hp.location_id
        WHERE hp.name ILIKE 'ClinicCare Demo %'
        ORDER BY hp.id
    LOOP
        FOR i IN 1..2 LOOP
            first_name := first_names[((h.hospital_id + i - 2) % array_length(first_names,1)) + 1];
            last_name := last_names[((h.hospital_id + i * 3 - 3) % array_length(last_names,1)) + 1];
            doctor_name := 'Dr. ' || first_name || ' ' || last_name;

            specialty := specialties[((h.hospital_id + i - 2) % array_length(specialties,1)) + 1];

            qualification := CASE specialty
                WHEN 'General Medicine' THEN 'MBBS, MD - General Medicine'
                WHEN 'Cardiology' THEN 'MBBS, MD, DM - Cardiology'
                WHEN 'Orthopedics' THEN 'MBBS, MS - Orthopedics'
                WHEN 'Pediatrics' THEN 'MBBS, MD - Pediatrics'
                WHEN 'Dermatology' THEN 'MBBS, MD - Dermatology'
                WHEN 'Neurology' THEN 'MBBS, MD, DM - Neurology'
                WHEN 'Gynecology' THEN 'MBBS, MD - Obstetrics & Gynecology'
                WHEN 'General Surgery' THEN 'MBBS, MS - General Surgery'
                WHEN 'ENT' THEN 'MBBS, MS - ENT'
                WHEN 'Ophthalmology' THEN 'MBBS, MS - Ophthalmology'
            END;

            expertise_text := CASE specialty
                WHEN 'General Medicine' THEN 'Diabetes, hypertension, fever, infections and preventive care'
                WHEN 'Cardiology' THEN 'Heart disease, hypertension, ECG and cardiac risk assessment'
                WHEN 'Orthopedics' THEN 'Arthritis, fractures, back pain, joint and sports injuries'
                WHEN 'Pediatrics' THEN 'Child health, vaccination, nutrition and common pediatric illnesses'
                WHEN 'Dermatology' THEN 'Acne, eczema, allergies, pigmentation and hair disorders'
                WHEN 'Neurology' THEN 'Headache, migraine, epilepsy, neuropathy and stroke evaluation'
                WHEN 'Gynecology' THEN 'Women''s health, menstrual disorders and reproductive care'
                WHEN 'General Surgery' THEN 'General surgical evaluation, hernia, gallbladder and wound care'
                WHEN 'ENT' THEN 'Sinusitis, hearing problems, throat disorders and allergies'
                WHEN 'Ophthalmology' THEN 'Eye examination, cataract evaluation and common eye disorders'
            END;

            diseases_text := expertise_text;
            languages_text := 'English, Hindi, Telugu';

            email_text :=
                'doctor' || h.hospital_id || '_' || i || '@cliniccare.demo';

            phone_text :=
                '+91-90000-' || LPAD(((h.hospital_id * 10 + i) % 100000)::TEXT, 5, '0');

            SELECT d.id
            INTO existing_doctor
            FROM doctors d
            WHERE d.hospital_id = h.hospital_id
              AND LOWER(d.name) = LOWER(doctor_name)
            LIMIT 1;

            IF existing_doctor IS NULL THEN
                INSERT INTO users (
                    name,
                    email,
                    phone,
                    password_hash,
                    role,
                    is_active
                )
                SELECT
                    doctor_name,
                    email_text,
                    phone_text,
                    '$2b$10$STNle2VlY.gTAL2LI0Fsieemuq2tF54VrvvFFOb.XiNFQyDlrDKZq',
                    'DOCTOR',
                    TRUE
                WHERE NOT EXISTS (
                    SELECT 1 FROM users u WHERE LOWER(u.email) = LOWER(email_text)
                )
                RETURNING id INTO doctor_user_id;

                IF doctor_user_id IS NULL THEN
                    SELECT u.id
                    INTO doctor_user_id
                    FROM users u
                    WHERE LOWER(u.email) = LOWER(email_text)
                    LIMIT 1;
                END IF;

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
                SELECT
                    doctor_user_id,
                    h.hospital_id,
                    doctor_name,
                    qualification,
                    specialty,
                    5 + ((h.hospital_id + i) % 16),
                    expertise_text,
                    diseases_text,
                    languages_text,
                    500 + (((h.hospital_id + i) % 6) * 100),
                    TRUE,
                    TRUE
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM doctors d2
                    WHERE d2.user_id = doctor_user_id
                       OR (d2.hospital_id = h.hospital_id AND LOWER(d2.name) = LOWER(doctor_name))
                );
            END IF;
        END LOOP;
    END LOOP;
END $$;

COMMIT;
