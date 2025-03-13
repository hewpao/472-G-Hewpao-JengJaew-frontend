"use client";

import { useState } from "react";
import DateSelector from "./DateSelector";

interface MakeOfferButtonProps {
  productRequestID: number;
}

const MakeOfferButton = ({ productRequestID }: MakeOfferButtonProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-full relative">
      <button
        onClick={openPopup}
        className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        Make an Offer
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold">Select Travel Dates</h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <DateSelector
                onClose={closePopup}
                productRequestID={productRequestID}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeOfferButton;
