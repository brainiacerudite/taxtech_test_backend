import { Router } from "express";
import * as shipmentController from "../controllers/ShipmentController";
import { validate } from "../middleware/validation";
import { createShipmentSchema, queryShipmentSchema, shipmentIdParamSchema, updateShipmentSchema } from "../validations/shipment.validation";

const router = Router()

router.get("/", validate(queryShipmentSchema, 'query'), shipmentController.getAllShipments)
router.post("/", validate(createShipmentSchema), shipmentController.createShipment)
router.get("/:id", validate(shipmentIdParamSchema, 'params'), shipmentController.getShipmentById)
router.put("/:id", validate(shipmentIdParamSchema, 'params'), validate(updateShipmentSchema), shipmentController.updateShipment)
router.delete("/:id", validate(shipmentIdParamSchema, 'params'), shipmentController.deleteShipment)

export default router;