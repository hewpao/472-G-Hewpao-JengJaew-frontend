import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { DetailOfProductRequestResponseDTO } from "@/dtos/Product-Request";
import { useSession } from "next-auth/react";

const getProductRequestByUserID = async () => {
    const session = await useSession();

  const { data } = await axiosInstance.get<DetailOfProductRequestResponseDTO>(
    `/product-requests/get-buyer`,
    {
        headers: {
            Authorization: `Bearer ${session?.data?.user?.access_token}`,
        },
        params: {
            user_id: session?.data?.user?.id,
        },
    }
  );
  return data;
};

const useGetProductRequestByUserID = () => {
  return useMutation({
    mutationFn: getProductRequestByUserID,
  });
};

export { useGetProductRequestByUserID };