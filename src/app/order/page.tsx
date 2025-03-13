"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { products } from "@/mock-data/products";
import ProductCard from "../component/ProductCard";

function page() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 rounded">
        {/* Order List */}
        <div className="px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>
          <ProductCard />
        </div>
      </div>
    </>
  );
}

export default page;
