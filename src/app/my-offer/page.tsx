"use client";
import React, { useMemo, useState } from "react";
import { GetProductRequestResponseDTO, UpdateProductRequestStatusDTO } from "@/dtos/productRequest";
import { useSession } from "next-auth/react";
import { useGetTravelerProductRequests, useUpdateProductRequestStatus } from "@/api/productRequest/useProductRequest";

function Page() {
  const session = useSession();
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");

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
      if (String(p.user_id) === session.data?.user?.id) {
        counts[p.delivery_status] = (counts[p.delivery_status] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => 
    products?.["product-requests"]?.filter((product: GetProductRequestResponseDTO) => 
      product.delivery_status === selectedStatus && String(product.user_id) === session.data?.user?.id) || [], 
    [products, selectedStatus]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Trip</h1>
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
        {filteredProducts.map((product: GetProductRequestResponseDTO) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const ProductItem = ({ product }: { product: GetProductRequestResponseDTO }) => {
  const [currentStatus, setCurrentStatus] = useState<string>(product.delivery_status);
  const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>(product.delivery_status);
  
  const { mutate: updateProductStatus } = useUpdateProductRequestStatus();

  const handleSaveStatus = () => {
    updateProductStatus(
      { id: product.id, delivery_status: newStatus },
      {
        onSuccess: () => {
          setCurrentStatus(newStatus);
          setIsEditingStatus(false);
        },
        onError: (error) => {
          console.error("Failed to update status:", error);
        },
      }
    );
  };

  return (
    <div className="border rounded p-4 mb-4">
      <div className="relative h-40 w-full mb-4">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover rounded-md" />
      </div>
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.desc}</p>
      <p className="text-gray-800 font-medium">Price: ${product.budget}</p>
      <p className="text-gray-600 mb-2">Status: {currentStatus}</p>
      
      {!isEditingStatus ? (
        <button onClick={() => setIsEditingStatus(true)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Edit Status
        </button>
      ) : (
        <div className="mt-2">
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="border rounded p-2 mr-2">
            <option value="Purchased">Purchased</option>
            <option value="PickedUp">PickedUp</option>
            <option value="OutForDelivery">OutForDelivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          <button onClick={handleSaveStatus} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
          <button onClick={() => setIsEditingStatus(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Page;
