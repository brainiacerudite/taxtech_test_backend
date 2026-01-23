import { ShipmentDoc } from "../models/Shipment";
import { CreateShipmentInput } from "../validations/shipment.validation";

export class ShipmentService {
    async create(data: CreateShipmentInput): Promise<ShipmentDoc> {
        // implement
    }

    async findAll() {
        // implement
    }

    async findById(id: string): Promise<ShipmentDoc> {
        // implement
    }

    async update(id: string, data: CreateShipmentInput): Promise<ShipmentDoc> {
        // implement
    }

    async delete(id: string): Promise<void> {
        // implement
    }
}
