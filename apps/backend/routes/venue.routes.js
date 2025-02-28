const express = require("express");
const venueRoutes = express.Router();

// controllers
const {
  getAllVenues,
  getVenue,
  deleteVenue,
  getVenuesListCount,
} = require("../controllers/venue.controller");

// middleware
const validateObjectId = require("../middleware/validation/validateObjectId");
const upload = require("../middleware/validation/uploadImage");
const validateVenueCreate = require("../middleware/validation/validateVenueCreate");

// responses
const {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
} = require("../constants/apiResponse");

// models
const Venue = require("../models/venue.model");

// create
venueRoutes.get("/", getAllVenues);

venueRoutes.get("/:id", validateObjectId, getVenue);

// delete
venueRoutes.delete("/:id", validateObjectId, deleteVenue);

venueRoutes.post(
  "/",
  upload.single("image"),
  validateVenueCreate,
  async (req, res) => {
    try {
      const {
        abbreviation,
        block,
        capacity,
        description,
        equipment,
        name,
        status,
      } = req.body;

      // check if there a venue with that name
      const venueExists = await Venue.findOne({ name });

      if (venueExists) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Venue with that name exists!" });
      }

      const newVenue = await Venue.create({
        abbreviation,
        block,
        capacity,
        description,
        equipment,
        name,
        status,
      });

      res.status(CREATED).json(newVenue);
    } catch (error) {
      res.status(SERVER_ERROR).json({
        message: "Server error, failed to add venue!",
        error: error.message,
      });
    }
  }
);

// update

// rendering venues based on the status such as booked, available

module.exports = venueRoutes;
