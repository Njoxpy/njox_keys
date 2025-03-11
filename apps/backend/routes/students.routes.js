const express = require("express");
const students = express.Router();

// controllers
const {
  signupStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");

// middleware
const validateObjectId = require("../middleware/validation/validateObjectId");
const validateStudentCreate = require("../middleware/validation/validateStudentCreate");
const {
  authenticate,
  authorize,
} = require("../middleware/authentication/authenticate");

// create
students.post("/", authenticate, validateStudentCreate, signupStudent);

// read: students
students.get("/", authenticate, getStudents);

// read: student
students.get("/:id", authenticate, validateObjectId, getStudent);

// update
students.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateObjectId,
  updateStudent
);

// delete
students.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateObjectId,
  deleteStudent
);

module.exports = students;
