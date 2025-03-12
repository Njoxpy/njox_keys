const express = require("express");
const status = express.Router();

// model
const Venue = require("../models/venue.model");

// status code
const { OK, SERVER_ERROR, BAD_REQUEST } = require("../constants/apiResponse");

// auth middleware
const { authenticate, authorize } = require("../middleware/authentication/authenticate")


// Get venues by status (booked or available)
status.get(
  "/venues", 
  authenticate, 
  async (req, res) => {
  try {
    const { status } = req.query;

    if (!status || !["available", "booked"].includes(status)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid status value!" });
    }

    const venues = await Venue.find({ status: status });

    if (venues.length === 0) {
      return res.status(OK).json({ message: "Nothing found!" });
    }

    res.status(OK).json({ data: venues });
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR).json({ message: error.message });
  }
});


module.exports = status;
