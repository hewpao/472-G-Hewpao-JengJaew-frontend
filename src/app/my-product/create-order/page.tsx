"use client";
import { useState, useCallback, useEffect } from "react";
import ProgressIndicator from "../../component/ProgressIndicator";
import ImageUpload from "../../component/ImageUpload";
import { useCreateProductRequest } from "@/api/productRequest/useProductRequest";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Image from "next/image";

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

interface FormErrors {
  name?: string;
  desc?: string;
  images?: string;
  budget?: string;
  category?: string;
  quantity?: string;
  from?: string;
  to?: string;
}

function CreateOrderPage() {
  const [step, setStep] = useState(1);
  const customSteps = ["Product details", "Delivery details", "Summary"];
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Validate form data
  const validateForm = (step: number) => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (step === 1) {
      // Product details validation
      if (!orderData.name || orderData.name.trim() === "") {
        newErrors.name = "Product name is required";
        isValid = false;
      } else if (orderData.name.length < 3) {
        newErrors.name = "Product name must be at least 3 characters";
        isValid = false;
      }

      if (!orderData.category) {
        newErrors.category = "Please select a category";
        isValid = false;
      }

      if (!orderData.desc || orderData.desc.trim() === "") {
        newErrors.desc = "Product description is required";
        isValid = false;
      } else if (orderData.desc.length < 10) {
        newErrors.desc = "Description must be at least 10 characters";
        isValid = false;
      }

      if (orderData.images.length === 0) {
        newErrors.images = "At least one image is required";
        isValid = false;
      }

      if (!orderData.budget || orderData.budget <= 0) {
        newErrors.budget = "Price must be greater than 0";
        isValid = false;
      }

      if (!orderData.quantity || orderData.quantity < 1) {
        newErrors.quantity = "Quantity must be at least 1";
        isValid = false;
      }
    }

    if (step === 2) {
      // Delivery details validation
      if (!orderData.from || orderData.from.trim() === "") {
        newErrors.from = "Delivery from location is required";
        isValid = false;
      }

      if (!orderData.to || orderData.to.trim() === "") {
        newErrors.to = "Delivery to location is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    const isValid = validateForm(step);

    if (isValid) {
      if (step < customSteps.length) setStep(step + 1);
    } else {
      // Mark all fields as touched for this step to show all errors
      const newTouched = { ...touched };
      if (step === 1) {
        newTouched.name = true;
        newTouched.category = true;
        newTouched.desc = true;
        newTouched.images = true;
        newTouched.budget = true;
        newTouched.quantity = true;
      } else if (step === 2) {
        newTouched.from = true;
        newTouched.to = true;
      }
      setTouched(newTouched);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    // Validate all steps before submitting
    const isStep1Valid = validateForm(1);
    if (!isStep1Valid) {
      setStep(1);
      // Mark all step 1 fields as touched
      setTouched({
        name: true,
        category: true,
        desc: true,
        images: true,
        budget: true,
        quantity: true,
      });
      return;
    }

    const isStep2Valid = validateForm(2);
    if (!isStep2Valid) {
      setStep(2);
      // Mark all step 2 fields as touched
      setTouched((prev) => ({
        ...prev,
        from: true,
        to: true,
      }));
      return;
    }

    try {
      setIsSubmitting(true);
      await createProductRequest.mutateAsync(orderData);
      alert("Order submitted successfully!");
      router.push("/");
    } catch (error: any) {
      alert(error.message || "Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

    // Mark field as touched when changed
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name } = e.target;

    // Mark field as touched when blurred
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Re-validate on data change
  useEffect(() => {
    validateForm(step);
  }, [orderData, step]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setOrderData((prev) => ({
      ...prev,
      images: [...prev.images, ...acceptedFiles],
    }));

    // Mark images as touched
    setTouched((prev) => ({
      ...prev,
      images: true,
    }));
  }, []);

  const handleImagesChange = (newImages: File[]) => {
    setOrderData((prev) => ({ ...prev, images: newImages }));

    // Mark images as touched
    setTouched((prev) => ({
      ...prev,
      images: true,
    }));
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-[#FFFFFF] rounded-lg p-[16px] block">
        <div className="mb-6">
          {/* Progress Bar */}
          <ProgressIndicator step={step} steps={customSteps} />

          {/* Step Header */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {step === 1 && "Step 1: Product Details"}
            {step === 2 && "Step 2: Delivery Details"}
            {step === 3 && "Step 3: Summary"}
          </h1>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Step 1: Product Details */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full rounded-md border ${
                    touched.name && errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  } px-3 py-2 text-sm`}
                  required
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={orderData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full rounded-md border ${
                    touched.category && errors.category
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  } px-3 py-2 text-sm`}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {touched.category && errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product details <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  value={orderData.desc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  className={`mt-1 block w-full rounded-md border ${
                    touched.desc && errors.desc
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  } px-3 py-2 text-sm`}
                  required
                  placeholder="Enter product details like model, size, color, etc."
                />
                {touched.desc && errors.desc && (
                  <p className="mt-1 text-sm text-red-500">{errors.desc}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product images <span className="text-red-500">*</span>
                </label>
                <ImageUpload
                  maxImages={15}
                  images={orderData.images}
                  onImagesChange={handleImagesChange}
                />
                {touched.images && errors.images && (
                  <p className="mt-1 text-sm text-red-500">{errors.images}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price on website (THB) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={orderData.budget}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="500"
                  step="100"
                  className={`mt-1 block w-full rounded-md border ${
                    touched.budget && errors.budget
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  } px-3 py-2 text-sm`}
                  required
                  placeholder="Enter your budget"
                />
                {touched.budget && errors.budget && (
                  <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
                )}
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-[#696969] mt-1"
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
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={orderData.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="1"
                  className={`mt-1 block w-full rounded-md border ${
                    touched.quantity && errors.quantity
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  } px-3 py-2 text-sm`}
                  required
                  placeholder="Enter quantity"
                />
                {touched.quantity && errors.quantity && (
                  <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
                )}
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium border-[#00000000] text-[#696969] mt-1"
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
                  className="h-4 w-4 text-dark-primary  border-gray-300 rounded focus:ring-primary accent-primary"
                />

                <label
                  htmlFor="check_service"
                  className="ml-2 text-sm text-gray-700"
                >
                  200 THB for Verify Product Service{" "}
                  <span className="text-[#696969]">(Optional)</span>
                </label>
              </div>
            </>
          )}

          {/* Step 2: Delivery Details */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Delivery from <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="from"
                  value={orderData.from}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full rounded-md border ${
                    touched.from && errors.from
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  } px-3 py-2 text-sm`}
                  required
                  placeholder="Country or city of origin"
                />
                {touched.from && errors.from && (
                  <p className="mt-1 text-sm text-red-500">{errors.from}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Delivery to <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="to"
                  value={orderData.to}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`mt-1 block w-full rounded-md border ${
                    touched.to && errors.to
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  } px-3 py-2 text-sm`}
                  required
                  placeholder="Destination country or city"
                />
                {touched.to && errors.to && (
                  <p className="mt-1 text-sm text-red-500">{errors.to}</p>
                )}
              </div>
            </>
          )}

          {/* Step 3: Summary */}
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
                      <Image
                        src={DOMPurify.sanitize(URL.createObjectURL(file))}
                        alt={`Preview ${index + 1}`}
                        width={180}
                        height={180}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Order Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Product:</span>{" "}
                      {orderData.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Category:</span>{" "}
                      {orderData.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Budget:</span>{" "}
                      {orderData.budget} THB
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Quantity:</span>{" "}
                      {orderData.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Deliver from:</span>{" "}
                      {orderData.from}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Deliver to:</span>{" "}
                      {orderData.to}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">
                        Verify Product Service:
                      </span>{" "}
                      {orderData.check_service ? "Yes (+200 THB)" : "No"}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Product Description:</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                    {orderData.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-300">
                  <p className="text-lg font-bold text-gray-900">
                    Total Price:{" "}
                    {orderData.budget * orderData.quantity +
                      (orderData.check_service ? 200 : 0)}{" "}
                    THB
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto bg-primary text-white px-4 py-2 rounded-lg hover:bg-dark-primary transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="button" // Changed from type="submit" to type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`ml-auto ${isSubmitting ? "bg-green-400" : "bg-green-500 hover:bg-green-600"} text-white px-4 py-2 rounded-lg transition-colors flex items-center`}
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Order"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateOrderPage;
