import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "next-auth/react";
import { GetAllBankResponse } from "@/interfaces/Bank";

const getAllBanks = async () => {
  const session = await getSession();
  const { data } = await axiosInstance.get(
    `/payout-account/get-available-banks`,
    {
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    },
  );
  return data;
};
const useGetAllBanks = () => {
  return useQuery<GetAllBankResponse>({
    queryKey: ["banks"],
    queryFn: () => getAllBanks(),
  });
};

export { useGetAllBanks };
