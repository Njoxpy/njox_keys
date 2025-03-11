const {
  SERVER_ERROR,
  NOT_FOUND,
  OK,
  BAD_REQUEST,
  CREATED,
} = require("../constants/apiResponse");

const mongoose = require("mongoose");

// Models
const Order = require("../models/order.model");
const Venue = require("../models/venue.model");

const createOrder = async (req, res) => {
  const { venueId, studentId } = req.body;

  try {
    const venue = await Venue.findById(venueId);

    if (!venue) {
      return res.status(NOT_FOUND).json({ message: "Venue not found" });
    }

    let employeeId = req.user && req.user._id;

    if (venue.status === "booked") {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Venue is already booked" });
    }

    // Create the order and set its status to 'approved'
    const newOrder = await Order.create({
      venueId,
      student: studentId, // Dynamically set the studentId
      employee: employeeId,
      status: "approved",
    });

    venue.status = "booked";
    await venue.save();

    res.status(CREATED).json({
      message: "Order created successfully",
      newOrder,
    });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("venueId", "abbreviation block capacity name") // Populating venue details
      .populate("student", "registrationNumber yearOfStudy") // Ensure student details are included
      .populate("employee", "firstname lastname email role") // Ensure employee details are included
      .sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(OK).json({ message: "No orders for now" });
    }

    res.status(OK).json(orders);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};

// order
const getOrder = async (req, res) => {
  const { id } = req.params;

  try {
    // validate order id
    const order = await Order.findById(id)
      .populate("venueId")
      .populate("student", "registrationNumber yearOfStudy")
      .populate("employee", "firstname lastname email");

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
    if (!status || !["pending", "approved"].includes(status)) {
      return res.status(BAD_REQUEST).json({
        message: "Invalid order status. Allowed values:  'pending', 'approved'",
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

    // Check if status is valid
    const validStatuses = ["pending", "approved"];
    if (!validStatuses.includes(status?.trim().toLowerCase())) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Order status is not correct!" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Corrected the argument order
    );

    if (!updatedOrder) {
      return res.status(NOT_FOUND).json({ message: "Order not found!" });
    }

    res.status(OK).json({ message: "Updated successfully", updatedOrder });
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
