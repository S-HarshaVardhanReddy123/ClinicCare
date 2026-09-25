-- ============================================================
-- ClinicCare Seed Data
-- Development / Demo Data
-- ============================================================

-- ------------------------------------------------------------
-- LOCATIONS
-- ------------------------------------------------------------

INSERT INTO locations (state, district, city)
VALUES
    ('Andhra Pradesh', 'Guntur', 'Guntur'),
    ('Tamil Nadu', 'Chengalpattu', 'Tambaram'),
    ('Telangana', 'Hyderabad', 'Hyderabad')
ON CONFLICT (state, district, city) DO NOTHING;


-- ------------------------------------------------------------
-- DEMO HOSPITALS
-- ------------------------------------------------------------

INSERT INTO hospitals (
    location_id,
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description
)
SELECT
    l.id,
    h.name,
    h.address,
    h.phone,
    h.email,
    h.website,
    h.emergency_available,
    h.description
FROM locations l
CROSS JOIN (
    VALUES
        (
            'Sunrise Multispeciality Hospital',
            'Main Road, Guntur, Andhra Pradesh',
            '9000000001',
            'sunrise@cliniccare.demo',
            'https://cliniccare.demo',
            TRUE,
            'Demo hospital record for ClinicCare development and testing.'
        ),
        (
            'LifeCare Medical Centre',
            'City Center, Guntur, Andhra Pradesh',
            '9000000002',
            'lifecare@cliniccare.demo',
            'https://cliniccare.demo',
            TRUE,
            'Demo hospital record for ClinicCare development and testing.'
        ),
        (
            'Green Valley Hospital',
            'Healthcare Avenue, Guntur, Andhra Pradesh',
            '9000000003',
            'greenvalley@cliniccare.demo',
            'https://cliniccare.demo',
            FALSE,
            'Demo hospital record for ClinicCare development and testing.'
        ),
        (
            'Wellness Point Hospital',
            'Station Road, Guntur, Andhra Pradesh',
            '9000000004',
            'wellnesspoint@cliniccare.demo',
            'https://cliniccare.demo',
            TRUE,
            'Demo hospital record for ClinicCare development and testing.'
        ),
        (
            'CarePlus Multispeciality Centre',
            'Lakshmipuram, Guntur, Andhra Pradesh',
            '9000000005',
            'careplus@cliniccare.demo',
            'https://cliniccare.demo',
            TRUE,
            'Demo hospital record for ClinicCare development and testing.'
        ),
        (
            'Medistar Hospital',
            'Ring Road, Guntur, Andhra Pradesh',
            '9000000006',
            'medistar@cliniccare.demo',
            'https://cliniccare.demo',
            FALSE,
            'Demo hospital record for ClinicCare development and testing.'
        ),
        (
            'HealthFirst Hospital',
            'Arundelpet, Guntur, Andhra Pradesh',
            '9000000007',
            'healthfirst@cliniccare.demo',
            'https://cliniccare.demo',
            TRUE,
            'Demo hospital record for ClinicCare development and testing.'
        ),
        (
            'ApolloCare Medical Centre',
            'Brodipet, Guntur, Andhra Pradesh',
            '9000000008',
            'apollocare@cliniccare.demo',
            'https://cliniccare.demo',
            TRUE,
            'Demo hospital record for ClinicCare development and testing.'
        ),
        (
            'PrimeCare Hospital',
            'Nallapadu Road, Guntur, Andhra Pradesh',
            '9000000009',
            'primecare@cliniccare.demo',
            'https://cliniccare.demo',
            FALSE,
            'Demo hospital record for ClinicCare development and testing.'
        ),
        (
            'CityMed Multispeciality Hospital',
            'Bharatpet, Guntur, Andhra Pradesh',
            '9000000010',
            'citymed@cliniccare.demo',
            'https://cliniccare.demo',
            TRUE,
            'Demo hospital record for ClinicCare development and testing.'
        )
) AS h(
    name,
    address,
    phone,
    email,
    website,
    emergency_available,
    description
)
WHERE l.state = 'Andhra Pradesh'
  AND l.district = 'Guntur'
  AND l.city = 'Guntur'
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- DEPARTMENTS
-- ------------------------------------------------------------

INSERT INTO departments (name, description)
VALUES
    ('Cardiology', 'Diagnosis and treatment of heart and cardiovascular conditions.'),
    ('Neurology', 'Diagnosis and treatment of disorders of the brain, spine, and nervous system.'),
    ('Orthopedics', 'Treatment of bones, joints, muscles, ligaments, and related conditions.'),
    ('Pediatrics', 'Medical care for infants, children, and adolescents.'),
    ('Dermatology', 'Diagnosis and treatment of skin, hair, and nail conditions.'),
    ('General Medicine', 'Diagnosis and treatment of common adult medical conditions.'),
    ('General Surgery', 'Surgical diagnosis and treatment of a wide range of conditions.'),
    ('Gynecology', 'Healthcare services related to the female reproductive system.'),
    ('ENT', 'Diagnosis and treatment of ear, nose, and throat conditions.'),
    ('Ophthalmology', 'Diagnosis and treatment of eye and vision-related conditions.')
