import request from "supertest";
import app from "../app";
describe("AUTH API", () => {
    const userData = {
        name: "Test User",
        email: `testuser_${Date.now()}@gmail.com`,
        password: "password123",
    };
    // REGISTER
    it("user berhasil register", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(userData);
        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("id");
    });
    it("gagal register (email sudah terdaftar)", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send(userData);
        expect(res.status).toBe(400);
    });
    // LOGIN
    it("berhasil login", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
            email: userData.email,
            password: userData.password,
        });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty("token");
        expect(res.body.data.user.email).toBe(userData.email);
    });
    it("gagal login (password salah)", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
            email: userData.email,
            password: "salah",
        });
        expect(res.status).toBe(400);
    });
});
//# sourceMappingURL=auth.test.js.map