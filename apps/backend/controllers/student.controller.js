const {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
  OK,
  NOT_FOUND,
} = require("../constants/apiResponse");

// model
const Student = require("../models/student.model");

// add student
const signupStudent = async (req, res) => {
  try {
    const { registrationNumber, yearOfStudy } = req.body;

    const newStudent = new Student({
      registrationNumber,
      yearOfStudy,
    });

    await Student.create(newStudent);
    res.status(CREATED).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    if (students.length === 0) {
      return res.status(OK).json({ message: "No students found" });
    }

    res.status(OK).json(students);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(NOT_FOUND).json({ message: "Student not found" });
    }

    res.status(OK).json(student);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

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

    res.status(OK).json({ message: "Student Deleted sucessfully" });
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