ON CONFLICT (name) DO NOTHING;


-- ------------------------------------------------------------
-- FACILITIES
-- ------------------------------------------------------------

INSERT INTO facilities (name, description)
VALUES
    ('ICU', 'Intensive Care Unit for patients requiring critical care.'),
    ('Emergency', 'Emergency medical services for urgent and critical conditions.'),
    ('Pharmacy', 'On-site pharmacy for prescribed medicines.'),
    ('Laboratory', 'Diagnostic laboratory for medical tests and investigations.'),
    ('Diagnostic Imaging', 'Imaging services including X-ray, ultrasound, CT, and MRI.'),
    ('Ambulance', 'Emergency and patient transportation ambulance service.'),
    ('Blood Bank', 'Blood storage and transfusion support services.'),
    ('Operation Theatre', 'Facilities for surgical procedures.')
ON CONFLICT (name) DO NOTHING;


-- ------------------------------------------------------------
-- HOSPITAL ↔ DEPARTMENT MAPPINGS
-- ------------------------------------------------------------

INSERT INTO hospital_departments (hospital_id, department_id)
SELECT h.id, d.id
FROM hospitals h
CROSS JOIN departments d
WHERE h.location_id = (
    SELECT id
    FROM locations
    WHERE state = 'Andhra Pradesh'
      AND district = 'Guntur'
      AND city = 'Guntur'
)
AND d.name IN (
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Dermatology',
    'General Medicine',
    'General Surgery',
    'Gynecology',
    'ENT',
    'Ophthalmology'
)
ON CONFLICT DO NOTHING;


-- ------------------------------------------------------------
-- HOSPITAL ↔ FACILITY MAPPINGS
-- ------------------------------------------------------------

INSERT INTO hospital_facilities (hospital_id, facility_id)
SELECT h.id, f.id
FROM hospitals h
CROSS JOIN facilities f
WHERE h.location_id = (
    SELECT id
    FROM locations
    WHERE state = 'Andhra Pradesh'
      AND district = 'Guntur'
      AND city = 'Guntur'
)
AND f.name IN (
    'ICU',
    'Emergency',
    'Pharmacy',
    'Laboratory',
    'Diagnostic Imaging',
    'Ambulance',
    'Blood Bank',
    'Operation Theatre'
)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- DEMO DOCTOR USERS
-- ------------------------------------------------------------

INSERT INTO users (
    name,
    email,
    phone,
    password_hash,
    role,
    is_active
)
VALUES
    (
        'Dr. Ananya Rao',
        'ananya.rao@cliniccare.demo',
        '9100000001',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    ),
    (
        'Dr. Rahul Sharma',
        'rahul.sharma@cliniccare.demo',
        '9100000002',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    ),
    (
        'Dr. Priya Reddy',
        'priya.reddy@cliniccare.demo',
        '9100000003',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    ),
    (
        'Dr. Kiran Kumar',
        'kiran.kumar@cliniccare.demo',
        '9100000004',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    ),
    (
        'Dr. Sneha Patel',
        'sneha.patel@cliniccare.demo',
        '9100000005',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    ),
    (
        'Dr. Arjun Verma',
        'arjun.verma@cliniccare.demo',
        '9100000006',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    ),
    (
        'Dr. Meera Nair',
        'meera.nair@cliniccare.demo',
        '9100000007',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    ),
    (
        'Dr. Vikram Singh',
        'vikram.singh@cliniccare.demo',
        '9100000008',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    ),
    (
        'Dr. Kavya Rao',
        'kavya.rao@cliniccare.demo',
        '9100000009',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    ),
    (
        'Dr. Naveen Reddy',
        'naveen.reddy@cliniccare.demo',
        '9100000010',
        '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        'DOCTOR',
        TRUE
    )
ON CONFLICT (email) DO NOTHING;


-- ------------------------------------------------------------
-- DEMO DOCTORS
-- ------------------------------------------------------------

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
    u.id,
    h.id,
    d.name,
    d.qualification,
    d.specialization,
    d.experience_years,
    d.expertise,
    d.diseases_treated,
    d.languages,
    d.consultation_fee,
    TRUE,
    TRUE
