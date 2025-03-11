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
const {
  authenticate,
  authorize,
} = require("../middleware/authentication/authenticate");

// POST: Create order
orderRoutes.post("/", authenticate, validateOrderCreate, createOrder);

// GET: Get all orders
orderRoutes.get("/", authenticate, getOrders);

// GET: Get a specific order by ID
orderRoutes.get("/:id", authenticate, validateObjectId, getOrder);

// GET: Get orders by status (rejected, pending, approved)
orderRoutes.get("/status", authenticate, getOrderStatus);

// PUT: Update the status of an order (approved, rejected, etc.)
orderRoutes.put(
  "/status/:id",
  authenticate,
  validateObjectId,
  updateOrderStatus
);

// PUT: Return keys (update status and venue availability)
orderRoutes.put("/return/:id/", authenticate, validateObjectId, returnKeys);

// DELETE: Delete an order
orderRoutes.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateObjectId,
  deleteOrder
);

module.exports = orderRoutes;
