import { CreateProductRequest } from "./ProductRequest";
import { User } from "./User";

export interface Offer {
  id: string;
  product_request_id: string;
  product_request?: CreateProductRequest;
  user_id: string;
  user?: User;
  offer_date: string;
    
}