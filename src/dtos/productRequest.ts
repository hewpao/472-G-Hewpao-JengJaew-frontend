import { ResponseOffer } from "./Offer";

export interface ProductRequestListResponse {
  message: string;
  "product-requests": GetProductRequestResponseDTO[];
}

export interface ProductRequestResponse {
  message: string;
  "product-request": GetProductRequestResponseDTO;
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
  offers: ResponseOffer[];

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

export interface UpdateProductRequestDTO {
  name: string;
  desc: string;
  quantity: number;
  category: string;

  selected_offer_id: number;
}
export interface UpdateProductRequestStatusDTO{
  delivery_status:string;
  notify_provider:string;
} 
