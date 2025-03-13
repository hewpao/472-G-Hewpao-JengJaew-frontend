import { Offer } from "@/interfaces/Offer";
import { Transaction } from "@/interfaces/Transaction";

export interface DetailOfProductRequestResponseDTO{
    id: string;
    desc: string;
    images: string;
    budget: number;
    quantity: number;
    category: string;

    user_id: string;
    offers: Offer[];

    selected_offer: Offer;

    transactions: Transaction[];

    deliver_from: string;
    deliver_to: string;
    delivery_status: string;
    
    check_service:boolean;

    created_at: string;
    updated_at: string;
    deleted_at: string;

}