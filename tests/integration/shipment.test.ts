import { ShipmentStatus } from '../../src/types/shipment'
import request from 'supertest'
import app from '../../src/app'
import mongoose from 'mongoose'
import { clearTestDB, connectTestDB, disconnectTestDB } from '../db-helper'

beforeAll(async () => await connectTestDB())
afterEach(async () => await clearTestDB())
afterAll(async () => await disconnectTestDB())

describe('Shipment Integration Tests', () => {
    const mockShipment = {
        origin: "Lagos, Nigeria",
        destination: "Akure, Nigeria",
        status: ShipmentStatus.PENDING,
        estimatedDelivery: new Date().toISOString()
    }

    describe('POST /api/shipments', () => {
        it('should create a new shipment with valid data', async () => {
            const res = await request(app).post('/api/shipments').send(mockShipment)

            expect(res.statusCode).toEqual(201)
            expect(res.body.success).toBe(true)
            expect(res.body.data.origin).toBe(mockShipment.origin)
            expect(res.body.data.id).toBeDefined()
        })

        it("should fail validation if required fields are missing", async () => {
            const res = await request(app).post("/api/shipments").send({ origin: "Lagos" })

            expect(res.status).toBe(400)
            expect(res.body.success).toBe(false)
        });
    })

    describe("GET /api/shipments", () => {
        it("should return a paginated list of shipments", async () => {
            await request(app).post("/api/shipments").send(mockShipment);
            await request(app).post("/api/shipments").send({ ...mockShipment, origin: "Kano" });

            const res = await request(app).get("/api/shipments");

            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
            expect(res.body.pagination.totalItems).toBe(2);
        });

        it("should filter shipments by status", async () => {
            await request(app).post("/api/shipments").send({ ...mockShipment, status: "pending" });
            await request(app).post("/api/shipments").send({ ...mockShipment, status: "delivered" });

            const res = await request(app).get("/api/shipments?status=delivered");

            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(1);
            expect(res.body.data[0].status).toBe("delivered");
        });
    });

    describe("GET /api/shipments/:id", () => {
        it("should return a shipment by ID", async () => {
            const created = await request(app).post("/api/shipments").send(mockShipment);
            const id = created.body.data.id;

            const res = await request(app).get(`/api/shipments/${id}`);

            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(id);
        });

        it("should return 404 for non-existent ID", async () => {
            const fakeId = new mongoose.Types.ObjectId().toString();
            const res = await request(app).get(`/api/shipments/${fakeId}`);

            expect(res.status).toBe(404);
        });

        it("should return 400 for invalid ID format", async () => {
            const res = await request(app).get("/api/shipments/invalid-id");
            expect(res.status).toBe(400);
        });
    });

    describe("PUT /api/shipments/:id", () => {
        it("should update shipment details", async () => {
            const created = await request(app).post("/api/shipments").send(mockShipment);
            const id = created.body.data.id;

            const res = await request(app).put(`/api/shipments/${id}`).send({ status: ShipmentStatus.DELIVERED });

            expect(res.status).toBe(200);
            expect(res.body.data.status).toBe(ShipmentStatus.DELIVERED);
        });
    });

    describe("DELETE /api/shipments/:id", () => {
        it("should delete a shipment", async () => {
            const created = await request(app).post("/api/shipments").send(mockShipment);
            const id = created.body.data.id;

            const res = await request(app).delete(`/api/shipments/${id}`);

            expect(res.status).toBe(200);

            const check = await request(app).get(`/api/shipments/${id}`);
            expect(check.status).toBe(404);
        });
    });
})