import { CreateProductRequest } from "./ProductRequest";
import { User } from "./User";

export interface Offer {
  id: number;
  product_request_id: number;
  product_request?: CreateProductRequest;
  user_id: string;
  user?: User;
  OfferDate: string;
}
