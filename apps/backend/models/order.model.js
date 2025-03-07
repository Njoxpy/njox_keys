const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    venueId: {
      ref: "Venue",
      type: mongoose.Types.ObjectId,
      required: [true, "Venue id is required"],
      unique: [true, "venue should be unique"],
      index: true,
    },
    student: {
      ref: "Student",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User id is required"],
      index: true,
    },
    employee: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Employee info(id) is required"],
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

// venueId, userId, status(pending, completed), bookingDate
const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;

// include createdBy
// userId should have who created order and who issued
// requestedAt, approvedAt, rejectedAt
