"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { UpdateProductRequestDTO } from "@/dtos/productRequest";
import { useGetBuyerProductRequests, useUpdateProductRequest } from "@/api/productRequest/useProductRequest";

const ProductDetailPage = () => {
    const router = useParams();
    const session = useSession();
    const { id } = router;
    const { data: products, isLoading: loading } = useGetBuyerProductRequests();
    const product = products?.["product-requests"].find((product) => String(product.id) === String(id));
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(product);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div className="text-center text-xl font-bold">Product not found</div>;
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedProduct(product);
    };

    const mutation = useUpdateProductRequest(Number(id)); // Pass id to the hook

    const handleConfirm = async () => {
        if (!editedProduct) {
            return;
        }

        const updateProductDTO: UpdateProductRequestDTO = {
            name: editedProduct.name,
            desc: editedProduct.desc,
            quantity: editedProduct.quantity,
            category: editedProduct.category,
            selected_offer_id: editedProduct.selected_offer_id,
        };

        mutation.mutate(updateProductDTO); // Pass the productData and accessToken

        setIsEditing(false);
        console.log("Confirmed and Proceeded");
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setEditedProduct((prevState) => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return (
        <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
            <Link href="/my-product" className="text-blue-500 hover:underline mb-4">
                ← Back to Product List
            </Link>

            <div className="mt-4 flex items-start gap-4">
                <div className="w-1/2 flex justify-center">
                    <img src={product.images[0]} alt={product.name} className="w-80 h-80 object-cover rounded-md" />
                </div>

                <div className="w-1/2">
                    <h1 className="text-2xl font-bold">{product.name}</h1>

                    <div className="mt-4">
                        {isEditing ? (
                            <input type="text" name="name" value={editedProduct?.name} onChange={handleChange} className="w-full p-2 border rounded-md mt-2" />
                        ) : (
                            <p className="text-gray-700 mt-2">{product.name}</p>
                        )}
                    </div>

                    <div className="mt-2">
                        {isEditing ? (
                            <textarea name="description" value={editedProduct?.desc} onChange={handleChange} className="w-full p-2 border rounded-md mt-2" />
                        ) : (
                            <p className="text-gray-700 mt-2">{product.desc}</p>
                        )}
                    </div>

                    <div className="mt-2">
                        <p className="text-gray-700 mt-2">Price: {product.budget ?? "N/A"}</p>
                    </div>

                    <div className="mt-2">
                        {isEditing ? (
                            <input type="text" name="category" value={editedProduct?.category} onChange={handleChange} className="w-full p-2 border rounded-md mt-2" />
                        ) : (
                            <p className="text-gray-700 mt-2">Category: {product.category ?? "N/A"}</p>
                        )}
                    </div>

                    <div className="flex justify-start gap-4 mt-6">
                        <button onClick={isEditing ? handleConfirm : handleEdit} className={`p-4 text-white px-6 py-2 rounded-lg ${isEditing ? "bg-green-500" : "bg-blue-500"}`} aria-label={isEditing ? "Confirm and proceed to the next step" : "Edit"}>
                            {isEditing ? "Confirm" : "Edit"}
                        </button>

                        {isEditing && (
                            <button onClick={handleCancel} className="bg-gray-400 text-white px-6 py-2 rounded-lg" aria-label="Go back to the previous step">
                                Cancel
                            </button>
                        )}
                    </div>
                    
                    <div className="mt-2">
                        Offer List
                    </div>
                    
                </div>


            </div>
        </div>
    );
};

export default ProductDetailPage;