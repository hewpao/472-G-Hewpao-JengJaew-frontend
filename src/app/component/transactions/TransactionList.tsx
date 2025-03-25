// components/transactions/TransactionList.tsx
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import { useGetTransactionsByUserID } from "@/api/transaction/useTransaction";
import { useSession } from "next-auth/react";

interface TransactionListProps {
  onSelect: (id: string) => void;
  selectedId: string | null;
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

export default function TransactionList({
  onSelect,
  selectedId
}: TransactionListProps) {

  const { data: transactionsData, isLoading, error } = useGetTransactionsByUserID();
  console.log(transactionsData);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-red-500">Error loading transactions. Please try again later.</p>
      </div>
    );
  }

  if (!transactionsData || transactionsData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                ID
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                User ID
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                Amount
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                Currency
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                Gateway
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                Request ID
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                Status
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider truncate">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactionsData.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => onSelect(transaction.id)}
                className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedId === transaction.id ? "bg-blue-50" : ""
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {transaction.user_id}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-center`}>
                  {transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {transaction.currency}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {transaction.third_party_gateway}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {transaction.product_request_id || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    transaction.status === "SUCCESS"
                      ? "bg-green-100 text-green-800"
                      : transaction.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {(() => {
                    try {
                      const date = new Date(transaction.created_at);
                      if (isNaN(date.getTime())) {
                        return "Invalid date";
                      }
                      return formatDistanceToNow(date, { addSuffix: true });
                    } catch (error) {
                      return "Invalid date";
                    }
                  })()}
                </td>
  
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}