const express = require("express");
const venueRoutes = express.Router();

// controllers
const {
  getAllVenues,
  getVenue,
  deleteVenue,
  updateVenue,
  updateVenueStatus,
} = require("../controllers/venue.controller");

// middleware
const validateObjectId = require("../middleware/validation/validateObjectId");
const upload = require("../middleware/validation/uploadImage");
const validateVenueCreate = require("../middleware/validation/validateVenueCreate");

// auth middleware
const {
  authenticate,
  authorize,
} = require("../middleware/authentication/authenticate");

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
venueRoutes.get("/", authenticate, getAllVenues);

// Get a specific venue by ID
venueRoutes.get("/:id", authenticate, validateObjectId, getVenue);

// Route to create a new venue by admin
venueRoutes.post(
  "/",
  authenticate,
  authorize(["admin"]),
  upload.array("images", 3), // Allow up to 3 images
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
      if (await Venue.findOne({ name })) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Venue with that name already exists!" });
      }

      if (await Venue.findOne({ venueNumber })) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Venue with that number already exists!" });
      }

      // Check if files were uploaded
      const files = req.files;
      if (!files || files.length === 0) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "No files(images) were uploaded" });
      }

      // Store only relative paths
      const imagePaths = files.map((file) => file.filename);

      let parsedEquipment = equipment;

      // If it's a string, parse it
      if (typeof equipment === "string") {
        try {
          parsedEquipment = JSON.parse(equipment);
        } catch (err) {
          return res.status(BAD_REQUEST).json({
            message: "Equipment must be a valid array or JSON string",
          });
        }
      }

      // Defensive: if parsedEquipment is a single array string (bad case), fix it
      if (
        Array.isArray(parsedEquipment) &&
        parsedEquipment.length === 1 &&
        typeof parsedEquipment[0] === "string" &&
        parsedEquipment[0].startsWith("[") // clearly looks like a stringified array
      ) {
        try {
          parsedEquipment = JSON.parse(parsedEquipment[0]); // Unwrap it properly
        } catch (err) {
          return res.status(BAD_REQUEST).json({
            message: "Invalid nested equipment format",
          });
        }
      }

      const newVenue = await Venue.create({
        abbreviation,
        block,
        capacity,
        description,
        equipment: parsedEquipment,
        name,
        status,
        userId: req.user._id,
        venueNumber,
        images: imagePaths,
      });

      res
        .status(CREATED)
        .json({ message: "Venue added successfully!", newVenue });
    } catch (error) {
      console.error("Error creating venue:", error);
      res.status(SERVER_ERROR).json({ message: error.message });
    }
  }
);

venueRoutes.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateObjectId,
  updateVenue
);

venueRoutes.put(
  "/:id/status",
  authenticate,
  validateObjectId,
  updateVenueStatus
);

// Delete a venue
venueRoutes.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateObjectId,
  deleteVenue
);

module.exports = venueRoutes;
