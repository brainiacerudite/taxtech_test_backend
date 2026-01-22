export enum ShipmentStatus {
  PENDING = 'pending',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export interface IShipment {
  id?: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  estimatedDelivery?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}