const express = require("express");
const userRoutes = express.Router();

// model
const User = require("../models/user.model");
const {
  Signup,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  login,
} = require("../controllers/user.controller");

// middleware
const validateUserCreate = require("../middleware/validation/validateUserCreate");
const validateObjectId = require("../middleware/validation/validateObjectId");
// create
userRoutes.post("/signup", validateUserCreate, Signup);

userRoutes.get("/", getUsers);

userRoutes.get("/:id", validateObjectId, getUser);

userRoutes.put("/:id", validateObjectId, updateUser);

userRoutes.delete("/:id", validateObjectId, deleteUser);

// login
userRoutes.post("/login", login);
// read

// update

// delete
module.exports = userRoutes;

// http://localhost:3000/api/v1/users
