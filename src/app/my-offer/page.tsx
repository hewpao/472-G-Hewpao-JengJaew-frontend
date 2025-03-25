"use client";
import React, { useMemo, useState } from "react";
import { GetProductRequestResponseDTO } from "@/dtos/productRequest";
import { useSession } from "next-auth/react";
import { useGetTravelerProductRequests } from "@/api/productRequest/useProductRequest";
import MyOfferCard from "./component/MyOfferCard";
import { DeliveryStatus } from "@/interfaces/ProductRequest";


function Page() {
  const session = useSession();
  const [selectedStatus, setSelectedStatus] = useState<string>(DeliveryStatus.Pending);

  const { data: products, isLoading: loading, refetch: refetchdata } = useGetTravelerProductRequests();
  const productList = products?.["product-requests"] as GetProductRequestResponseDTO[]
  
  const counts = {
    [DeliveryStatus.Pending]: 0,
    [DeliveryStatus.Purchased]: 0,
    [DeliveryStatus.PickedUp]: 0,
    [DeliveryStatus.OutForDelivery]: 0,
    [DeliveryStatus.Delivered]: 0
  };
  
  if (productList && Array.isArray(productList)) {
    productList.forEach(product => {
    if (product.delivery_status === DeliveryStatus.Pending){
      counts[DeliveryStatus.Pending]++;
    }
    else if (product.delivery_status === DeliveryStatus.Purchased){
      counts[DeliveryStatus.Purchased]++;
    }
    else if (product.delivery_status === DeliveryStatus.PickedUp){
      counts[DeliveryStatus.PickedUp]++;
    }
    else if (product.delivery_status === DeliveryStatus.OutForDelivery){
      counts[DeliveryStatus.OutForDelivery]++;
    }
    else if (product.delivery_status === DeliveryStatus.Delivered){
      counts[DeliveryStatus.Delivered]++;
    }

    });
  }
  
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
      <div className="mb-4 flex gap-2">
        <button
          className={`w-1/5 py-2 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-primary hover:scale-105 ${selectedStatus === DeliveryStatus.Pending ? "bg-primary text-white" : "bg-secondary"}`}
          onClick={() => setSelectedStatus(DeliveryStatus.Pending)}
        >
          {counts[DeliveryStatus.Pending]} {"Pending"}
        </button>

        <button
          className={`w-1/5 py-2 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-primary hover:scale-105 ${selectedStatus === DeliveryStatus.Purchased ? "bg-primary text-white" : "bg-secondary"}`}
          onClick={() => setSelectedStatus(DeliveryStatus.Purchased)}
        >
          {counts[DeliveryStatus.Purchased]} {"Purchased"}
        </button>

        <button
          className={`w-1/5 py-2 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-primary hover:scale-105 ${selectedStatus === DeliveryStatus.PickedUp ? "bg-primary text-white" : "bg-secondary"}`}
          onClick={() => setSelectedStatus(DeliveryStatus.PickedUp)}
        >
          {counts[DeliveryStatus.PickedUp]} {"Picked Up"}
        </button>

        <button
          className={`w-1/5 py-2 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-primary hover:scale-105 ${selectedStatus === DeliveryStatus.OutForDelivery ? "bg-primary text-white" : "bg-secondary"}`}
          onClick={() => setSelectedStatus(DeliveryStatus.OutForDelivery)}
        >
          {counts[DeliveryStatus.OutForDelivery]} {"Out For Delivery"}
        </button>

        <button
          className={`w-1/5 py-2 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-primary hover:scale-105 ${selectedStatus === DeliveryStatus.Delivered ? "bg-primary text-white" : "bg-secondary"}`}
          onClick={() => setSelectedStatus(DeliveryStatus.Delivered)}
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
