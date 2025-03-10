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
      return res.status(OK).json({ message: "There no venues for now" });
    }

    res.status(OK).json(venues);
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: error.message,
    });
  }
};

// by id
const getVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const venue = await Venue.findById(id);

    if (!venue) {
      return res.status(NOT_FOUND).json({ message: "Venue not found" });
    }

    res.status(OK).json(venue);
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: error.message,
    });
  }
};

// delete
const deleteVenue = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVenue = await Venue.findOneAndDelete({ _id: id });

    if (!deletedVenue) {
      return res.status(NOT_FOUND).json({ message: "Venue not found" });
    }

    res.status(OK).json({ message: "Deleted sucessfully" });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      abbreviation,
      block,
      capacity,
      venueNumber,
      description,
      status,
    } = req.body;

    const venue = await Venue.findById(id);
    if (!venue) {
      return res.status(NOT_FOUND).json({ message: "Venue not found" });
    }

    // Validate required string fields (name, block, abbreviation, description)
    const requiredFields = { name, abbreviation, block, description };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value !== undefined && value.trim() === "") {
        return res.status(BAD_REQUEST).json({
          message: `${key} cannot be empty!`,
        });
      }
    }

    // Check if venue name is already taken (excluding current venue)
    if (name) {
      const existingVenue = await Venue.findOne({ name, _id: { $ne: id } });
      if (existingVenue) {
        return res.status(BAD_REQUEST).json({
          message: "Venue with that name already exists!",
        });
      }
    }

    // Validate numeric fields (capacity & venueNumber must be positive numbers)
    if (
      capacity !== undefined &&
      (!Number.isInteger(capacity) || capacity <= 0)
    ) {
      return res.status(BAD_REQUEST).json({
        message: "Capacity must be a positive integer!",
      });
    }

    if (
      venueNumber !== undefined &&
      (!Number.isInteger(venueNumber) || venueNumber <= 0)
    ) {
      return res.status(BAD_REQUEST).json({
        message: "Venue number must be a positive integer!",
      });
    }

    // Validate status field (should be a valid enum value)
    const validStatuses = ["available", "booked"];
    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(BAD_REQUEST).json({
        message: `Invalid status! Allowed values: ${validStatuses.join(", ")}`,
      });
    }

    const updatedVenue = await Venue.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(OK).json({ data: updatedVenue });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const updateVenueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status !== "available" && status !== "booked") {
      return res.status(BAD_REQUEST).json({ message: "Invalid venue status" });
    }

    const venue = await Venue.findById(id);
    if (!venue) {
      return res.status(NOT_FOUND).json({ message: "Venue not found" });
    }

    if (venue.status === status) {
      return res.status(BAD_REQUEST).json({
        message: `Venue is already in the ${status} status.`,
      });
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
