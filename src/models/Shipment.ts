import mongoose, { Document, Schema } from "mongoose";
import { IShipment, ShipmentStatus } from "../types";

export interface ShipmentDoc extends IShipment, Document {
    createdAt: Date;
    updatedAt: Date;
}

const ShipmentSchema = new Schema<ShipmentDoc>({
    origin: {
        type: String,
        required: true,
        trim: true
    },
    destination: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(ShipmentStatus),
        default: ShipmentStatus.PENDING,
        index: true
    },
    estimatedDelivery: {
        type: Date
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
        transform: (_doc, ret: any) => {
            ret.id = ret._id.toString(),
            delete ret._id
            delete ret.__v
            return ret
        }
    }
})

ShipmentSchema.index({ createdAt: -1 })
ShipmentSchema.index({ estimatedDelivery: 1 })

export const Shipment = mongoose.model<ShipmentDoc>('Shipment', ShipmentSchema)