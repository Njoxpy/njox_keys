const express = require("express");
const venueRoutes = express.Router();

// controllers
const {
  getAllVenues,
  getVenue,
  deleteVenue,
  getVenuesListCount,
  getVenueStatus,
  updateVenue,
  updateVenueStatus,
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
  OK,
} = require("../constants/apiResponse");

// models
const Venue = require("../models/venue.model");

// Get all venues
venueRoutes.get("/", getAllVenues);

// Get a specific venue by ID
venueRoutes.get("/:id", validateObjectId, getVenue);

// Delete a venue
venueRoutes.delete("/:id", validateObjectId, deleteVenue);

// Route to create a new venue with image uploads
venueRoutes.post(
  "/",
  upload.array("images", 3), // Allow up to 3 images
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
        venueNumber,
      } = req.body;

      // Check if a venue with the same name already exists
      const venueExists = await Venue.findOne({ name });
      if (venueExists) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Venue with that name already exists!" });
      }

      // user id = req.user && req.user._id
      const venueNumberExists = await Venue.findOne({ venueNumber });

      if (venueNumberExists) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Venue with that number already exists!" });
      }

      // Check if files were uploaded
      const files = req.files;
      if (!files || files.length === 0) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "No files were uploaded" });
      }

      const userId = "67c7e527d5b2c7ba9f6c319e";

      // Save file paths to associate with the venue
      const imagePaths = files.map((file) => file.path);

      // Create the new venue with image paths
      const newVenue = await Venue.create({
        abbreviation,
        block,
        capacity,
        description,
        equipment,
        name,
        status,
        userId,
        venueNumber,
        images: imagePaths, // Save image paths in the venue document
      });

      // Respond with the created venue
      res.status(CREATED).json({
        sucess: true,
        message: "Venue created successfully!",
        venue: newVenue,
      });
    } catch (error) {
      console.error("Error creating venue:", error);
      res.status(SERVER_ERROR).json({
        message: "Server error, failed to add venue!",
        error: error.message,
      });
    }
  }
);

// update status(employee only), all admin
venueRoutes.patch("/:id", validateObjectId, updateVenue);

venueRoutes.put("/:id/status", validateObjectId, updateVenueStatus);

module.exports = venueRoutes;
