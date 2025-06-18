export default function BookingModal({
  listing,
  isOpen,
  bookingData,
  onClose,
  onSubmit,
  onBookingDataChange,
}) {
  if (!isOpen || !listing) return null;

  const calculateNights = () => {
    if (bookingData.startDate && bookingData.endDate) {
      const start = new Date(bookingData.startDate);
      const end = new Date(bookingData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">Book Your Stay</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">{listing.title}</h3>
            <p className="text-gray-600">{listing.location}</p>
            <p className="text-blue-600 font-semibold">
              ₹{listing.price}/night
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                value={bookingData.startDate}
                onChange={(e) =>
                  onBookingDataChange({
                    ...bookingData,
                    startDate: e.target.value,
                  })
                }
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                value={bookingData.endDate}
                onChange={(e) =>
                  onBookingDataChange({
                    ...bookingData,
                    endDate: e.target.value,
                  })
                }
                min={
                  bookingData.startDate ||
                  new Date().toISOString().split("T")[0]
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {calculateNights() > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Nights:</span>
                  <span>{calculateNights()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{listing.price * calculateNights()}</span>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
