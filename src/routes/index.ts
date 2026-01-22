import { Router } from "express";
import { ApiResponse } from "../types";

import shipmentRoutes from "./shipment.routes";

const router = Router()

// health check route
router.get("/health", (_req, res) => {
    const apiResponse: ApiResponse = {
        success: true,
        message: "Taxtech test API is healthy",
        data: {
            status: "OK",
            timestamp: new Date().toDateString()
        }
    }
    res.status(200).json(apiResponse)
})

// shipment routes
router.use('/shipments', shipmentRoutes)

export default router