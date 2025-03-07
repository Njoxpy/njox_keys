const {
  SERVER_ERROR,
  NOT_FOUND,
  OK,
  BAD_REQUEST,
  CREATED,
} = require("../constants/apiResponse");

// Models
const Order = require("../models/order.model");
const Venue = require("../models/venue.model");

// redis
const redis = require("../config/redisClient");

const createOrder = async (req, res) => {
  const { venueId } = req.body;

  try {
    // Check if the venue exists
    const venue = await Venue.findById(venueId);
    if (!venue) {
      return res.status(NOT_FOUND).json({ message: "Venue not found" });
    }

    // Create the order and set its status to 'completed'
    const newOrder = await Order.create({ venueId, status: "approved" });

    // Update venue status to "booked"
    venue.status = "booked";
    await venue.save();

    // Respond with success
    res
      .status(CREATED)
      .json({ message: "Order created successfully", newOrder });
  } catch (error) {
    // Handle any errors
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("venueId")
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders for now" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// order
const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // validate order id
    const order = await Order.findById(id).populate("venueId");

    if (!order) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    res.status(OK).json(order);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

const getOrderStatus = async (req, res) => {
  const { status } = req.query;

  try {
    // check status
    if (!status || !["completed", "pending", "approved"].includes(status)) {
      return res.status(BAD_REQUEST).json({
        message:
          "Invalid order status. Allowed values: 'completed', 'pending', 'approved'",
      });
    }

    const orders = await Order.find({ status: status });

    if (orders.length === 0) {
      return res.status(NOT_FOUND).json({ message: "No orders" });
    }

    res.status(OK).json(orders);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

// returning keys
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const existsOrder = await Order.findById(id);

    if (!existsOrder) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    // check if status is valid
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Order status is not correct!" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { new: true },
      { status }
    );

    if (!updatedOrder) {
      return res.status(NOT_FOUND).json({ message: "Order not found!" });
    }

    res.status(OK).json({ message: "Updated sucessfullly", updatedOrder });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const exists = await Order.findById(id);

    if (!exists) {
      return res.status(NOT_FOUND).json({ message: "Order nto found" });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(NOT_FOUND).json({ message: "Order not found" });
    }

    res.status(OK).json({ message: "Order deleted sucessfully", deletedOrder });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

const returnKeys = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(NOT_FOUND).json({ message: "Order not found!" });
    }

    // Validate status
    if (!status || !["pending"].includes(status)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Invalid status! Must be 'pending'." });
    }

    if (order.status === "approved") {
      order.status = "pending"; // Update status to pending
      await order.save();

      const venue = await Venue.findById(order.venueId);

      if (!venue) {
        return res.status(NOT_FOUND).json({ message: "Venue not found" });
      }

      venue.status = "available"; // Make the venue available again
      await venue.save();

      return res.status(OK).json({
        message:
          "Order status updated to 'pending' and venue status set to 'available'.",
      });
    }

    return res.status(BAD_REQUEST).json({
      message: "Order status cannot be updated from the current status.",
    });
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  getOrderStatus,
  updateOrderStatus,
  deleteOrder,
  returnKeys,
};
