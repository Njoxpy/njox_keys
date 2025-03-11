const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: Number,
      required: [true, "Registration number is required!"],
      unique: [true, "Registration number must be unique!"],
      validate: {
        validator: function (num) {
          return /^\d{14}$/.test(num.toString()); // Ensure it's exactly 14 digits
        },
        message: "Registration number must be exactly 14 digits.",
      },
      index: true,
    },
    yearOfStudy: {
      type: String,
      required: [true, "Year of study is required!"],
      trim: true, // Trim whitespace from the input
      validate: {
        validator: function (value) {
          return /^\d{4}\/\d{4}$/.test(value);
        },
        message:
          "Year of study must be in the format 'YYYY/YYYY' (e.g., 2024/2025).",
      },
      index: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
