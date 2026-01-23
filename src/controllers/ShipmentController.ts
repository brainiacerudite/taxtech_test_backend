import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { shipmentService } from "../services/ShipmentService";
import { ApiResponse } from "../types";

export const getAllShipments = asyncHandler(async (req: Request, res: Response) => {
    const result = await shipmentService.findAll(req.query)

    return res.status(200).json(result);
})

export const createShipment = asyncHandler(async (req: Request, res: Response) => {
    const shipment = await shipmentService.create(req.body)

    const apiResponse: ApiResponse = {
        success: true,
        message: "Shipment created successfully",
        data: shipment
    }
    return res.status(201).json(apiResponse);
})

export const getShipmentById = asyncHandler(async (req: Request, res: Response) => {
    const shipment = await shipmentService.findById(req.params.id as string)

    const apiResponse: ApiResponse = {
        success: true,
        data: shipment
    }
    return res.status(200).json(apiResponse);
})

export const updateShipment = asyncHandler(async (req: Request, res: Response) => {
    const shipment = await shipmentService.update(req.params.id as string, req.body)

    const apiResponse: ApiResponse = {
        success: true,
        message: "Shipment updated successfully",
        data: shipment
    }
    return res.status(200).json(apiResponse);
})

export const deleteShipment = asyncHandler(async (req: Request, res: Response) => {
    await shipmentService.delete(req.params.id as string)

    const apiResponse: ApiResponse = {
        success: true,
        message: "Shipment deleted successfully"
    }
    return res.status(200).json(apiResponse);
})