import { useGetOfferDetailByOfferID } from "@/api/offers/useOffer";
import {
  useGetProductRequestByID,
  useUpdateProductRequest,
} from "@/api/productRequest/useProductRequest";

interface OfferDetailsProps {
  id: number;
}

const OfferDetails: React.FC<OfferDetailsProps> = ({ id }) => {
  const traveler = useGetOfferDetailByOfferID(id);
  const { data: productData, isLoading: loading } = useGetProductRequestByID(
    traveler.data?.product_request_id ?? 0,
  );
  const useUpdateProduct = useUpdateProductRequest(
    traveler.data?.product_request_id ?? 0,
  );
  const product = productData?.["product-request"];

  if (loading) {
    return <div> Loading... </div>;
  }
  const handleSelectOffer = () => {
    useUpdateProduct.mutate(
      {
        name: product!.name,
        desc: product!.desc,
        quantity: product!.quantity,
        category: product!.category,
        selected_offer_id: id,
      },
      {
        onSuccess: () => {
          alert("success");
          window.location.reload();
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
            className="mt-2 px-4 py-2 bg-primary text-white rounded-lg"
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
