"use client";

import { useState, useEffect, useRef } from "react";
import DateSelector from "./DateSelector";

interface MakeOfferButtonProps {
  productRequestID: number;
}

const MakeOfferButton = ({ productRequestID }: MakeOfferButtonProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Handle body scrolling and interaction blocking when popup is open
  useEffect(() => {
    if (showPopup) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      // Function to handle events outside the modal
      const blockOutsideInteractions = (event: Event) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          event.stopPropagation();
          event.preventDefault();
        }
      };

      // Add event listeners to block interactions outside the modal
      document.addEventListener('mousedown', blockOutsideInteractions, true);
      document.addEventListener('touchstart', blockOutsideInteractions, true);
      document.addEventListener('wheel', blockOutsideInteractions, { passive: false, capture: true });
      document.addEventListener('touchmove', blockOutsideInteractions, { passive: false, capture: true });
      document.addEventListener('keydown', blockOutsideInteractions, true);

      return () => {
        // Restore scrolling when component unmounts or popup closes
        const scrollY = parseInt((document.body.style.top || '0').replace('-', ''));
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);

        // Remove event listeners
        document.removeEventListener('mousedown', blockOutsideInteractions, true);
        document.removeEventListener('touchstart', blockOutsideInteractions, true);
        document.removeEventListener('wheel', blockOutsideInteractions, true);
        document.removeEventListener('touchmove', blockOutsideInteractions, true);
        document.removeEventListener('keydown', blockOutsideInteractions, true);
      };
    }
  }, [showPopup]);

  // Handle successful submission
  const handleDateSubmit = (dates: { returnDate: Date }) => {
    console.log("Date selected:", dates.returnDate);
    // The DateSelector already handles API calls
    closePopup();
  };

  return (
    <div className="w-full">
      <button
        onClick={openPopup}
        className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
      >
        Make an Offer
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
          style={{ zIndex: 9998 }}
          onClick={(e) => {
            // Only close if clicking directly on the backdrop, not on the modal content
            if (e.target === e.currentTarget) {
              closePopup();
            }
          }}
        >
          <div 
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
            style={{ zIndex: 9999 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-semibold">Select Travel Date</h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
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
                onSubmitDates={handleDateSubmit}
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