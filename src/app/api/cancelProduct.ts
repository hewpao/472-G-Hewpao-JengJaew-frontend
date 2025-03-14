import axios from "@/lib/axiosInstance";

export const cancelProductRequest = async (requestId: string) => {
  try {
    const response = await axios.delete(`/api/product-requests/${requestId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to cancel request");
  }
};
