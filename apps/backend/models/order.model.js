const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    venueId: {
      ref: "Venue",
      type: mongoose.Types.ObjectId,
      required: [true, "Venue id is required"],
      unique: [true, "venue should be unique"],
    },
    /*
  userId: {
    ref: "User",
    type: String,
    required: [true, "User id is required"],
  },
   */
    bookingDate: {
      type: Date,
      required: [true, "Enter the date for booking a venue!"],
    },
  },
  {
    timestamps: true,
  }
);

// venueName,
