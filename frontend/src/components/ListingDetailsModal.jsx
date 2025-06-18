export default function ListingDetailsModal({ 
  listing, 
  isOpen, 
  onClose, 
  onBookNow 
}) {
  if (!isOpen || !listing) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{listing.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {listing.images && listing.images.length > 0 && (
            <div className="mb-4">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              {listing.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {listing.images.slice(1, 5).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${listing.title} ${index + 2}`}
                      className="w-full h-16 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Location</h3>
              <p className="text-gray-600">{listing.location}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Price</h3>
              <p className="text-blue-600 font-semibold text-xl">
                ₹{listing.price}/night
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-gray-600">{listing.description}</p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Host</h3>
              <p className="text-gray-600">
                {listing.host?.name || "Unknown"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => onBookNow(listing)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}