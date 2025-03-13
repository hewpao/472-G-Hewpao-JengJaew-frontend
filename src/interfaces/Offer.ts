import { Product_Request } from "./Product-Request";
import { User } from "./User";

export interface Offer {
  id: string;
  product_request_id: string;
  product_request?: Product_Request;
  user_id: string;
  user?: User;
  offer_date: string;
    
}