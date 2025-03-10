const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    abbreviation: {
      type: String,
      required: [true, "Venue abbreviation is required"],
      maxLength: [20, "Abbreviation should not exceed 20 characters"],
      trim: true,
    },
    block: {
      type: String,
      required: [true, "Block is required"],
      maxLength: [10, "Block name should not exceed 10 characters"],
      trim: true,
      index: true,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
      index: true,
    },
    venueNumber: {
      type: Number,
      required: [true, "Venue number is required!"],
      unique: [true, "Venue number is already in use."],
      index: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxLength: [500, "Description should not exceed 500 characters"],
      trim: true,
    },
    equipment: [
      {
        type: String,
        required: [true, "Equipment is required"],
        trim: true,
      },
    ],
    images: [
      {
        type: String,
        default: [
          "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        ],
        required: [true, "Images are required"],
        validate: {
          validator: (value) => value && value.length > 0,
          message: "At least one image is required",
        },
      },
    ],
    name: {
      type: String,
      required: [true, "Venue name is required"],
      unique: [true, "Venue name is already in use"],
      minLength: [2, "Venue name should be at least 2 characters"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["available", "booked"],
      default: "available",
      required: [true, "Status is required"],
      index: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Venue = mongoose.model("Venue", venueSchema);
module.exports = Venue;
