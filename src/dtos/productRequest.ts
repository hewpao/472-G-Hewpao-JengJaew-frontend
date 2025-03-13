import { Offer } from "@/interfaces/Offer";

export interface ProductRequestResponse {
  message: string;
  "product-requests": GetProductRequestResponseDTO[];
}

export interface GetProductRequestResponseDTO {
  id: number;
  name: string;
  desc: string;
  images: string[];
  budget: number;
  quantity: number;
  category: string;

  user_id: string;
  delivery_status: string;

  deliver_from: string;
  deliver_to: string;
  check_service: boolean;

  selected_offer_id: number;
  offers: Offer[];

  create_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface GetPaginatedProductRequestRespnoseDTO<T> {
  data: T[];
  page: number;
  limit: number;
  totalRows: number;
  totalPages: number;
}
