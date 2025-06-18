import { useState } from "react";
import API from "../api";
import { toast } from "sonner";

export function useBooking() {
  const [bookingData, setBookingData] = useState({
    startDate: "",
    endDate: "",
  });

  const createBooking = async (listingId) => {
    if (!bookingData.startDate || !bookingData.endDate) {
      toast.error("Please select both check-in and check-out dates");
      return false;
    }

    if (new Date(bookingData.startDate) >= new Date(bookingData.endDate)) {
      toast.error("Check-out date must be after check-in date");
      return false;
    }

    try {
      const userId = localStorage.getItem("userId");
      const booking = {
        user: userId,
        listing: listingId,
        startDate: bookingData.startDate,
        endDate: bookingData.endDate,
      };

      const res = await API.post(`${import.meta.env.VITE_BACKEND_URL}/bookings`, booking);

      if (res.data.success) {
        toast.success("Booking confirmed successfully!");
        setBookingData({ startDate: "", endDate: "" });
        return true;
      }
    } catch (error) {
      toast.error("Failed to create booking");
      return false;
    }
  };

  return {
    bookingData,
    setBookingData,
    createBooking,
    resetBookingData: () => setBookingData({ startDate: "", endDate: "" })
  };
}