const {
  SERVER_ERROR,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
} = require("../constants/apiResponse");

// model
const Venue = require("../models/venue.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Student = require("../models/student.model");

// venues
const getVenuesListCount = async (req, res) => {
  try {
    const venueCount = await Venue.countDocuments();
    res.status(OK).json({ venueCount });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error, failed to get list count.",
      error: error.message,
    });
  }
};

// get available venues
const getAvailableVenuesCount = async (req, res) => {
  try {
    const venueCountAvailable = await Venue.countDocuments();

    res.status(OK).json({ venueCountAvailable });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error, failed to get available venues.",
      error: error.message,
    });
  }
};

const getBookedVenuesCount = async (req, res) => {
  try {
    const venueCountBooked = await Venue.countDocuments({ status: "booked" });

    res.status(OK).json({ venueCountBooked });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Server error, failed to get booked venue count.",
      error: error.message,
    });
  }
};

/* 
Orders
- total orders
- approved orders
- rejected
- pending
*/
const getTotalVenueOrders = async (req, res) => {
  try {
    const ordersCount = await Order.countDocuments();

    res.status(OK).json({ ordersCount });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get orders count", error: error.message });
  }
};

// orders status count for approved, rejected: NO NEED FOR PENDING
const getTotalVenueOrdersStatus = async (req, res) => {
  try {
    const { status } = req.query;

    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(BAD_REQUEST).json({ message: "Invalid status!" });
    }

    const orderCount = await Order.countDocuments({ status });

    res.status(OK).json({ count: orderCount });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to gets status", error: error.message });
  }
};

// users
const totalUsersCount = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();

    res.status(OK).json({ usersCount });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Failed to get total users count",
      error: error.message,
    });
  }
};

const getAdminEmployeeCount = async (req, res) => {
  try {
    const { role } = req.query;

    // Validate role query
    if (!role || !["employee", "admin"].includes(role)) {
      return res.status(BAD_REQUEST).json({
        message: "Invalid role. Role must be either 'employee' or 'admin'.",
      });
    }

    // Count users with the given role
    const count = await User.countDocuments({ role });

    // Return the count of users with the specified role
    res.status(OK).json({ count });
  } catch (error) {
    res.status(SERVER_ERROR).json({
      message: "Failed to get count!",
      error: error.message,
    });
  }
};

// students
const getTotalStudents = async (req, res) => {
  try {
    const studentsCount = await Student.countDocuments().sort({ createAt: -1 });

    res.status(OK).json({ studentsCount });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};
module.exports = {
  getVenuesListCount,
  getAvailableVenuesCount,
  getBookedVenuesCount,
  getTotalVenueOrders,
  getTotalVenueOrdersStatus,
  totalUsersCount,
  getAdminEmployeeCount,
  getTotalStudents,
};

// http://localhost:3000/api/v1/stats/total-booked
// http://localhost:3000/api/v1/stats/total-available
// http://localhost:3000/api/v1/stats/total-venues
// http://localhost:3000/api/v1/stats/total-count?status=approved
// http://localhost:3000/api/v1/stats//total-role?role=employee
// http://localhost:3000/api/v1/stats/total-users
