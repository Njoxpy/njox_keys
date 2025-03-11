const express = require("express");
const userRoutes = express.Router();

// auth middleware
const {
  authenticate,
  authorize,
} = require("../middleware/authentication/authenticate");

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
userRoutes.post(
  "/signup",
  authenticate,
  authorize(["admin"]),
  validateUserCreate,
  Signup
);

// login
userRoutes.post("/login", login);

userRoutes.get("/", authenticate, authorize(["admin"]), getUsers);

userRoutes.get("/:id", authenticate, validateObjectId, getUser);

userRoutes.put(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateObjectId,
  updateUser
);

userRoutes.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateObjectId,
  deleteUser
);

module.exports = userRoutes;
