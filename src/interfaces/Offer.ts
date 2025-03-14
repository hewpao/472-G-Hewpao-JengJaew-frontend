import { CreateProductRequest } from "./ProductRequest";
import { User } from "@/dtos/User";

export interface Offer {
  id: number;
  product_request_id: number;
  product_request?: CreateProductRequest;
  user_id: string;
  user?: User;
  offer_date: string;
}