FROM (
    VALUES
        (
            'ananya.rao@cliniccare.demo',
            'Sunrise Multispeciality Hospital',
            'Dr. Ananya Rao',
            'MBBS, MD',
            'Cardiology',
            12,
            'Heart disease management, hypertension, preventive cardiology',
            'Hypertension, coronary artery disease, heart failure, chest pain',
            'English, Telugu, Hindi',
            800.00
        ),
        (
            'rahul.sharma@cliniccare.demo',
            'LifeCare Medical Centre',
            'Dr. Rahul Sharma',
            'MBBS, MD',
            'General Medicine',
            10,
            'Adult medicine, diabetes management, preventive healthcare',
            'Diabetes, hypertension, fever, infections, thyroid disorders',
            'English, Telugu, Hindi',
            600.00
        ),
        (
            'priya.reddy@cliniccare.demo',
            'Green Valley Hospital',
            'Dr. Priya Reddy',
            'MBBS, MS',
            'Orthopedics',
            9,
            'Joint disorders, sports injuries, fracture management',
            'Arthritis, fractures, back pain, sports injuries, joint pain',
            'English, Telugu, Hindi',
            700.00
        ),
        (
            'kiran.kumar@cliniccare.demo',
            'Wellness Point Hospital',
            'Dr. Kiran Kumar',
            'MBBS, MD',
            'Pediatrics',
            8,
            'Child healthcare, vaccination, pediatric infections',
            'Fever, respiratory infections, childhood allergies, nutritional disorders',
            'English, Telugu, Hindi',
            550.00
        ),
        (
            'sneha.patel@cliniccare.demo',
            'CarePlus Multispeciality Centre',
            'Dr. Sneha Patel',
            'MBBS, MD',
            'Dermatology',
            7,
            'Acne treatment, skin disorders, hair and scalp care',
            'Acne, eczema, psoriasis, fungal infections, hair loss',
            'English, Telugu, Hindi',
            650.00
        ),
        (
            'arjun.verma@cliniccare.demo',
            'Medistar Hospital',
            'Dr. Arjun Verma',
            'MBBS, MD',
            'Neurology',
            14,
            'Neurological disorders, headache management, stroke care',
            'Migraine, epilepsy, stroke, neuropathy, neurological disorders',
            'English, Telugu, Hindi',
            900.00
        ),
        (
            'meera.nair@cliniccare.demo',
            'HealthFirst Hospital',
            'Dr. Meera Nair',
            'MBBS, MS',
            'Gynecology',
            11,
            'Women''s health, pregnancy care, reproductive health',
            'PCOS, pregnancy care, menstrual disorders, infertility evaluation',
            'English, Telugu, Malayalam, Hindi',
            750.00
        ),
        (
            'vikram.singh@cliniccare.demo',
            'ApolloCare Medical Centre',
            'Dr. Vikram Singh',
            'MBBS, MS',
            'General Surgery',
            13,
            'General surgical procedures and minimally invasive surgery',
            'Appendicitis, hernia, gallbladder disorders, minor surgical conditions',
            'English, Telugu, Hindi',
            850.00
        ),
        (
            'kavya.rao@cliniccare.demo',
            'PrimeCare Hospital',
            'Dr. Kavya Rao',
            'MBBS, MS',
            'ENT',
            8,
            'Ear, nose and throat disorders, sinus treatment',
            'Sinusitis, tonsillitis, ear infections, hearing disorders',
            'English, Telugu, Hindi',
            600.00
        ),
        (
            'naveen.reddy@cliniccare.demo',
            'CityMed Multispeciality Hospital',
            'Dr. Naveen Reddy',
            'MBBS, MS',
            'Ophthalmology',
            10,
            'General eye care, cataract evaluation, vision disorders',
            'Cataract, glaucoma, eye infections, refractive errors',
            'English, Telugu, Hindi',
            650.00
        )
) AS d(
    email,
    hospital_name,
    name,
    qualification,
    specialization,
    experience_years,
    expertise,
    diseases_treated,
    languages,
    consultation_fee
)
JOIN users u
    ON u.email = d.email
JOIN hospitals h
    ON h.name = d.hospital_name
WHERE h.location_id = (
    SELECT id
    FROM locations
    WHERE state = 'Andhra Pradesh'
      AND district = 'Guntur'
      AND city = 'Guntur'
)
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- DEMO DOCTOR AVAILABILITY
-- ------------------------------------------------------------

INSERT INTO doctor_availability (
    doctor_id,
    available_date,
    start_time,
    end_time,
    is_available
)
SELECT
    d.id,
    CURRENT_DATE + v.day_offset,
    v.start_time,
    v.end_time,
    TRUE
FROM doctors d
CROSS JOIN (
    VALUES
        (1, TIME '09:00', TIME '12:00'),
        (2, TIME '14:00', TIME '17:00'),
        (3, TIME '09:00', TIME '12:00'),
        (4, TIME '14:00', TIME '17:00'),
        (5, TIME '10:00', TIME '13:00'),
        (6, TIME '15:00', TIME '18:00')
) AS v(
    day_offset,
    start_time,
    end_time
)
WHERE d.hospital_id IN (
    SELECT h.id
    FROM hospitals h
    WHERE h.location_id = (
        SELECT id
        FROM locations
        WHERE state = 'Andhra Pradesh'
          AND district = 'Guntur'
          AND city = 'Guntur'
    )
)
ON CONFLICT DO NOTHING;