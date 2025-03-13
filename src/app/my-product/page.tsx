"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGetProductRequestByUserID } from "@/api/auth/useProduct-Request";
import { DetailOfProductRequestResponseDTO } from "@/dtos/Product-Request";
import { products } from "@/mock-data/products";

const ProductList: React.FC<{ products: DetailOfProductRequestResponseDTO[] }> = ({ products }) => {
  const session = useSession();
  console.log("page my product", session.data);
  
  // const filteredProducts = products.data.filter(
  //   (product) => product.user_id === session.data?.user?.id
  // );
  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-2 gap-6">
        {products.map((product) => (
          <Link key={product.user_id} href={`/my-product/${product.id}`} passHref>
            <div className="border border-gray-200 p-4 rounded-lg shadow-md bg-white cursor-pointer">
              <img
                src={product.images}
                className="w-full h-full object-cover rounded-md"
              />
              {/* <h2 className="text-lg font-semibold mt-2">{product.name}</h2> */}
              <p className="text-gray-600 text-sm">{product.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function Page() {
  // const { data: products } = useGetProductRequestByUserID();
  // console.log("products", products);

  return (
    <div className="px-8 bg-gray-50 rounded pt-8 pb-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Product Requests</h1>
      <div className="flex items-center justify-center py-10">
          <Link
            href="/my-product/create-order"
            className="text-white bg-black px-6 py-3 rounded-lg font-medium text-lg transition duration-200 hover:bg-gray-800 shadow-md"
          >
            + Create Order
          </Link>
      </div>



      <ProductList products={products} />
    </div>
  );
}

export default Page;
