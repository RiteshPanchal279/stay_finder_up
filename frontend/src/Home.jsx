import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Components
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ListingsGrid from "./components/ListingsGrid";
import ListingDetailsModal from "./components/ListingDetailsModal";
import BookingModal from "./components/BookingModal";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useListings } from "./hooks/useListings";
import { useBooking } from "./hooks/useBooking";

export default function Home() {
  const [selectedListing, setSelectedListing] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);

  const navigate = useNavigate();
  const { isLoggedIn, userRole, logout } = useAuth();
  const { listings, loading } = useListings();
  const { bookingData, setBookingData, createBooking, resetBookingData } =
    useBooking();

  useEffect(() => {
    if (!Array.isArray(listings)) {
      setFilteredListings([]);
      return;
    }
    const filtered = listings.filter(
      (listing) =>
        listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListings(filtered);
  }, [listings, searchTerm]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    window.location.reload();
  };

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
  };

  const handleBookNow = (listing) => {
    if (!isLoggedIn) {
      toast.error("Please login to book a property");
      navigate("/login");
      return;
    }

    if (userRole === "host") {
      toast.error("Hosts cannot book properties");
      return;
    }

    setSelectedListing(listing);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const success = await createBooking(selectedListing._id);
    if (success) {
      setShowBookingModal(false);
      setSelectedListing(null);
      resetBookingData();
    }
  };

  const handleCloseModals = () => {
    setShowBookingModal(false);
    setSelectedListing(null);
    resetBookingData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading listings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Properties
          </h2>

          <ListingsGrid
            listings={filteredListings}
            searchTerm={searchTerm}
            onViewDetails={handleViewDetails}
            onBookNow={handleBookNow}
          />
        </div>
      </section>

      <ListingDetailsModal
        listing={selectedListing}
        isOpen={selectedListing && !showBookingModal}
        onClose={() => setSelectedListing(null)}
        onBookNow={handleBookNow}
      />

      <BookingModal
        listing={selectedListing}
        isOpen={showBookingModal}
        bookingData={bookingData}
        onClose={handleCloseModals}
        onSubmit={handleBookingSubmit}
        onBookingDataChange={setBookingData}
      />
    </div>
  );
}
