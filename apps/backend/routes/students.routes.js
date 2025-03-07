const express = require("express");

// routes
const {
  signupStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");
const userRoutes = express.Router();

const validateObjectId = require("../middleware/validation/validateObjectId");

// create
userRoutes.post("/", signupStudent);

// read: students
userRoutes.get("/", getStudents);

// read: student
userRoutes.get("/:id", validateObjectId, getStudent);

// update
userRoutes.patch("/:id", validateObjectId, updateStudent);

// delete
userRoutes.delete("/:id", validateObjectId, deleteStudent);
module.exports = userRoutes;
