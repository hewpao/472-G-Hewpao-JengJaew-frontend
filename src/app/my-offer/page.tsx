"use client";
import React, { useMemo, useState } from "react";
import { GetProductRequestResponseDTO, UpdateProductRequestStatusDTO } from "@/dtos/productRequest";
import { useSession } from "next-auth/react";
import { useGetBuyerProductRequests, useGetTravelerProductRequests, useUpdateProductRequestStatus } from "@/api/productRequest/useProductRequest";
import MyOfferCard from "./component/MyOfferCard";

function Page() {
  const session = useSession();
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  console.log("session", session.data?.user?.is_verified)

  const { data: products, isLoading: loading } = useGetTravelerProductRequests();
  console.log("product",products)

  const statusCounts = useMemo(() => {
    const counts = {
      Pending: 0,
      Purchased: 0,
      PickedUp: 0,
      OutForDelivery: 0,
      Delivered: 0,
    };

    products?.["product-requests"]?.forEach((p:GetProductRequestResponseDTO) => {
      if (session.data?.user?.id === p.offers.UserID) {
        counts[p.delivery_status] = (counts[p.delivery_status] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  
  const filteredProducts = useMemo(() => 
    products?.["product-requests"]?.filter((product: GetProductRequestResponseDTO) => 
      product.delivery_status === selectedStatus) || [], 
    [products, selectedStatus]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Offers</h1>
      <div className="mb-4 flex">
        {Object.keys(statusCounts).map((status) => (
          <button
            key={status}
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === status ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus(status)}
          >
            {statusCounts[status]} {status}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.["product-requests"].map((product: GetProductRequestResponseDTO) => (
          <MyOfferCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}


export default Page;
