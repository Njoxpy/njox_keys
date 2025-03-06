const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Enter first name"],
      minLength: [2, "First name should be at least 2 characters"],
      maxLength: [35, "First name should not exceed 35 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Enter last name"],
      minLength: [2, "Last name should be at least 2 characters"],
      maxLength: [35, "Last name should not exceed 35 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Enter email"],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Email format validation
    },
    registrationNumber: {
      type: Number,
      unique: true,
      required: [true, "Enter registration number"],
      validate: {
        validator: function (num) {
          return /^\d{10}$/.test(num.toString()); // Ensures registration number is exactly 10 digits
        },
        message: "Registration number must be exactly 10 digits",
      },
    },
    password: {
      type: String,
      required: [true, "Enter password"],
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee", // Default role if none is provided
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
