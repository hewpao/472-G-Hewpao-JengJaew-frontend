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
