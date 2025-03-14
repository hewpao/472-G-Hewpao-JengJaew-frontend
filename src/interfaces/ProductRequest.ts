export interface CreateProductRequest {
  name: string;
  desc: string;
  images: File[];
  budget: number;
  quantity: number;
  category: string;
  check_service: boolean;
  from: string;
  to: string;
}

export enum DeliveryStatus {
  Opening = "Opening",
  Pending = "Pending",
  Purchased = "Purchased",
  PickedUp = "PickedUp",
  OutForDelivery = "OutForDelivery",
  Delivered = "Delivered",
  Cancel = "Cancel",
  Returned = "Returned",
  Refunded = "Refunded",
}
