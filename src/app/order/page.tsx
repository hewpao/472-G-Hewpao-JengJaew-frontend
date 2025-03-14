"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { products } from "@/mock-data/products";

function page() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 rounded">
        {/* Create Order Button */}
        <div className="flex items-center justify-center py-10">
          <Link
            href="/order/create-order"
            className="text-white bg-black px-6 py-3 rounded-lg font-medium text-lg transition duration-200 hover:bg-gray-800 shadow-md"
          >
            + Create Order
          </Link>
        </div>

        {/* Order List */}
        <div className="px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-lg transition-all duration-200 flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="w-full h-48 flex items-center justify-center bg-[#00000000]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={180}
                    className={`rounded object-contain`}
                  />
                </div>

                {/* Product Info */}
                <h2 className="mt-4 font-semibold text-gray-800">
                  {product.name}
                </h2>
                <div className="mt-auto">
                  <p className=" text-gray-600 mb-2">
                    Retailer price:{" "}
                    <span className="font-bold text-gray-900">{product.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
