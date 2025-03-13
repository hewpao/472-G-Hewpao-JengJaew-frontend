import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { CreateOfferRequestDTO } from "@/dtos/Offer";
import { getSession } from "next-auth/react";

const createOffer = async (newOffer: CreateOfferRequestDTO) => {
  const session = await getSession();
  const { data } = await axiosInstance.post("/offers", newOffer, {
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return data;
};

const useCreateOffer = () => {
  return useMutation({
    mutationFn: createOffer,
  });
};

export { useCreateOffer };
