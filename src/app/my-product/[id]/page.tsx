// pages/edit-product/[id].tsx
"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    useGetProductRequestByID,
    useUpdateProductRequest,
    useCancelProductRequest,
} from "@/api/productRequest/useProductRequest";
import Link from "next/link";
import Image from "next/image";
import { ResponseOffer } from "@/dtos/Offer";
import OfferDetails from "../component/OfferDetails";
import { DeliveryStatus } from "@/interfaces/ProductRequest";
import { useCheckout } from "@/api/checkout/useCheckout";
import { GetProductRequestResponseDTO } from "@/dtos/productRequest";

function Page() {
    const param = useParams();
    const router = useRouter();

    const { id } = param;

    const { data: productData, isLoading: loading } = useGetProductRequestByID(
        Number(id),
    );

    const product = productData?.["product-request"] as GetProductRequestResponseDTO;

    const useUpdateProduct = useUpdateProductRequest(Number(id));
    const useCancelProduct = useCancelProductRequest(Number(id));
    const useCheckoutHook = useCheckout();
    const routerNavigation = useRouter();

    const offerList: number[] =
        product?.offers.map(
            (offer: ResponseOffer) => offer.ID,
        ) || [];

    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [editedDesc, setEditedDesc] = useState("");
    const [editedCategory, setEditedCategory] = useState("");
    const [editedQuantity, setEditedQuantity] = useState(0);

    const categories = ["Electronics", "Fashion", "Food", "Books", "Other"];

    React.useEffect(() => {
        if (product) {
            setEditedName(product?.name);
            setEditedDesc(product?.desc);
            setEditedCategory(product?.category);
            setEditedQuantity(product?.quantity);
        }
    }, [productData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <p className="mt-2 text-gray-600">Loading product...</p>
                </div>
            </div>
        );
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        useUpdateProduct.mutate(
            {
                name: editedName,
                desc: editedDesc,
                quantity: editedQuantity,
                category: editedCategory,
                selected_offer_id: 0,
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            },
        );
    };

    const handleCancelOrder = () => {
        useCancelProduct.mutate(
            {
                delivery_status: DeliveryStatus.Cancel,
                notify_provider: "email",
            },
            {
                onSuccess: () => {
                    alert("Product request has been cancelled!");
                },
                onError: (err) => {
                    alert(err);
                },
            },
        );
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedName(product.name);
        setEditedDesc(product.desc);
        setEditedCategory(product.category);
        setEditedQuantity(product.quantity);
    };

    const handleCheckoutStripe = () => {
        useCheckoutHook.mutate(
            {
                product_request_id: product?.id as number,
                payment_gateway: "stripe",
            },
            {
                onSuccess: (data) => {
                    routerNavigation.push(data.payment.payment_url);
                },
                onError: (err) => {
                    alert(err);
                },
            },
        );
    };

    const handleChat = () => {
        console.log("Test chat")
        if (product?.id) {
            router.push(`/chat/${product.id}`);
        }
    }

    return (
        <div className="flex flex-col justify-center md:flex-row gap-6 p-4 font-sans">
            <div className="flex flex-col gap-4 bg-white rounded-lg shadow-md p-6 w-full md:w-1/2">
                <Link
                    className="bg-gray-200 px-3 py-2 rounded-md w-fit shadow-md hover:bg-gray-300 ease-in-out duration-300"
                    href={`/my-product`}
                    passHref
                >
                    Back
                </Link>
                <div>
                    <h1 className="text-primary-500 font-bold text-xl">
                        Product details
                    </h1>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-md font-bold">
                            Status: <span className="text-primary">{product?.delivery_status}</span>
                        </h2>
                        <button
                            onClick={handleChat}
                            disabled={product.selected_offer_id === null}
                            className={`px-3 py-1 rounded-lg font-semibold shadow-md transition duration-300
                ${product.selected_offer_id === null ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary hover:bg-dark-primary text-white"}
              `}
                        >
                            Chat
                        </button>
                    </div>
                </div>
                <div>
                    {isEditing ? (
                        <div>
                            <div className="flex mb-5">
                                <div className="mr-4 border border-gray-200 rounded-md overflow-hidden w-24 h-24 flex-shrink-0">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={180}
                                        height={180}
                                        className="w-full h-full  "
                                    />
                                </div>
                            </div>

                            <div className="mt-4 bg-gray-50 p-4 rounded-md">
                                <div className="grid grid-cols-[auto,1fr] gap-y-4 gap-x-8 items-center">
                                    <div className="text-gray-500">Name</div>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        className="border p-2 w-full rounded-lg"
                                        placeholder="Name"
                                    />
                                    <div className="text-gray-500 self-start">Description</div>
                                    <textarea
                                        value={editedDesc}
                                        onChange={(e) => setEditedDesc(e.target.value)}
                                        className="border p-2 w-full rounded-lg"
                                        placeholder="Description"
                                    />

                                    <div className="text-gray-500">Category</div>
                                    <select
                                        name="category"
                                        value={editedCategory}
                                        onChange={(e) => setEditedCategory(e.target.value)}
                                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-primary"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>

                                    <div className="text-gray-500">Deliver to</div>
                                    <div className="font-medium">
                                        {product?.deliver_to}
                                    </div>

                                    <div className="text-gray-500">From</div>
                                    <div className="font-medium">
                                        {product?.deliver_from}
                                    </div>

                                    <div className="text-gray-500">Quantity</div>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editedQuantity}
                                        onChange={(e) => setEditedQuantity(Number(e.target.value))}
                                        className="border p-2 w-full rounded-lg"
                                        placeholder="Quantity"
                                    />

                                    <div className="text-gray-500">Order number</div>
                                    <div className="font-medium text-right">
                                        {product?.id}
                                    </div>

                                    <div className="text-gray-500">Budget</div>
                                    <div className="font-medium text-right">
                                        {product?.budget}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-5 grid grid-cols-2 gap-5">
                                <button onClick={handleSaveClick} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-dark-primary ease-out duration-300">Save</button>
                                <button onClick={handleCancelClick} className="bg-gray-300 px-3 py-2 rounded-lg">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex mb-6">
                                <div className="grid grid-cols-3 w-full gap-4">
                                    {product.images.map((image, index) => {
                                        return (
                                            <div key={index}>
                                                <Image
                                                    src={image}
                                                    alt={product.name}
                                                    width={180}
                                                    height={180}
                                                    className="w-full h-48 object-cover hover:scale-105 transition-transform rounded-md"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="mt-4 bg-gray-50 p-4 rounded-md">
                                <div className="grid grid-cols-[auto,1fr] gap-y-4 gap-x-8">
                                    <div className="text-gray-500">Name</div>
                                    <div className="font-medium text-right">
                                        {product?.name}
                                    </div>

                                    <div className="text-gray-500">Description</div>
                                    <div className="font-medium text-right">
                                        {product?.desc}
                                    </div>

                                    <div className="text-gray-500">Category</div>
                                    <div className="font-medium text-right">
                                        {product?.category}
                                    </div>

                                    <div className="text-gray-500">Deliver to</div>
                                    <div className="font-medium text-right">
                                        {product?.deliver_to}
                                    </div>

                                    <div className="text-gray-500">From</div>
                                    <div className="font-medium text-right">
                                        {product?.deliver_from}
                                    </div>

                                    <div className="text-gray-500">Quantity</div>
                                    <div className="font-medium text-right">
                                        {product?.quantity}
                                    </div>

                                    <div className="text-gray-500">Order number</div>
                                    <div className="font-medium text-right">
                                        {product?.id}
                                    </div>

                                    <div className="text-gray-500">Budget</div>
                                    <div className="font-medium text-right">
                                        {product?.budget}
                                    </div>

                                    <div className="text-gray-500">Selected Offer ID</div>
                                    <div className="font-medium text-right">
                                        {product?.selected_offer_id}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8"></div>

                            {product.selected_offer_id !== null &&
                                product.delivery_status ===
                                DeliveryStatus.Opening && (
                                    <button
                                        onClick={handleCheckoutStripe}
                                        className="mt-2 px-4 py-2 bg-primary text-white rounded-lg w-full"
                                    >
                                        💸 Checkout (Stripe)
                                    </button>
                                )}

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <button
                                    onClick={handleCancelOrder}
                                    className="py-3 px-4 text-white bg-red-500 rounded-md font-medium hover:bg-red-700 transition-colors"
                                >
                                    Cancel order
                                </button>
                                <button
                                    onClick={handleEditClick}
                                    className="py-3 px-4 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                                >
                                    Edit order
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {product.delivery_status ===
                    DeliveryStatus.Opening && (
                        <>
                            <h3 className="font-bold uppercase text-lg tracking-wider my-4">
                                Choose offer
                            </h3>
                            <div className="flex flex-col gap-3">
                                {offerList.map((offerId) => (
                                    <OfferDetails key={offerId} id={offerId} />
                                ))}
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
}

export default Page;