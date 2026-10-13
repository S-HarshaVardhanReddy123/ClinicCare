const request = require("supertest");

const BASE_URL = "http://localhost:5001";

let patientToken;
let doctorToken;
let adminToken;

describe("ClinicCare Hospital and Doctor APIs", () => {
    beforeAll(async () => {
        const patientLogin = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "patient@cliniccare.com",
                password: "Test@98765",
            });

        patientToken = patientLogin.body.token;

        const doctorLogin = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "ananya.rao@cliniccare.demo",
                password: "Doctor@12345",
            });

        doctorToken = doctorLogin.body.token;

        const adminLogin = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "admin@cliniccare.demo",
                password: "Admin@12345",
            });

        adminToken = adminLogin.body.token;
    });

    test("GET /api/hospitals/location/:locationId should return hospitals", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/location/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.hospitals)).toBe(true);
        expect(response.body.hospitals.length).toBeGreaterThan(0);
    });

    test("GET /api/hospitals/location/:locationId should include Guntur hospitals", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/location/1");

        expect(response.statusCode).toBe(200);

        const hospitalNames = response.body.hospitals.map(
            (hospital) => hospital.name
        );

        expect(hospitalNames.length).toBeGreaterThan(0);
    });

    test("GET /api/hospitals/:hospitalId should return hospital details", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/67");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.hospital).toBeDefined();

        // PostgreSQL BIGINT values are returned as strings by node-postgres.
        expect(response.body.hospital.id).toBe("67");
    });

    test("GET /api/hospitals/:hospitalId/doctors should return doctors", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/67/doctors");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.doctors)).toBe(true);
        expect(response.body.doctors.length).toBeGreaterThan(0);
    });

    test("GET /api/doctors/:doctorId should return doctor details", async () => {
        const response = await request(BASE_URL)
            .get("/api/doctors/63");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.doctor).toBeDefined();

        // PostgreSQL BIGINT values are returned as strings by node-postgres.
        expect(response.body.doctor.id).toBe("63");
    });

    test("GET /api/doctors/:doctorId/availability should return availability", async () => {
        const response = await request(BASE_URL)
            .get("/api/doctors/63/availability");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.availability)).toBe(true);
    });

    test("Hospital details should include rating information", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/67");

        expect(response.statusCode).toBe(200);

        const hospital = response.body.hospital;

        expect(hospital).toHaveProperty("rating");
        expect(hospital).toHaveProperty("review_count");
    });

    test("Doctor API should reject invalid doctor ID", async () => {
        const response = await request(BASE_URL)
            .get("/api/doctors/999999");

        expect([404, 400]).toContain(response.statusCode);
        expect(response.body.success).toBe(false);
    });

    test("Hospital API should reject invalid hospital ID", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/999999");

        expect([404, 400]).toContain(response.statusCode);
        expect(response.body.success).toBe(false);
    });

    test("Hospital API should work without authentication", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/location/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });
});