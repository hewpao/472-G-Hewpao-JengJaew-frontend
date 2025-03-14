import { useUpdateProductRequestStatus } from "@/api/productRequest/useProductRequest";
import { GetProductRequestResponseDTO } from "@/dtos/productRequest";
import { useState } from "react";

const MyOfferCard = ({ product }: { product: GetProductRequestResponseDTO }) {

    const [currentStatus, setCurrentStatus] = useState<string>(product.delivery_status);
    const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false);
    const [newStatus, setNewStatus] = useState<string>(product.delivery_status);
    
    const { mutate: updateProductStatus } = useUpdateProductRequestStatus();
  






	    return (
	        <div className="bg-white rounded-xl shadow-sm overflow-hidden transform hover:shadow-md transition-all duration-200 border border-gray-100">
	            <div className="p-5">
	                <div className="flex flex-col sm:flex-row">
	                    <div className="mb-4 sm:mb-0 sm:mr-5 flex-shrink-0">
	                        <div className="relative rounded-lg overflow-hidden border border-gray-200 w-full sm:w-28 h-28 group">
	                            <img
	                                src="https://placehold.co/200x200/e0e8ff/0047cc?text=iPhone+16"
	                                alt="iPhone 16"
	                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
	                            />
	                            <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
	                                Active
	                            </div>
	                        </div>
	                    </div>
	                    <div className="flex-1">
	                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
	                            <h3 className="text-lg font-semibold mb-2 sm:mb-0">iPhone 16 และ iPhone 16 Plus (TH)</h3>
	                            <span className="bg-blue-50 text-primary-500 text-sm px-3 py-1 rounded-full font-medium">
	                                Awaiting offers
	                            </span>
	                        </div>
	
	                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-3">
	                            <div className="flex items-center">
	                                <svg
	                                    className="w-4 h-4 text-gray-400 mr-2"
	                                    viewBox="0 0 24 24"
	                                    fill="none"
	                                    stroke="currentColor"
	                                    strokeWidth="2"
	                                    strokeLinecap="round"
	                                    strokeLinejoin="round"
	                                >
	                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
	                                    <line x1="8" y1="21" x2="16" y2="21"></line>
	                                    <line x1="12" y1="17" x2="12" y2="21"></line>
	                                </svg>
	                                <span className="text-sm text-gray-600">Order #5535289</span>
	                            </div>
	                            <div className="flex items-center">
	                                <svg
	                                    className="w-4 h-4 text-gray-400 mr-2"
	                                    viewBox="0 0 24 24"
	                                    fill="none"
	                                    stroke="currentColor"
	                                    strokeWidth="2"
	                                    strokeLinecap="round"
	                                    strokeLinejoin="round"
	                                >
	                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
	                                    <line x1="16" y1="2" x2="16" y2="6"></line>
	                                    <line x1="8" y1="2" x2="8" y2="6"></line>
	                                    <line x1="3" y1="10" x2="21" y2="10"></line>
	                                </svg>
	                                <span className="text-sm text-gray-600">Deliver before June 11, 2025</span>
	                            </div>
	                            <div className="flex items-center">
	                                <svg
	                                    className="w-4 h-4 text-gray-400 mr-2"
	                                    viewBox="0 0 24 24"
	                                    fill="none"
	                                    stroke="currentColor"
	                                    strokeWidth="2"
	                                    strokeLinecap="round"
	                                    strokeLinejoin="round"
	                                >
	                                    <circle cx="12" cy="12" r="10"></circle>
	                                    <path d="M12 6v6l4 2"></path>
	                                </svg>
	                                <span className="text-sm text-gray-600">Created 2 days ago</span>
	                            </div>
	                            <div className="flex items-center">
	                                <svg
	                                    className="w-4 h-4 text-gray-400 mr-2"
	                                    viewBox="0 0 24 24"
	                                    fill="none"
	                                    stroke="currentColor"
	                                    strokeWidth="2"
	                                    strokeLinecap="round"
	                                    strokeLinejoin="round"
	                                >
	                                    <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4"></path>
	                                    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
	                                    <path d="M18 12a2 2 0 100-4 2 2 0 000 4z"></path>
	                                </svg>
	                                <span className="text-sm text-gray-600">Est. total: $12,424.91</span>
	                            </div>
	                        </div>
	
	                        <div className="flex flex-wrap items-center mt-4 gap-2">
	                            <button className="inline-flex items-center px-3 py-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
	                                <svg
	                                    className="w-4 h-4 mr-1"
	                                    viewBox="0 0 24 24"
	                                    fill="none"
	                                    stroke="currentColor"
	                                    strokeWidth="2"
	                                    strokeLinecap="round"
	                                    strokeLinejoin="round"
	                                >
	                                    <polyline points="6 9 12 15 18 9"></polyline>
	                                </svg>
	                                View Details
	                            </button>
	                            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
	                                <svg
	                                    className="w-4 h-4 mr-1"
	                                    viewBox="0 0 24 24"
	                                    fill="none"
	                                    stroke="currentColor"
	                                    strokeWidth="2"
	                                    strokeLinecap="round"
	                                    strokeLinejoin="round"
	                                >
	                                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
	                                </svg>
	                                Edit Order
	                            </button>
	                            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-red-500">
	                                <svg
	                                    className="w-4 h-4 mr-1"
	                                    viewBox="0 0 24 24"
	                                    fill="none"
	                                    stroke="currentColor"
	                                    strokeWidth="2"
	                                    strokeLinecap="round"
	                                    strokeLinejoin="round"
	                                >
	                                    <polyline points="3 6 5 6 21 6"></polyline>
	                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
	                                </svg>
	                                Cancel Order
	                            </button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div className="border-t border-gray-100 px-5 py-3 bg-gray-50">
	                <div className="flex justify-between items-center">
	                    <div>
	                        <span className="text-sm text-gray-500">Delivery Offers:</span>
	                        <span className="ml-2 text-sm font-medium">No offers yet</span>
	                    </div>
	                    <button className="text-primary-500 text-sm font-medium hover:underline flex items-center">
	                        View all progress
	                        <svg
	                            className="w-4 h-4 ml-1"
	                            viewBox="0 0 24 24"
	                            fill="none"
	                            stroke="currentColor"
	                            strokeWidth="2"
	                            strokeLinecap="round"
	                            strokeLinejoin="round"
	                        >
	                            <polyline points="9 18 15 12 9 6"></polyline>
	                        </svg>
	                    </button>
	                </div>
	            </div>
	        </div>
	    )
}
	
export default MyOfferCard
