const request = require("supertest");

const BASE_URL = "http://localhost:5001";

describe("ClinicCare Authentication API", () => {
    test("POST /api/auth/login should reject missing credentials", async () => {
        const response = await request(BASE_URL)
            .post("/api/auth/login")
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });

    test("POST /api/auth/login should reject invalid credentials", async () => {
        const response = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "patient@cliniccare.com",
                password: "WrongPassword123",
            });

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });

    test("POST /api/auth/login should authenticate the patient", async () => {
        const response = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "patient@cliniccare.com",
                password: "Test@98765",
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
        expect(response.body.user).toBeDefined();
        expect(response.body.user.role).toBe("PATIENT");
    });

    test("POST /api/auth/login should authenticate the admin", async () => {
        const response = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "admin@cliniccare.demo",
                password: "Admin@12345",
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
        expect(response.body.user.role).toBe("ADMIN");
    });

    test("POST /api/auth/login should authenticate the doctor", async () => {
        const response = await request(BASE_URL)
            .post("/api/auth/login")
            .send({
                email: "ananya.rao@cliniccare.demo",
                password: "Doctor@12345",
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
        expect(response.body.user.role).toBe("DOCTOR");
    });

    test("GET /api/auth/me should reject missing token", async () => {
        const response = await request(BASE_URL)
            .get("/api/auth/me");

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
    });
});