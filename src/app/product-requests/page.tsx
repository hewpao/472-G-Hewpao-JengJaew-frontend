"use client";
import Image from "next/image";
import { products } from "@/mock-data/products";
import React from "react";

function page() {
  return (
    <>
      {/* Order List */}
      <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          These items were recently requested.
        </h1>
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
                  className="rounded object-contain"
                />
              </div>

              {/* Product Info */}
              <h2 className="mt-4 font-semibold text-gray-800">{product.name}</h2>
              <div className="mt-auto">
                <p className="text-gray-600 mb-2">
                  Retailer price:{" "}
                  <span className="font-bold text-gray-900">{product.price}</span>
                </p>
              </div>

              {/* Make an Offer Button */}
              <button
                type="button"
                className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <span>Make an Offer</span>
              </button>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default page;
