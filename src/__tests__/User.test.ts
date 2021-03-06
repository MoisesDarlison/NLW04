import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../config/dbConfig';

describe("users", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            name: "test_",
            email: "testes_@testes.com.br"
        });
        expect(response.status).toBe(201);
    });
    
    it("Should be able to create a user with exist email", async () => {
        const response = await request(app).post("/users").send({
            name: "test_",
            email: "testes_@testes.com.br"
        });
        expect(response.status).toBe(400);
    });

});