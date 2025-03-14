"use client";
import { useParams } from "next/navigation"; 
import { products } from "@/mock-data/products";
import Link from "next/link";
import { useState } from "react";

const ProductDetailPage = () => {
  const router = useParams();
  const { id } = router;

  const product = products.find((product) => String(product.id) === String(id)); // Ensure id is a string

  if (!product) {
    return <div className="text-center text-xl font-bold">Product not found</div>;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);  // Create a state for edited product details

  const handleEdit = () => {
    setIsEditing(true);  // Toggle the state to edit mode
  };

  const handleCancel = () => {
    setIsEditing(false); // Reset the state to cancel mode
    setEditedProduct(product); // Reset edited product back to original
  };

  const handleConfirm = () => {
    setIsEditing(false);
    console.log("Confirmed and Proceeded");
    // Here, you can also update your products array or make an API call to save the edited product
    // For example, update the product data in the database or mock data
    // products.update(editedProduct);
  };

  // Handle changes in the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
      <Link href="/product" className="text-blue-500 hover:underline mb-4">
        ← Back to Product List
      </Link>

      {/* Container to arrange image and details side by side */}
      <div className="mt-4 flex items-start gap-4">
        {/* Left Side - Image */}
        <div className="w-1/2 flex justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-80 h-80 object-cover rounded-md" 
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-1/2">
          {/* Product Info */}
          <h1 className="text-2xl font-bold">{product.name}</h1>
          
          <div className="mt-4">
            {/* Conditionally render input fields or static text based on the editing state */}
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mt-2"
              />
            ) : (
              <p className="text-gray-700 mt-2">{product.name}</p>
            )}
          </div>

          <div className="mt-2">
            {isEditing ? (
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mt-2"
              />
            ) : (
              <p className="text-gray-700 mt-2">{product.description}</p>
            )}
          </div>

          <div className="mt-2">
            {isEditing ? (
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mt-2"
              />
            ) : (
              <p className="text-gray-700 mt-2">Price: {product.price ?? "N/A"}</p>
            )}
          </div>

          <div className="mt-2">
            {isEditing ? (
              <input
                type="text"
                name="category"
                value={editedProduct.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mt-2"
              />
            ) : (
              <p className="text-gray-700 mt-2">Category: {product.category ?? "N/A"}</p>
            )}
          </div>

          <div className="mt-2">
            {isEditing ? (
              <input
                type="date"
                name="deadline"
                value={editedProduct.deadline ? new Date(editedProduct.deadline).toLocaleDateString() : ""}
                onChange={handleChange}
                className="w-full p-2 border rounded-md mt-2"
              />
            ) : (
              <p className="text-gray-700 mt-2">Deadline: {product.deadline ? new Date(product.deadline).toLocaleDateString() : "No deadline"}</p>
            )}
          </div>

          {/* Traveler Info */}
          {product.traveler ? (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h2 className="text-lg font-semibold">Offered by</h2>
              <p><strong>Name:</strong> {product.traveler.name}</p>
              <p><strong>Contact:</strong> {product.traveler.contact}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-4">
              No traveler has offered this request yet.
            </p>
          )}

          <div className="flex justify-start gap-4 mt-6">
            <button
              onClick={isEditing ? handleConfirm : handleEdit}
              onChange={handleChange}
              className={`p-4 text-white px-6 py-2 rounded-lg ${isEditing ? "bg-green-500" : "bg-blue-500"}`} 
              aria-label={isEditing ? "Confirm and proceed to the next step" : "Edit"}
            >
              {isEditing ? "Confirm" : "Edit"}
            </button>

            {isEditing && (
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg"
                aria-label="Go back to the previous step"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
