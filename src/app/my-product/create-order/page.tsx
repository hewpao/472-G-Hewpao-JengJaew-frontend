"use client";
import { useState, useCallback } from "react";
import ProgressIndicator from "../../component/ProgressIndicator";
import ImageUpload from "../../component/ImageUpload";
import { useCreateProductRequest } from "@/api/productRequest/useProductRequest";
import { useRouter } from "next/navigation";

interface OrderRequest {
  name: string;
  desc: string;
  images: File[];
  budget: number;
  quantity: number;
  category: string;
  check_service: boolean;
  from: string;
  to: string;
}

function CreateOrderPage() {
  const [step, setStep] = useState(1);
  const customSteps = ["Product details", "Delivery details", "Summary"];

  const createProductRequest = useCreateProductRequest();

  const [orderData, setOrderData] = useState<OrderRequest>({
    name: "",
    desc: "",
    images: [],
    budget: 0,
    category: "",
    quantity: 1,
    check_service: false,
    from: "",
    to: "",
  });

  const router = useRouter();

  const categories = ["Electronics", "Fashion", "Food", "Books", "Other"];

  const handleNext = () => {
    if (step < customSteps.length) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // Add API call to submit order here
    console.log("Submitting order:", orderData);

    await createProductRequest.mutateAsync(orderData, {
      onSuccess: () => {
        alert("Order submitted successfully!");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
    // TODO: Change this to redirect to list of my product request page or something
    router.push("/");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, type } = e.target;
    const value = e.target.value;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;
    setOrderData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setOrderData((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));
  }, []);

  const handleImagesChange = (newImages: File[]) => {
    setOrderData((prev) => ({ ...prev, images: newImages }));
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-[#FFFFFF] rounded-lg p-[16px] block">
        <div className=" mb-6">
          {/* แสดง Progress Bar */}
          <ProgressIndicator step={step} steps={customSteps} />

          {/* Step Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {step === 1 && "Step 1: Product Details"}
            {step === 2 && "Step 2: Delivery Details"}
            {step === 3 && "Step 3: Summary"}
          </h1>
        </div>

        <form className="space-y-6">
          {/* ✅ Step 1: Product Details */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product name
                </label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={orderData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product details
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  value={orderData.desc}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  placeholder="Enter product details like model, size, color, etc."
                />
              </div>

              <ImageUpload
                maxImages={15}
                images={orderData.images}
                onImagesChange={handleImagesChange}
              />

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price on website (THB)
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={orderData.budget}
                  onChange={handleChange}
                  min="0"
                  step="100"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                  placeholder="Enter your budget"
                />

                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-[#696969]"
                >
                  Confirm the retail price of your item (does not include cost
                  of delivery).
                </label>
              </div>

              {/* Quantity */}
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={orderData.quantity}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                  placeholder="Enter quantity"
                />

                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium border-[#00000000] text-[#696969]"
                >
                  How many of this item would you like to purchase?
                </label>
              </div>

              {/* Verify Product Service (Toggle) */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="check_service"
                  name="check_service"
                  checked={orderData.check_service}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />

                <label
                  htmlFor="verifyProductService"
                  className="ml-2 text-sm text-gray-700"
                >
                  200 THB for Verify Product Service (Optional)
                </label>
              </div>
            </>
          )}

          {/* ✅ Step 2: Delivery Details */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Delivery from
                </label>
                <input
                  type="text"
                  name="from"
                  value={orderData.from}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Delivery to
                </label>
                <input
                  type="text"
                  name="to"
                  value={orderData.to}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}

          {/* ✅ Step 3: Summary */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-semibold text-gray-800">
                Review Your Order
              </h2>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Uploaded Images:
                </h3>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {orderData.images.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-[150px] h-[150px] border border-gray-300 rounded-md overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <p>
                <strong>Product:</strong> {orderData.name} <br />
                <strong>Category:</strong> {orderData.category} <br />
                <strong>Description:</strong> {orderData.desc} <br />
                <strong>Budget:</strong> {orderData.budget} THB <br />
                <strong>Quantity:</strong> {orderData.quantity} <br />
                <strong>Verify Product Service:</strong>{" "}
                {orderData.check_service ? "Yes" : "No"} <br />
                <strong>Deliver from:</strong> {orderData.from} <br />
                <strong>Deliver to:</strong> {orderData.to} <br />
              </p>
            </>
          )}
        </form>
        {/* 🔘 Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Submit Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default CreateOrderPage;
