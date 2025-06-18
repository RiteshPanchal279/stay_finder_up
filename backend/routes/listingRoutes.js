const express = require("express");
const Listing = require("../models/Listing");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// Get all listings
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find().populate("host", "name");
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get listings by host
router.get("/host/:hostId", auth, async (req, res) => {
  try {
    const listings = await Listing.find({ host: req.params.hostId }).populate("host", "name");
    res.json({ listings, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single listing
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("host", "name");
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.json({ listing, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new listing
router.post("/", auth, async (req, res) => {
  try {
    const { title, location, price, description, images } = req.body;
    const listing = new Listing({
      title,
      location,
      price,
      description,
      images,
      host: req.user
    });
    await listing.save();
    res.status(201).json({ listing, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update listing
router.put("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    
    // Check if user is the owner of the listing
    if (listing.host.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized to update this listing" });
    }
    
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("host", "name");
    
    res.json({ listing: updatedListing, success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete listing
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    
    // Check if user is the owner of the listing
    if (listing.host.toString() !== req.user) {
      return res.status(403).json({ message: "Not authorized to delete this listing" });
    }
    
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted successfully", success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;