import ListingCard from "./ListingCard";

export default function ListingsGrid({ 
  listings, 
  searchTerm, 
  onViewDetails, 
  onBookNow 
}) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-xl">
          {searchTerm
            ? "No properties found matching your search."
            : "No properties available at the moment."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {listings.map((listing) => (
        <ListingCard
          key={listing._id}
          listing={listing}
          onViewDetails={onViewDetails}
          onBookNow={onBookNow}
        />
      ))}
    </div>
  );
}