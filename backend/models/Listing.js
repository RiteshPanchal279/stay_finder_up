const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [String],
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Listing", listingSchema);
