export default function ListingCard({ listing, onViewDetails, onBookNow }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {listing.images && listing.images.length > 0 ? (
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => onViewDetails(listing)}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}

      <div className="p-4">
        <h3
          className="font-semibold text-lg mb-2 cursor-pointer hover:text-blue-600"
          onClick={() => onViewDetails(listing)}
        >
          {listing.title}
        </h3>
        <p className="text-gray-600 mb-2 flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05A7 7 0 119.95 15.95L10 16l-.95-.05A7 7 0 015.05 4.05zM10 12a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {listing.location}
        </p>
        <p className="text-blue-600 font-semibold text-lg mb-2">
          ₹{listing.price}/night
        </p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {listing.description}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          Host: {listing.host?.name || "Unknown"}
        </p>

        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(listing)}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition cursor-pointer"
          >
            View Details
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
  );
}