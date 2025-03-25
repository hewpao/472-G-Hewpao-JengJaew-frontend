// components/transactions/TransactionDetails.tsx
import { useState, useEffect } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { Loader2, ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react";
import { useGetTransactionsByID } from "@/api/transaction/useTransaction";

interface TransactionDetailsProps {
  transactionId: string | null;
  onBack: () => void;
}

// Define payment status type
type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED";

// Define transaction interface based on the provided fields
interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  third_party_gateway: string;
  third_party_payment_id: string | null;
  product_request_id: number | null;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
  description?: string; // Keep this for backward compatibility
}

export default function TransactionDetails({
  transactionId,
  onBack
}: TransactionDetailsProps) {
  // Assume there's a hook to fetch a single transaction by ID
  const { data: transaction, isLoading, error } = useGetTransactionsByID(transactionId);

  if (!transactionId) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Select a transaction to view details.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
        <p className="text-gray-500">Loading transaction details...</p>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-red-500">Error loading transaction details. Please try again later.</p>
        <button
          onClick={onBack}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Transactions
        </button>
      </div>
    );
  }

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return format(date, "PPpp"); // Format: Apr 29, 2021, 12:34:56 PM
    } catch (error) {
      return "Invalid date";
    }
  };

  // Get status icon based on transaction status
  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "PENDING":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      case "FAILED":
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back
          </button>
          <div className="flex items-center">
            {getStatusIcon(transaction.status)}
            <span
              className={`ml-2 px-3 py-1 text-sm font-medium rounded-full ${
                transaction.status === "SUCCESS"
                  ? "bg-green-100 text-green-800"
                  : transaction.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {transaction.status}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
          Transaction Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Transaction ID</h3>
              <p className="mt-1 text-sm text-gray-900 font-mono">{transaction.id}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">User ID</h3>
              <p className="mt-1 text-sm text-gray-900 font-mono">{transaction.user_id}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Amount</h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {transaction.amount.toFixed(2)} {transaction.currency}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Payment Gateway</h3>
              <p className="mt-1 text-sm text-gray-900">{transaction.third_party_gateway}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Payment ID</h3>
              <p className="mt-1 text-sm text-gray-900 font-mono">
                {transaction.third_party_payment_id || "-"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Product Request ID</h3>
              <p className="mt-1 text-sm text-gray-900">
                {transaction.product_request_id || "-"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Created At</h3>
              <p className="mt-1 text-sm text-gray-900">{formatDate(transaction.created_at)}</p>
              <p className="text-xs text-gray-500">
                ({formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true })})
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Updated At</h3>
              <p className="mt-1 text-sm text-gray-900">{formatDate(transaction.updated_at)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}