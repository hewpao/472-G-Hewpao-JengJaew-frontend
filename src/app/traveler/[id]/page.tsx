"use client";
import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { products } from "@/mock-data/products";
import { Product_Request } from "@/interfaces/Product-Request";
import { useSession } from "next-auth/react";

function page() {

  const session = useSession();
  
  const params = useParams();
  const { id } = params;
  const [selectedStatus, setSelectedStatus] = useState<string>("Orders");
  const [productList, setProductList] = useState<Product_Request[]>(products);

  const orderCount = useMemo(() =>
    productList.filter((p) => p.delivery_status === "Orders" && String(p.user_id) === session.data?.user?.id).length,
    [productList, id]
  );
  const offerCount = useMemo(() =>
    productList.filter((p) => p.delivery_status === "Offers" && String(p.user_id) === session.data?.user?.id).length,
    [productList, id]
  );
  const toDeliverCount = useMemo(() =>
    productList.filter((p) => p.delivery_status === "Deliver" && String(p.user_id) === session.data?.user?.id).length,
    [productList, id]
  );
  const deliveredCount = useMemo(() =>
    productList.filter((p) => p.delivery_status === "Delivered" && String(p.user_id) === session.data?.user?.id).length,
    [productList, id]
  );

  const filteredProducts = useMemo(() => {
    if (selectedStatus) {
      return productList.filter(
        (product) => product.delivery_status === selectedStatus && String(product.user_id) === session.data?.user?.id
      );
    } else {
      return productList.filter((product) => product.delivery_status === "Orders" && String(product.user_id) === session.data?.user?.id);
    }
  }, [productList, id, selectedStatus]);

  const handleUpdateProduct = (updatedProduct: Product_Request) => {
    setProductList((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  return (
    <>
      {/* Order List */}
      <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Trip</h1>
        <div className="mb-4 flex ">
          <button 
            className={`w-full py-2 rounded-l border-r border-gray-300 text-black-600 hover:bg-gray-200 
              ${selectedStatus === "Orders" ? "bg-gray-200" : ""}`} 
            onClick={() => setSelectedStatus("Orders")}>
            {orderCount} Orders
          </button>
          <button 
            className={`w-full py-2 rounded-l border-r border-gray-300 text-black-600 hover:bg-gray-200 
              ${selectedStatus === "Offers" ? "bg-gray-200" : ""}`} 
            onClick={() => setSelectedStatus("Offers")}>
            {offerCount} Offers
          </button>
          <button 
            className={`w-full py-2 rounded-l border-r border-gray-300 text-black-600 hover:bg-gray-200 
            ${selectedStatus === "Deliver" ? "bg-gray-200" : ""}`}
            onClick={() => setSelectedStatus("Deliver")}>
            {toDeliverCount} To deliver
          </button>
          <button 
            className={`w-full py-2 rounded-l border-r border-gray-300 text-black-600 hover:bg-gray-200 
              ${selectedStatus === "Delivered" ? "bg-gray-200" : ""}`} 
            onClick={() => setSelectedStatus("Delivered")}>
            {deliveredCount} Delivered
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} onUpdateProduct={handleUpdateProduct} />
          ))}
        </div>
      </div>
    </>
  );
}

const ProductItem = ({ product, onUpdateProduct }: { product: Product_Request; onUpdateProduct: (updatedProduct: Product_Request) => void }) => {
    const [currentStatus, setCurrentStatus] = useState<string>(product.delivery_status);
    const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
    const [newStatus, setNewStatus] = useState<string>(product.delivery_status);
  
    const handleEditStatus = () => {
      setIsEditingStatus(true);
    };
  
    const handleSaveStatus = () => {
      onUpdateProduct({ ...product, delivery_status: newStatus });
      setCurrentStatus(newStatus);
      setIsEditingStatus(false);
    };
  
    const handleCancelEdit = () => {
      setNewStatus(currentStatus);
      setIsEditingStatus(false);
    };
  
    return (
      <div className="border rounded p-4 mb-4">
        <div className="relative h-40 w-full mb-4">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
        </div>
        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-2">{product.desc}</p>
        <p className="text-gray-800 font-medium">Price: ${product.budget}</p>
        <p className="text-gray-600 mb-2">Status: {currentStatus}</p>
        {product.offers && (
          <p className="text-sm text-gray-500">Deadline: </p>
        )}
  
        {!isEditingStatus ? (
          <button onClick={handleEditStatus} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Edit Status
          </button>
        ) : (
          <div className="mt-2">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border rounded p-2 mr-2"
            >
              <option value="Orders">Orders</option>
              <option value="Offers">Offers</option>
              <option value="Deliver">Deliver</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button onClick={handleSaveStatus} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
              Save
            </button>
            <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  };

export default page;