import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { CreateOfferRequestDTO } from "@/dtos/Offer";
import { getSession } from "next-auth/react";
import { Offer } from "@/interfaces/Offer";

const createOffer = async (newOffer: CreateOfferRequestDTO) => {
  const session = await getSession();
  const { data } = await axiosInstance.post("/offers", newOffer, {
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return data;
};

const getOfferDetailByOfferID = async (id: number) => {
  const session = await getSession();
  const { data } = await axiosInstance.get<Offer>(`/offers/get/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return data;
};

const useGetOfferDetailByOfferID = (id:number) =>{
  return useQuery({
    queryKey: ["offers"],
    queryFn: () => getOfferDetailByOfferID(id),
  })
}

const useCreateOffer = () => {
  return useMutation({
    mutationFn: createOffer,
  });
};

export { 
  useCreateOffer,
  useGetOfferDetailByOfferID
 };
