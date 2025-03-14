"use client";

import { useState } from "react";
import { cancelProductRequest } from "@/api/cancelProduct";

interface CancelRequestProps {
  requestId: string;
  onCancelSuccess?: () => void;
}

const CancelProductRequest: React.FC<CancelRequestProps> = ({ requestId, onCancelSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancelRequest = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await cancelProductRequest(requestId);
      onCancelSuccess?.();
    } catch (err) {
      setError("Failed to cancel request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <p className="mb-2">Cancel Product Request</p>

      {error && <p className="text-red-500">{error}</p>}

    <button 
        onClick={handleCancelRequest} 
        disabled={isLoading} 
        className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 disabled:opacity-50"
    >
        {isLoading ? "Cancelling..." : "Cancel Request"}
    </button>

    </div>
  );
};

export default CancelProductRequest;
