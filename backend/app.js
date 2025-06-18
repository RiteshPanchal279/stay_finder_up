const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser=require('cookie-parser')
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieparser());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/listings", require("./routes/listingRoutes"));
app.use("/bookings", require("./routes/bookingRoutes"));

// Connect to DB and start server
app.get("/", (req, res) => {
   res.send("Hello, this is the home page");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port " + process.env.PORT);
    });
  })
  .catch((err) => console.error("MongoDB connection failed:", err));

module.exports = app;