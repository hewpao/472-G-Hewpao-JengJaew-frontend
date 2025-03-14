"use client";
import React, { useMemo, useState } from "react";
import { GetProductRequestResponseDTO, UpdateProductRequestStatusDTO } from "@/dtos/productRequest";
import { useSession } from "next-auth/react";
import { useGetBuyerProductRequests, useGetTravelerProductRequests, useUpdateProductRequestStatus } from "@/api/productRequest/useProductRequest";
import MyOfferCard from "./component/MyOfferCard";
import { ResponseOffer } from "@/dtos/Offer";
import { DeliveryStatus } from "@/interfaces/ProductRequest";


function Page() {
  const session = useSession();
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");

  const { data: products, isLoading: loading, refetch: refetchdata } = useGetTravelerProductRequests();
  const productList = products?.["product-requests"] as GetProductRequestResponseDTO[]
  
  const counts = {
    "Pending": 0,
    "Purchased": 0,
    "PickedUp": 0,
    "OutForDelivery": 0,
    "Delivered": 0
  };
  
  if (productList && Array.isArray(productList)) {
    productList.forEach(product => {
      if (product.delivery_status in counts) {
        counts[product.delivery_status as keyof typeof counts]++;
      }
    });
  }
  console.log("productList: ", productList)
  console.log("Status counts:", counts);
  
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
        <button
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === "Pending" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("Pending")}
          >
            {counts[DeliveryStatus.Pending]} {"Pending"}
        </button>
        <button
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === "Purchased" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("Purchased")}
          >
            {counts[DeliveryStatus.Purchased]} {"Purchased"}
        </button>
        <button
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === "PickedUp" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("PickedUp")}
          >
            {counts[DeliveryStatus.PickedUp]} {"Picked Up"}
        </button>
        <button
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === "OutForDelivery" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("OutForDelivery")}
          >
            {counts[DeliveryStatus.OutForDelivery]} {"Out For Delivery"}
        </button>
        <button
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === "Delivered" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("Delivered")}
          >
            {counts[DeliveryStatus.Delivered]} {"Delivered"}
        </button>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product: GetProductRequestResponseDTO) => (
          <MyOfferCard key={product.id} product={product} refetch={refetchdata}/>
        ))}
      </div>
    </div>
  );
}


export default Page;
