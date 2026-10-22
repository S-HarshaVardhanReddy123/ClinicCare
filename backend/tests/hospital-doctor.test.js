const request = require("supertest");

const BASE_URL = "http://localhost:5001";

let hospitalId;
let doctorId;

describe("ClinicCare Hospital and Doctor APIs", () => {
    beforeAll(async () => {
        // Discover hospitals from the API instead of assuming an ID.
        const hospitalsResponse = await request(BASE_URL)
            .get("/api/hospitals/location/1");

        expect(hospitalsResponse.statusCode).toBe(200);
        expect(hospitalsResponse.body.success).toBe(true);
        expect(hospitalsResponse.body.hospitals.length).toBeGreaterThan(0);

        // Find a hospital that actually has at least one doctor.
        for (const hospital of hospitalsResponse.body.hospitals) {
            const doctorsResponse = await request(BASE_URL)
                .get(`/api/hospitals/${hospital.id}/doctors`);

            if (
                doctorsResponse.statusCode === 200 &&
                doctorsResponse.body.success === true &&
                Array.isArray(doctorsResponse.body.doctors) &&
                doctorsResponse.body.doctors.length > 0
            ) {
                hospitalId = hospital.id;
                doctorId = doctorsResponse.body.doctors[0].id;
                break;
            }
        }

        expect(hospitalId).toBeDefined();
        expect(doctorId).toBeDefined();
    });

    test("Hospital listing should return hospitals", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/location/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.hospitals)).toBe(true);
        expect(response.body.hospitals.length).toBeGreaterThan(0);
    });

    test("Hospital listing should include hospital names", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/location/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.hospitals.every(
            hospital => typeof hospital.name === "string" && hospital.name.length > 0
        )).toBe(true);
    });

    test("Hospital details should return the discovered hospital", async () => {
        const response = await request(BASE_URL)
            .get(`/api/hospitals/${hospitalId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.hospital).toBeDefined();
        expect(String(response.body.hospital.id)).toBe(String(hospitalId));
    });

    test("Hospital should return its doctors", async () => {
        const response = await request(BASE_URL)
            .get(`/api/hospitals/${hospitalId}/doctors`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.doctors)).toBe(true);
        expect(response.body.doctors.length).toBeGreaterThan(0);
    });

    test("Doctor details should return the discovered doctor", async () => {
        const response = await request(BASE_URL)
            .get(`/api/doctors/${doctorId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.doctor).toBeDefined();
        expect(String(response.body.doctor.id)).toBe(String(doctorId));
    });

    test("Doctor availability endpoint should return an array", async () => {
        const response = await request(BASE_URL)
            .get(`/api/doctors/${doctorId}/availability`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.availability)).toBe(true);
    });

    test("Hospital details should include rating information", async () => {
        const response = await request(BASE_URL)
            .get(`/api/hospitals/${hospitalId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.hospital).toHaveProperty("rating");
        expect(response.body.hospital).toHaveProperty("review_count");
    });

    test("Invalid doctor ID should be rejected", async () => {
        const response = await request(BASE_URL)
            .get("/api/doctors/999999");

        expect([400, 404]).toContain(response.statusCode);
        expect(response.body.success).toBe(false);
    });

    test("Invalid hospital ID should be rejected", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/999999");

        expect([400, 404]).toContain(response.statusCode);
        expect(response.body.success).toBe(false);
    });

    test("Hospital listing should work without authentication", async () => {
        const response = await request(BASE_URL)
            .get("/api/hospitals/location/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
    });
});
