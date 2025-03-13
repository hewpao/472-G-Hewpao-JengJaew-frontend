import { User } from "./User";
import { Offer } from "./Offer";
import { Transaction } from "./Transaction";

export interface Product_Request {

  id: string;
  name: string;
  desc?: string|null;
  image: string;
  budget: number;
  quantity: number;
  category: string;
    
  user_id: string;
  user: User;
  offers: Offer[];

  selected_offer_id?: string|null;
  selected_offer?: Offer|null;

  transaction?: Transaction;

  delivery_status: string;

  chat_id : number;

  
  }
  