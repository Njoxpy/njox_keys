const express = require("express");
const venueRoutes = express.Router();

// model
const Venue = require("../models/venue.model");

// status code
const { OK, SERVER_ERROR, BAD_REQUEST } = require("../constants/apiResponse");

// Get venues by status (booked or available)
venueRoutes.get("/venues", async (req, res) => {
  try {
    const { status } = req.query;

    if (!status || !["available", "booked"].includes(status)) {
      return res
        .status(BAD_REQUEST)
        .json({ success: false, message: "Invalid status value!" });
    }

    const venues = await Venue.find({ status: status });

    if (venues.length === 0) {
      return res.status(OK).json({ success: true, data: [] });
    }

    res.status(OK).json({ success: true, data: venues });
  } catch (error) {
    console.error(error);
    res
      .status(SERVER_ERROR)
      .json({ success: false, message: "Server error!", error: error.message });
  }
});



module.exports = venueRoutes;
