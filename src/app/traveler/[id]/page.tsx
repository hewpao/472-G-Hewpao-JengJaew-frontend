"use client";
import React, { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { products } from "@/mock-data/products";
import { Product } from "@/interfaces/Product";

function page() {
  const params = useParams();
  const { id } = params;
  const [selectedStatus, setSelectedStatus] = useState<string>("Orders");
  const [productList, setProductList] = useState<Product[]>(products);

  const orderCount = useMemo(() =>
    productList.filter((p) => p.status === "Orders" && String(p.traveler?.id) === String(id)).length,
    [productList, id]
  );
  const offerCount = useMemo(() =>
    productList.filter((p) => p.status === "Offers" && String(p.traveler?.id) === String(id)).length,
    [productList, id]
  );
  const toDeliverCount = useMemo(() =>
    productList.filter((p) => p.status === "Deliver" && String(p.traveler?.id) === String(id)).length,
    [productList, id]
  );
  const deliveredCount = useMemo(() =>
    productList.filter((p) => p.status === "Delivered" && String(p.traveler?.id) === String(id)).length,
    [productList, id]
  );

  const filteredProducts = useMemo(() => {
    if (selectedStatus) {
      return productList.filter(
        (product) => product.status === selectedStatus && String(product.traveler?.id) === String(id)
      );
    } else {
      return productList.filter((product) => product.status === "Orders" && String(product.traveler?.id) === String(id));
    }
  }, [productList, id, selectedStatus]);

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProductList((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
  };

  return (
    <>
      {/* Order List */}
      <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Trip</h1>
        <div className="mb-4 flex justify-between">
          <button className="text-gray-600" onClick={() => setSelectedStatus("Orders")}>
            {orderCount} Orders
          </button>
          <button className="text-gray-600" onClick={() => setSelectedStatus("Offers")}>
            {offerCount} Offers
          </button>
          <button className="text-gray-600" onClick={() => setSelectedStatus("Deliver")}>
            {toDeliverCount} To deliver
          </button>
          <button className="text-gray-600" onClick={() => setSelectedStatus("Delivered")}>
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

const ProductItem = ({ product, onUpdateProduct }: { product: Product; onUpdateProduct: (updatedProduct: Product) => void }) => {
    const [currentStatus, setCurrentStatus] = useState<string>(product.status);
    const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
    const [newStatus, setNewStatus] = useState<string>(product.status);
  
    const handleEditStatus = () => {
      setIsEditingStatus(true);
    };
  
    const handleSaveStatus = () => {
      onUpdateProduct({ ...product, status: newStatus });
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
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-gray-800 font-medium">Price: ${product.price}</p>
        <p className="text-gray-600 mb-2">Status: {currentStatus}</p>
        {product.deadline && (
          <p className="text-sm text-gray-500">Deadline: {new Date(product.deadline).toLocaleDateString()}</p>
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