import z from "zod";
import { ShipmentStatus } from "../types";

export const createShipmentSchema = z.object({
    origin: z.string().min(1, "Origin is required"),
    destination: z.string().min(1, "Destination is required"),
    status: z.enum(ShipmentStatus).optional(),
    estimatedDelivery: z.iso.datetime().optional(),
})

export type CreateShipmentInput = z.infer<typeof createShipmentSchema>;