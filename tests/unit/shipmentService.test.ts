import { shipmentService } from "../../src/services/ShipmentService";
import { Shipment } from "../../src/models/Shipment";
import { ShipmentStatus } from "../../src/types";

jest.mock("../../src/models/Shipment");

describe("ShipmentService Unit Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockShipmentData = {
        id: "60d0fe4f5311236168a109ca",
        origin: "Lagos, Nigeria",
        destination: "Abuja, Nigeria",
        status: ShipmentStatus.PENDING,
        estimatedDelivery: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    describe("create", () => {
        it("should create a shipment successfully", async () => {
            (Shipment.create as jest.Mock).mockResolvedValue(mockShipmentData);

            const result = await shipmentService.create({
                origin: "Lagos, Nigeria",
                destination: "Abuja, Nigeria",
            });

            expect(Shipment.create).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockShipmentData);
        });
    });

    describe("findById", () => {
        it("should return shipment if found", async () => {
            (Shipment.findById as jest.Mock).mockResolvedValue(mockShipmentData);

            const result = await shipmentService.findById("valid_id");

            expect(Shipment.findById).toHaveBeenCalledWith("valid_id");
            expect(result).toEqual(mockShipmentData);
        });

        it("should throw 404 if not found", async () => {
            (Shipment.findById as jest.Mock).mockResolvedValue(null);

            await expect(shipmentService.findById("invalid_id"))
                .rejects
                .toEqual(expect.objectContaining({
                    statusCode: 404,
                    message: "Shipment not found"
                }));
        });
    });

    describe("update", () => {
        it("should update and return the shipment", async () => {
            (Shipment.findByIdAndUpdate as jest.Mock).mockResolvedValue({
                ...mockShipmentData,
                status: ShipmentStatus.DELIVERED
            });

            const result = await shipmentService.update("valid_id", {
                status: ShipmentStatus.DELIVERED
            });

            expect(Shipment.findByIdAndUpdate).toHaveBeenCalled();
            expect(result.status).toBe(ShipmentStatus.DELIVERED);
        });
    });

    describe("findAll", () => {
        it("should return paginated results", async () => {
            const mockQuery = {
                sort: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue([mockShipmentData]),
            };

            (Shipment.find as jest.Mock).mockReturnValue(mockQuery);

            (Shipment.countDocuments as jest.Mock).mockResolvedValue(1);

            const result = await shipmentService.findAll({ page: 1, limit: 10 });

            expect(Shipment.find).toHaveBeenCalled();
            expect(mockQuery.sort).toHaveBeenCalled();
            expect(mockQuery.skip).toHaveBeenCalled();
            expect(mockQuery.limit).toHaveBeenCalled();

            expect(result.pagination.totalItems).toBe(1);
            expect(result.data).toHaveLength(1);
        });
    });
});