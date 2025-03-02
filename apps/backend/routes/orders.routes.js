const express = require("express");
const orderRoutes = express.Router();

// controller
const {
  createOrder,
  getOrders,
  getOrder,
  getOrderStatus,
  updateOrderStatus,
  deleteOrder,
  returnKeys,
} = require("../controllers/order.controller");

// validate order middleware
const validateOrderCreate = require("../middleware/validation/validateOrderCreate");
const validateObjectId = require("../middleware/validation/validateObjectId");

// POST: Create order
orderRoutes.post("/", validateOrderCreate, createOrder);

// GET: Get all orders
orderRoutes.get("/", getOrders);

// GET: Get a specific order by ID
orderRoutes.get("/:id", validateObjectId, getOrder);

// GET: Get orders by status (rejected, pending, approved)
orderRoutes.get("/status", getOrderStatus); // Adjusted this route for status filtering

// PUT: Update the status of an order (approved, rejected, etc.)
orderRoutes.put("/:id/status", validateObjectId, updateOrderStatus);

// DELETE: Delete an order
orderRoutes.delete("/:id", validateObjectId, deleteOrder);

// PUT: Return keys (update status and venue availability)
orderRoutes.put("/:id/return", validateObjectId, returnKeys);

module.exports = orderRoutes;
