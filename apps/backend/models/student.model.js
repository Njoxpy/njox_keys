const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: Number,
      required: [true, "Enter regstration number!"],
      unique: [true, "Registration number alredy in use!"],
      validate: {
        validator: function (num) {
          return /^\d{14}$/.test(num.toString());
        },
        message: "Registration number must be exactly 14 digits",
      },
    },
    yearOfStudy: {
      type: String,
      required: [true, "Enter year of study!"],
      trim: [true, "Enter valid year of study!"],
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;

/*
feature:
- name: name format: first name, middlename and lastname
- programme: enum for programme name
 */
