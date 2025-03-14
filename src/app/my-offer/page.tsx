"use client";
import React, { useMemo, useState } from "react";
import { GetProductRequestResponseDTO, UpdateProductRequestStatusDTO } from "@/dtos/productRequest";
import { useSession } from "next-auth/react";
import { useGetBuyerProductRequests, useGetTravelerProductRequests, useUpdateProductRequestStatus } from "@/api/productRequest/useProductRequest";
import MyOfferCard from "./component/MyOfferCard";

enum Status {
  Pending = "Pending",
  Purchased = "Purchased",
  PickedUp = "PickedUp",
  OutForDelivery = "OutForDelivery",
  Delivered = "Delivered",
}


function Page() {
  const session = useSession();
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  console.log("session", session.data?.user?.is_verified)

  const { data: products, isLoading: loading } = useGetTravelerProductRequests();
  console.log("product",products)

  const statusCounts = useMemo(() => {
    const counts = {
      [Status.Pending]: 0,
      [Status.Purchased]: 0,
      [Status.PickedUp]: 0,
      [Status.OutForDelivery]: 0,
      [Status.Delivered]: 0,
    };

    products?.["product-requests"]?.forEach((p:GetProductRequestResponseDTO) => {
      if (session.data?.user?.id === p.offers.UserID) {
        if (p.delivery_status === "Pending"){
          counts[Status.Pending] += 1;
        }else if (p.delivery_status === "Purchased"){
          counts[Status.Purchased] += 1;
        }else if (p.delivery_status === "PickedUp"){
          counts[Status.PickedUp] += 1;
        }else if (p.delivery_status === "OutForDelivery"){
          counts[Status.OutForDelivery] += 1;
        }
        else if(p.delivery_status === "Delivered"){
          counts[Status.Delivered] += 1;
        }
      }
    });
    return counts;
  }, [products]);
  console.log("test status",selectedStatus)
  
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
            {statusCounts[Status.Pending]} {"Pending"}
        </button>
        <button
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === "Purchased" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("Purchased")}
          >
            {statusCounts[Status.Purchased]} {"Purchased"}
        </button>
        <button
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === "PickedUp" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("PickedUp")}
          >
            {statusCounts[Status.PickedUp]} {"PickedUp"}
        </button>
        <button
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === "OutForDelivery" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("OutForDelivery")}
          >
            {statusCounts[Status.OutForDelivery]} {"OutForDelivery"}
        </button>
        <button
            className={`w-full py-2 border-r border-gray-300 hover:bg-gray-200 ${selectedStatus === "Delivered" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("Delivered")}
          >
            {statusCounts[Status.Delivered]} {"Delivered"}
        </button>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product: GetProductRequestResponseDTO) => (
          <MyOfferCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}


export default Page;
