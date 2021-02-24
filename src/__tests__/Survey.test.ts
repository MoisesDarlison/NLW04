import request from 'supertest';
import { app } from '../app';
import createConnection from '../config/dbConfig'

describe("surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });
    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "title exemple",
            description: "Descricoes exemple"
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id")
    });
    it("Should be able get all surveys", async () => {
         await request(app).post("/surveys").send({
            title: "title exemple2",
            description: "Descricoes exemple2"
        });
        const response = await request(app).get("/surveys")

        expect(response.body.length).toBe(2)
        
        
    });
});