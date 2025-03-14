"use client";
import React from "react";
import { products } from "@/mock-data/products";
import { Product } from "@/interfaces/Product";
import Link from "next/link";

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-2 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} passHref>
            <div className="border border-gray-200 p-4 rounded-lg shadow-md bg-white cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function Page() {
  return (
    <div className="px-8 bg-gray-50 rounded pt-8 pb-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Product Requests</h1>
      <ProductList products={products} />
    </div>
  );
}

export default Page;
