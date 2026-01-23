import { createError } from "../middleware/errorHandler";
import { Shipment, ShipmentDoc } from "../models/Shipment";
import { IShipment, PaginatedResponse, PaginationQuery, ShipmentStatus } from "../types";

export class ShipmentService {
    async create(data: Partial<IShipment>): Promise<ShipmentDoc> {
        return await Shipment.create(data)
    }

    async findAll(query: PaginationQuery & { status?: ShipmentStatus }): Promise<PaginatedResponse<ShipmentDoc>> {
        const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", status } = query;
        const skip = (page - 1) * limit;

        const filter: Record<string, any> = {};
        if (status) filter.status = status

        const [data, total] = await Promise.all([
            Shipment.find(filter)
                .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
                .skip(skip)
                .limit(limit),
            Shipment.countDocuments(filter)
        ])

        const totalPages = Math.ceil(total / limit);

        return {
            success: true,
            data,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: total,
                itemsPerPage: limit,
            }
        }
    }

    async findById(id: string): Promise<ShipmentDoc> {
        const shipment = await Shipment.findById(id)

        if (!shipment) {
            throw createError("Shipment not found", 404);
        }
        return shipment;
    }

    async update(id: string, data: Partial<IShipment>): Promise<ShipmentDoc> {
        const shipment = await Shipment.findByIdAndUpdate(id, data, { new: true, runValidators: true })

        if (!shipment) {
            throw createError("Shipment not found", 404);
        }
        return shipment;
    }

    async delete(id: string): Promise<void> {
       const shipment = await Shipment.findByIdAndDelete(id)

       if (!shipment) {
           throw createError("Shipment not found", 404);
       }
    }
}

export const shipmentService = new ShipmentService();