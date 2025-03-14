import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import {
  VerifyWithKYCDTO,
  UpdateUserVerificationDTO,
  EKYCResponseDTO,
} from "@/dtos/Verification";
import { getSession } from "next-auth/react";
import { IdentityVerification } from "@/interfaces/IdentityVerification";

const verifyWithKYC = async (verify: VerifyWithKYCDTO) => {
  const session = await getSession();
  const { data } = await axiosInstance.post<EKYCResponseDTO>(
    `/verify`,
    verify,
    {
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

const updateUserVerification = async (email: string) => {
  const session = await getSession();
  const { data } = await axiosInstance.post(`/verify/set/${email}`, {
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return data;
};

const getVerificationStatus = async (id: string) => {
  const session = await getSession();
  const { data } = await axiosInstance.get(`/verify/${id}`, {
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
  });
  return data;
};

const useGetVerificationStatus = (id: string) => {
  return useQuery<IdentityVerification>({
    queryKey: ["verifications", id],
    queryFn: () => getVerificationStatus(id),
  });
};

const useVerifyWithKYC = () => {
  return useMutation({
    mutationFn: verifyWithKYC,
  });
};

const useUpdateUserVerification = (email: string) => {
  return useQuery<UpdateUserVerificationDTO>({
    queryKey: ["verifications", email],
    queryFn: () => updateUserVerification(email),
  });
};

export {
  useVerifyWithKYC,
  useUpdateUserVerification,
  useGetVerificationStatus,
};

