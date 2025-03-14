import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "next-auth/react";
import { CreateTravelerPayoutAccountRequestDTO } from "@/dtos/PayoutAccount";
import { useMutation } from "@tanstack/react-query";

const addTravelerPayoutAccount = async (
  req: CreateTravelerPayoutAccountRequestDTO,
) => {
  const session = await getSession();
  const { data } = await axiosInstance.post(`/payout-account/create`, req, {
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return data;
};

const useAddTravelerPayoutAccount = () => {
  return useMutation({
    mutationFn: addTravelerPayoutAccount,
  });
};

export { useAddTravelerPayoutAccount };
