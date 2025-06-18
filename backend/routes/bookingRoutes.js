const express = require("express");
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new booking
router.post("/", auth, async (req, res) => {
  try {
    const { listing, startDate, endDate } = req.body;
    
    // Check if listing exists
    const listingExists = await Listing.findById(listing);
    if (!listingExists) {
      return res.status(404).json({ message: "Listing not found" });
    }
    
    // Check if user is trying to book their own listing
    if (listingExists.host.toString() === req.user) {
      return res.status(400).json({ message: "You cannot book your own listing" });
    }
    
    // Check for date conflicts
    const conflictingBooking = await Booking.findOne({
      listing,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) }
        }
      ]
    });
    
    if (conflictingBooking) {
      return res.status(400).json({ message: "Property is not available for selected dates" });
    }
    
    const booking = new Booking({
      user: req.user,
      listing,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });
    
    await booking.save();
    
    // Populate the booking with listing and user details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("listing", "title location price")
      .populate("user", "name email");
    
    res.status(201).json({ booking: populatedBooking, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's bookings
router.get("/user", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user })
      .populate("listing", "title location price images")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    
    res.json({ bookings, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get host's bookings (bookings for their listings)
router.get("/host", auth, async (req, res) => {
  try {
    // First get all listings by this host
    const hostListings = await Listing.find({ host: req.user });
    const listingIds = hostListings.map(listing => listing._id);
    
    // Then get all bookings for these listings
    const bookings = await Booking.find({ listing: { $in: listingIds } })
      .populate("listing", "title location price images")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    
    res.json({ bookings, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single booking
router.get("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("listing", "title location price images host")
      .populate("user", "name email");
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Check if user is the booker or the host of the listing
    if (booking.user._id.toString() !== req.user && 
        booking.listing.host.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized to view this booking" });
    }
    
    res.json({ booking, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel booking
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    
    // Only the user who made the booking can cancel it
    if (booking.user.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }
    
    // Check if booking is in the future
    if (new Date(booking.startDate) <= new Date()) {
      return res.status(400).json({ message: "Cannot cancel past or ongoing bookings" });
    }
    
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully", success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;