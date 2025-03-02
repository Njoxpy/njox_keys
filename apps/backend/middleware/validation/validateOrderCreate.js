// Library
const mongoose = require("mongoose");

// Models
const Venue = require("../../models/venue.model");
const Order = require("../../models/order.model");

// Status Codes
const { NOT_FOUND, BAD_REQUEST } = require("../../constants/apiResponse");

const validateOrderCreate = async (req, res, next) => {
  const { venueId, status } = req.body;

  // Validate required fields
  if (!venueId ) {
    return res.status(BAD_REQUEST).json({ message: "Fill all fields! Venue ID is required." });
  }

  // Validate if venueId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(venueId)) {
    return res.status(NOT_FOUND).json({ message: "Invalid Venue ID." });
  }

  if(!["pending", "approved", "rejected"]){
    return res.status(BAD_REQUEST).json({message: "Order status not valid"})
  }

  // Check if venue exists
  const venue = await Venue.findById(venueId);
  if (!venue) {
    return res.status(NOT_FOUND).json({ message: "Venue not found." });
  }

  // Check venue status
  if (venue.status !== "available") {
    return res.status(BAD_REQUEST).json({ message: "Venue is alreday booked." });
  }

  // Check for existing order
  const existingOrder = await Order.findOne({ venueId });
  if (existingOrder) {
    return res.status(BAD_REQUEST).json({ message: "Venue is already booked." });
  }

  // Forward request
  next();
};

module.exports = validateOrderCreate;
