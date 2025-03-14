import { useGetOfferDetailByOfferID } from "@/api/offers/useOffer";
import {
  useGetProductRequestByID,
  useUpdateProductRequest,
} from "@/api/productRequest/useProductRequest";
<<<<<<< HEAD
import { GetProductRequestResponseDTO, ProductRequestResponse } from "@/dtos/productRequest";
=======
>>>>>>> 4d68430e5fa3c449afeea299ab2fb708e5425359

interface OfferDetailsProps {
  id: number;
}

const OfferDetails: React.FC<OfferDetailsProps> = ({ id }) => {
  const traveler = useGetOfferDetailByOfferID(id);
  const { data: product, isLoading: loading } = useGetProductRequestByID(
    traveler.data?.product_request_id ?? 0,
  );
  const useUpdateProduct = useUpdateProductRequest(
    traveler.data?.product_request_id ?? 0,
  );
  const productRequest = product as GetProductRequestResponseDTO;

  if (loading) {
    return <div> Loading... </div>;
  }
  const handleSelectOffer = () => {
    useUpdateProduct.mutate(
      {
<<<<<<< HEAD
        name: productRequest.name,
        desc: productRequest.desc,
        quantity: productRequest.quantity,
        category: productRequest.category,
=======
        name: product!["product-request"].name,
        desc: product!["product-request"].desc,
        quantity: product!["product-request"].quantity,
        category: product!["product-request"].category,
>>>>>>> 4d68430e5fa3c449afeea299ab2fb708e5425359
        selected_offer_id: id,
      },
      {
        onSuccess: () => {
          alert("success");
        },
      },
    );
  };
  return (
    <div className="border p-5 rounded-md">
      {traveler ? (
        <div className="grid grid-cols-1 gap-4">
          <h4 className="font-semibold text-lg">{traveler.data?.user?.Name}</h4>
          <p className="text-sm text-gray-600">
            OfferDate:{" "}
            {traveler.data?.offer_date
              ? new Date(traveler.data.offer_date).toLocaleDateString()
              : "No Date"}
          </p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleSelectOffer}
          >
            Select Offer
          </button>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-8 flex items-center justify-center text-gray-500">
          You have no delivery offers yet.
        </div>
      )}
    </div>
  );
};

export default OfferDetails;
