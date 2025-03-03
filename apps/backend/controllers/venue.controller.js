// models
const Venue = require("../models/venue.model");

// response
const {
  OK,
  SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} = require("../constants/apiResponse");

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

// updatehttp://localhost:3000/api/v1/status?status=available

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

const updateVenue = async (req, res) => {
  try {
    // check venue if exists or not
    const { id } = req.params;
    const { name } = req.body;

    const exists = await Venue.findById(id);

    if (!exists) {
      return res.status(NOT_FOUND).json({ message: "Product not found" });
    }

    // check venue name
    const venueExists = await Venue.findOne({ name });

    if (venueExists) {
      return res.status(BAD_REQUEST).json({
        sucess: false,
        message: "Venue with that name already exist!",
      });
    }

    const updatedVenue = await Venue.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(OK).json(updatedVenue);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

const updateVenueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const exists = await Venue.findById(id);

    if (status !== "available" && status !== "booked") {
      return res
        .status(NOT_FOUND)
        .json({ message: "Venue status not available" });
    }
    if (!exists) {
      return res.status(NOT_FOUND).json({ message: "Venue not found" });
    }

    const updatedVenueStatus = await Venue.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(OK).json({ updatedVenueStatus });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};
module.exports = {
  getAllVenues,
  getVenue,
  deleteVenue,
  updateVenue,
  updateVenueStatus,
};
