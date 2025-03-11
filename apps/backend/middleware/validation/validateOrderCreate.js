const mongoose = require("mongoose");
const Venue = require("../../models/venue.model");
const Order = require("../../models/order.model");
const Student = require("../../models/student.model");
const { NOT_FOUND, BAD_REQUEST } = require("../../constants/apiResponse");

const validateOrderCreate = async (req, res, next) => {
  const { venueId, studentId, registrationNumber } = req.body;

  // Validate required fields
  if (!venueId) {
    return res.status(BAD_REQUEST).json({ message: "Venue ID is required." });
  }

  const employee = req.user && req.user._id;
  if (!employee) {
    return res.status(BAD_REQUEST).json({ message: "Employee ID is required" });
  }

  // Validate if venueId and employeeId are valid ObjectIds
  if (!mongoose.Types.ObjectId.isValid(venueId)) {
    return res.status(NOT_FOUND).json({ message: "Invalid Venue ID." });
  }

  if (!mongoose.Types.ObjectId.isValid(employee)) {
    return res.status(NOT_FOUND).json({ message: "Invalid Employee ID." });
  }

  // Validate registrationNumber as a number
  if (!registrationNumber || isNaN(registrationNumber)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Valid registration number is required." });
  }

  // Find the student using registrationNumber
  const student = await Student.findOne({ registrationNumber });
  if (!student) {
    return res.status(NOT_FOUND).json({ message: "Student not found." });
  }

  const studentId = student._id;

  // Attach the studentId to the request object to pass it to the next middleware or handler
  req.body.studentId = studentId;

  // Check if venue exists
  const venue = await Venue.findById(venueId);
  if (!venue) {
    return res.status(NOT_FOUND).json({ message: "Venue not found." });
  }

  // Check venue status
  if (venue.status !== "available") {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Venue is already booked." });
  }

  // Check for existing order for the venue
  const existingOrder = await Order.findOne({ venueId });
  if (existingOrder) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Venue is already booked." });
  }

  // Forward the request to the next middleware or route handler
  next();
};

module.exports = validateOrderCreate;
