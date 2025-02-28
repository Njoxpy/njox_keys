const { SERVER_ERROR, OK, NOT_FOUND } = require("../constants/apiResponse");
const Venue = require("../models/venue.model");

const getVenuesListCount = async (req, res) => {
  try {
    const venueCount = await Venue.find()
      .sort({ createdAt: -1 })
      .countDocuments();

    if (venueCount === 0) {
      return res
        .status(NOT_FOUND)
        .json({ message: "There is no venue for now!" });
    }

    res.status(OK).json({ venueCount });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error, failed to get list count.",
      error: error.message,
    });
  }
};

// get available venues
const getAvailableVenuesCount = async (req, res) => {
  try {
    const venueCountAvailable = await Venue.find({ status: "available" })
      .sort({ createdAt: -1 })
      .countDocuments();

    if (venueCountAvailable === 0) {
      return res
        .status(NOT_FOUND)
        .json({ message: "There is no venue available for booking for now!" });
    }

    res.status(OK).json({ venueCountAvailable });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error, failed to get available venues.",
      error: error.message,
    });
  }
};

const getBookedVenuesCount = async (req, res) => {
  try {
    const venueCountBooked = await Venue.find({ status: "booked" })
      .sort({ createdAt: -1 })
      .countDocuments();

    if (venueCountBooked === 0) {
      return res
        .status(NOT_FOUND)
        .json({ message: "No venue booked!, count is zero" });
    }

    res.status(OK).json({ venueCountBooked });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error, failed to get booked venue count.",
      error: error.message,
    });
  }
};

module.exports = {
  getVenuesListCount,
  getAvailableVenuesCount,
  getBookedVenuesCount,
};

// http://localhost:3000/api/v1/stats/total-booked
// http://localhost:3000/api/v1/stats/total-available
// http://localhost:3000/api/v1/stats/total-venues
