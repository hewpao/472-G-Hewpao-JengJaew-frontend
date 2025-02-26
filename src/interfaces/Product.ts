import { User } from "next-auth";

export interface Product {
    traveler?: User | null;
    id: string;
    name: string;
    description?: string|null;
    category: string;
    price: number;
    quantity: number;
    image: string;
    status: string;
    deadline?: string|null;
  }
  