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

// update http://localhost:3000/api/v1/status?status=available

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
    // Extract venue ID from request parameters
    const { id } = req.params;
    const {
      name,
      abbreviation, // Fixed typo
      block,
      capacity,
      venueNumber,
      description,
      status, // Fixed typo
    } = req.body;

    // Check if venue exists
    const venue = await Venue.findById(id);
    if (!venue) {
      return res
        .status(404)
        .json({ success: false, message: "Venue not found" });
    }

    // Validate required string fields (name, block, abbreviation, description)
    const requiredFields = { name, abbreviation, block, description };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value !== undefined && value.trim() === "") {
        return res.status(400).json({
          success: false,
          message: `${key} cannot be empty!`,
        });
      }
    }

    // Check if venue name is already taken (excluding current venue)
    if (name) {
      const existingVenue = await Venue.findOne({ name, _id: { $ne: id } });
      if (existingVenue) {
        return res.status(400).json({
          success: false,
          message: "Venue with that name already exists!",
        });
      }
    }

    // Validate numeric fields (capacity & venueNumber must be positive numbers)
    if (
      capacity !== undefined &&
      (!Number.isInteger(capacity) || capacity <= 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Capacity must be a positive integer!",
      });
    }

    if (
      venueNumber !== undefined &&
      (!Number.isInteger(venueNumber) || venueNumber <= 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Venue number must be a positive integer!",
      });
    }

    // Validate status field (should be a valid enum value)
    const validStatuses = ["available", "booked"];
    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status! Allowed values: ${validStatuses.join(", ")}`,
      });
    }

    const updatedVenue = await Venue.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedVenue });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
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
