const express = require("express");
const statsRoutes = express.Router();

// controllers
const {
  getVenuesListCount,
  getAvailableVenuesCount,
  getBookedVenuesCount,
  getTotalVenueOrders,
  getTotalVenueOrdersStatus,
  totalUsersCount,
  getAdminEmployeeCount,
} = require("../controllers/stats.controller");

// venues

// total-count, count available, booked
statsRoutes.get("/total-venues", getVenuesListCount);

statsRoutes.get("/total-available", getAvailableVenuesCount);

statsRoutes.get("/total-booked", getBookedVenuesCount);

// order: total
statsRoutes.get("/total-orders", getTotalVenueOrders);

statsRoutes.get("/total-count", getTotalVenueOrdersStatus);
// user stats

// total user count
// admin count
// employee count
statsRoutes.get("/total-users", totalUsersCount);

statsRoutes.get("/total-role", getAdminEmployeeCount);

module.exports = statsRoutes;
