import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { getSession } from "next-auth/react";

import { 
  GetTransactionResponse, 
  PaginatedTransactionsResponse,
} from '@/dtos/Transaction';


const getTransactionByUserId = async () => {
  const session = await getSession();
    const { data } = await axiosInstance.get<PaginatedTransactionsResponse>(
        `/transactions/get-user-tx`,
        {
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        },
    );
    return data;
}

const getTransactionById = async (id: string) => {
  const session = await getSession();
    const { data } = await axiosInstance.get<GetTransactionResponse>(
        `/transactions/get/${id}`,
        {
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
        },
        },
    );
    return data;
}

const getPaginatedTransactions = async (page: number, limit: number) => {
    const session = await getSession();
        const { data } = await axiosInstance.get<PaginatedTransactionsResponse>(
            `/transactions/get?page=${page}&limit=${limit}`,
            {
            headers: {
                Authorization: `Bearer ${session?.user?.access_token}`,
            },
            },
        );
        return data;
}



export const useGetTransactionsByUserID = () => {
    return useQuery({
        queryKey: ['transaction'], 
        queryFn: () => getTransactionByUserId(),
        staleTime: 5 * 60 * 1000,
        });
}

export const useGetTransactionsByID = (id: string) => {
  return useQuery({
    queryKey: ['transaction', id], 
    queryFn: () => getTransactionById(id),
    staleTime: 5 * 60 * 1000,
    });
}

export{
    getTransactionByUserId,
    getTransactionById,
};
