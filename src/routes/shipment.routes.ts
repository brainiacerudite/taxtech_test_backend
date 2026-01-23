import { Router } from "express";
import * as shipmentController from "../controllers/ShipmentController";
import { validate } from "../middleware/validation";
import { createShipmentSchema } from "../validations/shipment.validation";

const router = Router()

router.get("/", shipmentController.getAllShipments)
router.post("/", validate(createShipmentSchema), shipmentController.createShipment)
router.get("/:id", shipmentController.getShipmentById)
router.put("/:id", shipmentController.updateShipment)
router.delete("/:id", shipmentController.deleteShipment)

export default router;