const express = require("express");
const {
  getOrdersReport,
  getVenueReports,
  getLateKeyReturns,
} = require("../controllers/reports.controller");
const reportRoutes = express.Router();

reportRoutes.get("/orders", getOrdersReport);

reportRoutes.get("/venues", getVenueReports);

reportRoutes.get("/late-returns", getLateKeyReturns);

module.exports = reportRoutes;
