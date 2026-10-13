const request = require("supertest");

const BASE_URL = "http://localhost:5001";

let patientToken;
let doctorToken;
let adminToken;

let patientAppointmentId;
let doctorAppointmentId;

describe("ClinicCare Appointment APIs", () => {

    // ============================================================
    // AUTHENTICATION SETUP
    // ============================================================

    beforeAll(async () => {
        const patientLogin = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "patient@cliniccare.com",
                password: "Test@98765",
            });

        expect(patientLogin.statusCode).toBe(200);
        expect(patientLogin.body.success).toBe(true);

        patientToken = patientLogin.body.token;

        const doctorLogin = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "ananya.rao@cliniccare.demo",
                password: "Doctor@12345",
            });

        expect(doctorLogin.statusCode).toBe(200);
        expect(doctorLogin.body.success).toBe(true);

        doctorToken = doctorLogin.body.token;

        const adminLogin = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "admin@cliniccare.demo",
                password: "Admin@12345",
            });

        expect(adminLogin.statusCode).toBe(200);
        expect(adminLogin.body.success).toBe(true);

        adminToken = adminLogin.body.token;
    });


    // ============================================================
    // PATIENT APPOINTMENTS
    // ============================================================

    test("Patient should be able to view their appointments", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/my")
            .set("Authorization", `Bearer ${patientToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.count).toBeGreaterThan(0);
        expect(Array.isArray(response.body.appointments)).toBe(true);

        patientAppointmentId = response.body.appointments[0].id;

        expect(patientAppointmentId).toBeDefined();
    });


    test("Patient appointments should contain appointment details", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/my")
            .set("Authorization", `Bearer ${patientToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.appointments.length).toBeGreaterThan(0);

        const appointment = response.body.appointments[0];

        expect(appointment.id).toBeDefined();
        expect(appointment.doctor_id).toBeDefined();
        expect(appointment.hospital_id).toBeDefined();
        expect(appointment.appointment_date).toBeDefined();
        expect(appointment.appointment_time).toBeDefined();
        expect(appointment.reason).toBeDefined();
        expect(appointment.status).toBeDefined();
        expect(appointment.doctor_name).toBeDefined();
        expect(appointment.hospital_name).toBeDefined();
    });


    // ============================================================
    // DOCTOR APPOINTMENTS
    // ============================================================

    test("Doctor should be able to view doctor appointments", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/doctor")
            .set("Authorization", `Bearer ${doctorToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.appointments)).toBe(true);
        expect(response.body.count).toBeGreaterThan(0);

        doctorAppointmentId = response.body.appointments[0].id;

        expect(doctorAppointmentId).toBeDefined();
    });


    test("Doctor appointments should contain appointment details", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/doctor")
            .set("Authorization", `Bearer ${doctorToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.appointments.length).toBeGreaterThan(0);

        const appointment = response.body.appointments[0];

        expect(appointment.id).toBeDefined();
        expect(appointment.patient_id).toBeDefined();
        expect(appointment.doctor_id).toBeDefined();
        expect(appointment.hospital_id).toBeDefined();
        expect(appointment.availability_id).toBeDefined();
        expect(appointment.appointment_date).toBeDefined();
        expect(appointment.appointment_time).toBeDefined();
        expect(appointment.reason).toBeDefined();
        expect(appointment.status).toBeDefined();
        expect(appointment.patient_name).toBeDefined();
        expect(appointment.patient_email).toBeDefined();
        expect(appointment.doctor_name).toBeDefined();
        expect(appointment.hospital_name).toBeDefined();
    });


    // ============================================================
    // APPOINTMENT DETAILS
    // ============================================================

    test("Patient should be able to view their own appointment", async () => {
        expect(patientAppointmentId).toBeDefined();

        const response = await request(BASE_URL)
            .get(`/api/appointments/${patientAppointmentId}`)
            .set("Authorization", `Bearer ${patientToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.appointment).toBeDefined();
    });


    test("Doctor should be able to view an appointment", async () => {
        expect(doctorAppointmentId).toBeDefined();

        const response = await request(BASE_URL)
            .get(`/api/appointments/${doctorAppointmentId}`)
            .set("Authorization", `Bearer ${doctorToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.appointment).toBeDefined();
    });


    test("Unauthenticated user should not view appointment", async () => {
        expect(patientAppointmentId).toBeDefined();

        const response = await request(BASE_URL)
            .get(`/api/appointments/${patientAppointmentId}`);

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });


    // ============================================================
    // STATUS VALIDATION
    // ============================================================

    test("Doctor should reject invalid appointment status", async () => {
        const appointmentId = doctorAppointmentId || 999999;

        const response = await request(BASE_URL)
            .patch(`/api/appointments/doctor/${appointmentId}/status`)
            .set("Authorization", `Bearer ${doctorToken}`)
            .send({
                status: "INVALID_STATUS",
            });

        expect([400, 404]).toContain(response.statusCode);
        expect(response.body.success).toBe(false);
    });


    test("Patient should not be allowed to update appointment status", async () => {
        const appointmentId = patientAppointmentId || 999999;

        const response = await request(BASE_URL)
            .patch(`/api/appointments/doctor/${appointmentId}/status`)
            .set("Authorization", `Bearer ${patientToken}`)
            .send({
                status: "ACCEPTED",
            });

        expect([401, 403]).toContain(response.statusCode);
        expect(response.body.success).toBe(false);
    });


    // ============================================================
    // AUTHORIZATION
    // ============================================================

    test("Patient should not access doctor appointment list", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/doctor")
            .set("Authorization", `Bearer ${patientToken}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
    });


    test("Doctor should not access patient appointment list", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/my")
            .set("Authorization", `Bearer ${doctorToken}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
    });


    test("Admin should not access patient appointment list", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/my")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
    });


    test("Admin should not access doctor appointment list", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/doctor")
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
    });


    // ============================================================
    // INVALID APPOINTMENT
    // ============================================================

    test("Patient should receive 404 for non-existent appointment", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/999999")
            .set("Authorization", `Bearer ${patientToken}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
    });


    test("Doctor should receive 404 for non-existent appointment", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/999999")
            .set("Authorization", `Bearer ${doctorToken}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
    });


    // ============================================================
    // INVALID AUTHENTICATION
    // ============================================================

    test("Missing token should not access patient appointments", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/my");

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });


    test("Missing token should not access doctor appointments", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/doctor");

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });


    test("Invalid token should not access patient appointments", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/my")
            .set("Authorization", "Bearer invalid-token");

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });


    // ============================================================
    // APPOINTMENT CREATION VALIDATION
    // ============================================================

    test("Patient should reject appointment creation with missing fields", async () => {
        const response = await request(BASE_URL)
            .post("/api/appointments")
            .set("Authorization", `Bearer ${patientToken}`)
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });


    test("Doctor should not create patient appointment", async () => {
        const response = await request(BASE_URL)
            .post("/api/appointments")
            .set("Authorization", `Bearer ${doctorToken}`)
            .send({
                doctorId: 63,
                availabilityId: 64,
                appointmentDate: "2026-09-29",
                appointmentTime: "14:00",
                reason: "Test appointment",
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
    });


    test("Admin should not create patient appointment", async () => {
        const response = await request(BASE_URL)
            .post("/api/appointments")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({
                doctorId: 63,
                availabilityId: 65,
                appointmentDate: "2026-09-30",
                appointmentTime: "10:00",
                reason: "Test appointment",
            });

        expect(response.statusCode).toBe(403);
        expect(response.body.success).toBe(false);
    });


    // ============================================================
    // APPOINTMENT STATUS CHECK
    // ============================================================

    test("Patient appointment response should contain valid status", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/my")
            .set("Authorization", `Bearer ${patientToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);

        response.body.appointments.forEach((appointment) => {
            expect([
                "PENDING",
                "ACCEPTED",
                "REJECTED",
                "COMPLETED",
                "CANCELLED",
                "NO_SHOW",
            ]).toContain(appointment.status);
        });
    });


    test("Doctor appointment response should contain valid status", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/doctor")
            .set("Authorization", `Bearer ${doctorToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);

        response.body.appointments.forEach((appointment) => {
            expect([
                "PENDING",
                "ACCEPTED",
                "REJECTED",
                "COMPLETED",
                "CANCELLED",
                "NO_SHOW",
            ]).toContain(appointment.status);
        });
    });


    // ============================================================
    // APPOINTMENT ID VALIDATION
    // ============================================================

    test("Invalid appointment ID should return an error", async () => {
        const response = await request(BASE_URL)
            .get("/api/appointments/invalid-id")
            .set("Authorization", `Bearer ${patientToken}`);

        expect([400, 404, 500]).toContain(response.statusCode);
        expect(response.body.success).toBe(false);
    });
});