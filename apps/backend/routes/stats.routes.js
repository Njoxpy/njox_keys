const express = require("express");
const statsRoutes = express.Router();

// controllers
const {
  getVenuesListCount,
  getAvailableVenuesCount,
  getBookedVenuesCount,
} = require("../controllers/stats.controller");

// venues

// total-count, count available, booked
statsRoutes.get("/total-venues", getVenuesListCount);

statsRoutes.get("/total-available", getAvailableVenuesCount);

statsRoutes.get("/total-booked", getBookedVenuesCount);

// order: total
module.exports = statsRoutes;
