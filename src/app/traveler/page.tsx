"use client";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const router = useRouter();

  const handleAddTrip = () => {
    const userId = "1"; 
    router.push(`/traveler/${userId}`);
  };

  return (
    <>
      {/* Order List */}
      <div className="px-8 bg-gray-50 rounded pt-[32px] pb-[32px]">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Make a trip.
        </h1>
        <button
          type="button"
          className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center gap-2"
          onClick={handleAddTrip}
        >
          Add trip
        </button>
      </div>
    </>
  );
}

export default page;