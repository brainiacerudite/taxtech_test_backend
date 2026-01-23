import { Router } from "express";
import * as shipmentController from "../controllers/ShipmentController";
import { validate, validateObjectId } from "../middleware/validation";
import { createShipmentSchema, queryShipmentSchema, updateShipmentSchema } from "../validations/shipment.validation";

const router = Router()

router.get("/", validate(queryShipmentSchema, 'query'), shipmentController.getAllShipments)
router.post("/", validate(createShipmentSchema), shipmentController.createShipment)
router.get("/:id", validateObjectId('id'), shipmentController.getShipmentById)
router.put("/:id", validateObjectId('id'), validate(updateShipmentSchema), shipmentController.updateShipment)
router.delete("/:id", validateObjectId('id'), shipmentController.deleteShipment)

export default router;