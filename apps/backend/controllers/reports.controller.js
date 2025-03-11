const { SERVER_ERROR, OK } = require("../constants/apiResponse");

// packages
const pdfkit = require("pdfkit");

// models
const OrderModel = require("../models/order.model");
const Venue = require("../models/venue.model");
const { getVenuesListCount } = require("./stats.controller");

// orders reports
const getOrdersReport = async (req, res) => {
  try {
    const orders = await OrderModel.countDocuments().sort({ createdAt: -1 });
    const pendingOrders = await OrderModel.countDocuments({
      status: "pending",
    });
    const approvedOrders = await OrderModel.countDocuments({
      status: "approved",
    });

    const rejectedOrders = await OrderModel.countDocuments({
      status: "rejected",
    });

    // create new pdf kit instance
    const doc = new pdfkit();
    const fileName = "Orders-report.pdf";
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/pdf");

    // set response
    doc.pipe(res);

    doc.fontSize(24).text("Orders Report", { align: "center" });

    doc.fontSize(20).text(`Total Orders: ${orders}`);
    doc.text(`Pending Orders: ${pendingOrders}`);
    doc.text(`Approved Orders: ${approvedOrders}`);
    doc.text(`Rejected orders: ${rejectedOrders}`);

    doc.end();

    /*
    res
      .status(OK)
      .json({ orders, pendingOrders, approvedOrders, rejectedOrders }); */
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

// venue reports(total venues, available, booked)
// add ability to filter by start data. end date,
const getVenueReports = async (req, res) => {
  try {
    // get venues count: available, booked

    // total venues
    const venues = await Venue.countDocuments();

    // venue with status either available or booked
    const availableVenues = await Venue.countDocuments({ status: "available" });

    const bookedVenues = venues - availableVenues;

    res.status(OK).json({ venues, bookedVenues, availableVenues });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

// add ability to filter by date

// select: name, status
const getLateKeyReturns = async (req, res) => {
  try {
    const venuesNotReturned = await OrderModel.find({ status: "approved" })
      .populate("venueId", "name status")
      .populate("student", "registrationNumber yearOfStudy")
      .populate("employee", "firstname lastname email");

    if (venuesNotReturned.length === 0) {
      return res.status(OK).json({ message: 0 });
    }

    res.status(OK).json(venuesNotReturned);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  getOrdersReport,
  getVenueReports,
  getLateKeyReturns,
};
