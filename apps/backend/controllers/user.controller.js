// modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// create token utils
const createToken = require("../utils/createToken");

// status code
const {
  SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  OK,
} = require("../constants/apiResponse");

// user model
const User = require("../models/user.model");

const Signup = async (req, res) => {
  const { firstname, lastname, email, registrationNumber, password, role } =
    req.body;
  try {
    const user = await User.signup(
      firstname,
      lastname,
      email,
      registrationNumber,
      password,
      role
    );

    const token = createToken(user._id);
    res.status(CREATED).json({ email, token });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    if (!token) {
      return res.status(NOT_FOUND).json({ message: "Token not found" });
    }
    res.status(OK).json({ email, token });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "User not found!" });
    }

    res.status(OK).json(user);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get user", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    if (users.length === 0) {
      return res.status(OK).json({ message: "There are no users for now!" });
    }

    res.status(OK).json(users);
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to get users!", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, registrationNumber, password, role } =
      req.body;

    // Check if any critical fields are empty
    if (firstname && firstname.trim() === "") {
      return res.status(400).json({ message: "First name cannot be empty!" });
    }

    if (lastname && lastname.trim() === "") {
      return res.status(400).json({ message: "Last name cannot be empty!" });
    }

    if (email && email.trim() === "") {
      return res.status(400).json({ message: "Email cannot be empty!" });
    }

    if (registrationNumber && registrationNumber.trim() === "") {
      return res
        .status(400)
        .json({ message: "Registration number cannot be empty!" });
    }

    // Check if the updated email or registration number already exists (excluding the current user)
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already exists!" });
      }
    }

    if (registrationNumber) {
      const regNumberExists = await User.findOne({
        registrationNumber,
        _id: { $ne: id },
      });
      if (regNumberExists) {
        return res
          .status(400)
          .json({ message: "Registration number already exists!" });
      }
    }

    // Update the user with the provided details
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully!",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(NOT_FOUND).json({ message: "User not found!" });
    }

    res.status(OK).json({ message: "Deleted sucessfully", deletedUser });
  } catch (error) {
    res
      .status(SERVER_ERROR)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

module.exports = {
  Signup,
  login,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
