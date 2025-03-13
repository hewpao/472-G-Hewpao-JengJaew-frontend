import { Product_Request } from "@/interfaces/Product-Request";
import { mockUsers } from "./users";
import { DetailOfProductRequestResponseDTO } from "@/dtos/Product-Request";

const mock_product: DetailOfProductRequestResponseDTO={
  id: "1",
  desc: "I need a new phone",
  images: "https://images.unsplash.com/photo-1606785566284-1f0e2e8c2d6f",
  budget: 1000,
  quantity: 1,
  category: "Electronics",
  user_id: "1",
  offers: [],
  selected_offer: {
    id: "1",
    product_request_id: "1",
    user_id: "2",
    offer_date: "2022-01-01",
    product_request: undefined,
    user: undefined
  },
  transactions: [],
  deliver_from: "",
  deliver_to: "",
  delivery_status: "",
  check_service: false,
  created_at: "",
  updated_at: "",
  deleted_at: ""
}


export const products: DetailOfProductRequestResponseDTO[] = [
  mock_product,
];