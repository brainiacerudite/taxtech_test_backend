import z from "zod";
import { ShipmentStatus } from "../types";

export const createShipmentSchema = z.object({
    origin: z.string().min(1, "Origin is required"),
    destination: z.string().min(1, "Destination is required"),
    status: z.enum(ShipmentStatus).optional(),
    estimatedDelivery: z.iso.datetime().optional(),
})

export const updateShipmentSchema = z.object({
  origin: z.string().min(3).optional(),
  destination: z.string().min(3).optional(),
  status: z.enum(ShipmentStatus).optional(),
  estimatedDelivery: z.iso.datetime().optional()
});

export const queryShipmentSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  status: z.enum(ShipmentStatus).optional(),
  sortBy: z.enum(['createdAt', 'estimatedDelivery']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});