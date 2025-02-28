const mongoose = require("mongoose");
const venueSchema = new mongoose.Schema(
  {
    abbreviation: {
      type: String,
      required: true,
      maxLength: 20,
    },
    block: {
      type: String,
      required: true,
      maxLength: 100,
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    equipment: [
      {
        type: String,
        required: true,
      },
    ],
    images: [
      {
        type: String,
        //   required: true,
      },
    ],
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
      required: true,
    },
  },
  { timestamps: true }
);

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
