const mongoose = require("mongoose");
const venueSchema = new mongoose.Schema(
  {
    abbreviation: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
    block: {
      type: String,
      required: true,
      maxLength: 100,
      index: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    venueNumber: {
      type: Number,
      required: [true, "Venue number is required!"],
      unique: [true, "Venue number is alredy in use."],
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
      trim: true,
    },
    equipment: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    images: [
      {
        type: String,
        default: [
          "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        ],
        required: true,
      },
    ],
    name: {
      type: String,
      required: true,
      unique: true,
      minLength: 2,
      trim: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
      required: true,
      index: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
