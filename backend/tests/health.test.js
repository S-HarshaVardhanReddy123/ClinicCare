const request = require("supertest");

const BASE_URL = "http://localhost:5001";

describe("ClinicCare Health API", () => {
    test("GET /api/health should return healthy status", async () => {
        const response = await request(BASE_URL)
            .get("/api/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.database).toBe("connected");
    });
});