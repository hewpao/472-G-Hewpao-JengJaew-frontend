"use client";

import { useCreateOffer } from "@/api/offers/useOffer";
import { CreateOfferRequestDTO } from "@/dtos/Offer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect, useRef } from "react";
import { CalendarIcon } from "lucide-react";

// Define Zod Schema - only return date
const formSchema = z.object({
  returnDate: z.date({ required_error: "Return date is required" }),
});

type FormData = z.infer<typeof formSchema>;

interface DateSelectorProps {
  onClose?: () => void;
  onSubmitDates?: (dates: { returnDate: Date }) => void;
  initialReturnDate?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  productRequestID: number;
}

export default function DateSelector({
  onClose,
  onSubmitDates,
  initialReturnDate = null,
  minDate = new Date(),
  maxDate,
  className = "",
  productRequestID,
}: DateSelectorProps) {
  const [returnDate, setReturnDate] = useState<Date | null>(initialReturnDate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datePickerRef = useRef<any>(null);

  // Update local state if props change
  useEffect(() => {
    if (initialReturnDate) setReturnDate(initialReturnDate);
  }, [initialReturnDate]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      returnDate: initialReturnDate || undefined,
    },
    mode: "onChange",
  });

  // Validate dates when they change
  useEffect(() => {
    if (returnDate) setValue("returnDate", returnDate);
    if (returnDate) trigger();
  }, [returnDate, setValue, trigger]);

  // Handle calendar open/close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If calendar is open, prevent clicks from propagating to parent elements
      if (isCalendarOpen) {
        const target = event.target as HTMLElement;
        const datePickerElement = datePickerRef.current;

        // Check if click is within the datepicker component
        if (datePickerElement && !datePickerElement.contains(target)) {
          // For clicks outside the datepicker, prevent event bubbling
          event.stopPropagation();
          event.preventDefault();
        }
      }
    };

    // Add event listener to capture clicks at the document level
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isCalendarOpen]);

  const createOffer = useCreateOffer();

  const createOfferHandler = async (returnDate: Date) => {
    const offerData: CreateOfferRequestDTO = {
      product_request_id: productRequestID,
      offer_date: returnDate,
    };

    return createOffer.mutateAsync(offerData);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("Submitting date:", data.returnDate);

      // Create the offer
      await createOfferHandler(data.returnDate);

      // Call the callback if provided
      if (onSubmitDates) {
        onSubmitDates({
          returnDate: data.returnDate,
        });
      }

      // Close the popup
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error submitting offer:", error);
      alert(`Failed to create offer: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate date options for quick selection
  const today = new Date();

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const in2Weeks = new Date(today);
  in2Weeks.setDate(today.getDate() + 14);

  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  const quickSelectOptions = [
    { label: "Next Weekend", date: getNextSunday() },
    { label: "1 Week", date: nextWeek },
    { label: "2 Weeks", date: in2Weeks },
    { label: "1 Month", date: nextMonth },
  ];

  function getNextSunday() {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 6 = Saturday
    const daysUntilSunday = day === 0 ? 7 : 7 - day;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return nextSunday;
  }

  const applyQuickSelect = (date: Date) => {
    setReturnDate(date);
    setValue("returnDate", date);
    trigger();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div
      className={`max-w-lg mx-auto ${className} ${isCalendarOpen ? "relative z-50" : ""}`}
      ref={datePickerRef}
    >
      {/* Modal overlay to prevent interaction when calendar is open */}
      {isCalendarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          style={{ zIndex: 40 }}
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 relative"
        style={{ zIndex: 50 }}
      >
        {/* Quick select options */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Quick Select:</p>
          <div className="flex flex-wrap gap-2">
            {quickSelectOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  applyQuickSelect(option.date);
                }}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Return Date */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Return Date</label>
          <div className="relative">
            <DatePicker
              selected={returnDate}
              onChange={(date) => {
                setReturnDate(date);
                setValue("returnDate", date as Date);
                trigger("returnDate");
              }}
              minDate={minDate}
              maxDate={maxDate || undefined}
              dateFormat="MMM d, yyyy"
              className="border p-2 pl-9 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholderText="Select return date"
              dayClassName={(date) => {
                // Highlight current date selection
                const isSelected =
                  returnDate &&
                  date.getDate() === returnDate.getDate() &&
                  date.getMonth() === returnDate.getMonth() &&
                  date.getFullYear() === returnDate.getFullYear();

                if (isSelected) return "bg-blue-500 text-white rounded-full";
                if (isWeekend(date)) return "bg-blue-50 rounded-full";
                return undefined;
              }}
              popperClassName="z-50"
              onCalendarOpen={() => {
                setIsCalendarOpen(true);
                // Force update of input value when calendar opens
                if (returnDate) {
                  const formattedDate = formatDate(returnDate);
                  const inputElement = document.querySelector(
                    ".react-datepicker__input-container input",
                  ) as HTMLInputElement;
                  if (inputElement) {
                    inputElement.value = formattedDate;
                  }
                }
              }}
              onCalendarClose={() => {
                setIsCalendarOpen(false);
              }}
              popperProps={{
                strategy: "fixed",
                modifiers: [
                  {
                    name: "preventOverflow",
                    options: {
                      boundary: "viewport",
                    },
                  },
                ],
              }}
            />
            <CalendarIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          {errors.returnDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.returnDate.message}
            </p>
          )}
        </div>

        {/* Selected date display - always show this section */}
        <div
          className={`p-3 rounded-lg flex items-center justify-center ${returnDate ? "bg-blue-50" : "bg-gray-50"}`}
        >
          <div className="text-sm">
            {returnDate ? (
              <>
                <p className="font-medium text-center">
                  {formatDate(returnDate)}
                </p>
                <p className="text-gray-500 text-xs text-center">
                  Selected Return Date
                </p>
              </>
            ) : (
              <p className="text-gray-400 text-center">No date selected yet</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`px-4 py-3 rounded flex-1 transition-colors ${
              isValid
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Confirm Date"
            )}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 px-4 py-3 rounded hover:bg-gray-200 flex-1 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
