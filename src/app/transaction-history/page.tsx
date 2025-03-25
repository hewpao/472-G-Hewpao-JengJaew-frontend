// app/transactions/page.tsx
"use client";

import { useState } from "react";
import TransactionList from "../component/transactions/TransactionList";
import TransactionDetails from "../component/transactions/TransactionDetails";

export default function TransactionHistoryPage() {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "details">("list");

  // Handle transaction selection
  const handleSelectTransaction = (id: string) => {
    setSelectedTransactionId(id);
    console.log(id);
    setViewMode("details"); // Switch to details view when a transaction is selected
  };

  // Handle back button press
  const handleBack = () => {
    setViewMode("list"); // Switch back to list view
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Transaction History</h1>


      <div className="lg:col-span-2 space-y-6">
        {viewMode === "list" ? (
          <TransactionList
            onSelect={handleSelectTransaction}
            selectedId={selectedTransactionId}
          />
        ) : (
          <TransactionDetails
            transactionId={selectedTransactionId}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
        
  );
}