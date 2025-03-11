const express = require("express");
const status = express.Router();

// model
const Venue = require("../models/venue.model");

// status code
const { OK, SERVER_ERROR, BAD_REQUEST } = require("../constants/apiResponse");

// Get venues by status (booked or available)
status.get("/venues", async (req, res) => {
  try {
    const { status } = req.query;

    if (!status || !["available", "booked"].includes(status)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid status value!" });
    }

    const venues = await Venue.find({ status: status });

    if (venues.length === 0) {
      return res.status(OK).json({ data: [] });
    }

    res.status(OK).json({ data: venues });
  } catch (error) {
    console.error(error);
    res.status(SERVER_ERROR).json({ message: error.message });
  }
});

// http://localhost:3000/api/v1/status/venues?status=available

module.exports = status;
