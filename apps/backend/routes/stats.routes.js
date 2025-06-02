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
  getTotalStudents,
} = require("../controllers/stats.controller");
const {
  authenticate,
  authorize,
} = require("../middleware/authentication/authenticate");

// venues

// total-count, count available, booked
statsRoutes.get(
  "/total-venues",
  authenticate,
  authorize(["admin"]),
  getVenuesListCount
);

statsRoutes.get(
  "/total-available",
  authenticate,
  authorize(["admin"]),
  getAvailableVenuesCount
);

statsRoutes.get(
  "/total-booked",
  authenticate,
  authorize(["admin"]),
  getBookedVenuesCount
);

// order: total
statsRoutes.get(
  "/total-orders",
  authenticate,
  authorize(["admin"]),
  getTotalVenueOrders
);

statsRoutes.get(
  "/total-count",
  authenticate,
  authorize(["admin"]),
  getTotalVenueOrdersStatus
);
// user stats

// total user count
// total students counts
statsRoutes.get(
  "/total-students",
  authenticate,
  authorize(["admin"]),
  getTotalStudents
);
// admin count
// employee count
statsRoutes.get(
  "/total-users",
  authenticate,
  authorize(["admin"]),
  totalUsersCount
);

statsRoutes.get(
  "/total-role",
  authenticate,
  authorize(["admin"]),
  getAdminEmployeeCount
);

module.exports = statsRoutes;
