const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: Number,
      required: [true, "Enter regstration number!"],
      unique: [true, "Registration number alredy in use!"],
      validate: {
        validator: function (num) {
          return /^\d{10}$/.test(num.toString());
        },
        message: "Registration number must be exactly 10 digits",
      },
    },
    yearOfStudy: {
      type: String,
      required: [true, "Enter regstration number"],
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Students", studentSchema);
module.exports = Student;
