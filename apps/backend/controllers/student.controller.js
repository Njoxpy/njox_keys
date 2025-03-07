const {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
  OK,
  NOT_FOUND,
} = require("../constants/apiResponse");

// model
const Student = require("../models/student.model");

const signupStudent = async (req, res) => {
  try {
    const { registrationNumber, yearOfStudy } = req.body;

    //   v;alidate request
    if (!registrationNumber) {
      return res
        .status(400)
        .json({ message: "Registration number is required" });
    }

    if (!yearOfStudy) {
      return res.status(400).json({ message: "Year of study is required" });
    }

    if (!/^\d{14}$/.test(registrationNumber.toString())) {
      return res
        .status(400)
        .json({ message: "Registration number must be exactly 14 digits" });
    }

    if (typeof registrationNumber !== "number" || isNaN(registrationNumber)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Registration number must be a number" });
    }

    const newStudent = new Student({
      registrationNumber,
      yearOfStudy,
    });

    await Student.create(newStudent);
    res
      .status(CREATED)
      .json({ message: "Student created successfully", newStudent });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    if (students.length === 0) {
      return res.status(OK).json({ message: "No students found" });
    }

    res.status(OK).json({ students });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(OK).json({ message: "Student not found" });
    }

    res.status(OK).json({ student });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { registrationNumber, yearOfStudy } = req.body;
    const { id } = req.params;

    /* 
    if (!registrationNumber && !yearOfStudy) {
      return res.status(BAD_REQUEST).json({
        message: "Registration number or year of study is required",
      });
    }
    if (typeof registrationNumber !== "number" || isNaN(registrationNumber)) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Registration number must be a number" });
    }

    if (yearOfStudy === "") {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Year of study cannot be empty!" });
    }
      */

    // validate id
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(OK).json({ message: "Student not found" });
    }

    res
      .status(OK)
      .json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

// delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(NOT_FOUND).json({ message: "User not found!" });
    }

    res.status(OK).json({ message: "Deleted sucessfully", deletedStudent });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};
module.exports = {
  signupStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
