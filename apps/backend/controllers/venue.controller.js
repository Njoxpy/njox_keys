// models
const Venue = require("../models/venue.model");

// response
const { OK, SERVER_ERROR, NOT_FOUND } = require("../constants/apiResponse");

// read
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find().sort({ createdAt: -1 });

    if (venues.length === 0) {
      return res.status(NOT_FOUND).json({ message: "There no venues for now" });
    }

    res.status(OK).json(venues);
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error, failed to get venues",
      error: error.message,
    });
  }
};

// by id
const getVenue = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findOne({ _id: id });

    if (!venue) {
      return res.status(NOT_FOUND).json({ message: "Venue not found" });
    }
    res.status(OK).json(venue);
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error, failed to get venue",
      error: error.message,
    });
  }
};

// update

// delete
const deleteVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVenue = await Venue.findOneAndDelete({ _id: id });

    if (!deletedVenue) {
      return res.status(NOT_FOUND).json({ message: "Venue not found" });
    }
    res.status(OK).json({ message: "Deleted sucessfully", deletedVenue });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error, failed to delete venue.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllVenues,
  getVenue,
  deleteVenue,
};
