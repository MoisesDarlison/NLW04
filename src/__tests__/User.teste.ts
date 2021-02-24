import request from 'supertest';
import { app } from '../app';
import createConnection from '../config/dbConfig'

describe("users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });
    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "test_",
            email: "testes_1@testes.com.br"
        });
        expect(response.status).toBe(201);
    });
});
