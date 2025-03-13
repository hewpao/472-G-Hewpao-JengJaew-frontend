"use client";

import { useCreateOffer } from "@/api/offers/useOffer";
import { CreateOfferRequestDTO } from "@/dtos/Offer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";

// Define Zod Schema
const formSchema = z
  .object({
    departureDate: z.date({ required_error: "Departure date is required" }),
    returnDate: z.date({ required_error: "Return date is required" }),
  })
  .refine((data) => data.returnDate >= data.departureDate, {
    message: "Return date must be after departure date",
    path: ["returnDate"],
  });

type FormData = z.infer<typeof formSchema>;

interface DateSelectorProps {
  onClose?: () => void;
  onSubmitDates?: (dates: { departureDate: Date; returnDate: Date }) => void;
  initialDepartureDate?: Date | null;
  initialReturnDate?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  productRequestID: number;
}

export default function DateSelector({
  onClose,
  onSubmitDates,
  initialDepartureDate = null,
  initialReturnDate = null,
  minDate = new Date(),
  maxDate,
  className = "",
  productRequestID,
}: DateSelectorProps) {
  const [departureDate, setDepartureDate] = useState<Date | null>(
    initialDepartureDate,
  );
  const [returnDate, setReturnDate] = useState<Date | null>(initialReturnDate);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update local state if props change
  useEffect(() => {
    if (initialDepartureDate) setDepartureDate(initialDepartureDate);
    if (initialReturnDate) setReturnDate(initialReturnDate);
  }, [initialDepartureDate, initialReturnDate]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departureDate: initialDepartureDate || undefined,
      returnDate: initialReturnDate || undefined,
    },
    mode: "onChange",
  });

  // Validate dates when they change
  useEffect(() => {
    if (departureDate) setValue("departureDate", departureDate);
    if (returnDate) setValue("returnDate", returnDate);
    if (departureDate && returnDate) trigger();
  }, [departureDate, returnDate, setValue, trigger]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    console.log("Submitted Trip Dates:", data);

    const offerDate = "2023-07-15T14:32:10+07:00";
    await createOfferHandler(offerDate);

    if (onSubmitDates) {
      onSubmitDates({
        departureDate: data.departureDate,
        returnDate: data.returnDate,
      });
    }

    // Close the popup after successful submission
    if (onClose) {
      onClose();
    }

    setIsSubmitting(false);
  };

  // Calculate date ranges for quick selection options
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  const in3Months = new Date(today);
  in3Months.setMonth(today.getMonth() + 3);

  const quickSelectOptions = [
    {
      label: "Next Weekend",
      departure: getNextFriday(),
      return: getNextSunday(),
    },
    { label: "1 Week", departure: today, return: nextWeek },
    { label: "1 Month", departure: today, return: nextMonth },
    { label: "3 Months", departure: today, return: in3Months },
  ];

  function getNextFriday() {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 6 = Saturday
    const daysUntilFriday = day <= 5 ? 5 - day : 5 + (7 - day);
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilFriday);
    return nextFriday;
  }

  function getNextSunday() {
    const nextFriday = getNextFriday();
    const nextSunday = new Date(nextFriday);
    nextSunday.setDate(nextFriday.getDate() + 2);
    return nextSunday;
  }

  const applyQuickSelect = (departure: Date, returnDate: Date) => {
    setDepartureDate(departure);
    setReturnDate(returnDate);
    setValue("departureDate", departure);
    setValue("returnDate", returnDate);
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

  const createOffer = useCreateOffer();

  const createOfferHandler = async (offerDate: string) => {
    const offerData: CreateOfferRequestDTO = {
      product_request_id: productRequestID,
      offer_date: new Date(offerDate),
    };

    await createOffer.mutateAsync(offerData, {
      onSuccess: () => {
        alert("done");
      },
      onError: (error) => {
        alert(`failed ${error}`);
      },
    });
  };

  return (
    <div className={`max-w-lg mx-auto ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Quick select options */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Quick Select:</p>
          <div className="flex flex-wrap gap-2">
            {quickSelectOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  applyQuickSelect(option.departure, option.return)
                }
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date selection area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Departure Date */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Departure</label>
            <div className="relative">
              <DatePicker
                selected={departureDate}
                onChange={(date) => {
                  setDepartureDate(date);
                  setValue("departureDate", date as Date);
                  trigger("departureDate");
                }}
                selectsStart
                startDate={departureDate}
                endDate={returnDate}
                minDate={minDate}
                maxDate={maxDate || undefined}
                dateFormat="MMM d, yyyy"
                className="border p-2 pl-9 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholderText="Select departure"
                dayClassName={(date) =>
                  isWeekend(date) ? "bg-blue-50 rounded-full" : undefined
                }
                popperClassName="z-50"
              />
              <CalendarIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.departureDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.departureDate.message}
              </p>
            )}
          </div>

          {/* Return Date */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Return</label>
            <div className="relative">
              <DatePicker
                selected={returnDate}
                onChange={(date) => {
                  setReturnDate(date);
                  setValue("returnDate", date as Date);
                  trigger("returnDate");
                }}
                selectsEnd
                startDate={departureDate}
                endDate={returnDate}
                minDate={departureDate || minDate}
                maxDate={maxDate || undefined}
                dateFormat="MMM d, yyyy"
                className="border p-2 pl-9 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholderText="Select return"
                dayClassName={(date) =>
                  isWeekend(date) ? "bg-blue-50 rounded-full" : undefined
                }
                popperClassName="z-50"
              />
              <CalendarIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {errors.returnDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.returnDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Trip summary */}
        {departureDate && returnDate && (
          <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium">{formatDate(departureDate)}</p>
              <p className="text-gray-500 text-xs">Departure</p>
            </div>
            <ArrowRightIcon className="h-4 w-4 text-gray-400" />
            <div className="text-sm">
              <p className="font-medium">{formatDate(returnDate)}</p>
              <p className="text-gray-500 text-xs">Return</p>
            </div>
            <div className="text-sm bg-white px-2 py-1 rounded-full border">
              <p className="font-medium text-xs">
                {Math.ceil(
                  (returnDate.getTime() - departureDate.getTime()) /
                    (1000 * 60 * 60 * 24),
                )}{" "}
                days
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`px-4 py-2 rounded flex-1 transition-colors ${
              isValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Confirm Dates"}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 flex-1 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
