"use client";
import Image from "next/image";
import React from "react";
import { products } from "@/mock-data/products";
import { Product } from "@/interfaces/Product";
import Link from "next/link";
import { useGetBuyerProductRequests } from "@/api/productRequest/useProductRequest";
import { GetProductRequestResponseDTO } from "@/dtos/productRequest";

const ProductList: React.FC<{ products: Product[] }> = () => {
  const { data: prods3, isLoading: loadingProds3 } =
    useGetBuyerProductRequests();

  if (loadingProds3) {
    return <div>..Loading</div>;
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-2 gap-6">
        {prods3!["product-requests"].map(
          (product: GetProductRequestResponseDTO) => (
            <Link key={product.id} href={`/product/${product.id}`} passHref>
              <div className="border border-gray-200 p-4 rounded-lg shadow-md bg-white cursor-pointer">
                <Image
                  src={product.images[0]}
                  alt={product.name || "Product Request Image"}
                  width={180}
                  height={180}
                  className="w-full h-full object-cover rounded-md"
                />
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-600 text-sm">{product.desc}</p>
                <p className="text-gray-600 text-sm">{product.from}</p>
                <p className="text-gray-600 text-sm">{product.to}</p>
                <p className="text-gray-600 text-sm">{product.budget}</p>
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
};

function Page() {
  return (
    <div className="px-8 bg-gray-50 rounded pt-8 pb-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        My Product Requests
      </h1>
      <ProductList products={products} />
    </div>
  );
}

export default Page;
