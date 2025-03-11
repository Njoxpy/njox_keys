const mongoose = require("mongoose");

// models
const Venue = require("../../models/venue.model");
const Order = require("../../models/order.model");
const Student = require("../../models/student.model");

// status code
const { NOT_FOUND, BAD_REQUEST } = require("../../constants/apiResponse");

const validateOrderCreate = async (req, res, next) => {
  const { venueId, registrationNumber } = req.body;

  if (!venueId || !registrationNumber) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Venue ID and Registration Number are required." });
  }

  if (!mongoose.Types.ObjectId.isValid(venueId)) {
    return res.status(NOT_FOUND).json({ message: "Invalid Venue ID." });
  }

  const student = await Student.findOne({ registrationNumber });
  if (!student) {
    return res.status(NOT_FOUND).json({
      message: "Student not found with the given registration number.",
    });
  }

  const venue = await Venue.findById(venueId);
  if (!venue) {
    return res.status(NOT_FOUND).json({ message: "Venue not found." });
  }

  if (venue.status !== "available") {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Venue is already booked." });
  }

  next();
};

module.exports = validateOrderCreate;

module.exports = validateOrderCreate;
